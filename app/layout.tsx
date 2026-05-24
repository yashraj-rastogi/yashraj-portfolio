import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// ── Font Definitions ──────────────────────────────────────────
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

// ── SEO Metadata ──────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Yashraj Rastogi — Builder & Designer",
  description:
    "Portfolio of Yashraj Rastogi — Full-Stack Developer, AI Builder, and Google Student Ambassador. Top 2% nationally at India AI Impact Buildathon. Building things that matter.",
  keywords: [
    "Yashraj Rastogi",
    "Full-Stack Developer",
    "AI Builder",
    "Google Student Ambassador",
    "React",
    "Next.js",
    "Portfolio",
    "Lucknow",
    "India",
  ],
  authors: [{ name: "Yashraj Rastogi" }],
  creator: "Yashraj Rastogi",
  openGraph: {
    title: "Yashraj Rastogi — Builder & Designer",
    description:
      "Full-Stack Developer, AI Builder, and Google Student Ambassador. Top 2% nationally at India AI Impact Buildathon.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yashraj Rastogi — Builder & Designer",
    description:
      "Full-Stack Developer, AI Builder, and Google Student Ambassador. Top 2% nationally at India AI Impact Buildathon.",
  },
};

// ── Root Layout ───────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${playfairDisplay.variable}
        ${cormorantGaramond.variable}
        ${dmSans.variable}
        ${jetbrainsMono.variable}
      `}
    >
      <body className="bg-[#0D0B09] text-[#F2EAD8] antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
