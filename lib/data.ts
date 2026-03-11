/**
 * lib/data.ts — Portfolio Data Layer
 *
 * Central source of truth for all portfolio content.
 * All bilingual strings, project data, and type definitions live here.
 *
 * ✅ PHASE 3 UPDATE — Gist IDs finalised:
 *    - agri-trace       → gist.github.com/DouglasKings/442c26656543e28fe4b3b7dd8fe4ecbe
 *                         (Farmer.java — JPA models, HarvestBatch + Farmer entities)
 *    - unified-youth-platform → gist.github.com/DouglasKings/0bc3b849f84a99ec8de2fa20e919072f
 *                         (GatewaySecurityConfig.java — USSD Menu Logic & API Gateway Security)
 *
 * STRUCTURE:
 *   Language        → type alias for "en" | "de"
 *   Project         → full interface with all project fields
 *   projects        → the exported data array consumed by modals/sections
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Language — the two supported UI languages.
 * Used across all components as: language: Language
 */
export type Language = "en" | "de";

/**
 * Project — describes a single portfolio case study.
 *
 * Each bilingual field is an object with `en` and `de` keys so components
 * can simply render: project.fieldName[language]
 *
 * Fields:
 *   id               → URL-safe slug, used as React key and for routing
 *   title            → product name (not bilingual — consistent across markets)
 *   tagline          → one-liner shown in cards and hero areas
 *   description      → 1–2 sentence summary
 *   problem          → the "Why" — real-world gap this solves
 *   solution         → the "How" — key technical decisions made
 *   keyFeatures      → bullet-list of engineering highlights
 *   impact           → UN SDG alignment — critical for international audiences
 *   technologies     → tech stack tags shown as badges
 *   imageUrl         → optional screenshot or cover image
 *   liveUrl          → optional deployed URL
 *   githubUrl        → optional GitHub repo link
 *   architectureImage → path to system architecture diagram (displayed in modal)
 *   gistUrl          → GitHub Gist URL for embedded code samples in the modal
 *   featured         → if true, shown in the featured/highlighted section
 */
export interface Project {
  id: string;
  title: string;
  tagline: { en: string; de: string };
  description: { en: string; de: string };
  problem: { en: string; de: string };
  solution: { en: string; de: string };
  keyFeatures: { en: string[]; de: string[] };
  impact: { en: string; de: string };
  technologies: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  architectureImage?: string;
  gistUrl?: string;
  featured?: boolean;
}

// ============================================================================
// PROJECT DATA
// ============================================================================

/**
 * projects — array of all portfolio case studies.
 *
 * Consumed by:
 *   - GalleryModal    → displays project cards + detail views
 *   - ProfileContent  → "See My Work" button opens GalleryModal
 *
 * HOW TO ADD A NEW PROJECT:
 *   1. Copy an existing entry below
 *   2. Change `id` to a unique URL-safe slug
 *   3. Fill in all bilingual fields (en + de)
 *   4. Set featured: true if it should appear in the highlights section
 *   5. Upload your Gist and paste the full URL into gistUrl
 */
export const projects: Project[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // PROJECT 1 — Agri-Trace: Supply Chain Transparency Platform
  // Gist: Farmer.java + HarvestBatch.java (JPA models, @Index annotations)
  // SDG 2 (Zero Hunger) · SDG 9 (Industry & Innovation)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "agri-trace",

    // Product name is language-neutral — stays consistent across all markets
    title: "Agri-Trace: Supply Chain Transparency Platform",

    // Lead with the human impact, not the tech stack
    tagline: {
      en: "Empowering smallholder farmers via Digital Identity.",
      de: "Stärkung von Kleinbauern durch digitale Identität.",
    },

    description: {
      en: "A microservices-based traceability system that provides 'Digital Birth Certificates' for agricultural produce.",
      de: "Ein mikroservicebasiertes Rückverfolgbarkeitssystem, das 'digitale Geburtsurkunden' für landwirtschaftliche Produkte ausstellt.",
    },

    // The "Why" — framed around the people affected, not the technology
    problem: {
      en: "Smallholder farmers in the Global South lack formal identities and proof of origin for their produce, locking them out of high-value international markets.",
      de: "Kleinbauern im globalen Süden fehlen formale Identitäten und Herkunftsnachweise für ihre Produkte, was ihnen den Zugang zu internationalen Märkten verwehrt.",
    },

    // The "How" — key architectural decisions with tangible outcomes
    solution: {
      en: "Architected a Java Spring Boot system that uses USSD to collect data from farmers without internet access. The system generates tamper-proof QR codes linked to a PostgreSQL backend, ensuring full supply chain transparency.",
      de: "Entwicklung eines Java Spring Boot-Systems, das USSD zur Datenerfassung von Bauern ohne Internet nutzt. Das System generiert fälschungssichere QR-Codes, die mit einem PostgreSQL-Backend verknüpft sind.",
    },

    // Engineering highlights — shown as bullet points in the detail modal
    keyFeatures: {
      en: [
        "API Gateway & Service Discovery via Eureka",
        "Offline USSD Integration via Africa's Talking API",
        "Automated tamper-proof QR Code generation logic",
        "PostgreSQL schema designed for immutable traceability records",
        "Dockerized microservices for portable deployment",
      ],
      de: [
        "API-Gateway & Service Discovery via Eureka",
        "Offline-USSD-Integration via Africa's Talking API",
        "Automatisierte, fälschungssichere QR-Code-Generierungslogik",
        "PostgreSQL-Schema für unveränderliche Rückverfolgbarkeitsdaten",
        "Dockerisierte Microservices für portables Deployment",
      ],
    },

    // SDG Impact — SDG number AND full title for instant recognition by reviewers
    impact: {
      en: "Directly supports SDG 2 (Zero Hunger) by reducing post-harvest waste through transparency, and SDG 9 (Industry, Innovation & Infrastructure) by digitizing the agricultural supply chain for rural economies.",
      de: "Unterstützt direkt SDG 2 (Kein Hunger) durch Reduzierung von Ernteverlusten und SDG 9 (Industrie, Innovation & Infrastruktur) durch Digitalisierung landwirtschaftlicher Lieferketten.",
    },

    technologies: ["Java 21", "Spring Boot", "PostgreSQL", "Docker", "Eureka"],

    architectureImage: "/assets/images/agri-trace-diag.jpg",

    // Gist title: "Smallholder Farmer Identity & Harvest Traceability Data Models (JPA & PostgreSQL)"
    // Files: Farmer.java + HarvestBatch.java
    gistUrl:
      "https://gist.github.com/DouglasKings/442c26656543e28fe4b3b7dd8fe4ecbe",

    featured: true,
  },

  // ──────────────────────────────────────────────────────────────────────────
  // PROJECT 2 — Unified Youth Opportunity & Mentorship Hub
  // Gist: GatewaySecurityConfig.java (USSD Menu Logic + API Gateway Security)
  // SDG 8 (Decent Work) · SDG 10 (Reduced Inequalities)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "unified-youth-platform",

    title: "Unified Youth Opportunity & Mentorship Hub",

    tagline: {
      en: "Bridging the Digital Divide for youth empowerment.",
      de: "Überbrückung der digitalen Kluft für die Jugend.",
    },

    description: {
      en: "A multi-channel (USSD + Web) platform connecting underserved youth to mentors, job opportunities, and grants.",
      de: "Eine Multi-Channel-Plattform (USSD + Web), die benachteiligte Jugendliche mit Mentoren, Jobs und Fördergeldern verbindet.",
    },

    // Opens with a concrete statistic — makes the problem immediately tangible
    problem: {
      en: "60% of youth in rural areas use feature phones without internet access. They are completely excluded from modern job portals that require smartphones and mobile data.",
      de: "60 % der Jugendlichen in ländlichen Gebieten nutzen einfache Mobiltelefone ohne Internetzugang und sind damit von modernen Jobportalen ausgeschlossen.",
    },

    // Quantified outcome (50,000+ users) shows real-world scale
    solution: {
      en: "Developed a distributed USSD menu service with Redis-based session management, enabling 50,000+ concurrent users to browse jobs and book mentorship sessions in English or Luganda using only 2G technology.",
      de: "Entwicklung eines verteilten USSD-Menüdienstes mit Redis-basiertem Sitzungsmanagement für über 50.000 gleichzeitige Nutzer auf 2G-Netzwerken in Englisch oder Luganda.",
    },

    keyFeatures: {
      en: [
        "Distributed Session Management with Redis (50,000+ concurrent users)",
        "Multi-language USSD menu logic (English & Luganda)",
        "JWT Role-Based Access Control for Web portal",
        "AI-driven mentor-to-youth matching algorithm",
        "Spring Boot microservices with MySQL persistence layer",
      ],
      de: [
        "Verteiltes Sitzungsmanagement mit Redis (50.000+ gleichzeitige Nutzer)",
        "Mehrsprachige USSD-Menülogik (Englisch & Luganda)",
        "JWT-rollenbasierte Zugriffskontrolle für das Webportal",
        "KI-gesteuerter Mentor-Matching-Algorithmus",
        "Spring Boot Microservices mit MySQL-Persistenzschicht",
      ],
    },

    impact: {
      en: "Supports SDG 8 (Decent Work & Economic Growth) and SDG 10 (Reduced Inequalities) by providing equal access to economic opportunities regardless of device type or connectivity level.",
      de: "Unterstützt SDG 8 (Menschenwürdige Arbeit & Wirtschaftswachstum) und SDG 10 (Weniger Ungleichheiten) durch gleichberechtigten Zugang zu wirtschaftlichen Chancen unabhängig von Gerät und Konnektivität.",
    },

    technologies: ["Spring Boot", "Redis", "React", "MySQL", "i18n"],

    architectureImage: "/assets/images/youth-platform-diag.png",

    // Gist title: "Scalable USSD Menu Logic & Reactive API Gateway Security (Spring Boot & Redis)"
    // Files: GatewaySecurityConfig.java
    gistUrl:
      "https://gist.github.com/DouglasKings/0bc3b849f84a99ec8de2fa20e919072f",

    featured: true,
  },
];
