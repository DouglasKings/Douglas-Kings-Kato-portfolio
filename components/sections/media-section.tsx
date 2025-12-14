/**
 * Media Section Component - With Natural German Translations
 *
 * Displays multimedia content including videos and media showcases.
 * This is a placeholder component that can be expanded to include:
 * - Video portfolio
 * - Image galleries
 * - Interactive media presentations
 * - Embedded content from external platforms
 *
 * TRANSLATIONS CORRECTED:
 * - "Media & Videos" → "Medien & Videos"
 * - "Coming soon" → "Inhalte folgen bald..."
 *
 * @component
 */

"use client";

import { Film } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Language } from "@/lib/data";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface MediaSectionProps {
  language: Language;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * MediaSection Component
 *
 * Renders a placeholder for media content display.
 * Can be expanded to showcase videos, animations, and other multimedia work.
 *
 * @param {MediaSectionProps} props - Component props
 * @param {Language} props.language - Current language setting
 * @returns {JSX.Element} The media section
 */
export default function MediaSection({ language }: MediaSectionProps) {
  // ============================================================================
  // CONTENT DATA - NATURAL GERMAN TRANSLATIONS
  // ============================================================================

  const content = {
    en: {
      title: "Media & Videos",
      description: "Explore my multimedia projects and video content.",
      comingSoon: "Content coming soon...",
    },
    de: {
      title: "Medien & Videos",
      description: "Entdecken Sie meine Multimedia-Projekte und Videoinhalte.",
      comingSoon: "Inhalte folgen bald...",
    },
  };

  const text = content[language];

  // ============================================================================
  // RENDER: MEDIA SECTION
  // ============================================================================

  return (
    <section id="media" className="scroll-mt-8">
      {/* ==================================================================== */}
      {/* SECTION HEADER */}
      {/* ==================================================================== */}
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
        <Film className="w-8 h-8 text-purple-600 dark:text-purple-400" />
        {text.title}
      </h2>

      {/* ==================================================================== */}
      {/* PLACEHOLDER CARD */}
      {/* ==================================================================== */}
      <Card className="p-12 text-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-800">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-6">
          <Film className="w-10 h-10 text-purple-600 dark:text-purple-400" />
        </div>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-4 font-medium">
          {text.description}
        </p>
        <p className="text-slate-500 dark:text-slate-500 italic">
          {text.comingSoon}
        </p>
      </Card>
    </section>
  );
}
