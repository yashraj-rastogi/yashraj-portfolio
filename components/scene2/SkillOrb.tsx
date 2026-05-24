"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface SkillOrbProps {
  name: string;
  shortName: string;
  x: number;
  y: number;
  color: string;
  orbColor: string;
  isExpanded?: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

export default function SkillOrb({
  name,
  shortName,
  x,
  y,
  color,
  orbColor,
  isExpanded = false,
  onHoverStart,
  onHoverEnd,
}: SkillOrbProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Expanded mode dimensions vs. Normal mode dimensions
  const orbSize = isExpanded ? 76 : 56;
  const marginOffset = -orbSize / 2;

  // Decide what label text to show inside the orb body
  // If expanded, we show the full name (or a clean version of it), otherwise the short abbreviation
  const displayLabel = isExpanded ? name.replace(/\s*\(v\d+\/v\d+\)/, "") : shortName;

  return (
    <motion.div
      className="absolute cursor-pointer select-none z-20 flex flex-col items-center justify-center pointer-events-auto"
      style={{
        x,
        y,
        left: "50%",
        top: "50%",
        marginLeft: `${marginOffset}px`,
        marginTop: `${marginOffset}px`,
        width: `${orbSize}px`,
        height: `${orbSize}px`,
        willChange: "transform",
      }}
      animate={{
        scale: isHovered ? 1.25 : 1,
        zIndex: isHovered ? 50 : 20,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      onHoverStart={() => {
        setIsHovered(true);
        onHoverStart?.();
      }}
      onHoverEnd={() => {
        setIsHovered(false);
        onHoverEnd?.();
      }}
      data-cursor="orb"
    >
      {/* Glassmorphic Orbital Body */}
      <div
        className="absolute inset-0 rounded-full flex flex-col items-center justify-center border transition-all duration-300 px-2 text-center"
        style={{
          backgroundColor: isHovered ? "rgba(13, 11, 9, 0.95)" : "rgba(22, 18, 16, 0.5)",
          borderColor: isHovered ? orbColor : `${color}4D`, // 30% opacity
          boxShadow: isHovered
            ? `0 0 24px ${color}A0, inset 0 0 12px ${color}66`
            : `0 4px 14px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.05)`,
        }}
      >
        {/* Short/Full Skill Name */}
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: isHovered ? "#F2EAD8" : "var(--color-text-secondary)",
            fontSize: isExpanded ? "9.5px" : "10px",
            lineHeight: "1.15",
            fontWeight: 500,
            letterSpacing: "-0.02em",
          }}
          className="text-center font-medium block overflow-hidden text-ellipsis break-words"
        >
          {displayLabel}
        </span>
      </div>

      {/* Expanded Detail Tooltip - only show in non-expanded grid view to avoid redundancy */}
      {isHovered && !isExpanded && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 38, scale: 1 }}
          className="absolute pointer-events-none whitespace-nowrap bg-[#0D0B09] border px-2.5 py-1 rounded-[4px] shadow-2xl z-50 flex flex-col items-center"
          style={{
            borderColor: `${color}40`,
            boxShadow: `0 10px 25px -5px rgba(0, 0, 0, 0.8), 0 0 15px ${color}1A`,
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "#F2EAD8",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            {name}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}
