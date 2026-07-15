import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        haavk: {
          carbon: "#0D0D0D",
          graphite: "#1A1A1F",
          silver: "#A8B4C0",
          platinum: "#8A959F",
          ice: "#7EB8DA",
          border: "#2A2A35",
          panel: "rgba(20, 20, 28, 0.85)",
          glass: "rgba(168, 180, 192, 0.06)",
          holo: "rgba(168, 180, 192, 0.12)",
        },
      },
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        rajdhani: ["Rajdhani", "sans-serif"],
      },
      animation: {
        "scan-line": "scanLine 3s linear infinite",
        "pulse-slow": "pulseSlow 4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "slide-left": "slideLeft 0.6s ease-out forwards",
        "slide-right": "slideRight 0.6s ease-out forwards",
        "particle-drift": "particleDrift 20s linear infinite",
        "border-glow": "borderGlow 4s linear infinite",
      },
      keyframes: {
        scanLine: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.7" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 2px rgba(126, 184, 218, 0.2)" },
          "100%": { boxShadow: "0 0 8px rgba(126, 184, 218, 0.5)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideLeft: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideRight: {
          " 0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        particleDrift: {
          "0%": { transform: "translateY(0) translateX(0)" },
          "25%": { transform: "translateY(-10px) translateX(5px)" },
          "50%": { transform: "translateY(-20px) translateX(-5px)" },
          "75%": { transform: "translateY(-10px) translateX(-10px)" },
          "100%": { transform: "translateY(0) translateX(0)" },
        },
        borderGlow: {
          "0%": { borderColor: "rgba(168, 180, 192, 0.2)" },
          "50%": { borderColor: "rgba(126, 184, 218, 0.4)" },
          "100%": { borderColor: "rgba(168, 180, 192, 0.2)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;