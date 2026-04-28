"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/shadcn/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Sectores", href: "/#sectores" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Proceso", href: "/#proceso" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "FAQ", href: "/#faq" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [revealed, setRevealed] = useState(!isHome);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setRevealed(true);
      return;
    }

    function onScroll() {
      // Reveal cuando el usuario ha pasado ~85% del viewport (final del primer hero)
      setRevealed(window.scrollY > window.innerHeight * 0.85);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ease-out",
        revealed
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-full opacity-0",
        "border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/65",
      )}
    >
      <nav className="container mx-auto flex h-14 items-center justify-between gap-6 px-6">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          Solvra
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/#contacto">Hablemos</Link>
          </Button>
          <button
            type="button"
            aria-label="Abrir menú"
            className="md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {mobileOpen ? (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <div className="container mx-auto flex flex-col gap-1 px-6 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-3 sm:hidden">
              <Link href="/#contacto" onClick={() => setMobileOpen(false)}>
                Hablemos
              </Link>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
