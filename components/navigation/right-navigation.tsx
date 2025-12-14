/**
 * Right Navigation Component - With PDF Resume Viewer
 *
 * Displays the right sidebar navigation with:
 * - Portfolio & Media sections
 * - Quick links (View Resume, LinkedIn, GitHub)
 * - Resume viewer modal with fullscreen PDF display
 * - Contact information card
 * - Bilingual support
 *
 * @component
 */

"use client";

import { useState } from "react";
import {
  Video,
  ImageIcon,
  FileText,
  Mail,
  MapPin,
  Eye,
  X,
  ExternalLink,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Language } from "@/lib/data";

interface RightNavigationProps {
  language: Language;
  onNavigate?: (section: string) => void;
}

export default function RightNavigation({
  language,
  onNavigate,
}: RightNavigationProps) {
  // State for resume viewer modal
  const [showResumeViewer, setShowResumeViewer] = useState(false);
  const [pdfError, setPdfError] = useState(false);

  const sections = [
    {
      id: "videos",
      icon: Video,
      label: { en: "Videos", de: "Videos" },
      sublabel: { en: "Media", de: "Medien" },
      description: {
        en: "Watch my tutorials on programming and web development.",
        de: "Sehen Sie sich meine Tutorials zu Programmierung und Webentwicklung an.",
      },
      color: "red",
    },
    {
      id: "gallery",
      icon: ImageIcon,
      label: { en: "Gallery", de: "Galerie" },
      sublabel: { en: "Media", de: "Medien" },
      description: {
        en: "A collection of my creative projects and designs.",
        de: "Eine Sammlung meiner kreativen Projekte und Designs.",
      },
      color: "pink",
    },
    {
      id: "references",
      icon: FileText,
      label: { en: "References", de: "Referenzen" },
      sublabel: { en: "Content", de: "Inhalt" },
      description: {
        en: "Professional recommendations from past employers.",
        de: "Professionelle Empfehlungen von früheren Arbeitgebern.",
      },
      color: "gray",
    },
    {
      id: "contact",
      icon: Mail,
      label: { en: "Contact", de: "Kontakt" },
      sublabel: { en: "Get in Touch", de: "Kontaktaufnahme" },
      description: {
        en: "Send me a message or connect with me.",
        de: "Senden Sie mir eine Nachricht oder verbinden Sie sich mit mir.",
      },
      color: "blue",
    },
  ];

  const handleNavigate = (sectionId: string) => {
    if (onNavigate) {
      onNavigate(sectionId);
    }
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; hover: string; text: string }> =
      {
        red: {
          bg: "bg-red-100 dark:bg-red-900/30",
          hover: "hover:bg-red-200 dark:hover:bg-red-800/50",
          text: "text-red-600 dark:text-red-400",
        },
        pink: {
          bg: "bg-pink-100 dark:bg-pink-900/30",
          hover: "hover:bg-pink-200 dark:hover:bg-pink-800/50",
          text: "text-pink-600 dark:text-pink-400",
        },
        gray: {
          bg: "bg-gray-100 dark:bg-gray-900/30",
          hover: "hover:bg-gray-200 dark:hover:bg-gray-800/50",
          text: "text-gray-600 dark:text-gray-400",
        },
        blue: {
          bg: "bg-blue-100 dark:bg-blue-900/30",
          hover: "hover:bg-blue-200 dark:hover:bg-blue-800/50",
          text: "text-blue-600 dark:text-blue-400",
        },
      };
    return colors[color] || colors.blue;
  };

  return (
    <>
      <aside className="w-80 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-6 h-screen overflow-y-auto">
        {/* Section Header */}
        <div className="mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            {language === "en" ? "Portfolio & Media" : "Portfolio & Medien"}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {language === "en"
              ? "Explore my creative work and international experience"
              : "Erkunden Sie meine kreative Arbeit und internationale Erfahrung"}
          </p>
        </div>

        {/* Navigation Items */}
        <div className="space-y-3 mb-8">
          {sections.map((item) => {
            const Icon = item.icon;
            const colors = getColorClasses(item.color);
            return (
              <Card
                key={item.id}
                className="p-4 cursor-pointer hover:shadow-md transition-all group"
                onClick={() => handleNavigate(item.id)}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 ${colors.bg} ${colors.hover} rounded-lg transition-colors`}
                  >
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                      {item.label[language]}
                    </h3>
                    <p className={`text-xs ${colors.text} font-medium mb-1`}>
                      {item.sublabel[language]}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.description[language]}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Links Section */}
        <div className="mb-6">
          <h3 className="font-bold text-slate-900 dark:text-white mb-3">
            {language === "en" ? "Quick Links" : "Schnelllinks"}
          </h3>
          <div className="space-y-2">
            {/* View Resume Button - Opens Modal */}
            <Button
              variant="outline"
              className="w-full justify-start gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 bg-transparent"
              onClick={() => setShowResumeViewer(true)}
            >
              <Eye className="w-4 h-4" />
              {language === "en" ? "View Resume" : "Lebenslauf ansehen"}
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 bg-transparent"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/douglas-kings/",
                  "_blank"
                )
              }
            >
              <ExternalLink className="w-4 h-4" />
              {language === "en" ? "LinkedIn Profile" : "LinkedIn-Profil"}
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 bg-transparent"
              onClick={() =>
                window.open("https://github.com/DouglasKings", "_blank")
              }
            >
              <ExternalLink className="w-4 h-4" />
              {language === "en" ? "GitHub Profile" : "GitHub-Profil"}
            </Button>
          </div>
        </div>

        {/* Contact Information Card */}
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-800">
          <h3 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            {language === "en" ? "Contact" : "Kontakt"}
          </h3>
          <div className="space-y-2 text-sm">
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              {language === "en"
                ? "Send me a message or connect with me."
                : "Senden Sie mir eine Nachricht oder verbinden Sie sich mit mir."}
            </p>

            <div className="flex items-start gap-2">
              <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <p className="font-medium text-slate-900 dark:text-white text-xs">
                  {language === "en" ? "Email:" : "E-Mail:"}
                </p>
                <a
                  href="mailto:douglaskings2@gmail.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  douglaskings2@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <p className="font-medium text-slate-900 dark:text-white text-xs">
                  {language === "en" ? "Location:" : "Standort:"}
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  Kampala, Uganda
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-600 dark:text-green-400 font-medium">
                {language === "en"
                  ? "Available for new opportunities"
                  : "Verfügbar für neue Möglichkeiten"}
              </span>
            </div>
          </div>
        </Card>
      </aside>

      {/* ====================================================================== */}
      {/* RESUME VIEWER MODAL (FULLSCREEN PDF VIEWER) */}
      {/* ====================================================================== */}
      {showResumeViewer && (
        <div className="fixed inset-0 z-[150] bg-black flex flex-col animate-in fade-in duration-200">
          {/* ================================================================== */}
          {/* RESUME VIEWER HEADER */}
          {/* ================================================================== */}
          <div className="flex justify-between items-center p-4 bg-black/90 backdrop-blur-md">
            <h3 className="text-white text-lg font-semibold">
              {language === "en"
                ? "Resume - Douglas Kings Kato"
                : "Lebenslauf - Douglas Kings Kato"}
            </h3>
            <Button
              onClick={() => setShowResumeViewer(false)}
              variant="ghost"
              className="text-white hover:bg-white/20 gap-2"
            >
              <X className="w-5 h-5" />
              {language === "en" ? "Close" : "Schließen"}
            </Button>
          </div>

          {/* ================================================================== */}
          {/* PDF VIEWER CONTAINER */}
          {/* ================================================================== */}
          <div className="flex-1 w-full h-full relative bg-slate-100 dark:bg-slate-900">
            {/* PDF Iframe - Displays the actual PDF file */}
            {/* IMPORTANT: Replace with your actual PDF path */}
            {/* Path should be: /assets/documents/CV_Douglas_Kings_Kato_Java_Dev.pdf */}
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
                      ? "Please add your PDF resume to:"
                      : "Bitte fügen Sie Ihren PDF-Lebenslauf hinzu unter:"}
                  </p>
                  <code className="block bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-4 py-2 rounded text-sm font-mono break-all">
                    /public/assets/documents/CV_Douglas_Kings_Kato_Java_Dev.pdf
                  </code>
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">
                    {language === "en"
                      ? "The PDF viewer will automatically display your resume once the file is added"
                      : "Der PDF-Viewer zeigt Ihren Lebenslauf automatisch an, sobald die Datei hinzugefügt wurde"}
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
