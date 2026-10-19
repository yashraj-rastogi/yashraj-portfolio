"use client";

// ─────────────────────────────────────────────────────────────
// components/scene5/GoogleBadgesRegistry.tsx
// Newspaper-themed registry strip for Google Skills Badges
// Verified via Credly lab completions
// ─────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import Image from "next/image";
import { googleBadges, credlyProfileUrl } from "@/data/badges";

export default function GoogleBadgesRegistry() {
  return (
    <div className="w-full mt-16 pt-10 border-t-2 border-[#0D0B09]/20 relative z-20">
      {/* Registry Header */}
      <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              color: "var(--color-accent-amber)",
            }}
            className="uppercase font-bold block mb-1"
          >
            [ OFFICIAL REGISTRY · 20 BADGES ]
          </span>
          <h4
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 800,
              fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
              color: "#0D0B09",
              letterSpacing: "-0.01em",
            }}
            className="uppercase"
          >
            Google Skills Badges
          </h4>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.68rem",
              letterSpacing: "0.1em",
              color: "#4A3D2E",
            }}
            className="uppercase italic m-0"
          >
            Completed via hands-on Google Skills labs
          </p>
          <a
            href={credlyProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              color: "var(--color-accent-amber)",
              borderColor: "rgba(212, 135, 58, 0.4)",
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded border hover:bg-[var(--color-accent-amber)] hover:text-[#0D0B09] transition-all font-semibold uppercase no-underline"
            data-cursor="link"
          >
            <span>Credly Profile</span>
            <span>↗</span>
          </a>
        </div>
      </div>

      {/* Badges Grid or Placeholder */}
      {googleBadges.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full">
          {googleBadges.map((badge) => (
            <motion.a
              key={badge.name}
              href={badge.credlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              className="flex flex-col items-center text-center p-4 bg-[#EDE3D0]/80 border border-[#0D0B09]/15 rounded-lg hover:border-[var(--color-accent-amber)] transition-colors duration-300 no-underline group"
              data-cursor="link"
              aria-label={`View Credly verification for ${badge.name}`}
            >
              <div className="relative w-16 h-16 mb-3 flex-shrink-0">
                <Image
                  src={badge.image}
                  alt={`${badge.name} badge credential issued by ${badge.issuer}`}
                  fill
                  sizes="64px"
                  className="object-contain filter group-hover:drop-shadow-[0_4px_12px_rgba(212,135,58,0.4)] transition-all"
                />
              </div>

              <span
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  color: "#0D0B09",
                  lineHeight: 1.25,
                }}
                className="mb-1 line-clamp-2"
              >
                {badge.name}
              </span>

              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.62rem",
                  color: "#5C4D3C",
                  letterSpacing: "0.05em",
                }}
                className="mt-auto block uppercase"
              >
                {badge.issuer} · {badge.issuedDate}
              </span>

              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6rem",
                  color: "var(--color-accent-amber)",
                }}
                className="mt-1 font-bold inline-flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                VERIFY ↗
              </span>
            </motion.a>
          ))}
        </div>
      ) : (
        <div className="w-full py-6 px-4 border border-dashed border-[#0D0B09]/20 rounded-lg text-center bg-[#EDE3D0]/40">
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.72rem",
              letterSpacing: "0.15em",
              color: "#5C4D3C",
            }}
            className="uppercase"
          >
            [ Registry Ledger · Ready for Credly verification links in data/badges.ts ]
          </p>
        </div>
      )}
    </div>
  );
}
