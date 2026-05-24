"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { projects, type Project } from "@/data/projects";
import FilmReelTrack from "./FilmReelTrack";
import ProjectModal from "./ProjectModal";

interface ProjectsSceneProps {
  ref?: React.Ref<HTMLElement>;
}

export default function ProjectsScene({ ref }: ProjectsSceneProps) {
  const [expandedProject, setExpandedProject] = useState<Project | null>(null);
  
  // Ref for tracking vertical scroll progress on desktop
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Monitor scroll progress of the vertical outer container
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress to horizontal translation on desktop
  // Slides from 0% (first card in focus) to -70% (last card centers in focus)
  const xTranslate = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);

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
    <>
      {/* ── Outer Section coordinate ──
          Uses forwardRef-free ref directly on section wrapper */}
      <section
        ref={ref}
        id="projects"
        className="relative"
        style={{
          backgroundColor: "var(--color-bg-primary)", // Deep warm primary charcoal (#0D0B09)
        }}
      >
        {/* ────────────────────────────────────────────────────────
            DESKTOP LAYOUT (>= 1024px) — Sticky vertical-to-horizontal film reel
            ──────────────────────────────────────────────────────── */}
        <div
          ref={scrollContainerRef}
          className="hidden lg:block relative h-[400vh] w-full"
        >
          {/* Inner Sticky Viewport Frame */}
          <div className="sticky top-0 h-screen w-full flex flex-col justify-between pt-20 pb-6 overflow-hidden">
            {/* Header Titles */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="flex flex-col items-center text-center w-full select-none pointer-events-none"
            >
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
                CHAPTER 03
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
                The Works
              </motion.h2>

              {/* Separator rule */}
              <motion.div
                variants={separatorVariants}
                style={{
                  height: "1px",
                  background: "linear-gradient(90deg, transparent 0%, var(--color-accent-amber) 50%, transparent 100%)",
                }}
              />
            </motion.div>

            {/* Horizontal Film Reel Track */}
            <FilmReelTrack
              projects={projects}
              x={xTranslate}
              onCardClick={(project) => setExpandedProject(project)}
            />

            {/* Scroll Progress indicators / Film framing labels */}
            <div className="w-full flex items-center justify-between px-16 select-none pointer-events-none">
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "8px",
                  letterSpacing: "0.2em",
                  color: "var(--color-text-muted)",
                }}
                className="opacity-40"
              >
                [ SCROLL VERTICALLY TO SCAN WORK ]
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "8px",
                  letterSpacing: "0.2em",
                  color: "var(--color-text-muted)",
                }}
                className="opacity-40"
              >
                CINE_CELL_REC_5X
              </span>
            </div>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────
            MOBILE/TABLET LAYOUT (< 1024px) — Vertical Staggered Film Strip
            ──────────────────────────────────────────────────────── */}
        <div className="block lg:hidden w-full pt-28 md:pt-36 pb-24 px-6 relative z-10">
          <div className="flex flex-col items-center text-center w-full mb-16 select-none">
            {/* Chapter Label */}
            <span
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                fontSize: "var(--text-chapter)",
                letterSpacing: "0.3em",
                color: "var(--color-accent-gold)",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
              className="block"
            >
              CHAPTER 03
            </span>

            {/* Section Title */}
            <h2
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
              The Works
            </h2>

            {/* Separator rule */}
            <div
              style={{
                height: "1px",
                background: "linear-gradient(90deg, transparent 0%, var(--color-accent-amber) 50%, transparent 100%)",
                width: "60px",
              }}
            />
          </div>

          {/* Staggered Vertical Card Stack */}
          <div className="flex flex-col gap-12 w-full max-w-md mx-auto relative z-20">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
                className="relative flex flex-col items-center w-full"
              >
                {/* Film frame speed label */}
                <div
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  className="absolute -top-4 left-2 text-[8px] text-var(--color-text-muted) tracking-widest opacity-40 select-none"
                >
                  FN_35MM_M0{idx + 1}
                </div>

                <div
                  onClick={() => setExpandedProject(project)}
                  className="w-full relative cursor-pointer"
                >
                  {/* Reuse desktop project card structure natively */}
                  <div className="w-full flex justify-center">
                    {/* Render standard card frame */}
                    <div className="w-full max-w-md h-[490px] rounded-xl border border-[#F2EAD8]0F bg-[#161210]D9 backdrop-blur-md overflow-hidden flex flex-col justify-between p-6 select-none transition-colors duration-500 hover:border-[#D4873A]40"
                      style={{
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.01)",
                      }}
                    >
                      {/* Viewfinder Corner Ticks */}
                      <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#F2EAD8]20 pointer-events-none" />
                      <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#F2EAD8]20 pointer-events-none" />
                      <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#F2EAD8]20 pointer-events-none" />
                      <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#F2EAD8]20 pointer-events-none" />

                      <div className="relative w-full h-[190px] rounded-lg overflow-hidden border border-[#F2EAD8]0A bg-[#0D0B09] flex-shrink-0">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#161210]/60 via-transparent to-[#161210]/10 pointer-events-none" />
                        {project.badge && (
                          <div className="absolute top-3 left-3 bg-[#0D0B09]/80 backdrop-blur-md px-2.5 py-1 rounded border border-[#F2EAD8]1F">
                            <span
                              style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: "8px",
                                letterSpacing: "0.15em",
                                color: project.accentColor || "var(--color-accent-amber)",
                              }}
                              className="font-bold block uppercase"
                            >
                              {project.badge.split("·")[0].split("—")[0].trim()}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col items-start text-left w-full pt-4 flex-grow justify-between">
                        <div className="w-full">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.techStack.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                style={{
                                  fontFamily: "'JetBrains Mono', monospace",
                                  fontSize: "9.5px",
                                  color: "var(--color-text-secondary)",
                                }}
                                className="bg-[#1E1A16]/50 border border-[#F2EAD8]0F px-2.5 py-0.5 rounded-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          <h3
                            style={{
                              fontFamily: "'Playfair Display', Georgia, serif",
                              color: "#F2EAD8",
                            }}
                            className="text-2xl font-bold mb-2 leading-snug tracking-tight text-left"
                          >
                            {project.title}
                          </h3>

                          <p
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              color: "var(--color-text-secondary)",
                            }}
                            className="text-[13px] leading-relaxed font-light mb-3 text-left w-full line-clamp-3"
                          >
                            {project.oneLiner}
                          </p>
                        </div>

                        <div className="w-full mt-auto">
                          <div className="w-full h-[1px] bg-[#F2EAD8]0F relative overflow-hidden mb-2" />
                          <div className="w-full flex items-center justify-between pt-1">
                            <span
                              style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: "9.5px",
                                letterSpacing: "0.15em",
                                color: "var(--color-text-muted)",
                              }}
                              className="font-bold"
                            >
                              [ TAP TO EXPLORE CELL ]
                            </span>
                            <span
                              style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: "11px",
                                color: "var(--color-text-muted)",
                              }}
                            >
                              →
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Immersive Modal Overlay Detail Portal ── */}
      <AnimatePresence>
        {expandedProject && (
          <ProjectModal
            project={expandedProject}
            onClose={() => setExpandedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
