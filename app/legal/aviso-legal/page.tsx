import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Aviso legal',
  description: 'Información legal y titularidad del sitio Solvra.',
};

export default function AvisoLegalPage() {
  return (
    <Container as="section" className="max-w-3xl py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Aviso legal</h1>
      <p className="mt-6 text-slate-600">
        Este sitio web es titularidad de Solvra, en joint venture con Solfico S.L. (Vilanova
        i la Geltrú, Cataluña). El contenido tiene carácter informativo. Los datos
        identificativos completos (denominación social, CIF, domicilio y registro) se
        publicarán en cuanto la sociedad esté formalmente constituida.
      </p>
      <p className="mt-4 text-slate-600">
        Para cualquier consulta puedes escribirnos a través del formulario de contacto.
      </p>
    </Container>
  );
}
