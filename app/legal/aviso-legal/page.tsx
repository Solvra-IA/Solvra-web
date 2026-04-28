import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aviso legal',
  description: 'Información legal y titularidad del sitio Solvra.',
};

export default function AvisoLegalPage() {
  return (
    <section className="container mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        Aviso legal
      </h1>
      <p className="mt-6 text-muted-foreground">
        Este sitio web es titularidad de Solvra, en joint venture con Solfico S.L. (Vilanova
        i la Geltrú, Cataluña). El contenido tiene carácter informativo. Los datos
        identificativos completos (denominación social, CIF, domicilio y registro) se
        publicarán en cuanto la sociedad esté formalmente constituida.
      </p>
      <p className="mt-4 text-muted-foreground">
        Para cualquier consulta puedes escribirnos a través del formulario de contacto.
      </p>
    </section>
  );
}
