// ════════════════════════════════════════════════════════════════
// REFERENCES MODAL
// components/modals/references-modal.tsx
// MOBILE FIX: Uses <ModalHeader>. All content unchanged.
// ════════════════════════════════════════════════════════════════

"use client";

import { useEffect } from "react";
import { FileText, Mail, Phone, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Language } from "@/lib/data";
import ModalHeader from "@/components/ui/modal-header";

interface ReferencesModalProps {
  language: Language;
  onClose: () => void;
}

export default function ReferencesModal({
  language,
  onClose,
}: ReferencesModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const content = {
    backButton: { en: "Back to Portfolio", de: "Zurück zum Portfolio" },
    headerTitle: {
      en: "Professional References",
      de: "Professionelle Referenzen",
    },
    title: { en: "Professional References", de: "Professionelle Referenzen" },
    subtitle: {
      en: "Recommendations from academic supervisors at ISBAT University",
      de: "Empfehlungen von akademischen Betreuern an der ISBAT Universität",
    },
    references: [
      {
        name: "Mr. Kibwika Nasurudin Bashir",
        title: {
          en: "Assistant Lecturer, ISBAT University",
          de: "Assistenzprofessor, ISBAT Universität",
        },
        phone: "+256 701 603 731",
        email: "nass.aklieve@gmail.com",
      },
      {
        name: "Mr. Male Kenneth",
        title: {
          en: "Assistant Lecturer, ISBAT University",
          de: "Assistenzprofessor, ISBAT Universität",
        },
        phone: "+256 779 413 882",
        email: "Kenneth.fict@isbatuniversity.com",
      },
      {
        name: "Mr. Kato Kenneth",
        title: {
          en: "Assistant Lecturer, ISBAT University",
          de: "Assistenzprofessor, ISBAT Universität",
        },
        phone: "+256 779 190 915 / +256 760 220 536",
        email: "katokeneth@outlook.com",
      },
    ],
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white dark:bg-slate-950 overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
      <ModalHeader
        title={content.headerTitle[language]}
        gradientClass="from-green-600 via-emerald-600 to-teal-600"
        backLabel={content.backButton[language]}
        onBack={onClose}
      />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
            <FileText className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            {content.title[language]}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            {content.subtitle[language]}
          </p>
        </div>

        <div className="space-y-6">
          {content.references.map((ref, idx) => (
            <Card
              key={idx}
              className="p-5 sm:p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full flex-shrink-0">
                  <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1">
                    {ref.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-4 text-sm sm:text-base">
                    {ref.title[language]}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                      <Phone className="w-4 h-4 text-slate-500 flex-shrink-0" />
                      <a
                        href={`tel:${ref.phone.split("/")[0].trim()}`}
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm sm:text-base"
                      >
                        {ref.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                      <Mail className="w-4 h-4 text-slate-500 flex-shrink-0" />
                      <a
                        href={`mailto:${ref.email}`}
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors break-all text-sm sm:text-base"
                      >
                        {ref.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
