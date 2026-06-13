/**
 * components/modals/education-modal.tsx
 * MOBILE FIX: Uses <ModalHeader>. All content unchanged.
 */

"use client";

import { useEffect } from "react";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Language } from "@/lib/data";
import ModalHeader from "@/components/ui/modal-header";

interface EducationModalProps {
  language: Language;
  onClose: () => void;
}

export default function EducationModal({
  language,
  onClose,
}: EducationModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const content = {
    backButton: { en: "Back to Portfolio", de: "Zurück zum Portfolio" },
    headerTitle: { en: "Educational Background", de: "Bildungshintergrund" },
    title: { en: "Educational Background", de: "Bildungshintergrund" },
    subtitle: {
      en: "My academic journey from multimedia design to applied IT",
      de: "Meine akademische Reise von Multimedia-Design bis zur angewandten IT",
    },
    current: { en: "Currently Pursuing", de: "Derzeit im Studium" },
    education: [
      {
        degree: {
          en: "Bachelor of Science in Applied Information Technology",
          de: "Bachelor of Science in Angewandter Informationstechnologie",
        },
        institution: { en: "ISBAT University", de: "ISBAT Universität" },
        location: "Kampala, Uganda",
        period: {
          en: "Expected January 2027",
          de: "Erwarteter Abschluss Januar 2027",
        },
        status: { en: "In Progress", de: "In Bearbeitung" },
        description: {
          en: "Advancing technical skills in software development, cloud computing, and IT infrastructure management. Currently working on final year project focused on enterprise systems.",
          de: "Weiterentwicklung technischer Fähigkeiten in Softwareentwicklung, Cloud Computing und IT-Infrastrukturmanagement.",
        },
      },
      {
        degree: {
          en: "German Language Course (Level A1)",
          de: "Deutschsprachkurs (Niveau A1)",
        },
        institution: { en: "Goethe-Zentrum", de: "Goethe-Zentrum" },
        location: "Kampala, Uganda",
        period: {
          en: "July 2025 - August 2025",
          de: "Juli 2025 - August 2025",
        },
        status: { en: "Completed", de: "Abgeschlossen" },
        description: {
          en: "Successfully completed beginner German language course, gaining foundational skills for professional communication in German-speaking environments.",
          de: "Erfolgreich abgeschlossener Anfänger-Deutschkurs mit grundlegenden Fähigkeiten für professionelle Kommunikation.",
        },
      },
      {
        degree: {
          en: "Advanced Diploma in Multimedia and Animation",
          de: "Erweitertes Diplom in Multimedia und Animation",
        },
        institution: {
          en: "Aptech Computer Education",
          de: "Aptech Computer Education",
        },
        location: "Kampala, Uganda",
        period: {
          en: "September 2014 - December 2016",
          de: "September 2014 - Dezember 2016",
        },
        status: { en: "Completed", de: "Abgeschlossen" },
        description: {
          en: "Comprehensive training in graphic design, web development, and multimedia production using Adobe Creative Suite and animation software.",
          de: "Umfassende Ausbildung in Grafikdesign, Webentwicklung und Multimedia-Produktion.",
        },
      },
    ],
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white dark:bg-slate-950 overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* ── MOBILE-SAFE HEADER ── */}
      <ModalHeader
        title={content.headerTitle[language]}
        gradientClass="from-blue-600 via-purple-600 to-pink-600"
        backLabel={content.backButton[language]}
        onBack={onClose}
      />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <GraduationCap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            {content.title[language]}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            {content.subtitle[language]}
          </p>
        </div>

        <div className="space-y-6">
          {content.education.map((edu, index) => (
            <Card
              key={index}
              className="p-5 sm:p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    index === 0
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                      : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                  }`}
                >
                  {edu.status[language]}
                </span>
                {index === 0 && (
                  <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                {edu.degree[language]}
              </h3>
              <p className="text-base sm:text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">
                {edu.institution[language]}
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-4 mb-4 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{edu.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{edu.period[language]}</span>
                </div>
              </div>

              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                {edu.description[language]}
              </p>

              {index === 0 && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
                    <span>{content.current[language]}</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-[75%] transition-all duration-500" />
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
