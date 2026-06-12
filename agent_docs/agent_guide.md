# Guía para el agente — Nexus Web

Documento operativo para colaboradores humanos o asistentes de IA que trabajan en este repositorio. Complementa `CLAUDE.md`, `ARCHITECTURE.md` y el resto de `agent_docs/` con un flujo único: **qué leer, qué no romper, cómo validar y qué revisar en confianza y seguridad**.

---

## 1. Rol y objetivo

- **Producto:** sitio de marketing B2B (landing + legal + contacto). No es una aplicación con usuarios ni datos persistentes propios.
- **Objetivo de negocio:** que un decisor de PYME entienda la propuesta y use el canal de contacto (formulario → email vía Resend).
- **Tu trabajo:** cambios acotados, tipados, alineados con marca y cumplimiento; sin ampliar el alcance (BD, auth, paneles) salvo petición explícita del equipo.

---

## 2. Orden de lectura antes de implementar

1. **`CLAUDE.md`** — stack, carpetas, guardrails, variables de entorno.
2. **`ARCHITECTURE.md`** — porqué técnico (sin backend persistente, pipeline del formulario, rate-limit, decisiones visuales).
3. **`agent_docs/copy_and_tone.md`** — si tocas copy visible.
4. **`agent_docs/sections.md`** — si reordenas o añades bloques en la home.
5. **`CONTRIBUTING.md`** — si afecta flujo Git o commits.

Si la tarea toca **API, formulario, env, headers o despliegue**, lee además la **sección 5** de esta guía.

---

## 3. Protocolo de cierre de tarea

Salvo que el usuario pida explícitamente lo contrario:

```bash
npm run lint
npm run build
```

Si el build o el lint fallan, no consideres la tarea terminada. Si tras un build cambias variables o rutas y el dev server se comporta mal localmente, borra `.next/` y vuelve a `npm run dev`.

---

## 4. Límites duros (no negociables)

| Regla | Detalle |
|--------|--------|
| Tipado | Sin `any`. TypeScript estricto y `noUncheckedIndexedAccess`. |
| Secretos | Nunca en código ni en commits. Solo `process.env.*` y archivos ignorados (`.env.local`). |
| `NEXT_PUBLIC_*` | Solo para lo que debe ser visible en el navegador. **Nunca** prefijo público para claves API, Resend, etc. |
| `components/_legacy/` | No importar ni editar; excluido del build. |
| Formulario | Mantener **honeypot** (`website`), **Zod** cliente/servidor y **rate-limit** en `POST /api/contact`. |
| Nuevas dependencias | No añadir librerías de UI (salvo requerimiento explícito). |
| Tests | No generar baterías de tests salvo petición explícita. |

---

## 5. Trust, seguridad y superficie de ataque

### 5.1 Endpoint `POST /api/contact` (`app/api/contact/route.ts`)

- **Respuestas al cliente:** mensajes fijos o de validación controlada. No devolver stack traces, cuerpos crudos de Resend, ni paths internos.
- **Errores de proveedor (502/500):** el usuario ve mensajes genéricos (`No se pudo enviar el email`, `Error interno`, etc.). Los detalles operativos, si se registran, deben ser **solo servidor** y sin secretos ni PII innecesaria.
- **`getServerEnv()`:** puede lanzar con mensajes que mencionan nombres de variables. En la ruta de contacto debe estar en `try/catch` y el **JSON al cliente** no debe incluir ese texto largo. Si añades otra ruta que llame a `getServerEnv`, envuelve el boundary HTTP igual.
- **Honeypot:** si `website` viene rellenado, responder éxito silencioso (`{ ok: true }`) para no entrenar bots.
- **Rate-limit:** aplicar antes de parsear JSON pesado. Respuesta 429 coherente con lo que muestra el cliente (véase `contact-section.tsx`).

### 5.2 Cliente del formulario (`components/ui/contact-section.tsx`)

- Ante fallo HTTP, **no** mostrar al usuario el campo `error` del JSON salvo que el producto lo pida explícitamente; el patrón actual prioriza mensajes genéricos (salvo tratamiento explícito de 429).
- Validación local con el mismo schema que el servidor evita viajes inútiles y mantiene coherencia.

### 5.3 Variables de entorno (`lib/env.ts`, `.env.local.example`)

- Servidor: `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`.
- Cliente parseado: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WHATSAPP_URL` (opcional).
- El **ejemplo** en repo debe usar valores vacíos o placeholders claros; **no** cadenas que parezcan API keys reales (`re_...`).

### 5.4 Cabeceras HTTP (`next.config.mjs`)

- Ya están definidas CSP, `X-Frame-Options`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, `poweredByHeader: false`.
- Si añades scripts externos (analytics, chat, etc.), **actualiza CSP** en el mismo archivo y verifica que no rompes la página en producción.
- **HSTS:** a menudo se configura en la plataforma (p. ej. Vercel) o condicionalmente en `headers()` solo en producción; si lo añades en Next, no forzar HTTPS en desarrollo local.

### 5.5 Rate-limit en memoria (`lib/rate-limit.ts`)

- Es un freno básico, no antispam global. No prometer en copy “protección absoluta”; a nivel técnico está documentado en `ARCHITECTURE.md`.

### 5.6 Páginas legales (`app/legal/*`)

- Cualquier cambio debe ser **coherente** con el tratamiento de datos descrito y con el flujo real del sitio (formulario, cookies si las hay, enlaces a Resend/dominio).
- No introducir afirmaciones legales nuevas sin revisión humana del responsable.

---

## 6. Contenido, marca y UX

- Copy de marketing: `agent_docs/copy_and_tone.md`.
- Orden y tipo de secciones: `agent_docs/sections.md`.
- Componentes nuevos en home: mismo patrón que bloques existentes (`components/ui/`), tokens semánticos Tailwind, primitives en `components/ui/shadcn/`, animaciones con `motion` (`import` desde `motion/react`) donde ya se usa en el bloque.

---

## 7. Lista de comprobación rápida del agente

**Antes de implementar**

- [ ] ¿La tarea encaja en “solo marketing web” o estoy metiendo backend/BD/auth sin pedirlo?
- [ ] ¿He leído los docs pertinentes (§2)?

**Tras tocar API o env**

- [ ] ¿Los errores HTTP siguen siendo seguros para el cliente?
- [ ] ¿Ningún secreto en cliente ni en `NEXT_PUBLIC_*`?
- [ ] ¿Honeypot + Zod + rate-limit intactos?

**Tras tocar headers o terceros**

- [ ] ¿CSP y `connect-src`/`script-src` siguen permitiendo solo lo necesario?

**Antes de dar por cerrado**

- [ ] `npm run lint` y `npm run build` OK.

---

## 8. Comunicación con el usuario

- Responde en el idioma que use el usuario; documentación y mensajes de commit del proyecto en **español** cuando proceda.
- Para referencias a código en el chat, usa citas con ruta y líneas según las convenciones del entorno.
- No afirmar “pasa CI” o “build OK” sin haber ejecutado los comandos (o sin evidencia en la misma sesión).

---

## 9. Resumen en una frase

**Prioriza conversión y confianza, minimiza superficie técnica y de datos, y trata el formulario y las variables sensibles como el activo más delicado del repo.**
