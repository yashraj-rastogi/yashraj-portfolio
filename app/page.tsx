"use client";

// ─────────────────────────────────────────────────────────────
// app/page.tsx
// Cinematic Portfolio orchestrator with reversible hero landing,
// interactive Bento grid navigation, and scene progression:
// Scene 1: About Me (The Builder)
// Scene 2: Projects / Works (The Works)
// Scene 3: Skills (The Arsenal)
// Scene 4: Leadership (Behind the Scenes)
// Scene 5: Achievements (The Headlines)
// Scene 6: Contact (The Closing Chapter)
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, useCallback } from "react";
import HeroScene from "@/components/scene0/HeroScene";
import Navbar from "@/components/global/Navbar";
import CustomCursor from "@/components/global/CustomCursor";
import FilmGrain from "@/components/global/FilmGrain";
import AboutScene from "@/components/scene1/AboutScene";
import ProjectsScene from "@/components/scene3/ProjectsScene";
import SkillsScene from "@/components/scene2/SkillsScene";
import LeadershipScene from "@/components/scene4/LeadershipScene";
import AchievementsScene from "@/components/scene5/AchievementsScene";
import ContactScene from "@/components/scene6/ContactScene";

export default function Home() {
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [heroActive, setHeroActive] = useState(true);
  const [activeScene, setActiveScene] = useState("about");

  // Scene refs for IntersectionObserver active tracking
  const aboutRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const leadershipRef = useRef<HTMLElement>(null);
  const achievementsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // Track active scene via IntersectionObserver
  useEffect(() => {
    const sceneRefs = [
      { id: "about", ref: aboutRef },
      { id: "projects", ref: projectsRef },
      { id: "skills", ref: skillsRef },
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
      { threshold: 0.35 }
    );

    sceneRefs.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // ── Transition completion from HeroScene ──
  const handleZoomComplete = useCallback((targetSceneId = "about") => {
    setNavbarVisible(true);
    setHeroActive(false);

    if (targetSceneId && targetSceneId !== "about") {
      requestAnimationFrame(() => {
        setTimeout(() => {
          const target = document.getElementById(targetSceneId);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }, 80);
      });
    }
  }, []);

  // ── Return to Hero / Bento Grid helper ──
  const returnToHero = useCallback(() => {
    setNavbarVisible(false);
    setHeroActive(true);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // ── Reverse to HeroScene on scroll up at top of page ──
  useEffect(() => {
    if (heroActive) return;

    let touchStartY = 0;
    let isReversing = false;

    const handleWheel = (e: WheelEvent) => {
      if (isReversing) return;
      if (window.scrollY <= 5 && e.deltaY < -20) {
        isReversing = true;
        returnToHero();
        setTimeout(() => {
          isReversing = false;
        }, 800);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isReversing) return;
      const deltaY = e.changedTouches[0].clientY - touchStartY; // swipe down has positive delta
      if (window.scrollY <= 0 && deltaY > 50) {
        isReversing = true;
        returnToHero();
        setTimeout(() => {
          isReversing = false;
        }, 800);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [heroActive, returnToHero]);

  return (
    <>
      {/* ── Global overlays ── */}
      <CustomCursor />
      <FilmGrain />
      <Navbar
        visible={navbarVisible}
        activeScene={activeScene}
        onGoToHero={returnToHero}
      />

      {/* ── Hero & Bento Grid Overlay (fixed, z-50) ──
          Features two-way reversibility, interactive chapter cards,
          and zoom-transition into selected scene. */}
      <HeroScene
        isOpen={heroActive}
        onZoomComplete={handleZoomComplete}
      />

      {/* ════════════════════════════════════════════════════════
          SCENE SECTIONS — in document flow.
          Order: About -> The Works -> Skills -> Leadership -> Achievements -> Contact
          ════════════════════════════════════════════════════════ */}

      {/* ── Scene 1: About Me (Chapter 01) ── */}
      <AboutScene ref={aboutRef} />

      {/* ── Scene 2: The Works / Projects (Chapter 02) ── */}
      <ProjectsScene ref={projectsRef} />

      {/* ── Scene 3: The Arsenal / Skills (Chapter 03) ── */}
      <SkillsScene ref={skillsRef} />

      {/* ── Scene 4: Behind the Scenes / Leadership (Chapter 04) ── */}
      <LeadershipScene ref={leadershipRef} />

      {/* ── Scene 5: The Headlines / Achievements (Chapter 05) ── */}
      <AchievementsScene ref={achievementsRef} />

      {/* ── Scene 6: The Closing Chapter / Contact (Chapter 06) ── */}
      <ContactScene ref={contactRef} />
    </>
  );
}
