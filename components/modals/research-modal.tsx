/**
 * components/modals/research-modal.tsx
 *
 * ── CHANGES IN THIS VERSION ──────────────────────────────────────────────
 *
 * MAIN CHANGE — Back to an IN-APP full-screen viewer (not a browser tab),
 * with Close/Back buttons, and the crop bug fixed properly this time.
 *
 *   CONTEXT — what happened across the last few passes, so the final
 *   decision below makes sense:
 *     1. Original: in-app overlay, `object-contain` → image fully
 *        visible, but black bars on the short axis for mismatched
 *        aspect ratios (e.g. portrait photo on a landscape screen).
 *     2. I changed it to `object-cover` to remove the bars → this
 *        REMOVED parts of the image (cropped faces/torsos out of frame)
 *        to force-fill the box. Worse outcome, not better.
 *     3. I then removed the in-app viewer and linked straight to the
 *        raw asset with `target="_blank"` → opened a new BROWSER TAB,
 *        leaving your app entirely. Not what you wanted either — you
 *        want to stay inside the application, with Close/Back controls.
 *
 *   FIX (this version): in-app full-screen viewer is back, but using
 *   `object-contain` (not `object-cover`). This is the standard,
 *   correct behavior for an image/video VIEWER: the entire image is
 *   always visible, nothing is ever cropped out. On a mismatched aspect
 *   ratio there CAN be empty space on the short axis (e.g. portrait
 *   photo → narrow vertical bars left/right, or thin bars top/bottom on
 *   ultra-wide screens) — this is normal, expected behavior, identical
 *   to how Google Photos, macOS Preview, and virtually every native
 *   video player display mismatched media. It is not a bug to chase
 *   away; cropping content out (step 2 above) was the actual bug.
 *
 *   Clicking a thumbnail now sets `selectedMedia` and opens an in-app
 *   overlay at z-[200] (above this modal's z-[100]) with:
 *     - A solid page-style header bar
 *     - A prominent, labeled "Close" button (solid fill)
 *     - A "Back to Research" button next to it (same handler as Close;
 *       phrased as navigation so it reads as "go back" not "dismiss")
 *     - ESC key closes the viewer first, then the research modal on a
 *       second press (handleEsc checks selectedMedia first)
 *     - Videos use native browser controls (play/pause, volume,
 *       timeline, fullscreen), autoPlay on open, playsInline so iOS
 *       doesn't hijack into native fullscreen and hide the page chrome
 *
 * EARLIER FIXES (still present, unchanged from prior passes):
 *
 * FLAGGED ISSUE (read before you ship):
 *   right-navigation.tsx's nav card was originally labeled "References"
 *   but routes here, to ResearchModal, whose content is India/Malaysia
 *   field research — not referee contacts. That card has since been
 *   relabeled "Global Technical Research" in right-navigation.tsx to
 *   match what this modal actually shows. This modal's own header title
 *   was already "Global Technical Research" / "Globale technische
 *   Forschung", so no change was needed here for that part.
 *
 * FIX — "References available on request" line — kept in the intro below
 *   the subtitle, since you'd asked for this DACH-standard phrase to
 *   appear somewhere reachable from the (now relabeled) nav entry point.
 *
 * FIX — Dark mode gradient contrast: header gradient (orange→amber→blue)
 *   includes lighter dark: stops.
 *
 * Everything else — case-study cards, media grid layout, scroll-lock —
 * unchanged.
 */

"use client";

import { useEffect, useState } from "react";
import {
  Globe,
  Building2,
  ShieldAlert,
  Microscope,
  Play,
  X,
  Maximize2,
  ArrowLeft,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Language } from "@/lib/data";
import ModalHeader from "@/components/ui/modal-header";

interface ResearchMedia {
  type: "image" | "video";
  src: string;
  label: { en: string; de: string };
}

interface ResearchModalProps {
  language: Language;
  onClose: () => void;
}

export default function ResearchModal({
  language,
  onClose,
}: ResearchModalProps) {
  // ── Restored: tracks which media item is currently open in the
  // in-app full-screen viewer. null = viewer closed. ──
  const [selectedMedia, setSelectedMedia] = useState<ResearchMedia | null>(
    null,
  );

  // Scroll-lock + ESC handler. ESC closes the media viewer first (if
  // open), then the research modal on a subsequent press.
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedMedia) setSelectedMedia(null);
        else onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [onClose, selectedMedia]);

  const content = {
    backButton: { en: "Back to Portfolio", de: "Zurück zum Portfolio" },
    headerTitle: {
      en: "Global Technical Research",
      de: "Globale technische Forschung",
    },
    subtitle: {
      en: "International field studies informing the technical roadmap for Kings Technologies",
      de: "Internationale Feldstudien informieren die technische Roadmap von Kings Technologies",
    },
    referencesNote: {
      en: "Professional references available on request.",
      de: "Referenzen auf Anfrage erhältlich.",
    },
    researchItems: [
      {
        id: "india",
        location: "Mumbai, India",
        topic: {
          en: "Digital Public Infrastructure (DPI) & Fintech Resilience",
          de: "DPI & Fintech-Belastbarkeit",
        },
        icon: ShieldAlert,
        color: "text-orange-600",
        bg: "bg-orange-100 dark:bg-orange-900/30",
        description: {
          en: "Conducted technical analysis of India’s DPI architecture (UPI/Aadhaar stack) within the BKC financial district. Investigated high-concurrency engineering patterns required to support millions of real-time transactions.",
          de: "Technische Analyse der indischen DPI-Architektur (UPI/Aadhaar-Stack) im Finanzviertel BKC. Untersuchung von Hochverfügbarkeits-Mustern.",
        },
        impact: {
          en: "Informing the Kings Technologies roadmap for high-load USSD financial modules.",
          de: "Informiert die Roadmap von Kings Technologies für USSD-Finanzmodule.",
        },
        media: [
          {
            type: "image",
            src: "/assets/images/21.jpg",
            label: { en: "BKC Fintech Ecosystem", de: "BKC Fintech-Ökosystem" },
          },
          {
            type: "image",
            src: "/assets/images/22.jpg",
            label: {
              en: "DPI Infrastructure Analysis",
              de: "DPI Infrastruktur-Analyse",
            },
          },
        ],
      },
      {
        id: "malaysia",
        location: "Cyberjaya & Putrajaya, Malaysia",
        topic: {
          en: "National Digital Infrastructure & Smart City Scalability",
          de: "Smart-City-Skalierbarkeit",
        },
        icon: Building2,
        color: "text-blue-600",
        bg: "bg-blue-100 dark:bg-blue-900/30",
        description: {
          en: "Architectural analysis of national-level digital hubs, including MCMC and iTech Tower. Examined system resilience and hardware-software synergy in high-density urban tech corridors.",
          de: "Architektonische Analyse nationaler digitaler Hubs, einschließlich MCMC und iTech Tower.",
        },
        impact: {
          en: "Applying global infrastructure standards to resilient system design in East Africa.",
          de: "Anwendung globaler Infrastrukturstandards auf resilientes Systemdesign.",
        },
        media: [
          {
            type: "image",
            src: "/assets/images/19.jpg",
            label: {
              en: "MCMC Institutional Hub",
              de: "MCMC Institutioneller Hub",
            },
          },
          {
            type: "image",
            src: "/assets/images/20.jpg",
            label: {
              en: "iTech Tower Architecture",
              de: "iTech Tower Architektur",
            },
          },
          {
            type: "video",
            src: "/assets/videos/11.mp4",
            label: {
              en: "Smart City Latency Study",
              de: "Smart-City Latenzstudie",
            },
          },
        ],
      },
    ] as const,
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white dark:bg-slate-950 overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
      <ModalHeader
        title={content.headerTitle[language]}
        gradientClass="from-orange-600 via-amber-600 to-blue-600 dark:from-orange-400 dark:via-amber-300 dark:to-blue-400"
        backLabel={content.backButton[language]}
        onBack={onClose}
      />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="text-center mb-16">
          <Globe className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-3">
            {content.headerTitle[language]}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {content.subtitle[language]}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500 italic mt-3">
            {content.referencesNote[language]}
          </p>
        </div>

        <div className="space-y-16">
          {content.researchItems.map((item) => (
            <Card
              key={item.id}
              className="p-6 sm:p-8 border-l-4 border-l-blue-600 shadow-lg"
            >
              <div
                className={`flex flex-col ${item.id === "india" ? "" : "lg:flex-row"} gap-8`}
              >
                <div className="flex-1 space-y-6">
                  <div className="flex gap-4">
                    <div className={`p-3 ${item.bg} rounded-xl self-start`}>
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase text-blue-600 tracking-widest">
                        {item.location}
                      </span>
                      <h3 className="text-2xl font-bold mt-1">
                        {item.topic[language]}
                      </h3>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {item.description[language]}
                  </p>
                  <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
                    <Microscope className="w-5 h-5 text-blue-500 mt-0.5" />
                    <p className="text-sm font-medium italic text-slate-600">
                      {item.impact[language]}
                    </p>
                  </div>
                </div>

                {/* MEDIA GRID — clicking sets selectedMedia again
                    (no more target="_blank" link, no new tab). */}
                <div
                  className={`${item.id === "india" ? "w-full pt-4" : "lg:w-[350px]"} space-y-3`}
                >
                  <div
                    className={`grid gap-3 ${item.id === "india" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-2"}`}
                  >
                    {item.media.map((med, mIdx) => (
                      <button
                        key={mIdx}
                        type="button"
                        onClick={() => setSelectedMedia(med as ResearchMedia)}
                        aria-label={med.label[language]}
                        className={`relative rounded-xl overflow-hidden cursor-pointer group border-2 border-slate-100 dark:border-slate-800 text-left
                          ${med.type === "video" && item.id === "malaysia" ? "col-span-2 aspect-video" : "aspect-[4/3] md:aspect-square"}`}
                      >
                        {med.type === "video" ? (
                          <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                            <video
                              src={med.src}
                              className="w-full h-full object-cover opacity-60"
                            />
                            <Play className="absolute w-12 h-12 text-white opacity-90 group-hover:scale-110 transition-transform" />
                          </div>
                        ) : (
                          <img
                            src={med.src}
                            alt=""
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-end p-3">
                          <span className="text-[10px] font-bold uppercase text-white truncate">
                            {med.label[language]}
                          </span>
                        </div>
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="w-4 h-4 text-white" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      {/* ════════════════════════════════════════════════════════════════════
          MEDIA VIEWER — in-app full-screen overlay (NOT a browser tab).
          Stays entirely within the application; Close/Back return here.

          object-contain (not object-cover): the full image/video is
          always visible, nothing is cropped out of frame. On mismatched
          aspect ratios this can leave empty space on the short axis —
          that's expected, standard viewer behavior, not a bug.
          ════════════════════════════════════════════════════════════════ */}
      {selectedMedia && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedMedia.label[language]}
          className="fixed inset-0 z-[200] bg-black flex flex-col animate-in fade-in duration-200"
        >
          {/* Page-style header bar — solid, not translucent. */}
          <header className="flex-shrink-0 flex items-center justify-between gap-4 px-4 sm:px-6 py-4 bg-slate-950 border-b border-slate-800">
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-400 font-semibold">
                {language === "en"
                  ? "Field Research Analysis"
                  : "Feldforschungsanalyse"}
              </p>
              <h3 className="text-white font-bold text-sm sm:text-base truncate">
                {selectedMedia.label[language]}
              </h3>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {/* "Back" reinforces this reads as in-app navigation, not a
                  popup dismissal — same handler as Close. */}
              <Button
                onClick={() => setSelectedMedia(null)}
                variant="ghost"
                className="hidden sm:inline-flex text-slate-300 hover:text-white hover:bg-white/10 gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {language === "en"
                  ? "Back to Research"
                  : "Zurück zur Forschung"}
              </Button>

              {/* Prominent Close — solid white fill, not a ghost icon. */}
              <Button
                onClick={() => setSelectedMedia(null)}
                className="gap-2 bg-white text-slate-900 hover:bg-slate-200 font-semibold shadow-lg"
              >
                <X className="w-4 h-4" />
                {language === "en" ? "Close" : "Schließen"}
              </Button>
            </div>
          </header>

          {/* Media area — object-contain shows the whole image/video,
              never cropping content. Small padding keeps media off the
              very edge of the screen. */}
          <div className="flex-1 flex items-center justify-center overflow-hidden bg-black p-2 sm:p-4">
            {selectedMedia.type === "video" ? (
              <video
                src={selectedMedia.src}
                controls
                autoPlay
                playsInline
                className="max-w-full max-h-full w-auto h-auto object-contain shadow-2xl rounded-sm"
              >
                {language === "en"
                  ? "Your browser does not support video playback."
                  : "Ihr Browser unterstützt die Videowiedergabe nicht."}
              </video>
            ) : (
              <img
                src={selectedMedia.src}
                alt={selectedMedia.label[language]}
                className="max-w-full max-h-full w-auto h-auto object-contain shadow-2xl"
              />
            )}
          </div>

          {/* Mobile-only Back button — header hides the labeled version
              on small screens, restated here as a footer action. */}
          <div className="sm:hidden flex-shrink-0 p-3 bg-slate-950 border-t border-slate-800">
            <Button
              onClick={() => setSelectedMedia(null)}
              variant="outline"
              className="w-full gap-2 border-slate-700 text-slate-200 hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4" />
              {language === "en" ? "Back to Research" : "Zurück zur Forschung"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
