// ─────────────────────────────────────────────────────────────
// data/achievements.ts
// Achievements and certifications from Content Doc Scene 5
// ─────────────────────────────────────────────────────────────

export interface Achievement {
  id: string;
  headline: string;
  subhead: string;
  dateline: string;
  credentialUrl?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export const achievements: Achievement[] = [
  {
    id: "voiceguard-buildathon",
    headline: "LUCKNOW UNDERGRADUATE RANKS TOP 2% NATIONALLY AMONG 40,000+ AI BUILDERS",
    subhead:
      "Recognized at India AI Impact Buildathon for VoiceGuard, an AI-powered synthetic voice detection system",
    dateline: "HCL GUVI · February 2026",
    credentialUrl: "#credential-voiceguard",
  },
  {
    id: "universe-coderush",
    headline: "UNIVERSE PLATFORM BREAKS INTO TOP 10 AT NATIONAL CODERUSH HACKATHON",
    subhead:
      "Real-time social platform with AI content moderation earns national recognition under competitive conditions",
    dateline: "CodeRush Hackathon · 2026",
  },
  {
    id: "crisis-os-gdg",
    headline: "TEAM LEADER TAKES CRISIS OS TO GDG SOLUTION CHALLENGE GLOBAL STAGE",
    subhead:
      "Emergency management PWA with 5-role architecture submitted to Google's international developer challenge",
    dateline: "GDG Solution Challenge 2026 · Result Pending",
  },
  {
    id: "heat-sense-gdg",
    headline: "HEAT SENSE SELECTED FOR GDG ON CAMPUS SOLUTION CHALLENGE 2025",
    subhead:
      "Mobile fire safety training app built and shipped for Google's developer challenge program",
    dateline: "GDG Solution Challenge 2025",
    credentialUrl: "#credential-heat-sense",
  },
];

export const certifications: Certification[] = [
  {
    name: "Web Development",
    issuer: "Sololearn",
    year: "2024",
  },
  {
    name: "Java",
    issuer: "Sololearn",
    year: "2024",
  },
  {
    name: "HeLa Crossroads",
    issuer: "HeLa Labs",
    year: "2024",
  },
];
