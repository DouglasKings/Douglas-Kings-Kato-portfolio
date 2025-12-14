/**
 * Language Switcher Component
 *
 * A toggle button that allows users to switch between English and German languages.
 * Features:
 * - Full language names displayed (English/German or Englisch/Deutsch)
 * - Visual flag icons for both languages
 * - Smooth transition animation
 * - Accessible keyboard navigation
 * - Clean design that fits in header
 *
 * @component
 */

"use client"

import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import type { Language } from "@/lib/data"

interface LanguageSwitcherProps {
  currentLang: Language
  onToggle: () => void
}

/**
 * LanguageSwitcher Component
 *
 * Renders a toggle button for switching between English and German.
 * Displays full language names with flag icons for clarity.
 *
 * @param {LanguageSwitcherProps} props - Component props
 * @param {Language} props.currentLang - Current active language
 * @param {Function} props.onToggle - Callback function when language is toggled
 * @returns {JSX.Element} The language switcher button
 */
export function LanguageSwitcher({ currentLang, onToggle }: LanguageSwitcherProps) {
  return (
    <Button
      onClick={onToggle}
      variant="outline"
      size="sm"
      className="gap-2 font-medium shadow-sm hover:shadow-md transition-all bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
      aria-label={`Switch to ${currentLang === "en" ? "German" : "English"}`}
    >
      {/* Globe icon */}
      <Globe className="w-4 h-4 text-slate-600 dark:text-slate-400" />

      <span className="font-semibold text-slate-900 dark:text-white">
        {currentLang === "en" ? "English" : "Deutsch"}
      </span>
    </Button>
  )
}
