"use client";

import { useState } from "react";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { AnimatePresence, motion } from "framer-motion";
import { Layout, Pointer, Zap } from "lucide-react";

import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";

interface TabContent {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
}

interface Tab {
  value: string;
  icon: React.ReactNode;
  label: string;
  content: TabContent;
}

interface Feature108Props {
  badge?: string;
  heading?: string;
  description?: string;
  tabs?: Tab[];
}

const Feature108 = ({
  badge = "shadcnblocks.com",
  heading = "A Collection of Components Built With Shadcn & Tailwind",
  description = "Join us to build flawless web solutions.",
  tabs = [
    {
      value: "tab-1",
      icon: <Zap className="h-auto w-4 shrink-0" />,
      label: "Boost Revenue",
      content: {
        badge: "Modern Tactics",
        title: "Make your site a true standout.",
        description:
          "Discover new web trends that help you craft sleek, highly functional sites that drive traffic and convert leads into customers.",
        buttonText: "See Plans",
        imageSrc: "/feature/diagnostico.svg",
        imageAlt: "Diagnóstico",
      },
    },
    {
      value: "tab-2",
      icon: <Pointer className="h-auto w-4 shrink-0" />,
      label: "Higher Engagement",
      content: {
        badge: "Expert Features",
        title: "Boost your site with top-tier design.",
        description:
          "Use stellar design to easily engage users and strengthen their loyalty. Create a seamless experience that keeps them coming back for more.",
        buttonText: "See Tools",
        imageSrc: "/feature/automatizacion.svg",
        imageAlt: "Automatización",
      },
    },
    {
      value: "tab-3",
      icon: <Layout className="h-auto w-4 shrink-0" />,
      label: "Stunning Layouts",
      content: {
        badge: "Elite Solutions",
        title: "Build an advanced web experience.",
        description:
          "Lift your brand with modern tech that grabs attention and drives action. Create a digital experience that stands out from the crowd.",
        buttonText: "See Options",
        imageSrc: "/feature/integracion.svg",
        imageAlt: "Integración",
      },
    },
  ],
}: Feature108Props) => {
  const initial = tabs[0]?.value ?? "";
  const [active, setActive] = useState<string>(initial);
  const current = tabs.find((t) => t.value === active) ?? tabs[0];

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge variant="outline">{badge}</Badge>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            {heading}
          </h2>
          <p className="max-w-xl text-muted-foreground md:text-lg">{description}</p>
        </div>

        <Tabs value={active} onValueChange={setActive} className="mt-8">
          <TabsList className="container flex flex-col items-center justify-center gap-4 sm:flex-row md:gap-10">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground transition-colors data-[state=active]:bg-muted data-[state=active]:text-primary"
              >
                {tab.icon} {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Panel con bleed: overflow-hidden recorta la imagen que se sale por la
            esquina inferior derecha, creando la sensación de "ventana" sobre un
            gráfico mayor. AnimatePresence anima la transición entre tabs. */}
        <div className="relative mx-auto mt-8 max-w-screen-xl overflow-hidden rounded-2xl border border-gray-200/80 bg-muted/70">
          <AnimatePresence mode="wait" initial={false}>
            {current ? (
              <motion.div
                key={current.value}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-2 lg:gap-0 lg:p-0"
              >
                <div className="flex flex-col gap-5 lg:py-16 lg:pl-16 lg:pr-12">
                  <Badge variant="outline" className="w-fit bg-background">
                    {current.content.badge}
                  </Badge>
                  <h3 className="text-3xl font-semibold tracking-tight lg:text-5xl">
                    {current.content.title}
                  </h3>
                  <p className="text-muted-foreground lg:text-lg">
                    {current.content.description}
                  </p>
                  <Button asChild className="mt-2.5 w-fit gap-2" size="lg">
                    <a href="#contacto">{current.content.buttonText}</a>
                  </Button>
                </div>

                {/* Bleed visual: en desktop la imagen sangra fuera del panel,
                    cortada por overflow-hidden del contenedor. */}
                <div className="relative -mb-2 -mr-2 flex items-end justify-end lg:mb-0 lg:mr-0 lg:h-full lg:self-stretch">
                  <Image
                    src={current.content.imageSrc}
                    alt={current.content.imageAlt}
                    width={600}
                    height={400}
                    priority={current.value === "tab-1"}
                    className="h-auto w-full max-w-md drop-shadow-[0_16px_38px_rgba(15,23,42,0.08)] [filter:drop-shadow(0_28px_54px_rgba(0,82,255,0.12))] lg:absolute lg:bottom-[-16%] lg:right-[-14%] lg:w-[128%] lg:max-w-none"
                  />
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export { Feature108 };
