import { Container } from '@/components/ui/Container';

const pasos = [
  {
    n: '01',
    title: 'Diagnóstico',
    description:
      'Sesión inicial sin compromiso. Analizamos tus procesos y detectamos oportunidades concretas.',
  },
  {
    n: '02',
    title: 'Propuesta',
    description:
      'Te entregamos un plan con entregables, plazos y retorno estimado. Precio cerrado, sin sorpresas.',
  },
  {
    n: '03',
    title: 'Implementación',
    description:
      'Desplegamos la solución integrada con tus herramientas actuales. Iteramos con tu equipo.',
  },
  {
    n: '04',
    title: 'Acompañamiento',
    description:
      'Medimos resultados, ajustamos y formamos a tu equipo. Nos quedamos hasta que funcione.',
  },
];

export function ComoTrabajamos() {
  return (
    <section id="como-trabajamos" className="py-20 md:py-28">
      <Container as="div">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Cómo trabajamos
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Un proceso claro, sin humo ni promesas vacías.
          </p>
        </div>
        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pasos.map((p) => (
            <li
              key={p.n}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <span className="text-sm font-semibold text-brand-600">{p.n}</span>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">{p.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{p.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
