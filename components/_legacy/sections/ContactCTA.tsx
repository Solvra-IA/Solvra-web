import { Container } from '@/components/ui/Container';
import { SectionIntro } from '@/components/ui/SectionIntro';
import { ContactForm } from '@/components/forms/ContactForm';

const bullets = [
  'Respuesta en menos de 24 horas laborables',
  'Sin comerciales insistentes',
  'En español, claro y directo',
];

export function ContactCTA() {
  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-muted py-28 md:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-32 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[120px]"
      />
      <Container as="div" className="relative">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-start lg:gap-20">
          <div className="lg:col-span-5">
            <SectionIntro
              badge="Contacto"
              size="lg"
              align="left"
              title={
                <>
                  Cuéntanos tu <span className="text-gradient-brand">caso</span>
                </>
              }
              description="Una sesión inicial de 30 minutos, gratuita y sin compromiso. Te diremos si podemos ayudarte y cómo."
            />
            <ul className="reveal mt-10 space-y-4">
              {bullets.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[15px] text-muted-foreground md:text-base"
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

          {/* Featured card — técnica de stroke degradado de 2px */}
          <div className="reveal lg:col-span-7">
            <div className="rounded-2xl bg-gradient-tri p-[2px] shadow-accent-lg">
              <div className="rounded-[14px] bg-card p-7 sm:p-9">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
