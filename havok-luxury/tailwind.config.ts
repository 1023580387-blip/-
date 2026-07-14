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
        // Havok Cold Luxury Palette
        havok: {
          // Primary matte dark backgrounds
          carbon: "#0D0D0E",
          graphite: "#1A1A1D",
          slate: "#242428",
          // Secondary cold silver / platinum
          silver: "#9A9DA5",
          platinum: "#C4C7CE",
          "platinum-light": "#D8DAE0",
          // Accent cold cyan for functional highlights
          frost: "#6B8A8E",
          "frost-light": "#8BA8AC",
          // Border / divider
          divider: "rgba(154, 157, 165, 0.12)",
          "divider-active": "rgba(154, 157, 165, 0.25)",
          // Glass surfaces
          glass: "rgba(26, 26, 29, 0.65)",
          "glass-hover": "rgba(36, 36, 40, 0.75)",
          "glass-border": "rgba(154, 157, 165, 0.08)",
          // Text
          "text-primary": "#D8DAE0",
          "text-secondary": "#9A9DA5",
          "text-muted": "#5E616A",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: [
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "SF Mono",
          "Fira Code",
          "monospace",
        ],
      },
      fontSize: {
        "display-xl": ["5rem", { lineHeight: "1.05", letterSpacing: "-0.04em", fontWeight: "200" }],
        "display-lg": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "200" }],
        "display-md": ["2.5rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "250" }],
        "heading": ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "300" }],
        "label": ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.12em", fontWeight: "400" }],
        "detail": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.04em", fontWeight: "350" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      borderRadius: {
        "sm": "2px",
        "md": "4px",
        "lg": "8px",
        "xl": "12px",
        "glass": "6px",
      },
      backdropBlur: {
        "xs": "2px",
        "glass": "16px",
        "glass-heavy": "24px",
      },
      animation: {
        "scan-line": "scanLine 4s linear infinite",
        "fade-up": "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "dissolve": "dissolve 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "float": "float 6s ease-in-out infinite",
        "number-roll": "numberRoll 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "track-flow": "trackFlow 20s linear infinite",
        "timeline-glow": "timelineGlow 2s ease-out forwards",
        "border-scan": "borderScan 3s linear infinite",
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
        dissolve: {
          "0%": { opacity: "0", filter: "brightness(1.5)" },
          "100%": { opacity: "1", filter: "brightness(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        numberRoll: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        trackFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        timelineGlow: {
          "0%": { opacity: "0", filter: "brightness(2)" },
          "100%": { opacity: "1", filter: "brightness(1)" },
        },
        borderScan: {
          "0%": { borderColor: "rgba(154, 157, 165, 0.08)" },
          "50%": { borderColor: "rgba(154, 157, 165, 0.2)" },
          "100%": { borderColor: "rgba(154, 157, 165, 0.08)" },
        },
      },
      backgroundImage: {
        "track-texture":
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(154, 157, 165, 0.015) 2px, rgba(154, 157, 165, 0.015) 4px)",
        "flow-line":
          "linear-gradient(90deg, transparent 0%, rgba(107, 138, 142, 0.06) 50%, transparent 100%)",
      },
    },
  },
  plugins: [],
};
export default config;