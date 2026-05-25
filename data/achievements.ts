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
  credentialUrl?: string;
}

export const achievements: Achievement[] = [
  {
    id: "voiceguard-buildathon",
    headline: "LUCKNOW UNDERGRADUATE RANKS TOP 2% NATIONALLY AMONG 40,000+ AI BUILDERS",
    subhead:
      "Recognized at India AI Impact Buildathon for VoiceGuard, an AI-powered synthetic voice detection system",
    dateline: "HCL GUVI · February 2026",
    credentialUrl: "https://www.guvi.in/verify-certificate?id=8lA17t83Oc171254Vs",
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
    credentialUrl: "https://certificate.hack2skill.com/user/gdgscsubmissions/2025H2S01GSC-I11860",
  },
];

export const certifications: Certification[] = [
  {
    name: "Web Development",
    issuer: "Sololearn",
    year: "2024",
    credentialUrl: "https://www.sololearn.com/en/certificates/CC-X5N51R2O",
  },
  {
    name: "Java",
    issuer: "Sololearn",
    year: "2024",
    credentialUrl: "https://www.sololearn.com/en/certificates/CT-CD5ATFDK",
  },
  {
    name: "HeLa Crossroads",
    issuer: "HeLa Labs",
    year: "2024",
    credentialUrl: "https://cdn.certifier.io/b997f3e6-396a-47f5-a85b-cd713f073bb1/credentials/01kcbdyn4bx62sq6j50tym2z6k/designs/01kcbdrf9d5qm27fy65eavvwaw/pKcgdumuQo.png",
  },
];
