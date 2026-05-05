"use client";
import React from "react";
import { motion } from "motion/react";

type Testimonial = {
  text: string;
  name: string;
  role: string;
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return (first + last).toUpperCase();
}

/**
 * Columna con scroll vertical infinito. La animación es CSS (keyframe en
 * globals.css) en vez de framer-motion, lo que la pone en el compositor
 * thread y libera el main thread. Browsers modernos pausan la animación
 * cuando la sección está fuera del viewport (con content-visibility).
 */
export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <div
        className="flex flex-col gap-6 pb-6 bg-background will-change-transform"
        style={{
          animation: `column-scroll-up ${props.duration ?? 10}s linear infinite`,
        }}
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, name, role }, i) => (
                <div
                  className="p-8 rounded-xl border border-charcoal-grey bg-graphite shadow-linear-sm max-w-xs w-full"
                  key={i}
                >
                  <div className="text-[14px] leading-[1.55] text-light-steel">{text}</div>
                  <div className="flex items-center gap-3 mt-5">
                    <div
                      aria-hidden
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-deep-slate text-[12px] font-[510] text-aether-blue ring-1 ring-charcoal-grey"
                    >
                      {getInitials(name)}
                    </div>
                    <div className="flex flex-col">
                      <div className="text-[14px] font-[510] text-porcelain leading-5">
                        {name}
                      </div>
                      <div className="text-[12px] text-storm-cloud leading-5">
                        {role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </div>
    </div>
  );
};

const testimonials: Testimonial[] = [
  {
    text: "Pasamos de tardar tres días en cualificar leads a hacerlo en minutos. El equipo se centra en cerrar visitas, no en filtrar emails.",
    name: "Marta Ribas",
    role: "Inmobiliaria, Sant Cugat",
  },
  {
    text: "Implementamos los recordatorios automáticos de citas y bajamos las cancelaciones un 40% en dos meses. Sin tocar nuestro software actual.",
    name: "David Romero",
    role: "Clínica dental, Tarragona",
  },
  {
    text: "Llevábamos años posponiendo la digitalización. Solvra hizo el diagnóstico, marcó prioridades y arrancamos sin caos.",
    name: "Núria Vidal",
    role: "Gestoría, Barcelona",
  },
  {
    text: "Lo que más valoramos es que hablan claro. Te dicen lo que se puede hacer y lo que no, sin venderte humo.",
    name: "Jordi Martínez",
    role: "Despacho de abogados, Sabadell",
  },
  {
    text: "El asistente responde fuera de horario en castellano y catalán. Nuestros pacientes se sorprenden por la rapidez.",
    name: "Elena Serrano",
    role: "Clínica de fisioterapia, Vilafranca",
  },
  {
    text: "Precio cerrado desde el inicio. Sin facturas sorpresa ni horas extra. Cumplieron en tiempo y forma.",
    name: "Pablo Ruiz",
    role: "Inmobiliaria, Castelldefels",
  },
  {
    text: "El acompañamiento posterior marca la diferencia. No nos dejaron solos cuando se complicó la integración.",
    name: "Cristina Aliaga",
    role: "Consultoría empresarial, Reus",
  },
  {
    text: "Nos preocupaba el tema RGPD. Pasaron por todos los compliance que necesitábamos sin que tuviéramos que pelearlo.",
    name: "Manel Casas",
    role: "Asesoría fiscal, Sitges",
  },
  {
    text: "Antes nuestro equipo gastaba media jornada redactando descripciones de inmuebles. Ahora ese tiempo se va a visitar pisos.",
    name: "Sandra Beltrán",
    role: "Inmobiliaria, Vilanova i la Geltrú",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export const Testimonials = () => {
  return (
    <section className="bg-background py-24 md:py-32 relative">
      <div className="container z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-2xl mx-auto text-center gap-4"
        >
          <div className="border border-charcoal-grey bg-deep-slate py-1 px-4 rounded-full text-[11px] font-[510] uppercase tracking-[0.12em] text-storm-cloud">
            Testimonios
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-[510] tracking-[-0.012em]">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-muted-foreground md:text-lg">
            PYMEs que ya integran IA con Solvra.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
};
