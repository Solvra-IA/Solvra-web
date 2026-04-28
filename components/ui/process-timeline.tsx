"use client";

import { motion } from "framer-motion";

import { Badge } from "@/components/ui/shadcn/badge";

interface Step {
  n: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    n: "01",
    title: "Diagnóstico",
    description:
      "Sesión inicial sin compromiso. Analizamos tus procesos y detectamos oportunidades concretas.",
  },
  {
    n: "02",
    title: "Propuesta",
    description:
      "Te entregamos un plan con entregables, plazos y retorno estimado. Precio cerrado, sin sorpresas.",
  },
  {
    n: "03",
    title: "Implementación",
    description:
      "Desplegamos la solución integrada con tus herramientas actuales. Iteramos con tu equipo.",
  },
  {
    n: "04",
    title: "Acompañamiento",
    description:
      "Medimos resultados, ajustamos y formamos a tu equipo. Nos quedamos hasta que funcione.",
  },
];

export function ProcessTimeline() {
  return (
    <section id="proceso" className="bg-background py-24 md:py-32">
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
            Cómo <span className="text-primary">trabajamos</span>
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Un proceso claro, sin humo ni promesas vacías.
          </p>
        </motion.div>

        <div className="mt-20">
          <div className="relative">
            {/* Línea conectora horizontal en desktop */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-0 right-0 top-4 hidden h-px bg-border lg:block"
            />

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {steps.map((s, i) => (
                <motion.div
                  key={s.n}
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
                  {/* Dot */}
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-2 grid h-5 w-5 -translate-x-1/2 place-items-center rounded-full bg-primary"
                  >
                    <span className="h-2 w-2 rounded-full bg-background" />
                  </span>

                  <Badge variant="default" className="mb-3 font-mono text-[11px]">
                    {s.n}
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
