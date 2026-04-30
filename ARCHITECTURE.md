# Arquitectura de Solvra Web

Este documento captura las decisiones técnicas no triviales del proyecto: el **porqué** detrás de la estructura, no solo el **qué**. Está pensado para que un colaborador (humano o IA) entienda en 10 minutos las restricciones del repo y por qué tomamos las decisiones que ves en el código.

Para el **qué** (estructura de carpetas, scripts, variables) consulta `README.md` y `claude.md`.

---

## Objetivo del producto

Web de marketing B2B de **Solvra** — consultoría de IA para PYMEs españolas, joint venture con la gestoría **Solfico S.L.** (Vilanova i la Geltrú).

Un único objetivo de conversión: **que un decisor de PYME (inmobiliaria, clínica o servicios profesionales) llegue a la web, entienda en 30 segundos qué hacemos, y rellene el formulario de contacto.**

Todo el resto de decisiones técnicas se derivan de ese objetivo.

---

## Decisiones de alto nivel

### 1. Sin backend persistente

**Qué:** No hay base de datos, ORM, autenticación ni panel administrativo. El único endpoint es `app/api/contact/route.ts`.

**Por qué:**
- El producto es captación, no software. Un CMS o panel multiplicaría superficie sin aportar al objetivo.
- Vercel + Resend cubren el 100 % del flujo: el sitio se sirve estático desde el edge, los emails los recibe Solfico en su buzón normal.
- Cero coste fijo más allá del dominio y la cuota de Resend.

**Cuándo cambiará:** si añadimos casos de éxito gestionables, blog con CMS, área de cliente o programa de afiliados. Hoy no hay justificación.

### 2. Stack: Next.js 14 App Router + TypeScript estricto

**Qué:** Next 14 con App Router, no Pages Router. TypeScript con `strict: true` y `noUncheckedIndexedAccess`.

**Por qué:**
- App Router permite Server Components (la mayor parte de la home es estática prerenderizada → 0 JS por defecto en muchas rutas).
- `noUncheckedIndexedAccess` previene la clase de bug "el índice existe siempre" que con datos reales no se cumple. Cuesta verbosity al principio, devuelve seguridad de tipos al final.
- Vercel es el deploy natural y empuja App Router como camino feliz.

**No migramos a Next 15** todavía: rompe varias APIs y los CVE actuales en 14.2.x no afectan a nuestra configuración (no usamos `next/image` con `remotePatterns`, ni rewrites). Será un PR dedicado cuando el resto esté estable.

### 3. shadcn-style en lugar de librería de componentes

**Qué:** No usamos shadcn/ui como package. Copiamos primitives Radix + Tailwind a `components/ui/shadcn/` (button, card, badge, input, textarea, accordion). Los bloques de la home (`feature108`, `process-timeline`, `about-split`, etc.) viven en `components/ui/` directamente.

**Por qué:**
- Control total sobre el código de cada componente. Sin sorpresas de breaking changes.
- Tokens semánticos de Tailwind (`background`, `foreground`, `muted`, `card`, `primary`, `border`) se respetan en todo el sistema.
- Se puede personalizar cualquier bloque sin hacer fork de un package.

**Trade-off:** mantenemos el código nosotros. Para una landing es asumible; para una app SaaS de 50 pantallas no lo sería.

### 4. Sistema visual con tokens y gradiente firma

**Qué:** Paleta monocromática cálida (`#FAFAFA` background, `#0F172A` foreground, escalas de `slate-100/200/500`) más un acento azul eléctrico `#0052FF` con gradiente firma a `#4D7CFF`. Tipografía con preferencia por SF Pro nativa en dispositivos Apple, Inter como fallback.

**Por qué:**
- Estética B2B premium sobria: nada futurista, nada cripto, nada neón. Confianza por encima de novedad.
- Una única paleta + un único gradiente firma evitan inconsistencia visual entre bloques.
- Tipografía dramática (display sizes con `clamp()` para escalado fluido) sin pagar coste extra: SF Pro está en cada Mac/iPhone que entra a la web.

**Aplicación del gradiente firma:**
- CTA primario, badges destacados, fondos de iconos, barras de acento en cards de Servicios, indicadores numéricos en pasos. Usado con disciplina, no decorativo.

### 5. Animaciones con dos motores complementarios

**Qué:** `framer-motion` para transiciones controladas (AnimatePresence en tabs, fade-in al entrar en viewport con `<FadeIn>`) y CSS `animation-timeline: view()` para reveals declarativos (`.reveal`).

**Por qué:**
- CSS scroll-driven es nativo, gratis, ejecuta en compositor: cero coste de runtime.
- Framer Motion entra solo donde JS aporta valor: presencia condicional, layout transitions, gestos.
- Lenis añade smooth scroll inertial (sensación premium tipo Linear/Apple). Configurado para respetar `prefers-reduced-motion`.

**Trade-off:** los reveal CSS dependen de soporte navegador. Chrome/Edge 115+ y Safari 18+ los ejecutan; Firefox y navegadores antiguos los muestran sin animación (graceful fallback).

### 6. Formulario de contacto: Zod + Resend + honeypot + rate-limit

**Qué:** Pipeline de defensa por capas en `app/api/contact/route.ts`:

1. **Rate-limit por IP** (`lib/rate-limit.ts`) — 5 envíos por ventana deslizante de 10 min.
2. **Parsing JSON** con manejo de error explícito.
3. **Validación Zod** (`lib/validations.ts`) tanto cliente como servidor.
4. **Honeypot** — campo `website` invisible. Si llega relleno, devolvemos 200 sin enviar email (silencio para que el bot crea que tuvo éxito).
5. **Envío vía Resend** con `react-email` (`lib/email-templates.tsx`).

**Por qué:**
- Cada capa cubre un vector distinto. Quitar una debilita el conjunto:
  - Sin Zod, payloads malformados llegan a Resend (ruido y posible coste).
  - Sin honeypot, los bots de form-spam llenan el buzón.
  - Sin rate-limit, un atacante quema la cuota Resend en minutos.
- Validación duplicada (cliente + servidor) por principio: cliente para UX, servidor para seguridad.

**Limitación documentada del rate-limit:** el store es `Map` en memoria. En Vercel serverless, cada función vive en su propio aislado, así que el contador no es global. Funciona para spam casual y abuso sostenido desde una IP (la función tiende a reutilizar el aislado caliente). Para protección distribuida hay que sustituir por Vercel KV o Upstash Redis. La interfaz `check()` está pensada para que la sustitución sea mecánica.

### 7. Despliegue: Vercel + Resend

**Qué:** Vercel para hosting, Resend para email transaccional.

**Por qué:**
- Vercel: integración nativa Next 14, deploy preview por PR, CDN edge global, free tier suficiente para una landing.
- Resend: SDK React-friendly, dominio verificable con SPF/DKIM, plantillas en JSX. Alternativa a SendGrid/Postmark con UX moderna.

**Pre-requisito DNS:** `CONTACT_FROM_EMAIL` debe pertenecer a un dominio verificado en Resend con SPF y DKIM publicados. Sin esto, Resend rechaza los envíos. Detalles operativos en `README.md`.

---

## Estructura del código

### `app/`

App Router puro. Una ruta por carpeta. Convenciones de Next 14:

- `layout.tsx` — root layout con `Inter` como fallback de fuente, `LenisProvider`, `SiteHeader` y metadata SEO global.
- `page.tsx` — composición de la home con bloques de `components/ui/`.
- `api/contact/route.ts` — único endpoint, runtime Node (necesitamos `react-email` server-side).
- `legal/` — aviso legal, privacidad, cookies (placeholders, pendientes de redactado jurídico real).
- `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `icon.svg` — convenciones de file-based metadata de Next.

### `components/`

```
components/
├── providers/         providers globales (LenisProvider)
├── ui/                bloques de la landing (uno por archivo)
│   └── shadcn/        primitives reutilizables (button, card, badge, etc.)
└── _legacy/           implementación anterior, excluida del build
```

**Regla:** todo bloque visible en la home vive en `components/ui/`. Los primitives (sin lógica de negocio) viven en `components/ui/shadcn/`. Los providers React puros van en `components/providers/`.

`components/_legacy/` está **excluido** vía `tsconfig.json` (`exclude`) y `.eslintrc.json` (`ignorePatterns`). No editar ni importar nada de ahí. Se mantiene como referencia histórica del rediseño anterior; cuando deje de ser útil, borrarlo.

### `lib/`

Código no-React: validaciones (`validations.ts`), cliente Resend (`resend.ts`), plantillas de email (`email-templates.tsx`), rate-limit (`rate-limit.ts`), config de sitio (`site-config.ts`), utilidades (`utils.ts`).

### `public/`

Assets estáticos. `public/feature/*.svg` para los tabs ilustrados de la sección de Servicios. `public/icon.svg` y `public/logo.svg` para la marca.

### `agent_docs/`

Contexto de marca y estructura para colaboradores (humanos o IA) que aún no conocen el producto. `copy_and_tone.md` y `sections.md`.

---

## Headers y seguridad HTTP

`next.config.mjs` añade cabeceras a todas las rutas:

- `X-Frame-Options: DENY` — sin clickjacking.
- `X-Content-Type-Options: nosniff` — sin MIME sniffing.
- `Referrer-Policy: strict-origin-when-cross-origin` — privacidad del referer.
- `Permissions-Policy: camera=(), microphone=(), geolocation=()` — desactiva APIs sensibles.

**Pendiente:** `Content-Security-Policy` estricta. No la hemos puesto aún porque exige whitelist precisa de fonts (Google Fonts), Resend, Vercel Analytics, etc. y rompería el front si se añade a la ligera. Issue P3 en backlog.

---

## Performance

Bundle objetivo: **First Load JS < 110 kB** en la home. Hoy estamos en ~109 kB.

Decisiones que afectan performance:

- **Sin imágenes raster** en la home (todo SVG inline o desde `public/feature/`). Cero coste de red en imágenes.
- **Fuentes:** Inter cargada vía `next/font/google` con `display: swap`. En dispositivos Apple no se descarga (font stack prefiere SF Pro nativa).
- **No usamos `next/image`** todavía para los SVGs decorativos. Pendiente migrarlos para garantizar `width`/`height` explícitos y mejorar CLS.
- **Lenis** añade ~5 kB gz. Configurado con duraciones cortas (0.5–0.65 s) para no degradar INP.

Lighthouse objetivo: **Performance ≥ 95, SEO 100, Accessibility ≥ 95**. Pendiente pasada formal con DevTools throttling móvil.

---

## Decisiones que NO son arquitectura

Para evitar que este documento engorde, **NO** incluimos aquí:

- Estructura de carpetas detallada → `README.md` y `claude.md`.
- Tono de marca y mensajes clave → `agent_docs/copy_and_tone.md`.
- Orden de secciones de la landing → `agent_docs/sections.md`.
- Cómo arrancar el proyecto → `README.md`.
- Cómo contribuir → `CONTRIBUTING.md`.
- Política de seguridad → `SECURITY.md`.
- Convenciones de código → `CONTRIBUTING.md`.

---

## Cambios de arquitectura futuros previsibles

| Cambio | Disparador |
|---|---|
| Migración a Next 15 | Cuando el resto del proyecto esté estable y los CVE high del 14.2.x dejen de tener parche |
| Rate-limit con KV / Redis | Primer ataque distribuido o picos sostenidos en logs |
| CMS (Sanity, Contentful) | Más de 5 entradas de blog/recursos al mes |
| Páginas dedicadas por sector | Cuando los datos de conversión muestren valor de SEO long-tail |
| i18n catalán | Petición concreta de cliente local o decisión estratégica de Solfico |

Cuando alguno se materialice, este documento debe actualizarse.
