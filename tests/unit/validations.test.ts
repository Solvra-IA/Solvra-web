import { describe, it, expect } from 'vitest';
import { contactSchema } from '@/lib/validations';

describe('contactSchema', () => {
  const valid = {
    name: 'Marta Ribas',
    email: 'marta@example.com',
    message: 'Hola, queremos automatizar la cualificación de leads.',
    company: '',
    phone: '',
    website: '',
  };

  it('accepts a minimal valid payload', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects an invalid email', () => {
    const r = contactSchema.safeParse({ ...valid, email: 'not-an-email' });
    expect(r.success).toBe(false);
  });

  it('rejects a short message', () => {
    const r = contactSchema.safeParse({ ...valid, message: 'corto' });
    expect(r.success).toBe(false);
  });

  it('rejects a non-empty honeypot (bot signature)', () => {
    const r = contactSchema.safeParse({ ...valid, website: 'https://spam.example' });
    expect(r.success).toBe(false);
  });

  it('rejects a name that is too short', () => {
    const r = contactSchema.safeParse({ ...valid, name: 'A' });
    expect(r.success).toBe(false);
  });
});
