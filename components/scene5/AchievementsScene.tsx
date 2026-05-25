"use client";

// ─────────────────────────────────────────────────────────────
// components/scene5/AchievementsScene.tsx
// Orchestrator for Scene 5 — Achievements ("The Headlines")
// ─────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import { achievements, certifications } from "@/data/achievements";
import NewspaperHeadline from "./NewspaperHeadline";
import CertStrip from "./CertStrip";

interface AchievementsSceneProps {
  ref?: React.Ref<HTMLElement>;
}

export default function AchievementsScene({ ref }: AchievementsSceneProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number],
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      ref={ref}
      id="achievements"
      className="relative min-h-screen flex flex-col justify-start pt-28 md:pt-36 lg:pt-44 pb-24 md:pb-32 px-6 md:px-12 lg:px-24 overflow-hidden"
      style={{
        backgroundColor: "#F2EAD8", // Broad-sheet newspaper warm cream paper
      }}
    >
      {/* Editorial Watermark background elements */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full border-x border-[#0D0B09]/5 pointer-events-none select-none z-0"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        className="max-w-7xl w-full mx-auto flex flex-col items-center relative z-10"
      >
        {/* ── Broadsheet Editorial Header Banner ── */}
        <motion.div
          variants={headerVariants}
          className="w-full flex flex-col items-center select-none text-center mb-16 md:mb-20 pointer-events-none"
        >
          {/* Double horizontal lines above the banner */}
          <div className="w-full h-[3px] bg-[#0D0B09] mb-1" />
          <div className="w-full h-[1px] bg-[#0D0B09] mb-4" />

          {/* Publisher and Issue details */}
          <div className="w-full flex items-center justify-between px-2 md:px-6 mb-2">
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "clamp(0.6rem, 1vw, 0.75rem)",
                fontWeight: 500,
                color: "#6B5C4A",
                letterSpacing: "0.15em",
              }}
              className="uppercase"
            >
              Lucknow Edition
            </span>
            
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontStyle: "italic",
                fontSize: "clamp(0.85rem, 1.8vw, 1.25rem)",
                color: "#0D0B09",
                letterSpacing: "0.02em",
              }}
              className="uppercase"
            >
              The Builder&apos;s Gazette
            </span>

            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "clamp(0.6rem, 1vw, 0.75rem)",
                fontWeight: 500,
                color: "#6B5C4A",
                letterSpacing: "0.15em",
              }}
              className="uppercase"
            >
              Est. 2024 · Vol. 02
            </span>
          </div>

          {/* Double horizontal lines below the banner */}
          <div className="w-full h-[1px] bg-[#0D0B09] mt-1" />
          <div className="w-full h-[3px] bg-[#0D0B09] mt-1" />
        </motion.div>

        {/* ── Main Broad-Sheet Title ── */}
        <motion.div
          variants={titleVariants}
          className="text-center select-none pointer-events-none mb-16 md:mb-24"
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontSize: "var(--text-chapter)",
              letterSpacing: "0.3em",
              color: "var(--color-accent-amber)",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
            className="block"
          >
            CHAPTER 05
          </span>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 900,
              fontSize: "var(--text-title)",
              color: "#0D0B09",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
            className="uppercase font-black"
          >
            The Headlines
          </h2>
          <div className="w-16 h-[2px] bg-[#0D0B09] mx-auto mt-4" />
        </motion.div>

        {/* ── Broadsheet Newspaper Responsive Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 w-full relative z-20">
          {/* Left Column - Article 1 */}
          <div className="w-full">
            <NewspaperHeadline achievement={achievements[0]} />
          </div>
          
          {/* Right Column - Article 2 (Separated by vertical divider on desktop, horizontal on mobile) */}
          <div className="w-full pt-10 md:pt-0 md:pl-12 lg:pl-16 border-t border-dashed border-[#0D0B09]/20 md:border-t-0 md:border-l">
            <NewspaperHeadline achievement={achievements[1]} />
          </div>
        </div>

        {/* ── Scrolling Certification Strip Ticker Tape ── */}
        <CertStrip certifications={certifications} />
      </motion.div>
    </section>
  );
}
