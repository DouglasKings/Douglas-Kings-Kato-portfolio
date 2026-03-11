/**
 * components/sections/gallery-section.tsx
 *
 * ── PERFORMANCE FIX: Prefetch project pages on hover ─────────────────────────
 *
 * PROBLEM:
 *   Clicking "View Technical Case Study" felt slow because the project page
 *   was only compiled on-demand when clicked. The gallery is inside a modal,
 *   so Next.js can't automatically prefetch links at page load.
 *
 * SOLUTION: Two-layer prefetch strategy
 *
 *   Layer 1 — router.prefetch() on mount (useEffect):
 *     When GallerySection renders (gallery modal opens), we immediately
 *     prefetch ALL project pages in the background. Silent, no UI change.
 *
 *   Layer 2 — router.prefetch() on mouse hover (onMouseEnter):
 *     Redundant safety net — fires again on hover for any page not yet
 *     fully prefetched from Layer 1.
 *
 * NEW vs previous version:
 *   + useEffect, useRouter imports
 *   + useEffect that prefetches all project pages on mount
 *   + onMouseEnter on each Link for hover prefetch
 */

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ImageIcon, BookOpen } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { projects, type Language } from "@/lib/data";

interface GallerySectionProps {
  language: Language;
}

export default function GallerySection({ language }: GallerySectionProps) {
  const router = useRouter();

  /**
   * Prefetch ALL project pages the moment the gallery modal opens.
   * Next.js downloads + compiles each page silently in the background.
   * By the time the user clicks a button, the page is already ready.
   */
  useEffect(() => {
    projects.forEach((project) => {
      router.prefetch(`/projects/${project.id}`);
    });
  }, [router]);

  return (
    <section id="gallery" className="scroll-mt-16 py-8">
      {/* Section Header */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
          <ImageIcon className="w-8 h-8 text-pink-600" />
          {language === "en"
            ? "Core Technical Projects"
            : "Technische Kernprojekte"}
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          {language === "en"
            ? "Technical blueprints for sustainable digital transformation and community impact."
            : "Technische Blaupausen für nachhaltige digitale Transformation und gesellschaftliche Wirkung."}
        </p>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="p-6 hover:shadow-2xl transition-all duration-300 border-2 border-slate-200 dark:border-slate-800 hover:border-indigo-500 group"
          >
            <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">
              {project.title}
            </h3>

            <p className="text-slate-600 dark:text-slate-400 mb-4 italic">
              {project.tagline[language]}
            </p>

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

            {/* onMouseEnter = hover prefetch (safety net on top of useEffect) */}
            <Link
              href={`/projects/${project.id}`}
              className="block w-full"
              onMouseEnter={() => router.prefetch(`/projects/${project.id}`)}
            >
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
    </section>
  );
}
