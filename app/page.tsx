import { Lightbulb, Workflow, Plug } from 'lucide-react';

import SaasTemplate from '@/components/ui/saa-s-template';
import { BeamsBackground } from '@/components/ui/beams-background';
import { SectorsGrid } from '@/components/ui/sectors-grid';
import { Feature108 } from '@/components/ui/shadcnblocks-com-feature108';
import { ProcessTimeline } from '@/components/ui/process-timeline';
import { LogoCloud } from '@/components/ui/logo-cloud-2';
import { Testimonials } from '@/components/ui/testimonials-columns-1';
import { AboutSplit } from '@/components/ui/about-split';
import { FaqsSection } from '@/components/ui/faqs-1';
import { ContactSection } from '@/components/ui/contact-section';
import { SiteFooter } from '@/components/ui/site-footer';

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

export default function HomePage() {
  return (
    <div className="bg-background text-foreground">
      <SaasTemplate />
      <BeamsBackground />
      <SectorsGrid />
      <section id="servicios">
        <Feature108
          badge="Servicios"
          heading="Cuatro servicios que se adaptan a tu negocio"
          description="Diagnóstico, automatización, integración y acompañamiento. Combínalos según lo que necesites."
          tabs={feature108Tabs}
        />
      </section>
      <ProcessTimeline />
      <section className="bg-muted py-24 md:py-32">
        <div className="container mx-auto max-w-3xl px-6">
          <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight md:text-4xl">
            Tecnología que <span className="text-primary">utilizamos</span>
          </h2>
          <LogoCloud />
        </div>
      </section>
      <Testimonials />
      <AboutSplit />
      <section id="faq" className="bg-background py-24 md:py-32">
        <FaqsSection />
      </section>
      <ContactSection />
      <SiteFooter />
    </div>
  );
}
