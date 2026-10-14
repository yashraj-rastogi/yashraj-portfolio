"use client";

// ─────────────────────────────────────────────────────────────
// components/scene0/HeroScene.tsx
// Phase-based cinematic hero with two-way reversible navigation,
// interactive Bento grid with click-to-navigate, and scroll locking.
//
// PHASE SEQUENCE:
//   "hero"     → Hero text (cursor spotlight) + pre-formation Bento cells.
//                Scroll locked. First scroll-down leads to "grid".
//   "grid"     → Intermediate state: Bento cells spring into full grid.
//                PAUSES HERE indefinitely so the user can absorb the
//                chapters, hover with aurora glow, and click ANY card
//                to explore that scene.
//                Scroll UP reverses back to "hero".
//                Scroll DOWN starts the default story (zooms Chapter 01).
//   "zooming"  → Zoom overlay expands from selected card → fullscreen.
//   "fading"   → Crossfades to bg-primary.
//   "complete" → Scroll unlocked. Navbar appears. Page reveals or
//                smoothly navigates to the selected chapter.
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
type HeroPhase = "hero" | "grid" | "zooming" | "fading" | "complete";

// ── Scene cards — order: About (01), Works (02), Skills (03), Leadership (04), Achievements (05) ──
const SCENE_CELLS = [
  {
    id: "about",
    chapter: "CHAPTER 01",
    title: "The Builder",
    subtitle: "Story & Philosophy",
    gradient: "linear-gradient(145deg, #2A2118 0%, #3D2C1A 45%, #1E1A16 100%)",
    accent: "linear-gradient(45deg, rgba(212,135,58,0.3) 0%, rgba(201,168,76,0.06) 100%)",
    dot: "#D4873A",
    image: "/images/hero_builder_1779612764134.png",
  },
  {
    id: "projects",
    chapter: "CHAPTER 02",
    title: "The Works",
    subtitle: "Featured Creations",
    gradient: "linear-gradient(145deg, #1A0E1E 0%, #2C1838 50%, #110B14 100%)",
    accent: "linear-gradient(45deg, rgba(196,120,58,0.3) 0%, rgba(139,107,177,0.06) 100%)",
    dot: "#C4783A",
    image: "/images/hero_works_1779612808408.png",
  },
  {
    id: "skills",
    chapter: "CHAPTER 03",
    title: "The Arsenal",
    subtitle: "Tech Stack & Domains",
    gradient: "linear-gradient(145deg, #101822 0%, #1A2C42 50%, #0D1520 100%)",
    accent: "linear-gradient(45deg, rgba(74,144,184,0.3) 0%, rgba(90,158,111,0.06) 100%)",
    dot: "#4A90B8",
    image: "/images/hero_arsenal_1779612783262.png",
  },
  {
    id: "leadership",
    chapter: "CHAPTER 04",
    title: "Behind the Scenes",
    subtitle: "Leadership & Impact",
    gradient: "linear-gradient(145deg, #0E1A10 0%, #16281A 50%, #0A1410 100%)",
    accent: "linear-gradient(45deg, rgba(90,158,111,0.3) 0%, rgba(74,144,184,0.06) 100%)",
    dot: "#5A9E6F",
    image: "/images/hero_leadership_1779612827841.png",
  },
  {
    id: "achievements",
    chapter: "CHAPTER 05",
    title: "The Headlines",
    subtitle: "Hackathons & Press",
    gradient: "linear-gradient(145deg, #1E160E 0%, #2E200E 50%, #16100A 100%)",
    accent: "linear-gradient(45deg, rgba(201,168,76,0.3) 0%, rgba(212,135,58,0.06) 100%)",
    dot: "#C9A84C",
    image: "/images/hero_achievements_1779612867962.png",
  },
];

// ── Organic zero-gravity floating in air oscillation parameters ──
const FLOAT_CONFIGS = [
  { duration: 5.4, delay: 0.0, y: [-14, 12], rotate: [-0.9, 0.9] }, // Chapter 01 (About)
  { duration: 6.2, delay: 0.8, y: [-11, 16], rotate: [1.1, -1.0] }, // Chapter 02 (Works)
  { duration: 4.8, delay: 1.4, y: [-16, 10], rotate: [-1.2, 0.8] }, // Chapter 03 (Skills)
  { duration: 6.6, delay: 0.3, y: [-10, 14], rotate: [0.9, -1.1] }, // Chapter 04 (Leadership)
  { duration: 5.7, delay: 1.1, y: [-13, 13], rotate: [-1.0, 1.2] }, // Chapter 05 (Achievements)
];

interface HeroSceneProps {
  isOpen: boolean;
  onZoomComplete: (targetSceneId?: string) => void;
}

export default function HeroScene({ isOpen, onZoomComplete }: HeroSceneProps) {
  const { x: cursorX, y: cursorY } = useCustomCursor();
  const [phase, setPhase] = useState<HeroPhase>("hero");
  const [zoomedCellIndex, setZoomedCellIndex] = useState<number>(0);
  const [zoomRect, setZoomRect] = useState<DOMRect | null>(null);
  const [heroVisible, setHeroVisible] = useState(true);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nameTextRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const touchStartY = useRef<number | null>(null);

  // Convert viewport cursor coords to name-text-relative coords for spotlight clip-path
  const relCursor = useRelativeCursor(nameTextRef, cursorX, cursorY);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  // ── Scroll lock: active while HeroScene is open ──
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ── React to isOpen changes (reversal back from page) ──
  useEffect(() => {
    if (isOpen) {
      clearAllTimeouts();
      setHeroVisible(true);
      // Return to the formed grid intermediate state so user can immediately see cards
      setPhase((prev) => (prev === "complete" ? "grid" : prev));
      isTransitioningRef.current = true;
      const t = setTimeout(() => {
        isTransitioningRef.current = false;
      }, 400);
      timeoutsRef.current.push(t);
    } else {
      setHeroVisible(false);
    }
  }, [isOpen, clearAllTimeouts]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearAllTimeouts();
  }, [clearAllTimeouts]);

  // ── Trigger Zoom Transition into a specific card ───────────
  const triggerZoom = useCallback(
    (index: number) => {
      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;
      clearAllTimeouts();

      const el = cardRefs.current[index];
      if (el) {
        setZoomRect(el.getBoundingClientRect());
      }
      setZoomedCellIndex(index);
      setPhase("zooming");

      // → fading (after zoom overlay expands fullscreen)
      const t1 = setTimeout(() => {
        setPhase("fading");

        // → complete (after crossfade)
        const t2 = setTimeout(() => {
          setPhase("complete");
          document.documentElement.style.overflow = "";
          document.body.style.overflow = "";
          setHeroVisible(false);
          isTransitioningRef.current = false;
          onZoomComplete(SCENE_CELLS[index].id);
        }, 450);
        timeoutsRef.current.push(t2);
      }, 950);
      timeoutsRef.current.push(t1);
    },
    [clearAllTimeouts, onZoomComplete]
  );

  // ── Scroll down handler (advance) ──────────────────────────
  const handleScrollDown = useCallback(() => {
    if (isTransitioningRef.current) return;

    if (phase === "hero") {
      // First scroll: transition to intermediate bento grid and PAUSE there
      isTransitioningRef.current = true;
      setPhase("grid");
      const t = setTimeout(() => {
        isTransitioningRef.current = false;
      }, 700);
      timeoutsRef.current.push(t);
    } else if (phase === "grid") {
      // Second scroll while on grid: start story by expanding Chapter 01
      triggerZoom(0);
    }
  }, [phase, triggerZoom]);

  // ── Scroll up handler (reverse) ────────────────────────────
  const handleScrollUp = useCallback(() => {
    if (isTransitioningRef.current) return;

    if (phase === "grid") {
      // Reverse from bento grid back to initial landing text
      isTransitioningRef.current = true;
      setPhase("hero");
      const t = setTimeout(() => {
        isTransitioningRef.current = false;
      }, 600);
      timeoutsRef.current.push(t);
    }
  }, [phase]);

  // ── Click card handler ─────────────────────────────────────
  const handleCardClick = useCallback(
    (index: number) => {
      if (phase !== "grid") return;
      triggerZoom(index);
    },
    [phase, triggerZoom]
  );

  // ── Wheel, Touch, and Keyboard listeners ───────────────────
  useEffect(() => {
    if (!isOpen || (phase !== "hero" && phase !== "grid")) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 15) {
        handleScrollDown();
      } else if (e.deltaY < -15) {
        handleScrollUp();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      touchStartY.current = null;

      if (deltaY > 40) {
        // Swipe UP = scroll down
        handleScrollDown();
      } else if (deltaY < -40) {
        // Swipe DOWN = scroll up
        handleScrollUp();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        handleScrollDown();
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        handleScrollUp();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, phase, handleScrollDown, handleScrollUp]);

  const isVisible = heroVisible && (phase !== "complete" || isOpen);

  return (
    <motion.div
      aria-label="Portfolio introduction"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "var(--color-bg-primary)",
        overflow: "hidden",
        pointerEvents: isVisible && (phase === "hero" || phase === "grid") ? "auto" : "none",
        visibility: isVisible ? "visible" : "hidden",
      }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* ══════════════════════════════════════════════════════
          BENTO GRID — 5 scene cells
          hero    → scale 0.5, translateY -35% (pre-formation)
          grid    → spring-snap to grid (scale 1, translateY 0, interactive)
          zooming → non-selected cells fade; selected cell zooms fullscreen
      ══════════════════════════════════════════════════════ */}
      <div
        className={[
          "relative grid gap-3 md:gap-4",
          "h-screen w-full p-3 md:p-6 pb-20 md:pb-6",
          // Responsive Grid: 2 cols on mobile, 8 cols on desktop
          "grid-cols-2 md:grid-cols-8 grid-rows-[1.3fr_1fr_1fr] md:grid-rows-[1fr_0.5fr_0.5fr_1fr]",
          // Cell 0: large top-left
          "[&>*:nth-child(1)]:col-span-2 md:[&>*:nth-child(1)]:col-span-6 [&>*:nth-child(1)]:row-span-1 md:[&>*:nth-child(1)]:row-span-3",
          // Cell 1: top-right upper (The Works)
          "[&>*:nth-child(2)]:col-span-1 md:[&>*:nth-child(2)]:col-span-2 [&>*:nth-child(2)]:row-span-1 md:[&>*:nth-child(2)]:row-span-2",
          // Cell 2: top-right lower (The Arsenal)
          "[&>*:nth-child(3)]:col-span-1 md:[&>*:nth-child(3)]:col-span-2 [&>*:nth-child(3)]:row-span-1 md:[&>*:nth-child(3)]:row-span-2",
          // Cell 3: bottom-left (Behind the Scenes)
          "[&>*:nth-child(4)]:col-span-1 md:[&>*:nth-child(4)]:col-span-3",
          // Cell 4: bottom-right (The Headlines)
          "[&>*:nth-child(5)]:col-span-1 md:[&>*:nth-child(5)]:col-span-3",
        ].join(" ")}
        style={{
          perspective: 1200,
        }}
      >
        {SCENE_CELLS.map((cell, i) => {
          const isCurrentZoomed = i === zoomedCellIndex;

          const cellAnimate =
            phase === "hero"
              ? {
                  scale: 0.5,
                  y: "-35%",
                  opacity: 0.7,
                }
              : phase === "grid"
              ? {
                  scale: 1,
                  y: "0%",
                  opacity: 1,
                }
              : phase === "zooming" || phase === "fading"
              ? {
                  scale: 1,
                  y: "0%",
                  opacity: isCurrentZoomed ? 1 : 0,
                }
              : { opacity: 0 };

          const cellTransition =
            phase === "grid"
              ? {
                  scale: { duration: 1.0, delay: i * 0.08, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] },
                  y: { duration: 1.0, delay: i * 0.08, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] },
                  opacity: { duration: 0.5, delay: i * 0.08 },
                }
              : phase === "hero"
              ? {
                  scale: { duration: 0.7, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
                  y: { duration: 0.7, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
                  opacity: { duration: 0.4 },
                }
              : phase === "zooming"
              ? { opacity: { duration: 0.4, ease: "easeOut" } }
              : { duration: 0.3 };

          return (
            <motion.div
              key={cell.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              initial={{ scale: 0.5, y: "-35%", opacity: 0 }}
              animate={cellAnimate}
              transition={cellTransition}
              style={{
                width: "100%",
                height: "100%",
                transformOrigin: i === 0 ? "top left" : "center",
              }}
            >
              {/* ── Independent Levitating / Floating in Air Wrapper ── */}
              <motion.div
                className="w-full h-full"
                animate={
                  phase === "hero" || phase === "grid"
                    ? {
                        y: FLOAT_CONFIGS[i].y,
                        rotate: FLOAT_CONFIGS[i].rotate,
                      }
                    : { y: 0, rotate: 0 }
                }
                transition={{
                  y: {
                    duration: FLOAT_CONFIGS[i].duration,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: FLOAT_CONFIGS[i].delay,
                  },
                  rotate: {
                    duration: FLOAT_CONFIGS[i].duration * 1.15,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: FLOAT_CONFIGS[i].delay,
                  },
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  className="overflow-hidden rounded-xl relative w-full h-full cursor-pointer select-none group"
                  data-cursor="link"
                  role="button"
                  tabIndex={phase === "grid" ? 0 : -1}
                  aria-label={`Navigate to ${cell.title} (${cell.chapter})`}
                  onClick={() => handleCardClick(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleCardClick(i);
                    }
                  }}
                  whileHover={
                    phase === "grid"
                      ? {
                          scale: 1.03,
                          boxShadow: `0 0 75px ${cell.dot}45, 0 0 35px ${cell.dot}80, 0 24px 60px rgba(0,0,0,0.9)`,
                          borderColor: `${cell.dot}90`,
                          transition: { duration: 0.35, ease: "easeOut" },
                        }
                      : undefined
                  }
                  whileTap={phase === "grid" ? { scale: 0.98 } : undefined}
                  style={{
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "rgba(242, 234, 216, 0.08)",
                    boxShadow:
                      "0 18px 45px -10px rgba(0,0,0,0.85), 0 0 30px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
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
                      rest: { opacity: 0.35, scale: 1 },
                      hover: { opacity: 0.85, scale: 1.04 },
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

                {/* Subtle Grid texture */}
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

                {/* Corner indicator dot */}
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
                    opacity: 0.75,
                    boxShadow: `0 0 8px ${cell.dot}`,
                  }}
                />

                {/* Scene information */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: i === 0 ? "18px 22px" : "12px 14px",
                    background:
                      "linear-gradient(to top, rgba(13,11,9,0.92) 0%, rgba(13,11,9,0.6) 65%, transparent 100%)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: i === 0 ? "0.62rem" : "0.55rem",
                      letterSpacing: "0.22em",
                      color: cell.dot,
                      marginBottom: "0.25rem",
                      textTransform: "uppercase",
                      opacity: 0.9,
                    }}
                  >
                    {cell.chapter}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontWeight: 700,
                      fontSize: i === 0 ? "clamp(1.1rem, 2.3vw, 1.5rem)" : "clamp(0.75rem, 1.4vw, 0.95rem)",
                      color: "var(--color-text-primary)",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.2,
                    }}
                  >
                    {cell.title}
                  </div>

                  {/* Interactive cue: slides in on hover when in grid phase */}
                  <motion.div
                    variants={{
                      rest: { opacity: 0, x: -8 },
                      hover: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: 0.25 }}
                    className="hidden sm:flex items-center gap-1.5 mt-2"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.58rem",
                      letterSpacing: "0.18em",
                      color: cell.dot,
                      textTransform: "uppercase",
                    }}
                  >
                    <span>Enter Chapter</span>
                    <span style={{ fontSize: "0.72rem" }}>→</span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        );
        })}
      </div>

      {/* ══════════════════════════════════════════════════════
          HERO TEXT — cursor spotlight reveal
          Fades out during "grid" phase; fades back in on reverse
      ══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {phase === "hero" && (
          <motion.div
            key="hero-text"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
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
                  "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(13,11,9,0.88) 30%, transparent 75%)",
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
                color: "var(--color-text-secondary)",
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
                  color: "#3D3226",
                  textShadow: "0 0 60px rgba(212,135,58,0.12)",
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
                fontSize: "clamp(0.85rem, 2vw, 1.15rem)",
                letterSpacing: "0.1em",
                color: "var(--color-text-secondary)",
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
          SCROLL HINT — visible only in "hero" phase
      ══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {phase === "hero" && (
          <motion.div
            key="scroll-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
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
              cursor: "pointer",
            }}
            onClick={handleScrollDown}
            data-cursor="link"
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.75rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--color-text-secondary)",
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

      {/* ══════════════════════════════════════════════════════
          GRID CONTROL BAR — visible when paused in "grid" phase
          Allows clicking to return to Hero Intro or hints to click cards
      ══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {phase === "grid" && (
          <motion.div
            key="grid-controls"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            style={{
              position: "absolute",
              bottom: "1rem",
              left: 0,
              right: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 1.5rem",
              pointerEvents: "none",
              zIndex: 25,
            }}
          >
            {/* Return to intro button */}
            <button
              onClick={handleScrollUp}
              data-cursor="link"
              style={{
                pointerEvents: "auto",
                background: "rgba(13, 11, 9, 0.8)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(242, 234, 216, 0.15)",
                color: "var(--color-text-secondary)",
                borderRadius: "9999px",
                padding: "0.45rem 1.1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.64rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-accent-amber)";
                e.currentTarget.style.color = "var(--color-accent-amber)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(242, 234, 216, 0.15)";
                e.currentTarget.style.color = "var(--color-text-secondary)";
              }}
            >
              <span>↑</span>
              <span>Scroll up for Intro</span>
            </button>

            {/* Instruction pill */}
            <div
              style={{
                background: "rgba(13, 11, 9, 0.8)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(242, 234, 216, 0.15)",
                borderRadius: "9999px",
                padding: "0.45rem 1.1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.55rem",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-text-secondary)",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--color-accent-amber)",
                  boxShadow: "0 0 8px var(--color-accent-amber)",
                }}
              />
              <span className="hidden sm:inline">Click any chapter · Scroll down to start story</span>
              <span className="sm:hidden">Tap card to explore</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════
          ZOOM OVERLAY — expands from selected card's rect to fullscreen
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
              background: SCENE_CELLS[zoomedCellIndex]?.gradient || SCENE_CELLS[0].gradient,
            }}
            animate={{
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              borderRadius: 0,
            }}
            transition={{
              duration: 0.95,
              ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
            }}
          >
            {/* Accent inside zoom overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: SCENE_CELLS[zoomedCellIndex]?.accent || SCENE_CELLS[0].accent,
              }}
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
          Appears during "fading" phase to reveal target scene cleanly
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
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
