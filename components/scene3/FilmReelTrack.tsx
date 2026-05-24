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
  // Total length for sprocket hole repetition
  const totalSprockets = 120;

  return (
    <div className="relative w-full h-[510px] flex items-center justify-start overflow-hidden pointer-events-auto z-10 bg-gradient-to-b from-[#0D0B09] via-[#120E0B] to-[#0D0B09] border-t border-b border-[#F2EAD8]05">
      
      {/* ── Continuous Horizontal Vintage Celluloid Filmstrip ── */}
      <motion.div
        style={{ x }}
        className="flex gap-10 md:gap-14 px-[20vw] md:px-[30vw] h-full items-center relative py-12 flex-nowrap"
      >
        {/* ── TOP CELLULOID TRACK (Sprockets + Kodak Markings + Optical Soundtrack) ── */}
        <div className="absolute top-0 left-0 right-0 h-10 bg-[#0A0807] border-b border-[#F2EAD8]1F flex flex-col justify-center pointer-events-none select-none z-20 animate-[pulse_8s_infinite]">
          {/* sprocket holes with projector light backglow */}
          <div className="w-full flex justify-between px-6 items-center h-3">
            {Array.from({ length: totalSprockets }).map((_, i) => (
              <div
                key={`top-sprock-${i}`}
                className="w-3.5 h-1.5 bg-[#D4873A] rounded-[1px] flex-shrink-0"
                style={{
                  opacity: 0.35 + Math.sin(i * 0.1) * 0.1, // Projector bulb flicker
                  boxShadow: "0 0 5px rgba(212, 135, 58, 0.4)",
                }}
              />
            ))}
          </div>

          {/* Kodak Safety Film Text & Ticks */}
          <div className="w-full flex justify-between px-20 items-center h-4 text-[#A89880] opacity-35 font-mono text-[7px] tracking-[0.25em]">
            <span>KODAK SAFETY FILM 5072</span>
            <span>▶ 1A</span>
            <span>EASTMAN FINE GRAIN</span>
            <span>▶ 2A</span>
            <span>KODAK SAFETY FILM 5072</span>
            <span>▶ 3A</span>
            <span>EASTMAN FINE GRAIN</span>
            <span>▶ 4A</span>
          </div>

          {/* Analog Optical Soundtrack Visual Track */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4873A]26 to-transparent opacity-30 flex items-center justify-around overflow-hidden border-t border-[#D4873A]1F">
            <div className="w-full h-[1px] bg-amber-500/80 animate-pulse" />
          </div>
        </div>

        {/* ── Film Track Spacer Ribbon (Center Guides) ── */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[410px] border-t border-b border-dashed border-[#F2EAD8]05 pointer-events-none select-none z-0" />

        {/* ── Visual Project Cards ── */}
        {projects.map((project, idx) => (
          <div key={project.id} className="relative flex items-center flex-shrink-0 z-10">
            {/* Film frame metadata labels */}
            <div
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
              className="absolute -top-2 left-4 text-[8px] text-[#A89880] tracking-widest opacity-35 select-none"
            >
              CINE_CELL_0{idx + 1}
            </div>

            {/* Frame boundary tick separators */}
            {idx > 0 && (
              <div className="absolute -left-5 md:-left-7 top-1/2 -translate-y-1/2 h-[390px] border-l border-dashed border-[#F2EAD8]1F opacity-20 pointer-events-none select-none" />
            )}

            <ProjectCard project={project} onClick={() => onCardClick(project)} />

            {/* Film frame metadata speed labels */}
            <div
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
              className="absolute -bottom-2 right-4 text-[7px] text-[#A89880] tracking-widest opacity-35 select-none"
            >
              24_FPS_SEC_0{idx + 1}
            </div>
          </div>
        ))}

        {/* ── BOTTOM CELLULOID TRACK (Sprockets + Eastman Markings) ── */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#0A0807] border-t border-[#F2EAD8]1F flex flex-col justify-center pointer-events-none select-none z-20 animate-[pulse_8s_infinite]">
          {/* Kodak Safety Film Text & Ticks */}
          <div className="w-full flex justify-between px-20 items-center h-4 text-[#A89880] opacity-35 font-mono text-[7px] tracking-[0.25em]">
            <span>▶ 1</span>
            <span>SAFETY COATED</span>
            <span>▶ 2</span>
            <span>ISO 100</span>
            <span>▶ 3</span>
            <span>SAFETY COATED</span>
            <span>▶ 4</span>
            <span>ISO 100</span>
          </div>

          {/* sprocket holes with projector light backglow */}
          <div className="w-full flex justify-between px-6 items-center h-3">
            {Array.from({ length: totalSprockets }).map((_, i) => (
              <div
                key={`bot-sprock-${i}`}
                className="w-3.5 h-1.5 bg-[#D4873A] rounded-[1px] flex-shrink-0"
                style={{
                  opacity: 0.35 + Math.cos(i * 0.1) * 0.1, // Bulb flicker variation
                  boxShadow: "0 0 5px rgba(212, 135, 58, 0.4)",
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
