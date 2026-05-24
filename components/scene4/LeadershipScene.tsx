"use client";

// ─────────────────────────────────────────────────────────────
// components/scene4/LeadershipScene.tsx
// Orchestrator for Scene 4 — Leadership ("Behind the Scenes")
// ─────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import { leadershipRoles } from "@/data/leadership";
import RoleChapter from "./RoleChapter";

interface LeadershipSceneProps {
  ref?: React.Ref<HTMLElement>;
}

export default function LeadershipScene({ ref }: LeadershipSceneProps) {
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

  const chapterVariants = {
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

  const titleVariants = {
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

  const separatorVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: 60,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number], // --ease-spring
      },
    },
  };

  return (
    <section
      ref={ref}
      id="leadership"
      className="relative min-h-screen flex flex-col justify-start pt-28 md:pt-36 lg:pt-44 pb-24 md:pb-32 px-6 md:px-12 lg:px-24 overflow-hidden"
      style={{
        backgroundColor: "var(--color-bg-secondary)", // Warm secondary charcoal (#161210)
      }}
    >
      {/* Background Ambient Warm Cinematic Glows */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full blur-[240px] pointer-events-none opacity-5 select-none z-0"
        style={{
          background: "radial-gradient(circle, var(--color-accent-amber) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/10 w-[400px] h-[400px] rounded-full blur-[200px] pointer-events-none opacity-5 select-none z-0"
        style={{
          background: "radial-gradient(circle, var(--color-accent-gold) 0%, transparent 70%)",
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="max-w-7xl w-full mx-auto flex flex-col items-center relative z-10"
      >
        {/* Header - Text & Chapter Title */}
        <div className="flex flex-col items-center text-center w-full mb-16 md:mb-24 pointer-events-none select-none">
          {/* Chapter Label */}
          <motion.div
            variants={chapterVariants}
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontSize: "var(--text-chapter)",
              letterSpacing: "0.3em",
              color: "var(--color-accent-gold)",
              textTransform: "uppercase",
              marginBottom: "0.5rem",
            }}
          >
            CHAPTER 04
          </motion.div>

          {/* Section Title */}
          <motion.h2
            variants={titleVariants}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: "var(--text-title)",
              color: "var(--color-text-primary)",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              marginBottom: "1.25rem",
            }}
          >
            Behind the Scenes
          </motion.h2>

          {/* Separator rule */}
          <motion.div
            variants={separatorVariants}
            style={{
              height: "2px",
              background: "linear-gradient(90deg, transparent 0%, var(--color-accent-amber) 50%, transparent 100%)",
            }}
          />
        </div>

        {/* Roles List - Spaced generously to feel like distinct scene frames */}
        <div className="flex flex-col w-full gap-24 md:gap-32 relative z-20">
          {leadershipRoles.map((role, idx) => (
            <div key={role.index} className="w-full flex flex-col items-center">
              <RoleChapter role={role} />
              
              {/* Divider lines between roles (except the last one) */}
              {idx < leadershipRoles.length - 1 && (
                <div
                  className="w-24 md:w-36 h-[1px] mt-24 md:mt-32 opacity-8"
                  style={{
                    background: "rgba(242, 234, 216, 0.08)",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
