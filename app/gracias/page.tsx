import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/shadcn/button';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Gracias',
  description: 'Hemos recibido tu solicitud de diagnóstico.',
  robots: { index: false, follow: false },
};

export default function GraciasPage() {
  return (
    <section className="container mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
        Gracias, hemos recibido tu solicitud
      </h1>
      <p className="mt-4 text-muted-foreground md:text-lg">
        Te responderemos en menos de 24 horas laborables al email que nos has
        indicado. Revisa también la bandeja de spam por si acaso.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild className="min-h-11">
          <Link href="/">Volver al inicio</Link>
        </Button>
        <Button asChild variant="outline" className="min-h-11">
          <a href={`mailto:${siteConfig.contactEmail}`}>Escribir a {siteConfig.contactEmail}</a>
        </Button>
      </div>
    </section>
  );
}
