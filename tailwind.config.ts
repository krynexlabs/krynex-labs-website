import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#07090D",
        surface: {
          DEFAULT: "#0D1118",
          secondary: "#0D1118",
          elevated: "#111722",
          glass: "rgba(13, 17, 24, 0.8)",
        },
        accent: {
          DEFAULT: "#00E5FF",
          cyan: "#00E5FF",
          blue: "#4778FF",
          glow: "rgba(0, 229, 255, 0.15)",
        },
        content: {
          primary: "#F5F7FA",
          secondary: "#929BAA",
          muted: "#626C7D",
        },
        border: {
          DEFAULT: "#202630",
          subtle: "#202630",
          cyan: "rgba(0, 229, 255, 0.3)",
          highlight: "rgba(0, 229, 255, 0.25)",
          specular: "rgba(245, 247, 250, 0.12)",
        },
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "radial-spotlight":
          "radial-gradient(600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(0, 229, 255, 0.06), transparent 45%)",
        "radial-cyan-bloom":
          "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0, 229, 255, 0.08), transparent 70%)",
        "radial-blue-bloom":
          "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(71, 120, 255, 0.06), transparent 70%)",
        "grid-pattern":
          "linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.025) 1px, transparent 1px)",
      },
      animation: {
        "spin-slow": "spin 12s linear infinite",
        "pulse-subtle": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "border-glow": "border-rotate 4s linear infinite",
      },
      keyframes: {
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "border-rotate": {
          "0%": { "--border-angle": "0deg" },
          "100%": { "--border-angle": "360deg" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
