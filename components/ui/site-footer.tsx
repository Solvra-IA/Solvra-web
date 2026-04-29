import Link from "next/link";

const legal = [
  { label: "Aviso legal", href: "/legal/aviso-legal" },
  { label: "Privacidad", href: "/legal/privacidad" },
  { label: "Cookies", href: "/legal/cookies" },
];

/**
 * SiteFooter — diseñado para vivir dentro de <BeamsBackground>. Texto en
 * tonalidades blancas. La sección no aporta background propio.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 text-white">
      <div className="container mx-auto px-6 py-14">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-white transition-opacity hover:opacity-80"
            >
              Solvra
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              Consultoría de IA para PYMEs españolas. Joint venture con Solfico
              S.L. (Vilanova i la Geltrú, Cataluña).
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/55">
                Legal
              </p>
              <ul className="mt-4 space-y-2.5">
                {legal.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/55">
                Contacto
              </p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href="mailto:hola@solvra.es"
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    hola@solvra.es
                  </a>
                </li>
                <li>
                  <a
                    href="#contacto"
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    Formulario
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center">
          <p>© {year} Solvra. Todos los derechos reservados.</p>
          <p>Hecho en Vilanova i la Geltrú.</p>
        </div>
      </div>
    </footer>
  );
}
