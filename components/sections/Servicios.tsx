import { Container } from '@/components/ui/Container';

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
    <section id="servicios" className="py-20 md:py-28">
      <Container as="div">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Qué hacemos
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Cuatro servicios combinables según lo que necesite tu empresa.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {servicios.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-slate-200 bg-white p-8 transition-shadow hover:shadow-md"
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
