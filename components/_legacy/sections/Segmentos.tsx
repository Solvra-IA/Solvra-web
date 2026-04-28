import { Container } from '@/components/ui/Container';
import { SectionIntro } from '@/components/ui/SectionIntro';

const segmentos = [
  {
    title: 'Inmobiliarias',
    description:
      'Cualificación automática de leads, redacción de descripciones de inmuebles, respuestas 24/7 a consultas frecuentes y seguimiento postvisita.',
  },
  {
    title: 'Clínicas',
    description:
      'Recordatorios inteligentes, gestión de citas, respuestas a pacientes fuera de horario y documentación asistida sin tocar datos sensibles sin control.',
  },
  {
    title: 'Servicios profesionales',
    description:
      'Gestorías, despachos y consultoras: redacción asistida, resumen de documentación, clasificación automática y soporte al cliente.',
  },
];

export function Segmentos() {
  return (
    <section id="segmentos" className="bg-muted py-28 md:py-40">
      <Container as="div">
        <SectionIntro
          badge="Sectores"
          title={
            <>
              Sectores donde ya generamos{' '}
              <span className="text-gradient-brand">valor</span>
            </>
          }
          description="No somos generalistas. Nos centramos donde tenemos experiencia real."
        />
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {segmentos.map((s, i) => (
            <article
              key={s.title}
              className="reveal group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-10 shadow-md transition-all duration-300 ease-apple hover:-translate-y-1 hover:shadow-xl"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <span className="relative font-mono text-4xl font-semibold tracking-tightest text-gradient-brand">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="relative mt-6 text-2xl font-semibold tracking-tightest text-foreground md:text-[28px]">
                {s.title}
              </h3>
              <p className="relative mt-4 text-pretty leading-relaxed text-muted-foreground md:text-[17px]">
                {s.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
