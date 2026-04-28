import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';
import { Container } from '@/components/ui/Container';

export function Header() {
  return (
    <header className="sticky top-0 z-40 hairline-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/65">
      <Container as="div" className="flex h-12 items-center justify-between gap-6">
        <Link
          href="/"
          aria-label={siteConfig.name}
          className="text-[17px] font-semibold tracking-tight text-ink transition-opacity duration-200 hover:opacity-80"
        >
          {siteConfig.name}
        </Link>
        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label="Principal"
        >
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[12px] font-normal text-ink/85 transition-opacity duration-200 hover:opacity-70"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#contacto"
          className="text-[12px] font-medium text-accent transition-opacity duration-200 hover:opacity-70"
        >
          Hablemos →
        </a>
      </Container>
    </header>
  );
}
