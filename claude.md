# CLAUDE.md — Solvra Web

## Contexto de producto

Sitio web de marketing de Solvra, consultora de IA para PYMEs españolas. Joint venture con la gestoría **Solfico S.L.** (Vilanova i la Geltrú, Cataluña).

Segmentos objetivo: **inmobiliarias, clínicas y servicios profesionales** (gestorías, despachos, consultoras pequeñas).

Este repositorio es **solo la web de marketing**: landing, propuesta de valor y formulario de contacto. No incluye autenticación, panel interno ni base de datos.

## Stack técnico

- Next.js 14 (App Router)
- TypeScript (strict, `noUncheckedIndexedAccess`)
- Tailwind CSS
- Resend para el formulario de contacto
- Zod para validación cliente y servidor
- npm como package manager
- Node.js 20+ (ver `.nvmrc`)

## Estructura principal

- `app/`: rutas, layouts y route handlers (App Router)
  - `app/api/contact/`: endpoint del formulario → Resend
  - `app/legal/`: aviso legal, privacidad, cookies
- `components/ui/`: primitivos (Button, Input, Textarea, Container)
- `components/layout/`: Header y Footer
- `components/sections/`: secciones de la landing
- `components/forms/`: ContactForm (client component)
- `lib/`: utilidades, schemas Zod, cliente Resend, plantillas de email, `site-config`
- `public/`: assets estáticos
- `agent_docs/`: contexto de marca (`copy_and_tone.md`, `sections.md`)

## Flujo local

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

## Validación antes de cerrar tareas

```bash
npm run lint
npm run build
```

Si alguno falla, corregir antes de dar la tarea por terminada.

## Variables de entorno requeridas

```bash
RESEND_API_KEY=
CONTACT_FROM_EMAIL=
CONTACT_TO_EMAIL=
NEXT_PUBLIC_SITE_URL=
```

`CONTACT_FROM_EMAIL` debe pertenecer a un dominio verificado en Resend.

## Guardrails

- No usar `any` en TypeScript (regla ESLint activa).
- No introducir BD, auth ni rutas protegidas sin requerimiento explícito.
- No instalar librerías de UI (shadcn, MUI, Radix) sin pedirlo.
- No generar tests automáticos salvo que se pidan.
- No exponer secretos en código o commits; siempre `process.env.*`.
- Mantener el honeypot y la validación Zod en `/api/contact` al editar el formulario.

## Referencias

- `agent_docs/copy_and_tone.md`: tono de marca y mensajes clave.
- `agent_docs/sections.md`: estructura y orden de secciones de la landing.
