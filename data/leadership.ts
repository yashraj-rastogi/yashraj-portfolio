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
    title: "Google Student Ambassador",
    organization: "Google India",
    duration: "May 2026 – Present",
    badges: ["Google Ambassador", "GID: 3263", "Community Builder"],
    responsibilities: [
      "Organize monthly hands-on technical workshops campus-wide advocating for Google AI tools including Gemini and NotebookLM",
      "Provide 1-on-1 technical consultations to student founders, integrating tools like NotebookLM and Gemini Canvas to accelerate project development",
      "Drive digital engagement through targeted content showcasing real-world LLM use cases and fostering a builder community",
    ],
  },
  {
    index: 2,
    title: "Technical Head",
    organization: "Unstop Igniters Club, SRMCEM",
    duration: "Apr 2026 – Present",
    badges: ["Technical Lead", "Web Development", "Digital Infrastructure"],
    responsibilities: [
      "Lead technical teams in website development and digital infrastructure supporting the club's events and online presence",
      "Oversee end-to-end technical execution for club initiatives",
    ],
  },
  {
    index: 3,
    title: "Technical Coordinator",
    organization: "AlgoZenith Chapter, SRMCEM",
    duration: "Oct 2025 – Present",
    badges: ["Event Organizer", "Competitive Programming", "Workshop Facilitator"],
    responsibilities: [
      "Organized 'Vibe Coding Contest' hackathon and 'Algo-Arena' DSA competition — managed logistics and facilitated events",
      "Coordinated technical workshops led by industry professionals to enhance practical skills within the collegiate community",
    ],
  },
];
