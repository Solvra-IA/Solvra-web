import { siteConfig } from '@/lib/site-config';

/**
 * JSON-LD Schema.org para SEO local y rich results de Google.
 *
 * Combina:
 * - Organization: identidad corporativa de Solvra (joint venture).
 * - LocalBusiness: ubicación y actividad para SEO local (Vilanova i la Geltrú).
 * - WebSite: metadatos del sitio.
 * - Service[]: una entrada por servicio expuesto en la home (#servicios).
 *
 * Se inyecta como <script type="application/ld+json"> en el <head> del layout.
 * Google y Bing lo leen para enriquecer resultados de búsqueda.
 *
 * Mantener `services` aquí en sincronía con `servicesTabs` en app/page.tsx.
 */
const services = [
  {
    slug: 'diagnostico',
    name: 'Diagnóstico de IA',
    description:
      'Una sesión sin compromiso para mapear tus procesos y detectar oportunidades concretas de IA. Sin lenguaje técnico, con un plan claro al final.',
    serviceType: 'Consultoría de IA',
  },
  {
    slug: 'automatizacion',
    name: 'Automatización de procesos',
    description:
      'Automatizamos respuestas, gestión documental y seguimiento comercial con agentes inteligentes que se integran con tus herramientas actuales.',
    serviceType: 'Automatización empresarial',
  },
  {
    slug: 'integracion',
    name: 'Integración con tus herramientas',
    description:
      'Conectamos la IA con tu CRM, ERP, email y agenda. Solo proponemos cambios cuando una herramienta está bloqueando el resultado.',
    serviceType: 'Integración de sistemas',
  },
] as const;

export function StructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteConfig.url}#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo.svg`,
        description: siteConfig.description,
        email: siteConfig.contactEmail,
        sameAs: [],
        partner: {
          '@type': 'Organization',
          name: siteConfig.partner.name,
        },
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${siteConfig.url}#localbusiness`,
        name: siteConfig.name,
        url: siteConfig.url,
        image: `${siteConfig.url}/logo.svg`,
        description: siteConfig.description,
        email: siteConfig.contactEmail,
        priceRange: '€€',
        areaServed: {
          '@type': 'Country',
          name: 'España',
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Vilanova i la Geltrú',
          addressRegion: 'Cataluña',
          addressCountry: 'ES',
        },
        knowsAbout: [
          'Inteligencia Artificial',
          'Automatización de procesos',
          'Consultoría tecnológica',
          'PYMEs',
          'Inmobiliarias',
          'Clínicas',
          'Servicios profesionales',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: siteConfig.locale,
        publisher: { '@id': `${siteConfig.url}#organization` },
      },
      ...services.map((s) => ({
        '@type': 'Service',
        '@id': `${siteConfig.url}#service-${s.slug}`,
        name: s.name,
        description: s.description,
        serviceType: s.serviceType,
        url: `${siteConfig.url}/#servicios`,
        provider: { '@id': `${siteConfig.url}#organization` },
        areaServed: { '@type': 'Country', name: 'España' },
        audience: {
          '@type': 'BusinessAudience',
          audienceType: 'PYMEs (inmobiliarias, clínicas, servicios profesionales)',
        },
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
