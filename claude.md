# CLAUDE.md — Solvra Web

## Contexto de producto

Sitio web de marketing de Solvra, consultora de IA para PYMEs españolas. Joint venture con la gestoría **Solfico S.L.** (Vilanova i la Geltrú, Cataluña).

Segmentos objetivo: **inmobiliarias, clínicas y servicios profesionales** (gestorías, despachos, consultoras pequeñas).

Este repositorio es **solo la web de marketing**: landing, propuesta de valor y formulario de contacto. No incluye autenticación, panel interno ni base de datos.

## Stack técnico

- Next.js 14 (App Router) — Node 20+ (ver `.nvmrc`)
- TypeScript (strict, `noUncheckedIndexedAccess`)
- Tailwind CSS con tokens semánticos (`background`, `foreground`, `muted`, `card`, `primary`, `border`, …)
- shadcn/ui style: primitives Radix + `class-variance-authority`, iconos `lucide-react`
- `framer-motion` / `motion` para animaciones de entrada y scroll
- Resend para el formulario de contacto
- Zod para validación cliente y servidor
- npm como package manager

## Estructura principal

- `app/`: rutas, layouts, route handlers (App Router)
  - `app/page.tsx`: composición de la home con bloques de `components/ui/`
  - `app/api/contact/`: endpoint del formulario → Resend (con rate-limit)
  - `app/legal/`: aviso legal, privacidad, cookies
  - `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`, `app/icon.svg`
- `components/ui/`: bloques de la home estilo shadcn (cada archivo es una sección o pieza visual: `saa-s-template.tsx`, `shadcnblocks-com-feature108.tsx`, `process-timeline.tsx`, `sectors-grid.tsx`, `logo-cloud-2.tsx`, `testimonials-columns-1.tsx`, `about-split.tsx`, `faqs-1.tsx`, `contact-section.tsx`, `site-header.tsx`, `site-footer.tsx`, `beams-background.tsx`)
- `components/ui/shadcn/`: primitives reutilizables (`button`, `card`, `badge`, `input`, `textarea`, `accordion`)
- `components/_legacy/`: implementación anterior (sections/layout/forms/ui) conservada por referencia; **excluida** del build (`tsconfig.json` `exclude`, `.eslintrc.json` `ignorePatterns`). No editar ni importar desde aquí.
- `lib/`: utilidades, schemas Zod, cliente Resend, plantillas de email, rate-limit, `site-config`
- `public/`: assets estáticos (logos, iconos, `public/feature/*.svg` para los tabs de Servicios)
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

Si alguno falla, corregir antes de dar la tarea por terminada. Si tras un build necesitas volver a `npm run dev`, borra `.next/` para evitar caché stale.

## Variables de entorno requeridas

```bash
RESEND_API_KEY=
CONTACT_FROM_EMAIL=
CONTACT_TO_EMAIL=
NEXT_PUBLIC_SITE_URL=
```

`CONTACT_FROM_EMAIL` debe pertenecer a un dominio verificado en Resend (SPF/DKIM).

## Guardrails

- No usar `any` en TypeScript (regla ESLint activa).
- No introducir BD, auth ni rutas protegidas sin requerimiento explícito.
- No añadir nuevas librerías de UI (más allá de las ya instaladas: Radix, lucide, framer-motion, motion) sin pedirlo.
- No tocar ni importar nada de `components/_legacy/` — está conservado por contexto pero fuera del build.
- No generar tests automáticos salvo que se pidan.
- No exponer secretos en código o commits; siempre `process.env.*`.
- Mantener honeypot, validación Zod y rate-limit (`lib/rate-limit.ts`) en `/api/contact` al editar el formulario.
- Para componentes nuevos en la home, seguir el patrón de los bloques existentes en `components/ui/` (tokens semánticos, primitives shadcn, framer-motion para animaciones).

## Referencias

- `agent_docs/copy_and_tone.md`: tono de marca y mensajes clave.
- `agent_docs/sections.md`: estructura y orden de secciones de la landing.
