/**
 * components/modals/skills-modal.tsx
 *
 * ── CHANGES IN THIS VERSION ──────────────────────────────────────────────
 *
 * FIX 1 — Missing scroll-lock (Task 3):
 *   Like education-modal.tsx, this only had an ESC-key listener with no
 *   document.body.style.overflow lock. Added the standard pattern.
 *
 * FIX 2 — Dark mode gradient contrast (Task 1):
 *   The big "Technical Skills" h2 title used a blue→purple→pink gradient
 *   with no dark: stops — added lighter variants. The skill-category
 *   gradients (per-card icon backgrounds and percentage text) were left
 *   alone on purpose: those already sit on a tinted card background
 *   (bgLight / bgDark per category), not directly on the page background,
 *   so their existing contrast is fine and changing them would make the
 *   per-category color coding inconsistent with skills-section.tsx.
 *
 * No other logic changed — skill data, percentages, and the
 * .skill-progress-fill CSS-variable pattern are untouched.
 */

"use client";

import { useEffect } from "react";
import { Code, Palette, Database, Server, Wrench, Layers } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Language } from "@/lib/data";
import ModalHeader from "@/components/ui/modal-header";

interface SkillsModalProps {
  language: Language;
  onClose: () => void;
}

export default function SkillsModal({ language, onClose }: SkillsModalProps) {
  // ── FIX: added scroll-lock, matching pattern used by every other modal ──
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  const content = {
    backButton: { en: "Back to Portfolio", de: "Zurück zum Portfolio" },
    headerTitle: { en: "Technical Skills", de: "Technische Fähigkeiten" },
    title: { en: "Technical Skills", de: "Technische Fähigkeiten" },
    subtitle: {
      en: "Programming languages, frameworks, and design tools",
      de: "Programmiersprachen, Frameworks und Design-Tools",
    },
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

  const getSkillName = (skill: {
    name: string | { en: string; de: string };
  }) => (typeof skill.name === "string" ? skill.name : skill.name[language]);

  return (
    <div className="fixed inset-0 z-[100] bg-white dark:bg-slate-950 overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
      <ModalHeader
        title={content.headerTitle[language]}
        gradientClass="from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-300 dark:to-pink-400"
        backLabel={content.backButton[language]}
        onBack={onClose}
      />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl mb-6 shadow-lg">
            <Code className="w-10 h-10 text-purple-600 dark:text-purple-400" />
          </div>
          {/*
            ── FIX: dark-mode gradient contrast ──
            Page-level h2 title sits directly on bg-white/dark:bg-slate-950,
            so it needs lighter stops to stay readable at night.
          */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-300 dark:to-pink-400 bg-clip-text text-transparent">
            {content.title[language]}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {content.subtitle[language]}
          </p>
        </div>

        {/* On mobile: single column. md: 2 cols. lg: 3 cols. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.categories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <Card
                key={idx}
                className={`group p-5 sm:p-6 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br ${category.bgLight} dark:${category.bgDark} border-2 border-slate-200 dark:border-slate-700 hover:-translate-y-1`}
              >
                <div className="flex flex-col items-center text-center gap-3 mb-6 pb-4 border-b-2 border-slate-200/50 dark:border-slate-700/50">
                  <div
                    className={`p-3 bg-gradient-to-br ${category.gradient} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight px-2">
                    {category.title[language]}
                  </h3>
                </div>

                <div className="space-y-5">
                  {category.skills.map((skill, skillIdx) => (
                    <div key={skillIdx} className="space-y-2">
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
                      <div className="relative h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`skill-progress-fill bg-gradient-to-r ${category.gradient}`}
                          style={
                            {
                              "--skill-width": `${skill.level}%`,
                            } as React.CSSProperties
                          }
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
