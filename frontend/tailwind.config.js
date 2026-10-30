/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Plum & Burgundy — primary brand
        plum: {
          50:  '#FBF5F8',
          100: '#F5E8F0',
          200: '#EAD1E2',
          300: '#D9AECB',
          400: '#C07FA9',
          500: '#A35488',
          600: '#7E3466',
          700: '#5D2150',
          800: '#3B1C32', // Deep Plum primary
          900: '#2D1226', // Rich Burgundy
          950: '#1A0A17',
        },
        // Rose & Mauve accent family
        rose: {
          50:  '#FDF6F8',
          100: '#FAEAF0',
          200: '#F4D3E2',
          300: '#EBB3CB',
          400: '#DC87A8',
          500: '#C98486', // Soft Rose
          600: '#B0606A',
          700: '#8E4455',
          800: '#703444',
          900: '#5B2A38',
        },
        // Coral accent
        coral: {
          50:  '#FEF5F3',
          100: '#FDEAE6',
          200: '#FAD3CB',
          300: '#F6B09F',
          400: '#EF7F6B',
          500: '#ED6A5A', // Muted Coral
          600: '#D44E3A',
          700: '#B03A2A',
          800: '#8E2F21',
          900: '#74291C',
        },
        // Gold accent
        gold: {
          300: '#F2D98A',
          400: '#E8C84A',
          500: '#D4AF37', // Gold Accent
          600: '#B8942A',
          700: '#957520',
        },
        // Ivory backgrounds
        ivory: {
          50:  '#FFFFFF',
          100: '#FFFDFB', // Softest background
          200: '#FAF8F5', // Main background
          300: '#F4EFE8',
          400: '#EBE3D9',
          500: '#DDD1C4',
        },
        // Charcoal text family
        charcoal: {
          50:  '#F7F6F7',
          100: '#EFEAEF',
          200: '#DDD5DD',
          300: '#C4B8C4',
          400: '#9E929E',
          500: '#7A6E7A',
          600: '#5E545E',
          700: '#453D45',
          800: '#2E2830',
          900: '#1E1A20',
          950: '#120F14',
        },
        // Success green
        sage: {
          50:  '#F2F9F5',
          100: '#E0F2EA',
          400: '#3DAF7A',
          500: '#2A8A5C',
          600: '#1E6B47',
          700: '#155236',
        },
        // Surface / card
        surface: '#FFFFFF',
      },
      fontFamily: {
        display: ['"DM Serif Display"', '"Playfair Display"', 'Georgia', 'serif'],
        serif:   ['"Playfair Display"', '"DM Serif Display"', 'Georgia', 'serif'],
        sans:    ['Manrope', 'Inter', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      fontSize: {
        // Strict editorial type scale
        'hero':    ['clamp(2.4rem, 5.5vw, 4.75rem)', { lineHeight: '1.06', letterSpacing: '-0.03em' }],
        'h1':      ['clamp(1.875rem, 4vw, 2.875rem)', { lineHeight: '1.12', letterSpacing: '-0.025em' }],
        'h2':      ['clamp(1.5rem, 3vw, 2rem)',        { lineHeight: '1.2',  letterSpacing: '-0.02em'  }],
        'h3':      ['clamp(1.2rem, 2.2vw, 1.5rem)',   { lineHeight: '1.3',  letterSpacing: '-0.015em' }],
        'body-lg': ['1.125rem',                         { lineHeight: '1.7'  }],
        'body':    ['1rem',                             { lineHeight: '1.65' }],
        'body-sm': ['0.9375rem',                        { lineHeight: '1.6'  }],
        'label':   ['0.8125rem',                        { lineHeight: '1.4', letterSpacing: '0.06em'   }],
        'caption': ['0.75rem',                          { lineHeight: '1.5'  }],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
        '4xl': '1.5rem',
      },
      boxShadow: {
        'xs':    '0 1px 2px 0 rgba(59, 28, 50, 0.04)',
        'sm':    '0 2px 6px -1px rgba(59, 28, 50, 0.06), 0 1px 3px -1px rgba(0,0,0,0.04)',
        'md':    '0 6px 20px -4px rgba(59, 28, 50, 0.09), 0 2px 6px -2px rgba(0,0,0,0.04)',
        'lg':    '0 12px 32px -8px rgba(59, 28, 50, 0.12), 0 4px 12px -4px rgba(0,0,0,0.06)',
        'xl':    '0 20px 48px -12px rgba(59, 28, 50, 0.16), 0 8px 20px -6px rgba(0,0,0,0.08)',
        '2xl':   '0 32px 64px -16px rgba(59, 28, 50, 0.2)',
        'card':  '0 0 0 1px rgba(59,28,50,0.06), 0 4px 16px -4px rgba(59,28,50,0.08)',
        'card-hover': '0 0 0 1px rgba(59,28,50,0.08), 0 12px 32px -8px rgba(59,28,50,0.14)',
        'glow-plum':  '0 0 32px -8px rgba(59, 28, 50, 0.35)',
        'glow-rose':  '0 0 28px -6px rgba(201, 132, 134, 0.4)',
        'glow-coral': '0 0 28px -6px rgba(237, 106, 90, 0.35)',
        'inner-sm':   'inset 0 1px 3px rgba(59,28,50,0.06)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      backgroundImage: {
        'gradient-plum':    'linear-gradient(135deg, #3B1C32 0%, #2D1226 100%)',
        'gradient-plum-r':  'linear-gradient(to right, #3B1C32, #5D2150)',
        'gradient-warm':    'linear-gradient(160deg, #3B1C32 0%, #5D2150 45%, #7E3466 100%)',
        'gradient-hero':    'linear-gradient(160deg, #2D1226 0%, #3B1C32 35%, #5D2150 70%, #7E3466 100%)',
        'gradient-card':    'linear-gradient(135deg, #FFFFFF 0%, #FAF8F5 100%)',
        'gradient-surface': 'linear-gradient(180deg, #FFFDFB 0%, #FAF8F5 100%)',
        'gradient-rose':    'linear-gradient(135deg, #C98486 0%, #B0606A 100%)',
        'gradient-coral':   'linear-gradient(135deg, #ED6A5A 0%, #D44E3A 100%)',
        'gradient-gold':    'linear-gradient(135deg, #D4AF37 0%, #B8942A 100%)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'ease-smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        'fade-in-up': {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)'    },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%':   { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)'    },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)'  },
          '50%':       { transform: 'translateY(-8px)' },
        },
        pulse_soft: {
          '0%, 100%': { opacity: '1' },
          '50%':       { opacity: '0.6' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out both',
        'fade-in':    'fade-in 0.4s ease-out both',
        'slide-in-right': 'slide-in-right 0.4s ease-out both',
        shimmer:  'shimmer 1.8s infinite linear',
        float:    'float 6s ease-in-out infinite',
        pulse_soft: 'pulse_soft 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
