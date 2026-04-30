import { siteConfig } from '@/lib/site-config';

/**
 * JSON-LD Schema.org para SEO local y rich results de Google.
 *
 * Combina:
 * - Organization: identidad corporativa de Solvra (joint venture).
 * - LocalBusiness: ubicación y actividad para SEO local (Vilanova i la Geltrú).
 *
 * Se inyecta como <script type="application/ld+json"> en el <head> del layout.
 * Google y Bing lo leen para enriquecer resultados de búsqueda.
 */
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
