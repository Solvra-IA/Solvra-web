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

## Configuración de Resend (envío del formulario)

El formulario de contacto envía email vía Resend. Para que funcione en producción hay que verificar el dominio remitente, no solo crear la API key.

1. **API key:** crear en `https://resend.com/api-keys` y guardar en `RESEND_API_KEY`.
2. **Verificación de dominio:** en `https://resend.com/domains` añadir el dominio que aparecerá en `CONTACT_FROM_EMAIL` (por ejemplo `solvra.es`). Resend genera registros DNS:
   - **SPF** (`TXT`): autoriza a Resend a enviar en nombre del dominio.
   - **DKIM** (`TXT` con clave pública): firma criptográfica de salida.
   - **MX** opcional: solo si quieres recibir bounces gestionados por Resend.
3. **Publicar los registros** en el panel DNS del dominio (Cloudflare, Squarespace, etc.). Suele propagar en minutos; Resend marca el dominio como `Verified` cuando lo detecta.
4. **Probar:** rellenar `CONTACT_FROM_EMAIL=hola@tudominio.com` y `CONTACT_TO_EMAIL=destino@…`, hacer un envío desde el formulario en local y comprobar que llega.

Hasta que el dominio esté verificado, Resend rechazará los envíos con un 4xx y el endpoint `/api/contact` devolverá `502`. Esto es responsabilidad del admin DNS, no del código.

## Despliegue

Optimizado para Vercel. El proyecto compila con `npm run build` y arranca con `npm run start`. Recordar añadir las cuatro variables de entorno (`RESEND_API_KEY`, `NEXT_PUBLIC_SITE_URL`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`) en el dashboard del proyecto antes del primer deploy.
