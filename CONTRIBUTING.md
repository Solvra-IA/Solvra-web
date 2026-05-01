# Guía de contribución

Gracias por contribuir a Solvra Web.

## Antes de empezar

- Lee `README.md` para arrancar el entorno local.
- `ARCHITECTURE.md` documenta las decisiones técnicas no obvias (Lenis, sin DB, rate-limit en memoria, sistema visual, etc.). Consúltalo antes de proponer un cambio que toque arquitectura.
- Si vas a colaborar con un agente IA (Claude Code u otro), `claude.md` contiene los guardrails operativos del repo.
- Para tono de marca y estructura de secciones revisa `agent_docs/copy_and_tone.md` y `agent_docs/sections.md`.

## Flujo recomendado

1. Crea una rama desde `main` con prefijo claro (`feat/`, `fix/`, `chore/`).
2. Implementa cambios pequeños y coherentes por commit.
3. Antes de abrir PR ejecuta:

```bash
npm run lint
npm run build
```

4. Abre Pull Request usando la plantilla del repositorio.

## Convenciones

- TypeScript estricto, sin `any`.
- Mantener copy y comentarios en español.
- Evitar dependencias nuevas sin justificar en la PR.
- No incluir secretos ni valores sensibles en commits.

## Pull Requests

Incluye siempre:

- Contexto de negocio (por qué se hace)
- Resumen de cambios (qué se tocó)
- Evidencia de validación (`lint`, `build`, capturas si UI)

## Alcance de este repositorio

Este repo contiene solo la web pública de marketing. No añadir auth, base de datos o panel interno sin requerimiento explícito.

## Guardrails

- No introducir librerías de UI nuevas (ya hay shadcn primitives, Radix, lucide, framer-motion). Si crees que falta una, abre issue antes.
- No omitir el rate-limit, honeypot ni la validación Zod del endpoint `/api/contact`. Forman un sistema; quitar uno deja el formulario expuesto.
- Componentes nuevos en `components/ui/` siguiendo el patrón shadcn ya presente: tokens semánticos, primitives en `components/ui/shadcn/`, framer-motion para animaciones.
- Tests automáticos solo si se piden explícitamente — el repo no tiene framework de tests configurado.

## Reportes de seguridad

No abras issues públicos para vulnerabilidades. Sigue el procedimiento de `SECURITY.md`.
