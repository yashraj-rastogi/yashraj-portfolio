"use client";

import { motion } from "framer-motion";
import StoryPanel from "./StoryPanel";
import VisualPanel from "./VisualPanel";

interface AboutSceneProps {
  ref?: React.Ref<HTMLElement>;
}

export default function AboutScene({ ref }: AboutSceneProps) {
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

  const visualVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number], // --ease-dramatic
      },
    },
  };

  return (
    <section
      ref={ref}
      id="about"
      className="relative min-h-screen flex flex-col justify-start pt-28 md:pt-36 lg:pt-44 pb-24 md:pb-32 px-6 md:px-12 lg:px-24 overflow-hidden"
      style={{
        backgroundColor: "var(--color-bg-primary)",
      }}
    >
      {/* Background Decorative Film Frame glow */}
      <div
        className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full blur-[160px] pointer-events-none opacity-10 select-none"
        style={{
          background: "radial-gradient(circle, var(--color-accent-amber) 0%, transparent 70%)",
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start relative z-10"
      >
        {/* Left Column - Story / Copy */}
        <div className="lg:col-span-7 order-2 lg:order-1 flex flex-col items-start text-left w-full">
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
            CHAPTER 01
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
            The Builder
          </motion.h2>

          {/* Separator rule */}
          <motion.div
            variants={separatorVariants}
            style={{
              height: "1px",
              background: "linear-gradient(90deg, var(--color-accent-amber) 0%, rgba(212,135,58,0) 100%)",
              marginBottom: "2.5rem",
            }}
          />

          {/* Story & facts panel */}
          <StoryPanel />
        </div>

        {/* Right Column - Visual Panel */}
        <motion.div
          variants={visualVariants}
          className="lg:col-span-5 order-1 lg:order-2 w-full max-w-md mx-auto lg:max-w-none"
        >
          <VisualPanel />
        </motion.div>
      </motion.div>
    </section>
  );
}
