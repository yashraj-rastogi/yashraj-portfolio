"use client";

import { type Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import { motion, type MotionValue } from "framer-motion";

interface FilmReelTrackProps {
  projects: Project[];
  x: MotionValue<any>;
  onCardClick: (project: Project) => void;
}

export default function FilmReelTrack({ projects, x, onCardClick }: FilmReelTrackProps) {
  // Approximate total length for the sprocket hole repeating strip
  const totalSprockets = 110;

  return (
    <div className="relative w-full h-[600px] flex items-center justify-start overflow-hidden pointer-events-auto z-10">
      
      {/* ── Continuous Horizontal Filmstrip Wrapper ── */}
      <motion.div
        style={{ x }}
        className="flex gap-10 md:gap-16 px-[15vw] md:px-[25vw] h-full items-center relative py-12 flex-nowrap"
      >
        {/* ── Top Sprocket Perforation Ribbon ── */}
        <div className="absolute top-3 left-0 right-0 h-6 border-b border-[#F2EAD8]15 flex items-center justify-between px-6 pointer-events-none select-none opacity-25">
          {Array.from({ length: totalSprockets }).map((_, i) => (
            <div
              key={`top-sprock-${i}`}
              className="w-4 h-2 bg-[#F2EAD8]50 rounded-sm flex-shrink-0 border border-black/80"
            />
          ))}
        </div>

        {/* ── Film Track Spacer Ribbon (Center Guides) ── */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[500px] border-t border-b border-dashed border-[#F2EAD8]05 pointer-events-none select-none" />

        {/* ── Visual Project Cards ── */}
        {projects.map((project, idx) => (
          <div key={project.id} className="relative flex items-center flex-shrink-0">
            {/* Film frame number labels printed above each card cell */}
            <div
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
              className="absolute -top-4 left-2 text-[9px] text-var(--color-text-muted) tracking-widest opacity-40 select-none"
            >
              FN_35MM_0{idx + 1}
            </div>

            {/* Adjacent film boundary separator line (frame ticks) */}
            {idx > 0 && (
              <div className="absolute -left-5 md:-left-8 top-1/2 -translate-y-1/2 h-[450px] border-l border-dashed border-[#F2EAD8]0F pointer-events-none select-none" />
            )}

            <ProjectCard project={project} onClick={() => onCardClick(project)} />

            {/* Film frame speed label printed below each card cell */}
            <div
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
              className="absolute -bottom-4 right-2 text-[8px] text-var(--color-text-muted) tracking-widest opacity-40 select-none"
            >
              24_FPS_SEC_{idx + 1}0
            </div>
          </div>
        ))}

        {/* ── Bottom Sprocket Perforation Ribbon ── */}
        <div className="absolute bottom-3 left-0 right-0 h-6 border-t border-[#F2EAD8]15 flex items-center justify-between px-6 pointer-events-none select-none opacity-25">
          {Array.from({ length: totalSprockets }).map((_, i) => (
            <div
              key={`bot-sprock-${i}`}
              className="w-4 h-2 bg-[#F2EAD8]50 rounded-sm flex-shrink-0 border border-black/80"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
