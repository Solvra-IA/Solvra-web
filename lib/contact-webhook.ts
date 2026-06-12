import type { ContactInput } from '@/lib/validations';

type WebhookPayload = ContactInput & {
  source: 'nexus-web';
  type: 'contact_form';
  submittedAt: string;
};

/**
 * Notifica a n8n/Make/CRM. Fallos no bloquean el envío al usuario.
 */
export async function notifyContactWebhook(
  webhookUrl: string,
  data: ContactInput,
): Promise<void> {
  const payload: WebhookPayload = {
    source: 'nexus-web',
    type: 'contact_form',
    submittedAt: new Date().toISOString(),
    ...data,
  };

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8_000),
    });
    if (!res.ok) {
      console.error('[contact-webhook] respuesta no OK:', res.status);
    }
  } catch (error) {
    console.error('[contact-webhook] error de red:', error);
  }
}
