"use client";

// ─────────────────────────────────────────────────────────────
// components/scene6/ContactScene.tsx
// Orchestrator for Scene 6 — Contact ("The Closing Chapter")
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useCustomCursor } from "@/hooks/useCustomCursor";
import CtaButtons from "./CtaButtons";

/**
 * Converts viewport cursor coordinates to coordinates relative to an element.
 * clip-path circle() uses element-local coordinates, not viewport ones.
 */
function useRelativeCursor(
  elementRef: React.RefObject<HTMLElement | null>,
  viewportX: number,
  viewportY: number
) {
  const [rel, setRel] = useState({ x: -9999, y: -9999 });

  useEffect(() => {
    if (!elementRef.current) return;
    const rect = elementRef.current.getBoundingClientRect();
    setRel({
      x: viewportX - rect.left,
      y: viewportY - rect.top,
    });
  }, [viewportX, viewportY, elementRef]);

  return rel;
}

interface ContactSceneProps {
  ref?: React.Ref<HTMLElement>;
}

export default function ContactScene({ ref }: ContactSceneProps) {
  const { x: cursorX, y: cursorY } = useCustomCursor();
  const hiddenTextRef = useRef<HTMLDivElement>(null);

  // Convert viewport cursor coords to name-text-relative coords for clip-path
  const relCursor = useRelativeCursor(hiddenTextRef, cursorX, cursorY);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number], // --ease-cinematic
      },
    },
  };

  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.4,
      transition: {
        duration: 1.0,
        delay: 0.6,
      },
    },
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="relative min-h-screen flex flex-col items-center justify-between pt-36 pb-12 px-6 md:px-12 lg:px-24 overflow-hidden"
      style={{
        backgroundColor: "var(--color-bg-primary)", // Deep warm charcoal primary (#0D0B09)
      }}
    >
      {/* ── Soft warm light leak glow from top-center ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[200px] pointer-events-none opacity-5 select-none z-0"
        style={{
          background: "radial-gradient(circle at top, var(--color-accent-amber) 0%, transparent 70%)",
        }}
      />

      {/* Main Outro Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-4xl w-full mx-auto flex flex-col items-center justify-center text-center my-auto relative z-10"
      >
        {/* Chapter Label */}
        <motion.div
          variants={itemVariants}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: "italic",
            fontSize: "var(--text-chapter)",
            letterSpacing: "0.3em",
            color: "var(--color-accent-gold)",
            textTransform: "uppercase",
            marginBottom: "2.5rem",
          }}
          className="select-none pointer-events-none"
        >
          CHAPTER 06
        </motion.div>



        {/* Cinematic Closing Quote with preserved breaks */}
        <motion.blockquote
          variants={itemVariants}
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
            color: "var(--color-text-primary)",
            lineHeight: "1.35",
            letterSpacing: "-0.015em",
            maxWidth: "850px",
            textAlign: "center",
            margin: "0 auto 2rem auto",
          }}
          className="mb-8 select-none pointer-events-none leading-relaxed"
        >
          "The best time to build something meaningful was yesterday.<br />
          The second best time is right now.<br />
          Let's build."
        </motion.blockquote>

        {/* Attribution */}
        <motion.div
          variants={itemVariants}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: "italic",
            fontSize: "clamp(1.1rem, 2vw, 1.6rem)",
            color: "var(--color-accent-gold)",
            letterSpacing: "0.05em",
            marginBottom: "2.5rem",
            textAlign: "center",
          }}
          className="select-none pointer-events-none"
        >
          — Yashraj Rastogi
        </motion.div>

        {/* Hidden Spotlight Reveal Text */}
        <motion.div
          variants={itemVariants}
          ref={hiddenTextRef}
          className="relative select-none mb-10 pointer-events-auto flex flex-col items-center justify-center text-center"
          style={{ cursor: "none" }}
          data-cursor="text"
        >
          {/* Dark base layer (barely visible) */}
          <div
            aria-hidden="true"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "clamp(1.35rem, 2.5vw, 2.2rem)",
              color: "#161210", // Deep blending color
              letterSpacing: "-0.015em",
              whiteSpace: "nowrap",
              textAlign: "center",
            }}
          >
            I hope you are impressed...!!
          </div>

          {/* Light revealed layer (Spotlight clipped circle) */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "clamp(1.35rem, 2.5vw, 2.2rem)",
              color: "var(--color-text-primary)",
              letterSpacing: "-0.015em",
              whiteSpace: "nowrap",
              clipPath: `circle(55px at ${relCursor.x}px ${relCursor.y}px)`,
              textShadow: "0 0 35px rgba(212,135,58,0.45)",
              textAlign: "center",
            }}
          >
            I hope you are impressed...!!
          </div>
        </motion.div>

        {/* Pill buttons row */}
        <CtaButtons />
      </motion.div>

      {/* Outro Footer */}
      <motion.div
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full text-center relative z-10 select-none pt-12"
      >
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            color: "var(--color-text-secondary)",
          }}
          className="uppercase font-light tracking-widest text-[10px]"
        >
          © 2026 Yashraj Rastogi · Built with intention · Lucknow, India
        </p>
      </motion.div>
    </section>
  );
}
