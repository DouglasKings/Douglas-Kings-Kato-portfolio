/**
 * app/projects/[id]/page.tsx
 *
 * ── WHAT CHANGED & WHY ───────────────────────────────────────────────────────
 *
 * PROBLEM:
 *   <BackButton label="Back to Gallery" /> used router.back() internally.
 *   The Gallery is a modal (no real URL), so the browser history has no gallery
 *   entry to go back to. router.back() jumped all the way to "/" (home page),
 *   bypassing the gallery modal entirely.
 *
 * FIX (only 2 lines changed in this file):
 *   Added href="/?modal=gallery" to BOTH BackButton instances.
 *
 *   BackButton now calls router.push("/?modal=gallery") instead of router.back().
 *   app/page.tsx reads the ?modal=gallery search param on mount and calls
 *   setActiveModal("gallery"), which reopens the Gallery Modal automatically.
 *
 *   User experience: clicking "Back to Gallery" feels like going back —
 *   they land directly in the gallery, not on the plain home page.
 */

import {
  CheckCircle2,
  ShieldCheck,
  Globe2,
  Cpu,
  Code2,
  ExternalLink,
  FileCode2,
  GitBranch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/data";
import type { Language } from "@/lib/data";
import BackButton from "@/components/ui/back-button";

interface PageProps {
  params: Promise<{ id: string }>;
}

// ── Gist metadata ─────────────────────────────────────────────────────────
const gistMeta: Record<
  string,
  {
    highlight: { en: string; de: string };
    files: { name: string; description: { en: string; de: string } }[];
  }
> = {
  "agri-trace": {
    highlight: {
      en: "Demonstrates production-grade JPA entity design with immutable audit trails and a composite index strategy purpose-built for supply chain traceability at scale.",
      de: "Zeigt produktionsreifes JPA-Entity-Design mit unveränderlichen Prüfpfaden und einer Indexstrategie für skalierbare Lieferkettenverfolgung.",
    },
    files: [
      {
        name: "Farmer.java",
        description: {
          en: "Core identity entity — @Entity, UUID primary key, @CreationTimestamp, national ID validation lifecycle hook",
          de: "Kernidentitätsentität — @Entity, UUID-Primärschlüssel, @CreationTimestamp, Lifecycle-Hook zur ID-Validierung",
        },
      },
      {
        name: "HarvestBatch.java",
        description: {
          en: "Traceability record — @Index for fast QR code lookup, lifecycle status enum, @ManyToOne Farmer relationship",
          de: "Rückverfolgbarkeitsprotokoll — @Index für QR-Lookup, Lifecycle-Status-Enum, @ManyToOne-Farmer-Beziehung",
        },
      },
    ],
  },
  "unified-youth-platform": {
    highlight: {
      en: "Shows reactive Spring Security configuration with CORS policy, JWT role-based access control, and @Value-injected secrets — zero hardcoded credentials anywhere in the codebase.",
      de: "Zeigt reaktive Spring Security-Konfiguration mit CORS-Richtlinie, JWT-Zugriffskontrolle und @Value-injizierten Geheimnissen — keine hartcodierten Zugangsdaten.",
    },
    files: [
      {
        name: "GatewaySecurityConfig.java",
        description: {
          en: "Reactive API Gateway security — @Bean filter chain, CORS config, JWT authentication rules, environment-injected allowed origins",
          de: "Reaktive API-Gateway-Sicherheit — @Bean-Filterkette, CORS-Konfiguration, JWT-Regeln, umgebungsinjizierte Ursprünge",
        },
      },
    ],
  },
};

export default async function ProjectPage({ params }: PageProps) {
  // ✅ Next.js 15: await params before accessing id
  const { id: projectId } = await params;

  const language: Language = "en";
  const project = projects.find((p) => p.id === projectId);
  const meta = gistMeta[projectId];

  // ── 404 Fallback ──────────────────────────────────────────────────────
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center space-y-4 p-8">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white">
            Project not found
          </h1>
          <p className="text-slate-500">
            No project with ID &quot;{projectId}&quot; exists in{" "}
            <code className="text-pink-600">lib/data.ts</code>
          </p>
          <p className="text-slate-400 text-sm">
            Available IDs:{" "}
            {projects.map((p) => (
              <code key={p.id} className="mx-1 text-indigo-500">
                {p.id}
              </code>
            ))}
          </p>
          {/* 404: no href — just go back wherever we came from */}
          <BackButton label="Go back" />
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* ══════════════════════════════════════════════════════════════════
          STICKY NAV BAR
          ── CHANGED: href="/?modal=gallery" added ────────────────────────
          This tells BackButton to push "/?modal=gallery" instead of going back.
          app/page.tsx reads ?modal=gallery and reopens the gallery modal.
          ══════════════════════════════════════════════════════════════════ */}
      <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center gap-4">
          <BackButton label="Back to Gallery" href="/?modal=gallery" />
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center flex-1">
            Technical Architecture Report
          </p>
          <div className="w-[120px] flex-shrink-0" />
        </div>
      </nav>

      {/* ── Hero Header ───────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-slate-900 py-16 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-5">
          <div className="flex flex-wrap justify-center gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 rounded-full text-xs font-bold text-indigo-700 dark:text-indigo-300"
              >
                {tech}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
            {project.title}
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-medium italic">
            {project.tagline[language]}
          </p>
        </div>
      </div>

      {/* ── Main Content ──────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 space-y-16">
        {/* Challenge vs Engineering Solution */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-8 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-3xl space-y-4">
            <div className="flex items-center gap-3 text-red-600 dark:text-red-400 font-bold uppercase tracking-wider text-sm">
              <ShieldCheck className="w-5 h-5 flex-shrink-0" />
              The Challenge
            </div>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              {project.problem[language]}
            </p>
          </div>
          <div className="p-8 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-3xl space-y-4">
            <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider text-sm">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              The Engineering Solution
            </div>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              {project.solution[language]}
            </p>
          </div>
        </div>

        {/* System Design & Architecture */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-900 dark:text-white">
            <Cpu className="w-7 h-7 text-indigo-500 flex-shrink-0" />
            System Design & Architecture
          </h2>
          <div className="bg-white dark:bg-slate-900 p-3 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
            {project.architectureImage ? (
              <img
                src={project.architectureImage}
                alt={`${project.title} — System Architecture Diagram`}
                className="w-full h-auto object-contain rounded-2xl"
              />
            ) : (
              <div className="aspect-video flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-2xl">
                <p className="text-slate-400 italic text-sm">
                  Architecture diagram coming soon
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Key Implementations */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Key Implementations
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {project.keyFeatures[language].map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 flex items-center justify-center rounded-xl font-black text-lg flex-shrink-0">
                  {idx + 1}
                </div>
                <span className="text-slate-700 dark:text-slate-300 font-medium leading-snug">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Code Architecture */}
        {project.gistUrl && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-900 dark:text-white">
              <Code2 className="w-7 h-7 text-indigo-500 flex-shrink-0" />
              Code Architecture
            </h2>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-lg">
              <div className="bg-slate-900 dark:bg-slate-950 px-6 py-4 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-slate-400 text-sm font-mono ml-2">
                  github.com / DouglasKings / {projectId}
                </span>
              </div>
              <div className="p-6 md:p-8 space-y-6">
                {meta?.highlight && (
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 rounded-2xl">
                    <p className="text-indigo-800 dark:text-indigo-300 font-medium leading-relaxed text-sm">
                      <span className="font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-400 text-xs block mb-1">
                        Why this matters
                      </span>
                      {meta.highlight[language]}
                    </p>
                  </div>
                )}
                {meta?.files && meta.files.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Files in this Gist
                    </p>
                    {meta.files.map((file) => (
                      <div
                        key={file.name}
                        className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl"
                      >
                        <div className="w-9 h-9 bg-slate-900 dark:bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileCode2 className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-mono font-bold text-slate-900 dark:text-white text-sm mb-1">
                            {file.name}
                          </p>
                          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            {file.description[language]}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="pt-2 space-y-3">
                  <a
                    href={project.gistUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <button className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-base rounded-2xl hover:bg-slate-700 dark:hover:bg-slate-100 transition-colors shadow-lg">
                      <svg
                        viewBox="0 0 24 24"
                        width="22"
                        height="22"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                      View Sanitized Code on GitHub Gist
                      <ExternalLink className="w-4 h-4 opacity-70" />
                    </button>
                  </a>
                  <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                    <GitBranch className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <p className="font-mono text-xs text-slate-500 dark:text-slate-400 truncate select-all">
                      {project.gistUrl}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Sustainable Development Impact */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-800 p-10 rounded-3xl text-white shadow-2xl space-y-6">
          <div className="flex items-center gap-4">
            <Globe2 className="w-10 h-10 flex-shrink-0 opacity-90" />
            <h2 className="text-2xl font-bold uppercase tracking-widest">
              Sustainable Development Impact
            </h2>
          </div>
          <p className="text-xl font-light opacity-90 leading-relaxed">
            {project.impact[language]}
          </p>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 rounded-full font-bold px-8 gap-2 mt-2"
              >
                <ExternalLink className="w-5 h-5" />
                View Live Project
              </Button>
            </a>
          )}
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            FOOTER BACK BUTTON
            ── CHANGED: href="/?modal=gallery" added ────────────────────────
            Same fix as the nav bar button.
            ══════════════════════════════════════════════════════════════════ */}
        <div className="flex justify-center pb-8">
          <BackButton
            label="Back to Gallery"
            variant="footer"
            href="/?modal=gallery"
          />
        </div>
      </div>
    </main>
  );
}
