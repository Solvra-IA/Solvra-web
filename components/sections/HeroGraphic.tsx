/**
 * Composición decorativa del hero. Decora, no describe.
 * Estructura:
 *   - Glow radial detrás (gradient firma) → da profundidad y "wow"
 *   - Frame estilo ventana de producto con chrome de 3 dots
 *   - Capas internas: anillos rotando, cards flotantes, métricas, dot grid
 */
function WindowChrome() {
  return (
    <div
      aria-hidden
      className="flex items-center gap-1.5 border-b border-border/80 bg-muted/60 px-4 py-3"
    >
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
      <div className="ml-4 flex h-5 max-w-xs flex-1 items-center rounded-md bg-card/80 px-2.5 text-[10px] font-mono text-muted-foreground/70">
        solvra.es / dashboard
      </div>
    </div>
  );
}

export function HeroGraphic() {
  return (
    <div
      aria-hidden
      className="relative mx-auto mt-16 hidden w-full max-w-4xl select-none md:block"
    >
      {/* Glow radial detrás del frame — gradiente firma */}
      <div
        className="pointer-events-none absolute -inset-x-20 -top-24 -z-10 h-[520px]"
        style={{
          background:
            'radial-gradient(50% 50% at 50% 50%, rgba(0,82,255,0.28) 0%, rgba(77,124,255,0.12) 35%, rgba(0,82,255,0) 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute -inset-x-32 -bottom-12 -z-10 h-72 blur-3xl"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 50%, rgba(77,124,255,0.18) 0%, rgba(77,124,255,0) 70%)',
        }}
      />

      {/* Frame estilo ventana de producto */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        <WindowChrome />

        <div className="relative h-[420px] overflow-hidden bg-fade-down">
          {/* Anillos rotando */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-dashed border-accent/25" />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-border"
            style={{ animationDirection: 'reverse', animationDuration: '90s' }}
          />

          {/* Dot grid 3x3 esquina superior izquierda */}
          <div className="absolute left-6 top-6 grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="block h-1.5 w-1.5 rounded-full bg-foreground/25" />
            ))}
          </div>

          {/* Bloque de acento esquina inferior derecha */}
          <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-2xl bg-gradient-brand shadow-accent-lg" />

          {/* Círculo central con gradiente */}
          <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-tri opacity-90 blur-[2px]" />
          <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full ring-1 ring-inset ring-white/40" />

          {/* Card flotante 1 — check */}
          <div className="absolute left-12 top-20 animate-float-y rounded-2xl border border-border bg-card p-4 shadow-card">
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
                <div className="h-1.5 w-20 rounded-full bg-foreground/85" />
                <div className="mt-1.5 h-1 w-12 rounded-full bg-muted-foreground/40" />
              </div>
            </div>
          </div>

          {/* Card flotante 2 — online */}
          <div className="absolute right-12 top-12 animate-float-y-rev rounded-2xl border border-border bg-card p-4 shadow-card">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Online
              </span>
            </div>
            <div className="mt-2 h-2 w-24 rounded-full bg-foreground/85" />
            <div className="mt-1.5 h-1.5 w-16 rounded-full bg-muted-foreground/40" />
          </div>

          {/* Card flotante 3 — métrica */}
          <div
            className="absolute bottom-10 left-24 animate-float-y rounded-xl border border-border bg-card px-4 py-3 shadow-card"
            style={{ animationDelay: '1.5s' }}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-gradient-brand">
                +38%
              </span>
              <span className="text-[11px] text-muted-foreground">eficiencia</span>
            </div>
          </div>

          {/* Rectángulo decorativo rotado */}
          <div className="absolute bottom-20 right-24 h-12 w-12 rotate-12 rounded-2xl border border-border bg-card shadow-soft" />
        </div>
      </div>
    </div>
  );
}
