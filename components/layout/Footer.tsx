import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';
import { Container } from '@/components/ui/Container';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-muted text-[12px] text-muted-foreground">
      <Container as="div" className="py-10">
        <p className="text-pretty leading-relaxed">
          {siteConfig.tagline}. Joint venture con {siteConfig.partner.name} (
          {siteConfig.partner.location}).
        </p>
        <div className="mt-8 hairline-t pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {siteConfig.name}. Todos los derechos reservados.
            </p>
            <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {siteConfig.legal.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="transition-colors hover:text-foreground"
              >
                {siteConfig.contactEmail}
              </a>
            </nav>
          </div>
        </div>
      </Container>
    </footer>
  );
}
