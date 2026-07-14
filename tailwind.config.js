/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-black': '#000000',
        'cyber-cyan': '#00e5ff',
        'cyber-magenta': '#ff2b86',
        'cyber-purple-dark': '#1a0033',
        'cyber-purple-deep': '#0a001a',
      },
      animation: {
        'glitch': 'glitch 0.3s infinite',
        'scan': 'scan 2s linear infinite',
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
        'flow': 'flow 3s linear infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        scan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-neon': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        flow: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 10px #00e5ff, 0 0 20px #00e5ff, 0 0 30px #00e5ff',
        'neon-magenta': '0 0 10px #ff2b86, 0 0 20px #ff2b86, 0 0 30px #ff2b86',
      },
    },
  },
  plugins: [],
};
