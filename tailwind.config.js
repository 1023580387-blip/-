/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.5rem", lg: "2rem" },
    },
    extend: {
      colors: {
        ink: {
          void: "#050208",
          base: "#0a0a0f",
          panel: "#0d0b14",
          line: "#1a1426",
        },
        neon: {
          pink: "#ff006e",
          cyan: "#00f0ff",
          lime: "#c6ff00",
          magenta: "#b026ff",
        },
      },
      fontFamily: {
        display: ['"Audiowide"', "system-ui", "sans-serif"],
        mono: ['"Space Mono"', "ui-monospace", "monospace"],
        data: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        "neon-pink": "0 0 5px #ff006e, 0 0 20px rgba(255,0,110,0.5), 0 0 40px rgba(255,0,110,0.25)",
        "neon-cyan": "0 0 5px #00f0ff, 0 0 20px rgba(0,240,255,0.5), 0 0 40px rgba(0,240,255,0.25)",
        "neon-lime": "0 0 5px #c6ff00, 0 0 20px rgba(198,255,0,0.5), 0 0 40px rgba(198,255,0,0.25)",
        "neon-magenta": "0 0 5px #b026ff, 0 0 20px rgba(176,38,255,0.5), 0 0 40px rgba(176,38,255,0.25)",
      },
      keyframes: {
        "glitch-pan": {
          "0%,100%": { clipPath: "inset(0 0 85% 0)" },
          "20%": { clipPath: "inset(80% 0 5% 0)" },
          "40%": { clipPath: "inset(40% 0 40% 0)" },
          "60%": { clipPath: "inset(10% 0 75% 0)" },
          "80%": { clipPath: "inset(65% 0 20% 0)" },
        },
        "scan-move": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "grid-move": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(40px)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(8deg)" },
        },
        "cursor-blink": {
          "0%,49%": { opacity: "1" },
          "50%,100%": { opacity: "0" },
        },
        "pulse-glow": {
          "0%,100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "sweep": {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
        "flicker": {
          "0%,100%": { opacity: "1" },
          "41%": { opacity: "1" },
          "42%": { opacity: "0.4" },
          "43%": { opacity: "1" },
          "45%": { opacity: "0.3" },
          "46%": { opacity: "1" },
        },
      },
      animation: {
        "glitch-pan": "glitch-pan 2.5s infinite steps(2, end)",
        "scan-move": "scan-move 6s linear infinite",
        "grid-move": "grid-move 1.2s linear infinite",
        float: "float 7s ease-in-out infinite",
        "cursor-blink": "cursor-blink 1s steps(1) infinite",
        "pulse-glow": "pulse-glow 2.4s ease-in-out infinite",
        sweep: "sweep 2.8s ease-in-out infinite",
        flicker: "flicker 4s linear infinite",
      },
    },
  },
  plugins: [],
};
