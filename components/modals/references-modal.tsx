/**
 * References Modal Component - With Sticky Header & Natural German
 *
 * Full-page modal displaying professional references from CV.
 * Features:
 * - Sticky header with back navigation and title
 * - Contains exact reference information from Douglas Kings Kato's CV
 * - Natural German translations
 * - Clickable phone and email links
 * - ESC key support for closing
 *
 * @component
 */

"use client";

import { useEffect } from "react";
import { ArrowLeft, FileText, Mail, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Language } from "@/lib/data";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface ReferencesModalProps {
  language: Language;
  onClose: () => void;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ReferencesModal({
  language,
  onClose,
}: ReferencesModalProps) {
  // ============================================================================
  // KEYBOARD HANDLERS & SIDE EFFECTS
  // ============================================================================

  useEffect(() => {
    // ESC key handler to close modal
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // ============================================================================
  // CONTENT DATA (BILINGUAL) - NATURAL GERMAN TRANSLATIONS
  // ============================================================================

  const content = {
    backButton: {
      en: "Back to Portfolio",
      de: "Zurück zum Portfolio",
    },
    headerTitle: {
      en: "Professional References",
      de: "Professionelle Referenzen",
    },
    title: {
      en: "Professional References",
      de: "Professionelle Referenzen",
    },
    subtitle: {
      en: "Recommendations from academic supervisors at ISBAT University",
      de: "Empfehlungen von akademischen Betreuern an der ISBAT Universität",
    },
    references: [
      {
        name: "Mr. Kibwika Nasurudin Bashir",
        title: {
          en: "Assistant Lecturer, ISBAT University",
          de: "Assistenzprofessor, ISBAT Universität",
        },
        phone: "+256 701 603 731",
        email: "nass.aklieve@gmail.com",
      },
      {
        name: "Mr. Male Kenneth",
        title: {
          en: "Assistant Lecturer, ISBAT University",
          de: "Assistenzprofessor, ISBAT Universität",
        },
        phone: "+256 779 413 882",
        email: "Kenneth.fict@isbatuniversity.com",
      },
      {
        name: "Mr. Kato Kenneth",
        title: {
          en: "Assistant Lecturer, ISBAT University",
          de: "Assistenzprofessor, ISBAT Universität",
        },
        phone: "+256 779 190 915 / +256 760 220 536",
        email: "katokeneth@outlook.com",
      },
    ],
  };

  // ============================================================================
  // RENDER: MAIN MODAL
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
            <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
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
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* ==================================================================== */}
        {/* TITLE SECTION */}
        {/* ==================================================================== */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
            <FileText className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
            {content.title[language]}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {content.subtitle[language]}
          </p>
        </div>

        {/* ==================================================================== */}
        {/* REFERENCES CARDS */}
        {/* ==================================================================== */}
        <div className="space-y-6">
          {content.references.map((ref, idx) => (
            <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                {/* ============================================================ */}
                {/* USER ICON */}
                {/* ============================================================ */}
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full flex-shrink-0">
                  <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>

                {/* ============================================================ */}
                {/* REFERENCE DETAILS */}
                {/* ============================================================ */}
                <div className="flex-1">
                  {/* Name */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                    {ref.name}
                  </h3>

                  {/* Title */}
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-4">
                    {ref.title[language]}
                  </p>

                  {/* Contact Information */}
                  <div className="space-y-2">
                    {/* Phone */}
                    <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                      <Phone className="w-4 h-4 text-slate-500 flex-shrink-0" />
                      <a
                        href={`tel:${ref.phone.split("/")[0].trim()}`}
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {ref.phone}
                      </a>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                      <Mail className="w-4 h-4 text-slate-500 flex-shrink-0" />
                      <a
                        href={`mailto:${ref.email}`}
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors break-all"
                      >
                        {ref.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
