import { Container } from '@/components/ui/Container';
import { LinkButton } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
      <Container as="div" className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-medium text-brand-700">
            Consultoría de IA para PYMEs
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Integra IA en tu empresa sin complicarte la vida.
          </h1>
          <p className="mt-6 text-lg text-slate-600 md:text-xl">
            Automatizamos procesos, reducimos tareas repetitivas y mejoramos la atención al
            cliente en inmobiliarias, clínicas y servicios profesionales. Resultados medibles
            en semanas, no en años.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <LinkButton href="#contacto" size="lg">
              Solicitar diagnóstico gratuito
            </LinkButton>
            <LinkButton href="#servicios" variant="secondary" size="lg">
              Ver qué hacemos
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
