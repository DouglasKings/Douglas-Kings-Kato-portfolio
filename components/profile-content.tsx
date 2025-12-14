/**
 * Profile Content Component - Final Refined Edition with Natural German
 *
 * Displays the main profile section with:
 * - Enhanced language switcher with clear indication
 * - Personal information and bio
 * - Professional summary with elegant cards
 * - Quick stats with icons positioned above text
 * - Call-to-action buttons (View Experience & See My Work)
 * - "See My Work" button scrolls to gallery section
 * - Bilingual content support (English/German)
 *
 * @component
 */

"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Briefcase,
  Users,
  Award,
  GraduationCap,
  Globe,
  Languages,
} from "lucide-react";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

type Language = "en" | "de";

interface ProfileContentProps {
  language: Language;
  onToggleLang?: () => void;
  onOpenExperience?: () => void;
  onNavigateToGallery?: () => void; // New prop for gallery navigation
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ProfileContent({
  language,
  onToggleLang,
  onOpenExperience,
  onNavigateToGallery,
}: ProfileContentProps) {
  // ============================================================================
  // CONTENT DATA (BILINGUAL) - CORRECTED GERMAN TRANSLATIONS
  // ============================================================================

  const content = {
    en: {
      greeting: "Hello, I'm",
      name: "Douglas Kings Kato",
      title: "Software Developer, Multimedia Specialist & Educator",
      subtitle: "Full Stack Developer | Software Engineer | ICT Educator",
      bio: "Full Stack Developer with expertise in Java Spring Boot microservices, React.js, and database optimization. Proven track record building scalable backend systems including award-winning USSD-integrated platform serving underserved communities. Combines 5+ years of ICT education experience with hands-on software development, delivering user-centric solutions in Agile environments.",
      welcome: "Welcome to My Interactive Portfolio",
      welcomeDescription:
        "Click on any section from the left or right panels to explore my professional journey, technical skills, and creative work.",
      currentlyPursuing: "Currently Pursuing",
      degree: "BSc. in Applied Information Technology",
      experienceYears: "5+",
      experienceLabel: "Years Experience",
      experienceSubtitle: "International Teaching",
      experienceDetail: "Across Multiple Countries",
      studentsTaught: "100+",
      studentsTaughtLabel: "Students Taught",
      studentsTaughtSubtitle: "Across Multiple Countries",
      studentsTaughtDetail: "In Various Technologies",
      certifications: "15+",
      certificationsLabel: "Certifications",
      certificationsSubtitle: "Professional & Technical",
      certificationsDetail: "Industry Recognized",
      viewExperience: "View Experience",
      seeMyWork: "See My Work",
      switchLanguage: "Switch to German",
    },
    de: {
      greeting: "Hallo, ich bin",
      name: "Douglas Kings Kato",
      title: "Softwareentwickler, Multimediaspezialist und Pädagoge",
      subtitle: "Full-Stack-Entwickler | Software-Ingenieur | ICT-Pädagoge",
      bio: "Full-Stack-Entwickler mit Expertise in Java Spring Boot Microservices, React.js und Datenbankoptimierung. Nachgewiesene Erfolge beim Aufbau skalierbarer Backend-Systeme, einschließlich preisgekrönter USSD-integrierter Plattform für unterversorgte Gemeinschaften. Kombiniert über 5 Jahre ICT-Unterrichtserfahrung mit praktischer Softwareentwicklung und liefert benutzerzentrierte Lösungen in agilen Umgebungen.",
      welcome: "Willkommen in meinem interaktiven Portfolio",
      welcomeDescription:
        "Klicken Sie auf einen beliebigen Abschnitt in den linken oder rechten Panels, um meine berufliche Reise, technischen Fähigkeiten und kreative Arbeit zu erkunden.",
      currentlyPursuing: "Derzeit in Ausbildung",
      degree: "BSc. in Angewandter Informationstechnologie",
      experienceYears: "5+",
      experienceLabel: "Jahre Erfahrung",
      experienceSubtitle: "Internationaler Unterricht",
      experienceDetail: "In mehreren Ländern",
      studentsTaught: "100+",
      studentsTaughtLabel: "Unterrichtete Schüler",
      studentsTaughtSubtitle: "In mehreren Ländern",
      studentsTaughtDetail: "In verschiedenen Technologien",
      certifications: "15+",
      certificationsLabel: "Zertifizierungen",
      certificationsSubtitle: "Beruflich & Technisch",
      certificationsDetail: "Branchlich anerkannt",
      viewExperience: "Erfahrung anzeigen",
      seeMyWork: "Meine Arbeit ansehen",
      switchLanguage: "Auf Englisch wechseln",
    },
  };

  const text = content[language];

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  /**
   * Scrolls to the gallery section smoothly when "See My Work" is clicked
   * Uses both callback prop and direct DOM manipulation for reliability
   */
  const handleSeeMyWork = () => {
    // Method 1: Use callback if provided
    if (onNavigateToGallery) {
      onNavigateToGallery();
    }

    // Method 2: Direct DOM scroll (backup method)
    setTimeout(() => {
      const element = document.getElementById("gallery");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  // ============================================================================
  // RENDER: PROFILE SECTION
  // ============================================================================

  return (
    <section id="profile" className="scroll-mt-8">
      <Card className="p-8 md:p-12 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-800 relative overflow-hidden shadow-xl">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-3xl -z-0" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/5 via-blue-500/5 to-cyan-500/5 rounded-full blur-3xl -z-0" />

        <div className="relative z-10">
          {/* ==================================================================== */}
          {/* ENHANCED LANGUAGE SWITCHER */}
          {/* ==================================================================== */}
          {onToggleLang && (
            <div className="flex justify-center mb-8">
              <button
                onClick={onToggleLang}
                className="group flex items-center gap-3 px-6 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-full hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 shadow-md hover:shadow-lg"
                aria-label={text.switchLanguage}
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    {language === "en" ? "English" : "Deutsch"}
                  </span>
                </div>
                <div className="flex items-center gap-1 px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full">
                  <Languages className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                    {language === "en" ? "DE" : "EN"}
                  </span>
                </div>
              </button>
            </div>
          )}

          {/* ==================================================================== */}
          {/* PROFILE PICTURE */}
          {/* ==================================================================== */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="w-36 h-36 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-1 shadow-2xl group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-slate-900 ring-4 ring-white dark:ring-slate-800">
                  <img
                    src="/assets/images/Me.jpg"
                    alt="Douglas Kings Kato - Professional Portrait"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Online Status with Pulse */}
              <div className="absolute bottom-2 right-2 flex items-center justify-center">
                <div className="w-7 h-7 bg-emerald-500 rounded-full border-4 border-white dark:border-slate-900 shadow-lg" />
                <div className="absolute w-7 h-7 bg-emerald-500 rounded-full animate-ping opacity-75" />
              </div>
            </div>
          </div>

          {/* ==================================================================== */}
          {/* NAME AND TITLE */}
          {/* ==================================================================== */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              {text.name}
            </h1>
            <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              {text.title}
            </p>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 font-medium">
              {text.subtitle}
            </p>
          </div>

          {/* ==================================================================== */}
          {/* BIO */}
          {/* ==================================================================== */}
          <p className="text-center text-base md:text-lg text-slate-700 dark:text-slate-300 mb-10 leading-relaxed max-w-4xl mx-auto px-4">
            {text.bio}
          </p>

          {/* ==================================================================== */}
          {/* WELCOME CARD WITH CTA BUTTONS */}
          {/* ==================================================================== */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 mb-10 text-center border border-slate-200 dark:border-slate-700 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
              {text.welcome}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-base md:text-lg max-w-2xl mx-auto">
              {text.welcomeDescription}
            </p>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* View Experience Button */}
              <Button
                onClick={onOpenExperience}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 font-semibold px-8"
              >
                {text.viewExperience}
              </Button>

              {/* See My Work Button - Scrolls to Gallery */}
              <Button
                onClick={handleSeeMyWork}
                size="lg"
                variant="outline"
                className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 bg-transparent font-semibold px-8 transition-all duration-300"
              >
                {text.seeMyWork}
              </Button>
            </div>
          </div>

          {/* ==================================================================== */}
          {/* STATS GRID - ICONS ABOVE TEXT */}
          {/* ==================================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Experience Card */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-t-4 border-t-blue-600 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
              <div className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Briefcase className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {text.experienceYears}
                </p>
                <p className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                  {text.experienceLabel}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  {text.experienceSubtitle}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                  {text.experienceDetail}
                </p>
              </div>
            </Card>

            {/* Students Card */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-t-4 border-t-emerald-600 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
              <div className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="text-5xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                  {text.studentsTaught}
                </p>
                <p className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                  {text.studentsTaughtLabel}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  {text.studentsTaughtSubtitle}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                  {text.studentsTaughtDetail}
                </p>
              </div>
            </Card>

            {/* Certifications Card */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-t-4 border-t-purple-600 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
              <div className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                </div>
                <p className="text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {text.certifications}
                </p>
                <p className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                  {text.certificationsLabel}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  {text.certificationsSubtitle}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                  {text.certificationsDetail}
                </p>
              </div>
            </Card>
          </div>

          {/* ==================================================================== */}
          {/* CURRENTLY PURSUING */}
          {/* ==================================================================== */}
          <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-purple-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 border-0">
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <p className="text-xl font-bold mb-3 text-white/90">
                {text.currentlyPursuing}
              </p>
              <p className="text-2xl md:text-3xl font-bold mb-6">
                {text.degree}
              </p>
              <div className="max-w-md mx-auto">
                <div className="bg-white/20 backdrop-blur-sm rounded-full h-3 overflow-hidden">
                  <div className="bg-white h-full rounded-full shadow-lg animate-pulse w-3/4" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </section>
  );
}
