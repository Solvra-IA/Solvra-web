/**
 * Rate-limit en memoria por IP. Ventana deslizante simple.
 *
 * Limitación conocida: en Vercel serverless / edge cada función vive en su
 * propio aislado, así que el contador NO es global. Funciona como freno básico
 * para el spam casual y para abuso desde un solo origen sostenido (esa función
 * tiende a reutilizar el mismo aislado mientras esté caliente).
 *
 * Para protección real ante ataques distribuidos, sustituir por Upstash Redis
 * o Vercel KV. La interfaz `check()` está pensada para que ese cambio sea
 * mecánico — devolver { ok, retryAfter }.
 */

type Hit = {
  count: number;
  resetAt: number;
};

const store = new Map<string, Hit>();

const DEFAULT_LIMIT = 5; // 5 envíos
const DEFAULT_WINDOW_MS = 10 * 60 * 1000; // por cada 10 minutos

export type RateLimitResult = {
  ok: boolean;
  retryAfter: number; // segundos
  remaining: number;
};

export function check(
  key: string,
  { limit = DEFAULT_LIMIT, windowMs = DEFAULT_WINDOW_MS } = {},
): RateLimitResult {
  const now = Date.now();
  const hit = store.get(key);

  if (!hit || hit.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0, remaining: limit - 1 };
  }

  if (hit.count >= limit) {
    return {
      ok: false,
      retryAfter: Math.ceil((hit.resetAt - now) / 1000),
      remaining: 0,
    };
  }

  hit.count += 1;
  return { ok: true, retryAfter: 0, remaining: limit - hit.count };
}

/**
 * Extrae la IP del cliente respetando los headers que Vercel inyecta.
 * Cae a 'unknown' si no encuentra ninguno (en local detrás de localhost).
 */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0];
    if (first) return first.trim();
  }
  return headers.get('x-real-ip') ?? 'unknown';
}
