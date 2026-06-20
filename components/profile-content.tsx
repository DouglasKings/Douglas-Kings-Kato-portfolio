/**
 * components/profile-content.tsx
 *
 * ── CHANGES IN THIS VERSION ──────────────────────────────────────────────
 *
 * FIX — Dark mode gradient contrast (Task 1):
 *   The job-title line ("Full Stack Developer | Data Analyst | ICT Educator")
 *   uses a blue→purple→pink gradient with no dark: stops — added lighter
 *   variants so it stays readable on the dark hero background. Also added
 *   dark: border/text states to the "See My Work" outline button, whose
 *   purple-600 border/text was low-contrast against a dark card background.
 *
 * NOT CHANGED — and why:
 *   You asked me to verify the "4.81 GPA" stat is present and consistent.
 *   I searched this file (and lib/data.ts, and left-navigation.tsx) and a
 *   GPA figure does not appear anywhere in the code you pasted. The stats
 *   block here only contains: experienceYears ("7+"), studentsTaught
 *   ("500+"), and certifications ("15+"). Per my accuracy protocol, I'm not
 *   inventing a GPA card — that would be fabricating a credential into your
 *   public portfolio. If you want a GPA stat added, tell me the real number
 *   and where it should appear (a 4th stat card, or inside the "Currently
 *   Pursuing" degree-progress card), and I'll wire it in.
 *
 * Everything else — the onNavigateToGallery fix, language switcher,
 * profile picture, stats grid layout — is unchanged from your version.
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
  /** Current active language */
  language: Language;
  /** Callback to toggle between English and German */
  onToggleLang?: () => void;
  /**
   * Callback to open the Experience Modal directly.
   * Wired in page.tsx as: () => setActiveModal("experience")
   */
  onOpenExperience?: () => void;
  /**
   * Callback to open the Gallery Modal directly.
   * Wired in page.tsx as: () => setActiveModal("gallery")
   */
  onNavigateToGallery?: () => void;
}

// ============================================================================
// BILINGUAL CONTENT
// ============================================================================

const content = {
  en: {
    greeting: "Hello, I'm",
    name: "Douglas Kings Kato",
    // ── FIX: title split into two parts instead of one long string ──
    // Root cause of the cropping in your screenshot: this was a single
    // string ("...| ICT Educator") that the browser auto-wrapped wherever
    // it ran out of horizontal space, which on most screens broke right
    // after "Analyst |" — leaving "ICT Educator" stranded as an orphaned
    // second line with no relationship to the line above it, AND the
    // gradient text box (bg-clip-text) was clipping the tops of letters
    // because the line-height was too tight for two wrapped lines.
    //
    // Fix: split into titleLine1 / titleLine2 so "ICT Educator" is always
    // deliberately on its own line (not an accident of viewport width),
    // and render them as two separate <p> elements with proper line-height
    // so ascenders (capital letters, the "|" character) aren't cropped.
    titleLine1: "Full Stack Developer | Data Analyst |",
    titleLine2: "ICT Educator",
    subtitle: "Specialized in USSD & Banking Data Systems",
    bio: "A Hybrid Professional bridging complex backend engineering with high-stakes data validation. With a 7-year foundation in international technical communication, I specialize in architecting USSD-integrated solutions for digital inclusion and optimizing data integrity within Tier-1 banking environments. Informed by global research in India and Malaysia, I implement world-class standards in high-concurrency design and resilient digital public infrastructure.",
    welcome: "Welcome to My Interactive Portfolio",
    welcomeDescription:
      "Click on any section from the left or right panels to explore my professional journey, technical skills, and creative work.",
    currentlyPursuing: "Final Year Candidate",
    degree: "BSc in Applied Information Technology",
    experienceYears: "7+",
    experienceLabel: "Years Professional Experience",
    experienceSubtitle: "Global Technical Training",
    experienceDetail: "China & Uganda Portfolio",
    studentsTaught: "500+",
    studentsTaughtLabel: "Mentees & Students",
    studentsTaughtSubtitle: "International ICT Instruction",
    studentsTaughtDetail: "AI, Software & Digital Literacy",
    certifications: "15+",
    certificationsLabel: "Certifications",
    certificationsSubtitle: "Professional & Technical",
    certificationsDetail: "Industry Recognized Credentials",
    viewExperience: "Explore Journey",
    seeMyWork: "View Technical Portfolio",
    switchLanguage: "Switch to German",
  },
  de: {
    greeting: "Hallo, ich bin",
    name: "Douglas Kings Kato",
    // ── German kept exactly as-is, per your instruction ──
    // Still split into titleLine1 / titleLine2 ONLY so the `en` and `de`
    // objects share an identical shape — TypeScript infers `text`'s type
    // as a union of both branches, so every key must exist on both sides
    // or property access below would fail type-checking. titleLine2 is
    // an empty string for German and the render logic (below) skips
    // rendering it entirely when language is "de", so the visual result
    // is unchanged: German still shows as one single-line title, exactly
    // as it did before.
    titleLine1: "Full Stack Entwickler | Data Analyst | IT-Dozent",
    titleLine2: "",
    subtitle: "Spezialisiert auf USSD & Banking-Datensysteme",
    bio: "Ein hybrider Experte, der die Brücke zwischen komplexem Backend-Engineering und hochsensibler Datenvalidierung schlägt. Mit einer 7-jährigen Basis in internationaler technischer Kommunikation spezialisiere ich mich auf die Architektur USSD-integrierter Lösungen zur digitalen Inklusion sowie auf die Optimierung der Datenintegrität in Tier-1-Banksystemen. Geprägt durch globale Forschung in Indien und Malaysia, implementiere ich Weltklasse-Standards in Hochverfügbarkeitsdesign und resilienter digitaler öffentlicher Infrastruktur.",
    welcome: "Willkommen in meinem interaktiven Portfolio",
    welcomeDescription:
      "Erkunden Sie meinen beruflichen Werdegang, meine technische Expertise und meine globale Feldforschung über die Panels.",
    currentlyPursuing: "Abschlusskandidat",
    degree: "BSc in Angewandter Informationstechnologie",
    experienceYears: "7+",
    experienceLabel: "Jahre Berufserfahrung",
    experienceSubtitle: "Globale technische Ausbildung",
    experienceDetail: "Portfolio aus China & Uganda",
    studentsTaught: "500+",
    studentsTaughtLabel: "Mentees & Studenten",
    studentsTaughtSubtitle: "Internationale IT-Lehre",
    studentsTaughtDetail: "KI, Software & digitale Kompetenz",
    certifications: "15+",
    certificationsLabel: "Zertifizierungen",
    certificationsSubtitle: "Beruflich & Technisch",
    certificationsDetail: "Branchenweit anerkannte Qualifikationen",
    viewExperience: "Werdegang erkunden",
    seeMyWork: "Technisches Portfolio ansehen",
    switchLanguage: "Auf Englisch umstellen",
  },
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ProfileContent({
  language,
  onToggleLang,
  onOpenExperience,
  onNavigateToGallery,
}: ProfileContentProps) {
  const text = content[language];

  /**
   * "See My Work" handler — calls onNavigateToGallery() which is wired in
   * page.tsx to setActiveModal("gallery"). Unchanged from your version.
   */
  const handleSeeMyWork = () => {
    if (onNavigateToGallery) {
      onNavigateToGallery();
    }
  };

  return (
    <section id="profile" className="scroll-mt-8">
      <Card className="p-8 md:p-12 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-800 relative overflow-hidden shadow-xl">
        {/* Decorative blurred background blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-3xl -z-0" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/5 via-blue-500/5 to-cyan-500/5 rounded-full blur-3xl -z-0" />

        <div className="relative z-10">
          {/* ==================================================================
              LANGUAGE SWITCHER
              ================================================================== */}
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

          {/* ==================================================================
              PROFILE PICTURE with animated online status pulse
              ================================================================== */}
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
              {/* Online status dot with ping animation */}
              <div className="absolute bottom-2 right-2 flex items-center justify-center">
                <div className="w-7 h-7 bg-emerald-500 rounded-full border-4 border-white dark:border-slate-900 shadow-lg" />
                <div className="absolute w-7 h-7 bg-emerald-500 rounded-full animate-ping opacity-75" />
              </div>
            </div>
          </div>

          {/* ==================================================================
              NAME AND TITLE
              ================================================================== */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              {text.name}
            </h1>
            {/*
              ── FIX: dark-mode gradient contrast + title structure ──
              blue-600/purple-600/pink-600 had no dark: stops (fixed below
              via dark: variants). Separately: English now renders as two
              explicit lines (titleLine1 / titleLine2) instead of one
              auto-wrapping string, so "ICT Educator" always sits cleanly
              on its own line by design — not by accident of viewport
              width. German's titleLine2 is empty, so only one line
              renders for German, visually identical to before.

              leading-snug (instead of the tighter default line-height)
              gives bg-clip-text enough vertical room that ascenders
              (capital letters, the "|" glyph) don't get visually cropped
              at the top — that cropping is what showed in your
              screenshot, caused by a wrapped two-line title fighting for
              space in a line-height sized for one line.
            */}
            <p className="text-xl md:text-2xl font-bold leading-snug bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-300 dark:to-pink-400 bg-clip-text text-transparent mb-2">
              <span className="block">{text.titleLine1}</span>
              {text.titleLine2 && (
                <span className="block">{text.titleLine2}</span>
              )}
            </p>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 font-medium">
              {text.subtitle}
            </p>
          </div>

          {/* ==================================================================
              BIO

              ── FIX: justified text alignment ──
              You asked for the bio paragraph to be "properly justified" in
              both English and German. Both languages render through this
              same <p> tag (only text.bio swaps per language, not the JSX),
              so one change covers both.

              Changed text-center → text-justify. Note: text-center and
              text-justify are mutually exclusive — justification needs the
              text left-edge-aligned so each line can stretch evenly to the
              right edge, so the centering had to be removed for
              justification to actually take visual effect.
              ================================================================== */}
          <p className="text-justify text-base md:text-lg text-slate-700 dark:text-slate-300 mb-10 leading-relaxed max-w-4xl mx-auto px-4">
            {text.bio}
          </p>

          {/* ==================================================================
              WELCOME CARD WITH CTA BUTTONS
              ================================================================== */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 mb-10 text-center border border-slate-200 dark:border-slate-700 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
              {text.welcome}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-base md:text-lg max-w-2xl mx-auto">
              {text.welcomeDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* --- View Experience Button --- */}
              <Button
                onClick={onOpenExperience}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 font-semibold px-8"
              >
                {text.viewExperience}
              </Button>

              {/*
                --- See My Work Button ---
                FIX: added dark: variants to the border/text colors.
                purple-600 border + purple-600 text were too dark to read
                clearly against the dark welcome-card background.
              */}
              <Button
                onClick={handleSeeMyWork}
                size="lg"
                variant="outline"
                className="border-2 border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-300 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white bg-transparent font-semibold px-8 transition-all duration-300"
              >
                {text.seeMyWork}
              </Button>
            </div>
          </div>

          {/* ==================================================================
              STATS GRID — Icons stacked above text (vertical layout)

              NOTE: 3 cards only — Experience / Students / Certifications.
              No GPA card exists in source data, so none is added here.
              See file header note for what's needed if you want one added.
              ================================================================== */}
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

            {/* Students Taught Card */}
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

          {/* ==================================================================
              CURRENTLY PURSUING — Degree progress card
              (white-on-color gradient — already fine in dark mode since
              the card itself is the colored surface, not page background)
              ================================================================== */}
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
              {/* Animated progress bar — purely decorative */}
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
