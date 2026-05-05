"use client";

import React from "react";
import Image from "next/image";
import { track } from "@vercel/analytics";
import { useLenis } from "lenis/react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-lime focus-visible:ring-offset-2 focus-visible:ring-offset-pitch-black disabled:pointer-events-none disabled:opacity-50";

    const variants: Record<string, string> = {
      primary:
        "bg-neon-lime text-pitch-black hover:bg-[#eef84a] active:scale-[0.98]",
      ghost:
        "bg-transparent text-porcelain hover:bg-charcoal-grey/60 ring-1 ring-charcoal-grey",
    };

    const sizes: Record<string, string> = {
      sm: "h-9 px-4 text-[13px]",
      md: "h-10 px-5 text-[14px] tracking-[-0.0093em]",
      lg: "h-11 px-6 text-[15px] tracking-[-0.011em]",
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

const ArrowRight = ({ className = "", size = 14 }: { className?: string; size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const Hero = React.memo(() => {
  const lenis = useLenis();

  const handleCta = () => {
    track("cta_click", { location: "hero" });
    const el = document.getElementById("contacto");
    if (!el || !lenis) return;
    lenis.scrollTo(el, { offset: -88, duration: 0.55 });
    history.replaceState(null, "", "#contacto");
  };

  const handleSecondary = () => {
    const el = document.getElementById("servicios");
    if (!el || !lenis) return;
    lenis.scrollTo(el, { offset: -88, duration: 0.55 });
  };

  return (
    <section
      className="relative flex min-h-[88vh] flex-col items-center justify-start overflow-hidden bg-pitch-black px-6 pt-24 pb-16 md:pt-28"
      style={{ animation: "fadeIn 0.6s ease-out" }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Halo lima sutil detrás del hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[480px] bg-lime-glow opacity-70"
      />
      {/* Hairline horizontal bajo el viewport del hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-charcoal-grey/80"
      />

      <aside className="relative z-10 mb-7 inline-flex items-center gap-2 rounded-full bg-graphite/80 px-3 py-1.5 ring-1 ring-charcoal-grey shadow-linear-subtle backdrop-blur">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-neon-lime shadow-[0_0_8px_2px_rgba(228,242,34,0.6)]" />
        <span className="text-[12px] tracking-[-0.0093em] text-storm-cloud">
          Diagnóstico de IA gratuito disponible
        </span>
        <a
          href="#contacto"
          className="inline-flex items-center gap-1 text-[12px] tracking-[-0.0093em] text-porcelain transition-colors hover:text-neon-lime"
          aria-label="Saber más sobre el diagnóstico"
        >
          Saber más
          <ArrowRight size={12} />
        </a>
      </aside>

      <h1 className="relative z-10 max-w-3xl text-center text-[44px] font-[510] leading-[1.05] tracking-[-0.005em] text-porcelain md:text-[60px] lg:text-[72px] lg:tracking-[-0.003em] [text-wrap:balance]">
        La IA que tu empresa merece,{" "}
        <span className="text-storm-cloud">sin complicaciones</span>
      </h1>

      <p className="relative z-10 mt-5 max-w-xl text-center text-[15px] leading-[1.55] tracking-[-0.011em] text-storm-cloud md:text-[16px]">
        Soluciones automatizadas para ser más eficiente y multiplicar tu rentabilidad.
        Eliminamos el trabajo manual e integramos IA con tus herramientas actuales.
      </p>

      <div className="relative z-10 mt-9 flex flex-col items-center gap-3 sm:flex-row sm:gap-3">
        <Button
          type="button"
          variant="primary"
          size="lg"
          onClick={handleCta}
          aria-label="Solicitar diagnóstico gratuito"
        >
          Solicitar diagnóstico
          <ArrowRight size={14} />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="lg"
          onClick={handleSecondary}
          aria-label="Ver servicios"
        >
          Ver servicios
        </Button>
      </div>

      {/* Mockup del producto, embebido al estilo Linear */}
      <div className="relative z-10 mt-16 w-full max-w-5xl">
        <div className="relative rounded-xl bg-graphite p-1 shadow-linear-card-inset">
          <div className="overflow-hidden rounded-[10px] ring-1 ring-charcoal-grey">
            <Image
              src="/hero/dashboard.png"
              alt="Vista previa del panel de Solvra con métricas e indicadores"
              width={1280}
              height={800}
              priority
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
        {/* Glow sutil bajo el mockup */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-12 -bottom-10 h-24 bg-aether-glow blur-2xl opacity-60"
        />
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

export default function Component() {
  return (
    <div className="bg-pitch-black text-porcelain">
      <Hero />
    </div>
  );
}
