// ─────────────────────────────────────────────────────────────
// data/leadership.ts
// Leadership roles data from Content Doc Scene 4
// ─────────────────────────────────────────────────────────────

export interface LeadershipRole {
  index: number;
  title: string;
  organization: string;
  duration: string;
  badges: string[];
  responsibilities: string[];
}

export const leadershipRoles: LeadershipRole[] = [
  {
    index: 1,
    title: "Technical Head",
    organization: "Unstop Igniters Club, SRMCEM",
    duration: "Apr 2026 – Present",
    badges: ["Technical Head", "Web Development", "Digital Infrastructure"],
    responsibilities: [
      "Lead technical teams in website development and digital infrastructure supporting the club's events and online presence",
      "Oversee end-to-end technical execution for club initiatives",
    ],
  },
  {
    index: 2,
    title: "Co-Lead & Technical Lead",
    organization: "AlgoZenith Chapter, SRMCEM",
    duration: "Oct 2025 – Present",
    badges: ["Co-Lead", "Competitive Programming", "Workshop Facilitator"],
    responsibilities: [
      "Organized 'Vibe Coding Contest' hackathon and 'Algo-Arena' DSA competition — managed logistics and facilitated events",
      "Coordinated technical workshops led by industry professionals to enhance practical skills within the collegiate community",
    ],
  },
  {
    index: 3,
    title: "Google Student Ambassador",
    organization: "Google India",
    duration: "May 2026 – Sep 2026",
    badges: ["Former Ambassador", "GID: 3263", "Community Builder"],
    responsibilities: [
      "Organized monthly hands-on technical workshops campus-wide advocating for Google AI tools including Gemini and NotebookLM",
      "Provided 1-on-1 technical consultations to student founders, integrating tools like NotebookLM and Gemini Canvas to accelerate project development",
      "Drove digital engagement through targeted content showcasing real-world LLM use cases and fostering a builder community",
    ],
  },
];
