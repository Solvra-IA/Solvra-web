'use client';

import { useState, type FormEvent } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button, ArrowRight } from '@/components/ui/Button';
import { contactSchema, type ContactInput } from '@/lib/validations';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const formData = new FormData(event.currentTarget);
    const payload: ContactInput = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      company: String(formData.get('company') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      message: String(formData.get('message') ?? ''),
      website: String(formData.get('website') ?? ''),
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      setStatus('error');
      const first = Object.values(parsed.error.flatten().fieldErrors).flat()[0];
      setErrorMsg(first ?? 'Revisa los datos del formulario');
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        setStatus('error');
        setErrorMsg(
          res.status === 429
            ? 'Demasiados envíos. Espera unos minutos antes de volver a intentarlo.'
            : 'No se pudo enviar. Inténtalo de nuevo en unos minutos.',
        );
        return;
      }
      setStatus('success');
      event.currentTarget.reset();
    } catch {
      setStatus('error');
      setErrorMsg('Error de red. Revisa tu conexión.');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-3xl bg-surface-muted p-10 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-500/10 text-brand-500">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M4 10.5L8 14.5L16 5.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="mt-5 text-2xl font-semibold tracking-tightest text-ink">
          ¡Mensaje enviado!
        </p>
        <p className="mt-2 text-ink-muted">
          Te contestamos en menos de 24 horas laborables.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-[13px] font-medium text-ink-muted">
            Nombre *
          </label>
          <Input id="name" name="name" required autoComplete="name" />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-[13px] font-medium text-ink-muted">
            Email *
          </label>
          <Input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div>
          <label
            htmlFor="company"
            className="mb-2 block text-[13px] font-medium text-ink-muted"
          >
            Empresa
          </label>
          <Input id="company" name="company" autoComplete="organization" />
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block text-[13px] font-medium text-ink-muted">
            Teléfono
          </label>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-[13px] font-medium text-ink-muted">
          ¿En qué podemos ayudarte? *
        </label>
        <Textarea id="message" name="message" required />
      </div>

      {/* Honeypot anti-bot: oculto para usuarios, los bots lo rellenan. */}
      <div aria-hidden className="hidden">
        <label htmlFor="website">Web</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {status === 'error' && errorMsg ? (
        <p className="text-sm text-red-600" role="alert">
          {errorMsg}
        </p>
      ) : null}

      <div className="flex flex-col items-stretch gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-ink-subtle">
          Al enviar aceptas nuestra{' '}
          <a
            href="/legal/privacidad"
            className="font-medium text-ink-muted underline-offset-4 hover:text-brand-700 hover:underline"
          >
            política de privacidad
          </a>
          .
        </p>
        <Button
          type="submit"
          disabled={status === 'loading'}
          className="w-full sm:w-auto sm:shrink-0"
        >
          {status === 'loading' ? 'Enviando…' : 'Enviar mensaje'}
          {status === 'loading' ? null : <ArrowRight />}
        </Button>
      </div>
    </form>
  );
}
