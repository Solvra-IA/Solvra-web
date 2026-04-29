"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { contactSchema, type ContactInput } from "@/lib/validations";

type Status = "idle" | "loading" | "success" | "error";

const bullets = [
  "Respuesta en menos de 24 horas laborables",
  "Sin comerciales insistentes",
  "En español, claro y directo",
];

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const formData = new FormData(event.currentTarget);
    const payload: ContactInput = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      setStatus("error");
      const first = Object.values(parsed.error.flatten().fieldErrors).flat()[0];
      setErrorMsg(first ?? "Revisa los datos del formulario");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(
          res.status === 429
            ? "Demasiados envíos. Espera unos minutos antes de volver a intentarlo."
            : "No se pudo enviar. Inténtalo de nuevo en unos minutos.",
        );
        return;
      }
      setStatus("success");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
      setErrorMsg("Error de red. Revisa tu conexión.");
    }
  }

  return (
    <section id="contacto" className="scroll-mt-24 py-24 md:py-32 text-white">
      <div className="container mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-5"
          >
            <Badge
              variant="outline"
              className="border-white/20 bg-white/5 text-white/85"
            >
              Contacto
            </Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              Cuéntanos tu <span className="text-primary">caso</span>
            </h2>
            <p className="mt-5 text-white/75 md:text-lg">
              Una sesión inicial de 30 minutos, gratuita y sin compromiso. Te
              diremos si podemos ayudarte y cómo.
            </p>
            <ul className="mt-8 space-y-3">
              {bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-[15px] text-white/80"
                >
                  <span
                    aria-hidden
                    className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"
                  >
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-7"
          >
            <Card className="shadow-2xl">
              <CardContent className="p-6 sm:p-8">
                {status === "success" ? (
                  <div className="py-6 text-center">
                    <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-6 w-6" strokeWidth={2.5} />
                    </div>
                    <p className="mt-5 text-2xl font-semibold tracking-tight">
                      ¡Mensaje enviado!
                    </p>
                    <p className="mt-2 text-muted-foreground">
                      Te contestamos en menos de 24 horas laborables.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-5" noValidate>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-1.5 block text-[13px] font-medium text-muted-foreground"
                        >
                          Nombre *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          required
                          autoComplete="name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-1.5 block text-[13px] font-medium text-muted-foreground"
                        >
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="company"
                          className="mb-1.5 block text-[13px] font-medium text-muted-foreground"
                        >
                          Empresa
                        </label>
                        <Input
                          id="company"
                          name="company"
                          autoComplete="organization"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="mb-1.5 block text-[13px] font-medium text-muted-foreground"
                        >
                          Teléfono
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="mb-1.5 block text-[13px] font-medium text-muted-foreground"
                      >
                        ¿En qué podemos ayudarte? *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        className="min-h-[140px]"
                      />
                    </div>

                    {/* Honeypot anti-bot */}
                    <div aria-hidden className="hidden">
                      <label htmlFor="website">Web</label>
                      <input
                        id="website"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {status === "error" && errorMsg ? (
                      <p className="text-sm text-red-600" role="alert">
                        {errorMsg}
                      </p>
                    ) : null}

                    <div className="flex flex-col items-stretch gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        Al enviar aceptas nuestra{" "}
                        <a
                          href="/legal/privacidad"
                          className="font-medium underline-offset-4 hover:underline"
                        >
                          política de privacidad
                        </a>
                        .
                      </p>
                      <Button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full gap-2 sm:w-auto sm:shrink-0"
                      >
                        {status === "loading" ? "Enviando…" : "Enviar mensaje"}
                        {status !== "loading" ? (
                          <ArrowRight className="h-4 w-4" />
                        ) : null}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
