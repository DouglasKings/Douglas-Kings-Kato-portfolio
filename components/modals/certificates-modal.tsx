/**
 * Certificates Modal Component - With White Header & Yellow-Orange-Red Gradient Text
 *
 * Full-page modal displaying professional certifications and achievements.
 * Features:
 * - White sticky header with shadow
 * - Yellow-Orange-Red gradient colored title text
 * - Award cards with featured badges
 * - Full-screen certificate viewer with proper rotation
 * - Data matches CV exactly including hackathon wins
 * - Bilingual support with natural German
 * - ESC key support for closing
 * - CSS-based rotation for EU certificate (portrait to landscape)
 *
 * @component
 */

"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Award, Calendar, Trophy, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Language = "en" | "de";

interface CertificatesModalProps {
  language: Language;
  onClose: () => void;
}

// Certificate Viewer Modal Component - Full Screen Display
function CertificateViewerModal({
  certificateName,
  certificateId,
  language,
  onClose,
}: {
  certificateName: string;
  certificateId: string;
  language: Language;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  const viewerContent = {
    closeButton: {
      en: "Close",
      de: "Schließen",
    },
  };

  // ========================================================================
  // CERTIFICATE PDF VIEWER - Full Screen Display with Rotation Support
  // NASA: Landscape orientation (no rotation needed)
  // EU: Portrait orientation rotated 90° clockwise using CSS transform
  // ========================================================================
  const getCertificateContent = () => {
    if (certificateId === "nasa-certificate") {
      // NASA Certificate - Landscape orientation, displays normally
      return (
        <iframe
          src="/assets/documents/NASA-Certificate.pdf#toolbar=0&navpanes=0&scrollbar=0"
          className="w-full h-full border-0"
          title="NASA Certificate"
        />
      );
    } else if (certificateId === "eu-certificate") {
      // =====================================================================
      // EU Certificate - Portrait orientation, needs 90° counter-clockwise rotation
      //
      // Problem: PDF is in landscape but rotated 90° to the side
      // Solution: Rotate 90° counter-clockwise (-90deg) to straighten it
      //
      // Implementation:
      // 1. Full-screen container with flexbox centering
      // 2. Inner container rotated -90° (counter-clockwise)
      // 3. Swap width/height to compensate for rotation
      // 4. Flexbox automatically centers the content
      // =====================================================================
      return (
        <div className="w-full h-full flex items-center justify-center overflow-hidden bg-white">
          {/* 
            Rotation Container:
            - Rotates -90° (counter-clockwise) to straighten the certificate
            - Width and height are swapped because of the 90° rotation
            - After rotation: 100vh width becomes screen height, 100vw height becomes screen width
            - Flexbox parent centers this automatically
          */}
          <div
            style={{
              width: "100vh", // After -90° rotation, this becomes the visual height
              height: "100vw", // After -90° rotation, this becomes the visual width
              transform: "rotate(-90deg)",
              transformOrigin: "center center",
            }}
          >
            {/* 
              PDF Iframe:
              - Fills the rotated container completely
              - Toolbar and navigation disabled for clean full-screen display
            */}
            <iframe
              src="/assets/documents/Certificate Woord en Daad.pdf#toolbar=0&navpanes=0&scrollbar=0"
              className="w-full h-full border-0"
              title="EU Certificate"
            />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 z-[200] bg-white flex flex-col">
      {/* Close Button - Floating at top right */}
      <div className="absolute top-6 right-6 z-50">
        <Button
          onClick={onClose}
          size="lg"
          className="gap-2 bg-slate-900 hover:bg-slate-800 text-white shadow-2xl px-6 py-3"
        >
          <X className="w-5 h-5" />
          <span className="font-semibold">
            {viewerContent.closeButton[language]}
          </span>
        </Button>
      </div>

      {/* Certificate Display Area - Full Screen */}
      <div className="w-full h-full">{getCertificateContent()}</div>
    </div>
  );
}

export default function CertificatesModal({
  language,
  onClose,
}: CertificatesModalProps) {
  // State to track which certificate is being viewed
  const [viewingCertificate, setViewingCertificate] = useState<{
    name: string;
    id: string;
  } | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !viewingCertificate) onClose();
    };

    window.addEventListener("keydown", handleEsc);

    // Prevent background scrolling
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [onClose, viewingCertificate]);

  const content = {
    backButton: {
      en: "Back to Portfolio",
      de: "Zurück zum Portfolio",
    },
    headerTitle: {
      en: "Certifications & Achievements",
      de: "Zertifizierungen & Erfolge",
    },
    title: {
      en: "Certifications & Achievements",
      de: "Zertifizierungen & Erfolge",
    },
    subtitle: {
      en: "Industry-recognized credentials, awards, and professional achievements",
      de: "Branchenweit anerkannte Qualifikationen, Auszeichnungen und professionelle Erfolge",
    },
    featuredLabel: {
      en: "Featured Achievement",
      de: "Hervorragende Leistung",
    },
    viewCertificate: {
      en: "View Certificate",
      de: "Zertifikat anzeigen",
    },
    categoryLabel: {
      competition: {
        en: "Competition",
        de: "Wettbewerb",
      },
      certificate: {
        en: "Certificate",
        de: "Zertifikat",
      },
    },
    achievements: [
      {
        id: "hackathon-winner",
        name: {
          en: "1st Place Winner - Multi-University Hackathon for Entrepreneurship Solutions",
          de: "1. Platz - Multi-University Hackathon für Entrepreneurship-Lösungen",
        },
        issuer: "Woord en Daad / EU Funded Project",
        date: "September 2025",
        category: "competition",
        description: {
          en: "Won first place for designing the Entrepreneurship Booster Platform, leading to the implementation of the system.",
          de: "Gewann den ersten Platz für das Design der Entrepreneurship Booster Platform, was zu einer Vollzeitstelle als Entwickler führte.",
        },
        featured: true,
        hasCertificate: false,
        certificateId: "",
      },
      {
        id: "nasa-certificate",
        name: {
          en: "Galactic Problem Solver - NASA International Space Apps Challenge",
          de: "Galaktischer Problemlöser - NASA International Space Apps Challenge",
        },
        issuer: "NASA",
        date: "October 2024",
        category: "certificate",
        description: {
          en: "Participated in NASA's global hackathon solving space-related challenges using technology and innovation.",
          de: "Teilnahme am globalen NASA-Hackathon zur Lösung weltraumbezogener Herausforderungen mit Technologie und Innovation.",
        },
        featured: true,
        hasCertificate: true,
        certificateId: "nasa-certificate",
      },
      {
        id: "eu-certificate",
        name: {
          en: "Certificate of Participation - EU-Funded Hackathon, Entrepreneurship Booster Platform",
          de: "Teilnahmebescheinigung - EU-finanzierter Hackathon, Entrepreneurship Booster Platform",
        },
        issuer: "Woord en Daad / EU Funded Project",
        date: "September 2025",
        category: "certificate",
        description: {
          en: "Official recognition for participation in EU-funded entrepreneurship technology hackathon.",
          de: "Offizielle Anerkennung für Teilnahme am EU-finanzierten Entrepreneurship-Technologie-Hackathon.",
        },
        featured: false,
        hasCertificate: true,
        certificateId: "eu-certificate",
      },
    ],
  };

  return (
    <>
      <div className="fixed inset-0 z-[100] bg-white dark:bg-slate-950 overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* ====================================================================== */}
        {/* WHITE STICKY HEADER WITH SHADOW */}
        {/* ====================================================================== */}
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

              {/* Centered Title with Yellow-Orange-Red Gradient */}
              <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent absolute left-1/2 transform -translate-x-1/2">
                {content.headerTitle[language]}
              </h1>

              {/* Spacer for layout balance */}
              <div className="w-[140px]"></div>
            </div>
          </div>
        </header>

        {/* ====================================================================== */}
        {/* MAIN CONTENT AREA */}
        {/* ====================================================================== */}
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Title Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 dark:from-yellow-900/30 dark:via-orange-900/30 dark:to-red-900/30 rounded-full mb-4">
              <Award className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
              {content.title[language]}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              {content.subtitle[language]}
            </p>
          </div>

          {/* Achievements List */}
          <div className="space-y-4">
            {content.achievements.map((achievement, idx) => (
              <Card
                key={idx}
                className={`p-6 hover:shadow-lg transition-shadow ${
                  achievement.featured
                    ? "border-2 border-orange-400 dark:border-orange-600 bg-gradient-to-br from-orange-50/50 via-yellow-50/50 to-red-50/50 dark:from-orange-950/10 dark:via-yellow-950/10 dark:to-red-950/10"
                    : "border-l-4 border-l-yellow-500"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {achievement.featured && (
                      <div className="flex items-center gap-2 mb-3">
                        <Trophy className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        <span className="text-sm font-semibold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                          {content.featuredLabel[language]}
                        </span>
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      {achievement.name[language]}
                    </h3>
                    <p className="text-orange-600 dark:text-orange-400 font-semibold mb-2">
                      {achievement.issuer}
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
                      {achievement.description[language]}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 flex-wrap">
                      <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 px-3 py-1 rounded-lg border border-orange-200 dark:border-orange-800">
                        <Calendar className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        <span className="font-medium">{achievement.date}</span>
                      </div>
                      <span className="px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 text-orange-700 dark:text-orange-300 rounded-lg font-medium border border-orange-200 dark:border-orange-800">
                        {
                          content.categoryLabel[
                            achievement.category as keyof typeof content.categoryLabel
                          ][language]
                        }
                      </span>

                      {/* View Certificate Button */}
                      {achievement.hasCertificate && (
                        <Button
                          onClick={() =>
                            setViewingCertificate({
                              name: achievement.name[language],
                              id: achievement.certificateId,
                            })
                          }
                          size="sm"
                          className="gap-2 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 hover:from-yellow-700 hover:via-orange-700 hover:to-red-700 text-white border-0"
                        >
                          <Eye className="w-4 h-4" />
                          {content.viewCertificate[language]}
                        </Button>
                      )}
                    </div>
                  </div>
                  <Award
                    className={`w-8 h-8 flex-shrink-0 ${
                      achievement.featured
                        ? "text-orange-500"
                        : "text-yellow-500"
                    }`}
                  />
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>

      {/* Certificate Viewer Modal - Full Screen */}
      {viewingCertificate && (
        <CertificateViewerModal
          certificateName={viewingCertificate.name}
          certificateId={viewingCertificate.id}
          language={language}
          onClose={() => setViewingCertificate(null)}
        />
      )}
    </>
  );
}
