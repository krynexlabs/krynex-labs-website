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
        background: "#050505",
        canvas: {
          DEFAULT: "#050505",
          subtle: "#0A0A0A",
          card: "#111111",
          glass: "rgba(10, 10, 10, 0.8)",
        },
        surface: {
          DEFAULT: "#111111",
          subtle: "#0A0A0A",
          elevated: "#171717",
          glass: "rgba(17, 17, 17, 0.8)",
        },
        accent: {
          DEFAULT: "#D4D4D4",
          light: "#E5E5E5",
          hover: "#FFFFFF",
          glow: "rgba(255, 255, 255, 0.15)",
          electric: "#F5F5F5",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#A3A3A3",
          muted: "#737373",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.08)",
          slate: "#292929",
          highlight: "rgba(255, 255, 255, 0.22)",
          specular: "rgba(255, 255, 255, 0.35)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "radial-spotlight":
          "radial-gradient(600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.05), transparent 40%)",
        "radial-horizon":
          "radial-gradient(ellipse 80% 50% at 50% 120%, rgba(255, 255, 255, 0.08), transparent)",
        "grid-pattern":
          "linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)",
      },
      animation: {
        "spin-slow": "spin 12s linear infinite",
        "pulse-subtle": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "border-glow": "border-rotate 4s linear infinite",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "slide-up": "slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
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
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
