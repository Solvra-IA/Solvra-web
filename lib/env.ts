import { z } from 'zod';

/**
 * Validación de variables de entorno al arrancar el proceso.
 *
 * Convierte un fallo de configuración (típicamente "olvidé poner la API key
 * en Vercel") en un error de build claro en lugar de un 500 silencioso en
 * runtime cuando alguien envía el formulario.
 *
 * Importar `env` desde `@/lib/env` en cualquier código server-side que
 * necesite estas variables. La validación se ejecuta una sola vez al cargar
 * el módulo.
 */

const serverSchema = z.object({
  RESEND_API_KEY: z.string().min(1, 'RESEND_API_KEY no está definida'),
  CONTACT_FROM_EMAIL: z
    .string()
    .email('CONTACT_FROM_EMAIL debe ser un email válido')
    .min(1),
  CONTACT_TO_EMAIL: z
    .string()
    .email('CONTACT_TO_EMAIL debe ser un email válido')
    .min(1),
  TURNSTILE_SECRET_KEY: z.string().min(1).optional(),
  CONTACT_WEBHOOK_URL: z.string().url().optional(),
});

const clientSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url('NEXT_PUBLIC_SITE_URL debe ser una URL válida')
    .default('http://localhost:3000'),
  NEXT_PUBLIC_WHATSAPP_URL: z
    .string()
    .url('NEXT_PUBLIC_WHATSAPP_URL debe ser una URL válida')
    .optional(),
  NEXT_PUBLIC_GTM_ID: z.string().min(1).optional(),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().min(1).optional(),
});

type ServerEnv = z.infer<typeof serverSchema>;
type ClientEnv = z.infer<typeof clientSchema>;

/**
 * Cliente: variables `NEXT_PUBLIC_*` accesibles en el navegador.
 * Se valida siempre (server y client).
 */
export const clientEnv: ClientEnv = clientSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_WHATSAPP_URL: process.env.NEXT_PUBLIC_WHATSAPP_URL,
  NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
});

/**
 * Servidor: API keys y secretos. Solo se valida en runtime server-side.
 *
 * En tiempo de build (cuando Next prerenderiza páginas estáticas),
 * `process.env` no contiene secretos del entorno de producción todavía.
 * Por eso devolvemos `null` en build y solo validamos cuando el código
 * realmente se ejecuta como handler.
 */
let cachedServerEnv: ServerEnv | null = null;

export function getServerEnv(): ServerEnv {
  if (cachedServerEnv) return cachedServerEnv;

  const parsed = serverSchema.safeParse({
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
    TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
    CONTACT_WEBHOOK_URL: process.env.CONTACT_WEBHOOK_URL,
  });

  if (!parsed.success) {
    const issues = parsed.error.flatten().fieldErrors;
    const messages = Object.entries(issues)
      .flatMap(([field, errors]) => (errors ?? []).map((e) => `  - ${field}: ${e}`))
      .join('\n');
    throw new Error(
      `Configuración del servidor incompleta:\n${messages}\n\nRevisa que .env.local (local) o las variables del proyecto (Vercel) estén definidas.`,
    );
  }

  cachedServerEnv = parsed.data;
  return cachedServerEnv;
}

/** Turnstile obligatorio en producción cuando hay secret configurado. */
export function isTurnstileRequired(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY);
}
