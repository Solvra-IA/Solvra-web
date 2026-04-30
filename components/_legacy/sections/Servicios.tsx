import { Container } from '@/components/ui/Container';
import { SectionIntro } from '@/components/ui/SectionIntro';

function DiagnosticMapVisual() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -bottom-8 -right-6 h-44 w-60 opacity-90 transition-all duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
    >
      <svg viewBox="0 0 240 180" className="h-full w-full">
        <defs>
          <linearGradient id="node-link" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4d7cff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0052ff" stopOpacity="0.2" />
          </linearGradient>
          <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g fill="none" stroke="url(#node-link)" strokeWidth="1.3">
          <path d="M24 124 L78 96 L126 112 L170 72 L215 89" />
          <path d="M78 96 L92 58 L148 46 L170 72" />
          <path d="M126 112 L145 142 L201 138" />
        </g>

        <g filter="url(#soft-glow)">
          <circle cx="24" cy="124" r="3.8" fill="#6b8dff" />
          <circle cx="78" cy="96" r="4.2" fill="#7b97ff" />
          <circle cx="92" cy="58" r="4.5" fill="#4d7cff" />
          <circle cx="126" cy="112" r="4.1" fill="#7fa1ff" />
          <circle cx="145" cy="142" r="3.6" fill="#5f86ff" />
          <circle cx="148" cy="46" r="4.2" fill="#4d7cff" />
          <circle cx="170" cy="72" r="5" fill="#3f6fff" />
          <circle cx="201" cy="138" r="3.8" fill="#6b8dff" />
          <circle cx="215" cy="89" r="4.4" fill="#4d7cff" />
        </g>

        <g transform="translate(126 20)">
          <rect
            x="0"
            y="0"
            width="104"
            height="26"
            rx="8"
            fill="rgba(15,23,42,0.72)"
            stroke="rgba(248,113,113,0.45)"
          />
          <circle cx="13" cy="13" r="4.2" fill="#f87171" />
          <path d="M13 6.8 L16.9 16.8 L9.1 16.8 Z" fill="rgba(255,255,255,0.82)" />
          <text
            x="22"
            y="16.4"
            fill="rgba(255,255,255,0.88)"
            fontSize="8.4"
            fontFamily="Inter, system-ui, sans-serif"
          >
            Cuello de botella detectado
          </text>
        </g>
      </svg>
    </div>
  );
}

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
        <SectionIntro
          badge="Servicios"
          title={
            <>
              Qué <span className="text-gradient-brand">hacemos</span>
            </>
          }
          description="Cuatro servicios combinables según lo que necesite tu empresa."
        />
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
              {s.title === 'Diagnóstico de IA' ? <DiagnosticMapVisual /> : null}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
