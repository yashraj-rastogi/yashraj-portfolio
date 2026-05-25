# 🎬 The Cinematic Portfolio · Yashraj Rastogi

An immersive, story-driven developer portfolio designed to tell a technical journey like a feature film. Built with Next.js, Framer Motion, and curated HSL-tailored color systems, this application blends premium web design, glassmorphism, micro-interactions, and robust modern standards.

---

## 🎞️ The Cinematic Chapters (Structure)

The portfolio is structured as a series of cohesive chronological "scenes" that sit in normal document flow, with a fixed theatrical overlay:

### [Scene 0] Hero Intro & Viewfinder
* Plays a synchronized viewport camera zoom and light-leak animation.
* Fades out to seamlessly reveal Chapter 1 at scroll position `0`.

### [Scene 1] About Me (The Narrative)
* Premium editorial typography using Google Fonts (**Playfair Display** & **DM Sans**).
* Features a spotlight-masked quote ("Magnetic Quote") that follows the user's cursor dynamically.

### [Scene 2] The Arsenal (Skills)
* Interactive dynamic canvas with custom floating background paths.
* Highly responsive skill clusters arranged in orbital layouts with individual interactive micro-animations.

### [Scene 3] The Works (Celluloid Projects Track)
* Continuous horizontal 35mm vintage celluloid filmstrip track carrying project cards.
* Interactive sprocket holes that pulse with simulated projector light backglow.
* Immersive modals ("Project Modals") that expand into high-fidelity detail sheets upon selection.

### [Scene 4] Leadership & Roles
* Segmented role chapters outlining community contributions, ambassador programs, and technical leadership milestones.

### [Scene 5] The Headlines (Achievements & Certifications)
* Broad-sheet editorial newspaper aesthetic named **"The Builder's Gazette"** (est. 2024).
* Renders notable hackathon results, national rankings, and scrolling certification strip tape.

### [Scene 6] The Closing Chapter (Contact)
* Dark backdrop with a soft warm light leak from the top-center.
* A hidden spotlight layer that reveals high-contrast text under the user's custom cursor.

---

## 🛠️ Technology Stack & Standards

* **Framework**: [Next.js (App Router)](https://nextjs.org/)
* **Animation & Motion**: [Framer Motion](https://www.framer.com/motion/) & CSS keyframe micro-animations
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (configured entirely in CSS utility variables)
* **Code Quality**: Strict ESLint, type-safe TypeScript, and zero compiler warnings
* **SSR/Hydration Safety**: Fully pure and deterministic animations (e.g. deterministic random sine-based path durations to prevent hydration mismatches)

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 1. Installation
Clone the repository and install the dependencies inside the project folder:
```bash
cd yashraj-portfolio
npm install
```

### 2. Running Locally (Development Server)
Launch the local Turbopack development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📦 Production & Deployment

This project is fully verified and optimized for direct production deployment.

### 1. Linting & Validation
Run ESLint to verify that the code complies with strict style guidelines:
```bash
npm run lint
```

### 2. Creating an Optimized Production Build
To build the application for deployment (generating static, highly optimized pages):
```bash
npm run build
```

### 3. Deploying to Vercel
Deploy the `yashraj-portfolio` directory seamlessly on [Vercel](https://vercel.com/):
1. Import the repository.
2. Select **Next.js** as the framework preset.
3. Configure the Root Directory to `yashraj-portfolio`.
4. Click **Deploy**.
