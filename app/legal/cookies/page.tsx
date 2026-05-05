import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de cookies',
  description: 'Uso de cookies en el sitio web de Solvra.',
};

export default function CookiesPage() {
  return (
    <section className="container mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        Política de cookies
      </h1>
      <div className="mt-6 space-y-4 text-muted-foreground">
        <p>
          Este sitio no utiliza cookies de seguimiento ni de publicidad de terceros. Solo
          utiliza las cookies técnicas estrictamente necesarias para el funcionamiento de
          la web (por ejemplo, preferencias básicas).
        </p>
        <p>
          El formulario de contacto envía datos al backend de Solvra y al proveedor de
          email transaccional (Resend), pero ese flujo no añade cookies publicitarias ni de
          perfilado.
        </p>
        <p>
          Si en el futuro incorporamos herramientas de analítica, actualizaremos esta
          política y te pediremos consentimiento previo conforme a la normativa vigente.
        </p>
      </div>
    </section>
  );
}
