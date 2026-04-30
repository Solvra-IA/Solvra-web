# Guía de contribución

Gracias por contribuir a Solvra Web.

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
