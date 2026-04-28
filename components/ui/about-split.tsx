"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { Badge } from "@/components/ui/shadcn/badge";

const diferenciadores = [
  "Sin humo ni buzzwords",
  "Precios cerrados, sin sorpresas",
  "Cumplimiento RGPD de serie",
  "Soporte en español",
  "Integración con tus herramientas",
  "Acompañamiento real",
];

export function AboutSplit() {
  return (
    <section id="nosotros" className="bg-background py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="flex justify-center">
          <div className="w-full max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-80px" }}
              className="rounded-2xl bg-foreground text-background overflow-hidden"
            >
              <div className="grid gap-10 p-8 md:grid-cols-2 md:items-start md:p-14 lg:p-20 lg:gap-16">
                <div>
                  <Badge
                    variant="outline"
                    className="border-white/20 bg-white/5 text-white/85"
                  >
                    Sobre nosotros
                  </Badge>
                  <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                    Tecnología con{" "}
                    <span className="text-primary">contexto</span> de negocio
                  </h2>
                  <p className="mt-7 text-base leading-relaxed text-white/75 md:text-lg">
                    Solvra nace como joint venture con{" "}
                    <strong className="font-semibold text-white">
                      Solfico S.L.
                    </strong>
                    , una gestoría con décadas de experiencia acompañando a PYMEs
                    desde Vilanova i la Geltrú.
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-white/75 md:text-lg">
                    Combinamos conocimiento técnico de IA con comprensión real de
                    cómo funciona una pequeña o mediana empresa española: su
                    fiscalidad, sus ritmos, sus obligaciones y sus límites.
                  </p>
                </div>

                <ul className="grid gap-3 sm:grid-cols-2">
                  {diferenciadores.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-[15px] font-medium backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/10"
                    >
                      <span
                        aria-hidden
                        className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"
                      >
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
