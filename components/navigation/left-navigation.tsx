/**
 * components/navigation/left-navigation.tsx
 *
 * ── CHANGE IN THIS VERSION ───────────────────────────────────────────────
 *
 * FIX — Cross-file stat inconsistency:
 *   You asked me to make sure "7+ Years" and "500+ Mentees/Students" are
 *   reflected consistently. profile-content.tsx already says 7+ and 500+.
 *   But the "Quick Stats" accordion in THIS file hardcoded different,
 *   smaller numbers:
 *     Experience: "5+ Years" / "5+ Jahre"      → now "7+ Years" / "7+ Jahre"
 *     Students:   "100+"                        → now "500+"
 *   These two panels sit on the same page (left sidebar vs. main profile
 *   card) and a visitor could see "5+ Years" in one place and "7+ Years"
 *   in another within the same scroll — that's the actual consistency bug
 *   your instruction was catching. Certifications ("15+") was already
 *   consistent with profile-content.tsx and is unchanged.
 *
 * No other logic, layout, or the aria-expanded fix from earlier changed.
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
          aria-expanded fix (boolean, not string) — already correct, unchanged.
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
            {/*
              ── FIX: Experience figure ──
              Was "5+ Years" / "5+ Jahre" — contradicted profile-content.tsx's
              "7+" stat card shown lower on the same page. Now matches.
            */}
            <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-300">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {language === "en" ? "Experience" : "Erfahrung"}
              </span>
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {language === "en" ? "7+ Years" : "7+ Jahre"}
              </span>
            </div>

            {/*
              ── FIX: Students Taught figure ──
              Was "100+" — contradicted profile-content.tsx's "500+" stat
              card. Now matches.
            */}
            <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-300">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {language === "en"
                  ? "Students Taught"
                  : "Unterrichtete Schüler"}
              </span>
              <span className="font-bold text-green-600 dark:text-green-400">
                500+
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
