/**
 * app/page.tsx — Portfolio Homepage
 *
 * MOBILE FIX SUMMARY
 * ══════════════════
 * PROBLEM: On mobile the layout renders LeftNav + main content + RightNav
 * side-by-side in a flex row. On a 360px screen each column gets ~120px —
 * completely unusable.
 *
 * SOLUTION:
 * 1. LeftNav and RightNav are hidden on mobile (hidden md:flex / hidden md:block).
 * 2. A <MobileBottomNav> bar is shown only on mobile (flex md:hidden).
 *    It lives at the bottom of the screen (fixed) and shows 8 icon buttons —
 *    the same sections from both sidebars.
 * 3. Main content gets full-width on mobile, with pb-20 so content isn't
 *    hidden behind the fixed bottom bar.
 *
 * Everything else (modal logic, language switching, gallery re-open) is
 * unchanged from the previous version.
 */

"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import LeftNavigation from "@/components/navigation/left-navigation";
import RightNavigation from "@/components/navigation/right-navigation";
import ProfileContent from "@/components/profile-content";
import ExperienceModal from "@/components/modals/experience-modal";
import EducationModal from "@/components/modals/education-modal";
import SkillsModal from "@/components/modals/skills-modal";
import CertificatesModal from "@/components/modals/certificates-modal";
import VideosModal from "@/components/modals/videos-modal";
import GalleryModal from "@/components/modals/gallery-modal";
import ReferencesModal from "@/components/modals/research-modal";
import ContactModal from "@/components/modals/contact-modal";
import SkillsSection from "@/components/sections/skills-section";
import type { Language } from "@/lib/data";

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE BOTTOM NAV
// Shows on screens < md (768px). Mirrors both sidebars in a single fixed bar.
// ─────────────────────────────────────────────────────────────────────────────

interface MobileBottomNavProps {
  language: Language;
  onNavigate: (section: string) => void;
}

function MobileBottomNav({ language, onNavigate }: MobileBottomNavProps) {
  // All 8 nav items merged from both sidebars
  const items = [
    { id: "education", icon: "🎓", label: language === "en" ? "Edu" : "Bil" },
    { id: "experience", icon: "💼", label: language === "en" ? "Exp" : "Erf" },
    {
      id: "skills",
      icon: "⚙️",
      label: language === "en" ? "Skills" : "Skills",
    },
    {
      id: "certificates",
      icon: "🏆",
      label: language === "en" ? "Certs" : "Zert",
    },
    {
      id: "videos",
      icon: "▶️",
      label: language === "en" ? "Videos" : "Videos",
    },
    {
      id: "gallery",
      icon: "🖼️",
      label: language === "en" ? "Gallery" : "Galerie",
    },
    { id: "references", icon: "📄", label: language === "en" ? "Refs" : "Ref" },
    {
      id: "contact",
      icon: "✉️",
      label: language === "en" ? "Contact" : "Kontakt",
    },
  ];

  return (
    /*
     * fixed bottom-0 — always visible above page content.
     * z-50          — sits above everything except modals (z-[100]+).
     * pb-safe       — respects iOS home indicator / Android nav bar.
     * flex md:hidden — only shown on mobile; hidden on md+ where sidebars appear.
     */
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 shadow-2xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors min-w-0"
          aria-label={item.label}
        >
          {/* Emoji icon — readable without any font loading */}
          <span className="text-lg leading-none" aria-hidden="true">
            {item.icon}
          </span>
          {/* Tiny label — truncated so it never wraps */}
          <span className="text-[9px] font-medium leading-none truncate w-full text-center px-0.5">
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HOME CONTENT (needs Suspense wrapper for useSearchParams)
// ─────────────────────────────────────────────────────────────────────────────

function HomeContent() {
  const router = useRouter();
  const [lang, setLang] = useState<Language>("en");
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const searchParams = useSearchParams();

  // Re-open gallery modal when navigating back from a project page
  useEffect(() => {
    const modalParam = searchParams.get("modal");
    if (modalParam === "gallery") {
      setActiveModal("gallery");
      router.replace("/");
    }
  }, [searchParams, router]);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex font-sans">
      <div className="flex w-full h-screen overflow-hidden">
        {/*
         * LEFT NAVIGATION
         * hidden on mobile (hidden), shown as fixed sidebar on md+ (md:flex).
         * The md:flex is actually applied inside LeftNavigation via `aside` class.
         * We wrap it so it doesn't participate in the mobile flex row at all.
         */}
        <div className="hidden md:block">
          <LeftNavigation
            language={lang}
            onNavigate={(section) => setActiveModal(section)}
          />
        </div>

        {/*
         * MAIN SCROLLABLE CONTENT
         * On mobile: full width (no sidebars), with bottom padding so
         * content isn't hidden behind the fixed MobileBottomNav bar.
         * On md+: flex-1 (shares space with sidebars).
         */}
        <section className="flex-1 h-screen overflow-y-auto scrollbar-hide w-full">
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>

          <div className="min-h-full flex flex-col items-center justify-start p-4 md:p-8 py-6 pb-24 md:pb-12">
            <div className="max-w-4xl w-full space-y-8">
              <ProfileContent
                language={lang}
                onToggleLang={() => setLang(lang === "en" ? "de" : "en")}
                onOpenExperience={() => setActiveModal("experience")}
                onNavigateToGallery={() => setActiveModal("gallery")}
              />
              <SkillsSection language={lang} />
            </div>
          </div>
        </section>

        {/*
         * RIGHT NAVIGATION
         * Same pattern as left — hidden on mobile, shown on md+.
         */}
        <div className="hidden md:block">
          <RightNavigation
            language={lang}
            onNavigate={(section) => setActiveModal(section)}
          />
        </div>
      </div>

      {/*
       * MOBILE BOTTOM NAV
       * Only visible on mobile (flex md:hidden is inside MobileBottomNav).
       * Does not affect desktop layout at all.
       */}
      <MobileBottomNav
        language={lang}
        onNavigate={(section) => setActiveModal(section)}
      />

      {/* ── MODAL LAYER ─────────────────────────────────────────────── */}
      {activeModal === "education" && (
        <EducationModal language={lang} onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "experience" && (
        <ExperienceModal language={lang} onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "skills" && (
        <SkillsModal language={lang} onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "certificates" && (
        <CertificatesModal
          language={lang}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal === "videos" && (
        <VideosModal language={lang} onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "gallery" && (
        <GalleryModal language={lang} onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "references" && (
        <ReferencesModal language={lang} onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "contact" && (
        <ContactModal language={lang} onClose={() => setActiveModal(null)} />
      )}
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DEFAULT EXPORT — wraps HomeContent in Suspense (required for useSearchParams)
// ─────────────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
