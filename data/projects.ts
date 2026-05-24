// ─────────────────────────────────────────────────────────────
// data/projects.ts
// All project data for the cinematic portfolio.
// Images: placeholder paths — real WebP files to be added later.
// Links: placeholder '#' strings — to be replaced with real URLs.
// ─────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  title: string;
  oneLiner: string;
  brief: string;
  highlights: string[];
  techStack: string[];
  badge?: string;
  liveDemo: string;
  github: string;
  image: string;
  accentColor?: string;
}

export const projects: Project[] = [
  {
    id: "crisis-os",
    title: "Crisis OS",
    oneLiner: "Real-time emergency management — built for chaos.",
    brief:
      "A production-grade PWA built to coordinate emergency response across hotels and large properties in real time.",
    highlights: [
      "5 distinct user roles (Admin, Manager, Staff, Guest, Responder) with full role-based architecture",
      "Live situational dashboard using Firebase Firestore real-time listeners — no manual refresh needed",
      "Google Gemini AI converts raw field reports into severity-ranked action checklists automatically",
      "Secure serverless backend with Node.js Cloud Functions and strict Firestore Security Rules",
      "QR-code-based guest onboarding and isolated emergency handoff links for responders",
    ],
    techStack: [
      "React 18",
      "TypeScript",
      "Firebase",
      "Google Gemini AI",
      "PWA",
      "Tailwind CSS",
      "Node.js Cloud Functions",
    ],
    badge: "GDG Solution Challenge 2026 · Team Leader",
    liveDemo: "#demo-crisis-os",
    github: "#github-crisis-os",
    image: "/images/projects/crisis-os.png",
    accentColor: "#D4873A",
  },
  {
    id: "universe",
    title: "UniVerse",
    oneLiner: "A social platform where real and anonymous meet.",
    brief:
      "A full-stack social platform with AI-powered content moderation, built and shipped under hackathon conditions. Top 10 nationally.",
    highlights: [
      "Full-stack Next.js App Router application with React 19 and scalable real-time architecture",
      "Automated content moderation pipeline using Gemini AI 1.5 Flash — filters inappropriate content in anonymous posts in real time",
      "Firebase Auth + Cloud Firestore for secure, real-time data synchronization across all user roles",
      "Multi-tiered UI with dynamic global dark mode and contextual theme for anonymous interaction spaces",
      "End-to-end deployment on Vercel with optimized build pipeline",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Gemini AI 1.5 Flash",
      "Firebase",
      "Tailwind CSS v4",
      "Shadcn/UI",
      "Vercel",
    ],
    badge: "Top 10 Finalist · CodeRush Hackathon 2026",
    liveDemo: "#demo-universe",
    github: "#github-universe",
    image: "/images/projects/universe.png",
    accentColor: "#C9A84C",
  },
  {
    id: "voiceguard",
    title: "VoiceGuard",
    oneLiner: "AI that detects synthetic voices humans can't.",
    brief:
      "A hybrid AI system that identifies synthetic and deepfake audio — recognized as a Top 2% national solution among 40,000+ participants.",
    highlights: [
      "Hybrid detection pipeline: fine-tuned Wav2Vec 2.0 (XLSR-53) transformer + audio forensic algorithms",
      "Identifies synthetic voice anomalies and acoustic artifacts in real time via low-latency REST API",
      "Explainable AI (XAI) layer translates diagnostic metrics into plain-language summaries for non-technical reviewers",
      "High-performance FastAPI + Uvicorn backend with Base64-encoded audio payload support",
      "Deployed on Hugging Face Spaces with standalone public demo interface",
    ],
    techStack: [
      "Python",
      "FastAPI",
      "PyTorch",
      "Hugging Face",
      "Wav2Vec 2.0 (XLSR-53)",
      "Librosa",
      "Uvicorn",
    ],
    badge: "Top 2% · India AI Impact Buildathon · 40,000+ participants",
    liveDemo: "#demo-voiceguard",
    github: "#github-voiceguard",
    image: "/images/projects/voiceguard.png",
    accentColor: "#C4783A",
  },
  {
    id: "acadvault",
    title: "AcadVault",
    oneLiner: "Academic management, built for the people who need it.",
    brief:
      "A comprehensive academic portal for students, faculty, and admins — qualified through Smart India Hackathon's internal collegiate rounds.",
    highlights: [
      "Role-based access for three user types: students, faculty, and administrators",
      "Students manage profiles; faculty verify achievements; admins update records and generate portfolios",
      "Admin dashboard with automated data aggregation for NAAC and NIRF accreditation report generation",
      "Built and qualified through SIH 2025 internal collegiate rounds",
    ],
    techStack: ["React.js", "Tailwind CSS", "Firebase"],
    badge: "Smart India Hackathon (SIH 2025) — Internal Round Qualifier",
    liveDemo: "#demo-acadvault",
    github: "#github-acadvault",
    image: "/images/projects/acadvault.png",
    accentColor: "#5A9E6F",
  },
  {
    id: "heat-sense",
    title: "Heat Sense",
    oneLiner: "Training hotel staff to save lives — on mobile.",
    brief:
      "A mobile-first fire safety training app using scenario-based learning — built for the GDG on Campus Solution Challenge 2025.",
    highlights: [
      "Mobile-first PWA with scenario-based quizzes for fire emergency training",
      "Full-stack React upgrade from initial prototype, with Firebase backend, authentication, and role-based user journeys",
      "Admin panel for onboarding properties and managing staff profiles",
      "Built for real hospitality sector deployment",
    ],
    techStack: ["React.js", "Firebase", "JavaScript", "HTML/CSS"],
    badge: "GDG Solution Challenge 2025",
    liveDemo: "#demo-heat-sense",
    github: "#github-heat-sense",
    image: "/images/projects/heat-sense.png",
    accentColor: "#4A90B8",
  },
];
