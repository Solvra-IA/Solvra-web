import { Container } from '@/components/ui/Container';
import { SectionBadge } from '@/components/ui/SectionBadge';

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

function Connector() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute -right-3 top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-gradient-brand text-accent-foreground shadow-accent lg:grid"
    >
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
        <path
          d="M3.5 8h9m0 0L9 4.5M12.5 8L9 11.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function ComoTrabajamos() {
  return (
    <section id="como-trabajamos" className="bg-background py-28 md:py-40">
      <Container as="div">
        <div className="reveal mx-auto max-w-3xl text-center">
          <SectionBadge>Proceso</SectionBadge>
          <h2 className="mt-6 text-balance text-display-xl text-foreground">
            Cómo <span className="text-gradient-brand">trabajamos</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            Un proceso claro, sin humo ni promesas vacías.
          </p>
        </div>

        <ol className="relative mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {/* Línea conectora horizontal en desktop */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-8 right-8 top-[68px] -z-0 hidden h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent lg:block"
          />
          {pasos.map((p, i) => (
            <li
              key={p.n}
              className="reveal group relative rounded-2xl border border-border bg-card p-8 shadow-md transition-all duration-300 ease-apple hover:-translate-y-0.5 hover:shadow-xl"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <span className="font-mono text-4xl font-semibold tracking-tightest text-gradient-brand">
                {p.n}
              </span>
              <h3 className="mt-5 text-xl font-semibold tracking-tightest text-foreground">
                {p.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                {p.description}
              </p>
              {i < pasos.length - 1 ? <Connector /> : null}
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
