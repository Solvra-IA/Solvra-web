/**
 * Verificación server-side de Cloudflare Turnstile.
 */

type TurnstileVerifyResponse = {
  success: boolean;
  'error-codes'?: string[];
};

export async function verifyTurnstileToken(
  token: string,
  secretKey: string,
  remoteIp?: string,
): Promise<boolean> {
  const body = new URLSearchParams({
    secret: secretKey,
    response: token,
  });

  if (remoteIp) {
    body.set('remoteip', remoteIp);
  }

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) return false;

  const data = (await res.json()) as TurnstileVerifyResponse;
  return data.success === true;
}
