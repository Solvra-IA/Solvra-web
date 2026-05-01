"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Fondo oscuro animado con haces de luz tipo "aurora".
 *
 * Optimizaciones:
 * - IntersectionObserver pausa el rAF cuando la sección sale del viewport.
 *   Con dos instancias en la página, esto evita que ambas consuman GPU
 *   simultáneamente.
 * - Canvas dimensionado al wrapper (no al window) → menos píxeles a pintar.
 * - Un único blur (canvas filter) en vez de tres apilados (canvas + CSS +
 *   backdrop-filter).
 * - 12 beams en lugar de 30. Visualmente equivalente con la mitad de coste.
 * - Respeta `prefers-reduced-motion`: render estático sin rAF.
 */
interface BeamsBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  intensity?: "subtle" | "medium" | "strong";
}

interface Beam {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
}

const BEAM_COUNT = 12;

function createBeam(width: number, height: number): Beam {
  const angle = -35 + Math.random() * 10;
  return {
    x: Math.random() * width * 1.5 - width * 0.25,
    y: Math.random() * height * 1.5 - height * 0.25,
    width: 60 + Math.random() * 80,
    length: height * 2.5,
    angle,
    speed: 0.5 + Math.random() * 0.4,
    opacity: 0.18 + Math.random() * 0.12,
    hue: 190 + Math.random() * 70,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.02,
  };
}

export function BeamsBackground({
  className,
  children,
  intensity = "strong",
}: BeamsBackgroundProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beamsRef = useRef<Beam[]>([]);
  const rafRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const opacityMap = { subtle: 0.7, medium: 0.85, strong: 1 } as const;

  // Detectar prefers-reduced-motion una sola vez.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Pausar animación cuando el wrapper no está en viewport.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setIsVisible(e.isIntersecting);
      },
      { rootMargin: "100px" },
    );
    io.observe(wrapper);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || reducedMotion) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sync = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = wrapper.getBoundingClientRect();
      const w = Math.max(rect.width, 1);
      const h = Math.max(rect.height, 1);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      beamsRef.current = Array.from({ length: BEAM_COUNT }, () =>
        createBeam(w, h),
      );
    };

    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(wrapper);

    function resetBeam(beam: Beam, index: number, totalBeams: number, h: number) {
      const column = index % 3;
      const spacing = (canvas?.clientWidth ?? 0) / 3;
      beam.y = h + 100;
      beam.x =
        column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5;
      beam.width = 80 + Math.random() * 80;
      beam.speed = 0.4 + Math.random() * 0.4;
      beam.hue = 190 + (index * 70) / totalBeams;
      beam.opacity = 0.2 + Math.random() * 0.1;
      return beam;
    }

    function drawBeam(c: CanvasRenderingContext2D, beam: Beam) {
      c.save();
      c.translate(beam.x, beam.y);
      c.rotate((beam.angle * Math.PI) / 180);
      const pulsing =
        beam.opacity * (0.85 + Math.sin(beam.pulse) * 0.15) * opacityMap[intensity];
      const g = c.createLinearGradient(0, 0, 0, beam.length);
      g.addColorStop(0, `hsla(${beam.hue}, 85%, 65%, 0)`);
      g.addColorStop(0.1, `hsla(${beam.hue}, 85%, 65%, ${pulsing * 0.5})`);
      g.addColorStop(0.5, `hsla(${beam.hue}, 85%, 65%, ${pulsing})`);
      g.addColorStop(0.9, `hsla(${beam.hue}, 85%, 65%, ${pulsing * 0.5})`);
      g.addColorStop(1, `hsla(${beam.hue}, 85%, 65%, 0)`);
      c.fillStyle = g;
      c.fillRect(-beam.width / 2, 0, beam.width, beam.length);
      c.restore();
    }

    function animate() {
      if (!canvas || !ctx) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.filter = "blur(24px)";
      const total = beamsRef.current.length;
      for (let i = 0; i < total; i++) {
        const beam = beamsRef.current[i];
        if (!beam) continue;
        beam.y -= beam.speed;
        beam.pulse += beam.pulseSpeed;
        if (beam.y + beam.length < -100) resetBeam(beam, i, total, h);
        drawBeam(ctx, beam);
      }
      rafRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      ro.disconnect();
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, reducedMotion, intensity]);

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "relative w-full overflow-hidden bg-neutral-950 text-white",
        className,
      )}
    >
      {/* Fallback estático para reduced-motion: gradiente radial sin animación. */}
      {reducedMotion ? (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, hsla(210, 80%, 60%, 0.18), transparent 60%), radial-gradient(ellipse at 70% 80%, hsla(250, 80%, 60%, 0.14), transparent 60%)",
          }}
        />
      ) : (
        <canvas ref={canvasRef} aria-hidden className="absolute inset-0" />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
