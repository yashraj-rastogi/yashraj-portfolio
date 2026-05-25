"use client";

import { motion } from "framer-motion";
import { MagneticQuote } from "@/components/ui/morphing-cursor";

export default function StoryPanel() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.25,
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

  const quoteVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number], // --ease-cinematic
      },
    },
  };

  const factVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number], // --ease-film
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      className="flex flex-col gap-6 md:gap-8 text-left w-full"
    >
      {/* Narrative Paragraphs */}
      <div className="flex flex-col gap-5 lg:gap-6">
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: "var(--text-body)",
            lineHeight: 1.8,
            color: "var(--color-text-secondary)",
          }}
        >
          I&apos;m Yashraj — a Computer Science undergraduate who builds things that
          matter. From real-time emergency platforms to AI-powered voice
          detection systems, I sit at the intersection of engineering, design,
          and human impact.
        </motion.p>
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: "var(--text-body)",
            lineHeight: 1.8,
            color: "var(--color-text-secondary)",
          }}
        >
          I started writing code not to get a job, but because I wanted to
          solve problems I actually cared about. That instinct led me to
          national hackathon stages, Google&apos;s Ambassador program, and projects
          used by real people in real situations.
        </motion.p>
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: "var(--text-body)",
            lineHeight: 1.8,
            color: "var(--color-text-secondary)",
          }}
        >
          I believe great software tells a story. Every system I build is
          designed not just to work — but to feel right.
        </motion.p>
      </div>

      {/* Philosophy Statement with Magnetic Morphing Spotlight Mask */}
      <motion.div variants={quoteVariants} className="w-full">
        <MagneticQuote />
      </motion.div>

      {/* Quick Facts */}
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.6,
            },
          },
        }}
        style={{
          borderTop: "1px solid var(--color-border)",
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 mt-2"
      >
        <motion.div
          variants={factVariants}
          className="flex items-center gap-3"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: "var(--text-small)",
            color: "var(--color-text-muted)",
          }}
        >
          <span className="text-base select-none">📍</span>
          <span>Lucknow, UP, India</span>
        </motion.div>

        <motion.div
          variants={factVariants}
          className="flex items-center gap-3"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: "var(--text-small)",
            color: "var(--color-text-muted)",
          }}
        >
          <span className="text-base select-none">🎓</span>
          <span>B.Tech CSE · SRMCEM · 2024–2028 · CGPA: 7.5</span>
        </motion.div>

        <motion.div
          variants={factVariants}
          className="flex items-center gap-3"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: "var(--text-small)",
            color: "var(--color-text-muted)",
          }}
        >
          <span className="text-base select-none">🏆</span>
          <span>5th Rank · India AI Impact Buildathon · 40,000+ participants</span>
        </motion.div>

        <motion.div
          variants={factVariants}
          className="flex items-center gap-3"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: "var(--text-small)",
            color: "var(--color-text-muted)",
          }}
        >
          <span className="text-base select-none">🤝</span>
          <span>Google Student Ambassador · GID: 3263</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
