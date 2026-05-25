"use client";

// ─────────────────────────────────────────────────────────────
// components/scene0/HeroScene.tsx
// Phase-based cinematic hero with scroll locking.
//
// PHASE SEQUENCE:
//   "hero"    → Hero text (cursor spotlight) + pre-formation Bento cells
//               Scroll is LOCKED. Listening for first scroll event.
//   "forming" → First scroll detected. Bento cells spring into grid.
//               Hero text fades out. Still LOCKED.
//   "zooming" → Grid formed. Zoom overlay expands from Cell 0 → fullscreen.
//               Still LOCKED.
//   "fading"  → Zoom overlay crossfades to bg-primary. Still LOCKED.
//   "complete"→ HeroScene fades out. Scroll UNLOCKED. Navbar appears.
//               Scene 1 is revealed underneath.
//
// Each Bento cell represents one scene (Chapter 01–05).
// Cell 0 (large, top-left) = Scene 1 / About Me — zoomed into on transition.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCustomCursor } from "@/hooks/useCustomCursor";

/**
 * Converts viewport cursor coordinates to coordinates relative to an element.
 * clip-path circle() uses element-local coordinates, not viewport ones.
 */
function useRelativeCursor(
  elementRef: React.RefObject<HTMLElement | null>,
  viewportX: number,
  viewportY: number
) {
  const [rel, setRel] = useState({ x: -9999, y: -9999 });

  useEffect(() => {
    if (!elementRef.current) return;
    const rect = elementRef.current.getBoundingClientRect();
    setRel({
      x: viewportX - rect.left,
      y: viewportY - rect.top,
    });
  }, [viewportX, viewportY, elementRef]);

  return rel;
}

// ── Phase type ────────────────────────────────────────────────
type HeroPhase = "hero" | "forming" | "zooming" | "fading" | "complete";

// ── Scene cards — each cell maps to one scene in the portfolio ──
const SCENE_CELLS = [
  {
    id: "about",
    chapter: "CHAPTER 01",
    title: "The Builder",
    gradient: "linear-gradient(145deg, #2A2118 0%, #3D2C1A 45%, #1E1A16 100%)",
    accent: "linear-gradient(45deg, rgba(212,135,58,0.3) 0%, rgba(201,168,76,0.06) 100%)",
    dot: "#D4873A",
    image: "/images/hero_builder_1779612764134.png",
  },
  {
    id: "skills",
    chapter: "CHAPTER 02",
    title: "The Arsenal",
    gradient: "linear-gradient(145deg, #101822 0%, #1A2C42 50%, #0D1520 100%)",
    accent: "linear-gradient(45deg, rgba(74,144,184,0.3) 0%, rgba(90,158,111,0.06) 100%)",
    dot: "#4A90B8",
    image: "/images/hero_arsenal_1779612783262.png",
  },
  {
    id: "projects",
    chapter: "CHAPTER 03",
    title: "The Works",
    gradient: "linear-gradient(145deg, #1A0E1E 0%, #2C1838 50%, #110B14 100%)",
    accent: "linear-gradient(45deg, rgba(196,120,58,0.3) 0%, rgba(139,107,177,0.06) 100%)",
    dot: "#C4783A",
    image: "/images/hero_works_1779612808408.png",
  },
  {
    id: "leadership",
    chapter: "CHAPTER 04",
    title: "Behind the Scenes",
    gradient: "linear-gradient(145deg, #0E1A10 0%, #16281A 50%, #0A1410 100%)",
    accent: "linear-gradient(45deg, rgba(90,158,111,0.3) 0%, rgba(74,144,184,0.06) 100%)",
    dot: "#5A9E6F",
    image: "/images/hero_leadership_1779612827841.png",
  },
  {
    id: "achievements",
    chapter: "CHAPTER 05",
    title: "The Headlines",
    gradient: "linear-gradient(145deg, #1E160E 0%, #2E200E 50%, #16100A 100%)",
    accent: "linear-gradient(45deg, rgba(201,168,76,0.3) 0%, rgba(212,135,58,0.06) 100%)",
    dot: "#C9A84C",
    image: "/images/hero_achievements_1779612867962.png",
  },
];

// ── Cell initial (pre-formation) vs formed state ──────────────
// Pre-formation: cells scaled down 0.5x, pushed up via translateY
// Formation: cells snap to natural grid position (scale 1, translate 0)

interface HeroSceneProps {
  onZoomComplete: () => void;
}

export default function HeroScene({ onZoomComplete }: HeroSceneProps) {
  const { x: cursorX, y: cursorY } = useCustomCursor();
  const [phase, setPhase] = useState<HeroPhase>("hero");
  const [zoomRect, setZoomRect] = useState<DOMRect | null>(null);
  const [heroVisible, setHeroVisible] = useState(true);

  const cell0Ref = useRef<HTMLDivElement>(null);
  const nameTextRef = useRef<HTMLDivElement>(null);
  const hasTriggered = useRef(false);

  // Convert viewport cursor coords to name-text-relative coords for clip-path
  const relCursor = useRelativeCursor(nameTextRef, cursorX, cursorY);

  // ── Scroll lock: applied immediately on mount ──
  useEffect(() => {
    const original = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = original;
      document.body.style.overflow = "";
    };
  }, []);

  // ── Phase sequence controller ──────────────────────────────
  const startSequence = useCallback(() => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;

    // → forming
    setPhase("forming");

    // → zooming (after cells finish snapping into grid + a cinematic pause)
    // Last cell delay = 4 × 120ms = 480ms, animation = 1.2s → ~1.7s
    // + 1.5s pause to let the grid "breathe" = 3.2s total
    setTimeout(() => {
      // Capture Cell 0's bounding rect right before zoom
      if (cell0Ref.current) {
        setZoomRect(cell0Ref.current.getBoundingClientRect());
      }
      setPhase("zooming");

      // → fading (after zoom overlay fills screen) = 1800ms
      setTimeout(() => {
        setPhase("fading");

        // → complete (after crossfade) = 600ms
        setTimeout(() => {
          setPhase("complete");
          // Unlock scroll
          document.documentElement.style.overflow = "";
          document.body.style.overflow = "";
          // Fade out HeroScene itself
          setHeroVisible(false);
          onZoomComplete();
        }, 600);
      }, 1800);
    }, 3200);
  }, [onZoomComplete]);

  // ── Listen for first scroll / wheel / touch / key ──────────
  useEffect(() => {
    const opts: AddEventListenerOptions = { passive: true };
    const handle = () => startSequence();
    window.addEventListener("wheel", handle, opts);
    window.addEventListener("touchstart", handle, opts);
    window.addEventListener("keydown", handle, opts);
    return () => {
      window.removeEventListener("wheel", handle);
      window.removeEventListener("touchstart", handle);
      window.removeEventListener("keydown", handle);
    };
  }, [startSequence]);

  // ── HeroScene fully gone → remove from DOM ────────────────
  if (phase === "complete" && !heroVisible) return null;

  return (
    <motion.div
      aria-label="Portfolio introduction"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "var(--color-bg-primary)",
        overflow: "hidden",
      }}
      animate={{ opacity: heroVisible ? 1 : 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >

      {/* ══════════════════════════════════════════════════════
          BENTO GRID — 5 scene cells, sticky fullscreen
          Driven by phase:
            hero    → scale 0.5, translateY -35% (pre-formation)
            forming → spring-snap to grid (scale 1, translateY 0)
            zooming → cells 1–4 fade; cell 0 stays for zoom overlay
      ══════════════════════════════════════════════════════ */}
      <div
        className={[
          "relative grid gap-3 md:gap-4",
          "h-screen w-full p-3 md:p-4",
          // Bento grid layout (matches reference component "default" variant)
          "grid-cols-8 grid-rows-[1fr_0.5fr_0.5fr_1fr]",
          // Cell 0: large top-left
          "[&>*:nth-child(1)]:col-span-8 md:[&>*:nth-child(1)]:col-span-6 [&>*:nth-child(1)]:row-span-3",
          // Cell 1: top-right upper (hidden on mobile)
          "[&>*:nth-child(2)]:col-span-2 md:[&>*:nth-child(2)]:row-span-2 [&>*:nth-child(2)]:hidden md:[&>*:nth-child(2)]:block",
          // Cell 2: top-right lower (hidden on mobile)
          "[&>*:nth-child(3)]:col-span-2 md:[&>*:nth-child(3)]:row-span-2 [&>*:nth-child(3)]:hidden md:[&>*:nth-child(3)]:block",
          // Cell 3: bottom-left
          "[&>*:nth-child(4)]:col-span-4 md:[&>*:nth-child(4)]:col-span-3",
          // Cell 4: bottom-right
          "[&>*:nth-child(5)]:col-span-4 md:[&>*:nth-child(5)]:col-span-3",
        ].join(" ")}
      >
        {SCENE_CELLS.map((cell, i) => {
          const isZoomTarget = i === 0;

          // Per-cell animation values
          const cellAnimate =
            phase === "hero"
              ? {
                  scale: 0.5,
                  y: "-35%",
                  opacity: 0.7,
                }
              : phase === "forming"
              ? {
                  scale: 1,
                  y: "0%",
                  opacity: 1,
                }
              : phase === "zooming" || phase === "fading"
              ? {
                  scale: 1,
                  y: "0%",
                  opacity: isZoomTarget ? 1 : 0,
                }
              : { opacity: 0 };

          const cellTransition =
            phase === "forming"
              ? {
                  scale: { duration: 1.2, delay: i * 0.12, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] },
                  y: { duration: 1.2, delay: i * 0.12, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] },
                  opacity: { duration: 0.6, delay: i * 0.12 },
                }
              : phase === "zooming"
              ? { opacity: { duration: 0.5, ease: "easeOut" } }
              : { duration: 0.3 };

          return (
            <motion.div
              key={cell.id}
              ref={isZoomTarget ? cell0Ref : undefined}
              initial={{ scale: 0.5, y: "-35%", opacity: 0 }}
              animate={cellAnimate}
              transition={cellTransition}
              style={{
                width: "100%",
                height: "100%",
                transformOrigin: i === 0 ? "top left" : "center",
              }}
            >
              <motion.div
                className="overflow-hidden rounded-xl relative w-full h-full cursor-pointer"
                initial="rest"
                whileHover="hover"
                animate={
                  phase === "hero" || phase === "forming" || phase === "zooming"
                    ? { y: [0, -8, 0] }
                    : { y: 0 }
                }
                transition={{
                  y: {
                    duration: 4 + (i % 3), // stagger floating speed
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                variants={{
                  rest: {
                    scale: 1,
                    boxShadow: "0 4px 40px rgba(0,0,0,0.75), 0 0 0 1px rgba(242,234,216,0.05)",
                  },
                  hover: {
                    scale: 1.03,
                    y: 0, // stop floating and snap back to center smoothly
                    boxShadow: `0 0 80px ${cell.dot}40, 0 0 40px ${cell.dot}80`, // Aurora glow
                    transition: { duration: 0.4, ease: "easeOut" },
                  },
                }}
              >
                {/* Base gradient */}
                <div
                  style={{ position: "absolute", inset: 0, background: cell.gradient }}
                />
                {/* Background Image */}
                {cell.image && (
                  <motion.div
                    variants={{
                      rest: { opacity: 0.4 }, // Dimmed normally
                      hover: { opacity: 0.8 }, // Brightened on hover
                    }}
                    transition={{ duration: 0.4 }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: `url(${cell.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      mixBlendMode: "overlay",
                    }}
                  />
                )}
                {/* Accent overlay */}
                <div
                  style={{ position: "absolute", inset: 0, background: cell.accent }}
                />
                {/* Grid texture */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(242,234,216,0.025) 40px), " +
                      "repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(242,234,216,0.025) 40px)",
                  }}
                />
                {/* Scene info */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: i === 0 ? "20px 22px" : "12px 14px",
                    background:
                      "linear-gradient(to top, rgba(13,11,9,0.9) 0%, transparent 100%)",
                  }}
                >
                  <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: i === 0 ? "0.6rem" : "0.55rem",
                    letterSpacing: "0.25em",
                    color: cell.dot,
                    marginBottom: "0.3rem",
                    textTransform: "uppercase" as const,
                    opacity: 0.85,
                  }}
                >
                  {cell.chapter}
                </div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 700,
                    fontSize: i === 0 ? "clamp(1rem, 2.2vw, 1.4rem)" : "clamp(0.7rem, 1.4vw, 0.9rem)",
                    color: "var(--color-text-primary)",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.2,
                  }}
                >
                  {cell.title}
                </div>
              </div>
              {/* Corner dot */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: cell.dot,
                  opacity: 0.7,
                  boxShadow: `0 0 8px ${cell.dot}`,
                }}
              />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* ══════════════════════════════════════════════════════
          HERO TEXT — cursor spotlight reveal
          Fades out during "forming" phase
      ══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {(phase === "hero" || phase === "forming") && (
          <motion.div
            key="hero-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "hero" ? 1 : 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: phase === "forming" ? 0.35 : 0.8 }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 20,
              pointerEvents: "none",
            }}
          >
            {/* Radial glow behind text */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(13,11,9,0.85) 30%, transparent 75%)",
                pointerEvents: "none",
              }}
            />

            {/* Micro label */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "clamp(0.6rem, 1vw, 0.72rem)",
                letterSpacing: "0.3em",
                color: "var(--color-text-muted)",
                marginBottom: "1.25rem",
                textTransform: "uppercase",
              }}
            >
               LUCKNOW, INDIA
            </div>

            {/* Name — dual-layer cursor mask */}
            <div
              ref={nameTextRef}
              style={{ position: "relative", zIndex: 1, textAlign: "center", pointerEvents: "auto" }}
              data-cursor="text"
            >
              {/* Dark base (always faintly visible) */}
              <div
                aria-hidden="true"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 900,
                  fontSize: "var(--text-hero)",
                  letterSpacing: "-0.02em",
                  lineHeight: 0.92,
                  color: "#1C1610",
                  userSelect: "none",
                  whiteSpace: "nowrap",
                }}
              >
                <div>YASHRAJ</div>
                <div>RASTOGI</div>
              </div>

              {/* Cream revealed layer — clipped to cursor circle */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 900,
                  fontSize: "var(--text-hero)",
                  letterSpacing: "-0.02em",
                  lineHeight: 0.92,
                  color: "var(--color-text-primary)",
                  userSelect: "none",
                  whiteSpace: "nowrap",
                  clipPath: `circle(65px at ${relCursor.x}px ${relCursor.y}px)`,
                  textShadow: "0 0 80px rgba(212,135,58,0.5)",
                }}
              >
                <div>YASHRAJ</div>
                <div>RASTOGI</div>
              </div>
            </div>

            {/* Subtitle */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: "clamp(0.75rem, 1.8vw, 1rem)",
                letterSpacing: "0.1em",
                color: "var(--color-text-muted)",
                marginTop: "1.5rem",
                textAlign: "center",
              }}
            >
              Full-Stack Developer · AI Builder · Design Thinker
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════
          ZOOM OVERLAY — Cell 0's rect → fullscreen
          Appears when phase === "zooming"
      ══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {phase === "zooming" && zoomRect && (
          <motion.div
            key="zoom-overlay"
            style={{
              position: "fixed",
              zIndex: 30,
              borderRadius: 12,
              overflow: "hidden",
              top: zoomRect.top,
              left: zoomRect.left,
              width: zoomRect.width,
              height: zoomRect.height,
              background: SCENE_CELLS[0].gradient,
            }}
            animate={{
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              borderRadius: 0,
            }}
            transition={{
              duration: 1.7,
              ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
            }}
          >
            {/* Accent inside zoom overlay */}
            <div
              style={{ position: "absolute", inset: 0, background: SCENE_CELLS[0].accent }}
            />
            {/* Grid texture */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(242,234,216,0.025) 40px), " +
                  "repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(242,234,216,0.025) 40px)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════
          CROSSFADE OVERLAY — zooming → bg-primary
          Appears during "fading" phase to bridge to Scene 1
      ══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {(phase === "fading" || phase === "complete") && (
          <motion.div
            key="crossfade"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 40,
              background: "var(--color-bg-primary)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          />
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════
          SCROLL HINT — visible only in hero phase
      ══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {phase === "hero" && (
          <motion.div
            key="scroll-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            style={{
              position: "absolute",
              bottom: "2.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 25,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--color-text-muted)",
              }}
            >
              scroll to explore
            </span>
            <motion.div
              style={{
                width: 1,
                height: 28,
                background:
                  "linear-gradient(to bottom, transparent, var(--color-accent-amber))",
                borderRadius: 1,
                originY: 0,
              }}
              animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
