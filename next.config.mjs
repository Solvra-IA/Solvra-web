/** @type {import('next').NextConfig} */

/**
 * Content Security Policy.
 *
 * Las fuentes Inter se sirven self-hosted vía next/font/google (bundle en build),
 * por eso no hace falta whitelisting de fonts.googleapis.com / fonts.gstatic.com.
 * Vercel Analytics necesita va.vercel-scripts.com (script) y
 * vitals.vercel-insights.com (beacon).
 *
 * TODO(seguridad): sustituir 'unsafe-inline' en script-src por nonces.
 * Next 14+ admite nonces vía middleware; añade un middleware que genere
 * un nonce por request, lo inyecte en la cabecera CSP y lo propague a
 * <Script nonce={...}> y a los scripts inline de Next. Mientras tanto,
 * 'unsafe-inline' permite XSS reflejado si entra contenido de usuario;
 * en una landing 100% estática el riesgo es bajo, pero conviene cerrarlo.
 * Ref: https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
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
