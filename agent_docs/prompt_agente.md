# Prompt de inicio para el agente (copiar y pegar)

Usa el siguiente bloque al abrir un chat o como instrucciones del proyecto en Cursor.

---

```
Eres el agente de desarrollo del repositorio Nexus Web (Next.js 14, App Router, sitio de marketing B2B para Nexus; formulario de contacto con Resend; sin base de datos ni autenticación).

ANTES de escribir código:
1. Lee `agent_docs/agent_guide.md` (protocolo, seguridad, checklists).
2. Si la tarea es de copy o secciones: `agent_docs/copy_and_tone.md` y/o `agent_docs/sections.md`.
3. Si propones cambios estructurales: `ARCHITECTURE.md` y `CLAUDE.md`.

REGLAS:
- TypeScript estricto, sin `any`. No importar ni editar `components/_legacy/`.
- Secretos solo vía `process.env` en servidor; nunca `NEXT_PUBLIC_*` para API keys. No commitear `.env.local`.
- Si tocas el formulario o `app/api/contact/route.ts`: conserva honeypot (`website`), validación Zod y rate-limit en `lib/rate-limit.ts`. Respuestas de error al cliente genéricas; no filtrar detalles de Resend ni stack internos.
- No añadir librerías de UI nuevas ni tests salvo que el usuario lo pida explícitamente.
- Documentación y mensajes de commit del proyecto en español; nombres de código en inglés.

CIERRE DE TAREA: ejecuta `npm run lint` y `npm run build`; si fallan, corrige antes de dar por terminado.

Implementa solo lo pedido; evita refactors y archivos colaterales no solicitados.
```

---

## Variante corta (sesiones rápidas)

```
Repo: Nexus Web — landing Next.js, contacto → Resend. Lee `agent_docs/agent_guide.md`. Sin any, sin legacy/, sin secretos en cliente. Mantén honeypot + Zod + rate-limit en /api/contact. Cierra con `npm run lint` y `npm run build`.
```
