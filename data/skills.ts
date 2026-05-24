// ─────────────────────────────────────────────────────────────
// data/skills.ts
// Skill categories with orb colors from Design Spec §2
// ─────────────────────────────────────────────────────────────

export interface SkillCategory {
  id: string;
  label: string;
  color: string;      // CSS hex — used for cluster label + orb tint
  orbColor: string;   // Slightly lighter variant for orb border/glow
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    color: "#4A90B8",
    orbColor: "#5BA3CC",
    skills: [
      "React.js (v18/v19)",
      "Next.js",
      "Tailwind CSS v4",
      "TypeScript",
      "HTML5",
      "Progressive Web Apps",
    ],
  },
  {
    id: "backend",
    label: "Backend",
    color: "#5A9E6F",
    orbColor: "#6BB580",
    skills: [
      "Node.js",
      "Express.js",
      "Django",
      "FastAPI",
      "Cloud Functions",
    ],
  },
  {
    id: "ai-ml",
    label: "AI / ML",
    color: "#C4783A",
    orbColor: "#D4873A",
    skills: [
      "Google Gemini AI",
      "PyTorch",
      "Hugging Face",
      "Wav2Vec 2.0",
      "Librosa",
      "Explainable AI",
    ],
  },
  {
    id: "tools-db",
    label: "Tools & DB",
    color: "#8B6BB1",
    orbColor: "#9E7EC8",
    skills: [
      "Firebase",
      "MongoDB",
      "Vercel",
      "Git",
      "GitHub",
      "Figma",
      "Canva",
      "Postman",
      "Vite",
    ],
  },
];
