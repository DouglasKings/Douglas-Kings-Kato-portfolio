/**
 * components/modals/certificates-modal.tsx
 *
 * MOBILE FIX: Replaced the absolute-positioned header title with
 * <ModalHeader> (components/ui/modal-header.tsx) which uses flexbox
 * centering — no overlap on small screens.
 *
 * Everything else is unchanged from the previous version.
 */

"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Award, Calendar, Trophy, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ModalHeader from "@/components/ui/modal-header";

type Language = "en" | "de";

interface CertificatesModalProps {
  language: Language;
  onClose: () => void;
}

// ── Certificate viewer (full-screen PDF overlay) ──────────────────────────

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

  const getCertificateContent = () => {
    if (certificateId === "nasa-certificate") {
      return (
        <iframe
          src="/assets/documents/NASA-Certificate.pdf#toolbar=0&navpanes=0&scrollbar=0"
          className="w-full h-full border-0"
          title="NASA Certificate"
        />
      );
    } else if (certificateId === "eu-certificate") {
      return (
        <div className="w-full h-full flex items-center justify-center overflow-hidden bg-white">
          <div
            style={{
              width: "100vh",
              height: "100vw",
              transform: "rotate(-90deg)",
              transformOrigin: "center center",
            }}
          >
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
      <div className="absolute top-4 right-4 z-50">
        <Button
          onClick={onClose}
          size="lg"
          className="gap-2 bg-slate-900 hover:bg-slate-800 text-white shadow-2xl px-4 sm:px-6 py-3"
        >
          <X className="w-5 h-5" />
          <span className="hidden sm:inline font-semibold">
            {language === "en" ? "Close" : "Schließen"}
          </span>
        </Button>
      </div>
      <div className="w-full h-full">{getCertificateContent()}</div>
    </div>
  );
}

// ── Main modal ────────────────────────────────────────────────────────────

export default function CertificatesModal({
  language,
  onClose,
}: CertificatesModalProps) {
  const [viewingCertificate, setViewingCertificate] = useState<{
    name: string;
    id: string;
  } | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !viewingCertificate) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [onClose, viewingCertificate]);

  const content = {
    backButton: { en: "Back to Portfolio", de: "Zurück zum Portfolio" },
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
    featuredLabel: { en: "Featured Achievement", de: "Hervorragende Leistung" },
    viewCertificate: { en: "View Certificate", de: "Zertifikat anzeigen" },
    categoryLabel: {
      competition: { en: "Competition", de: "Wettbewerb" },
      certificate: { en: "Certificate", de: "Zertifikat" },
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
          de: "Gewann den ersten Platz für das Design der Entrepreneurship Booster Platform.",
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
          de: "Teilnahme am globalen NASA-Hackathon zur Lösung weltraumbezogener Herausforderungen.",
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
        {/* ── MOBILE-SAFE HEADER ── */}
        <ModalHeader
          title={content.headerTitle[language]}
          gradientClass="from-yellow-600 via-orange-600 to-red-600"
          backLabel={content.backButton[language]}
          onBack={onClose}
        />

        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 dark:from-yellow-900/30 dark:via-orange-900/30 dark:to-red-900/30 rounded-full mb-4">
              <Award className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              {content.title[language]}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
              {content.subtitle[language]}
            </p>
          </div>

          <div className="space-y-4">
            {content.achievements.map((achievement, idx) => (
              <Card
                key={idx}
                className={`p-5 sm:p-6 hover:shadow-lg transition-shadow ${
                  achievement.featured
                    ? "border-2 border-orange-400 dark:border-orange-600 bg-gradient-to-br from-orange-50/50 via-yellow-50/50 to-red-50/50 dark:from-orange-950/10 dark:via-yellow-950/10 dark:to-red-950/10"
                    : "border-l-4 border-l-yellow-500"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {achievement.featured && (
                      <div className="flex items-center gap-2 mb-3">
                        <Trophy className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                        <span className="text-sm font-semibold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                          {content.featuredLabel[language]}
                        </span>
                      </div>
                    )}
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
                      {achievement.name[language]}
                    </h3>
                    <p className="text-orange-600 dark:text-orange-400 font-semibold mb-2 text-sm sm:text-base">
                      {achievement.issuer}
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 mb-3 leading-relaxed text-sm sm:text-base">
                      {achievement.description[language]}
                    </p>
                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 flex-wrap">
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
