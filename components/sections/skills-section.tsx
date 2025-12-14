/**
 * Skills Section Component - Vertical Icon Layout with Natural German
 *
 * Displays technical skills organized by category with icons positioned above text.
 * Features:
 * - Vertical layout: Icon at top, title below
 * - Categorized skill display with gradient themes
 * - Animated progress bars showing proficiency levels
 * - Responsive grid layout (1/2/3 columns)
 * - Bilingual labels (English/German) with natural translations
 * - Hover effects and smooth transitions
 *
 * CORRECTED TRANSLATIONS:
 * - "Responsive Design" → "Responsives Design"
 * - "USSD Integration" → "USSD-Integration"
 * - "Schema Design" → "Schema-Design"
 * - "Query Optimization" → "Query-Optimierung"
 *
 * @component
 */

"use client";

import { Code, Database, Wrench, Palette, Server, Layers } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Language } from "@/lib/data";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface SkillsSectionProps {
  language: Language;
}

// ============================================================================
// SKILL NAME TYPE
// ============================================================================

type SkillName = string | { en: string; de: string };

interface Skill {
  name: SkillName;
  proficiency: number;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function SkillsSection({ language }: SkillsSectionProps) {
  // ============================================================================
  // SKILLS DATA WITH BILINGUAL NAMES WHERE NEEDED
  // ============================================================================

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
      {
        name: { en: "Schema Design", de: "Schema-Design" },
        proficiency: 90,
      },
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

  // ============================================================================
  // BILINGUAL LABELS - NATURAL GERMAN TRANSLATIONS
  // ============================================================================

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

  // ============================================================================
  // CATEGORY CONFIGURATION (Icons and Colors)
  // ============================================================================

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

  // ============================================================================
  // HELPER FUNCTION - GET SKILL NAME BASED ON LANGUAGE
  // ============================================================================

  const getSkillName = (skill: Skill): string => {
    return typeof skill.name === "string" ? skill.name : skill.name[language];
  };

  // ============================================================================
  // HELPER FUNCTION - GET UNIQUE KEY FOR SKILL
  // ============================================================================

  const getSkillKey = (skill: Skill): string => {
    return typeof skill.name === "string" ? skill.name : skill.name.en;
  };

  // ============================================================================
  // RENDER: SKILLS SECTION
  // ============================================================================

  return (
    <section id="skills" className="scroll-mt-8">
      {/* ==================================================================== */}
      {/* SECTION HEADER */}
      {/* ==================================================================== */}
      <div className="mb-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          {labels.title}
        </h2>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {labels.subtitle}
        </p>
      </div>

      {/* ==================================================================== */}
      {/* SKILLS GRID - VERTICAL ICON LAYOUT */}
      {/* ==================================================================== */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.keys(skillsData).map((category) => {
          const Icon = categoryConfig[category].icon;
          const config = categoryConfig[category];

          return (
            <Card
              key={category}
              className={`group p-6 hover:shadow-2xl transition-all duration-300 border-2 ${config.border} hover:-translate-y-1 bg-gradient-to-br ${config.bgLight} dark:${config.bgDark}`}
            >
              {/* ============================================================ */}
              {/* CATEGORY HEADER - VERTICAL LAYOUT (Icon Above Text) */}
              {/* ============================================================ */}
              <div className="flex flex-col items-center text-center gap-3 mb-6 pb-4 border-b-2 border-slate-200/50 dark:border-slate-700/50">
                {/* Icon Container */}
                <div
                  className={`p-3 bg-gradient-to-br ${config.gradient} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                {/* Title Below Icon */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                  {labels[category as keyof typeof labels]}
                </h3>
              </div>

              {/* ============================================================ */}
              {/* SKILLS LIST WITH PROGRESS BARS */}
              {/* ============================================================ */}
              <div className="space-y-5">
                {skillsData[category].map((skill) => (
                  <div key={getSkillKey(skill)} className="space-y-2">
                    {/* Skill name and percentage */}
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

                    {/* Progress bar - using inline style for width */}
                    <div className="relative h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${config.gradient} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.proficiency}%` }}
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
