"use client";

// ─────────────────────────────────────────────────────────────
// components/global/Navbar.tsx
// Fixed navigation bar. Hidden until Scene 0 zoom completes.
// Tracks active scene and highlights current nav link.
// Mobile: hamburger menu with slide-down drawer.
// ─────────────────────────────────────────────────────────────

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  visible: boolean;
  activeScene: string;
}

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Leadership", href: "#leadership" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ visible, activeScene }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMobileOpen(false);
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          className="navbar"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
          style={{ pointerEvents: visible ? "auto" : "none" }}
          role="navigation"
          aria-label="Main navigation"
        >
          {/* ── Logo / Monogram ── */}
          <motion.a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-display"
            style={{
              fontSize: "1.4rem",
              fontWeight: 900,
              color: "var(--color-accent-amber)",
              textDecoration: "none",
              letterSpacing: "-0.02em",
            }}
            data-cursor="link"
            whileHover={{ opacity: 0.8 }}
            aria-label="Yashraj Rastogi — Home"
          >
            YR
          </motion.a>

          {/* ── Desktop Links ── */}
          <div
            className="hidden md:flex items-center gap-8"
            role="list"
          >
            {navLinks.map(({ label, href }) => {
              const sceneId = href.replace("#", "");
              const isActive = activeScene === sceneId;
              return (
                <motion.a
                  key={href}
                  href={href}
                  onClick={(e) => handleLinkClick(e, href)}
                  className={`nav-link ${isActive ? "active" : ""}`}
                  data-cursor="link"
                  whileHover={{ y: -1 }}
                  role="listitem"
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                </motion.a>
              );
            })}
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            style={{ background: "none", border: "none" }}
          >
            <motion.span
              style={{
                display: "block",
                width: 24,
                height: 1.5,
                background: "var(--color-text-secondary)",
                transformOrigin: "center",
              }}
              animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 6 : 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              style={{
                display: "block",
                width: 24,
                height: 1.5,
                background: "var(--color-text-secondary)",
              }}
              animate={{ opacity: mobileOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              style={{
                display: "block",
                width: 24,
                height: 1.5,
                background: "var(--color-text-secondary)",
                transformOrigin: "center",
              }}
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -6 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </motion.nav>
      )}

      {/* ── Mobile Drawer ── */}
      {visible && mobileOpen && (
        <motion.div
          key="mobile-drawer"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
          style={{
            position: "fixed",
            top: "64px",
            left: 0,
            right: 0,
            zIndex: 999,
            background: "rgba(13, 11, 9, 0.95)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid var(--color-border)",
            overflow: "hidden",
          }}
          role="menu"
        >
          <div className="flex flex-col py-4">
            {navLinks.map(({ label, href }, i) => {
              const sceneId = href.replace("#", "");
              const isActive = activeScene === sceneId;
              return (
                <motion.a
                  key={href}
                  href={href}
                  onClick={(e) => handleLinkClick(e, href)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    display: "block",
                    padding: "12px 32px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.85rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: isActive
                      ? "var(--color-accent-amber)"
                      : "var(--color-text-secondary)",
                    textDecoration: "none",
                  }}
                  role="menuitem"
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
