/**
 * components/modals/experience-modal.tsx
 *
 * Displays the full professional experience timeline in a full-screen modal.
 * Supports English ("en") and German ("de") via the `language` prop.
 *
 * Reverse-chronological order:
 *  1. Stanbic Bank Uganda          – Intern                (June 2026 – Aug 2026)
 *  2. Hematrikan Innovation        – Full Stack Developer  (Jan 2026 – Present)
 *  3. SUMIC IT Solutions Ltd       – Full Stack Developer  (Oct 2025 – Jan 2026)
 *  4. Field English School         – Teacher               (Sep 2019 – Jan 2023)
 *  5. Ugandan International Schools – ICT Teacher          (Jan 2017 – Sep 2019)
 *
 * The "Current Position" badge is driven by a dedicated `isCurrent` field
 * rather than index position, so it stays accurate regardless of ordering.
 */

"use client";

import { useEffect } from "react";
import { Briefcase, MapPin, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  // ── Keyboard shortcut + scroll-lock ────────────────────────────────────────
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
      subtitle: "My journey in software development and education",
      currentPosition: "Current Position",
      technologiesLabel: "Technologies & Skills:",
      experiences: [
        // ── 1. Stanbic Bank Uganda ──────────────────────────────────────────
        {
          isCurrent: false,
          company: "Stanbic Bank Uganda",
          position: "Intern – Private & Personal Banking",
          period: "June 2026 - August 2026",
          location: "Kampala, Uganda",
          projectName: undefined,
          description: [
            "Completed a structured internship within the Private and Personal Banking Department, gaining first-hand exposure to retail and private banking operations.",
            "Supported relationship managers in preparing client portfolio reports, credit summaries, and onboarding documentation.",
            "Assisted in digitising and organising client records, improving data retrieval efficiency for the department.",
            "Participated in internal training sessions covering banking regulations, KYC compliance, and financial product knowledge.",
            "Observed and contributed to daily branch operations, customer service workflows, and financial advisory processes.",
          ],
          technologies: [
            "Financial Services",
            "Banking Operations",
            "KYC & Compliance",
            "Data Management",
            "Client Relations",
          ],
        },

        // ── 2. Hematrikan Innovation ────────────────────────────────────────
        {
          isCurrent: true,
          company: "Hematrikan Innovation",
          position: "Full Stack Developer",
          period: "January 2026 - Present",
          location: "Mukono, Uganda",
          projectName: undefined,
          description: [
            "Designed and developed the official Hematrikan Innovation company website from concept to deployment.",
            "Built a responsive, accessible front-end with React.js aligned to the company's brand identity.",
            "Implemented a Spring Boot REST API backend with MySQL persistence for dynamic content management.",
            "Integrated USSD APIs to extend service accessibility to non-smartphone users across Uganda.",
            "Collaborated directly with the founding team to translate business requirements into technical specifications.",
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

        // ── 3. SUMIC IT Solutions (concluded Jan 2026) ──────────────────────
        {
          isCurrent: false,
          company: "SUMIC IT Solutions Ltd",
          position: "Full Stack Developer",
          period: "October 2025 - January 2026",
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
      subtitle: "Meine Reise in der Softwareentwicklung und Bildung",
      currentPosition: "Aktuelle Position",
      technologiesLabel: "Technologien & Fähigkeiten:",
      experiences: [
        // ── 1. Stanbic Bank Uganda ──────────────────────────────────────────
        {
          isCurrent: false,
          company: "Stanbic Bank Uganda",
          position: "Praktikant – Private & Personal Banking",
          period: "Juni 2026 - August 2026",
          location: "Kampala, Uganda",
          projectName: undefined,
          description: [
            "Absolvierte ein strukturiertes Praktikum im Bereich Private und Personal Banking mit praxisnahem Einblick in den Filial- und Privatkundenbetrieb.",
            "Unterstützte Relationship Manager bei der Erstellung von Kundenportfolio-Berichten, Kreditübersichten und Onboarding-Dokumentation.",
            "Assistierte bei der Digitalisierung und Organisation von Kundendaten und verbesserte so die Datenabfrageeffizienz der Abteilung.",
            "Nahm an internen Schulungen zu Bankenvorschriften, KYC-Compliance und Finanzprodukt-Kenntnissen teil.",
            "Beobachtete und trug zu täglichen Filialabläufen, Kundenservice-Workflows und Finanzberatungsprozessen bei.",
          ],
          technologies: [
            "Finanzdienstleistungen",
            "Bankbetrieb",
            "KYC & Compliance",
            "Datenverwaltung",
            "Kundenbeziehungen",
          ],
        },

        // ── 2. Hematrikan Innovation ────────────────────────────────────────
        {
          isCurrent: true,
          company: "Hematrikan Innovation",
          position: "Full-Stack-Entwickler",
          period: "Januar 2026 - Heute",
          location: "Mukono, Uganda",
          projectName: undefined,
          description: [
            "Konzipierte und entwickelte die offizielle Unternehmenswebsite von Hematrikan Innovation von der Idee bis zur Veröffentlichung.",
            "Erstellte ein responsives, barrierefreies Frontend mit React.js, abgestimmt auf die Markenidentität des Unternehmens.",
            "Implementierte ein Spring Boot REST-API-Backend mit MySQL-Persistenz für dynamisches Content-Management.",
            "Integrierte USSD-APIs, um den Servicezugang für Nicht-Smartphone-Nutzer in ganz Uganda zu erweitern.",
            "Arbeitete eng mit dem Gründungsteam zusammen, um Geschäftsanforderungen in technische Spezifikationen umzusetzen.",
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
          position: "Full-Stack-Entwickler",
          period: "Oktober 2025 - Januar 2026",
          location: "Kampala, Uganda",
          projectName:
            "Entrepreneurship Booster Platform (EBP) - EU-finanziertes Projekt",
          description: [
            "Gewann den 1. Platz beim Multi-University Hackathon (September 2025), was zur Vollzeit-Implementierungsrolle führte.",
            "Entwarf vollständiges Backend mit Java Spring Boot Microservices für Benutzerverwaltung, Job-Matching, Arbeitgeberportale und Skills-Marktplatz.",
            "Implementierte USSD-Integration über Java Gateway APIs und erweiterte den Plattformzugang auf 50.000+ Feature-Phone-Nutzer in ländlichen Gebieten.",
            "Entwarf MySQL-Datenbankschemas zur Sicherstellung der Datenintegrität und optimierten Abfrageleistung für 100.000+ Nutzer.",
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
      {/* Mobile-safe sticky header */}
      <ModalHeader
        title={content.headerTitle}
        gradientClass="from-blue-600 via-indigo-600 to-purple-600"
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
               * NOT by index, so it stays correct regardless of ordering.
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
                <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
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
