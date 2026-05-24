"use client";

// ─────────────────────────────────────────────────────────────
// components/global/CustomCursor.tsx
// Small amber dot cursor that enlarges on hover over elements
// with data-cursor="text" or data-cursor="link".
// Hidden on touch devices.
// ─────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCustomCursor } from "@/hooks/useCustomCursor";

export default function CustomCursor() {
  const { x, y, hoverState } = useCustomCursor();
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  const springConfig = { damping: 28, stiffness: 400 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(hover: none)").matches);
    setIsVisible(true);
  }, []);

  useEffect(() => {
    cursorX.set(x);
    cursorY.set(y);
  }, [x, y, cursorX, cursorY]);

  if (isTouchDevice || !isVisible) return null;

  // ── Size: small dot by default, large on text/link hover ──
  const sizeMap = {
    default: 14,
    text: 140,
    link: 48,
    orb: 64,
  };

  const borderMap = {
    default: "1.5px solid rgba(212, 135, 58, 0.7)",
    text: "1.5px solid rgba(212, 135, 58, 0.4)",
    link: "1.5px solid rgba(212, 135, 58, 0.6)",
    orb: "1.5px solid rgba(212, 135, 58, 0.5)",
  };

  const bgMap = {
    default: "rgba(212, 135, 58, 0.35)",
    text: "rgba(212, 135, 58, 0.08)",
    link: "rgba(212, 135, 58, 0.15)",
    orb: "rgba(212, 135, 58, 0.06)",
  };

  const glowMap = {
    default: "0 0 6px rgba(212, 135, 58, 0.3)",
    text: "0 0 60px rgba(212, 135, 58, 0.2)",
    link: "0 0 20px rgba(212, 135, 58, 0.25)",
    orb: "0 0 30px rgba(212, 135, 58, 0.15)",
  };

  const size = sizeMap[hoverState];

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        left: springX,
        top: springY,
        translateX: "-50%",
        translateY: "-50%",
        pointerEvents: "none",
        zIndex: 10000,
        borderRadius: "50%",
      }}
      animate={{
        width: size,
        height: size,
        border: borderMap[hoverState],
        boxShadow: glowMap[hoverState],
        background: bgMap[hoverState],
      }}
      transition={{
        width: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] },
        height: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] },
        boxShadow: { duration: 0.3 },
        background: { duration: 0.3 },
        border: { duration: 0.2 },
      }}
    />
  );
}
