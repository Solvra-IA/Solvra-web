/**
 * Playground — los 8 componentes en orden, normalizados para sentir
 * una sola página coherente. Fuente verbatim conservada en components/ui/.
 *
 * Decisiones de coherencia (fase 2):
 * - Tipografía: una sola pila (SF Pro / Inter via global). Removido @import Poppins.
 * - Spacing: py-24 md:py-32 en todas las secciones light. Heroes con altura propia.
 * - Heading scale: h1 hero text-5xl→7xl, h2 sección text-3xl→5xl, todo font-semibold.
 * - Color tokens: paleta dark (neutral-950 + white/N) en heroes 1-2, semantic tokens
 *   (background/muted/card/primary) en secciones 3-8. Misma marca electric-blue.
 * - Containers: max-w-7xl con px-6 consistente.
 * - Bordes: border-border en todo lo light, border-white/10 en lo dark.
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
  description: 'Stack de 8 componentes normalizados.',
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

export default function PlaygroundPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Heroes (dark) */}
      <SaasTemplate />
      <BeamsBackground />

      {/* Light bands — alterna background/muted con padding y eyebrow consistentes */}
      <div className="bg-background">
        <Feature108 tabs={feature108Tabs} />
      </div>

      <section className="bg-muted py-24 md:py-32">
        <div className="container mx-auto max-w-3xl px-6">
          <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight md:text-4xl">
            Companies we{' '}
            <span className="text-primary">collaborate</span> with.
          </h2>
          <LogoCloud />
        </div>
      </section>

      <Testimonials />

      <div className="bg-muted">
        <Cta4 />
      </div>

      <section className="bg-background py-24 md:py-32">
        <FaqsSection />
      </section>

      <section className="bg-muted py-24 md:py-32">
        <div className="container mx-auto flex justify-center px-6">
          <RoadmapCard items={roadmapItems} />
        </div>
      </section>
    </div>
  );
}
