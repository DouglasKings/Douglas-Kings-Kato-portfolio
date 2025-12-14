/**
 * Data Types and Interfaces
 *
 * This file contains TypeScript interfaces and type definitions used throughout
 * the portfolio application. It ensures type safety and better IDE support.
 *
 * @module lib/data
 */

/**
 * Language type
 * Represents the supported languages in the portfolio
 * - "en": English
 * - "de": German (Deutsch)
 */
export type Language = "en" | "de"

/**
 * Experience Interface
 * Represents a work experience entry in the portfolio
 */
export interface Experience {
  id: string
  company: string
  position: {
    en: string
    de: string
  }
  period: string
  location: string
  description: {
    en: string[]
    de: string[]
  }
  technologies?: string[]
}

/**
 * Education Interface
 * Represents an education entry
 */
export interface Education {
  id: string
  institution: string
  degree: {
    en: string
    de: string
  }
  period: string
  location: string
  description?: {
    en: string
    de: string
  }
}

/**
 * Skill Interface
 * Represents a technical skill with proficiency level
 */
export interface Skill {
  name: string
  category: "frontend" | "backend" | "database" | "tools" | "design"
  proficiency: number // 0-100
  icon?: string
}

/**
 * Certificate Interface
 * Represents a professional certificate or achievement
 */
export interface Certificate {
  id: string
  title: {
    en: string
    de: string
  }
  issuer: string
  date: string
  description?: {
    en: string
    de: string
  }
  imageUrl?: string
  credentialUrl?: string
}

/**
 * Project Interface
 * Represents a portfolio project
 */
export interface Project {
  id: string
  title: string
  description: {
    en: string
    de: string
  }
  technologies: string[]
  imageUrl?: string
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
}
