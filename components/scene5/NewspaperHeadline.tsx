"use client";

// ─────────────────────────────────────────────────────────────
// components/scene5/NewspaperHeadline.tsx
// Renders a single flat broadsheet column article headline (no cards or floating boxes)
// ─────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import { type Achievement } from "@/data/achievements";

interface NewspaperHeadlineProps {
  achievement: Achievement;
}

export default function NewspaperHeadline({ achievement }: NewspaperHeadlineProps) {
  // Broadsheet staggering entry animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number], // --ease-cinematic
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="flex flex-col items-start text-left w-full h-full justify-between select-none relative pb-6 md:pb-0"
    >
      <div className="w-full">
        {/* Dateline and Category Badge */}
        <motion.div
          variants={lineVariants}
          className="flex items-center gap-3 mb-3"
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              fontWeight: "bold",
              letterSpacing: "0.15em",
              color: "var(--color-accent-amber)",
            }}
            className="uppercase"
          >
            [ EXCLUSIVE REPORT ]
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#0D0B09]/20" />
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 500,
              letterSpacing: "0.05em",
              color: "#6B5C4A",
            }}
            className="uppercase"
          >
            {achievement.dateline}
          </span>
        </motion.div>

        {/* Main Article Bold Headline */}
        <motion.h3
          variants={lineVariants}
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 900,
            fontSize: "clamp(1.35rem, 2.5vw, 1.95rem)",
            color: "#0D0B09",
            lineHeight: "1.2",
            letterSpacing: "-0.02em",
          }}
          className="mb-4 uppercase tracking-tight font-black"
        >
          {achievement.headline}
        </motion.h3>

        {/* Editorial Subhead / Abstract */}
        <motion.p
          variants={lineVariants}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(0.85rem, 1.2vw, 0.95rem)",
            color: "#6B5C4A",
            lineHeight: "1.65",
            fontWeight: 400,
          }}
          className="mb-6 font-light"
        >
          {achievement.subhead}
        </motion.p>
      </div>

      {/* Credential link / Read More button */}
      <motion.div variants={lineVariants} className="w-full mt-auto pt-4">
        <div className="w-12 h-[1px] bg-[#0D0B09]/30 mb-3" />
        <a
          href={achievement.credentialUrl || `#credential-${achievement.id}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            color: "var(--color-accent-amber)",
          }}
          className="font-bold inline-flex items-center gap-1 hover:underline select-none no-underline transition-all duration-300"
          data-cursor="link"
        >
          VERIFY ORIGINAL PRESS RELEASE <span className="text-[9px]">↗</span>
        </a>
      </motion.div>
    </motion.div>
  );
}
