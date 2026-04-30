import { Resend } from 'resend';
import { getServerEnv } from '@/lib/env';

let client: Resend | null = null;

export function getResend(): Resend {
  if (!client) {
    const { RESEND_API_KEY } = getServerEnv();
    client = new Resend(RESEND_API_KEY);
  }
  return client;
}
