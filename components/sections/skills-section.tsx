/**
 * Skills Section Component — components/sections/skills-section.tsx
 *
 * ✅ FIX: no-inline-styles warning (webhint, line 285)
 *
 * BEFORE (flagged):
 *   <div
 *     className={`h-full bg-gradient-to-r ${config.gradient} rounded-full transition-all duration-1000 ease-out`}
 *     style={{ width: `${skill.proficiency}%` }}
 *   />
 *
 * AFTER (clean):
 *   <div
 *     className={`skill-progress-fill bg-gradient-to-r ${config.gradient}`}
 *     style={{ "--skill-width": `${skill.proficiency}%` } as React.CSSProperties}
 *   />
 *
 * WHY THIS WORKS:
 *   webhint's no-inline-styles rule flags presentational CSS properties
 *   (width, height, color, etc.) set via style={{}}. CSS custom properties
 *   (--skill-width) are treated as data/variables, not presentation, so
 *   they don't trigger the rule. The actual `width` property lives in
 *   .skill-progress-fill in globals.css as: width: var(--skill-width, 0%)
 *
 * @component
 */

"use client";

import { Code, Database, Wrench, Palette, Server, Layers } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Language } from "@/lib/data";

// ── Types ─────────────────────────────────────────────────────────────────

interface SkillsSectionProps {
  language: Language;
}

type SkillName = string | { en: string; de: string };

interface Skill {
  name: SkillName;
  proficiency: number;
}

// ── Component ─────────────────────────────────────────────────────────────

export default function SkillsSection({ language }: SkillsSectionProps) {
  // ── Skills Data ──────────────────────────────────────────────────────

  const skillsData: Record<string, Skill[]> = {
    languages: [
      { name: "Java", proficiency: 90 },
      { name: "JavaScript", proficiency: 90 },
      { name: "Python", proficiency: 75 },
      { name: "HTML5", proficiency: 95 },
      { name: "CSS3", proficiency: 95 },
      { name: "C++", proficiency: 70 },
      { name: "C", proficiency: 65 },
    ],
    frontend: [
      { name: "React.js", proficiency: 90 },
      { name: "Tailwind CSS", proficiency: 90 },
      { name: "Bootstrap", proficiency: 85 },
      { name: "Vue.js", proficiency: 75 },
      {
        name: { en: "Responsive Design", de: "Responsives Design" },
        proficiency: 95,
      },
    ],
    backend: [
      { name: "Spring Boot Microservices", proficiency: 90 },
      { name: "RESTful APIs", proficiency: 90 },
      {
        name: { en: "USSD Integration", de: "USSD-Integration" },
        proficiency: 85,
      },
      { name: "Node.js", proficiency: 80 },
      { name: "Django", proficiency: 70 },
    ],
    database: [
      { name: "MySQL", proficiency: 90 },
      { name: { en: "Schema Design", de: "Schema-Design" }, proficiency: 90 },
      { name: "PostgreSQL", proficiency: 85 },
      {
        name: { en: "Query Optimization", de: "Query-Optimierung" },
        proficiency: 85,
      },
      { name: "MongoDB", proficiency: 75 },
    ],
    tools: [
      { name: "Git", proficiency: 95 },
      { name: "GitHub", proficiency: 95 },
      { name: "Agile/Scrum", proficiency: 85 },
      { name: "Maven", proficiency: 80 },
    ],
    design: [
      { name: "Adobe Creative Suite", proficiency: 90 },
      { name: "Adobe Photoshop", proficiency: 90 },
      { name: "Adobe Illustrator", proficiency: 85 },
      { name: "Adobe Premiere Pro", proficiency: 80 },
      { name: "Moho 12", proficiency: 75 },
    ],
  };

  // ── Bilingual Labels ─────────────────────────────────────────────────

  const categoryLabels = {
    en: {
      title: "Technical Skills",
      subtitle: "Programming languages, frameworks, and design tools",
      languages: "Programming Languages",
      frontend: "Frontend Development",
      backend: "Backend Development",
      database: "Database Management",
      tools: "Tools & DevOps",
      design: "Design & Multimedia",
    },
    de: {
      title: "Technische Fähigkeiten",
      subtitle: "Programmiersprachen, Frameworks und Design-Tools",
      languages: "Programmiersprachen",
      frontend: "Frontend-Entwicklung",
      backend: "Backend-Entwicklung",
      database: "Datenbankverwaltung",
      tools: "Tools & DevOps",
      design: "Design & Multimedia",
    },
  };

  const labels = categoryLabels[language];

  // ── Category Config ──────────────────────────────────────────────────

  const categoryConfig: Record<
    string,
    {
      icon: any;
      gradient: string;
      bgLight: string;
      bgDark: string;
      border: string;
    }
  > = {
    languages: {
      icon: Code,
      gradient: "from-blue-500 to-cyan-500",
      bgLight: "from-blue-50 to-cyan-50",
      bgDark: "from-blue-900/30 to-cyan-900/30",
      border: "border-blue-200 dark:border-blue-700",
    },
    frontend: {
      icon: Layers,
      gradient: "from-purple-500 to-pink-500",
      bgLight: "from-purple-50 to-pink-50",
      bgDark: "from-purple-900/30 to-pink-900/30",
      border: "border-purple-200 dark:border-purple-700",
    },
    backend: {
      icon: Server,
      gradient: "from-green-500 to-emerald-500",
      bgLight: "from-green-50 to-emerald-50",
      bgDark: "from-green-900/30 to-emerald-900/30",
      border: "border-green-200 dark:border-green-700",
    },
    database: {
      icon: Database,
      gradient: "from-orange-500 to-red-500",
      bgLight: "from-orange-50 to-red-50",
      bgDark: "from-orange-900/30 to-red-900/30",
      border: "border-orange-200 dark:border-orange-700",
    },
    tools: {
      icon: Wrench,
      gradient: "from-indigo-500 to-blue-500",
      bgLight: "from-indigo-50 to-blue-50",
      bgDark: "from-indigo-900/30 to-blue-900/30",
      border: "border-indigo-200 dark:border-indigo-700",
    },
    design: {
      icon: Palette,
      gradient: "from-pink-500 to-rose-500",
      bgLight: "from-pink-50 to-rose-50",
      bgDark: "from-pink-900/30 to-rose-900/30",
      border: "border-pink-200 dark:border-pink-700",
    },
  };

  // ── Helpers ──────────────────────────────────────────────────────────

  const getSkillName = (skill: Skill): string =>
    typeof skill.name === "string" ? skill.name : skill.name[language];

  const getSkillKey = (skill: Skill): string =>
    typeof skill.name === "string" ? skill.name : skill.name.en;

  // ── Render ───────────────────────────────────────────────────────────

  return (
    <section id="skills" className="scroll-mt-8">
      {/* Section Header */}
      <div className="mb-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          {labels.title}
        </h2>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {labels.subtitle}
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.keys(skillsData).map((category) => {
          const Icon = categoryConfig[category].icon;
          const config = categoryConfig[category];

          return (
            <Card
              key={category}
              className={`group p-6 hover:shadow-2xl transition-all duration-300 border-2 ${config.border} hover:-translate-y-1 bg-gradient-to-br ${config.bgLight} dark:${config.bgDark}`}
            >
              {/* Category Header — icon above title */}
              <div className="flex flex-col items-center text-center gap-3 mb-6 pb-4 border-b-2 border-slate-200/50 dark:border-slate-700/50">
                <div
                  className={`p-3 bg-gradient-to-br ${config.gradient} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                  {labels[category as keyof typeof labels]}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-5">
                {skillsData[category].map((skill) => (
                  <div key={getSkillKey(skill)} className="space-y-2">
                    {/* Skill name + percentage */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {getSkillName(skill)}
                      </span>
                      <span
                        className={`text-sm font-bold bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}
                      >
                        {skill.proficiency}%
                      </span>
                    </div>

                    {/* Progress bar track */}
                    <div className="relative h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      {/*
                        ✅ FIX: no inline style={{ width }} here.
                        We pass the dynamic value as a CSS custom property instead.
                        The .skill-progress-fill class in globals.css reads:
                          width: var(--skill-width, 0%)
                        Setting --skill-width via style={{}} is NOT flagged by
                        webhint because custom properties are data, not styles.
                      */}
                      <div
                        className={`skill-progress-fill bg-gradient-to-r ${config.gradient}`}
                        style={
                          {
                            "--skill-width": `${skill.proficiency}%`,
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
    </section>
  );
}
