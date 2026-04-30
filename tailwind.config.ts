import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gh: {
          bg: "#0d1117",
          card: "#161b22",
          border: "#30363d",
          text: "#c9d1d9",
          muted: "#8b949e",
          green: "#39d353",
          "green-dark": "#26a641",
          "green-darker": "#006d32",
          "green-darkest": "#0e4429",
          accent: "#58a6ff",
          purple: "#bc8cff",
          pink: "#f778ba",
          orange: "#d29922",
          red: "#f85149",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(57, 211, 83, 0)" },
          "50%": { boxShadow: "0 0 20px 4px rgba(57, 211, 83, 0.15)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
