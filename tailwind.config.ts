import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', sm: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1248px' },
    },
    extend: {
      colors: {
        background: '#FAFAFA',
        foreground: '#0F172A',
        card: '#FFFFFF',
        border: '#E2E8F0',
        ring: '#0052FF',
        muted: {
          DEFAULT: '#F1F5F9',
          foreground: '#64748B',
        },
        accent: {
          DEFAULT: '#0052FF',
          secondary: '#4D7CFF',
          foreground: '#FFFFFF',
        },
        brand: {
          50: '#eef2ff',
          100: '#dbe4ff',
          200: '#b8c8ff',
          300: '#8ba6ff',
          400: '#4D7CFF',
          500: '#0052FF',
          600: '#0042cc',
          700: '#003299',
          800: '#002266',
          900: '#001947',
        },
        ink: {
          DEFAULT: '#0F172A',
          muted: '#64748B',
          subtle: '#94A3B8',
          inverse: '#FAFAFA',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F1F5F9',
          subtle: '#FAFAFA',
          dark: '#0F172A',
        },
        hairline: '#E2E8F0',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          'var(--font-sans)',
          'Inter',
          'system-ui',
          'sans-serif',
        ],
        mono: ['"SF Mono"', 'ui-monospace', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        display: '-0.035em',
        tightest: '-0.025em',
      },
      fontSize: {
        'display-2xl': ['clamp(3rem, 6vw + 1rem, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.035em', fontWeight: '600' }],
        'display-xl':  ['clamp(2.5rem, 4.5vw + 1rem, 4rem)',  { lineHeight: '1.07', letterSpacing: '-0.03em',  fontWeight: '600' }],
        'display-lg':  ['clamp(2rem, 3vw + 1rem, 3rem)',      { lineHeight: '1.1',  letterSpacing: '-0.025em', fontWeight: '600' }],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        pill: '9999px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15, 23, 42, 0.04)',
        card: '0 1px 3px rgba(15, 23, 42, 0.06), 0 12px 32px -16px rgba(15, 23, 42, 0.12)',
        accent: '0 4px 14px -4px rgba(0, 82, 255, 0.35)',
        'accent-lg': '0 18px 40px -12px rgba(0, 82, 255, 0.45)',
        lift: '0 18px 40px -12px rgba(0, 82, 255, 0.45)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(to right, #0052FF, #4D7CFF)',
        'gradient-brand-soft': 'linear-gradient(to right, rgba(0,82,255,0.08), rgba(77,124,255,0.08))',
        'gradient-tri': 'linear-gradient(to bottom right, #0052FF, #4D7CFF, #0052FF)',
        'fade-down': 'linear-gradient(180deg, #FAFAFA 0%, #F1F5F9 100%)',
        'tile': 'linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 100%)',
      },
      keyframes: {
        'reveal-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'reveal-fade': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.7', transform: 'scale(1.3)' },
        },
        'spin-slow': {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'float-y': {
          '0%, 100%': { transform: 'translateY(-10px)' },
          '50%':      { transform: 'translateY(10px)' },
        },
        'float-y-rev': {
          '0%, 100%': { transform: 'translateY(10px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'reveal-up': 'reveal-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'reveal-fade': 'reveal-fade 0.9s ease-out both',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        'spin-slow': 'spin-slow 60s linear infinite',
        'float-y': 'float-y 5s ease-in-out infinite',
        'float-y-rev': 'float-y-rev 4s ease-in-out infinite',
      },
      transitionTimingFunction: {
        apple: 'cubic-bezier(0.16, 1, 0.3, 1)',
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
