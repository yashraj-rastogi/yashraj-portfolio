"use client";

import type React from "react";
import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useAnimationFrame } from "framer-motion";
import SkillOrb from "./SkillOrb";

interface OrbClusterProps {
  categoryId: string;
  label: string;
  color: string;
  orbColor: string;
  skills: string[];
  isExpanded?: boolean;
  onClick?: () => void;
}

// Abbreviation mapping to display short names in normal 56px orbs
const getAbbreviation = (name: string): string => {
  const mapping: Record<string, string> = {
    "React.js (v18/v19)": "React",
    "Next.js": "Next",
    "Tailwind CSS v4": "Tailwind",
    "TypeScript": "TS",
    "HTML5": "HTML5",
    "Progressive Web Apps": "PWA",
    "Node.js": "Node",
    "Express.js": "Express",
    "Django": "Django",
    "FastAPI": "FastAPI",
    "Cloud Functions": "Cloud",
    "Google Gemini AI": "Gemini",
    "PyTorch": "PyTorch",
    "Hugging Face": "Hugging",
    "Wav2Vec 2.0": "Wav2Vec",
    "Librosa": "Librosa",
    "Explainable AI": "XAI",
    "Firebase": "Firebase",
    "MongoDB": "Mongo",
    "Vercel": "Vercel",
    "Git": "Git",
    "GitHub": "GitHub",
    "Figma": "Figma",
    "Canva": "Canva",
    "Postman": "Postman",
    "Vite": "Vite",
  };
  return mapping[name] || name;
};

export default function OrbCluster({
  categoryId,
  label,
  color,
  orbColor,
  skills,
  isExpanded = false,
  onClick,
}: OrbClusterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredOrbIndex, setHoveredOrbIndex] = useState<number | null>(null);
  const [isContainerHovered, setIsContainerHovered] = useState(false);
  
  // Coordinates of each orb relative to the center (0, 0)
  const [coords, setCoords] = useState<{ x: number; y: number }[]>([]);
  const anglesRef = useRef<number[]>([]);

  // Springs for the magnetic drift pull of the entire orbital system
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const springConfig = { stiffness: 120, damping: 20 };
  const magneticX = useSpring(dragX, springConfig);
  const magneticY = useSpring(dragY, springConfig);

  // Helper to assign radius, speed, direction, and angular stagger offset to each skill orb
  // Radius values scale up in expanded mode to provide maximum readability
  const getOrbDetails = (index: number, total: number, id: string) => {
    let radius = isExpanded ? 165 : 95;
    let baseSpeed = 0.0005; // Clockwise
    let offsetIndex = index;
    let orbitCount = 3;

    if (id === "tools-db") {
      // Triple concentric orbits for Tools & DB
      if (index < 3) {
        radius = isExpanded ? 80 : 50;
        baseSpeed = -0.0008; // Counter-clockwise
        offsetIndex = index;
        orbitCount = 3;
      } else if (index < 6) {
        radius = isExpanded ? 135 : 80;
        baseSpeed = 0.0005; // Clockwise
        offsetIndex = index - 3;
        orbitCount = 3;
      } else {
        radius = isExpanded ? 190 : 110;
        baseSpeed = -0.0003; // Counter-clockwise
        offsetIndex = index - 6;
        orbitCount = 3;
      }
    } else {
      // Two concentric orbits for standard categories
      if (total === 5) {
        if (index < 2) {
          radius = isExpanded ? 90 : 55;
          baseSpeed = -0.0007; // Counter-clockwise
          offsetIndex = index;
          orbitCount = 2;
        } else {
          radius = isExpanded ? 165 : 95;
          baseSpeed = 0.0005; // Clockwise
          offsetIndex = index - 2;
          orbitCount = 3;
        }
      } else {
        // 6 skills
        if (index < 3) {
          radius = isExpanded ? 90 : 55;
          baseSpeed = -0.0007; // Counter-clockwise
          offsetIndex = index;
          orbitCount = 3;
        } else {
          radius = isExpanded ? 165 : 95;
          baseSpeed = 0.0005; // Clockwise
          offsetIndex = index - 3;
          orbitCount = 3;
        }
      }
    }

    const angleOffset = (offsetIndex * (2 * Math.PI)) / orbitCount;
    return { radius, baseSpeed, angleOffset };
  };

  // Run the orbital frame tick
  useAnimationFrame((_, delta) => {
    if (skills.length === 0) return;
    
    const dt = Math.min(delta, 100);

    // Initialize angles array lazily
    if (anglesRef.current.length === 0) {
      anglesRef.current = skills.map((_, i) => {
        const { angleOffset } = getOrbDetails(i, skills.length, categoryId);
        return angleOffset;
      });
    }

    const nextCoords = skills.map((_, i) => {
      const { radius, baseSpeed } = getOrbDetails(i, skills.length, categoryId);

      // Pause orbital motion of active hovered orb
      if (hoveredOrbIndex !== i) {
        anglesRef.current[i] += baseSpeed * dt * 0.05;
      }

      return {
        x: radius * Math.cos(anglesRef.current[i]),
        y: radius * Math.sin(anglesRef.current[i]),
      };
    });

    setCoords(nextCoords);
  });

  // Reset coordinates if skills data changes
  useEffect(() => {
    anglesRef.current = [];
  }, [skills, categoryId, isExpanded]);

  // Handle magnetic displacement towards cursor
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left - centerX;
    const mouseY = e.clientY - rect.top - centerY;
    
    // Physical pull scale: higher displacement range when expanded
    const maxPull = isExpanded ? 24 : 14;
    const maxRange = isExpanded ? 260 : 180;
    const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
    
    if (distance === 0) return;

    const pullFactor = Math.min(distance / maxRange, 1.0) * maxPull;
    const angle = Math.atan2(mouseY, mouseX);

    dragX.set(Math.cos(angle) * pullFactor);
    dragY.set(Math.sin(angle) * pullFactor);
  };

  const handleMouseLeave = () => {
    dragX.set(0);
    dragY.set(0);
    setIsContainerHovered(false);
  };

  const handleMouseEnter = () => {
    setIsContainerHovered(true);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={!isExpanded ? onClick : undefined}
      className={`relative rounded-full border shadow-inner flex items-center justify-center select-none ${
        !isExpanded
          ? "w-full aspect-square max-w-[280px] xs:max-w-[300px] sm:max-w-[320px] md:max-w-[340px] lg:max-w-[360px] cursor-pointer hover:border-[#D4873A]33 duration-500"
          : "w-[300px] h-[300px] xs:w-[350px] xs:h-[350px] sm:w-[450px] sm:h-[450px] md:w-[480px] md:h-[480px] lg:w-[520px] lg:h-[520px]"
      }`}
      style={{
        backgroundColor: "rgba(30, 26, 22, 0.08)",
        borderColor: isContainerHovered && !isExpanded ? `${color}40` : "rgba(242, 234, 216, 0.03)",
        boxShadow: isContainerHovered && !isExpanded 
          ? `0 12px 40px rgba(0, 0, 0, 0.6), inset 0 2px 8px rgba(255, 255, 255, 0.03), 0 0 30px ${color}15`
          : "inset 0 2px 4px rgba(255, 255, 255, 0.01)",
      }}
      animate={!isExpanded ? {
        scale: isContainerHovered ? 1.03 : 1,
      } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* ── Concentric Dashed Tracks (HUD Aesthetic) ── */}
      {categoryId === "tools-db" ? (
        <>
          {/* Inner */}
          <div
            className="absolute rounded-full border border-dashed border-[#F2EAD8]05 pointer-events-none transition-all duration-500"
            style={{
              width: isExpanded ? "160px" : "100px",
              height: isExpanded ? "160px" : "100px",
            }}
          />
          {/* Middle */}
          <div
            className="absolute rounded-full border border-dashed border-[#F2EAD8]05 pointer-events-none transition-all duration-500"
            style={{
              width: isExpanded ? "270px" : "160px",
              height: isExpanded ? "270px" : "160px",
            }}
          />
          {/* Outer */}
          <div
            className="absolute rounded-full border border-dashed border-[#F2EAD8]05 pointer-events-none transition-all duration-500"
            style={{
              width: isExpanded ? "380px" : "220px",
              height: isExpanded ? "380px" : "220px",
            }}
          />
        </>
      ) : (
        <>
          {/* Inner */}
          <div
            className="absolute rounded-full border border-dashed border-[#F2EAD8]05 pointer-events-none transition-all duration-500"
            style={{
              width: isExpanded ? "180px" : "110px",
              height: isExpanded ? "180px" : "110px",
            }}
          />
          {/* Outer */}
          <div
            className="absolute rounded-full border border-dashed border-[#F2EAD8]05 pointer-events-none transition-all duration-500"
            style={{
              width: isExpanded ? "330px" : "190px",
              height: isExpanded ? "330px" : "190px",
            }}
          />
        </>
      )}

      {/* ── Core Center Label (Sun/Nucleus) ── */}
      <div
        className="absolute z-10 rounded-full flex flex-col items-center justify-center border select-none transition-all duration-500 pointer-events-none"
        style={{
          backgroundColor: isContainerHovered ? "rgba(13, 11, 9, 0.85)" : "rgba(13, 11, 9, 0.7)",
          backdropFilter: "blur(6px)",
          borderColor: isContainerHovered && !isExpanded ? `${color}4D` : `${color}26`,
          boxShadow: isContainerHovered && !isExpanded
            ? `0 10px 32px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.05), 0 0 15px ${color}33`
            : `0 8px 32px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.02)`,
          width: isExpanded ? "110px" : "80px",
          height: isExpanded ? "110px" : "80px",
        }}
      >
        <span
          style={{ color: `${color}40`, fontSize: isExpanded ? "10px" : "9px" }}
          className="absolute -top-1 font-mono transition-transform duration-300"
        >
          ▲
        </span>
        
        {/* Swapping center labels inside non-expanded hover */}
        <div className="relative w-full text-center overflow-hidden h-5 flex items-center justify-center">
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: isContainerHovered && !isExpanded ? "var(--color-accent-amber)" : color,
              fontSize: isExpanded ? "10px" : "9px",
              fontWeight: 700,
              letterSpacing: "0.15em",
            }}
            className="transition-all duration-300 transform font-bold block"
          >
            {isContainerHovered && !isExpanded ? "EXPLORE" : label.toUpperCase()}
          </span>
        </div>

        <span
          style={{ color: `${color}40`, fontSize: isExpanded ? "10px" : "9px" }}
          className="absolute -bottom-1 font-mono transition-transform duration-300"
        >
          ▼
        </span>
      </div>

      {/* ── Magnetic Orbit Layer (Holds the orbiting bodies) ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        style={{
          x: magneticX,
          y: magneticY,
          willChange: "transform",
        }}
      >
        {coords.map((pos, idx) => (
          <SkillOrb
            key={skills[idx]}
            name={skills[idx]}
            shortName={getAbbreviation(skills[idx])}
            x={pos.x}
            y={pos.y}
            color={color}
            orbColor={orbColor}
            isExpanded={isExpanded}
            onHoverStart={() => setHoveredOrbIndex(idx)}
            onHoverEnd={() => setHoveredOrbIndex(null)}
          />
        ))}
      </motion.div>

      {/* ── Small Clickable Helper Tag (Non-expanded core footer) ── */}
      {isContainerHovered && !isExpanded && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-8 bg-[#0D0B09] border border-[#F2EAD8]0F px-2 py-0.5 rounded pointer-events-none"
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "8.5px",
              letterSpacing: "0.1em",
              color: "var(--color-text-secondary)",
            }}
          >
            [ CLICK TO FOCUS ]
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}
