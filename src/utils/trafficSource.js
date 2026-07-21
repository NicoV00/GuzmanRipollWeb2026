// Captura de dónde viene la visita (UTM o referrer externo) al aterrizar en el sitio.
// Se guarda una sola vez por sesión en sessionStorage: como es una SPA, document.referrer
// y los UTM de la URL solo existen en la primera carga, no al navegar entre rutas internas.
const STORAGE_KEY = 'gr_traffic_source';

function computeTrafficSource() {
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get('utm_source');
  const utmMedium = params.get('utm_medium');
  const utmCampaign = params.get('utm_campaign');

  if (utmSource) {
    return [utmSource, utmMedium, utmCampaign].filter(Boolean).join(' / ');
  }

  const referrer = document.referrer;
  if (!referrer) return 'directo';

  try {
    const referrerHost = new URL(referrer).hostname.replace(/^www\./, '');
    if (referrerHost === window.location.hostname) return 'directo';

    if (referrerHost.includes('google.')) return 'google (organico)';
    if (referrerHost.includes('instagram.')) return 'instagram';
    if (referrerHost.includes('facebook.') || referrerHost.includes('fb.com')) return 'facebook';
    if (referrerHost.includes('linktr.ee')) return 'linktree';

    return referrerHost;
  } catch {
    return 'directo';
  }
}

export function captureTrafficSource() {
  if (typeof window === 'undefined') return;
  if (sessionStorage.getItem(STORAGE_KEY)) return;
  sessionStorage.setItem(STORAGE_KEY, computeTrafficSource());
}

export function getTrafficSource() {
  if (typeof window === 'undefined') return 'directo';
  return sessionStorage.getItem(STORAGE_KEY) || 'directo';
}
