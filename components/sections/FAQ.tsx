import { Container } from '@/components/ui/Container';
import { SectionBadge } from '@/components/ui/SectionBadge';

const faqs = [
  {
    q: '¿Cuánto cuesta un proyecto con Solvra?',
    a: 'Depende del alcance. Ofrecemos un diagnóstico inicial gratuito y, tras esa sesión, enviamos un presupuesto cerrado con entregables y plazos. Trabajamos con PYMEs, así que ajustamos el alcance a presupuestos realistas.',
  },
  {
    q: '¿Tengo que cambiar mis herramientas actuales?',
    a: 'No. Integramos la IA con tu CRM, ERP, correo o agenda actuales. Solo proponemos cambios si una herramienta está bloqueando el resultado.',
  },
  {
    q: '¿Qué pasa con la protección de datos?',
    a: 'Cumplimos RGPD de serie. Revisamos qué datos salen del entorno de tu empresa, firmamos los acuerdos necesarios y priorizamos soluciones que mantienen los datos sensibles bajo tu control.',
  },
  {
    q: '¿Cuánto tarda en verse resultado?',
    a: 'La mayoría de proyectos entregan impacto medible en 4–8 semanas. Los diagnósticos se cierran en una o dos sesiones.',
  },
  {
    q: '¿Trabajáis solo en Cataluña?',
    a: 'Estamos en Vilanova i la Geltrú, pero trabajamos con empresas de toda España en remoto. Para proyectos grandes, nos desplazamos.',
  },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-background py-28 md:py-40">
      <Container as="div">
        <div className="reveal mx-auto max-w-3xl text-center">
          <SectionBadge>FAQ</SectionBadge>
          <h2 className="mt-6 text-balance text-display-xl text-foreground">
            Preguntas <span className="text-gradient-brand">frecuentes</span>
          </h2>
        </div>
        <div className="mx-auto mt-16 max-w-3xl">
          {faqs.map((f, i) => (
            <details
              key={f.q}
              className="reveal group hairline-b py-6 transition-colors first:hairline-t"
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-lg font-medium text-foreground transition-colors hover:text-accent [&::-webkit-details-marker]:hidden md:text-xl">
                <span>{f.q}</span>
                <span
                  aria-hidden
                  className="grid h-7 w-7 shrink-0 place-items-center text-muted-foreground transition-transform duration-300 ease-apple group-open:rotate-45 group-open:text-accent"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 1.5V12.5M1.5 7H12.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground md:text-[17px]">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
