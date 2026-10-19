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
      className="relative w-[300px] xs:w-[320px] sm:w-[340px] min-h-[445px] rounded-xl border border-[#F2EAD8]0F bg-[#161210]D9 backdrop-blur-md overflow-hidden flex-shrink-0 cursor-pointer flex flex-col justify-between p-5 select-none transition-colors duration-500"
      style={{
        borderColor: isHovered ? `${accentColor}40` : "rgba(242, 234, 216, 0.06)",
        boxShadow: isHovered
          ? `0 16px 40px rgba(0, 0, 0, 0.8), inset 0 2px 4px rgba(255, 255, 255, 0.02), 0 0 20px ${accentColor}10`
          : "0 8px 24px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.01)",
      }}
      data-cursor="link"
    >
      {/* ── Viewfinder Corner Markers ── */}
      <div className="absolute top-3.5 left-3.5 w-3.5 h-3.5 border-t border-l border-[#F2EAD8]20 pointer-events-none" />
      <div className="absolute top-3.5 right-3.5 w-3.5 h-3.5 border-t border-r border-[#F2EAD8]20 pointer-events-none" />
      <div className="absolute bottom-3.5 left-3.5 w-3.5 h-3.5 border-b border-l border-[#F2EAD8]20 pointer-events-none" />
      <div className="absolute bottom-3.5 right-3.5 w-3.5 h-3.5 border-b border-r border-[#F2EAD8]20 pointer-events-none" />

      {/* ── Visual Frame (Optimized to 160px height) ── */}
      <div className="relative w-full h-[155px] rounded-lg overflow-hidden border border-[#F2EAD8]0A bg-[#0D0B09] flex-shrink-0">
        <motion.div
          className="w-full h-full relative"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 1280px) 340px, 300px"
            priority
            className="object-cover"
          />
        </motion.div>
        
        {/* Subtle light overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#161210]/60 via-transparent to-[#161210]/10 pointer-events-none" />
        
        {/* Category Accent Badge */}
        {project.badge && (
          <div className="absolute top-3 left-3 bg-[#0D0B09]/80 backdrop-blur-md px-2 py-1 rounded border border-[#F2EAD8]1F">
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "9px",
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

      {/* ── Narrative Content ── */}
      <div className="flex flex-col items-start text-left w-full pt-3 flex-grow justify-between">
        <div className="w-full">
          {/* Title */}
          <h3
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#F2EAD8",
            }}
            className="text-xl font-bold mb-4 leading-snug tracking-tight"
          >
            {project.title}
          </h3>

          {/* Tech stack badges */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "15px",
                  color: "var(--color-text-primary)",
                  borderColor: `${accentColor}33`,
                }}
                className="bg-[#1E1A16]/60 border px-2 py-0.5 rounded-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* One-liner outcome */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "var(--color-text-secondary)",
            }}
            className="text-[13px] leading-snug font-light mb-3 text-left w-full line-clamp-2"
          >
            {project.outcome || project.oneLiner}
          </p>
        </div>

        {/* Live Demo & GitHub Buttons */}
        <div className="w-full mt-auto">
          <div className="flex items-center gap-4 mb-6">
            {project.liveDemo && project.liveDemo !== "#" && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-2.5 py-1 rounded text-[13px] font-mono tracking-wider font-semibold border transition-all duration-200 inline-flex items-center gap-1 hover:brightness-125"
                style={{
                  backgroundColor: `${accentColor}1A`,
                  borderColor: `${accentColor}55`,
                  color: accentColor,
                }}
                data-cursor="link"
              >
                <span>✦</span> Live Demo
              </a>
            )}
            {project.github && project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-2.5 py-2 rounded text-[13px] font-mono tracking-wider font-semibold border border-[#F2EAD8]20 bg-[#161210] hover:border-[#F2EAD8]40 text-[#F2EAD8] transition-all duration-200 inline-flex items-center gap-1"
                data-cursor="link"
              >
                <span>{`</>`}</span>   GitHub
              </a>
            )}
          </div>

          <div className="w-full h-[1.5px] bg-[#F2EAD8]0F relative overflow-hidden">
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
                fontSize: "15px",
                letterSpacing: "0.15em",
                color: isHovered ? accentColor : "var(--color-text-muted)",
              }}
              className="transition-colors duration-300 font-bold"
            >
              [ EXPLORE CELL ]
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "16px",
                color: isHovered ? accentColor : "var(--color-text-muted)",
              }}
              className="transition-colors duration-300 transform translate-x-0 hover:translate-x-1 block"
            >
              →
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
