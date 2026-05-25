"use client";

import { motion } from "framer-motion";

function FloatingPaths({ position, strokeColor }: { position: number; strokeColor: string }) {
  const paths = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.6 + i * 0.02,
    opacity: 0.08 + i * 0.01, // Increased baseline and scaling opacity for clear visual presence
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-0 w-full h-full">
      <svg
        className="w-full h-full opacity-300" // Set full opacity to allow exact stroke settings
        viewBox="0 0 696 616"
        fill="none"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "100%" }}
      >
        <title>Cinematic Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke={strokeColor}
            strokeWidth={path.width}
            strokeOpacity={path.opacity}
            initial={{ pathLength: 0.2, opacity: path.opacity * 0.5 }}
            animate={{
              pathLength: [0.2, 0.9, 0.2],
              opacity: [path.opacity * 0.6, path.opacity * 1.5, path.opacity * 0.6],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.abs(Math.sin(path.id + 1)) * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function BackgroundPaths({
  strokeColor = "#D4873A", // Hardcoded warm amber hex fallback
}: {
  strokeColor?: string;
}) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
      <FloatingPaths position={1} strokeColor={strokeColor} />
      <FloatingPaths position={-1} strokeColor={strokeColor} />
    </div>
  );
}
