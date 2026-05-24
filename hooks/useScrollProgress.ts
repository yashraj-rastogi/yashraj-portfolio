"use client";

// ─────────────────────────────────────────────────────────────
// hooks/useScrollProgress.ts
// Wraps Framer Motion useScroll for per-section scroll tracking.
// Returns a MotionValue<number> from 0 to 1 for the given ref.
// ─────────────────────────────────────────────────────────────

import { RefObject } from "react";
import { useScroll, MotionValue } from "framer-motion";

export interface ScrollProgressReturn {
  scrollYProgress: MotionValue<number>;
}

/**
 * Returns a scroll progress MotionValue (0–1) scoped to the given element ref.
 * Uses offset ["start end", "end start"] so 0 = element enters viewport bottom,
 * 1 = element exits viewport top.
 *
 * For HeroScene's sticky container, pass the outer 300vh div ref.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>
): ScrollProgressReturn {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return { scrollYProgress };
}
