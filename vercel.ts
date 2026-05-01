import { routes, type VercelConfig } from '@vercel/config/v1';

/**
 * Configuración del proyecto en Vercel.
 *
 * Reemplaza al tradicional `vercel.json`. Permite TypeScript con tipado
 * completo, lógica dinámica y acceso a variables de entorno.
 *
 * Documentación: https://vercel.com/docs/project-configuration/vercel-ts
 */
export const config: VercelConfig = {
  framework: 'nextjs',
  buildCommand: 'npm run build',
  installCommand: 'npm ci',
  outputDirectory: '.next',

  /**
   * Cabeceras estáticas con cache largo para assets en /_next/static/*.
   * Next ya las añade en runtime; esto las refuerza para el CDN de Vercel.
   */
  headers: [
    routes.cacheControl('/_next/static/(.*)', {
      public: true,
      maxAge: '1 year',
      immutable: true,
    }),
  ],

  /**
   * Redirects permanentes para variantes históricas de URLs.
   * Pendientes de añadir cuando lleguen las primeras URLs indexadas.
   */
  redirects: [],
};

export default config;
