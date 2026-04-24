import { Container } from '@/components/ui/Container';

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
    <section id="faq" className="py-20 md:py-28">
      <Container as="div">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Preguntas frecuentes
          </h2>
        </div>
        <div className="mx-auto mt-12 max-w-3xl divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {faqs.map((f) => (
            <details key={f.q} className="group p-6">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-base font-medium text-slate-900 [&::-webkit-details-marker]:hidden">
                <span>{f.q}</span>
                <span className="text-brand-600 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
