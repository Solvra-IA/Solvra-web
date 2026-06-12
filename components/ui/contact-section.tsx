"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { track } from "@vercel/analytics";
import { useLenis } from "lenis/react";
import { ArrowRight, Check } from "lucide-react";

import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { siteConfig } from "@/lib/site-config";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { clientEnv } from "@/lib/env";

type Status = "idle" | "loading" | "success" | "error";
type FieldErrors = Partial<Record<keyof ContactInput, string>>;

const bullets = [
  "Respuesta en menos de 24 horas laborables",
  "En el mensaje puedes pedir hueco para videollamada",
  "Sin equipos comerciales a presión",
];

const SCROLL_OFFSET = -88;
const SCROLL_DURATION = 0.55;

export function ContactSection() {
  const lenis = useLenis();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function scrollToForm() {
    const el = document.getElementById("contacto-form");
    if (!el || !lenis) return;
    lenis.scrollTo(el, { offset: SCROLL_OFFSET, duration: SCROLL_DURATION });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    setFieldErrors({});

    const form = event.currentTarget;
    const formData = new FormData(form);
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
      const flat = parsed.error.flatten().fieldErrors;
      const next: FieldErrors = {};
      (Object.keys(flat) as (keyof ContactInput)[]).forEach((k) => {
        const msg = flat[k]?.[0];
        if (msg) next[k] = msg;
      });
      setFieldErrors(next);
      setStatus("error");
      setErrorMsg("Revisa los campos marcados.");
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
      track("contact_submit");
      form.reset();
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
              Reservar{" "}
              <span className="text-primary">diagnóstico gratuito</span>
            </h2>
            <p className="mt-5 text-white/75 md:text-lg">
              Cuéntanos en qué proceso pierdes horas o dónde falla el control.
              Responderemos por email; si encaja, te proponemos un hueco breve de
              videollamada. También puedes limitarte a enviar el formulario por
              escrito.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                type="button"
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => {
                  track("cta_click", { location: "contact_primary" });
                  scrollToForm();
                  window.requestAnimationFrame(() => {
                    document.getElementById("contact-message")?.focus();
                  });
                }}
              >
                Reservar diagnóstico gratuito
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-full border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white sm:w-auto"
                onClick={() => {
                  track("cta_click", { location: "contact_secondary" });
                  scrollToForm();
                }}
              >
                Enviar formulario
              </Button>
            </div>
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
            <Card id="contacto-form" className="scroll-mt-24 shadow-2xl">
              <CardContent className="p-6 sm:p-8">
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="py-6 text-center"
                    role="status"
                    aria-live="polite"
                  >
                    <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-6 w-6" strokeWidth={2.5} />
                    </div>
                    <p className="mt-5 text-2xl font-semibold tracking-tight">
                      Formulario enviado
                    </p>
                    <p className="mt-2 text-muted-foreground">
                      Te contestamos en menos de 24 horas laborables al email que
                      nos has indicado.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStatus("idle")}
                      className="mt-6"
                    >
                      Enviar otro formulario
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-5" noValidate>
                    <p className="text-sm font-medium text-foreground">
                      O envía el formulario con tu consulta
                    </p>
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
                          aria-invalid={fieldErrors.name ? true : undefined}
                          aria-describedby={fieldErrors.name ? "name-error" : undefined}
                        />
                        {fieldErrors.name ? (
                          <p id="name-error" role="alert" className="mt-1 text-xs text-red-600">
                            {fieldErrors.name}
                          </p>
                        ) : null}
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
                          aria-invalid={fieldErrors.email ? true : undefined}
                          aria-describedby={fieldErrors.email ? "email-error" : undefined}
                        />
                        {fieldErrors.email ? (
                          <p id="email-error" role="alert" className="mt-1 text-xs text-red-600">
                            {fieldErrors.email}
                          </p>
                        ) : null}
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
                          aria-invalid={fieldErrors.company ? true : undefined}
                          aria-describedby={fieldErrors.company ? "company-error" : undefined}
                        />
                        {fieldErrors.company ? (
                          <p id="company-error" role="alert" className="mt-1 text-xs text-red-600">
                            {fieldErrors.company}
                          </p>
                        ) : null}
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
                          aria-invalid={fieldErrors.phone ? true : undefined}
                          aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
                        />
                        {fieldErrors.phone ? (
                          <p id="phone-error" role="alert" className="mt-1 text-xs text-red-600">
                            {fieldErrors.phone}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="mb-1.5 block text-[13px] font-medium text-muted-foreground"
                      >
                        ¿En qué podemos ayudarte? *
                      </label>
                      <Textarea
                        id="contact-message"
                        name="message"
                        required
                        className="min-h-[140px]"
                        aria-invalid={fieldErrors.message ? true : undefined}
                        aria-describedby={fieldErrors.message ? "message-error" : undefined}
                      />
                      {fieldErrors.message ? (
                        <p id="message-error" role="alert" className="mt-1 text-xs text-red-600">
                          {fieldErrors.message}
                        </p>
                      ) : null}
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
                      <div className="space-y-3">
                        <p className="text-sm text-red-600" role="alert">
                          {errorMsg}
                        </p>
                        <div className="rounded-lg border border-border bg-muted/40 p-3 text-sm">
                          <p className="font-medium text-foreground">
                            Si falla el envío, contáctanos directamente:
                          </p>
                          <div className="mt-2 flex flex-wrap items-center gap-3">
                            <a
                              href={`mailto:${siteConfig.contactEmail}`}
                              className="font-medium text-primary underline-offset-4 hover:underline"
                            >
                              {siteConfig.contactEmail}
                            </a>
                            {clientEnv.NEXT_PUBLIC_WHATSAPP_URL ? (
                              <a
                                href={clientEnv.NEXT_PUBLIC_WHATSAPP_URL}
                                target="_blank"
                                rel="noreferrer"
                                className="font-medium text-primary underline-offset-4 hover:underline"
                              >
                                WhatsApp
                              </a>
                            ) : null}
                          </div>
                        </div>
                      </div>
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
                        {status === "loading" ? "Enviando…" : "Enviar formulario"}
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
