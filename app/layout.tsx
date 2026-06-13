import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { siteConfig } from '@/lib/site-config';
import { Analytics } from '@vercel/analytics/next';
import { SiteHeader } from '@/components/ui/site-header';
import { LenisProvider } from '@/components/providers/lenis-provider';
import { StructuredData } from '@/components/seo/StructuredData';
import { ConsentBanner } from '@/components/analytics/consent-banner';
import { GoogleTagManager } from '@/components/analytics/google-tag-manager';
import { clientEnv } from '@/lib/env';
import './globals.css';

const gtmId = clientEnv.NEXT_PUBLIC_GTM_ID;

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'consultoría IA',
    'inteligencia artificial PYMEs',
    'automatización empresas España',
    'IA inmobiliarias',
    'IA clínicas',
    'Nexus',
    'Solfico',
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  themeColor: '#0052FF',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        <StructuredData />
        {gtmId ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                window.gtag = function gtag(){window.dataLayer.push(arguments);};
                window.gtag('consent', 'default', {
                  ad_storage: 'denied',
                  ad_user_data: 'denied',
                  ad_personalization: 'denied',
                  analytics_storage: 'denied',
                  functionality_storage: 'granted',
                  security_storage: 'granted',
                  wait_for_update: 500
                });
              `,
            }}
          />
        ) : null}
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
        <LenisProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
        </LenisProvider>
        {gtmId ? <ConsentBanner /> : null}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
