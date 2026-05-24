"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { type Project } from "@/data/projects";
import Image from "next/image";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const accentColor = project.accentColor || "var(--color-accent-amber)";

  // Keydown Esc listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-[#0D0B09]/95 backdrop-blur-xl p-4 md:p-8 lg:p-12 overflow-hidden"
    >
      {/* ── Soft Ambient Backglow ── */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[240px] pointer-events-none opacity-10 select-none z-0"
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
        }}
      />

      {/* ── Back Navigation Control ── */}
      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        onClick={onClose}
        className="absolute top-6 left-6 md:top-8 md:left-8 bg-[#161210] hover:bg-[#1E1A16] border border-[#F2EAD8]1F hover:border-[#F2EAD8]3F px-5 py-2.5 rounded-full cursor-pointer transition-all duration-300 z-50 text-[12px] tracking-[0.2em] font-medium flex items-center gap-2"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          color: "var(--color-text-primary)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
        }}
        data-cursor="link"
      >
        <span>←</span> BACK TO PROJECTS
      </motion.button>

      {/* ── Modal Contents Container ── */}
      <motion.div
        initial={{ scale: 0.95, y: 25, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 25, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="relative z-10 w-full max-w-6xl max-h-full overflow-y-auto lg:overflow-visible flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 p-4 md:p-8 lg:p-0"
      >
        {/* Left Column: Narrative Details */}
        <div className="flex flex-col items-start text-left w-full lg:w-6/12 max-w-lg lg:max-w-none">
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
            SCENE 03 / PROJECT
          </span>

          <h3
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(2rem, 3.5vw, 3.25rem)",
              color: "#F2EAD8",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              marginBottom: "1.25rem",
            }}
          >
            {project.title}
          </h3>

          <div
            style={{
              height: "1px",
              background: `linear-gradient(90deg, ${accentColor} 0%, rgba(212,135,58,0) 100%)`,
              width: "120px",
              marginBottom: "1.75rem",
            }}
          />

          {project.badge && (
            <div
              className="mb-4 py-3 px-3 border rounded text-[13px] tracking-wider uppercase font-semibold block"
              style={{
                borderColor: `${accentColor}30`,
                backgroundColor: `${accentColor}0A`,
                color: accentColor,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              🏆 {project.badge}
            </div>
          )}

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "var(--color-text-secondary)",
              fontSize: "1.2rem",
              lineHeight: 1.65,
            }}
            className="mb-6 font-light text-left"
          >
            {project.brief}
          </p>

          {/* Technical highlights listing */}
          <div className="w-full mb-6">
            <h4
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "13px",
                letterSpacing: "0.15em",
                color: "var(--color-text-primary)",
              }}
              className="uppercase font-semi-bold mb-3"
            >
              [ Key Contributions & Highlights ]
            </h4>
            <div className="flex flex-col gap-2 w-full">
              {project.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="border border-[#F2EAD8]05 bg-[#161210]30 p-3 rounded flex items-start gap-3 text-left"
                  style={{ borderLeft: `2px solid ${accentColor}40` }}
                >
                  <span style={{ color: accentColor }} className="text-lg pt-1.5">
                    ✦
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: "var(--color-text-secondary)",
                      fontSize: "14px",
                      lineHeight: "1.5",
                    }}
                    className="block font-light"
                  >
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Visual Frame and Demo Links */}
        <div className="w-full lg:w-6/12 flex flex-col items-center gap-6">
          {/* Cover Media viewport */}
          <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-[#F2EAD8]0F bg-[#161210] flex-shrink-0 shadow-2xl">
            {/* Viewfinder corner overlays */}
            <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-[#F2EAD8]30 pointer-events-none z-10" />
            <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-[#F2EAD8]30 pointer-events-none z-10" />
            <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-[#F2EAD8]30 pointer-events-none z-10" />
            <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-[#F2EAD8]30 pointer-events-none z-10" />

            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-w-7xl) 600px, 400px"
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>

          {/* Tech Stack Badges */}
          <div className="w-full flex flex-wrap gap-2 justify-center py-2 border-t border-b border-[#F2EAD8]0F">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.8rem",
                  color: "var(--color-text-primary)",
                  borderColor: `${accentColor}26`,
                }}
                className="bg-[#161210] border px-3 py-1 rounded"
              >
                {tech} 💠
              </span>
            ))}
          </div>

          {/* Live Navigation Links */}
          <div className="flex gap-4 w-full justify-center">
            {/* Github Button */}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 max-w-[200px] border border-[#F2EAD8]1F hover:border-[#F2EAD8]3F bg-[#161210] py-3 rounded-full text-center transition-all duration-300 text-[14px] tracking-[0.2em] font-semibold flex items-center justify-center gap-2.5"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: "var(--color-text-secondary)",
              }}
              data-cursor="link"
            >
              <span>{`</>`}</span> GITHUB CODE
            </a>

            {/* Live Demo Button */}
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 max-w-[200px] py-3 rounded-full text-center transition-all duration-300 text-[14px] tracking-[0.2em] font-bold flex items-center justify-center gap-2.5 shadow-lg"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                backgroundColor: accentColor,
                color: "var(--color-bg-primary)",
                boxShadow: `0 8px 24px ${accentColor}33`,
              }}
              data-cursor="link"
            >
              <span>✦</span> LAUNCH DEMO
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
