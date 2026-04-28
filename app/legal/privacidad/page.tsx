import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: 'Cómo tratamos tus datos personales en Solvra.',
};

export default function PrivacidadPage() {
  return (
    <section className="container mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        Política de privacidad
      </h1>
      <div className="mt-6 space-y-4 text-muted-foreground">
        <p>
          En Solvra tratamos los datos personales conforme al Reglamento (UE) 2016/679
          (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos Personales y garantía de
          los derechos digitales (LOPDGDD).
        </p>
        <h2 className="mt-6 text-xl font-semibold text-foreground">
          Qué datos recogemos
        </h2>
        <p>
          Únicamente los que tú nos facilitas en el formulario de contacto: nombre, email
          y, opcionalmente, empresa, teléfono y el mensaje que escribas.
        </p>
        <h2 className="mt-6 text-xl font-semibold text-foreground">Para qué los usamos</h2>
        <p>
          Para responder a tu consulta. No los usamos para fines comerciales distintos ni
          los cedemos a terceros salvo obligación legal.
        </p>
        <h2 className="mt-6 text-xl font-semibold text-foreground">Conservación</h2>
        <p>
          Conservamos los datos mientras exista una relación o consulta activa y, después,
          durante los plazos legales mínimos.
        </p>
        <h2 className="mt-6 text-xl font-semibold text-foreground">Tus derechos</h2>
        <p>
          Puedes ejercer los derechos de acceso, rectificación, supresión, oposición,
          portabilidad y limitación del tratamiento escribiéndonos al email de contacto.
        </p>
      </div>
    </section>
  );
}
