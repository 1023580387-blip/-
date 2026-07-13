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
        // 电光青主题
        cyan: {
          neon: "#00F0FF",
          glow: "rgba(0,240,255,0.6)",
          dim: "rgba(0,240,255,0.3)",
        },
        // 洋红主题
        magenta: {
          neon: "#FF00FF",
          glow: "rgba(255,0,255,0.6)",
          dim: "rgba(255,0,255,0.3)",
        },
        // 紫罗兰主题
        violet: {
          neon: "#8B00FF",
          glow: "rgba(139,0,255,0.6)",
          dim: "rgba(139,0,255,0.3)",
        },
        // 赛博黑
        cyber: {
          black: "#000000",
          dark: "#0A0A0A",
          metal: "#111122",
          glass: "rgba(10,10,20,0.7)",
          border: "rgba(0,240,255,0.15)",
        },
      },
      fontFamily: {
        display: ["Orbitron", "sans-serif"],
        body: ["Rajdhani", "sans-serif"],
      },
      animation: {
        "neon-pulse": "neonPulse 2s ease-in-out infinite",
        "glow-float": "glowFloat 4s ease-in-out infinite",
        "scan-line": "scanLine 3s linear infinite",
        "rain-fall": "rainFall 1s linear infinite",
        "fault-flicker": "faultFlicker 0.1s ease-in-out infinite",
        "glass-shake": "glassShake 6s ease-in-out infinite",
        "data-flow": "dataFlow 2s linear infinite",
        "ripple": "ripple 3s ease-in-out infinite",
        "slide-in-right": "slideInRight 0.5s ease-out",
        "slide-out-right": "slideOutRight 0.5s ease-in",
        "float-up": "floatUp 1s ease-out",
        "dissolve": "dissolve 0.8s ease-in-out",
      },
      keyframes: {
        neonPulse: {
          "0%, 100%": { boxShadow: "0 0 5px var(--neon-primary), 0 0 10px var(--neon-primary)" },
          "50%": { boxShadow: "0 0 15px var(--neon-primary), 0 0 30px var(--neon-primary), 0 0 45px var(--neon-primary)" },
        },
        glowFloat: {
          "0%, 100%": { transform: "translateY(0px)", opacity: "0.8" },
          "50%": { transform: "translateY(-10px)", opacity: "1" },
        },
        scanLine: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        rainFall: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(100vh)", opacity: "0" },
        },
        faultFlicker: {
          "0%, 90%, 92%, 100%": { opacity: "1" },
          "91%, 93%": { opacity: "0.7" },
        },
        glassShake: {
          "0%, 100%": { transform: "rotate(0deg) translate(0, 0)" },
          "25%": { transform: "rotate(0.5deg) translate(2px, -2px)" },
          "50%": { transform: "rotate(0deg) translate(0, 0)" },
          "75%": { transform: "rotate(-0.5deg) translate(-2px, 1px)" },
        },
        dataFlow: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "0% 100%" },
        },
        ripple: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.6" },
          "50%": { transform: "scale(1.02)", opacity: "0.8" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideOutRight: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
        floatUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        dissolve: {
          "0%": { opacity: "1", filter: "blur(0px)" },
          "50%": { opacity: "0.5", filter: "blur(2px)" },
          "100%": { opacity: "0", filter: "blur(10px)" },
        },
      },
      backgroundImage: {
        "circuit-pattern": "url('/circuit-bg.svg')",
        "noise": "url('/noise.png')",
      },
    },
  },
  plugins: [],
};
export default config;