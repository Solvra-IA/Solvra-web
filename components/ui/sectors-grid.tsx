"use client";

import { motion } from "motion/react";
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
      "Cualificación de leads, redacción asistida de fichas, respuestas 24/7 a consultas repetitivas y seguimiento post-visita con menos intercambios perdidos.",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    badge: "Salud",
    title: "Clínicas",
    description:
      "Recordatorios, reprogramación asistida y mensajes fuera de horario sin saturar recepción. Siempre con controles explícitos sobre datos clínicos y consentimiento.",
    icon: <Stethoscope className="h-5 w-5" />,
  },
  {
    badge: "B2B",
    title: "Servicios profesionales",
    description:
      "Gestorías y despachos: clasificación de documentos entrantes, borradores asistidos, resúmenes para revisión humana y trazabilidad para auditoría interna.",
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
          <h2 className="mt-4 text-3xl font-[510] tracking-[-0.012em] md:text-4xl lg:text-5xl">
            Dónde ya aportamos{" "}
            <span className="text-aether-blue">orden operativo</span>
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Nos centramos en segmentos donde conocemos normativa y ritmo de trabajo.
            Si tu caso es límite, lo decimos en la primera conversación.
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
              <Card className="h-full border-charcoal-grey shadow-linear-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-linear-card-inset">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-md bg-deep-slate text-aether-blue ring-1 ring-charcoal-grey">
                      {s.icon}
                    </span>
                    <Badge variant="outline" className="border-charcoal-grey bg-deep-slate text-[11px] text-storm-cloud">
                      {s.badge}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-[510] tracking-[-0.012em] text-porcelain">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.55] text-storm-cloud">{s.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
