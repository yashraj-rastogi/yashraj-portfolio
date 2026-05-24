"use client";

// ─────────────────────────────────────────────────────────────
// hooks/useCustomCursor.ts
// Tracks mouse position and hover state for the custom amber cursor.
// Detects hover targets via data-cursor attribute.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from "react";

export type CursorState = "default" | "text" | "link" | "orb";

export interface CustomCursorReturn {
  x: number;
  y: number;
  hoverState: CursorState;
}

export function useCustomCursor(): CustomCursorReturn {
  const [position, setPosition] = useState({ x: -200, y: -200 });
  const [hoverState, setHoverState] = useState<CursorState>("default");

  const onMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });

    // Detect data-cursor attribute on hovered element or its ancestors
    const target = e.target as HTMLElement;
    const cursorEl = target.closest("[data-cursor]") as HTMLElement | null;

    if (cursorEl) {
      const cursorType = cursorEl.dataset.cursor as CursorState;
      setHoverState(cursorType || "default");
    } else {
      setHoverState("default");
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [onMouseMove]);

  return {
    x: position.x,
    y: position.y,
    hoverState,
  };
}
