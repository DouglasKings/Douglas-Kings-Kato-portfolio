/**
 * Videos Modal Component - With Sticky Header & Natural German
 *
 * Full-page modal displaying video tutorials and content.
 * Features:
 * - Sticky header with back navigation and title
 * - Programming and design tutorial videos with thumbnail images
 * - YouTube and local video support
 * - Responsive grid layout
 * - Natural German translations
 *
 * CORRECTED TRANSLATIONS:
 * - "views" → "Aufrufe" (more natural than just "views")
 * - "likes" → "Likes" (commonly used in German)
 * - "Introduction to Java Arrays" → "Einführung in Java-Arrays"
 * - "Web Development" → "Webentwicklung"
 * - Full bilingual support for video titles, descriptions, and categories
 *
 * @component
 */

"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Video, Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface VideosModalProps {
  language: "en" | "de";
  onClose: () => void;
}

// ============================================================================
// VIDEO DATA WITH BILINGUAL CONTENT
// ============================================================================

const videos = [
  {
    id: 1,
    title: {
      en: "Introduction to Java Programming",
      de: "Einführung in die Java-Programmierung",
    },
    description: {
      en: "Complete beginner's guide to Java programming covering variables, data types, control structures, and functions with practical examples.",
      de: "Vollständiger Anfängerleitfaden zur Java-Programmierung mit Variablen, Datentypen, Kontrollstrukturen und Funktionen mit praktischen Beispielen.",
    },
    category: {
      en: "Programming",
      de: "Programmierung",
    },
    duration: "01:58:21",
    views: "12.5K",
    likes: "890",
    date: "14/05/2025",
    thumbnail: "/assets/images/18.jpg",
    src: "https://www.youtube.com/watch?v=2_zdcnN_9KQ",
    categoryColor:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  },
  {
    id: 2,
    title: {
      en: "Introduction to Java Arrays",
      de: "Einführung in Java-Arrays",
    },
    description: {
      en: "Build modern web applications using React and Next.js with practical examples and best practices for scalable development.",
      de: "Erstellen Sie moderne Webanwendungen mit React und Next.js mit praktischen Beispielen und Best Practices für skalierbare Entwicklung.",
    },
    category: {
      en: "Web Development",
      de: "Webentwicklung",
    },
    duration: "1:20:45",
    views: "8.3K",
    likes: "654",
    date: "28/10/2023",
    thumbnail: "/assets/images/18.jpg",
    src: "/assets/videos/10.mp4",
    categoryColor:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function VideosModal({ language, onClose }: VideosModalProps) {
  // ============================================================================
  // COMPONENT STATE
  // ============================================================================

  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>(
    {}
  );

  // ============================================================================
  // ESC KEY HANDLER
  // ============================================================================

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (playingVideo) {
          setPlayingVideo(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose, playingVideo]);

  // ============================================================================
  // CONTENT DATA - NATURAL GERMAN TRANSLATIONS
  // ============================================================================

  const content = {
    backButton: {
      en: "Back to Portfolio",
      de: "Zurück zum Portfolio",
    },
    headerTitle: {
      en: "Video Tutorials",
      de: "Video-Tutorials",
    },
    title: {
      en: "Video Tutorials",
      de: "Video-Tutorials",
    },
    subtitle: {
      en: "Programming and web development tutorial videos",
      de: "Programmier- und Webentwicklungs-Tutorial-Videos",
    },
    watchVideo: {
      en: "Watch Video",
      de: "Video ansehen",
    },
    closeVideo: {
      en: "Close",
      de: "Schließen",
    },
    views: {
      en: "views",
      de: "Aufrufe",
    },
    likes: {
      en: "likes",
      de: "Likes",
    },
  };

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  const handleVideoClick = (video: (typeof videos)[0]) => {
    // If it's a YouTube video, open in new tab
    if (video.src.includes("youtube.com") || video.src.includes("youtu.be")) {
      window.open(video.src, "_blank");
    } else {
      // If it's a local video, play in modal
      setPlayingVideo(video.id);
    }
  };

  const handleImageError = (videoId: number) => {
    setImageErrors((prev) => ({ ...prev, [videoId]: true }));
  };

  // ============================================================================
  // RENDER: VIDEOS MODAL
  // ============================================================================

  return (
    <div className="fixed inset-0 z-[100] bg-white dark:bg-slate-950 overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* ====================================================================== */}
      {/* STICKY HEADER WITH BACK NAVIGATION AND TITLE */}
      {/* ====================================================================== */}
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="gap-2 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="w-4 h-4" />
              {content.backButton[language]}
            </Button>

            {/* Header Title */}
            <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              {content.headerTitle[language]}
            </h1>

            {/* Spacer for balance */}
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* ====================================================================== */}
      {/* MAIN CONTENT */}
      {/* ====================================================================== */}
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* ==================================================================== */}
        {/* TITLE SECTION */}
        {/* ==================================================================== */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
            <Video className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
            {content.title[language]}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {content.subtitle[language]}
          </p>
        </div>

        {/* ==================================================================== */}
        {/* VIDEO PLAYER MODAL */}
        {/* ==================================================================== */}
        {playingVideo && (
          <div className="fixed inset-0 z-[110] bg-black flex items-center justify-center">
            <Button
              onClick={() => setPlayingVideo(null)}
              variant="ghost"
              size="lg"
              className="absolute top-4 right-4 text-white hover:bg-white/20 z-[120]"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {content.closeVideo[language]}
            </Button>
            <div className="w-full h-full flex items-center justify-center">
              <video
                src={videos.find((v) => v.id === playingVideo)?.src}
                controls
                autoPlay
                className="w-full h-full object-contain"
                controlsList="nodownload"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* VIDEO GRID */}
        {/* ==================================================================== */}
        <div className="grid md:grid-cols-2 gap-6">
          {videos.map((video) => (
            <Card
              key={video.id}
              className="overflow-hidden hover:shadow-lg transition-shadow group"
            >
              {/* ============================================================== */}
              {/* VIDEO THUMBNAIL WITH PLAY BUTTON */}
              {/* ============================================================== */}
              <div
                className="relative aspect-video bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center cursor-pointer overflow-hidden"
                onClick={() => handleVideoClick(video)}
              >
                {/* Thumbnail Image - only show if image loads successfully */}
                {!imageErrors[video.id] && (
                  <img
                    src={video.thumbnail}
                    alt={video.title[language]}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={() => handleImageError(video.id)}
                  />
                )}

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors z-10" />

                {/* Play button */}
                <Play className="relative z-20 w-16 h-16 text-white drop-shadow-lg group-hover:scale-110 transition-transform" />
              </div>

              {/* ============================================================== */}
              {/* VIDEO DETAILS */}
              {/* ============================================================== */}
              <div className="p-4">
                {/* Category badge and duration */}
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-xs px-2 py-1 rounded ${video.categoryColor}`}
                  >
                    {video.category[language]}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-500">
                    {video.duration}
                  </span>
                </div>

                {/* Video title */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {video.title[language]}
                </h3>

                {/* Video description */}
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  {video.description[language]}
                </p>

                {/* Video metadata and action button */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-500">
                    <span>
                      {video.views} {content.views[language]}
                    </span>
                    <span>
                      {video.likes} {content.likes[language]}
                    </span>
                    <span>{video.date}</span>
                  </div>
                  <Button
                    onClick={() => handleVideoClick(video)}
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-xs"
                  >
                    {content.watchVideo[language]}
                    {video.src.includes("youtube.com") && (
                      <ExternalLink className="w-3 h-3" />
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
