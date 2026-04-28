"use client";
import React from "react";
import { motion } from "motion/react";

type Testimonial = {
  text: string;
  image: string;
  name: string;
  role: string;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className="p-10 rounded-3xl border shadow-lg shadow-primary/10 max-w-xs w-full"
                  key={i}
                >
                  <div>{text}</div>
                  <div className="flex items-center gap-2 mt-5">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5">
                        {name}
                      </div>
                      <div className="leading-5 opacity-60 tracking-tight">
                        {role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

const testimonials: Testimonial[] = [
  {
    text: "Pasamos de tardar tres días en cualificar leads a hacerlo en minutos. El equipo se centra en cerrar visitas, no en filtrar emails.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Marta Ribas",
    role: "Inmobiliaria, Sant Cugat",
  },
  {
    text: "Implementamos los recordatorios automáticos de citas y bajamos las cancelaciones un 40% en dos meses. Sin tocar nuestro software actual.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "David Romero",
    role: "Clínica dental, Tarragona",
  },
  {
    text: "Llevábamos años posponiendo la digitalización. Solvra hizo el diagnóstico, marcó prioridades y arrancamos sin caos.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    name: "Núria Vidal",
    role: "Gestoría, Barcelona",
  },
  {
    text: "Lo que más valoramos es que hablan claro. Te dicen lo que se puede hacer y lo que no, sin venderte humo.",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    name: "Jordi Martínez",
    role: "Despacho de abogados, Sabadell",
  },
  {
    text: "El asistente responde fuera de horario en castellano y catalán. Nuestros pacientes se sorprenden por la rapidez.",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    name: "Elena Serrano",
    role: "Clínica de fisioterapia, Vilafranca",
  },
  {
    text: "Precio cerrado desde el inicio. Sin facturas sorpresa ni horas extra. Cumplieron en tiempo y forma.",
    image: "https://randomuser.me/api/portraits/men/51.jpg",
    name: "Pablo Ruiz",
    role: "Inmobiliaria, Castelldefels",
  },
  {
    text: "El acompañamiento posterior marca la diferencia. No nos dejaron solos cuando se complicó la integración.",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    name: "Cristina Aliaga",
    role: "Consultoría empresarial, Reus",
  },
  {
    text: "Nos preocupaba el tema RGPD. Pasaron por todos los compliance que necesitábamos sin que tuviéramos que pelearlo.",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
    name: "Manel Casas",
    role: "Asesoría fiscal, Sitges",
  },
  {
    text: "Antes nuestro equipo gastaba media jornada redactando descripciones de inmuebles. Ahora ese tiempo se va a visitar pisos.",
    image: "https://randomuser.me/api/portraits/women/89.jpg",
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
          <div className="border border-border py-1 px-4 rounded-full text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Testimonios
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
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
