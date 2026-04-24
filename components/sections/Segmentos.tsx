import { Container } from '@/components/ui/Container';

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
    <section id="segmentos" className="bg-slate-50 py-20 md:py-28">
      <Container as="div">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Sectores donde ya generamos valor
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            No somos generalistas. Nos centramos donde tenemos experiencia real.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {segmentos.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-slate-200 bg-white p-8"
            >
              <h3 className="text-xl font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-3 text-slate-600">{s.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
