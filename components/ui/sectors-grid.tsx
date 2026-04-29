"use client";

import { motion } from "framer-motion";
import { Building2, Stethoscope, Briefcase } from "lucide-react";

import { Badge } from "@/components/ui/shadcn/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/shadcn/card";

interface Sector {
  badge: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const sectors: Sector[] = [
  {
    badge: "Inmuebles",
    title: "Inmobiliarias",
    description:
      "Cualificación automática de leads, redacción de descripciones de inmuebles, respuestas 24/7 a consultas frecuentes y seguimiento postvisita.",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    badge: "Salud",
    title: "Clínicas",
    description:
      "Recordatorios inteligentes, gestión de citas, respuestas a pacientes fuera de horario y documentación asistida sin tocar datos sensibles sin control.",
    icon: <Stethoscope className="h-5 w-5" />,
  },
  {
    badge: "B2B",
    title: "Servicios profesionales",
    description:
      "Gestorías, despachos y consultoras: redacción asistida, resumen de documentación, clasificación automática y soporte al cliente.",
    icon: <Briefcase className="h-5 w-5" />,
  },
];

export function SectorsGrid() {
  return (
    <section id="segmentos" className="scroll-mt-24 bg-muted py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-2xl text-center"
        >
          <Badge variant="outline">Sectores</Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            Sectores donde ya generamos{" "}
            <span className="text-primary">valor</span>
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            No somos generalistas. Nos centramos donde tenemos experiencia real.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {sectors.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary">
                      {s.icon}
                    </span>
                    <Badge variant="outline" className="text-[11px]">
                      {s.badge}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground">{s.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
