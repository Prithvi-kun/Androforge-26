/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          deep: '#030712',
          dark: '#0a1628',
          darker: '#060d1a',
          blue: '#0ea5e9',
          neon: '#22d3ee',
          electric: '#3b82f6',
          purple: '#8b5cf6',
          pink: '#ec4899',
          gold: '#f59e0b',
          silver: '#94a3b8',
        },
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'rotate-slow': 'rotate-slow 20s linear infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(14, 165, 233, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(14, 165, 233, 0.4), 0 0 60px rgba(14, 165, 233, 0.2)' },
        },
        'rotate-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, #030712 0%, #0a1628 50%, #030712 100%)',
        'neon-gradient': 'linear-gradient(135deg, #22d3ee, #0ea5e9, #3b82f6)',
      },
    },
  },
  plugins: [],
}
