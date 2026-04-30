# Solvra Web

Landing pública de Solvra (joint venture con Solfico S.L.) enfocada en consultoría de IA para PYMEs españolas: inmobiliarias, clínicas y servicios profesionales.

## Estado del proyecto

- `Production` (sitio de marketing activo)
- Stack estable en Next.js 14 + TypeScript estricto
- Flujo de contacto vía Resend con validación Zod

## Stack

- Next.js 14 (App Router)
- TypeScript (strict)
- Tailwind CSS
- Framer Motion + Lenis (interacciones y scroll)
- Resend (envío de formulario)
- ESLint + Prettier

## Estructura principal

```text
app/                    rutas, layout, metadata y handlers
components/ui/          bloques de landing y primitives
components/providers/   providers globales (ej. Lenis)
lib/                    config, validaciones, utilidades
public/                 assets estáticos
.github/                templates y automatizaciones de GitHub
```

## Requisitos

- Node.js 20+
- npm 10+

## Arranque en local

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Disponible en `http://localhost:3000`.

## Scripts

- `npm run dev` inicia el entorno local
- `npm run lint` ejecuta ESLint
- `npm run build` genera el build de producción
- `npm run start` sirve el build de producción
- `npm run format` aplica Prettier

## Variables de entorno

Definidas en `.env.local.example`:

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL`
- `NEXT_PUBLIC_SITE_URL`

## Configuración de Resend

Para producción, además de la API key, el dominio del remitente debe estar verificado en Resend con SPF y DKIM.

Pasos:

1. Crear API key en [resend.com/api-keys](https://resend.com/api-keys)
2. Verificar dominio en [resend.com/domains](https://resend.com/domains)
3. Publicar registros DNS (SPF/DKIM)
4. Probar envío desde `/api/contact`

## Despliegue

Optimizado para Vercel.

- Build: `npm run build`
- Start: `npm run start`
- Configurar variables de entorno en el dashboard antes del primer deploy

## Documentación

- `ARCHITECTURE.md` — decisiones técnicas y porqués del proyecto
- `CONTRIBUTING.md` — flujo de trabajo y convenciones
- `SECURITY.md` — política de reporte responsable
- `CODE_OF_CONDUCT.md` — código de conducta
- `claude.md` — guardrails para colaboración con agentes IA
- `agent_docs/` — tono de marca y estructura de secciones
