"use client";

// ─────────────────────────────────────────────────────────────
// app/page.tsx
// HeroScene is a position:fixed overlay that covers everything.
// Scene 1–6 sections sit in the normal document flow underneath.
// When HeroScene completes its animation sequence, it fades out
// and the user is already looking at Scene 1 (scroll position = 0).
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, useCallback } from "react";
import HeroScene from "@/components/scene0/HeroScene";
import Navbar from "@/components/global/Navbar";
import CustomCursor from "@/components/global/CustomCursor";
import FilmGrain from "@/components/global/FilmGrain";
import AboutScene from "@/components/scene1/AboutScene";
import SkillsScene from "@/components/scene2/SkillsScene";
import ProjectsScene from "@/components/scene3/ProjectsScene";
import LeadershipScene from "@/components/scene4/LeadershipScene";

export default function Home() {
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [activeScene, setActiveScene] = useState("about");

  // Scene refs for IntersectionObserver active tracking
  const aboutRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const leadershipRef = useRef<HTMLElement>(null);
  const achievementsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // Track active scene via IntersectionObserver
  useEffect(() => {
    const sceneRefs = [
      { id: "about", ref: aboutRef },
      { id: "skills", ref: skillsRef },
      { id: "projects", ref: projectsRef },
      { id: "leadership", ref: leadershipRef },
      { id: "achievements", ref: achievementsRef },
      { id: "contact", ref: contactRef },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveScene(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    sceneRefs.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const handleZoomComplete = useCallback(() => {
    setNavbarVisible(true);
  }, []);

  return (
    <>
      {/* ── Global overlays ── */}
      <CustomCursor />
      <FilmGrain />
      <Navbar visible={navbarVisible} activeScene={activeScene} />

      {/* ── Hero Intro Overlay (fixed, z-50) ──
          Plays its full phase sequence, then fades to reveal scenes below.
          Does NOT occupy space in the document flow. */}
      <HeroScene onZoomComplete={handleZoomComplete} />

      {/* ════════════════════════════════════════════════════════
          SCENE SECTIONS — in normal document flow.
          Scene 1 is at scroll position 0 and is immediately
          revealed when the HeroScene overlay fades out.
          ════════════════════════════════════════════════════════ */}

      {/* ── Scene 1: About Me ── */}
      <AboutScene ref={aboutRef} />

      {/* ── Scene 2: Skills ── */}
      <SkillsScene ref={skillsRef} />

      {/* ── Scene 3: Projects ── */}
      <ProjectsScene ref={projectsRef} />

      {/* ── Scene 4: Leadership ── (Phase 5) */}
      <LeadershipScene ref={leadershipRef} />

      {/* ── Scene 5: Achievements ── (Phase 6) */}
      <section
        ref={achievementsRef}
        id="achievements"
        style={{
          minHeight: "100vh",
          background: "var(--color-bg-primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "1.5rem",
          padding: "4rem 2rem",
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            color: "#C9A84C",
            textTransform: "uppercase",
          }}
        >
          Chapter 05
        </div>
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            color: "var(--color-text-primary)",
            textAlign: "center",
            letterSpacing: "-0.02em",
          }}
        >
          The Headlines
        </p>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "var(--color-text-muted)",
            fontSize: "0.85rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Scene 5 · Achievements — Coming in Phase 6
        </p>
      </section>

      {/* ── Scene 6: Contact ── (Phase 7) */}
      <section
        ref={contactRef}
        id="contact"
        style={{
          minHeight: "100vh",
          background: "var(--color-bg-secondary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "1.5rem",
          padding: "4rem 2rem",
        }}
      >
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "var(--color-text-muted)",
            fontSize: "0.85rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Scene 6 · Contact — Coming in Phase 7
        </p>
      </section>
    </>
  );
}
