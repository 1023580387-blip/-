/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ["Montserrat", "system-ui", "sans-serif"],
      },
      colors: {
        ice: {
          50: "#F8FAFC",
          100: "#F0F4F8",
          200: "#E2E8F0",
          300: "#CBD5E1",
        },
        titanium: {
          400: "#B8C0CC",
          500: "#A0AAB8",
          600: "#8892A0",
        },
        cyan: {
          glow: "#A3D5E0",
          soft: "#7EB8C9",
          muted: "#5A9AAD",
        },
        abyss: {
          900: "#0D1117",
          800: "#1A1D24",
          700: "#21252E",
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-medium": "float 6s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",
        "glow-pulse": "glowPulse 4s ease-in-out infinite",
        "glow-pulse-slow": "glowPulse 6s ease-in-out infinite",
        "breathing": "breathing 5s ease-in-out infinite",
        "ripple": "ripple 3s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "particle-float": "particleFloat 12s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(163, 213, 224, 0.15)" },
          "50%": { boxShadow: "0 0 40px rgba(163, 213, 224, 0.3)" },
        },
        breathing: {
          "0%, 100%": { opacity: "0.12" },
          "50%": { opacity: "0.22" },
        },
        ripple: {
          "0%": { transform: "translate(-50%, -50%) scale(0.8)", opacity: "0.6" },
          "50%": { transform: "translate(-50%, -50%) scale(1.2)", opacity: "0.2" },
          "100%": { transform: "translate(-50%, -50%) scale(0.8)", opacity: "0.6" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        particleFloat: {
          "0%": { transform: "translateY(0px) translateX(0px)", opacity: "0" },
          "10%": { opacity: "0.5" },
          "90%": { opacity: "0.5" },
          "100%": { transform: "translateY(-100vh) translateX(40px)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};