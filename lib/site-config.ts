export const siteConfig = {
  name: 'Solvra',
  tagline: 'Consultoría de IA para PYMEs españolas',
  description:
    'Solvra ayuda a pequeñas y medianas empresas españolas a integrar inteligencia artificial en sus procesos: inmobiliarias, clínicas y servicios profesionales.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  locale: 'es-ES',
  partner: {
    name: 'Solfico S.L.',
    location: 'Vilanova i la Geltrú, Cataluña',
  },
  contactEmail: 'hola@solvra.es',
  nav: [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Segmentos', href: '#segmentos' },
    { label: 'Cómo trabajamos', href: '#como-trabajamos' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'FAQ', href: '#faq' },
  ],
  legal: [
    { label: 'Aviso legal', href: '/legal/aviso-legal' },
    { label: 'Privacidad', href: '/legal/privacidad' },
    { label: 'Cookies', href: '/legal/cookies' },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
