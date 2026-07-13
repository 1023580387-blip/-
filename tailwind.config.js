/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        'silver-light': '#e8e9eb',
        'silver-gray': '#d4d7dc',
        'ice-blue': '#b8d8e8',
        'titanium-white': '#f0f4f8',
        'neon-cyan': '#4ff0ff',
        'cool-silver': '#c0c8d0',
        'deep-space': '#0a101a',
      },
      fontFamily: {
        'futuristic': ['"Exo 2"', 'Inter', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-slower': 'float 12s ease-in-out infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
        'drift': 'drift 20s linear infinite',
        'flow': 'flow 15s linear infinite',
        'ripple': 'ripple 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
        drift: {
          '0%': { transform: 'translateX(0) translateY(0)' },
          '25%': { transform: 'translateX(-10px) translateY(-5px)' },
          '50%': { transform: 'translateX(5px) translateY(-10px)' },
          '75%': { transform: 'translateX(10px) translateY(5px)' },
          '100%': { transform: 'translateX(0) translateY(0)' },
        },
        flow: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        ripple: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
