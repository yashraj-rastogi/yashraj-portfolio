"use client";

// ─────────────────────────────────────────────────────────────
// components/scene4/RoleChapter.tsx
// Renders a single leadership role as an immersive cinematic frame
// ─────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import { type LeadershipRole } from "@/data/leadership";

interface RoleChapterProps {
  role: LeadershipRole;
}

export default function RoleChapter({ role }: RoleChapterProps) {
  // Staggered variants for children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
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
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number], // --ease-cinematic
      },
    },
  };

  const bulletVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number],
      },
    },
  };

  const formattedIndex = role.index < 10 ? `0${role.index}` : `${role.index}`;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full max-w-4xl mx-auto flex flex-col items-center text-center px-4 py-16 md:py-24 relative select-none"
    >
      {/* Cinematic Viewfinder Ticks for the role frame */}
      <div className="opacity-700 absolute top-0 left-0 w-12 h-12 border-t border-l border-[#F2EAD8]/40 pointer-events-none" />
      <div className="opacity-700 absolute top-0 right-0 w-12 h-12 border-t border-r border-[#F2EAD8]/40 pointer-events-none" />
      <div className="opacity-700 absolute bottom-0 left-0 w-12 h-12 border-b border-l border-[#F2EAD8]/40 pointer-events-none" />
      <div className="opacity-700 absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[#F2EAD8]/40 pointer-events-none" />

      {/* ── Chapter Number / Frame Index ── */}
      <motion.div
        variants={itemVariants}
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontStyle: "italic",
          fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
          color: "var(--color-accent-gold)",
          letterSpacing: "0.2em",
          marginBottom: "1rem",
        }}
      >
        — {formattedIndex} —
      </motion.div>

      {/* ── Role Title ── */}
      <motion.h3
        variants={itemVariants}
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 700,
          fontSize: "clamp(1.75rem, 4vw, 3rem)",
          color: "var(--color-text-primary)",
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
          marginBottom: "0.75rem",
        }}
      >
        {role.title}
      </motion.h3>

      {/* ── Organization + Duration ── */}
      <motion.div
        variants={itemVariants}
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
          fontSize: "clamp(0.8rem, 1.5vw, 0.95rem)",
          letterSpacing: "0.15em",
          color: "var(--color-text-secondary)",
          textTransform: "uppercase",
          marginBottom: "1.5rem",
        }}
      >
        <span className="font-medium text-white">{role.organization}</span>
        <span className="mx-2 text-[var(--color-text-muted)]">•</span>
        <span className="text-[var(--color-accent-amber)] font-medium">{role.duration}</span>
      </motion.div>

      {/* ── Badges Row ── */}
      <motion.div
        variants={itemVariants}
        className="flex flex-wrap justify-center gap-2 mb-8 md:mb-10 max-w-2xl"
      >
        {role.badges.map((badge, idx) => (
          <span
            key={idx}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.05em",
              color: "var(--color-accent-amber)",
              borderColor: "rgba(212, 135, 58, 0.3)",
              background: "rgba(212, 135, 58, 0.04)",
            }}
            className="border px-3 py-1 rounded-sm select-none transition-colors duration-300 hover:bg-[rgba(212,135,58,0.1)]"
          >
            {badge}
          </span>
        ))}
      </motion.div>

      {/* ── Bullet Points ── */}
      <div className="flex flex-col items-center w-full max-w-2xl text-left gap-4 md:gap-5 mb-4">
        {role.responsibilities.map((bullet, idx) => (
          <motion.div
            key={idx}
            variants={bulletVariants}
            className="flex items-start gap-4 w-full"
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: "var(--color-accent-gold)",
                fontSize: "0.9rem",
                marginTop: "0.2rem",
              }}
              className="select-none flex-shrink-0"
            >
              •
            </span>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "var(--color-text-primary)",
                fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                lineHeight: "1.65",
                fontWeight: 300,
              }}
              className="opacity-90 font-light"
            >
              {bullet}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
