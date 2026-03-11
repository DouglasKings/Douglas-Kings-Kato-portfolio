/**
 * GalleryModal — components/modals/gallery-modal.tsx
 *
 * The main "See My Work" full-screen overlay.
 * Opened from two places in the portfolio:
 *   1. "See My Work" button in ProfileContent → page.tsx: setActiveModal("gallery")
 *   2. "Gallery" card in RightNavigation     → page.tsx: setActiveModal("gallery")
 *
 * ── TWO-PART CONTENT STRUCTURE ───────────────────────────────────────────────
 *
 *   PART 1 — Technical Case Studies          (NEW — reads from lib/data.ts)
 *   ─────────────────────────────────────────────────────────────────────────
 *   Rendered by <GallerySection language={language} />.
 *   GallerySection maps over the projects[] array from lib/data.ts and
 *   renders a card for each project.
 *   Clicking "View Technical Case Study" opens <ProjectDetailModal /> at z-[200],
 *   which shows: Challenge / Solution / Architecture / Features / SDG Impact.
 *
 *   PART 2 — Creative Media & Awards         (EXISTING — unchanged)
 *   ─────────────────────────────────────────────────────────────────────────
 *   The original media grid: software project screenshots, teaching videos,
 *   China memories, award ceremony photos, TV interview recordings.
 *   Items with a `link` open the live site in a new browser tab.
 *   Items without a `link` open in the fullscreen lightbox below.
 *
 * ── Z-INDEX STACK ────────────────────────────────────────────────────────────
 *   GalleryModal        z-[100]   ← this file
 *   Media Lightbox      z-[150]   ← selectedItem overlay (inside this file)
 *   ProjectDetailModal  z-[200]   ← managed inside GallerySection
 *
 * ── STATE ────────────────────────────────────────────────────────────────────
 *   selectedItem: GalleryItem | null
 *     Controls the fullscreen media lightbox for PART 2 items.
 *     Lives HERE (not in GallerySection) so project and media state
 *     are completely independent of each other.
 *
 * ── KEYBOARD ─────────────────────────────────────────────────────────────────
 *   ESC — if lightbox is open: close lightbox first
 *         if lightbox is closed: close the entire modal
 *
 * @component
 */

"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Play,
  Trophy,
  X,
  ExternalLink,
  Maximize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Language } from "@/lib/data";

/**
 * NEW IMPORT — GallerySection
 * This single line is what makes your lib/data.ts projects visible in the UI.
 * GallerySection reads the projects[] array and renders the project cards
 * with the "View Technical Case Study" button.
 */
import GallerySection from "@/components/sections/gallery-section";

// ── Types ─────────────────────────────────────────────────────────────────

/** Describes one item in the Creative Media & Awards grid (PART 2). */
interface GalleryItem {
  type: "image" | "video";
  title: { en: string; de: string };
  description: { en: string; de: string };
  src: string;
  duration?: string;
  /** If set: clicking opens this URL in a new tab (no lightbox). */
  link?: string;
}

interface GalleryModalProps {
  language: Language;
  onClose: () => void;
}

// ── Component ─────────────────────────────────────────────────────────────

export default function GalleryModal({ language, onClose }: GalleryModalProps) {
  /**
   * selectedItem — drives the media lightbox for PART 2.
   * null         → lightbox is hidden
   * GalleryItem  → lightbox shows this photo or video fullscreen
   *
   * Note: the project deep-dive modal (ProjectDetailModal) has its OWN
   * selectedProject state inside GallerySection, completely independent.
   */
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // ── Side effects ─────────────────────────────────────────────────────

  useEffect(() => {
    /** ESC: close lightbox first; second press closes the whole modal. */
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedItem) {
          setSelectedItem(null); // Close lightbox first
        } else {
          onClose(); // Then close the gallery
        }
      }
    };

    window.addEventListener("keydown", handleEsc);

    // Lock body scroll while modal is open — prevents background page scroll
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [onClose, selectedItem]);

  // ── Content data ─────────────────────────────────────────────────────

  const content = {
    backButton: { en: "Back to Portfolio", de: "Zurück zum Portfolio" },
    headerTitle: {
      en: "Project & Awards Gallery",
      de: "Projekt- & Auszeichnungsgalerie",
    },
    title: {
      en: "Project & Awards Gallery",
      de: "Projekt- & Auszeichnungsgalerie",
    },
    subtitle: {
      en: "A comprehensive collection of my software work, creative designs, and awards.",
      de: "Eine umfassende Sammlung meiner Softwarearbeiten, kreativen Designs und Auszeichnungen.",
    },
    visitSite: { en: "Visit Website", de: "Webseite besuchen" },

    // ── PART 2: Creative Media & Awards items ─────────────────────────
    // Items WITH `link`    → clicking opens the URL in a new tab
    // Items WITHOUT `link` → clicking opens the fullscreen lightbox
    items: [
      // ── Live software projects (open in new tab) ───────────────────
      {
        type: "image",
        title: {
          en: "Damien Dennis Birthday Web App",
          de: "Damien Dennis Geburtstags-App",
        },
        description: {
          en: "A vibrant web application to celebrate birthdays with interactive features and animations.",
          de: "Eine lebendige Webanwendung für Geburtstage mit interaktiven Funktionen und Animationen.",
        },
        src: "/assets/images/1.png",
        link: "https://damien-dennis-birthday-app.vercel.app/",
      },
      {
        type: "image",
        title: {
          en: "Kings Technologies Website",
          de: "Kings Technologies Webseite",
        },
        description: {
          en: "Douglas Kings Kato website showcasing technology services and expertise.",
          de: "Douglas Kings Kato Website, die Technologiedienstleistungen und Fachwissen präsentiert.",
        },
        src: "/assets/images/2.png",
        link: "https://kingstechnologies.netlify.app/",
      },
      {
        type: "image",
        title: { en: "MBS Advocates", de: "MBS Anwälte" },
        description: {
          en: "Legal services web application with client management features.",
          de: "Webanwendung für Rechtsdienstleistungen mit Mandantenverwaltungsfunktionen.",
        },
        src: "/assets/images/3.png",
        link: "https://mbs-advocates-app.vercel.app/",
      },
      {
        type: "image",
        title: { en: "Damien Papers Portfolio", de: "Damien Papers Portfolio" },
        description: {
          en: "A professional portfolio showcasing legal expertise, academic achievements, and personal interests.",
          de: "Ein professionelles Portfolio, das juristisches Fachwissen und akademische Leistungen präsentiert.",
        },
        src: "/assets/images/4.png",
        link: "https://damien-portfolio-nine.vercel.app/",
      },
      {
        type: "image",
        title: { en: "Doreen Birthday Web App", de: "Doreen Geburtstags-App" },
        description: {
          en: "A vibrant web application to celebrate birthdays with interactive features and animations.",
          de: "Eine lebendige Webanwendung für Geburtstage mit interaktiven Funktionen und Animationen.",
        },
        src: "/assets/images/17.png",
        link: "https://doreen-birthday-app.vercel.app/",
      },
      {
        type: "image",
        title: { en: "Hematrikan Innovation", de: "Hematrikan Innovation" },
        description: {
          en: "Delivering secure, scalable cloud and cybersecurity solutions.",
          de: "Bereitstellung sicherer, skalierbarer Cloud- und Cybersicherheitslösungen.",
        },
        src: "/assets/images/14.png",
        link: "https://hematrikan.com/",
      },

      // ── Media gallery (open fullscreen lightbox) ───────────────────
      {
        type: "video",
        title: { en: "3D Logo Animation", de: "3D-Logo-Animation" },
        description: {
          en: "Professional 3D logo modeling and animation for educational content.",
          de: "Professionelle 3D-Logomodellierung und Animation für Bildungsinhalte.",
        },
        src: "/assets/videos/7.mp4",
      },
      {
        type: "image",
        title: {
          en: "Best Memories in China",
          de: "Die schönsten Erinnerungen an China",
        },
        description: {
          en: "Fun on Halloween with my students",
          de: "Spaß an Halloween mit meinen Schülern",
        },
        src: "/assets/images/0.jpg",
      },
      {
        type: "image",
        title: { en: "2D Character Creation", de: "2D-Charaktererstellung" },
        description: {
          en: "A glimpse into my 2D art.",
          de: "Einblick in meine 2D-Kunst.",
        },
        src: "/assets/images/10.jpg",
      },
      {
        type: "video",
        title: {
          en: "Teaching Session in China",
          de: "Unterrichtsstunde in China",
        },
        description: {
          en: "English classes at Field English School",
          de: "Englischstunde an der Field English School",
        },
        src: "/assets/videos/1.mp4",
      },
      {
        type: "video",
        title: {
          en: "Teaching Session in China",
          de: "Unterrichtsstunde in China",
        },
        description: {
          en: "English classes at Field English School",
          de: "Englischstunde an der Field English School",
        },
        src: "/assets/videos/2.mp4",
      },
      {
        type: "video",
        title: {
          en: "Teaching Session in China",
          de: "Unterrichtsstunde in China",
        },
        description: {
          en: "English classes at Field English School",
          de: "Englischstunde an der Field English School",
        },
        src: "/assets/videos/3.mp4",
      },
      {
        type: "image",
        title: {
          en: "Award from Ministry of ICT",
          de: "Auszeichnung durch das IKT-Ministerium",
        },
        description: {
          en: "Received award from the Minister of ICT & National Guidance for the EU-Funded EBP Project.",
          de: "Auszeichnung durch den Minister für IKT & Nationale Orientierung für das EU-finanzierte EBP-Projekt.",
        },
        src: "/assets/images/2.jpg",
      },
      {
        type: "image",
        title: {
          en: "Award Ceremony Highlights",
          de: "Highlights der Preisverleihung",
        },
        description: {
          en: "Celebrating the success of the Entrepreneurship Booster Platform.",
          de: "Feier des Erfolgs der Entrepreneurship Booster Platform.",
        },
        src: "/assets/images/4.jpg",
      },
      {
        type: "image",
        title: {
          en: "1st Place - Multi-University Hackathon",
          de: "1. Platz - Multi-Universitäts-Hackathon",
        },
        description: {
          en: "Won 1st place in Sept 2025, leading to the implementation of the Entrepreneurship project with SUMIC IT SOLUTIONS LTD.",
          de: "1. Platz im Sept. 2025, was zur Umsetzung des Entrepreneurship-Projekts mit SUMIC IT SOLUTIONS LTD führte.",
        },
        src: "/assets/images/5.jpg",
      },
      {
        type: "video",
        title: { en: "Character Animation", de: "Charakteranimation" },
        description: {
          en: "Designed and animated the 2D character.",
          de: "Entwurf und Animation des 2D-Charakters.",
        },
        src: "/assets/videos/8.mp4",
      },
      {
        type: "video",
        title: { en: "Graphics Design Club", de: "Grafikdesign-Club" },
        description: {
          en: "My students at Heritage displaying their artistic skills.",
          de: "Meine Schüler an der Heritage präsentieren ihre künstlerischen Fähigkeiten.",
        },
        src: "/assets/videos/9.mp4",
      },
      {
        type: "video",
        title: { en: "Interview with UBC TV", de: "Interview mit UBC TV" },
        description: {
          en: "Discussing our winning solution and the future of the Entrepreneurship Booster Platform on national television (Uganda Broadcasting Corporation).",
          de: "Diskussion unserer Gewinnerlösung und der Zukunft der Entrepreneurship Booster Platform im nationalen Fernsehen (UBC).",
        },
        src: "/assets/videos/4.mp4",
      },
      {
        type: "video",
        title: { en: "Featured on Bukedde TV", de: "Beitrag auf Bukedde TV" },
        description: {
          en: "Media coverage by Bukedde TV highlighting the innovation and team effort behind our EU-funded project victory.",
          de: "Medienbericht von Bukedde TV über die Innovation und Teamleistung hinter unserem Sieg beim EU-finanzierten Projekt.",
        },
        src: "/assets/videos/5.mp4",
      },
    ] as GalleryItem[],
  };

  // ── Render ────────────────────────────────────────────────────────────

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════
          MAIN GALLERY MODAL  (z-[100])
          Full-viewport white overlay with internal scroll.
          ══════════════════════════════════════════════════════════════════ */}
      <div className="fixed inset-0 z-[100] bg-white dark:bg-slate-950 overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* ── Sticky Header ──────────────────────────────────────────── */}
        {/*
          sticky top-0 z-10 — stays visible as user scrolls content.
          bg-white/dark + shadow-md — clean separation from scrolling content.
          Gradient title is absolutely centred between back button and spacer.
        */}
        <header className="sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between relative">
              {/* Back button — left side */}
              <Button
                onClick={onClose}
                variant="ghost"
                size="sm"
                className="gap-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <ArrowLeft className="w-4 h-4" />
                {content.backButton[language]}
              </Button>

              {/* Centred gradient title — pink → purple → indigo */}
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent absolute left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                {content.headerTitle[language]}
              </h1>

              {/* Right spacer — mirrors the back button width for true centering */}
              <div className="w-[140px]" />
            </div>
          </div>
        </header>

        {/* ── Main Content Area ─────────────────────────────────────── */}
        <main className="container mx-auto px-4 py-8 max-w-6xl">
          {/* ── Hero title block ──────────────────────────────────── */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 dark:from-pink-900/30 dark:via-purple-900/30 dark:to-indigo-900/30 rounded-full mb-4">
              <Trophy className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
              {content.title[language]}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              {content.subtitle[language]}
            </p>
          </div>

          {/* ════════════════════════════════════════════════════════
              PART 1 — TECHNICAL CASE STUDIES
              ────────────────────────────────────────────────────────
              <GallerySection /> handles everything:
                - Reads projects[] from lib/data.ts
                - Renders project cards with "View Technical Case Study" buttons
                - Manages selectedProject state for ProjectDetailModal (z-[200])

              To add a new project: edit lib/data.ts only.
              No changes needed here.
              ════════════════════════════════════════════════════════ */}
          <GallerySection language={language} />

          {/* ════════════════════════════════════════════════════════
              PART 2 — CREATIVE MEDIA & AWARDS
              ────────────────────────────────────────────────────────
              The original media grid — unchanged from the existing design.
              Items with link   → window.open() in new tab
              Items without link → setSelectedItem() → lightbox (z-[150])
              ════════════════════════════════════════════════════════ */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
              {language === "en"
                ? "Creative Media & Awards"
                : "Kreative Medien & Auszeichnungen"}
            </h2>

            {/* 3-column responsive grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.items.map((item, index) => (
                <Card
                  key={index}
                  className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => {
                    if (item.link) {
                      // Software project → open live site in a new browser tab
                      window.open(item.link, "_blank", "noopener,noreferrer");
                    } else {
                      // Photo or video → open in fullscreen lightbox
                      setSelectedItem(item);
                    }
                  }}
                >
                  {/* ── Media thumbnail ─────────────────────────── */}
                  <div className="relative aspect-video bg-slate-100 dark:bg-slate-900 overflow-hidden">
                    {item.type === "video" ? (
                      <div className="relative w-full h-full">
                        <video
                          src={item.src}
                          className="w-full h-full object-cover"
                          muted
                          loop
                          playsInline
                        />
                        {/* Play overlay — darkens on hover */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full h-full">
                        <img
                          src={item.src || "/placeholder.svg"}
                          alt={item.title[language]}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* External link badge — shown on software project thumbnails */}
                        {item.link && (
                          <div className="absolute top-2 right-2 p-2 bg-white/90 dark:bg-slate-900/90 rounded-full">
                            <ExternalLink className="w-4 h-4 text-pink-600" />
                          </div>
                        )}
                        {/* Fullscreen hint — shown on media items (no link) */}
                        {!item.link && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                            <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* ── Card text ───────────────────────────────── */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">
                      {item.title[language]}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">
                      {item.description[language]}
                    </p>

                    {/* "Visit Website" label — only for items with a link */}
                    {item.link && (
                      <div className="flex items-center gap-2 text-sm text-pink-600 dark:text-pink-400 font-medium">
                        <ExternalLink className="w-4 h-4" />
                        {content.visitSite[language]}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          MEDIA LIGHTBOX  (z-[150])
          ──────────────────────────────────────────────────────────────────
          Full-black fullscreen overlay for photos and videos.
          Only renders for items that have NO `link` property.
          Software project items open in a new tab — they never reach here.

          z-[150] puts it above GalleryModal (z-[100]) but below
          ProjectDetailModal (z-[200]), so the case study modal always
          stays on top regardless of which lightbox is open.
          ══════════════════════════════════════════════════════════════════ */}
      {selectedItem && !selectedItem.link && (
        <div className="fixed inset-0 z-[150] bg-black flex flex-col animate-in fade-in duration-200">
          {/* Lightbox header — title + close button */}
          <div className="flex justify-between items-center p-4 bg-black/90 backdrop-blur-md">
            <div>
              <h3 className="text-white text-lg font-semibold">
                {selectedItem.title[language]}
              </h3>
              <p className="text-slate-400 text-sm">
                {selectedItem.description[language]}
              </p>
            </div>
            <Button
              onClick={() => setSelectedItem(null)}
              variant="ghost"
              className="text-white hover:bg-white/20 gap-2"
            >
              <X className="w-5 h-5" />
              {language === "en" ? "Close" : "Schließen"}
            </Button>
          </div>

          {/* Lightbox media — video with controls, or image */}
          <div className="flex-1 w-full h-full flex items-center justify-center p-4">
            {selectedItem.type === "video" ? (
              <video
                src={selectedItem.src}
                controls
                autoPlay
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <img
                src={selectedItem.src || "/placeholder.svg"}
                alt={selectedItem.title[language]}
                className="max-w-full max-h-full object-contain"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
