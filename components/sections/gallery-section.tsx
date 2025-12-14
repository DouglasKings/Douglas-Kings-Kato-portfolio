/**
 * Gallery Section Component - With Category Filtering & Modal Integration
 *
 * Main gallery section displayed on the portfolio page.
 * Features:
 * - Category filtering (All, Web Development, Design, 3D Animation)
 * - Project cards with live/completed badges
 * - Video autoplay on hover
 * - Button to open full GalleryModal
 * - Bilingual support with natural German
 * - Responsive grid layout
 *
 * @component
 */

"use client";

import { useState } from "react";
import {
  ImageIcon,
  ExternalLink,
  Layers,
  Play,
  Code2,
  Paintbrush,
  Box,
  Trophy,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Language } from "@/lib/data";

// Import the Gallery Modal Component
import GalleryModal from "../modals/gallery-modal";

interface GallerySectionProps {
  language: Language;
}

export default function GallerySection({ language }: GallerySectionProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ============================================================================
  // UI TEXT TRANSLATIONS
  // ============================================================================

  const uiText = {
    en: {
      title: "Project Gallery",
      description:
        "A visual showcase of my projects, creative work, and technical experiments.",
      viewProject: "View Live",
      all: "All",
      openFullGallery: "View Awards & Events Gallery",
    },
    de: {
      title: "Projektgalerie",
      description:
        "Eine visuelle Präsentation meiner Projekte, kreativen Arbeiten und technischen Experimente.",
      viewProject: "Projekt ansehen",
      all: "Alle",
      openFullGallery: "Galerie für Auszeichnungen & Events ansehen",
    },
  };

  const text = uiText[language];

  // ============================================================================
  // PROJECTS DATA (Main Page Preview)
  // ============================================================================

  const projects = [
    {
      id: 1,
      title: "Damien Dennis Birthday Web App",
      category: "Web Development",
      description: {
        en: "A vibrant web application to celebrate birthdays with interactive features and animations.",
        de: "Eine lebendige Webanwendung für Geburtstage mit interaktiven Funktionen und Animationen.",
      },
      media: "/assets/images/1.png",
      mediaType: "image",
      technologies: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
      liveUrl: "https://damien-dennis-birthday-app.vercel.app/",
      status: "Live",
      statusColor:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    },
    {
      id: 2,
      title: "Kings Technologies Website",
      category: "Web Development",
      description: {
        en: "Douglas Kings Kato website showcasing technology services and expertise.",
        de: "Douglas Kings Kato Website, die Technologiedienstleistungen und Fachwissen präsentiert.",
      },
      media: "/assets/images/2.png",
      mediaType: "image",
      technologies: ["HTML", "CSS", "Javascript", "Netlify"],
      liveUrl: "https://kingstechnologies.netlify.app/",
      status: "Live",
      statusColor:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    },
    {
      id: 3,
      title: "MBS Advocates",
      category: "Web Development",
      description: {
        en: "Legal services web application with client management features.",
        de: "Webanwendung für Rechtsdienstleistungen mit Mandantenverwaltungsfunktionen.",
      },
      media: "/assets/images/3.png",
      mediaType: "image",
      technologies: ["React", "Next.js", "Vercel"],
      liveUrl: "https://mbs-advocates-app.vercel.app/",
      status: "Live",
      statusColor:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    },
    {
      id: 4,
      title: "Abstract Heart Design",
      category: "Design",
      description: {
        en: "Symbolic heart design created for branding projects with modern aesthetic.",
        de: "Symbolisches Herz-Design für Branding-Projekte mit moderner Ästhetik.",
      },
      media: "/assets/images/Design-Heart.jpg",
      mediaType: "image",
      technologies: ["Adobe Illustrator", "Vector Graphics"],
      liveUrl: null,
      status: "Completed",
      statusColor:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    },
    {
      id: 5,
      title: "3D Logo Animation",
      category: "3D Animation",
      description: {
        en: "Professional 3D logo modeling and animation for educational content.",
        de: "Professionelle 3D-Logomodellierung und Animation für Bildungsinhalte.",
      },
      media: "/assets/videos/Chocolate.mp4",
      mediaType: "video",
      technologies: ["Blender", "3D Modeling", "Animation"],
      liveUrl: null,
      status: "Completed",
      statusColor:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    },
    {
      id: 6,
      title: "Damien Papers Portfolio",
      category: "Web Development",
      description: {
        en: "A professional portfolio showcasing legal expertise, academic achievements, and personal interests.",
        de: "Ein professionelles Portfolio, das juristisches Fachwissen und akademische Leistungen präsentiert.",
      },
      media: "/assets/images/4.png",
      mediaType: "image",
      technologies: ["React", "Next.js", "Vercel"],
      liveUrl: "https://damien-portfolio-chi.vercel.app/",
      status: "Live",
      statusColor:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    },
  ];

  // ============================================================================
  // CATEGORY FILTERING
  // ============================================================================

  const categories = [text.all, "Web Development", "Design", "3D Animation"];

  const filteredProjects =
    activeCategory === text.all || activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  // ============================================================================
  // HELPER FUNCTION: Get Category Icon
  // ============================================================================

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "Web Development":
        return <Code2 className="w-4 h-4" />;
      case "Design":
        return <Paintbrush className="w-4 h-4" />;
      case "3D Animation":
        return <Box className="w-4 h-4" />;
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  // ============================================================================
  // RENDER: GALLERY SECTION
  // ============================================================================

  return (
    <section id="gallery" className="scroll-mt-16 py-8">
      {/* ====================================================================== */}
      {/* HEADER WITH TITLE & FULL GALLERY BUTTON */}
      {/* ====================================================================== */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
            <ImageIcon className="w-8 h-8 text-pink-600" />
            {text.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            {text.description}
          </p>
        </div>

        {/* Button to Open Full Gallery Modal */}
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white gap-2 shadow-md"
        >
          <Trophy className="w-4 h-4" />
          {text.openFullGallery}
        </Button>
      </div>

      {/* ====================================================================== */}
      {/* CATEGORY FILTER BUTTONS */}
      {/* ====================================================================== */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={activeCategory === cat ? "default" : "outline"}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full transition-all ${
              activeCategory === cat
                ? "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white"
                : "hover:border-pink-300 dark:hover:border-pink-700"
            }`}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* ====================================================================== */}
      {/* PROJECTS GRID */}
      {/* ====================================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card
            key={project.id}
            className="group flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
          >
            {/* ================================================================ */}
            {/* MEDIA AREA */}
            {/* ================================================================ */}
            <div className="relative aspect-video bg-slate-100 dark:bg-slate-900 overflow-hidden">
              {/* Status Badge */}
              <div className="absolute top-3 right-3 z-10">
                <Badge
                  className={`${project.statusColor} font-medium border-0 px-2 py-1`}
                >
                  {project.status}
                </Badge>
              </div>

              {/* Video or Image */}
              {project.mediaType === "video" ? (
                <div className="relative w-full h-full flex items-center justify-center bg-black">
                  <video
                    src={project.media}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    muted
                    loop
                    playsInline
                    autoPlay
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Play className="w-12 h-12 text-white/50 group-hover:text-white/80 transition-colors" />
                  </div>
                </div>
              ) : (
                <div className="w-full h-full relative">
                  <img
                    src={project.media || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
              )}
            </div>

            {/* ================================================================ */}
            {/* CARD CONTENT */}
            {/* ================================================================ */}
            <div className="flex flex-col flex-grow p-5">
              {/* Category Badge */}
              <div className="flex items-center gap-2 mb-2 text-xs font-medium text-pink-600 dark:text-pink-400 uppercase tracking-wider">
                {getCategoryIcon(project.category)}
                {project.category}
              </div>

              {/* Project Title */}
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                {project.title}
              </h3>

              {/* Project Description */}
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3 flex-grow">
                {project.description[language]}
              </p>

              {/* Technologies Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              {project.liveUrl && (
                <Button
                  asChild
                  variant="outline"
                  className="w-full gap-2 group/btn hover:border-pink-200 dark:hover:border-pink-800 hover:bg-pink-50 dark:hover:bg-pink-950/20"
                >
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {text.viewProject}
                    <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* ====================================================================== */}
      {/* RENDER GALLERY MODAL (If Open) */}
      {/* ====================================================================== */}
      {isModalOpen && (
        <GalleryModal
          language={language}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
}
