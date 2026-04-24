'use client';

import { useState, type FormEvent } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
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
        setErrorMsg('No se pudo enviar. Inténtalo de nuevo en unos minutos.');
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
      <div className="rounded-2xl border border-accent-500/30 bg-accent-500/10 p-8 text-center">
        <p className="text-lg font-semibold text-slate-900">¡Mensaje enviado!</p>
        <p className="mt-2 text-slate-600">
          Te contestamos en menos de 24 horas laborables.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-800">
            Nombre *
          </label>
          <Input id="name" name="name" required autoComplete="name" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-800">
            Email *
          </label>
          <Input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div>
          <label
            htmlFor="company"
            className="mb-1 block text-sm font-medium text-slate-800"
          >
            Empresa
          </label>
          <Input id="company" name="company" autoComplete="organization" />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-slate-800">
            Teléfono
          </label>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-800">
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

      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-slate-500">
          Al enviar aceptas nuestra{' '}
          <a href="/legal/privacidad" className="underline hover:text-brand-700">
            política de privacidad
          </a>
          .
        </p>
        <Button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Enviando…' : 'Enviar mensaje'}
        </Button>
      </div>
    </form>
  );
}
