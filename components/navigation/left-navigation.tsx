/**
 * Left Navigation Component - Refined Edition
 *
 * Vertical navigation sidebar that provides quick access to different portfolio sections.
 * Design matches the reference screenshots with proper spacing and styling.
 *
 * Features:
 * - Profile photo and name display with online status
 * - Section navigation cards with icons and descriptions
 * - Opens modals for Education, Experience, Skills, and Certificates
 * - Bilingual labels (English/German)
 * - Responsive design (collapsible on mobile)
 * - Quick Stats section matching CV data
 * - Smooth animations and hover effects
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

interface LeftNavigationProps {
  language: Language;
  onNavigate?: (section: string) => void;
}

/**
 * LeftNavigation Component
 *
 * Renders a vertical navigation bar with profile information and section links.
 * Each navigation item opens the corresponding modal or navigates to section.
 *
 * @param {LeftNavigationProps} props - Component props
 * @param {Language} props.language - Current language setting ("en" or "de")
 * @param {Function} props.onNavigate - Callback when navigating to a section (opens modals)
 * @returns {JSX.Element} The left navigation sidebar
 */
export default function LeftNavigation({
  language,
  onNavigate,
}: LeftNavigationProps) {
  // State for Quick Stats accordion
  const [statsExpanded, setStatsExpanded] = useState(true);

  // Navigation sections configuration
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

  /**
   * Handle navigation item click
   * Triggers the callback to open the corresponding modal
   *
   * @param {string} sectionId - The ID of the section to navigate to
   */
  const handleNavigate = (sectionId: string) => {
    // Trigger callback to open modal
    if (onNavigate) {
      onNavigate(sectionId);
    }
  };

  /**
   * Get color classes based on section color
   */
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

  return (
    <aside className="w-full md:w-80 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6 md:h-screen md:sticky md:top-0 overflow-y-auto">
      {/* ====================================================================== */}
      {/* SECTION HEADER */}
      {/* ====================================================================== */}
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

      {/* ====================================================================== */}
      {/* NAVIGATION CARDS */}
      {/* ====================================================================== */}
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
                {/* Icon Container */}
                <div
                  className={`p-2 ${colors.bg} ${colors.hover} rounded-lg transition-colors duration-300`}
                >
                  <Icon className={`w-5 h-5 ${colors.text}`} />
                </div>

                {/* Text Content */}
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

      {/* ====================================================================== */}
      {/* QUICK STATS SECTION */}
      {/* ====================================================================== */}
      <div className="mb-8">
        {/* Stats Header (Collapsible) */}
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

        {/* Stats Content (Animated) */}
        {statsExpanded && (
          <div className="mt-3 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Experience Stat */}
            <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-300">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {language === "en" ? "Experience" : "Erfahrung"}
              </span>
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {language === "en" ? "5+ Years" : "5+ Jahre"}
              </span>
            </div>

            {/* Students Taught Stat */}
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

            {/* Certifications Stat */}
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

      {/* ====================================================================== */}
      {/* FOOTER NOTE */}
      {/* ====================================================================== */}
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
