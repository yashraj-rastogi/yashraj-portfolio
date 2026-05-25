"use client";

// ─────────────────────────────────────────────────────────────
// components/scene5/CertStrip.tsx
// Renders certifications flat on the page like vintage broadsheet Classified columns
// ─────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import { type Certification } from "@/data/achievements";

interface CertStripProps {
  certifications: Certification[];
}

export default function CertStrip({ certifications }: CertStripProps) {
  // Staggered reveal variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const adVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number],
      },
    },
  };

  return (
    <div className="w-full select-none mt-20 md:mt-28">
      {/* Broad-sheet Classified Banner Label (flat double border) */}
      <div className="w-full flex items-center justify-between mb-8 select-none pointer-events-none">
        <div className="h-[2px] bg-[#0D0B09]/20 flex-grow" />
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.75rem",
            fontWeight: "bold",
            color: "#0D0B09",
            letterSpacing: "0.2em",
          }}
          className="uppercase px-4 flex-shrink-0"
        >
          ✦ THE GAZETTE CLASSIFIED ADS ✦
        </span>
        <div className="h-[2px] bg-[#0D0B09]/20 flex-grow" />
      </div>

      {/* Flat notice container directly on the cream paper */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="w-full relative py-2"
      >
        {/* 3-Column Classified Notice Grid with vertical dividers only */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-dashed divide-[#0D0B09]/20">
          {certifications.slice(0, 3).map((cert, idx) => {
            const adIndex = idx + 1 < 10 ? `NO. 0${idx + 1}` : `NO. ${idx + 1}`;
            return (
              <motion.div
                key={idx}
                variants={adVariants}
                className="flex flex-col items-center md:items-start text-center md:text-left px-0 md:px-10 first:pl-0 last:pr-0 pt-6 md:pt-0 first:pt-0"
              >
                {/* Ad Index Label */}
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6rem",
                    color: "var(--color-accent-amber)",
                    letterSpacing: "0.15em",
                    fontWeight: "bold",
                  }}
                  className="mb-2 block uppercase"
                >
                  {adIndex} · OFFICIAL REGISTRY
                </span>

                {/* Certification Title */}
                <h4
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 700,
                    fontSize: "1.2rem",
                    color: "#0D0B09",
                    lineHeight: "1.25",
                  }}
                  className="mb-2 uppercase tracking-tight font-bold"
                >
                  {cert.name}
                </h4>

                {/* Organization Details */}
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.85rem",
                    color: "#6B5C4A",
                    lineHeight: "1.5",
                  }}
                  className="font-light mb-4"
                >
                  Credential issued in recognition of competence by the board at <span className="font-semibold text-[#0D0B09]">{cert.issuer}</span>.
                </p>

                {/* Year stamp and Verification Link container */}
                <div className="w-full mt-auto pt-4 flex flex-col items-center md:items-start gap-3">
                  <div className="w-12 h-[1px] bg-[#0D0B09]/20" />
                  
                  <a
                    href={`#credential-cert-${cert.name.toLowerCase().replace(/\s+/g, "-")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.7rem",
                      letterSpacing: "0.05em",
                      color: "var(--color-accent-amber)",
                    }}
                    className="font-bold inline-flex items-center gap-1 hover:underline select-none no-underline transition-all duration-300"
                    data-cursor="link"
                  >
                    VERIFY ORIGINAL PRESS RELEASE <span className="text-[8px]">↗</span>
                  </a>

                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.65rem",
                      color: "#6B5C4A",
                      borderColor: "rgba(13, 11, 9, 0.2)",
                    }}
                    className="border px-2 py-0.5 rounded-sm uppercase select-none font-medium"
                  >
                    YEAR OF ACCRED: {cert.year}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Visual bottom border finishing the classifieds block */}
      <div className="w-full h-[2px] bg-[#0D0B09]/20 mt-12" />
    </div>
  );
}
