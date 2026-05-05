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
        // Tokens semánticos (mapeados a paleta Linear "Midnight Command Center")
        background: '#08090a',
        foreground: '#f7f8f8',
        card: {
          DEFAULT: '#0f1011',
          foreground: '#f7f8f8',
        },
        popover: {
          DEFAULT: '#161718',
          foreground: '#f7f8f8',
        },
        border: '#23252a',
        input: '#23252a',
        ring: '#e4f222',
        muted: {
          DEFAULT: '#161718',
          foreground: '#8a8f98',
        },
        accent: {
          DEFAULT: '#e4f222',
          secondary: '#5e6ad2',
          foreground: '#08090a',
        },
        primary: {
          DEFAULT: '#e4f222',
          foreground: '#08090a',
        },
        secondary: {
          DEFAULT: '#23252a',
          foreground: '#f7f8f8',
        },
        destructive: {
          DEFAULT: '#eb5757',
          foreground: '#f7f8f8',
        },
        // Paleta Linear (uso directo con clases utility)
        'pitch-black': '#08090a',
        graphite: '#0f1011',
        'deep-slate': '#161718',
        'charcoal-grey': '#23252a',
        'muted-ash': '#323334',
        gunmetal: '#383b3f',
        porcelain: '#f7f8f8',
        'light-steel': '#d0d6e0',
        'storm-cloud': '#8a8f98',
        'fog-grey': '#62666d',
        alabaster: '#e5e5e6',
        'neon-lime': '#e4f222',
        'aether-blue': '#5e6ad2',
        'forest-green': '#008d2c',
        'cyan-spark': '#02b8cc',
        emerald: '#27a644',
        'warning-red': '#eb5757',
        'deep-violet': '#6366f1',
        amethyst: '#8b5cf6',
        // Aliases legacy (mantenidos para no romper componentes existentes)
        ink: {
          DEFAULT: '#f7f8f8',
          muted: '#8a8f98',
          subtle: '#62666d',
          inverse: '#08090a',
        },
        surface: {
          DEFAULT: '#0f1011',
          muted: '#161718',
          subtle: '#08090a',
          dark: '#08090a',
        },
        hairline: '#23252a',
      },
      fontFamily: {
        sans: [
          'var(--font-sans)',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'sans-serif',
        ],
        mono: ['ui-monospace', '"IBM Plex Mono"', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        // Tracking Linear (relativo a tamaño)
        'linear-display': '-0.003em',
        'linear-heading': '-0.009em',
        'linear-body': '-0.013em',
        display: '-0.022em',
        tightest: '-0.018em',
      },
      fontSize: {
        // Escala Linear
        'linear-caption': ['10px', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        'linear-body': ['14px', { lineHeight: '1.4', letterSpacing: '-0.0093em' }],
        'linear-heading': ['24px', { lineHeight: '1.33', letterSpacing: '-0.0092em', fontWeight: '510' }],
        'linear-heading-lg': ['48px', { lineHeight: '1.2', letterSpacing: '-0.0046em', fontWeight: '510' }],
        'linear-display': ['clamp(2.75rem, 5vw + 1rem, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.003em', fontWeight: '510' }],
        // Compat con escala anterior
        'display-2xl': ['clamp(2.75rem, 5vw + 1rem, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.003em', fontWeight: '510' }],
        'display-xl': ['clamp(2.25rem, 4vw + 1rem, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.005em', fontWeight: '510' }],
        'display-lg': ['clamp(1.75rem, 2.5vw + 1rem, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.008em', fontWeight: '510' }],
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '6px',
        md: '6px',
        lg: '6px',
        xl: '12px',
        '2xl': '16px',
        '3xl': '22px',
        '4xl': '2rem',
        '5xl': '2.5rem',
        pill: '9999px',
      },
      boxShadow: {
        // Sombras Linear (sutiles y contenidas)
        'linear-sm': 'rgba(0, 0, 0, 0.4) 0px 2px 4px 0px',
        'linear-md': 'rgba(0, 0, 0, 0.2) 0px 0px 12px 0px inset',
        'linear-subtle': 'rgb(35, 37, 42) 0px 0px 0px 1px inset',
        'linear-subtle-2': 'rgba(0, 0, 0, 0.2) 0px 0px 0px 1px',
        'linear-subtle-3': 'rgba(0, 0, 0, 0.01) 0px 5px 2px 0px, rgba(0, 0, 0, 0.04) 0px 3px 2px 0px, rgba(0, 0, 0, 0.07) 0px 1px 1px 0px, rgba(0, 0, 0, 0.08) 0px 0px 1px 0px',
        'linear-xl': 'rgba(8, 9, 10, 0.6) 0px 4px 32px 0px',
        'linear-card-inset': 'rgba(255, 255, 255, 0.03) 0px 0px 0px 1px inset, rgba(255, 255, 255, 0.04) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.6) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 4px 4px 0px',
        // Aliases legacy → mapeados a sombras dark coherentes
        soft: 'rgba(0, 0, 0, 0.4) 0px 2px 4px 0px',
        card: 'rgba(0, 0, 0, 0.4) 0px 2px 4px 0px, rgb(35, 37, 42) 0px 0px 0px 1px inset',
        accent: '0 4px 24px -6px rgba(228, 242, 34, 0.35)',
        'accent-lg': '0 18px 40px -12px rgba(228, 242, 34, 0.45)',
        lift: '0 18px 40px -12px rgba(8, 9, 10, 0.6)',
      },
      backgroundImage: {
        // Gradientes ahora monocromos / acentos puntuales
        'gradient-brand': 'linear-gradient(to right, #f7f8f8, #d0d6e0)',
        'gradient-brand-soft': 'linear-gradient(to right, rgba(228,242,34,0.08), rgba(94,106,210,0.08))',
        'gradient-tri': 'linear-gradient(to bottom right, #161718, #0f1011, #08090a)',
        'fade-down': 'linear-gradient(180deg, #08090a 0%, #0f1011 100%)',
        'tile': 'linear-gradient(180deg, #0f1011 0%, #161718 100%)',
        'lime-glow': 'radial-gradient(circle at 50% 50%, rgba(228,242,34,0.18) 0%, transparent 60%)',
        'aether-glow': 'radial-gradient(circle at 50% 50%, rgba(94,106,210,0.22) 0%, transparent 60%)',
      },
      keyframes: {
        'reveal-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'reveal-fade': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.3)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'float-y': {
          '0%, 100%': { transform: 'translateY(-10px)' },
          '50%': { transform: 'translateY(10px)' },
        },
        'float-y-rev': {
          '0%, 100%': { transform: 'translateY(10px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'reveal-up': 'reveal-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'reveal-fade': 'reveal-fade 0.9s ease-out both',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        'spin-slow': 'spin-slow 60s linear infinite',
        'float-y': 'float-y 5s ease-in-out infinite',
        'float-y-rev': 'float-y-rev 4s ease-in-out infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
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
