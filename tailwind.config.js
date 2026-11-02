/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pearl: {
          50: '#FAF9F6',
          100: '#FAFAF9',
          200: '#F5F5F4',
          300: '#E7E5E4',
          400: '#D6D3D1',
          900: '#1C1917',
        },
        amethyst: {
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7',
          600: '#9333EA',
          700: '#7E22CE',
          800: '#6B21A8', // Deep Amethyst
          900: '#581C87',
          950: '#3B0764',
        },
        rosegold: {
          50: '#FDF2F8',
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F9A8D4',
          400: '#F472B6', // Soft Rose Gold
          500: '#EC4899',
          600: '#DB2777',
          700: '#BE185D',
        },
        emeraldsuccess: {
          400: '#34D399',
          500: '#10B981', // Emerald Emerald
          600: '#059669',
        },
        indigobrand: {
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5', // Indigo Accent
          700: '#4338CA',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(107, 33, 168, 0.08)',
        'glass-hover': '0 12px 40px 0 rgba(107, 33, 168, 0.14)',
        'glow-rose': '0 0 25px -5px rgba(244, 114, 182, 0.4)',
        'glow-purple': '0 0 30px -5px rgba(107, 33, 168, 0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}

