/**
 * components/modals/experience-modal.tsx
 *
 * ── CHANGES IN THIS VERSION ──────────────────────────────────────────────
 *
 * FIX 1 — "Parallel Hybrid" isCurrent logic (Task 3):
 *   Stanbic Bank Uganda is your ACTIVE internship (per your confirmation:
 *   "I'm still working at Stanbic it should be present"). Hematrikan is
 *   also active. Both now carry isCurrent: true so the "Current Position"
 *   badge renders on BOTH cards — telling the real story that you're
 *   running two roles in parallel right now, in both EN and DE arrays.
 *
 * FIX 2 — Dark mode gradient contrast (Task 1):
 *   bg-clip-text gradients render very dark text against a dark background
 *   when only light-mode stop colors are defined. Added dark: variants
 *   that shift every blue/indigo/purple text gradient to lighter stops:
 *     from-blue-600 via-indigo-600 to-purple-600
 *       → dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400
 *   Applied to: the modal header title (ModalHeader gradientClass prop)
 *   and the company-name gradient text inside each experience card.
 *
 * Scroll-lock and ESC-to-close were already correctly implemented here —
 * no change needed to that logic.
 */

"use client";

import { useEffect } from "react";
import { Briefcase, MapPin, Calendar, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Language } from "@/lib/data";
import ModalHeader from "@/components/ui/modal-header";

interface ExperienceModalProps {
  language: Language;
  onClose: () => void;
}

export default function ExperienceModal({
  language,
  onClose,
}: ExperienceModalProps) {
  // ── Keyboard shortcut + scroll-lock (unchanged, already correct) ─────────
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  // ── Localised content ──────────────────────────────────────────────────────
  const experienceData = {
    // ════════════════════════════════════════════════════════════════════════
    // ENGLISH
    // ════════════════════════════════════════════════════════════════════════
    en: {
      backButton: "Back to Portfolio",
      headerTitle: "Professional Experience",
      title: "Professional Experience",
      subtitle:
        "Bridging Full Stack Engineering and High-Stakes Data Analytics",
      currentPosition: "Current Position",
      technologiesLabel: "Tech Stack & Core Competencies:",
      experiences: [
        // ── 1. Stanbic Bank Uganda ──────────────────────────────────────────
        // ✅ FIX: isCurrent changed false → true.
        // You confirmed you are still actively working here, in parallel
        // with Hematrikan. This is the "Parallel Hybrid" professional story.
        {
          isCurrent: true,
          company: "Stanbic Bank Uganda",
          position:
            "Data Analyst Intern – Private & Personal Banking (KYC Unit)",
          period: "June 2026 - Present",
          location: "Kampala, Uganda",
          projectName: "Regulatory Compliance & Data Integrity",
          description: [
            "Validating 90+ client KYC records daily (1,800+ monthly) by extracting raw account data from the Finacle Core Banking System.",
            "Executing Data ETL (Extract, Transform, Load) workflows using Advanced Excel to reconcile discrepancies between Finacle and the Corporate Data Warehouse.",
            "Ensuring 100% data integrity for AML (Anti-Money Laundering) compliance reporting and regulatory submission.",
            "Optimizing internal verification workflows, reducing manual errors through structured data reconciliation.",
          ],
          technologies: [
            "Finacle",
            "ETL Processes",
            "Advanced Excel",
            "Data Storage",
            "AML Compliance",
          ],
        },

        // ── 2. Hematrikan Innovation ────────────────────────────────────────
        // Already isCurrent: true — unchanged. Now correctly paired with
        // Stanbic above to show both active roles simultaneously.
        {
          isCurrent: true,
          company: "Hematrikan Innovation",
          position: "Full Stack Developer",
          period: "January 2026 - Present",
          location: "Mukono, Uganda",
          projectName: "hematrikan.com - Enterprise Digital Presence",
          description: [
            "Engineered 10+ responsive web modules for the official company platform using React.js and Spring Boot.",
            "Integrated 3 core backend APIs connecting client-facing interfaces to Spring Boot microservices with full data integrity validation.",
            "Architected a parallel USSD service layer, delivering equivalent web functionality to non-smartphone users in low-connectivity regions.",
            "Translating complex business requirements into scalable, modular frontend components and backend microservices.",
          ],
          technologies: [
            "Java",
            "Spring Boot",
            "React.js",
            "MySQL",
            "USSD APIs",
            "RESTful APIs",
          ],
        },

        // ── 3. SUMIC IT Solutions (concluded Jan 2026) ──────────────────────
        {
          isCurrent: false,
          company: "SUMIC IT Solutions Ltd",
          position: "Student Full Stack Developer",
          period: "October 2025 - January 2026",
          location: "Kampala, Uganda",
          projectName:
            "Entrepreneurship Booster Platform (EBP) - EU-Funded Project",
          description: [
            "Architected a USSD-integrated solution reaching 50,000+ rural users, enabling digital access via basic feature phones.",
            "Won 1st Place at the Multi-University Hackathon (2025) for rural technology innovation and prototype delivery.",
            "Managed technical documentation and simplified UIs to ensure 'enumerator readiness' for field deployment.",
            "Optimized MySQL database schemas for high-concurrency environments with over 100K expected users.",
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

        // ── 4. Field English School, China ─────────────────────────────────
        {
          isCurrent: false,
          company: "Field English School",
          position: "English, ICT Teacher & Multimedia Designer",
          period: "September 2019 - January 2023",
          location: "Wuhai, Inner Mongolia, China",
          projectName: undefined,
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

        // ── 5. Ugandan International Schools ───────────────────────────────
        {
          isCurrent: false,
          company:
            "Heritage International School, International School of Uganda, Kings International School",
          position: "ICT Teacher & Multimedia Designer",
          period: "January 2017 - September 2019",
          location: "Kampala, Uganda",
          projectName: undefined,
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

    // ════════════════════════════════════════════════════════════════════════
    // GERMAN
    // ════════════════════════════════════════════════════════════════════════
    de: {
      backButton: "Zurück zum Portfolio",
      headerTitle: "Berufserfahrung",
      title: "Berufserfahrung",
      subtitle:
        "Die Verbindung von Full-Stack-Engineering und Hochvolumen-Datenanalyse",
      currentPosition: "Aktuelle Position",
      technologiesLabel: "Tech-Stack & Kernkompetenzen:",
      experiences: [
        // ── 1. Stanbic Bank Uganda ──────────────────────────────────────────
        // ✅ FIX: isCurrent false → true (mirrors EN array fix above).
        {
          isCurrent: true,
          company: "Stanbic Bank Uganda",
          position: "Data Analyst Praktikant – KYC-Einheit",
          period: "Juni 2026 - Heute",
          location: "Kampala, Uganda",
          projectName: "Regulatorische Compliance & Datenintegrität",
          description: [
            "Validierung von über 90 Kunden-KYC-Datensätzen täglich durch Extraktion aus dem Finacle Core Banking System.",
            "Durchführung von Daten-ETL-Workflows (Extraktion, Transformation, Laden) zur Abstimmung von Unstimmigkeiten mittels Advanced Excel.",
            "Sicherstellung der 100%igen Datenintegrität für AML-Compliance-Berichte und regulatorische Einreichungen.",
            "Optimierung interner Verifizierungs-Workflows zur Reduzierung manueller Fehler.",
          ],
          technologies: [
            "Finacle",
            "ETL-Prozesse",
            "Advanced Excel",
            "Data Warehousing",
            "AML-Compliance",
          ],
        },

        // ── 2. Hematrikan Innovation ────────────────────────────────────────
        {
          isCurrent: true,
          company: "Hematrikan Innovation",
          position: "Full-Stack-Entwickler",
          period: "Januar 2026 - Heute",
          location: "Mukono, Uganda",
          projectName: "hematrikan.com - Unternehmensplattform",
          description: [
            "Entwicklung von über 10 responsiven Webmodulen mit React.js und Spring Boot.",
            "Integration von 3 Core-Backend-APIs zur Anbindung von Interfaces an Spring Boot Microservices.",
            "Architektur einer parallelen USSD-Service-Ebene für Nutzer ohne Smartphones in ländlichen Regionen.",
            "Umsetzung komplexer Geschäftsanforderungen in skalierbare, modulare Frontend-Komponenten.",
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

        // ── 3. SUMIC IT Solutions (abgeschlossen Jan 2026) ──────────────────
        {
          isCurrent: false,
          company: "SUMIC IT Solutions Ltd",
          position: "Studentischer Full-Stack-Entwickler",
          period: "Oktober 2025 - Januar 2026",
          location: "Kampala, Uganda",
          projectName:
            "Entrepreneurship Booster Platform (EBP) - EU-finanziertes Projekt",
          description: [
            "Architektur einer USSD-integrierten Lösung für über 50.000 ländliche Nutzer.",
            "1. Platz beim Multi-University Hackathon (2025) für ländliche Technologie-Innovation.",
            "Erstellung technischer Dokumentationen zur Sicherstellung der Einsatzbereitschaft im Feld.",
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

        // ── 4. Field English School, China ─────────────────────────────────
        {
          isCurrent: false,
          company: "Field English School",
          position: "Englisch- & ICT-Lehrer, Multimedia-Designer",
          period: "September 2019 - Januar 2023",
          location: "Wuhai, Innere Mongolei, China",
          projectName: undefined,
          description: [
            "Unterrichtete ICT-Lehrplan für 300+ Grundschüler.",
            "Erstellte multimediale Bildungsinhalte, die das Engagement um 40% steigerten.",
            "Integrierte Technologie in den Englischunterricht.",
            "Verwaltete Computerlaborinfrastruktur für 500+ Schüler.",
          ],
          technologies: [
            "Adobe Creative Suite",
            "Moho 12",
            "Bildungstechnologie",
            "Multimedia-Design",
          ],
        },

        // ── 5. Ugandische Internationale Schulen ────────────────────────────
        {
          isCurrent: false,
          company:
            "Heritage International School, International School of Uganda, Kings International School",
          position: "ICT-Lehrer & Multimedia-Designer",
          period: "Januar 2017 - September 2019",
          location: "Kampala, Uganda",
          projectName: undefined,
          description: [
            "Unterrichtete ICT, Informatik und Digital Arts für 200+ Schüler.",
            "Arbeitete in der ICT-Abteilung und überwachte Lehrplanentwicklung.",
            "Betreute Schüler bei Codierungsprojekten und Multimediaproduktion.",
            "Entwarf Marketingmaterialien, wodurch die Schulpräsenz um 60% stieg.",
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

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-[100] bg-white dark:bg-slate-950 overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/*
        ── FIX: dark-mode gradient contrast ──
        Light stops (600-weight) are too dark to read on a dark background.
        Added lighter dark: stops so the header title stays legible.
      */}
      <ModalHeader
        title={content.headerTitle}
        gradientClass="from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400"
        backLabel={content.backButton}
        onBack={onClose}
      />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* ── Section heading ── */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-purple-900/30 rounded-full mb-4">
            <Briefcase className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            {content.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            {content.subtitle}
          </p>
        </div>

        {/* ── Experience cards ── */}
        <div className="space-y-8">
          {content.experiences.map((exp, index) => (
            <Card
              key={index}
              className="p-5 sm:p-6 hover:shadow-xl transition-all border-l-4 border-l-indigo-600 dark:border-l-indigo-400"
            >
              {/*
               * "Current Position" badge — driven by exp.isCurrent,
               * NOT by index. Now correctly fires for BOTH Stanbic
               * and Hematrikan, reflecting the parallel-hybrid reality.
               */}
              {exp.isCurrent && (
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                    {content.currentPosition}
                  </span>
                  <Award className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
              )}

              {/* Company, role, optional project name */}
              <div className="mb-4">
                {/*
                  ── FIX: dark-mode gradient contrast ──
                  Same lighter dark: stops applied to the company-name
                  gradient text so it doesn't go near-invisible at night.
                */}
                <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent mb-2">
                  {exp.company}
                </h3>
                <p className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white mb-1">
                  {exp.position}
                </p>
                {exp.projectName && (
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400 italic">
                    {exp.projectName}
                  </p>
                )}
              </div>

              {/* Period & location chips */}
              <div className="flex flex-wrap gap-3 mb-6 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-800">
                  <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="font-medium">{exp.period}</span>
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 px-3 py-1.5 rounded-lg border border-indigo-200 dark:border-indigo-800">
                  <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="font-medium">{exp.location}</span>
                </div>
              </div>

              {/* Bullet-point responsibilities */}
              <ul className="space-y-3 mb-6">
                {exp.description.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-indigo-600 dark:text-indigo-400 mt-1 font-bold flex-shrink-0">
                      •
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Technology / skill tags */}
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
