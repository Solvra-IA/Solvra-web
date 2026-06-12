"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/shadcn/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Servicios", href: "/#servicios" },
  { label: "Proceso", href: "/#proceso" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "FAQ", href: "/#faq" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  // En home: arranca transparente sobre el hero oscuro y se vuelve opaco al
  // pasar el primer hero. En otras rutas (legales, 404): siempre opaco.
  const [scrolled, setScrolled] = useState(!isHome);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > window.innerHeight * 0.8);
        ticking = false;
      });
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    if (!mobileOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/65"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="container mx-auto flex h-14 items-center justify-between gap-6 px-6">
        <Link
          href="/"
          className={cn(
            "text-base font-semibold tracking-tight transition-colors duration-300 hover:opacity-80",
            scrolled ? "text-foreground" : "text-white",
          )}
        >
          {siteConfig.name}
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-[13px] transition-colors duration-300",
                scrolled
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-white/65 hover:text-white",
              )}
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
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className={cn(
              "md:hidden transition-colors duration-300",
              scrolled ? "text-foreground" : "text-white",
            )}
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
        <div id="mobile-menu" className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
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
