import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Aviso legal',
  description: 'Información legal y titularidad del sitio Nexus.',
};

export default function AvisoLegalPage() {
  return (
    <section className="container mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        Aviso legal
      </h1>
      <div className="mt-6 space-y-4 text-muted-foreground">
        <p>
          Este sitio web es titularidad de Nexus, en joint venture con Solfico S.L.
          (Vilanova i la Geltrú, Cataluña), y tiene carácter informativo y comercial.
        </p>
        <p>
          Para cumplir plenamente la LSSI-CE, completa y revisa estos datos antes de
          publicar en producción:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Denominación social: [PENDIENTE]</li>
          <li>CIF/NIF: [PENDIENTE]</li>
          <li>Domicilio fiscal: [PENDIENTE]</li>
          <li>Datos de inscripción registral: [PENDIENTE]</li>
        </ul>
        <p>
          Contacto:{" "}
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            {siteConfig.contactEmail}
          </a>
        </p>
      </div>
    </section>
  );
}
