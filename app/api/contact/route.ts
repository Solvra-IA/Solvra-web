import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations';
import { getResend } from '@/lib/resend';
import { ContactAutoresponderEmail, ContactEmail } from '@/lib/email-templates';
import { notifyContactWebhook } from '@/lib/contact-webhook';
import { check as rateLimit, getClientIp } from '@/lib/rate-limit';
import { getServerEnv, isTurnstileRequired } from '@/lib/env';
import { verifyTurnstileToken } from '@/lib/turnstile';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  // Rate-limit antes de parsear payload — protege también de payloads grandes.
  const ip = getClientIp(request.headers);
  const limited = rateLimit(`contact:${ip}`);
  if (!limited.ok) {
    return NextResponse.json(
      { error: 'Demasiadas peticiones. Inténtalo más tarde.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(limited.retryAfter),
          'X-RateLimit-Remaining': '0',
        },
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Datos no válidos', issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot: silenciamos la petición si viene relleno.
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  let env;
  try {
    env = getServerEnv();
  } catch {
    return NextResponse.json(
      { error: 'Configuración del servidor incompleta' },
      { status: 500 },
    );
  }

  if (isTurnstileRequired()) {
    const token = data.turnstileToken;
    if (!token) {
      return NextResponse.json(
        { error: 'Verificación de seguridad requerida' },
        { status: 400 },
      );
    }
    const valid = await verifyTurnstileToken(
      token,
      env.TURNSTILE_SECRET_KEY as string,
      ip,
    );
    if (!valid) {
      return NextResponse.json(
        { error: 'Verificación de seguridad no válida' },
        { status: 400 },
      );
    }
  }

  try {
    const resend = getResend();

    const { error: teamError } = await resend.emails.send({
      from: env.CONTACT_FROM_EMAIL,
      to: env.CONTACT_TO_EMAIL,
      replyTo: data.email,
      subject: `Nuevo contacto — ${data.name}`,
      react: ContactEmail({ data }),
    });
    if (teamError) {
      return NextResponse.json({ error: 'No se pudo enviar el email' }, { status: 502 });
    }

    const { error: userError } = await resend.emails.send({
      from: env.CONTACT_FROM_EMAIL,
      to: data.email,
      subject: `Hemos recibido tu solicitud — Nexus`,
      react: ContactAutoresponderEmail({ name: data.name }),
    });
    if (userError) {
      console.error('[contact] autoresponder falló:', userError);
    }

    if (env.CONTACT_WEBHOOK_URL) {
      await notifyContactWebhook(env.CONTACT_WEBHOOK_URL, data);
    }

    return NextResponse.json(
      { ok: true },
      { headers: { 'X-RateLimit-Remaining': String(limited.remaining) } },
    );
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
