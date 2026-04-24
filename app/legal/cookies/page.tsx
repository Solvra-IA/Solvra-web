import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Política de cookies',
  description: 'Uso de cookies en el sitio web de Solvra.',
};

export default function CookiesPage() {
  return (
    <Container as="section" className="max-w-3xl py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
        Política de cookies
      </h1>
      <div className="mt-6 space-y-4 text-slate-600">
        <p>
          Este sitio no utiliza cookies de seguimiento ni de publicidad de terceros. Solo
          utiliza las cookies técnicas estrictamente necesarias para el funcionamiento de
          la web (por ejemplo, preferencias básicas).
        </p>
        <p>
          Si en el futuro incorporamos herramientas de analítica, actualizaremos esta
          política y te pediremos consentimiento previo conforme a la normativa vigente.
        </p>
      </div>
    </Container>
  );
}
