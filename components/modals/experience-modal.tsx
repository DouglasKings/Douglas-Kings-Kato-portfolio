/**
 * Experience Modal Component - With White Header & Blue-Indigo-Purple Gradient Text
 *
 * A full-page modal dialog that displays professional work experience.
 * Features:
 * - White sticky header with shadow
 * - Blue-Indigo-Purple gradient colored title text
 * - Chronological timeline of work history
 * - Detailed job descriptions and responsibilities
 * - Technologies used in each role
 * - Bilingual content support
 * - ESC key support for closing
 *
 * @component
 */

"use client";

import { useEffect } from "react";
import { ArrowLeft, Briefcase, MapPin, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Language } from "@/lib/data";

interface ExperienceModalProps {
  language: Language;
  onClose: () => void;
}

/**
 * ExperienceModal Component
 *
 * Displays a modal overlay with detailed work experience information.
 * Includes company names, positions, dates, locations, and detailed descriptions.
 */
export default function ExperienceModal({
  language,
  onClose,
}: ExperienceModalProps) {
  // Handle ESC key press to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    // Prevent background scrolling
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  // Experience data - bilingual content
  const experienceData = {
    en: {
      backButton: "Back to Portfolio",
      headerTitle: "Professional Experience",
      title: "Professional Experience",
      subtitle: "My journey in software development and education",
      currentPosition: "Current Position",
      technologiesLabel: "Technologies & Skills:",
      experiences: [
        {
          company: "SUMIC IT Solutions Ltd",
          position: "Full Stack Developer",
          period: "October 2025 - Present",
          location: "Kampala, Uganda",
          projectName:
            "Entrepreneurship Booster Platform (EBP) - EU-Funded Project",
          description: [
            "Won 1st place in Multi-University Hackathon (September 2025), leading to full-time implementation role.",
            "Architected complete backend using Java Spring Boot microservices with modular services for user management, job matching, employer portals, and skills marketplace.",
            "Implemented USSD integration via Java gateway APIs, expanding platform access to 50,000+ feature phone users in rural areas.",
            "Designed MySQL database schemas ensuring data integrity and optimized query performance for 100K+ user base.",
          ],
          technologies: [
            "Java",
            "Spring Boot",
            "MySQL",
            "React.js",
            "USSD APIs",
            "Microservices",
          ],
        },
        {
          company: "Field English School",
          position: "English, ICT Teacher & Multimedia Designer",
          period: "September 2019 - January 2023",
          location: "Wuhai, Inner Mongolia, China",
          description: [
            "Taught ICT curriculum covering programming fundamentals, digital literacy, and computer applications to 300+ primary students.",
            "Created multimedia educational content (animations, videos, interactive modules) improving student engagement by 40%.",
            "Integrated technology into English instruction, developing custom learning tools and digital resources.",
            "Managed computer lab infrastructure and technical resources for 500+ student international school.",
          ],
          technologies: [
            "Adobe Creative Suite",
            "Moho 12",
            "Educational Technology",
            "Multimedia Design",
          ],
        },
        {
          company:
            "Heritage International School, International School of Uganda, Kings International School",
          position: "ICT Teacher & Multimedia Designer",
          period: "January 2017 - September 2019",
          location: "Kampala, Uganda",
          description: [
            "Taught ICT, Computer Science, and Digital Arts aligned with (I)GCSE, A-Level, and IB MYP curricula to 200+ students.",
            "Served in the ICT Department, overseeing curriculum development, resource allocation, and teacher training.",
            "Mentored students in coding projects (web development) and creative multimedia production.",
            "Designed marketing materials and event content, increasing school digital presence by 60%.",
          ],
          technologies: [
            "Web Development",
            "Computer Science Education",
            "Digital Arts",
            "Curriculum Design",
          ],
        },
      ],
    },
    de: {
      backButton: "Zurück zum Portfolio",
      headerTitle: "Berufserfahrung",
      title: "Berufserfahrung",
      subtitle: "Meine Reise in der Softwareentwicklung und Bildung",
      currentPosition: "Aktuelle Position",
      technologiesLabel: "Technologien & Fähigkeiten:",
      experiences: [
        {
          company: "SUMIC IT Solutions Ltd",
          position: "Full-Stack-Entwickler",
          period: "Oktober 2025 - Heute",
          location: "Kampala, Uganda",
          projectName:
            "Entrepreneurship Booster Platform (EBP) - EU-finanziertes Projekt",
          description: [
            "Gewann den 1. Platz beim Multi-University Hackathon (September 2025), was zu einer Vollzeitstelle führte.",
            "Entwarf vollständiges Backend mit Java Spring Boot Microservices mit modularen Services für Benutzerverwaltung, Job-Matching, Arbeitgeberportale und Kompetenzmarktplatz.",
            "Implementierte USSD-Integration über Java Gateway APIs, wodurch der Plattformzugriff für 50.000+ Feature-Phone-Nutzer in ländlichen Gebieten erweitert wurde.",
            "Entwarf MySQL-Datenbankschemas zur Sicherstellung der Datenintegrität und optimierten Abfrageleistung für 100.000+ Nutzerbasis.",
          ],
          technologies: [
            "Java",
            "Spring Boot",
            "MySQL",
            "React.js",
            "USSD APIs",
            "Microservices",
          ],
        },
        {
          company: "Field English School",
          position: "Englisch- & ICT-Lehrer, Multimedia-Designer",
          period: "September 2019 - Januar 2023",
          location: "Wuhai, Innere Mongolei, China",
          description: [
            "Unterrichtete ICT-Lehrplan mit Programmiergrundlagen, digitaler Kompetenz und Computeranwendungen für 300+ Grundschüler.",
            "Erstellte multimediale Bildungsinhalte (Animationen, Videos, interaktive Module), die das Schülerengagement um 40% steigerten.",
            "Integrierte Technologie in den Englischunterricht und entwickelte benutzerdefinierte Lernwerkzeuge und digitale Ressourcen.",
            "Verwaltete Computerlaborinfrastruktur und technische Ressourcen für eine internationale Schule mit 500+ Schülern.",
          ],
          technologies: [
            "Adobe Creative Suite",
            "Moho 12",
            "Bildungstechnologie",
            "Multimedia-Design",
          ],
        },
        {
          company:
            "Heritage International School, International School of Uganda, Kings International School",
          position: "ICT-Lehrer & Multimedia-Designer",
          period: "Januar 2017 - September 2019",
          location: "Kampala, Uganda",
          description: [
            "Unterrichtete ICT, Informatik und Digital Arts nach (I)GCSE, A-Level und IB MYP Lehrplänen für 200+ Schüler.",
            "Arbeitete in der ICT-Abteilung und überwachte Lehrplanentwicklung, Ressourcenzuweisung und Lehrerfortbildung.",
            "Betreute Schüler bei Codierungsprojekten (Webentwicklung) und kreativer Multimediaproduktion.",
            "Entwarf Marketingmaterialien und Event-Inhalte, wodurch die digitale Präsenz der Schule um 60% gesteigert wurde.",
          ],
          technologies: [
            "Webentwicklung",
            "Informatik-Ausbildung",
            "Digitale Kunst",
            "Curriculum-Design",
          ],
        },
      ],
    },
  };

  const content = experienceData[language];

  return (
    <div className="fixed inset-0 z-[100] bg-white dark:bg-slate-950 overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* ====================================================================== */}
      {/* WHITE STICKY HEADER WITH SHADOW */}
      {/* ====================================================================== */}
      <header className="sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="gap-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="w-4 h-4" />
              {content.backButton}
            </Button>

            {/* Centered Title with Blue-Indigo-Purple Gradient */}
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent absolute left-1/2 transform -translate-x-1/2">
              {content.headerTitle}
            </h1>

            {/* Spacer for layout balance */}
            <div className="w-[140px]"></div>
          </div>
        </div>
      </header>

      {/* ====================================================================== */}
      {/* MAIN CONTENT AREA */}
      {/* ====================================================================== */}
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Title section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-purple-900/30 rounded-full mb-4">
            <Briefcase className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
            {content.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {content.subtitle}
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8">
          {content.experiences.map((exp, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-xl transition-all border-l-4 border-l-indigo-600 dark:border-l-indigo-400"
            >
              {/* Current/Past badge */}
              {index === 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                    {content.currentPosition}
                  </span>
                  <Award className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
              )}

              {/* Company and Position */}
              <div className="mb-4">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {exp.company}
                </h3>
                <p className="text-xl font-semibold text-slate-900 dark:text-white mb-1">
                  {exp.position}
                </p>
                {exp.projectName && (
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400 italic">
                    {exp.projectName}
                  </p>
                )}
              </div>

              {/* Period and Location */}
              <div className="flex flex-wrap gap-4 mb-6 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-800">
                  <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="font-medium">{exp.period}</span>
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 px-3 py-1.5 rounded-lg border border-indigo-200 dark:border-indigo-800">
                  <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="font-medium">{exp.location}</span>
                </div>
              </div>

              {/* Job Description - Bullet points */}
              <ul className="space-y-3 mb-6">
                {exp.description.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-indigo-600 dark:text-indigo-400 mt-1 font-bold">
                      •
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Technologies Used */}
              <div>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">
                  {content.technologiesLabel}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm font-medium border border-indigo-200 dark:border-indigo-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
