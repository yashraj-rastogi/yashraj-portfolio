"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function VisualPanel() {
  const panelRef = useRef<HTMLDivElement>(null);

  // Parallax tracking relative to the viewport
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start end", "end start"],
  });

  // Smoothly translate the image vertically to create depth
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div
      ref={panelRef}
      className="relative w-full aspect-[3/4] md:aspect-[4/5] lg:aspect-[3/4] select-none"
      data-cursor="link"
    >
      {/* ── Film Frame Border ── */}
      <div
        style={{
          border: "4px solid rgba(242, 234, 216, 0.12)",
          borderRadius: "16px",
          padding: "8px",
          backgroundColor: "rgba(22, 18, 16, 0.2)",
        }}
        className="w-full h-full overflow-hidden relative backdrop-blur-sm shadow-2xl flex items-center justify-center"
      >
        {/* Inner container (masking parallax) */}
        <div className="relative w-full h-full rounded-lg overflow-hidden bg-[#1E1A16]">
          {/* Parallax Image */}
          <motion.div
            style={{
              position: "absolute",
              top: "-15%",
              left: 0,
              right: 0,
              bottom: "-15%",
              y,
            }}
            className="w-full h-[130%]"
          >
            <Image
              src="/images/hero_builder_1779612764134.png"
              alt="Yashraj Rastogi — The Builder"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-cover opacity-60 transition-opacity duration-700 hover:opacity-75"
            />
          </motion.div>

          {/* Warm cinematic amber/gold overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(13,11,9,0.7) 0%, rgba(13,11,9,0.1) 50%, rgba(212,135,58,0.05) 100%)",
              pointerEvents: "none",
            }}
          />

          {/* ── Corner Viewfinder Marks ── */}
          <div
            style={{ borderColor: "rgba(242, 234, 216, 0.2)" }}
            className="absolute top-4 left-4 w-4 h-4 border-t border-l pointer-events-none"
          />
          <div
            style={{ borderColor: "rgba(242, 234, 216, 0.2)" }}
            className="absolute top-4 right-4 w-4 h-4 border-t border-r pointer-events-none"
          />
          <div
            style={{ borderColor: "rgba(242, 234, 216, 0.2)" }}
            className="absolute bottom-4 left-4 w-4 h-4 border-b border-l pointer-events-none"
          />
          <div
            style={{ borderColor: "rgba(242, 234, 216, 0.2)" }}
            className="absolute bottom-4 right-4 w-4 h-4 border-b border-r pointer-events-none"
          />

          {/* ── Light Leak Overlay ── */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 85% 15%, rgba(212, 135, 58, 0.2) 0%, rgba(201, 168, 76, 0.05) 40%, transparent 70%)",
              pointerEvents: "none",
              mixBlendMode: "screen",
            }}
            animate={{
              opacity: [0.7, 1.0, 0.7],
              scale: [1, 1.08, 1],
              x: [0, 8, -4, 0],
              y: [0, -8, 4, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Subtle noise pattern specific to frame */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
