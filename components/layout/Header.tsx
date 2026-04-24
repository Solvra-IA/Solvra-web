import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';
import { Container } from '@/components/ui/Container';
import { LinkButton } from '@/components/ui/Button';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <Container as="div" className="flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900">
          {siteConfig.name}
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-slate-600 transition-colors hover:text-brand-700"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <LinkButton href="#contacto" size="sm">
          Hablemos
        </LinkButton>
      </Container>
    </header>
  );
}
