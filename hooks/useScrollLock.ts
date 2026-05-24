"use client";

// ─────────────────────────────────────────────────────────────
// hooks/useScrollLock.ts
// Locks and restores body scroll. Used during:
//   - Scene 0 Stage 2→3 zoom transition
//   - ProjectModal open state (Phase 4)
// ─────────────────────────────────────────────────────────────

import { useState, useCallback, useRef } from "react";

export interface ScrollLockReturn {
  lock: () => void;
  unlock: () => void;
  isLocked: boolean;
}

export function useScrollLock(): ScrollLockReturn {
  const [isLocked, setIsLocked] = useState(false);
  const scrollYRef = useRef<number>(0);

  const lock = useCallback(() => {
    if (typeof window === "undefined" || isLocked) return;

    // Store current scroll position
    scrollYRef.current = window.scrollY;

    // Lock the body in place at current scroll
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";

    setIsLocked(true);
  }, [isLocked]);

  const unlock = useCallback(() => {
    if (typeof window === "undefined" || !isLocked) return;

    // Restore body styles
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";

    // Restore scroll position
    window.scrollTo(0, scrollYRef.current);

    setIsLocked(false);
  }, [isLocked]);

  return { lock, unlock, isLocked };
}
