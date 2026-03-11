/**
 * app/page.tsx — Portfolio Homepage
 *
 * ── WHAT CHANGED & WHY ───────────────────────────────────────────────────────
 *
 * PROBLEM:
 *   Clicking "Back to Gallery" from /projects/[id] navigated to "/" but the
 *   Gallery Modal stayed closed. The user landed on the plain home page with
 *   no gallery visible.
 *
 * FIX:
 *   Added a useEffect that runs once on mount and reads the URL search params.
 *   If the URL contains ?modal=gallery (set by BackButton via router.push),
 *   it automatically calls setActiveModal("gallery") to reopen the gallery.
 *
 *   After opening the modal, we clean the URL with router.replace("/") so the
 *   ?modal=gallery param doesn't linger in the address bar or affect
 *   subsequent navigation.
 *
 * ── NEW IMPORTS ──────────────────────────────────────────────────────────────
 *   useEffect          — from React (runs the param check on mount)
 *   useSearchParams    — from next/navigation (reads ?modal=gallery)
 *   Suspense           — from React (required wrapper for useSearchParams)
 *   useRouter          — from next/navigation (cleans URL after modal opens)
 *
 * ── ONLY ADDITIONS (nothing removed) ────────────────────────────────────────
 *   1. New imports: useEffect, useSearchParams, Suspense, useRouter
 *   2. useRouter() call inside Home component
 *   3. useSearchParams() call inside Home component
 *   4. useEffect that reads the param and opens gallery if present
 *   5. Suspense wrapper around <HomeContent /> (required by Next.js for
 *      useSearchParams in a Client Component)
 *
 * Everything else — state, modals, layout — is unchanged.
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
import ReferencesModal from "@/components/modals/references-modal";
import ContactModal from "@/components/modals/contact-modal";
import SkillsSection from "@/components/sections/skills-section";
import type { Language } from "@/lib/data";

// ── HomeContent ──────────────────────────────────────────────────────────────
// Extracted into its own component so we can use useSearchParams() inside it.
// Next.js requires useSearchParams() to be inside a <Suspense> boundary.
// We wrap <HomeContent /> in <Suspense> in the default export below.

function HomeContent() {
  const router = useRouter();

  /**
   * lang — active UI language ("en" | "de").
   * Toggled by the language switcher in ProfileContent.
   * Passed as `language` prop to every modal and section.
   */
  const [lang, setLang] = useState<Language>("en");

  /**
   * activeModal — which modal overlay is currently open.
   * null   → no modal
   * string → modal ID (see list below)
   *
   * IDs: "education" | "experience" | "skills" | "certificates"
   *      "videos" | "gallery" | "references" | "contact"
   */
  const [activeModal, setActiveModal] = useState<string | null>(null);

  /**
   * searchParams — reads the current URL query string.
   * We check for ?modal=gallery which is set by BackButton when
   * the user clicks "Back to Gallery" from a project page.
   */
  const searchParams = useSearchParams();

  /**
   * ── KEY ADDITION ─────────────────────────────────────────────────────
   * useEffect: runs once on mount, checks for ?modal=gallery in the URL.
   *
   * HOW IT WORKS:
   *   1. User is on /projects/[id] and clicks "Back to Gallery"
   *   2. BackButton calls router.push("/?modal=gallery")
   *   3. Browser navigates to "/" with ?modal=gallery in the URL
   *   4. This page mounts / re-renders
   *   5. This useEffect fires, reads searchParams.get("modal")
   *   6. If the value is "gallery" → setActiveModal("gallery")
   *      → GalleryModal renders as a fixed overlay immediately
   *   7. router.replace("/") cleans the URL (removes ?modal=gallery)
   *      so the address bar shows "/" and the param doesn't persist
   *
   * WHY useEffect AND NOT direct state init:
   *   searchParams is only available after mount in Client Components.
   *   Reading it during render can cause hydration mismatches.
   *   useEffect with [] runs safely after hydration.
   */
  useEffect(() => {
    const modalParam = searchParams.get("modal");

    if (modalParam === "gallery") {
      // Reopen the gallery modal
      setActiveModal("gallery");

      // Clean the URL so ?modal=gallery doesn't persist
      // router.replace does NOT add a new history entry — clean and silent
      router.replace("/");
    }
  }, [searchParams, router]);
  // ─────────────────────────────────────────────────────────────────────

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex font-sans">
      <div className="flex w-full h-screen overflow-hidden">
        {/* ── Left Navigation ──────────────────────────────────────── */}
        <LeftNavigation
          language={lang}
          onNavigate={(section) => setActiveModal(section)}
        />

        {/* ── Main Scrollable Content ──────────────────────────────── */}
        <section className="flex-1 h-screen overflow-y-auto scrollbar-hide">
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>

          <div className="min-h-full flex flex-col items-center justify-start p-4 md:p-8 py-12">
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

        {/* ── Right Navigation ─────────────────────────────────────── */}
        <RightNavigation
          language={lang}
          onNavigate={(section) => setActiveModal(section)}
        />
      </div>

      {/* ════════════════════════════════════════════════════════════════
          MODAL LAYER — only one modal renders at a time
          ════════════════════════════════════════════════════════════════ */}

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

      {/*
        GalleryModal renders when:
          a) User clicks "See My Work" / "Gallery" nav card (normal flow)
          b) User clicks "Back to Gallery" from a project page (URL param flow)
             → useEffect above reads ?modal=gallery → setActiveModal("gallery")
      */}
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

// ── Default Export ────────────────────────────────────────────────────────────
// Wraps HomeContent in Suspense because useSearchParams() requires it.
// The fallback is null (invisible) — the page renders normally while
// the search params are being read. No loading spinner needed.

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
