import { Container } from '@/components/ui/Container';
import { SectionBadge } from '@/components/ui/SectionBadge';

const servicios = [
  {
    title: 'Diagnóstico de IA',
    description:
      'Analizamos tu negocio y detectamos los procesos donde la IA genera más impacto con menos fricción.',
  },
  {
    title: 'Automatización de procesos',
    description:
      'Reducimos tareas repetitivas con agentes y flujos inteligentes: atención al cliente, gestión documental, seguimiento comercial.',
  },
  {
    title: 'Integración con tus herramientas',
    description:
      'Conectamos la IA con tu CRM, ERP, email y calendario. Sin reemplazar lo que ya funciona.',
  },
  {
    title: 'Formación y acompañamiento',
    description:
      'Formamos a tu equipo para que use la IA con criterio. Acompañamiento continuo, no un curso de un día.',
  },
];

export function Servicios() {
  return (
    <section id="servicios" className="bg-background py-28 md:py-40">
      <Container as="div">
        <div className="reveal mx-auto max-w-3xl text-center">
          <SectionBadge>Servicios</SectionBadge>
          <h2 className="mt-6 text-balance text-display-xl text-foreground">
            Qué <span className="text-gradient-brand">hacemos</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            Cuatro servicios combinables según lo que necesite tu empresa.
          </p>
        </div>
        <div className="mt-20 grid gap-6 md:grid-cols-2">
          {servicios.map((s, i) => (
            <article
              key={s.title}
              className="reveal group relative overflow-hidden rounded-2xl border border-border bg-card p-10 shadow-md transition-all duration-300 ease-apple hover:-translate-y-0.5 hover:shadow-xl"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-brand opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <h3 className="relative text-2xl font-semibold tracking-tightest text-foreground md:text-[28px]">
                {s.title}
              </h3>
              <p className="relative mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground md:text-[17px]">
                {s.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
