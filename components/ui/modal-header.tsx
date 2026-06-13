/**
 * components/ui/modal-header.tsx
 *
 * MOBILE FIX — Modal header overlap
 * ══════════════════════════════════
 * PROBLEM: All modals used:
 *   <h1 className="... absolute left-1/2 transform -translate-x-1/2">
 * On mobile (~360px) this absolutely-positioned title overlaps the
 * "Back to Portfolio" button, making both unreadable.
 *
 * SOLUTION: Replace the absolute-centering trick with a proper flexbox
 * layout that gracefully degrades on narrow screens:
 *
 *   [← Back]  [Title — truncates if needed]  [spacer]
 *
 * The title uses `flex-1 text-center` so it naturally centers between
 * the button and spacer WITHOUT absolute positioning. On mobile the
 * title truncates instead of overlapping.
 *
 * Usage (replaces the existing header in every modal):
 *
 *   <ModalHeader
 *     title="Certifications & Achievements"
 *     gradientClass="from-yellow-600 via-orange-600 to-red-600"
 *     backLabel={content.backButton[language]}
 *     onBack={onClose}
 *   />
 */

"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ModalHeaderProps {
  /** Localised title string */
  title: string;
  /** Tailwind gradient classes e.g. "from-blue-600 via-purple-600 to-pink-600" */
  gradientClass: string;
  /** Localised back-button label */
  backLabel: string;
  /** Callback when back button clicked */
  onBack: () => void;
}

export default function ModalHeader({
  title,
  gradientClass,
  backLabel,
  onBack,
}: ModalHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-md">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        {/*
         * LAYOUT (mobile-safe):
         *   flex row, no overflow
         *   back-button (flex-shrink-0) | title (flex-1 text-center) | spacer (same width as button)
         *
         * The spacer div matches the button's min-width so the title is
         * visually centred. Both the button and spacer use the same w value.
         * On very narrow screens the title truncates (truncate class) rather
         * than overlapping the button.
         */}
        <div className="flex items-center gap-2">
          {/* ← Back button — never shrinks */}
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="gap-1.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex-shrink-0 px-2 sm:px-3"
          >
            <ArrowLeft className="w-4 h-4 flex-shrink-0" />
            {/* Label hidden on very small phones, shown on sm+ */}
            <span className="hidden xs:inline sm:inline text-xs sm:text-sm whitespace-nowrap">
              {backLabel}
            </span>
          </Button>

          {/* Title — fills remaining space, centred, truncates on overflow */}
          <h1
            className={`
              flex-1 text-center text-sm sm:text-base md:text-xl font-bold
              bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent
              truncate px-1
            `}
          >
            {title}
          </h1>

          {/*
           * Right spacer — same visual weight as the back button so the
           * title stays centred. Width matches button approx width.
           */}
          <div className="flex-shrink-0 w-10 sm:w-[100px]" aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}
