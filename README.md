# Nexus Web

Landing pública de **Nexus** (joint venture con **Solfico S.L.**): consultoría de IA para PYMEs españolas — inmobiliarias, clínicas y servicios profesionales.

Este repositorio contiene **solo el sitio de marketing** (landing, legal y formulario de contacto). No incluye panel interno ni base de datos.

## Estado del proyecto

- **Producción** — sitio de marketing activo
- Next.js 14 + TypeScript estricto
- Contacto mediante **Resend**, validación con **Zod** y límites de uso en el endpoint

## Stack

| Área              | Herramientas |
| ----------------- | ------------ |
| Framework         | Next.js 14 (App Router), React 18 |
| Tipado / validación | TypeScript strict, Zod |
| Estilos           | Tailwind CSS, tokens semánticos |
| UI                | Radix primitives, estilo shadcn (`components/ui/shadcn/`) |
| Motion / scroll    | Framer Motion, Motion, Lenis |
| Email             | Resend |
| Calidad           | ESLint (`next/core-web-vitals`), Prettier |
| Observabilidad    | `@vercel/analytics`, `@vercel/speed-insights` |

## Estructura principal

```text
app/                      Rutas, layout, metadata, sitemap/robots, opengraph
app/api/contact/          POST del formulario → Resend (rate limit, honeypot)
app/legal/                Aviso legal, privacidad, cookies
components/ui/            Bloques de la landing
components/ui/shadcn/     Primitives reutilizables
components/providers/     Providers globales (p. ej. Lenis)
components/seo/           Structured data y piezas SEO
lib/                      Config del sitio, schemas, cliente Resend, rate limit
public/                   Assets estáticos
.github/                  Plantillas y automatización
vercel.ts                 Configuración tipada para Vercel (`@vercel/config`)
agent_docs/               Tono de marca y estructura de secciones
```

Referencia legacy (no forma parte del build): `components/_legacy/` está excluido en TypeScript.

## Requisitos

- **Node.js 20+** (ver [.nvmrc](.nvmrc))
- **npm 10+** (recomendado junto al Node anterior)

Si usas [nvm](https://github.com/nvm-sh/nvm):

```bash
nvm use
```

## Arranque en local

```bash
nvm use
npm install
cp .env.local.example .env.local
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) y completa las variables obligatorias en `.env.local` para probar el envío por email.

## Scripts

| Comando           | Descripción |
| ----------------- | ----------- |
| `npm run dev`     | Servidor de desarrollo Next.js |
| `npm run lint`    | ESLint (`next lint`) |
| `npm run build`   | Build optimizado de producción |
| `npm run start`   | Sirve el build tras `npm run build` |
| `npm run format`  | Prettier (incluye plugin Tailwind) |

Antes de dar por cerrado un cambio importante, ejecuta **`npm run lint`** y **`npm run build`**; si tras un fallo repetido el build parece stale, borra `.next/` y vuelve a lanzar `npm run build`.

## Variables de entorno

Plantilla: [.env.local.example](.env.local.example).

**Obligatorias para envío real del formulario y URLs correctas en producción**

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL` — dominio verificado en Resend (SPF/DKIM)
- `CONTACT_TO_EMAIL`
- `NEXT_PUBLIC_SITE_URL` — URL pública (metadata, sitemap, OG)

**Opcional**

- `NEXT_PUBLIC_WHATSAPP_URL` — enlace directo tipo WhatsApp si lo usáis en la landing

No commitees secretos; todo va en `.env.local` o en el panel de Vercel.

## Configuración de Resend

En producción el remitente debe ser de un **dominio verificado** en Resend.

1. Crear API key en [resend.com/api-keys](https://resend.com/api-keys)
2. Verificar dominio en [resend.com/domains](https://resend.com/domains)
3. Publicar registros DNS (SPF/DKIM)
4. Probar el POST en `/api/contact` desde el formulario de la web

## Despliegue

Pensado para **Vercel**.

1. Conectar el repositorio y definir las variables de entorno del panel
2. Build: `npm run build` — Start: `npm run start`
3. Tras el deploy, visita el sitio y navega entre páginas para que **Analytics** y **Speed Insights** empiecen a recoger datos (revisa bloqueadores si no ves tráfico al instante)

## Documentación interna

- [ARCHITECTURE.md](ARCHITECTURE.md) — decisiones técnicas
- [CONTRIBUTING.md](CONTRIBUTING.md) — flujo y convenciones
- [SECURITY.md](SECURITY.md) — reporte responsable
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) — código de conducta
- [claude.md](claude.md) — guardrails para agentes IA
- [agent_docs/](agent_docs/) — copy y estructura de la landing
