import { Container } from '@/components/ui/Container';
import { LinkButton, ArrowRight } from '@/components/ui/Button';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { HeroGraphic } from '@/components/sections/HeroGraphic';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-fade-down">
      {/* Glow ambient detrás del bloque hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[760px]"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, rgba(0,82,255,0.10) 0%, rgba(77,124,255,0.04) 40%, rgba(255,255,255,0) 75%)',
        }}
      />

      <Container as="div" className="relative pb-24 pt-24 md:pb-32 md:pt-32 lg:pt-36">
        <div className="mx-auto max-w-5xl text-center">
          <div className="animate-reveal-fade">
            <SectionBadge>Consultoría de IA para PYMEs</SectionBadge>
          </div>
          <h1 className="mt-7 animate-reveal-up text-balance text-display-2xl text-foreground">
            Integra <span className="text-gradient-brand">IA</span> en tu empresa sin
            complicarte la vida.
          </h1>
          <p
            className="mx-auto mt-7 max-w-3xl animate-reveal-up text-pretty text-xl leading-relaxed text-muted-foreground md:text-2xl md:leading-[1.4]"
            style={{ animationDelay: '0.1s' }}
          >
            Automatizamos procesos, reducimos tareas repetitivas y mejoramos la atención al
            cliente en inmobiliarias, clínicas y servicios profesionales. Resultados medibles
            en semanas, no en años.
          </p>
          <div
            className="mt-12 flex animate-reveal-up flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: '0.2s' }}
          >
            <LinkButton href="#contacto" size="lg" className="w-full sm:w-auto">
              Solicitar diagnóstico gratuito
              <ArrowRight />
            </LinkButton>
            <LinkButton
              href="#servicios"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              Ver qué hacemos
            </LinkButton>
          </div>
        </div>
        <HeroGraphic />
      </Container>
    </section>
  );
}
