/**
 * Playground — los 8 componentes en orden con copy adaptado a marca Solvra.
 * Fase 3: contenido localizado y propuestas reales del negocio.
 */
import { Lightbulb, Workflow, Plug } from 'lucide-react';

import SaasTemplate from '@/components/ui/saa-s-template';
import { BeamsBackground } from '@/components/ui/beams-background';
import { Feature108 } from '@/components/ui/shadcnblocks-com-feature108';
import { LogoCloud } from '@/components/ui/logo-cloud-2';
import { Testimonials } from '@/components/ui/testimonials-columns-1';
import { Cta4 } from '@/components/ui/cta-4';
import { FaqsSection } from '@/components/ui/faqs-1';
import { RoadmapCard } from '@/components/ui/roadmap-card';

export const metadata = {
  title: 'Playground · Solvra',
  description: 'Stack de 8 componentes con copy adaptado a Solvra.',
  robots: { index: false, follow: false },
};

const feature108Tabs = [
  {
    value: 'tab-1',
    icon: <Lightbulb className="h-auto w-4 shrink-0" />,
    label: 'Diagnóstico',
    content: {
      badge: 'Punto de partida',
      title: 'Identificamos dónde la IA mueve la aguja.',
      description:
        'Una sesión sin compromiso para mapear tus procesos y detectar oportunidades concretas. Sin lenguaje técnico, con un plan claro al final.',
      buttonText: 'Solicitar diagnóstico',
      imageSrc: 'https://shadcnblocks.com/images/block/placeholder-dark-1.svg',
      imageAlt: 'Diagnóstico de IA',
    },
  },
  {
    value: 'tab-2',
    icon: <Workflow className="h-auto w-4 shrink-0" />,
    label: 'Automatización',
    content: {
      badge: 'Procesos repetitivos',
      title: 'Tu equipo dedicado a lo que importa.',
      description:
        'Automatizamos respuestas, gestión documental y seguimiento comercial con agentes inteligentes que se integran con tus herramientas actuales.',
      buttonText: 'Ver casos de uso',
      imageSrc: 'https://shadcnblocks.com/images/block/placeholder-dark-2.svg',
      imageAlt: 'Automatización de procesos',
    },
  },
  {
    value: 'tab-3',
    icon: <Plug className="h-auto w-4 shrink-0" />,
    label: 'Integración',
    content: {
      badge: 'Compatible con lo tuyo',
      title: 'Sin reemplazar lo que ya funciona.',
      description:
        'Conectamos la IA con tu CRM, ERP, email y agenda. Solo proponemos cambios cuando una herramienta está bloqueando el resultado.',
      buttonText: 'Ver integraciones',
      imageSrc: 'https://shadcnblocks.com/images/block/placeholder-dark-3.svg',
      imageAlt: 'Integraciones',
    },
  },
];

const roadmapItems = [
  {
    quarter: 'Q2 2026',
    title: 'Plantillas sectoriales',
    description: 'Soluciones precargadas para inmobiliarias y clínicas',
    status: 'done' as const,
  },
  {
    quarter: 'Q3 2026',
    title: 'Conectores CRM',
    description: 'Integración nativa con HubSpot, Pipedrive y Sage',
    status: 'in-progress' as const,
  },
  {
    quarter: 'Q4 2026',
    title: 'Asistentes verticales',
    description: 'Agentes especializados por sector y tarea',
    status: 'upcoming' as const,
  },
  {
    quarter: 'Q1 2027',
    title: 'Programa partners',
    description: 'Red de gestorías que despliegan Solvra',
    status: 'upcoming' as const,
  },
];

export default function PlaygroundPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Heroes (dark) */}
      <SaasTemplate />
      <BeamsBackground />

      {/* Servicios (feature108) */}
      <div className="bg-background">
        <Feature108
          badge="Servicios"
          heading="Cuatro servicios que se adaptan a tu negocio"
          description="Diagnóstico, automatización, integración y acompañamiento. Combínalos según lo que necesites."
          tabs={feature108Tabs}
        />
      </div>

      {/* Tecnología que usamos (logo-cloud) */}
      <section className="bg-muted py-24 md:py-32">
        <div className="container mx-auto max-w-3xl px-6">
          <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight md:text-4xl">
            Tecnología que{' '}
            <span className="text-primary">utilizamos</span>
          </h2>
          <LogoCloud />
        </div>
      </section>

      {/* Testimonios */}
      <Testimonials />

      {/* CTA-4 */}
      <div className="bg-muted">
        <Cta4
          title="Empieza con un diagnóstico gratuito"
          description="30 minutos para entender tu negocio y proponerte un plan claro. Sin compromiso, sin comerciales insistentes."
          buttonText="Hablemos"
          buttonUrl="#contacto"
          items={[
            'Diagnóstico inicial sin coste',
            'Precio cerrado desde el inicio',
            'Cumplimiento RGPD de serie',
            'Soporte en español',
            'Acompañamiento real, no un curso',
          ]}
        />
      </div>

      {/* FAQs */}
      <section className="bg-background py-24 md:py-32">
        <FaqsSection />
      </section>

      {/* Roadmap */}
      <section className="bg-muted py-24 md:py-32">
        <div className="container mx-auto flex justify-center px-6">
          <RoadmapCard
            title="Nuestra hoja de ruta"
            description="Próximas evoluciones del servicio Solvra"
            items={roadmapItems}
          />
        </div>
      </section>
    </div>
  );
}
