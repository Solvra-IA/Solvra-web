import { Lightbulb, Workflow, Plug } from 'lucide-react';

import HeroSection from '@/components/ui/hero-section';
import { BeamsBackground } from '@/components/ui/beams-background';
import { ServicesTabs } from '@/components/ui/services-tabs';
import { ProcessTimeline } from '@/components/ui/process-timeline';
import { LogoCloud } from '@/components/ui/tech-stack-logos';
import { Testimonials } from '@/components/ui/testimonials-section';
import { AboutSplit } from '@/components/ui/about-split';
import { FaqsSection } from '@/components/ui/faqs-section';
import { ContactSection } from '@/components/ui/contact-section';
import { SiteFooter } from '@/components/ui/site-footer';
import { SectorsGrid } from '@/components/ui/sectors-grid';

const servicesTabs = [
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
      imageSrc: '/feature/diagnostico.svg',
      imageAlt: 'Diagnóstico de oportunidades de IA',
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
      imageSrc: '/feature/automatizacion.svg',
      imageAlt: 'Automatización de procesos repetitivos',
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
      imageSrc: '/feature/integracion.svg',
      imageAlt: 'Integración con tus herramientas actuales',
    },
  },
];

export default function HomePage() {
  return (
    <div className="bg-background text-foreground">
      <HeroSection />
      <section id="servicios" className="scroll-mt-24 bg-background">
        <ServicesTabs
          badge="Servicios"
          heading="Cuatro servicios que se adaptan a tu negocio"
          description="Diagnóstico, automatización, integración y acompañamiento. Combínalos según lo que necesites."
          tabs={servicesTabs}
        />
      </section>
      <SectorsGrid />
      <ProcessTimeline />
      <section className="bg-muted/70 py-20 md:py-24">
        <div className="container mx-auto max-w-3xl px-6">
          <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight md:text-4xl">
            Tecnología que <span className="text-primary">utilizamos</span>
          </h2>
          <LogoCloud />
        </div>
      </section>
      <Testimonials />
      <BeamsBackground intensity="medium">
        <AboutSplit />
      </BeamsBackground>
      <section
        id="faq"
        className="scroll-mt-24 border-y border-border/60 bg-muted/40 py-20 md:py-24"
      >
        <FaqsSection />
      </section>
      <BeamsBackground intensity="strong">
        <ContactSection />
        <SiteFooter />
      </BeamsBackground>
    </div>
  );
}
