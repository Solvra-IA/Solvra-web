/**
 * Composición decorativa del hero. Decora, no describe.
 * Capas: anillo rotando 60s, tarjetas flotantes, cuadrícula de puntos 3x3,
 * formas geométricas con relleno gradiente, bloque de acento en esquina.
 */
export function HeroGraphic() {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative mx-auto mt-20 hidden h-[420px] w-[420px] max-w-full select-none md:block"
    >
      {/* Anillo exterior rotando */}
      <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-accent/25" />
      <div
        className="absolute inset-6 animate-spin-slow rounded-full border border-border"
        style={{ animationDirection: 'reverse', animationDuration: '90s' }}
      />

      {/* Cuadrícula de puntos 3x3 esquina superior izquierda */}
      <div className="absolute -left-4 -top-4 grid grid-cols-3 gap-2">
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} className="block h-1.5 w-1.5 rounded-full bg-foreground/30" />
        ))}
      </div>

      {/* Bloque de acento en esquina inferior derecha */}
      <div className="absolute -bottom-2 -right-2 h-20 w-20 rounded-2xl bg-gradient-brand shadow-accent-lg" />

      {/* Círculo central con gradiente */}
      <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-tri opacity-90 blur-[2px]" />
      <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full ring-1 ring-inset ring-white/40" />

      {/* Tarjeta flotante 1 */}
      <div className="absolute left-2 top-20 animate-float-y rounded-2xl border border-border bg-card p-4 shadow-card">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-accent-foreground">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8.5L6.5 12L13 4.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div>
            <div className="h-1.5 w-16 rounded-full bg-foreground/85" />
            <div className="mt-1.5 h-1 w-10 rounded-full bg-muted-foreground/40" />
          </div>
        </div>
      </div>

      {/* Tarjeta flotante 2 */}
      <div className="absolute -right-2 top-12 animate-float-y-rev rounded-2xl border border-border bg-card p-4 shadow-card">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Online
          </span>
        </div>
        <div className="mt-2 h-2 w-24 rounded-full bg-foreground/85" />
        <div className="mt-1.5 h-1.5 w-16 rounded-full bg-muted-foreground/40" />
      </div>

      {/* Tarjeta flotante 3 inferior */}
      <div
        className="absolute bottom-8 left-12 animate-float-y rounded-xl border border-border bg-card px-4 py-3 shadow-card"
        style={{ animationDelay: '1.5s' }}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-semibold text-gradient-brand">+38%</span>
          <span className="text-[11px] text-muted-foreground">eficiencia</span>
        </div>
      </div>

      {/* Rectángulo redondeado decorativo */}
      <div className="absolute right-6 bottom-20 h-12 w-12 rotate-12 rounded-2xl border border-border bg-card shadow-soft" />
    </div>
  );
}
