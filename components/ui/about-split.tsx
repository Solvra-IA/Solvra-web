"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";

import { Badge } from "@/components/ui/shadcn/badge";

const diferenciadores = [
  "Lenguaje de dirección: tiempo, riesgo y control",
  "Propuestas cerradas: alcance, plazo y precio",
  "Cumplimiento RGPD y trazabilidad por defecto",
  "Integración con vuestro stack antes que “rip and replace”",
  "Acompañamiento con objetivos, no soporte anónimo",
  "Joint venture con gestoría Solfico: contexto fiscal y PYME real",
];

/**
 * AboutSplit — diseñado para vivir dentro de <BeamsBackground>. Texto en
 * tonalidades blancas. La sección no aporta background propio; el wrapper
 * dark se lo da.
 */
export function AboutSplit() {
  return (
    <section id="nosotros" className="scroll-mt-24 py-24 md:py-32 text-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-12 md:grid-cols-2 md:items-start lg:gap-20"
        >
          <div>
            <Badge
              variant="outline"
              className="border-white/20 bg-white/5 text-white/85"
            >
              Sobre Solvra
            </Badge>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              IA con{" "}
              <span className="text-primary">literacia de negocio</span>{" "}
              española
            </h2>
            <p className="mt-7 text-base leading-relaxed text-white/75 md:text-lg">
              Solvra es consultoría aplicada: traducimos capacidades de IA a
              decisiones que entiende una mesa de dirección—qué automatizar, qué
              supervisar y qué no conviene tocar.
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/75 md:text-lg">
              Nacimos en joint venture con{" "}
              <strong className="font-semibold text-white">Solfico S.L.</strong>
              , gestoría con décadas acompañando PYMEs desde Vilanova i la Geltrú.
              Eso nos obliga a un estándar alto en rigor, confidencialidad y
              explicabilidad hacia cliente final.
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
        </motion.div>
      </div>
    </section>
  );
}
