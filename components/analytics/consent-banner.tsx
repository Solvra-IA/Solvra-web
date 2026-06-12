'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/shadcn/button';
import { applyConsentMode, getStoredConsent, storeConsent, type ConsentChoice } from '@/lib/analytics';

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) {
      applyConsentMode(stored);
      return;
    }
    setVisible(true);
  }, []);

  function handleChoice(choice: ConsentChoice) {
    storeConsent(choice);
    applyConsentMode(choice);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="consent-title"
      aria-describedby="consent-desc"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-border bg-background/95 p-4 shadow-lg backdrop-blur-md sm:p-6"
    >
      <div className="container mx-auto flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p id="consent-title" className="text-sm font-semibold text-foreground">
            Cookies y medición
          </p>
          <p id="consent-desc" className="text-sm leading-relaxed text-muted-foreground">
            Usamos cookies técnicas y, con tu permiso, analítica (GA4) y publicidad
            (Meta/LinkedIn) para medir visitas y conversiones. Puedes cambiar tu
            elección en cualquier momento desde{' '}
            <Link href="/legal/cookies" className="underline underline-offset-4">
              cookies
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            className="min-h-11"
            onClick={() => handleChoice('essential')}
          >
            Solo necesarias
          </Button>
          <Button
            type="button"
            className="min-h-11"
            onClick={() => handleChoice('all')}
          >
            Aceptar todas
          </Button>
        </div>
      </div>
    </div>
  );
}
