"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories, type SkillCategory } from "@/data/skills";
import OrbCluster from "./OrbCluster";
import { BackgroundPaths } from "./BackgroundPaths";

interface SkillsSceneProps {
  ref?: React.Ref<HTMLElement>;
}

export default function SkillsScene({ ref }: SkillsSceneProps) {
  const [expandedCategory, setExpandedCategory] = useState<SkillCategory | null>(null);

  // Esc key close listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setExpandedCategory(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

  const gridItemVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number], // --ease-dramatic
      },
    },
  };

  return (
    <section
      ref={ref}
      id="skills"
      className="relative min-h-screen flex flex-col justify-start pt-28 md:pt-36 lg:pt-44 pb-24 md:pb-32 px-6 md:px-12 lg:px-24 overflow-hidden"
      style={{
        backgroundColor: "var(--color-bg-secondary)", // Warm secondary charcoal (#161210)
      }}
    >
      {/* ── SVGA flowing path vectors background (cinematic depth overlay) ── */}
      <BackgroundPaths strokeColor="var(--color-accent-amber)" />

      {/* Background Decorative Ambient Glows */}
      <div
        className="absolute top-1/4 right-0 w-[450px] h-[450px] rounded-full blur-[200px] pointer-events-none opacity-5 select-none z-0"
        style={{
          background: "radial-gradient(circle, var(--color-accent-amber) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 left-0 w-[450px] h-[450px] rounded-full blur-[200px] pointer-events-none opacity-5 select-none z-0"
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
        {/* Header Column - Text & Chapter Title */}
        <div className="flex flex-col items-center text-center w-full mb-16 md:mb-20 pointer-events-none select-none">
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
            CHAPTER 02
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
            The Arsenal
          </motion.h2>

          {/* Separator rule */}
          <motion.div
            variants={separatorVariants}
            style={{
              height: "1px",
              background: "linear-gradient(90deg, transparent 0%, var(--color-accent-amber) 50%, transparent 100%)",
            }}
          />
        </div>

        {/* 2x2 Grid of Orbital Clusters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 w-full max-w-5xl mx-auto items-start relative z-20">
          {skillCategories.map((category) => (
            <motion.div
              key={category.id}
              variants={gridItemVariants}
              className="w-full flex flex-col items-center"
            >
              <OrbCluster
                categoryId={category.id}
                label={category.label}
                color={category.color}
                orbColor={category.orbColor}
                skills={category.skills}
                onClick={() => setExpandedCategory(category)}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Full-Screen Focus Modal / Cinematic Expansion ── */}
      <AnimatePresence>
        {expandedCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-[#0D0B09]/95 backdrop-blur-xl p-4 md:p-8 lg:p-12 overflow-hidden"
          >
            {/* Soft backdrop ambient glow matching active category accent */}
            <div
              className="absolute w-[500px] h-[500px] rounded-full blur-[240px] pointer-events-none opacity-10 select-none z-0"
              style={{
                background: `radial-gradient(circle, ${expandedCategory.color} 0%, transparent 70%)`,
              }}
            />

            {/* Modal Back Button */}
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onClick={() => setExpandedCategory(null)}
              className="absolute top-6 left-6 md:top-8 md:left-8 bg-[#161210] hover:bg-[#1E1A16] border border-[#F2EAD8]1F hover:border-[#F2EAD8]3F px-5 py-2.5 rounded-full cursor-pointer transition-all duration-300 z-50 text-[12px] tracking-[0.2em] font-lg flex items-center gap-2"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: "var(--color-text-primary)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
              }}
              data-cursor="link"
            >
              <span>←</span> BACK TO THE ARSENAL
            </motion.button>

            {/* Modal Contents Container */}
            <motion.div
              initial={{ scale: 0.95, y: 25, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 25, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="relative z-10 w-full max-w-6xl max-h-full overflow-y-auto lg:overflow-visible flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 p-4 md:p-8 lg:p-0"
            >
              {/* Left Column: Narrative Details */}
              <div className="flex flex-col items-start text-left w-full lg:w-5/12 max-w-lg lg:max-w-none">
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "var(--text-body)",
                    letterSpacing: "0.3em",
                    color: "var(--color-accent-gold)",
                    textTransform: "uppercase",
                    marginBottom: "0.75rem",
                  }}
                  className="block"
                >
                  CHAPTER 02.{expandedCategory.id.substring(0, 1).toUpperCase()}
                </span>
                
                <h3
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 700,
                    fontSize: "clamp(2rem, 4vw, 3.5rem)",
                    color: "#F2EAD8",
                    lineHeight: 1.1,
                    letterSpacing: "-0.01em",
                    marginBottom: "1.5rem",
                  }}
                >
                  {expandedCategory.label}
                </h3>

                <div
                  style={{
                    height: "1px",
                    background: `linear-gradient(90deg, ${expandedCategory.color} 0%, rgba(212,135,58,0) 100%)`,
                    width: "120px",
                    marginBottom: "2rem",
                  }}
                />

                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "var(--color-text-secondary)",
                    fontSize: "var(--text-body)",
                    lineHeight: 1.7,
                  }}
                  className="mb-8 font-light"
                >
                  Focused, industry-grade competency in the {expandedCategory.label} spectrum. Overlapping nodes represent parallel skill stacks, structured concentrically to illustrate primary and secondary tools of execution.
                </p>

                {/* Vertical listing of full skill names in JetBrains Mono cards */}
                <div className="grid grid-cols-2 gap-3 w-full">
                  {expandedCategory.skills.map((skill) => (
                    <div
                      key={skill}
                      className="text-[16px] font-lg border border-[#F2EAD8]0A bg-[#161210]50 py-2.5 px-4 rounded-[4px] flex items-center justify-center"
                      style={{
                        borderLeft: `2px solid ${expandedCategory.color}80`,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          color: "var(--color-text-primary)",
                          fontSize: "16px",
                          letterSpacing: "0.01em",
                        }}
                        className="block font-medium truncate"
                      >
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Massive Orbital Canvas */}
              <div className="w-full lg:w-7/12 flex items-center justify-center">
                <OrbCluster
                  categoryId={expandedCategory.id}
                  label={expandedCategory.label}
                  color={expandedCategory.color}
                  orbColor={expandedCategory.orbColor}
                  skills={expandedCategory.skills}
                  isExpanded={true}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
