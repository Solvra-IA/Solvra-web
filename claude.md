# CLAUDE.md — Solvra Web

## Contexto de producto

Sitio web de marketing de Solvra para presentar propuesta de valor, servicios y canal de contacto.
No incluye autenticación, panel interno ni base de datos.

## Stack técnico

- Next.js 14 (App Router)
- TypeScript (strict)
- Tailwind CSS
- Resend para formulario de contacto
- npm como package manager

## Estructura principal

- `app/`: rutas y páginas del sitio
- `components/`: componentes UI y secciones
- `lib/`: utilidades, validaciones e integración con Resend
- `public/`: assets estáticos

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

## Variables de entorno requeridas

```bash
RESEND_API_KEY=
CONTACT_FROM_EMAIL=
CONTACT_TO_EMAIL=
NEXT_PUBLIC_SITE_URL=
```

## Guardrails

- No usar `any` en TypeScript
- No introducir servicios de BD ni auth sin requerimiento explícito
- No exponer secretos en código o commits