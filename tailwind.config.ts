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
        space: {
          black: '#000010',
          deep: '#050515',
          blue: '#4FC3F7',
          ice: '#B0BEC5',
          purple: '#7C4DFF',
          glass: 'rgba(255, 255, 255, 0.08)',
          border: 'rgba(79, 195, 247, 0.3)',
        },
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'scan-line': 'scan 3s linear infinite',
        'float': 'float 20s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'breath': 'breath 6s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 100%' },
        },
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(-10px, -10px, 0)' },
        },
        breath: {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '0.3' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
