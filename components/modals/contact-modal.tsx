/**
 * Contact Modal Component - With White Header & Blue-Cyan-Teal Gradient Text
 *
 * Full-page modal displaying contact information and social links.
 * Features:
 * - White sticky header with shadow
 * - Blue-Cyan-Teal gradient colored title text
 * - Fullscreen PDF resume viewer
 * - Working links to GitHub, LinkedIn
 * - Bilingual support with natural German
 * - ESC key support for closing
 *
 * @component
 */

"use client";

import { useEffect, useState } from "react";
import {
  X,
  ArrowLeft,
  Mail,
  MapPin,
  Linkedin,
  Github,
  FileText,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Language } from "@/lib/data";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface ContactModalProps {
  language: Language;
  onClose: () => void;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ContactModal({ language, onClose }: ContactModalProps) {
  // State to control resume viewer visibility
  const [showResume, setShowResume] = useState(false);

  // State to track if PDF loaded successfully
  const [pdfError, setPdfError] = useState(false);

  // ============================================================================
  // KEYBOARD HANDLERS & SIDE EFFECTS
  // ============================================================================

  useEffect(() => {
    // ESC key handler: Close resume viewer or main modal
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showResume) {
          // If resume is open, close it first
          setShowResume(false);
        } else {
          // Otherwise, close the entire modal
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleEsc);

    // Prevent background scrolling
    document.body.style.overflow = "hidden";

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [onClose, showResume]);

  // ============================================================================
  // CONTENT DATA (BILINGUAL)
  // ============================================================================

  const content = {
    backButton: {
      en: "Back to Portfolio",
      de: "Zurück zum Portfolio",
    },
    headerTitle: {
      en: "Get in Touch",
      de: "Kontakt aufnehmen",
    },
    title: {
      en: "Get in Touch",
      de: "Kontakt aufnehmen",
    },
    subtitle: {
      en: "Send me a message or connect with me",
      de: "Senden Sie mir eine Nachricht oder verbinden Sie sich mit mir",
    },
    quickLinks: {
      en: "Quick Links",
      de: "Schnellzugriff",
    },
    viewResume: {
      en: "View Resume",
      de: "Lebenslauf ansehen",
    },
    closeResume: {
      en: "Close Resume",
      de: "Lebenslauf schließen",
    },
    email: {
      en: "Email",
      de: "E-Mail",
    },
    location: {
      en: "Location",
      de: "Standort",
    },
    viewInBrowser: {
      en: "View in browser",
      de: "Im Browser ansehen",
    },
    linkedInProfile: {
      en: "LinkedIn Profile",
      de: "LinkedIn-Profil",
    },
    gitHubProfile: {
      en: "GitHub Profile",
      de: "GitHub-Profil",
    },
  };

  // ============================================================================
  // RENDER: MAIN CONTACT MODAL
  // ============================================================================

  return (
    <>
      {/* ====================================================================== */}
      {/* MAIN CONTACT MODAL */}
      {/* ====================================================================== */}
      <div className="fixed inset-0 z-[100] bg-white dark:bg-slate-950 overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* ==================================================================== */}
        {/* WHITE STICKY HEADER WITH SHADOW */}
        {/* ==================================================================== */}
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
                {content.backButton[language]}
              </Button>

              {/* Centered Title with Blue-Cyan-Teal Gradient */}
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent absolute left-1/2 transform -translate-x-1/2">
                {content.headerTitle[language]}
              </h1>

              {/* Spacer for layout balance */}
              <div className="w-[140px]"></div>
            </div>
          </div>
        </header>

        {/* ==================================================================== */}
        {/* MAIN CONTENT AREA */}
        {/* ==================================================================== */}
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          {/* ================================================================== */}
          {/* TITLE SECTION */}
          {/* ================================================================== */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 via-cyan-100 to-teal-100 dark:from-blue-900/30 dark:via-cyan-900/30 dark:to-teal-900/30 rounded-full mb-4">
              <Mail className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
            </div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
              {content.title[language]}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              {content.subtitle[language]}
            </p>
          </div>

          {/* ================================================================== */}
          {/* CONTACT INFORMATION CARDS */}
          {/* ================================================================== */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Email Card */}
            <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg">
                  <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                    {content.email[language]}
                  </h3>
                  <a
                    href="mailto:douglaskings2@gmail.com"
                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm break-all"
                  >
                    douglaskings2@gmail.com
                  </a>
                </div>
              </div>
            </Card>

            {/* Location Card */}
            <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-teal-500">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-lg">
                  <MapPin className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                    {content.location[language]}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Kampala, Uganda
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* ================================================================== */}
          {/* QUICK LINKS SECTION */}
          {/* ================================================================== */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              {content.quickLinks[language]}
            </h2>

            <div className="grid gap-3">
              {/* ============================================================== */}
              {/* VIEW RESUME BUTTON */}
              {/* ============================================================== */}
              <Button
                onClick={() => setShowResume(true)}
                variant="outline"
                className="w-full justify-start gap-3 h-auto py-4 bg-transparent hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-950/20 dark:hover:to-cyan-950/20 transition-all border-2 hover:border-blue-300 dark:hover:border-blue-700"
              >
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-left flex-1">
                  <div className="font-semibold text-slate-900 dark:text-white">
                    {content.viewResume[language]}
                  </div>
                  <div className="text-xs text-slate-500">
                    {content.viewInBrowser[language]}
                  </div>
                </span>
              </Button>

              {/* ============================================================== */}
              {/* LINKEDIN PROFILE BUTTON */}
              {/* ============================================================== */}
              <Button
                asChild
                variant="outline"
                className="w-full justify-start gap-3 h-auto py-4 bg-transparent hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 dark:hover:from-cyan-950/20 dark:hover:to-blue-950/20 transition-all border-2 hover:border-cyan-300 dark:hover:border-cyan-700"
              >
                <a
                  href="https://www.linkedin.com/in/douglas-kings/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  <span className="text-left flex-1">
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {content.linkedInProfile[language]}
                    </div>
                    <div className="text-xs text-slate-500">
                      linkedin.com/in/douglas-kings
                    </div>
                  </span>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>
              </Button>

              {/* ============================================================== */}
              {/* GITHUB PROFILE BUTTON */}
              {/* ============================================================== */}
              <Button
                asChild
                variant="outline"
                className="w-full justify-start gap-3 h-auto py-4 bg-transparent hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 dark:hover:from-teal-950/20 dark:hover:to-cyan-950/20 transition-all border-2 hover:border-teal-300 dark:hover:border-teal-700"
              >
                <a
                  href="https://github.com/DouglasKings"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-5 h-5 text-slate-900 dark:text-white" />
                  <span className="text-left flex-1">
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {content.gitHubProfile[language]}
                    </div>
                    <div className="text-xs text-slate-500">
                      github.com/DouglasKings
                    </div>
                  </span>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>
              </Button>
            </div>
          </div>
        </main>
      </div>

      {/* ====================================================================== */}
      {/* RESUME VIEWER MODAL (FULLSCREEN PDF VIEWER) */}
      {/* ====================================================================== */}
      {showResume && (
        <div className="fixed inset-0 z-[150] bg-black flex flex-col animate-in fade-in duration-200">
          {/* ================================================================== */}
          {/* RESUME VIEWER HEADER */}
          {/* ================================================================== */}
          <div className="flex justify-between items-center p-4 bg-black/90 backdrop-blur-md">
            <h3 className="text-white text-lg font-semibold">
              {language === "en" ? "Resume" : "Lebenslauf"}
            </h3>
            <Button
              onClick={() => setShowResume(false)}
              variant="ghost"
              className="text-white hover:bg-white/20 gap-2"
            >
              <X className="w-5 h-5" />
              {content.closeResume[language]}
            </Button>
          </div>

          {/* ================================================================== */}
          {/* PDF VIEWER CONTAINER */}
          {/* ================================================================== */}
          <div className="flex-1 w-full h-full relative bg-slate-100 dark:bg-slate-900">
            {/* PDF Iframe - Displays the actual PDF file */}
            <iframe
              src="/assets/documents/CV_Douglas_Kings_Kato_Java_Dev.pdf"
              className="w-full h-full"
              title="Resume"
              onLoad={() => setPdfError(false)}
              onError={() => setPdfError(true)}
            />

            {/* ============================================================== */}
            {/* ERROR/PLACEHOLDER MESSAGE (Only shows if PDF fails to load) */}
            {/* ============================================================== */}
            {pdfError && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-900">
                <div className="text-center p-8 max-w-md">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-full mb-4">
                    <FileText className="w-10 h-10 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {language === "en"
                      ? "Resume Not Found"
                      : "Lebenslauf nicht gefunden"}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {language === "en"
                      ? "Please ensure your PDF is located at:"
                      : "Bitte stellen Sie sicher, dass Ihre PDF sich befindet unter:"}
                  </p>
                  <code className="block bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-4 py-2 rounded text-sm font-mono break-all">
                    /public/assets/documents/CV_Douglas_Kings_Kato_Java_Dev.pdf
                  </code>
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">
                    {language === "en"
                      ? "The PDF viewer will automatically display your resume once the file is in place"
                      : "Der PDF-Viewer zeigt Ihren Lebenslauf automatisch an, sobald die Datei vorhanden ist"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
