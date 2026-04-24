import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations';
import { getResend } from '@/lib/resend';
import { ContactEmail } from '@/lib/email-templates';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
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

  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!to || !from) {
    return NextResponse.json(
      { error: 'Configuración de email incompleta' },
      { status: 500 },
    );
  }

  try {
    const resend = getResend();
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `Nuevo contacto — ${data.name}`,
      react: ContactEmail({ data }),
    });
    if (error) {
      return NextResponse.json({ error: 'No se pudo enviar el email' }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
