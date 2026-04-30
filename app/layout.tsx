import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { siteConfig } from '@/lib/site-config';
import { SiteHeader } from '@/components/ui/site-header';
import { LenisProvider } from '@/components/providers/lenis-provider';
import { StructuredData } from '@/components/seo/StructuredData';
import './globals.css';

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
    'Solvra',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        <StructuredData />
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <LenisProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
        </LenisProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
