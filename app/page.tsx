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
import AchievementsScene from "@/components/scene5/AchievementsScene";
import ContactScene from "@/components/scene6/ContactScene";

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
      <AchievementsScene ref={achievementsRef} />

      {/* ── Scene 6: Contact ── (Phase 7) */}
      <ContactScene ref={contactRef} />
    </>
  );
}
