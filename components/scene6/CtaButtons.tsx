"use client";

// ─────────────────────────────────────────────────────────────
// components/scene6/CtaButtons.tsx
// Renders the horizontal row of premium CTA pill buttons for Contact Scene
// ─────────────────────────────────────────────────────────────

import { motion } from "framer-motion";

export default function CtaButtons() {
  const buttonsData = [
    {
      label: "Email Me",
      href: "mailto:yashrajrastogi7@gmail.com",
      icon: "📧",
      download: false,
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/yashraj-rastogi",
      icon: "💼",
      download: false,
    },
    {
      label: "GitHub",
      href: "https://github.com/yashraj-rastogi",
      icon: "🐙",
      download: false,
    },
    {
      label: "Download Resume",
      href: "/Yashraj_Rastogi_Resume.pdf",
      icon: "📄",
      download: true,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const buttonVariants = {
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
    <motion.div
      variants={containerVariants}
      className="flex flex-wrap items-center justify-center gap-4 md:gap-6 w-full max-w-3xl px-4 py-8"
      role="list"
    >
      {buttonsData.map((btn, idx) => {
        const isExternal = btn.href.startsWith("http");
        return (
          <motion.div
            key={idx}
            variants={buttonVariants}
            role="listitem"
          >
            <motion.a
              href={btn.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              download={btn.download ? "Yashraj_Rastogi_Resume.pdf" : undefined}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.8rem",
                letterSpacing: "0.08em",
                color: "var(--color-accent-amber)",
                borderColor: "rgba(212, 135, 58, 0.4)",
                background: "transparent",
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-solid select-none no-underline transition-all duration-300 hover:bg-[var(--color-accent-amber)] hover:text-[#0D0B09] hover:border-[var(--color-accent-amber)]"
              data-cursor="link"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-sm select-none">{btn.icon}</span>
              <span className="font-semibold uppercase">{btn.label}</span>
            </motion.a>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
