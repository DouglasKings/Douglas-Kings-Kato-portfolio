/**
 * Portfolio Homepage Component
 *
 * This is the main entry point for Douglas Kings Kato's portfolio application.
 * It orchestrates the entire portfolio layout including:
 * - Language switching functionality (English/German)
 * - Left navigation panel for section navigation
 * - Main content area with hidden scrollbar
 * - Right navigation panel for portfolio & media
 * - Full-page modal dialogs for all portfolio sections
 * - Responsive design for mobile and desktop views
 *
 * @author Douglas Kings Kato
 * @version 3.0.0
 */

"use client"

import { useState } from "react"
import LeftNavigation from "@/components/navigation/left-navigation"
import RightNavigation from "@/components/navigation/right-navigation"
import ProfileContent from "@/components/profile-content"
import ExperienceModal from "@/components/modals/experience-modal"
import EducationModal from "@/components/modals/education-modal"
import SkillsModal from "@/components/modals/skills-modal"
import CertificatesModal from "@/components/modals/certificates-modal"
import VideosModal from "@/components/modals/videos-modal"
import GalleryModal from "@/components/modals/gallery-modal"
import ReferencesModal from "@/components/modals/references-modal"
import ContactModal from "@/components/modals/contact-modal"
import SkillsSection from "@/components/sections/skills-section"
import type { Language } from "@/lib/data"

/**
 * Home Component
 *
 * Main page component that manages application state and renders the portfolio layout.
 * Implements bilingual support (English/German) and modal-based navigation system.
 * All navigation items open full-page modals with integrated back buttons.
 *
 * @returns {JSX.Element} The complete portfolio homepage
 */
export default function Home() {
  // State for language selection
  const [lang, setLang] = useState<Language>("en")
  // State for which modal is currently active
  const [activeModal, setActiveModal] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex font-sans">
      <div className="flex w-full h-screen overflow-hidden">
        {/* Left Navigation Panel - Scrollable with visible scrollbar */}
        <LeftNavigation language={lang} onNavigate={(section) => setActiveModal(section)} />

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
              {/* Profile Header Section with Language Switcher */}
              <ProfileContent
                language={lang}
                onToggleLang={() => setLang(lang === "en" ? "de" : "en")}
                onOpenExperience={() => setActiveModal("experience")}
              />

              {/* Skills Section Preview - visible in center */}
              <SkillsSection language={lang} />
            </div>
          </div>
        </section>

        {/* Right Navigation Panel - Scrollable with visible scrollbar */}
        <RightNavigation language={lang} onNavigate={(section) => setActiveModal(section)} />
      </div>

      {activeModal === "education" && <EducationModal language={lang} onClose={() => setActiveModal(null)} />}
      {activeModal === "experience" && <ExperienceModal language={lang} onClose={() => setActiveModal(null)} />}
      {activeModal === "skills" && <SkillsModal language={lang} onClose={() => setActiveModal(null)} />}
      {activeModal === "certificates" && <CertificatesModal language={lang} onClose={() => setActiveModal(null)} />}
      {activeModal === "videos" && <VideosModal language={lang} onClose={() => setActiveModal(null)} />}
      {activeModal === "gallery" && <GalleryModal language={lang} onClose={() => setActiveModal(null)} />}
      {activeModal === "references" && <ReferencesModal language={lang} onClose={() => setActiveModal(null)} />}
      {activeModal === "contact" && <ContactModal language={lang} onClose={() => setActiveModal(null)} />}
    </main>
  )
}
