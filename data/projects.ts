// ─────────────────────────────────────────────────────────────
// data/projects.ts
// Featured Projects for Yashraj Rastogi's Portfolio
// ─────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  title: string;
  oneLiner: string;
  brief: string;
  outcome: string;
  highlights: string[];
  techStack: string[];
  badge?: string;
  liveDemo: string;
  github: string;
  image: string;
  video?: string;
  accentColor?: string;
}

export const projects: Project[] = [
  {
    id: "revguard",
    title: "RevGuard",
    oneLiner: "AI recovery for failed recurring payments",
    brief:
      "AI-assisted recovery loop for failed recurring payments and UPI mandate auto-debits: Ingest, Diagnose, Decide, Act, Audit, Measure. Deterministic policy engine for decisions, idempotent actions, full audit trail, tests and a reproducible evaluation dataset.",
    outcome: "Autonomous AI-assisted recovery loop for failed recurring payments & mandate debits",
    highlights: [
      "Deterministic policy engine for decisions with fully idempotent actions",
      "6-step recovery pipeline: Ingest, Diagnose, Decide, Act, Audit, and Measure",
      "Comprehensive audit trail with reproducible evaluation dataset & automated test suite",
      "Integrated Razorpay billing webhooks and Twilio customer engagement channels",
      "Google Gemini AI powers root-cause failure diagnostics and personalized customer recovery workflows",
    ],
    techStack: [
      "Python",
      "FastAPI",
      "React",
      "Firestore",
      "Google Gemini",
      "Razorpay",
      "Twilio",
    ],
    badge: "Razorpay AI Buildathon · AI Revenue Recovery Track",
    // TODO: https://revgaurd.vercel.app/ currently returns 404; replace once redeployed
    liveDemo: "https://revgaurd.vercel.app/",
    github: "https://github.com/yashraj-rastogi/RazorPayHackathon",
    image: "/images/projects/revguard.png",
    video: "/videos/projects/revguard.mp4",
    accentColor: "#D4873A",
  },
  {
    id: "voiceguard",
    title: "VoiceGuard",
    oneLiner: "AI that detects synthetic voices humans can't.",
    brief:
      "A hybrid AI system that identifies synthetic and deepfake audio — recognized as a Top 2% national solution among 40,000+ participants.",
    outcome: "Top 2% nationally among 40,000+ participants at India AI Impact Buildathon",
    highlights: [
      "Top 2% nationally among 40,000+ participants at India AI Impact Buildathon",
      "Held 5th place on the live leaderboard during the event",
      "Hybrid detection pipeline: fine-tuned Wav2Vec 2.0 (XLSR-53) transformer + audio forensic algorithms",
      "Identifies synthetic voice anomalies and acoustic artifacts in real time via low-latency REST API",
      "Explainable AI (XAI) layer translates diagnostic metrics into plain-language summaries for non-technical reviewers",
      "High-performance FastAPI + Uvicorn backend with Base64-encoded audio payload support",
    ],
    techStack: [
      "Python",
      "FastAPI",
      "PyTorch",
      "Wav2Vec 2.0",
      "Hugging Face",
    ],
    badge: "Top 2% nationally · India AI Impact Buildathon",
    liveDemo: "https://huggingface.co/spaces/Pandaisop/voice-detection-api",
    github: "https://github.com/yashraj-rastogi/voice-detection-api",
    image: "/images/projects/voiceguard.png",
    video: "/videos/projects/voiceguard.mp4",
    accentColor: "#C4783A",
  },
  {
    id: "finbuddy",
    title: "FinBuddy",
    oneLiner: "AI self-checkout + merchant copilot",
    brief:
      "Customers scan products to get an itemized bill and an exact-amount payment QR/link; a conversational merchant copilot turns transactions into insights in Hindi, Hinglish and English.",
    outcome: "Scan-to-bill self-checkout with conversational multilingual merchant voice copilot",
    highlights: [
      "Instant product scanning to generate itemized bills and exact-amount payment QR codes",
      "Conversational merchant copilot answering business insights in Hindi, Hinglish, and English",
      "ElevenLabs voice synthesis for natural, accessible conversational responses",
      "End-to-end Paytm sandbox integration for simulated real-time transactions",
      "Vite + React single-page app optimized for fast, responsive retail tablet usage",
    ],
    techStack: [
      "React",
      "TypeScript",
      "Vite",
      "Google Gemini",
      "ElevenLabs",
      "Paytm sandbox",
    ],
    // TODO: [FILL IN: Confirm whether event is Hack-e-Awadh Paytm PS-02 or CodeBlitz 2.0 AI & Automation]
    badge: "Hack-e-Awadh · Paytm PS-02",
    liveDemo: "https://fin-buddy-inky-xi.vercel.app/",
    github: "https://github.com/yashraj-rastogi/Fin-Buddy",
    image: "/images/projects/finbuddy.png",
    video: "/videos/projects/finbuddy.mp4",
    accentColor: "#4A90B8",
  },
  {
    id: "nyayapath",
    title: "NyayaPath",
    oneLiner: "Multilingual notice-to-action legal-aid assistant",
    brief:
      "Turns an uploaded government notice into a plain-language English/Hindi explanation with deadline, authority and an action plan; escalates urgent or low-confidence cases to legal-aid review; generates RTI drafts with PDF export.",
    outcome: "Plain-language notice-to-action legal assistant with automated RTI draft generation",
    highlights: [
      "Converts official government notices into clear English/Hindi explanations with deadlines and action plans",
      "Automated RTI draft generation with one-click structured PDF export",
      "Intelligent escalation of urgent or low-confidence notices to legal-aid review",
      "Voice interaction supported through Web Speech API for low-literacy citizens",
      "Modern Next.js 15 App Router architecture with Tailwind CSS styling",
    ],
    techStack: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "Google Gemini",
      "Web Speech API",
    ],
    badge: "AI for Civic & Legal Empowerment · PS-3",
    liveDemo: "https://nyayapath-rose.vercel.app/",
    github: "https://github.com/yashraj-rastogi/NyayaPath",
    image: "/images/projects/nyayapath.png",
    video: "/videos/projects/nyayapath.mp4",
    accentColor: "#5A9E6F",
  },
  {
    id: "crisis-os",
    title: "Crisis OS",
    oneLiner: "Real-time emergency management — built for chaos.",
    brief:
      "A production-grade PWA built to coordinate emergency response across hotels and large properties in real time.",
    outcome: "5-role real-time emergency management PWA submitted to GDG Solution Challenge",
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
    liveDemo: "https://crisis-os.web.app/",
    github: "https://github.com/yashraj-rastogi/Crisis-OS",
    image: "/images/projects/crisis-os.png",
    video: "/videos/projects/crisis-os.mp4",
    accentColor: "#C9A84C",
  },
  {
    id: "acadvault",
    title: "AcadVault",
    oneLiner: "Academic management, built for the people who need it.",
    brief:
      "A comprehensive academic portal for students, faculty, and admins — qualified through Smart India Hackathon's internal collegiate rounds.",
    outcome: "Qualified through Smart India Hackathon (SIH 2025) internal collegiate round",
    highlights: [
      "Role-based access for three user types: students, faculty, and administrators",
      "Students manage profiles; faculty verify achievements; admins update records and generate portfolios",
      "Admin dashboard with automated data aggregation for NAAC and NIRF accreditation report generation",
      "Built and qualified through SIH 2025 internal collegiate rounds",
    ],
    techStack: ["React.js", "Tailwind CSS", "Firebase"],
    badge: "Smart India Hackathon (SIH 2025) — Internal Round Qualifier",
    liveDemo: "https://acadvault-beta.vercel.app/",
    github: "https://github.com/yashraj-rastogi/AcadVault",
    image: "/images/projects/acadvault.png",
    video: "/videos/projects/acadvault.mp4",
    accentColor: "#8B6BB1",
  },
];
