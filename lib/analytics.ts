/**
 * Utilidades de medición vía Google Tag Manager (dataLayer).
 * GA4 y conversiones se configuran dentro del contenedor GTM.
 */

export type GenerateLeadLocation = 'contacto_footer' | 'contacto_hero';

export type DataLayerEvent = Record<string, unknown>;

type GtagFn = (
  command: 'consent',
  action: 'update' | 'default',
  params: Record<string, 'granted' | 'denied' | number>,
) => void;

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
    gtag?: GtagFn;
  }
}

function pushToDataLayer(payload: DataLayerEvent): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
}

/**
 * Conversión principal: disparar solo tras submit OK del formulario.
 */
export function pushGenerateLead(formLocation: GenerateLeadLocation): void {
  pushToDataLayer({
    event: 'generate_lead',
    lead_type: 'diagnostico_ia',
    form_location: formLocation,
  });
}

export type ConsentChoice = 'all' | 'essential';

const CONSENT_STORAGE_KEY = 'nexus-consent-v1';

export function getStoredConsent(): ConsentChoice | null {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  return raw === 'all' || raw === 'essential' ? raw : null;
}

export function storeConsent(choice: ConsentChoice): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
}

/**
 * Actualiza Google Consent Mode v2 vía gtag → dataLayer (consumido por GTM).
 */
export function applyConsentMode(choice: ConsentChoice): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];

  if (!window.gtag) {
    window.gtag = (...args: Parameters<GtagFn>) => {
      window.dataLayer?.push(args as unknown as DataLayerEvent);
    };
  }

  const granted = choice === 'all' ? 'granted' : 'denied';

  window.gtag('consent', 'update', {
    analytics_storage: granted,
    ad_storage: granted,
    ad_user_data: granted,
    ad_personalization: granted,
  });
}
