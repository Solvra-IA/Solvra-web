"use client";

import { motion } from "motion/react";

import { Badge } from "@/components/ui/shadcn/badge";

interface Step {
  title: string;
  phase: string;
  description: string;
}

const steps: Step[] = [
  {
    phase: "Fase 0",
    title: "Diagnóstico",
    description:
      "Sesión con foco directivo: mapa de procesos críticos, cuellos de botella y lectura de riesgos. Cierre con prioridades y, si procede, marco de propuesta.",
  },
  {
    phase: "Fase 1",
    title: "Implementación",
    description:
      "Construcción e integración en tus herramientas, pruebas con usuarios reales, formación mínima viable y entrega documentada. Precio y alcance acordados por escrito.",
  },
  {
    phase: "Fase 2",
    title: "Acompañamiento mensual",
    description:
      "Seguimiento de métricas acordadas, ajustes, soporte prioritario y mejoras incrementales para que el sistema siga alineado con volumen y normativa.",
  },
];

export function ProcessTimeline() {
  return (
    <section id="proceso" className="scroll-mt-24 bg-background py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-2xl text-center"
        >
          <Badge variant="outline">Proceso</Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            Cómo <span className="text-primary">trabajamos</span> contigo
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Tres fases con entregables claros. Sin oscurantismo técnico ni promesas
            desconectadas de tu operación.
          </p>
        </motion.div>

        <div className="mt-20">
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute left-0 right-0 top-4 hidden h-px bg-border lg:block"
            />

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {steps.map((s, i) => (
                <motion.div
                  key={s.phase}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  viewport={{ once: true, margin: "-80px" }}
                  className="relative pt-12 text-center"
                >
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-2 grid h-5 w-5 -translate-x-1/2 place-items-center rounded-full bg-primary"
                  >
                    <span className="h-2 w-2 rounded-full bg-background" />
                  </span>

                  <Badge variant="outline" className="mb-3 text-[11px] font-normal">
                    {s.phase}
                  </Badge>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {s.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
