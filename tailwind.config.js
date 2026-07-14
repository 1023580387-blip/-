/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        havok: {
          base: "#0D0D0D",
          deep: "#1A1A1E",
          surface: "#222228",
          metal: "#2A2A30",
          border: "#3A3A42",
          platinum: "#A8A8AD",
          gold: "#C8C8C0",
          accent: "#7EB8B0",
          "accent-dim": "#5A8A84",
          glass: "rgba(26, 26, 30, 0.65)",
          "glass-light": "rgba(42, 42, 48, 0.45)",
          "glass-heavy": "rgba(13, 13, 13, 0.85)",
          scan: "rgba(168, 168, 173, 0.08)",
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        body: ['"Commissioner"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      fontSize: {
        "display-xl": ["5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "display-md": ["2.5rem", { lineHeight: "1.15" }],
        "display-sm": ["1.75rem", { lineHeight: "1.2" }],
      },
      boxShadow: {
        "havok-glow": "0 0 40px rgba(126, 184, 176, 0.06)",
        "havok-card": "0 4px 24px rgba(0, 0, 0, 0.4)",
        "havok-glass": "0 8px 32px rgba(0, 0, 0, 0.5)",
        "havok-inner": "inset 0 1px 0 rgba(168, 168, 173, 0.08)",
      },
      backdropBlur: {
        xs: "2px",
        glass: "12px",
        heavy: "24px",
      },
      animation: {
        "scan-line": "scanLine 8s linear infinite",
        "fade-up": "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "number-roll": "numberRoll 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "metal-glow": "metalGlow 3s ease-in-out infinite alternate",
        "track-flow": "trackFlow 20s linear infinite",
        "line-light": "lineLight 4s ease-in-out infinite",
      },
      keyframes: {
        scanLine: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        numberRoll: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        metalGlow: {
          "0%": { borderColor: "rgba(168, 168, 173, 0.15)" },
          "100%": { borderColor: "rgba(168, 168, 173, 0.35)" },
        },
        trackFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        lineLight: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.8" },
        },
      },
      transitionTimingFunction: {
        "havok-ease": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};