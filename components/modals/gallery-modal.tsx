/**
 * Gallery Modal Component - With White Header & Pink-Purple-Indigo Gradient Text
 *
 * Displays a comprehensive gallery of projects, awards, and media content.
 * Features:
 * - White sticky header with shadow
 * - Pink-Purple-Indigo gradient colored title text
 * - Software project cards with external links
 * - Media items (images/videos) that open in fullscreen lightbox
 * - Fullscreen video player with native controls
 * - Bilingual support with natural German translations
 * - ESC key support for closing
 *
 * @component
 */

"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Image as ImageIcon,
  Play,
  Film,
  Trophy,
  X,
  ExternalLink,
  Maximize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Language } from "@/lib/data";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface GalleryItem {
  type: "image" | "video";
  title: { en: string; de: string };
  description: { en: string; de: string };
  src: string;
  duration?: string;
  link?: string; // External link for software projects
}

interface GalleryModalProps {
  language: Language;
  onClose: () => void;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function GalleryModal({ language, onClose }: GalleryModalProps) {
  // State to track which item is currently open in fullscreen lightbox
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // ============================================================================
  // KEYBOARD HANDLERS & SIDE EFFECTS
  // ============================================================================

  useEffect(() => {
    // ESC key handler: Close lightbox or modal
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedItem) {
          // If lightbox is open, close it first
          setSelectedItem(null);
        } else {
          // Otherwise, close the entire modal
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleEsc);

    // Prevent background scrolling when modal is open
    document.body.style.overflow = "hidden";

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [onClose, selectedItem]);

  // ============================================================================
  // CONTENT DATA - NATURAL GERMAN TRANSLATIONS
  // ============================================================================

  const content = {
    backButton: {
      en: "Back to Portfolio",
      de: "Zurück zum Portfolio",
    },
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
    visitSite: {
      en: "Visit Website",
      de: "Webseite besuchen",
    },
    items: [
      // ========================================================================
      // SOFTWARE PROJECTS (With External Links - No Lightbox)
      // ========================================================================
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
        title: {
          en: "MBS Advocates",
          de: "MBS Anwälte",
        },
        description: {
          en: "Legal services web application with client management features.",
          de: "Webanwendung für Rechtsdienstleistungen mit Mandantenverwaltungsfunktionen.",
        },
        src: "/assets/images/3.png",
        link: "https://mbs-advocates-app.vercel.app/",
      },
      {
        type: "image",
        title: {
          en: "Damien Papers Portfolio",
          de: "Damien Papers Portfolio",
        },
        description: {
          en: "A professional portfolio showcasing legal expertise, academic achievements, and personal interests.",
          de: "Ein professionelles Portfolio, das juristisches Fachwissen und akademische Leistungen präsentiert.",
        },
        src: "/assets/images/4.png",
        link: "https://damien-portfolio-nine.vercel.app/",
      },
      {
        type: "image",
        title: {
          en: "Doreen Birthday Web App",
          de: "Doreen Geburtstags-App",
        },
        description: {
          en: "A vibrant web application to celebrate birthdays with interactive features and animations.",
          de: "Eine lebendige Webanwendung für Geburtstage mit interaktiven Funktionen und Animationen.",
        },
        src: "/assets/images/17.png",
        link: "https://doreen-birthday-app.vercel.app/",
      },
      {
        type: "image",
        title: {
          en: "Hematrikan Innovation",
          de: "Hematrikan Innovation",
        },
        description: {
          en: "Delivering secure, scalable cloud and cybersecurity solutions.",
          de: "Bereitstellung sicherer, skalierbarer Cloud- und Cybersicherheitslösungen.",
        },
        src: "/assets/images/14.png",
        link: "https://hematrikan.com/",
      },

      // ========================================================================
      // MEDIA GALLERY (No Links - Opens Fullscreen Lightbox)
      // ========================================================================
      {
        type: "video",
        title: {
          en: "3D Logo Animation",
          de: "3D-Logo-Animation",
        },
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
        title: {
          en: "2D Character Creation",
          de: "2D-Charaktererstellung",
        },
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
        title: {
          en: "Character Animation",
          de: "Charakteranimation",
        },
        description: {
          en: "Designed and animated the 2D character.",
          de: "Entwurf und Animation des 2D-Charakters.",
        },
        src: "/assets/videos/8.mp4",
      },
      {
        type: "video",
        title: {
          en: "Graphics Design Club",
          de: "Grafikdesign-Club",
        },
        description: {
          en: "My students at Heritage displaying their artistic skills.",
          de: "Meine Schüler an der Heritage präsentieren ihre künstlerischen Fähigkeiten.",
        },
        src: "/assets/videos/9.mp4",
      },
      {
        type: "video",
        title: {
          en: "Interview with UBC TV",
          de: "Interview mit UBC TV",
        },
        description: {
          en: "Discussing our winning solution and the future of the Entrepreneurship Booster Platform on national television (Uganda Broadcasting Corporation).",
          de: "Diskussion unserer Gewinnerlösung und der Zukunft der Entrepreneurship Booster Platform im nationalen Fernsehen (UBC).",
        },
        src: "/assets/videos/4.mp4",
      },
      {
        type: "video",
        title: {
          en: "Featured on Bukedde TV",
          de: "Beitrag auf Bukedde TV",
        },
        description: {
          en: "Media coverage by Bukedde TV highlighting the innovation and team effort behind our EU-funded project victory.",
          de: "Medienbericht von Bukedde TV über die Innovation und Teamleistung hinter unserem Sieg beim EU-finanzierten Projekt.",
        },
        src: "/assets/videos/5.mp4",
      },
    ] as GalleryItem[],
  };

  // ============================================================================
  // RENDER: MAIN MODAL
  // ============================================================================

  return (
    <>
      {/* ====================================================================== */}
      {/* MAIN GALLERY MODAL */}
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

              {/* Centered Title with Pink-Purple-Indigo Gradient */}
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent absolute left-1/2 transform -translate-x-1/2">
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
        <main className="container mx-auto px-4 py-8 max-w-6xl">
          {/* ================================================================== */}
          {/* TITLE SECTION */}
          {/* ================================================================== */}
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

          {/* ================================================================== */}
          {/* GALLERY GRID */}
          {/* ================================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.items.map((item, index) => (
              <Card
                key={index}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => {
                  // If item has a link, open it in new tab
                  if (item.link) {
                    window.open(item.link, "_blank", "noopener,noreferrer");
                  } else {
                    // Otherwise, open in lightbox
                    setSelectedItem(item);
                  }
                }}
              >
                {/* Media Preview */}
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
                      {item.link && (
                        <div className="absolute top-2 right-2 p-2 bg-white/90 dark:bg-slate-900/90 rounded-full">
                          <ExternalLink className="w-4 h-4 text-pink-600" />
                        </div>
                      )}
                      {!item.link && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                          <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">
                    {item.title[language]}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">
                    {item.description[language]}
                  </p>

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
        </main>
      </div>

      {/* ====================================================================== */}
      {/* FULLSCREEN LIGHTBOX FOR MEDIA ITEMS */}
      {/* ====================================================================== */}
      {selectedItem && !selectedItem.link && (
        <div className="fixed inset-0 z-[150] bg-black flex flex-col animate-in fade-in duration-200">
          {/* ================================================================== */}
          {/* LIGHTBOX HEADER */}
          {/* ================================================================== */}
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

          {/* ================================================================== */}
          {/* LIGHTBOX MEDIA CONTENT */}
          {/* ================================================================== */}
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
