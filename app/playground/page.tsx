/**
 * Playground — los 8 componentes pegados verbatim desde components/*.txt en orden.
 * Esta ruta vive aparte de la landing principal para no romper la marca Solvra.
 *
 * Fase 1: integración en crudo. Fase 2: adaptación a Solvra. Fase 3: normalizar estilos.
 */
import { Layout, Pointer, Zap } from 'lucide-react';

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
  description: 'Stack de los 8 componentes en orden — fase 1 de integración.',
  robots: { index: false, follow: false },
};

const feature108Tabs = [
  {
    value: 'tab-1',
    icon: <Zap className="h-auto w-4 shrink-0" />,
    label: 'Boost Revenue',
    content: {
      badge: 'Modern Tactics',
      title: 'Make your site a true standout.',
      description:
        'Discover new web trends that help you craft sleek, highly functional sites that drive traffic and convert leads into customers.',
      buttonText: 'See Plans',
      imageSrc: 'https://shadcnblocks.com/images/block/placeholder-dark-1.svg',
      imageAlt: 'placeholder',
    },
  },
  {
    value: 'tab-2',
    icon: <Pointer className="h-auto w-4 shrink-0" />,
    label: 'Higher Engagement',
    content: {
      badge: 'Expert Features',
      title: 'Boost your site with top-tier design.',
      description:
        'Use stellar design to easily engage users and strengthen their loyalty. Create a seamless experience that keeps them coming back for more.',
      buttonText: 'See Tools',
      imageSrc: 'https://shadcnblocks.com/images/block/placeholder-dark-2.svg',
      imageAlt: 'placeholder',
    },
  },
  {
    value: 'tab-3',
    icon: <Layout className="h-auto w-4 shrink-0" />,
    label: 'Stunning Layouts',
    content: {
      badge: 'Elite Solutions',
      title: 'Build an advanced web experience.',
      description:
        'Lift your brand with modern tech that grabs attention and drives action. Create a digital experience that stands out from the crowd.',
      buttonText: 'See Options',
      imageSrc: 'https://shadcnblocks.com/images/block/placeholder-dark-3.svg',
      imageAlt: 'placeholder',
    },
  },
];

const roadmapItems = [
  {
    quarter: 'Q1 2023',
    title: 'Core Platform',
    description: 'Basic functionality and user management',
    status: 'done' as const,
  },
  {
    quarter: 'Q2 2023',
    title: 'Analytics',
    description: 'Reporting and data visualization',
    status: 'in-progress' as const,
  },
  {
    quarter: 'Q3 2023',
    title: 'Integrations',
    description: 'Third-party app connections',
    status: 'upcoming' as const,
  },
  {
    quarter: 'Q4 2023',
    title: 'AI Features',
    description: 'Smart automation and predictions',
    status: 'upcoming' as const,
  },
];

function SectionLabel({ n, name }: { n: number; name: string }) {
  return (
    <div className="border-y border-border bg-muted/40 py-3">
      <div className="container mx-auto flex items-center gap-3 text-xs font-mono text-muted-foreground">
        <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
          {String(n).padStart(2, '0')}
        </span>
        <span>{name}</span>
      </div>
    </div>
  );
}

export default function PlaygroundPage() {
  return (
    <div className="bg-background">
      {/* 1. saa-s-template — dark hero con dashboard preview */}
      <SectionLabel n={1} name="saa-s-template" />
      <SaasTemplate />

      {/* 2. beams-background — canvas full-screen con haces animados */}
      <SectionLabel n={2} name="beams-background" />
      <BeamsBackground />

      {/* 3. shadcnblocks feature108 — tabs con feature panels */}
      <SectionLabel n={3} name="shadcnblocks-com-feature108" />
      <Feature108 tabs={feature108Tabs} />

      {/* 4. logo-cloud-2 — grid de logos de marcas */}
      <SectionLabel n={4} name="logo-cloud-2" />
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-6 text-center text-lg font-medium tracking-tight text-muted-foreground md:text-2xl">
            Companies we{' '}
            <span className="font-semibold text-primary">collaborate</span> with.
          </h2>
          <LogoCloud />
        </div>
      </section>

      {/* 5. testimonials-columns-1 — 3 columnas scroll vertical */}
      <SectionLabel n={5} name="testimonials-columns-1" />
      <Testimonials />

      {/* 6. cta-4 — CTA con bullets */}
      <SectionLabel n={6} name="cta-4" />
      <Cta4 />

      {/* 7. faqs-1 — accordion */}
      <SectionLabel n={7} name="faqs-1" />
      <section className="py-24">
        <FaqsSection />
      </section>

      {/* 8. roadmap-card — timeline trimestral */}
      <SectionLabel n={8} name="roadmap-card" />
      <section className="py-24">
        <div className="container mx-auto flex justify-center px-4">
          <RoadmapCard items={roadmapItems} />
        </div>
      </section>
    </div>
  );
}
