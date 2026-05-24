"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { type Project } from "@/data/projects";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const accentColor = project.accentColor || "var(--color-accent-amber)";

  return (
    <motion.div
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative w-[300px] xs:w-[330px] sm:w-[360px] md:w-[380px] h-[480px] rounded-xl border border-[#F2EAD8]0F bg-[#161210]A0 backdrop-blur-md overflow-hidden flex-shrink-0 cursor-pointer flex flex-col justify-between p-5 select-none transition-colors duration-500"
      style={{
        borderColor: isHovered ? `${accentColor}40` : "rgba(242, 234, 216, 0.06)",
        boxShadow: isHovered
          ? `0 15px 45px rgba(0, 0, 0, 0.7), inset 0 2px 4px rgba(255, 255, 255, 0.02), 0 0 25px ${accentColor}10`
          : "0 10px 30px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.01)",
      }}
      data-cursor="link"
    >
      {/* ── Viewfinder Corner Markers ── */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#F2EAD8]20 pointer-events-none" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#F2EAD8]20 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#F2EAD8]20 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#F2EAD8]20 pointer-events-none" />

      {/* ── Visual Frame (Upper 60%) ── */}
      <div className="relative w-full h-[240px] rounded-lg overflow-hidden border border-[#F2EAD8]0A bg-[#0D0B09] flex-shrink-0">
        <motion.div
          className="w-full h-full relative"
          animate={{ scale: isHovered ? 1.06 : 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }} // --ease-cinematic
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-w-7xl) 380px, 300px"
            priority
            className="object-cover"
          />
        </motion.div>
        
        {/* Subtle light overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#161210]/60 via-transparent to-[#161210]/10 pointer-events-none" />
        
        {/* Category Accent Badge */}
        {project.badge && (
          <div className="absolute top-3 left-3 bg-[#0D0B09]/80 backdrop-blur-md px-2.5 py-1 rounded border border-[#F2EAD8]1F">
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "7.5px",
                letterSpacing: "0.1em",
                color: accentColor,
              }}
              className="font-bold block uppercase"
            >
              {project.badge.split("·")[0].split("—")[0].trim()}
            </span>
          </div>
        )}
      </div>

      {/* ── Narrative Content (Lower 40%) ── */}
      <div className="flex flex-col items-start text-left w-full pt-4 flex-grow justify-between">
        <div className="w-full">
          {/* Tech stack short-list */}
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "8.5px",
                  color: "var(--color-text-muted)",
                }}
                className="bg-[#1E1A16]/40 border border-[#F2EAD8]05 px-2 py-0.5 rounded"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#F2EAD8",
            }}
            className="text-2xl font-bold mb-1.5 leading-tight tracking-tight"
          >
            {project.title}
          </h3>

          {/* One-liner */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "var(--color-text-secondary)",
            }}
            className="text-[12px] leading-relaxed font-light mb-3 text-left w-full line-clamp-2"
          >
            {project.oneLiner}
          </p>
        </div>

        {/* Dynamic sliding bottom reveal line */}
        <div className="w-full mt-auto">
          <div className="w-full h-[1px] bg-[#F2EAD8]0F relative overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 bottom-0 h-full"
              style={{ backgroundColor: accentColor }}
              initial={{ width: 0 }}
              animate={{ width: isHovered ? "100%" : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
          <div className="w-full flex items-center justify-between pt-2">
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "8px",
                letterSpacing: "0.15em",
                color: isHovered ? accentColor : "var(--color-text-muted)",
              }}
              className="transition-colors duration-300 font-bold"
            >
              [ CLICK TO VIEW DETAILS ]
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                color: isHovered ? accentColor : "var(--color-text-muted)",
              }}
              className="transition-colors duration-300 transform translate-x-0 hover:translate-x-1 duration-300 block"
            >
              →
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
