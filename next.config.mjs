/** @type {import('next').NextConfig} */

/**
 * Content Security Policy.
 *
 * Whitelist explícito por servicio:
 * - Google Fonts: fonts.googleapis.com (CSS) y fonts.gstatic.com (woff2).
 * - Vercel Analytics: va.vercel-scripts.com (script) y vitals.vercel-insights.com (beacon).
 *
 * 'unsafe-inline' es necesario en script-src y style-src porque:
 * - Next.js inyecta runtime scripts inline para hidratación.
 * - Tailwind y framer-motion usan estilos inline en componentes client.
 *
 * Esto debilita la protección frente a XSS reflejado, pero sigue bloqueando
 * inyección de scripts desde dominios no listados, que es la amenaza más
 * común en una landing.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob:",
  "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Content-Security-Policy', value: csp },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: false },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
