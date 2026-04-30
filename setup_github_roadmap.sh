#!/usr/bin/env bash
set -euo pipefail

echo "==> Verificando auth de GitHub CLI..."
gh auth status >/dev/null

echo "==> Creando milestones..."
create_milestone () {
  local title="$1"
  gh api -X POST repos/{owner}/{repo}/milestones -f title="$title" >/dev/null 2>&1 || true
}
create_milestone "v1.0 — Production launch"
create_milestone "v1.1 — Hardening"
create_milestone "v1.2 — Conversion"
create_milestone "v1.3 — Quality"
create_milestone "Backlog"

echo "==> Creando labels..."
create_label () {
  local name="$1"
  local color="$2"
  local desc="$3"
  gh label create "$name" --color "$color" --description "$desc" >/dev/null 2>&1 || true
}

create_label "P0" "B60205" "Bloqueante para lanzamiento"
create_label "P1" "D93F0B" "Primer mes en producción"
create_label "P2" "FBCA04" "Optimización de conversión"
create_label "P3" "0E8A16" "Calidad técnica sostenida"
create_label "P4" "1D76DB" "Backlog largo"

create_label "launch-blocker" "B60205" "Impide salida a producción"
create_label "ops" "5319E7" "Operaciones y despliegue"
create_label "legal" "C2E0C6" "Cumplimiento legal"
create_label "content" "F9D0C4" "Contenido y copy"
create_label "docs" "0075CA" "Documentación"
create_label "security" "D73A4A" "Seguridad"
create_label "dependencies" "0366D6" "Dependencias"
create_label "dx" "6F42C1" "Developer Experience"
create_label "reliability" "1F6FEB" "Fiabilidad"
create_label "ci" "0E8A16" "Integración continua"
create_label "seo" "2EA44F" "SEO"
create_label "analytics" "0052CC" "Métrica y analítica"
create_label "conversion" "A371F7" "Conversión comercial"
create_label "social" "BF3989" "Social sharing"
create_label "performance" "C5DEF5" "Rendimiento web"
create_label "testing" "BFDADC" "Testing"
create_label "monitoring" "FEEAA6" "Observabilidad"
create_label "code-quality" "D4C5F9" "Calidad de código"
create_label "ux" "F9D0C4" "Experiencia de usuario"
create_label "polish" "BFD4F2" "Acabado visual"

echo "==> Creando issues..."
create_issue () {
  local title="$1"
  local labels="$2"
  local milestone="$3"
  local body="$4"
  gh issue create --title "$title" --label "$labels" --milestone "$milestone" --body "$body" >/dev/null
  echo "✔ $title"
}

# ---------------- P0 ----------------
create_issue "#1 Verificar dominio en Resend (SPF + DKIM)" "launch-blocker,ops,P0" "v1.0 — Production launch" \
"Sin SPF/DKIM publicados, el formulario de contacto rompe en producción al primer envío. Impacto directo en la vía principal de captación de leads.

## Criterios de aceptación
- [ ] Dominio verificado en Resend
- [ ] Registros SPF y DKIM activos
- [ ] Envío de prueba funcional desde /api/contact"

create_issue "#2 Páginas legales con contenido jurídico real" "legal,content,P0" "v1.0 — Production launch" \
"Aviso legal, privacidad y cookies no deben quedar como placeholders. Requiere redactado jurídico real alineado a RGPD/LOPDGDD.

## Criterios de aceptación
- [ ] Contenido validado por Solfico
- [ ] Textos publicados en /legal/*
- [ ] Coherencia con formulario y cookies"

create_issue "#3 Datos identificativos en aviso legal" "legal,content,P0" "v1.0 — Production launch" \
"Incluir CIF, denominación social, domicilio fiscal y registro mercantil de la sociedad constituida (LSSI-CE).

## Criterios de aceptación
- [ ] Datos societarios completos en aviso legal
- [ ] Revisión final por responsable legal"

create_issue "#4 Crear CONTRIBUTING.md, SECURITY.md, CODE_OF_CONDUCT.md" "docs,P0" "v1.0 — Production launch" \
"El README referencia estos documentos. Deben existir y estar completos para gobernanza del repositorio.

## Criterios de aceptación
- [ ] Archivos presentes en raíz
- [ ] Contenido mínimo y enlaces válidos desde README"

create_issue "#5 Variables de entorno configuradas en Vercel" "ops,P0" "v1.0 — Production launch" \
"Configurar y documentar: RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL, NEXT_PUBLIC_SITE_URL.

## Criterios de aceptación
- [ ] Variables cargadas en Vercel
- [ ] Documento interno actualizado (Notion/Wiki)
- [ ] Deploy validado con formulario funcional"

# ---------------- P1 ----------------
create_issue "#6 Migración a Next 15 + auditoría de dependencias" "security,dependencies,P1" "v1.1 — Hardening" \
"Cerrar CVEs de npm audit y revisar solapamiento motion/framer-motion.

## Criterios de aceptación
- [ ] Upgrade completado sin regresión
- [ ] npm audit reducido/limpio
- [ ] Dependencias redundantes evaluadas"

create_issue "#7 Rate-limit distribuido (Vercel KV o Upstash Redis)" "security,ops,P1" "v1.1 — Hardening" \
"El rate-limit actual in-memory no escala en serverless. Sustituir por store compartido.

## Criterios de aceptación
- [ ] Implementación distribuida
- [ ] Misma interfaz check() mantenida
- [ ] Prueba anti-spam básica"

create_issue "#8 Validación de env vars al arrancar (lib/env.ts con Zod)" "dx,reliability,P1" "v1.1 — Hardening" \
"Detectar configuración inválida en arranque/build, no en runtime.

## Criterios de aceptación
- [ ] lib/env.ts implementado con Zod
- [ ] Errores de env rompen build claramente
- [ ] Integrado en puntos de uso"

create_issue "#9 Workflow CI en GitHub Actions" "ci,P1" "v1.1 — Hardening" \
"Agregar pipeline con npm ci, lint y build en PR/push a main.

## Criterios de aceptación
- [ ] Workflow activo en .github/workflows/ci.yml
- [ ] Checks visibles en PR"

create_issue "#10 Schema.org Organization + LocalBusiness JSON-LD" "seo,P1" "v1.1 — Hardening" \
"Mejorar SEO local para búsquedas de consultoría IA en Cataluña/España.

## Criterios de aceptación
- [ ] JSON-LD válido en layout/head
- [ ] Campos organization/local business completos"

create_issue "#11 Vercel Analytics o Plausible" "analytics,P1" "v1.1 — Hardening" \
"Instrumentar analítica base para medir conversión de CTAs.

## Criterios de aceptación
- [ ] Herramienta activada
- [ ] Eventos/pageviews verificables
- [ ] Política de privacidad alineada"

create_issue "#12 Submit sitemap en Google Search Console + Bing Webmaster" "seo,P1" "v1.1 — Hardening" \
"Registrar sitemap y monitorizar indexación técnica.

## Criterios de aceptación
- [ ] Sitemap enviado en GSC y Bing
- [ ] Propiedad verificada
- [ ] Estado indexación monitorizable"

# ---------------- P2 ----------------
create_issue "#13 Páginas dedicadas por sector (/inmobiliarias, /clinicas, /servicios-profesionales)" "conversion,seo,P2" "v1.2 — Conversion" \
"Crear landings por segmento para mejorar conversión y long-tail SEO.

## Criterios de aceptación
- [ ] 3 rutas publicadas
- [ ] Copy específico por sector
- [ ] Enlaces internos desde home"

create_issue "#14 Casos de éxito reales (sección nueva)" "conversion,content,P2" "v1.2 — Conversion" \
"Incorporar prueba social concreta con métricas reales.

## Criterios de aceptación
- [ ] 2-3 casos con métricas verificables
- [ ] Sección visible en home/sector"

create_issue "#15 Email autoresponder al usuario que envía el formulario" "conversion,ops,P2" "v1.2 — Conversion" \
"Confirmación inmediata al lead para mejorar confianza y reducir duplicados.

## Criterios de aceptación
- [ ] Template de respuesta implementado
- [ ] Envío tras submit correcto
- [ ] Copy legal revisado"

create_issue "#16 Lead magnet por sector (descargable)" "conversion,content,P2" "v1.2 — Conversion" \
"Capturar emails de usuarios no listos para reunión comercial.

## Criterios de aceptación
- [ ] 1 activo descargable por sector
- [ ] Flujo de captura conectado a contacto/CRM"

create_issue "#17 OG image dinámica por sector" "seo,social,P2" "v1.2 — Conversion" \
"Personalizar social preview según ruta para mejorar CTR en compartidos.

## Criterios de aceptación
- [ ] OG por ruta de sector
- [ ] Validación en depuradores de redes"

create_issue "#18 Testimonios reales firmados (sustituir los actuales)" "conversion,content,P2" "v1.2 — Conversion" \
"Reemplazar testimonios genéricos por testimonios verificables.

## Criterios de aceptación
- [ ] Nombre, cargo y empresa reales
- [ ] Consentimiento de publicación"

# ---------------- P3 ----------------
create_issue "#19 Lighthouse CI con presupuestos" "performance,ci,P3" "v1.3 — Quality" \
"Automatizar control de rendimiento (INP/CLS/LCP) en PRs.

## Criterios de aceptación
- [ ] LHCI configurado
- [ ] Presupuestos definidos
- [ ] Fallo de PR ante regresiones"

create_issue "#20 Tests E2E del flujo de contacto (Playwright)" "testing,P3" "v1.3 — Quality" \
"Asegurar el flujo crítico de captación.

## Criterios de aceptación
- [ ] Test E2E de submit
- [ ] Mock de proveedor email
- [ ] Verificación de estado de éxito"

create_issue "#21 Sentry (o equivalente) para errores en producción" "monitoring,P3" "v1.3 — Quality" \
"Capturar errores reales del formulario y runtime.

## Criterios de aceptación
- [ ] SDK integrado
- [ ] Entornos configurados
- [ ] Alerta base activa"

create_issue "#22 CSP estricta + cabeceras de seguridad ampliadas" "security,P3" "v1.3 — Quality" \
"Endurecer superficie de ataque frontend.

## Criterios de aceptación
- [ ] CSP definida con allowlist mínima
- [ ] Cabeceras aplicadas y testadas
- [ ] Sin roturas funcionales"

create_issue "#23 Refactor app/page.tsx" "code-quality,P3" "v1.3 — Quality" \
"Reducir ruido de composición con una abstracción de sección reutilizable.

## Criterios de aceptación
- [ ] Home más modular
- [ ] Misma UI/comportamiento"

create_issue "#24 Eliminar components/_legacy/" "code-quality,P3" "v1.3 — Quality" \
"Eliminar deuda cognitiva del árbol de componentes.

## Criterios de aceptación
- [ ] Carpeta _legacy eliminada
- [ ] Verificación de imports y build"

create_issue "#25 Indicador animado de tab activo en Feature108 (layoutId)" "ux,polish,P3" "v1.3 — Quality" \
"Mejorar feedback visual entre tabs para sensación premium.

## Criterios de aceptación
- [ ] layoutId implementado
- [ ] Transición suave entre triggers"

create_issue "#26 Sustituir <img> por next/image" "performance,P3" "v1.3 — Quality" \
"Mejorar CLS y políticas de carga consistente.

## Criterios de aceptación
- [ ] Imágenes clave migradas a next/image
- [ ] Width/height definidos
- [ ] Sin regresión visual"

# ---------------- P4 ----------------
create_issue "#27 Storybook para components/ui/" "dx,P4" "Backlog" \
"Catálogo visual para escalar diseño y colaboración externa."

create_issue "#28 Modo oscuro" "ux,P4" "Backlog" \
"Habilitar tema dark aprovechando tokens semánticos existentes."

create_issue "#29 i18n catalán" "content,P4" "Backlog" \
"Versionado /ca para mercado local catalanoparlante."

create_issue "#30 Blog / recursos para SEO orgánico" "content,seo,P4" "Backlog" \
"Estrategia de contenido long-tail con calendario editorial sostenido."

echo ""
echo "✅ Milestones, labels e issues creados."
echo "Revisa con: gh issue list --limit 100"
