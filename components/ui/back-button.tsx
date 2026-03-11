"use client";

/**
 * components/ui/back-button.tsx
 *
 * ── WHAT CHANGED & WHY ───────────────────────────────────────────────────────
 *
 * PROBLEM:
 *   The old version used router.back() for ALL buttons.
 *   router.back() only works when there is real browser navigation history.
 *   The Gallery is a MODAL (not a real URL), so opening it does NOT push a
 *   new entry into the browser history stack.
 *
 *   Result: clicking "Back to Gallery" from /projects/[id] called router.back()
 *   which jumped back to "/" (the home page) — not back into the gallery modal.
 *
 * SOLUTION:
 *   Add an optional `href` prop.
 *   - If `href` is provided → use router.push(href) to navigate to that URL.
 *   - If `href` is NOT provided → fall back to router.back() (original behaviour).
 *
 *   In app/projects/[id]/page.tsx we pass:
 *     href="/?modal=gallery"
 *
 *   This navigates to the home page WITH a search parameter.
 *   app/page.tsx reads that parameter on mount and calls setActiveModal("gallery")
 *   which reopens the Gallery Modal automatically — giving the user the feeling
 *   of having "gone back" to the gallery.
 *
 * ── PROPS ────────────────────────────────────────────────────────────────────
 *   label    — button text (required)
 *   variant  — "nav" (ghost style, used in sticky header)
 *              "footer" (outline style, used at page bottom)
 *   href     — optional URL to push instead of calling router.back()
 *              Pass "/?modal=gallery" from project pages to reopen the gallery.
 */

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  label: string;
  variant?: "nav" | "footer";
  /**
   * Optional destination URL.
   * When provided, clicking navigates to this URL (router.push).
   * When omitted, clicking goes back in history (router.back).
   *
   * Use "/?modal=gallery" on project pages so the home page
   * automatically reopens the Gallery Modal on arrival.
   */
  href?: string;
}

export default function BackButton({
  label,
  variant = "nav",
  href,
}: BackButtonProps) {
  const router = useRouter();

  /**
   * handleClick — decides whether to push a URL or go back.
   *
   * router.push(href) : navigates to the given URL (adds to history stack).
   *                     Used for "Back to Gallery" so we land on /?modal=gallery
   *                     and page.tsx re-opens the gallery modal automatically.
   *
   * router.back()     : goes to the previous entry in the browser history stack.
   *                     Used as a safe fallback when no explicit href is given.
   */
  const handleClick = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  // ── Footer variant — large outline button, centred at bottom of page ──
  if (variant === "footer") {
    return (
      <Button
        onClick={handleClick}
        size="lg"
        variant="outline"
        className="rounded-full px-10 gap-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        <ArrowLeft className="w-4 h-4" />
        {label}
      </Button>
    );
  }

  // ── Nav variant (default) — ghost button, used in sticky header ───────
  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      className="gap-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 font-medium flex-shrink-0"
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="hidden sm:inline">{label}</span>
    </Button>
  );
}
