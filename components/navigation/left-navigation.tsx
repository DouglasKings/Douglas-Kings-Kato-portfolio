/**
 * Left Navigation Component — components/navigation/left-navigation.tsx
 *
 * ✅ ARIA FIX (axe/aria — aria-valid-attr-value):
 *
 *    The linter error was:
 *      "Invalid ARIA attribute value: aria-expanded="{expression}""
 *
 *    This is the axe accessibility rule firing because the value wasn't
 *    resolving to a recognized valid ARIA token at analysis time.
 *
 *    Root cause & correct fix:
 *      In React, `aria-expanded` on a native <button> accepts a BOOLEAN
 *      directly — React converts it to the correct string in the DOM.
 *      The linter (Microsoft Edge Tools / axe) was seeing the dynamic
 *      expression `{statsExpanded ? "true" : "false"}` and flagging it
 *      because it evaluated the JSX expression as a literal "{expression}"
 *      string at static analysis time.
 *
 *      The most compatible solution that satisfies BOTH React and axe is:
 *        aria-expanded={statsExpanded}   ← plain boolean, React handles it
 *
 *      This produces aria-expanded="true" / aria-expanded="false" in the DOM,
 *      which is exactly what screen readers and axe expect.
 *
 * Features:
 * - Section navigation cards (Education, Experience, Skills, Certificates)
 * - Quick Stats collapsible accordion
 * - Bilingual (English / German)
 * - Responsive sticky sidebar
 *
 * @component
 */

"use client";

import {
  Briefcase,
  GraduationCap,
  Code,
  Award,
  ChevronDown,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Language } from "@/lib/data";
import { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────

interface LeftNavigationProps {
  language: Language;
  /**
   * Fires when a navigation card is clicked.
   * Parent (page.tsx) uses this to call setActiveModal(section).
   */
  onNavigate?: (section: string) => void;
}

// ── Component ──────────────────────────────────────────────────────────────

export default function LeftNavigation({
  language,
  onNavigate,
}: LeftNavigationProps) {
  /** Controls whether the Quick Stats accordion is open. Defaults to open. */
  const [statsExpanded, setStatsExpanded] = useState(true);

  // ── Navigation sections config ──────────────────────────────────────────

  const sections = [
    {
      id: "education",
      icon: GraduationCap,
      label: { en: "Education", de: "Bildung" },
      sublabel: { en: "Background", de: "Hintergrund" },
      description: {
        en: "My academic journey from multimedia design to applied IT.",
        de: "Meine akademische Reise von Multimedia-Design bis zur angewandten IT.",
      },
      color: "blue",
    },
    {
      id: "experience",
      icon: Briefcase,
      label: { en: "Experience", de: "Erfahrung" },
      sublabel: { en: "Background", de: "Hintergrund" },
      description: {
        en: "Teaching and design roles in Uganda and China.",
        de: "Lehr- und Designrollen in Uganda und China.",
      },
      color: "indigo",
    },
    {
      id: "skills",
      icon: Code,
      label: { en: "Technical Skills", de: "Technische Fähigkeiten" },
      sublabel: { en: "Technical", de: "Technisch" },
      description: {
        en: "Programming languages, frameworks, and design tools.",
        de: "Programmiersprachen, Frameworks und Design-Tools.",
      },
      color: "purple",
    },
    {
      id: "certificates",
      icon: Award,
      label: { en: "Certificates", de: "Zertifikate" },
      sublabel: { en: "Technical", de: "Technisch" },
      description: {
        en: "My professional certifications and credentials.",
        de: "Meine professionellen Zertifizierungen und Qualifikationen.",
      },
      color: "orange",
    },
  ];

  // ── Helpers ────────────────────────────────────────────────────────────

  /** Bubbles the clicked section ID up to page.tsx → setActiveModal */
  const handleNavigate = (sectionId: string) => {
    if (onNavigate) onNavigate(sectionId);
  };

  /** Returns Tailwind color classes for a given color key */
  const getColorClasses = (color: string) => {
    const colors: Record<
      string,
      { bg: string; hover: string; text: string; border: string }
    > = {
      blue: {
        bg: "bg-blue-100 dark:bg-blue-900/30",
        hover: "hover:bg-blue-200 dark:hover:bg-blue-800/50",
        text: "text-blue-600 dark:text-blue-400",
        border: "hover:border-blue-500 dark:hover:border-blue-600",
      },
      indigo: {
        bg: "bg-indigo-100 dark:bg-indigo-900/30",
        hover: "hover:bg-indigo-200 dark:hover:bg-indigo-800/50",
        text: "text-indigo-600 dark:text-indigo-400",
        border: "hover:border-indigo-500 dark:hover:border-indigo-600",
      },
      purple: {
        bg: "bg-purple-100 dark:bg-purple-900/30",
        hover: "hover:bg-purple-200 dark:hover:bg-purple-800/50",
        text: "text-purple-600 dark:text-purple-400",
        border: "hover:border-purple-500 dark:hover:border-purple-600",
      },
      orange: {
        bg: "bg-orange-100 dark:bg-orange-900/30",
        hover: "hover:bg-orange-200 dark:hover:bg-orange-800/50",
        text: "text-orange-600 dark:text-orange-400",
        border: "hover:border-orange-500 dark:hover:border-orange-600",
      },
    };
    return colors[color] || colors.blue;
  };

  // ── Render ─────────────────────────────────────────────────────────────

  return (
    <aside className="w-full md:w-80 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6 md:h-screen md:sticky md:top-0 overflow-y-auto">
      {/* Section Header */}
      <div className="text-center mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {language === "en"
            ? "Professional Background"
            : "Beruflicher Hintergrund"}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {language === "en"
            ? "Click to explore my professional journey"
            : "Klicken Sie, um meine berufliche Reise zu erkunden"}
        </p>
      </div>

      {/* Navigation Cards */}
      <div className="space-y-3 mb-8">
        {sections.map((item) => {
          const Icon = item.icon;
          const colors = getColorClasses(item.color);

          return (
            <Card
              key={item.id}
              className={`p-4 cursor-pointer hover:shadow-lg transition-all duration-300 ${colors.border} group`}
              onClick={() => handleNavigate(item.id)}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 ${colors.bg} ${colors.hover} rounded-lg transition-colors duration-300`}
                >
                  <Icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.label[language]}
                  </h3>
                  <p className={`text-xs ${colors.text} font-medium mb-1`}>
                    {item.sublabel[language]}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.description[language]}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          QUICK STATS ACCORDION

          ✅ ARIA FIX:
          Use a plain boolean value for aria-expanded.

          ❌ Was:   aria-expanded={statsExpanded ? "true" : "false"}
                    → axe flags this as "Invalid ARIA attribute value:
                      aria-expanded='{expression}'" during static analysis
                      because the ternary expression isn't resolved at lint time.

          ✅ Now:   aria-expanded={statsExpanded}
                    → React renders aria-expanded="true" or aria-expanded="false"
                      in the DOM correctly. axe sees a clean boolean-like value.
                      Screen readers announce expanded/collapsed state properly.

          Why this works:
            React's JSX-to-DOM mapping converts boolean `true` → "true" and
            `false` → "false" for aria-* attributes on native elements.
            This is the idiomatic React pattern and satisfies the axe rule.
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="mb-8">
        <button
          onClick={() => setStatsExpanded(!statsExpanded)}
          className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-800/50 rounded-lg hover:from-slate-200 hover:to-slate-100 dark:hover:from-slate-700 dark:hover:to-slate-700/50 transition-all duration-300 shadow-sm hover:shadow-md"
          aria-expanded={statsExpanded}
          aria-label={
            language === "en"
              ? "Toggle Quick Stats"
              : "Schnellstatistik umschalten"
          }
        >
          <h3 className="font-bold text-slate-900 dark:text-white">
            {language === "en" ? "Quick Stats" : "Schnellstatistik"}
          </h3>
          <ChevronDown
            className={`w-5 h-5 text-slate-600 dark:text-slate-400 transition-transform duration-300 ${
              statsExpanded ? "rotate-180" : ""
            }`}
          />
        </button>

        {statsExpanded && (
          <div className="mt-3 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-300">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {language === "en" ? "Experience" : "Erfahrung"}
              </span>
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {language === "en" ? "5+ Years" : "5+ Jahre"}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-300">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {language === "en"
                  ? "Students Taught"
                  : "Unterrichtete Schüler"}
              </span>
              <span className="font-bold text-green-600 dark:text-green-400">
                100+
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-300">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {language === "en" ? "Certifications" : "Zertifizierungen"}
              </span>
              <span className="font-bold text-purple-600 dark:text-purple-400">
                15+
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Footer Note */}
      <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-700">
        <p className="text-xs text-center text-slate-500 dark:text-slate-500">
          {language === "en"
            ? "Click any section to view details"
            : "Klicken Sie auf einen Abschnitt für Details"}
        </p>
      </div>
    </aside>
  );
}
