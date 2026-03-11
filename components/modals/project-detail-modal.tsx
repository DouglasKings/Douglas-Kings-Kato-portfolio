/**
 * ProjectDetailModal — components/modals/project-detail-modal.tsx
 *
 * Full-screen case study view. Completely REPLACES the visible screen —
 * no floating card, no dark backdrop, no clipping.
 *
 * BEHAVIOUR:
 *   - Covers the entire viewport (fixed inset-0) with a solid background
 *   - Sticky header: title centred + "← Back to Gallery" left + "×" right
 *   - Content starts at the TOP and scrolls downward — title always seen first
 *   - Auto-scrolls to top every time a new project opens
 *   - ESC key returns to the gallery
 *
 * Z-INDEX: z-[300] — above GalleryModal (z-[100]) and lightbox (z-[150])
 *
 * @component
 */

"use client";

import { useEffect, useRef } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Globe2,
  Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project, Language } from "@/lib/data";

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  language: Language;
  onClose: () => void;
}

export const ProjectDetailModal = ({
  project,
  isOpen,
  language,
  onClose,
}: ProjectDetailModalProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // ESC key closes and returns to gallery
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Always start at the very top when opening (or switching projects)
  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [isOpen, project?.id]);

  if (!isOpen || !project) return null;

  return (
    /*
     * FULL-SCREEN TAKEOVER
     * fixed inset-0  → covers 100vw × 100vh, edge to edge
     * z-[300]        → above everything else
     * bg-white       → solid, nothing bleeds through
     * flex flex-col  → header fixed at top, content fills rest
     */
    <div className="fixed inset-0 z-[300] bg-white dark:bg-slate-950 flex flex-col">
      {/* ── STICKY HEADER ─────────────────────────────────────────────── */}
      <header className="flex-shrink-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm px-4 md:px-8 py-4 flex items-center gap-3">
        {/* ← Back to Gallery */}
        <Button
          onClick={onClose}
          variant="ghost"
          className="gap-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium flex-shrink-0 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">
            {language === "en" ? "Back to Gallery" : "Zurück zur Galerie"}
          </span>
        </Button>

        {/* Project title — centred between the two buttons */}
        <h1 className="flex-1 text-center text-base md:text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent px-2 truncate">
          {project.title}
        </h1>

        {/* × Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="1" y1="1" x2="15" y2="15" />
            <line x1="15" y1="1" x2="1" y2="15" />
          </svg>
        </button>
      </header>

      {/* ── SCROLLABLE CONTENT ────────────────────────────────────────── */}
      {/*
        ref={scrollRef} lets the useEffect reset scrollTop = 0 on open.
        flex-1 + overflow-y-auto fills the remaining height and scrolls.
        Content always starts visible at the top — no clipping.
      */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 space-y-8">
          {/* ── 1. Challenge vs Solution ─────────────────────────────── */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold uppercase tracking-wider text-xs">
                <ShieldCheck className="w-4 h-4" />
                {language === "en" ? "The Challenge" : "Die Herausforderung"}
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {project.problem[language]}
              </p>
            </div>

            <div className="p-6 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold uppercase tracking-wider text-xs">
                <CheckCircle2 className="w-4 h-4" />
                {language === "en"
                  ? "The Engineering Solution"
                  : "Die technische Lösung"}
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {project.solution[language]}
              </p>
            </div>
          </div>

          {/* ── 2. Technical Architecture ────────────────────────────── */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
              <Cpu className="w-5 h-5 text-indigo-500" />
              {language === "en"
                ? "Technical Architecture"
                : "Technische Architektur"}
            </h2>
            <div className="aspect-video rounded-xl overflow-hidden border border-slate-300 dark:border-slate-600 bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
              {project.architectureImage ? (
                <img
                  src={project.architectureImage}
                  alt={`${project.title} architecture`}
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-slate-400 italic text-sm">
                  {language === "en"
                    ? "Architecture diagram coming soon"
                    : "Architekturdiagramm folgt in Kürze"}
                </span>
              )}
            </div>
          </div>

          {/* ── 3. Key Technical Features ────────────────────────────── */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {language === "en"
                ? "Key Technical Features"
                : "Wichtige technische Merkmale"}
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {project.keyFeatures[language].map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-sm"
                >
                  <div className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0 mt-1.5" />
                  <span className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── 4. Global SDG Impact ─────────────────────────────────── */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-7 rounded-2xl text-white shadow-xl">
            <div className="flex items-center gap-3 mb-3">
              <Globe2 className="w-6 h-6 flex-shrink-0" />
              <h2 className="font-bold uppercase tracking-widest text-sm">
                {language === "en" ? "Global Impact" : "Globale Wirkung"}
              </h2>
            </div>
            <p className="leading-relaxed opacity-90">
              {project.impact[language]}
            </p>
          </div>

          {/* ── Bottom: Back button ───────────────────────────────────── */}
          <div className="flex justify-center pt-2 pb-6">
            <Button
              onClick={onClose}
              size="lg"
              className="rounded-full px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {language === "en" ? "Back to Gallery" : "Zurück zur Galerie"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
