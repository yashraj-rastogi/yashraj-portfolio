// ─────────────────────────────────────────────────────────────
// lib/utils.ts
// Class name merging utility using clsx + tailwind-merge
// ─────────────────────────────────────────────────────────────

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names using clsx and resolves Tailwind conflicts
 * with tailwind-merge. Use this everywhere instead of raw string concatenation.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
