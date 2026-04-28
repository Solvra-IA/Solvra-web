import { Container } from '@/components/ui/Container';
import { SectionIntro } from '@/components/ui/SectionIntro';
import { siteConfig } from '@/lib/site-config';

const diferenciadores = [
  'Sin humo ni buzzwords',
  'Precios cerrados, sin sorpresas',
  'Cumplimiento RGPD de serie',
  'Soporte en español',
  'Integración con tus herramientas',
  'Acompañamiento real',
];

export function SobreNosotros() {
  return (
    <section
      id="nosotros"
      className="relative overflow-hidden bg-foreground py-28 text-background md:py-40"
    >
      {/* Patrón de puntos sobre fondo invertido */}
      <div aria-hidden className="absolute inset-0 bg-dots-light opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-accent/15 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-[320px] w-[320px] rounded-full bg-accent-secondary/15 blur-[120px]"
      />

      <Container as="div" className="relative">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-start lg:gap-20">
          <div className="lg:col-span-6">
            <SectionIntro
              badge="Sobre nosotros"
              tone="inverse"
              size="lg"
              align="left"
              title={
                <>
                  Tecnología con{' '}
                  <span className="text-gradient-brand">contexto</span> de negocio
                </>
              }
            />
            <p className="reveal mt-8 text-pretty text-lg leading-relaxed text-white/75 md:text-xl md:leading-[1.5]">
              {siteConfig.name} nace como joint venture con{' '}
              <strong className="font-semibold text-white">
                {siteConfig.partner.name}
              </strong>
              , una gestoría con décadas de experiencia acompañando a PYMEs desde{' '}
              {siteConfig.partner.location}.
            </p>
            <p className="reveal mt-5 text-pretty text-lg leading-relaxed text-white/75 md:text-xl md:leading-[1.5]">
              Combinamos conocimiento técnico de IA con comprensión real de cómo funciona
              una pequeña o mediana empresa española: su fiscalidad, sus ritmos, sus
              obligaciones y sus límites.
            </p>
          </div>
          <ul className="reveal grid gap-3 sm:grid-cols-2 lg:col-span-6">
            {diferenciadores.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-[15px] font-medium text-white backdrop-blur-sm transition-all duration-300 ease-apple hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10"
              >
                <span
                  aria-hidden
                  className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gradient-brand text-accent-foreground shadow-accent"
                >
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6.2L4.8 9L10 3.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
