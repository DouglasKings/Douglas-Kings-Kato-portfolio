/**
 * components/sections/gallery-section.tsx
 *
 * ── CRITICAL CHANGE ──────────────────────────────────────────────────────────
 *
 * BEFORE (old approach — opens ProjectDetailModal inside the gallery):
 *   <Button onClick={() => setSelectedProject(project)}>
 *     View Technical Case Study
 *   </Button>
 *   + <ProjectDetailModal isOpen={!!selectedProject} ... />
 *
 * AFTER (new approach — navigates to the full Next.js page route):
 *   <Link href={`/projects/${project.id}`}>
 *     <Button>View Technical Case Study</Button>
 *   </Link>
 *
 * WHY THIS GIVES YOU THE LAYOUT IN THE SCREENSHOTS:
 *   The screenshots show app/projects/[id]/page.tsx — a full-page Server
 *   Component with:
 *     ✅ Sticky "Technical Architecture Report" nav bar
 *     ✅ Large hero section with tech badges + big title + tagline
 *     ✅ Challenge / Engineering Solution split cards
 *     ✅ System Design & Architecture full-width image
 *     ✅ Numbered Key Implementations grid
 *     ✅ Code Architecture panel with gist files + GitHub button
 *     ✅ Gradient SDG Impact section
 *     ✅ "Back to Gallery" footer button
 *
 *   The old ProjectDetailModal was a simplified in-modal view that lacked
 *   the sticky nav, hero section, code architecture panel, and gist metadata.
 *
 * WHAT WAS REMOVED:
 *   - useState<Project | null> (selectedProject state)
 *   - import { ProjectDetailModal } from "../modals/project-detail-modal"
 *   - <ProjectDetailModal /> render at the bottom
 *
 * WHAT WAS ADDED:
 *   - import Link from "next/link"
 *   - <Link href={`/projects/${project.id}`}> wrapping each button
 *
 * DATA FLOW (new):
 *   lib/data.ts → projects[] → GallerySection → Card per project
 *                                                     ↓ click button
 *                                               Next.js router navigates
 *                                                     ↓
 *                                         app/projects/[id]/page.tsx renders
 *                                         (the full-page layout from screenshots)
 *
 * @component
 */

"use client";

// ── Removed: useState (no longer needed — no modal state)
// ── Removed: import { ProjectDetailModal } from "../modals/project-detail-modal"
import { ImageIcon, BookOpen } from "lucide-react";
import Link from "next/link"; // ← NEW: enables client-side navigation to /projects/[id]
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { projects, type Language } from "@/lib/data";

// ── Props ─────────────────────────────────────────────────────────────────

interface GallerySectionProps {
  language: Language;
}

// ── Component ─────────────────────────────────────────────────────────────

export default function GallerySection({ language }: GallerySectionProps) {
  // ── REMOVED: selectedProject state
  // Previously: const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  // This state drove ProjectDetailModal — no longer needed since we navigate
  // to the full Next.js page instead of opening a modal.

  return (
    <section id="gallery" className="scroll-mt-16 py-8">
      {/* ── Section Header ──────────────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
          <ImageIcon className="w-8 h-8 text-pink-600" />
          {language === "en"
            ? "Core Technical Projects"
            : "Technische Kernprojekte"}
        </h2>

        {/* Subtitle uses UN/EU vocabulary for international audiences */}
        <p className="text-lg text-slate-600 dark:text-slate-400">
          {language === "en"
            ? "Technical blueprints for sustainable digital transformation and community impact."
            : "Technische Blaupausen für nachhaltige digitale Transformation und gesellschaftliche Wirkung."}
        </p>
      </div>

      {/* ── Project Cards Grid ───────────────────────────────────────── */}
      {/*
        Maps over projects[] from lib/data.ts.
        Adding a new project to lib/data.ts automatically creates a card here.
        No other file needs to change.
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="p-6 hover:shadow-2xl transition-all duration-300 border-2 border-slate-200 dark:border-slate-800 hover:border-indigo-500 group"
          >
            {/* Project title — turns indigo on hover via group-hover */}
            <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">
              {project.title}
            </h3>

            {/* Tagline — bilingual one-liner from lib/data.ts */}
            <p className="text-slate-600 dark:text-slate-400 mb-4 italic">
              {project.tagline[language]}
            </p>

            {/* Technology stack badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs font-bold text-slate-600 dark:text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/*
              ── KEY CHANGE ────────────────────────────────────────────────
              BEFORE: <Button onClick={() => setSelectedProject(project)}>
                        → opened ProjectDetailModal (simplified in-modal view)

              AFTER:  <Link href={`/projects/${project.id}`}>
                        → navigates to app/projects/[id]/page.tsx
                        → renders the FULL layout shown in the screenshots:
                           sticky nav, hero, challenge/solution cards,
                           architecture image, key implementations grid,
                           code architecture + gist panel, SDG impact section

              Next.js <Link> gives us:
                - Prefetching on hover (instant feel)
                - Client-side navigation (no full page reload)
                - router.back() in BackButton returns here correctly
              ─────────────────────────────────────────────────────────────
            */}
            <Link href={`/projects/${project.id}`} className="block w-full">
              <Button className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
                <BookOpen className="w-4 h-4" />
                {language === "en"
                  ? "View Technical Case Study"
                  : "Technische Fallstudie ansehen"}
              </Button>
            </Link>
          </Card>
        ))}
      </div>

      {/*
        ── REMOVED: ProjectDetailModal ──────────────────────────────────
        The following was here before and has been intentionally removed:

        <ProjectDetailModal
          isOpen={!!selectedProject}
          project={selectedProject}
          language={language}
          onClose={() => setSelectedProject(null)}
        />

        The detail view is now the standalone page at app/projects/[id]/page.tsx.
        You can safely delete components/modals/project-detail-modal.tsx if
        it is no longer referenced anywhere else in the codebase.
        ─────────────────────────────────────────────────────────────────
      */}
    </section>
  );
}
