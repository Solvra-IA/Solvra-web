# Solvra-web

Web pública de Solvra, consultora de IA para pymes en España. Este repositorio contiene la landing, secciones de servicios y formulario de contacto.

## Stack

- Next.js 14 (App Router)
- TypeScript (strict)
- Tailwind CSS
- Resend (envío de correos del formulario)
- ESLint + Prettier

## Requisitos

- Node.js 20+
- npm 10+

## Arranque en local

1. Instala dependencias:

```bash
npm install
```

2. Crea variables de entorno a partir del ejemplo:

```bash
cp .env.local.example .env.local
```

3. Completa los valores en `.env.local`.

4. Inicia el entorno local:

```bash
npm run dev
```

La app estará disponible en `http://localhost:3000`.

## Scripts disponibles

- `npm run dev`: servidor de desarrollo
- `npm run build`: build de producción
- `npm run start`: servir build de producción
- `npm run lint`: análisis estático con ESLint
- `npm run format`: formateo con Prettier

## Variables de entorno

Revisa el archivo `.env.local.example` para ver las variables requeridas por el proyecto.
