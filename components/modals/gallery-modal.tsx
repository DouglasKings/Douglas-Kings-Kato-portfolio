/**
 * components/modals/gallery-modal.tsx
 *
 * MOBILE FIX: Replaced absolute-positioned title with <ModalHeader>.
 * No other changes.
 */

"use client";

import { useEffect, useState } from "react";
import { Play, Trophy, X, ExternalLink, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Language } from "@/lib/data";
import GallerySection from "@/components/sections/gallery-section";
import ModalHeader from "@/components/ui/modal-header";

interface GalleryItem {
  type: "image" | "video";
  title: { en: string; de: string };
  description: { en: string; de: string };
  src: string;
  duration?: string;
  link?: string;
}

interface GalleryModalProps {
  language: Language;
  onClose: () => void;
}

export default function GalleryModal({ language, onClose }: GalleryModalProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedItem) setSelectedItem(null);
        else onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [onClose, selectedItem]);

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
    items: [
      {
        type: "image" as const,
        title: {
          en: "Damien Dennis Birthday Web App",
          de: "Damien Dennis Geburtstags-App",
        },
        description: {
          en: "A vibrant web application to celebrate birthdays.",
          de: "Eine lebendige Webanwendung für Geburtstage.",
        },
        src: "/assets/images/1.png",
        link: "https://damien-dennis-birthday-app.vercel.app/",
      },
      {
        type: "image" as const,
        title: {
          en: "Kings Technologies Website",
          de: "Kings Technologies Webseite",
        },
        description: {
          en: "Douglas Kings Kato website showcasing technology services.",
          de: "Website, die Technologiedienstleistungen präsentiert.",
        },
        src: "/assets/images/2.png",
        link: "https://kingstechnologies.netlify.app/",
      },
      {
        type: "image" as const,
        title: { en: "MBS Advocates", de: "MBS Anwälte" },
        description: {
          en: "Legal services web application.",
          de: "Webanwendung für Rechtsdienstleistungen.",
        },
        src: "/assets/images/3.png",
        link: "https://mbs-advocates-app.vercel.app/",
      },
      {
        type: "image" as const,
        title: { en: "Damien Papers Portfolio", de: "Damien Papers Portfolio" },
        description: {
          en: "A professional portfolio showcasing legal expertise.",
          de: "Ein professionelles Portfolio.",
        },
        src: "/assets/images/4.png",
        link: "https://damien-portfolio-nine.vercel.app/",
      },
      {
        type: "image" as const,
        title: { en: "Doreen Birthday Web App", de: "Doreen Geburtstags-App" },
        description: {
          en: "A vibrant birthday web application.",
          de: "Eine lebendige Geburtstags-App.",
        },
        src: "/assets/images/17.png",
        link: "https://doreen-birthday-app.vercel.app/",
      },
      {
        type: "image" as const,
        title: { en: "Hematrikan Innovation", de: "Hematrikan Innovation" },
        description: {
          en: "Delivering secure, scalable cloud solutions.",
          de: "Bereitstellung sicherer Cloud-Lösungen.",
        },
        src: "/assets/images/14.png",
        link: "https://hematrikan.com/",
      },
      {
        type: "video" as const,
        title: { en: "3D Logo Animation", de: "3D-Logo-Animation" },
        description: {
          en: "Professional 3D logo modeling and animation.",
          de: "Professionelle 3D-Logomodellierung.",
        },
        src: "/assets/videos/7.mp4",
      },
      {
        type: "image" as const,
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
        type: "image" as const,
        title: { en: "2D Character Creation", de: "2D-Charaktererstellung" },
        description: {
          en: "A glimpse into my 2D art.",
          de: "Einblick in meine 2D-Kunst.",
        },
        src: "/assets/images/10.jpg",
      },
      {
        type: "video" as const,
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
        type: "video" as const,
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
        type: "video" as const,
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
        type: "image" as const,
        title: {
          en: "Award from Ministry of ICT",
          de: "Auszeichnung durch das IKT-Ministerium",
        },
        description: {
          en: "Received award from the Minister of ICT.",
          de: "Auszeichnung durch den Minister für IKT.",
        },
        src: "/assets/images/2.jpg",
      },
      {
        type: "image" as const,
        title: {
          en: "Award Ceremony Highlights",
          de: "Highlights der Preisverleihung",
        },
        description: {
          en: "Celebrating the Entrepreneurship Booster Platform.",
          de: "Feier der Entrepreneurship Booster Platform.",
        },
        src: "/assets/images/4.jpg",
      },
      {
        type: "image" as const,
        title: {
          en: "1st Place - Multi-University Hackathon",
          de: "1. Platz - Multi-Universitäts-Hackathon",
        },
        description: {
          en: "Won 1st place in Sept 2025.",
          de: "1. Platz im Sept. 2025.",
        },
        src: "/assets/images/5.jpg",
      },
      {
        type: "video" as const,
        title: { en: "Character Animation", de: "Charakteranimation" },
        description: {
          en: "Designed and animated the 2D character.",
          de: "Entwurf und Animation des 2D-Charakters.",
        },
        src: "/assets/videos/8.mp4",
      },
      {
        type: "video" as const,
        title: { en: "Graphics Design Club", de: "Grafikdesign-Club" },
        description: {
          en: "My students displaying their artistic skills.",
          de: "Meine Schüler präsentieren ihre Fähigkeiten.",
        },
        src: "/assets/videos/9.mp4",
      },
      {
        type: "video" as const,
        title: { en: "Interview with UBC TV", de: "Interview mit UBC TV" },
        description: {
          en: "Discussing our winning solution on national television.",
          de: "Diskussion unserer Gewinnerlösung im nationalen Fernsehen.",
        },
        src: "/assets/videos/4.mp4",
      },
      {
        type: "video" as const,
        title: { en: "Featured on Bukedde TV", de: "Beitrag auf Bukedde TV" },
        description: {
          en: "Media coverage by Bukedde TV.",
          de: "Medienbericht von Bukedde TV.",
        },
        src: "/assets/videos/5.mp4",
      },
    ] as GalleryItem[],
  };

  return (
    <>
      <div className="fixed inset-0 z-[100] bg-white dark:bg-slate-950 overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* ── MOBILE-SAFE HEADER ── */}
        <ModalHeader
          title={content.headerTitle[language]}
          gradientClass="from-pink-600 via-purple-600 to-indigo-600"
          backLabel={content.backButton[language]}
          onBack={onClose}
        />

        <main className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 dark:from-pink-900/30 dark:via-purple-900/30 dark:to-indigo-900/30 rounded-full mb-4">
              <Trophy className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              {content.title[language]}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
              {content.subtitle[language]}
            </p>
          </div>

          {/* PART 1 — Technical Case Studies */}
          <GallerySection language={language} />

          {/* PART 2 — Creative Media & Awards */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
              {language === "en"
                ? "Creative Media & Awards"
                : "Kreative Medien & Auszeichnungen"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.items.map((item, index) => (
                <Card
                  key={index}
                  className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => {
                    if (item.link)
                      window.open(item.link, "_blank", "noopener,noreferrer");
                    else setSelectedItem(item);
                  }}
                >
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
                  <div className="p-4">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">
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
          </div>
        </main>
      </div>

      {/* Media lightbox */}
      {selectedItem && !selectedItem.link && (
        <div className="fixed inset-0 z-[150] bg-black flex flex-col animate-in fade-in duration-200">
          <div className="flex justify-between items-center p-4 bg-black/90 backdrop-blur-md">
            <div className="flex-1 min-w-0 pr-4">
              <h3 className="text-white text-base font-semibold truncate">
                {selectedItem.title[language]}
              </h3>
              <p className="text-slate-400 text-sm truncate">
                {selectedItem.description[language]}
              </p>
            </div>
            <Button
              onClick={() => setSelectedItem(null)}
              variant="ghost"
              className="text-white hover:bg-white/20 gap-2 flex-shrink-0"
            >
              <X className="w-5 h-5" />
              <span className="hidden sm:inline">
                {language === "en" ? "Close" : "Schließen"}
              </span>
            </Button>
          </div>
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
