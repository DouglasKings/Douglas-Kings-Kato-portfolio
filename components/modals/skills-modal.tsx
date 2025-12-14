/**
 * Skills Modal Component - With Sticky Header & Natural German
 *
 * Full-page modal displaying comprehensive technical skills.
 * Features:
 * - Sticky header with back navigation and title
 * - Vertical layout: Icons positioned above category titles
 * - Beautiful gradient-themed skill cards
 * - Animated progress bars with gradient fills
 * - Responsive 3-column grid layout
 * - Smooth hover effects and transitions
 * - Bilingual support (English/German) with natural translations
 *
 * @component
 */

"use client";

import { useEffect } from "react";
import {
  ArrowLeft,
  Code,
  Palette,
  Database,
  Server,
  Wrench,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Language } from "@/lib/data";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface SkillsModalProps {
  language: Language;
  onClose: () => void;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function SkillsModal({ language, onClose }: SkillsModalProps) {
  // ============================================================================
  // KEYBOARD HANDLERS & SIDE EFFECTS
  // ============================================================================

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // ============================================================================
  // CONTENT DATA (BILINGUAL) - CORRECTED NATURAL GERMAN
  // ============================================================================

  const content = {
    // Header content
    backButton: {
      en: "Back to Portfolio",
      de: "Zurück zum Portfolio",
    },
    headerTitle: {
      en: "Technical Skills",
      de: "Technische Fähigkeiten",
    },
    // Main title and subtitle
    title: { en: "Technical Skills", de: "Technische Fähigkeiten" },
    subtitle: {
      en: "Programming languages, frameworks, and design tools",
      de: "Programmiersprachen, Frameworks und Design-Tools",
    },
    // Skill categories with natural German translations
    categories: [
      {
        icon: Code,
        title: { en: "Programming Languages", de: "Programmiersprachen" },
        gradient: "from-blue-500 to-cyan-500",
        bgLight: "from-blue-50 to-cyan-50",
        bgDark: "from-blue-900/30 to-cyan-900/30",
        skills: [
          { name: "Java", level: 90 },
          { name: "JavaScript", level: 90 },
          { name: "Python", level: 75 },
          { name: "HTML5", level: 95 },
          { name: "CSS3", level: 95 },
          { name: "C++", level: 70 },
          { name: "C", level: 65 },
        ],
      },
      {
        icon: Layers,
        title: { en: "Frontend Development", de: "Frontend-Entwicklung" },
        gradient: "from-purple-500 to-pink-500",
        bgLight: "from-purple-50 to-pink-50",
        bgDark: "from-purple-900/30 to-pink-900/30",
        skills: [
          { name: "React.js", level: 90 },
          { name: "Tailwind CSS", level: 90 },
          { name: "Bootstrap", level: 85 },
          { name: "Vue.js", level: 75 },
          {
            name: { en: "Responsive Design", de: "Responsives Design" },
            level: 95,
          },
        ],
      },
      {
        icon: Server,
        title: { en: "Backend Development", de: "Backend-Entwicklung" },
        gradient: "from-green-500 to-emerald-500",
        bgLight: "from-green-50 to-emerald-50",
        bgDark: "from-green-900/30 to-emerald-900/30",
        skills: [
          { name: "Spring Boot Microservices", level: 90 },
          { name: "RESTful APIs", level: 90 },
          {
            name: { en: "USSD Integration", de: "USSD-Integration" },
            level: 85,
          },
          { name: "Node.js", level: 80 },
          { name: "Django", level: 70 },
        ],
      },
      {
        icon: Database,
        title: { en: "Database Management", de: "Datenbankverwaltung" },
        gradient: "from-orange-500 to-red-500",
        bgLight: "from-orange-50 to-red-50",
        bgDark: "from-orange-900/30 to-red-900/30",
        skills: [
          { name: "MySQL", level: 90 },
          { name: { en: "Schema Design", de: "Schema-Design" }, level: 90 },
          { name: "PostgreSQL", level: 85 },
          {
            name: { en: "Query Optimization", de: "Query-Optimierung" },
            level: 85,
          },
          { name: "MongoDB", level: 75 },
        ],
      },
      {
        icon: Wrench,
        title: { en: "Tools & DevOps", de: "Tools & DevOps" },
        gradient: "from-indigo-500 to-blue-500",
        bgLight: "from-indigo-50 to-blue-50",
        bgDark: "from-indigo-900/30 to-blue-900/30",
        skills: [
          { name: "Git", level: 95 },
          { name: "GitHub", level: 95 },
          { name: "Agile/Scrum", level: 85 },
          { name: "Maven", level: 80 },
        ],
      },
      {
        icon: Palette,
        title: { en: "Design & Multimedia", de: "Design & Multimedia" },
        gradient: "from-pink-500 to-rose-500",
        bgLight: "from-pink-50 to-rose-50",
        bgDark: "from-pink-900/30 to-rose-900/30",
        skills: [
          { name: "Adobe Creative Suite", level: 90 },
          { name: "Adobe Photoshop", level: 90 },
          { name: "Adobe Illustrator", level: 85 },
          { name: "Adobe Premiere Pro", level: 80 },
          { name: "Moho 12", level: 75 },
        ],
      },
    ],
  };

  // Helper function to get skill name based on language
  const getSkillName = (skill: {
    name: string | { en: string; de: string };
  }) => {
    return typeof skill.name === "string" ? skill.name : skill.name[language];
  };

  // ============================================================================
  // RENDER: SKILLS MODAL
  // ============================================================================

  return (
    <div className="fixed inset-0 z-[100] bg-white dark:bg-slate-950 overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* ====================================================================== */}
      {/* STICKY HEADER WITH BACK NAVIGATION AND TITLE */}
      {/* ====================================================================== */}
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="gap-2 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="w-4 h-4" />
              {content.backButton[language]}
            </Button>

            {/* Header Title */}
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {content.headerTitle[language]}
            </h1>

            {/* Spacer for balance */}
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* ====================================================================== */}
      {/* MAIN CONTENT AREA */}
      {/* ====================================================================== */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* ==================================================================== */}
        {/* TITLE SECTION */}
        {/* ==================================================================== */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl mb-6 shadow-lg">
            <Code className="w-10 h-10 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {content.title[language]}
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {content.subtitle[language]}
          </p>
        </div>

        {/* ==================================================================== */}
        {/* SKILLS GRID - VERTICAL ICON LAYOUT */}
        {/* ==================================================================== */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.categories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <Card
                key={idx}
                className={`group p-6 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br ${category.bgLight} dark:${category.bgDark} border-2 border-slate-200 dark:border-slate-700 hover:-translate-y-1`}
              >
                {/* ============================================================ */}
                {/* CATEGORY HEADER - VERTICAL LAYOUT (Icon Above Title) */}
                {/* ============================================================ */}
                <div className="flex flex-col items-center text-center gap-3 mb-6 pb-4 border-b-2 border-slate-200/50 dark:border-slate-700/50">
                  {/* Icon Container */}
                  <div
                    className={`p-3 bg-gradient-to-br ${category.gradient} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  {/* Title Below Icon */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight px-2">
                    {category.title[language]}
                  </h3>
                </div>

                {/* ============================================================ */}
                {/* SKILLS LIST WITH PROGRESS BARS */}
                {/* ============================================================ */}
                <div className="space-y-5">
                  {category.skills.map((skill, skillIdx) => (
                    <div key={skillIdx} className="space-y-2">
                      {/* Skill name and percentage */}
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm">
                          {getSkillName(skill)}
                        </span>
                        <span
                          className={`text-sm font-bold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}
                        >
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress bar with gradient fill */}
                      <div className="relative h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${category.gradient} rounded-full transition-all duration-1000 ease-out shadow-sm`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
