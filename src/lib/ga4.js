// Google Analytics 4. Se activa solo si existe VITE_GA_MEASUREMENT_ID (ej. "G-XXXXXXXXXX");
// sin esa variable todas las funciones son no-op, así que dev y previews no ensucian los datos.
//
// - gtag.js se carga después del load + idle para no competir con el hero (LCP).
// - Es una SPA: el page_view automático está apagado y lo dispara useSEO al cambiar de ruta,
//   cuando el <title> ya es el de la página nueva.
// - Clicks en WhatsApp / teléfono / email y el envío del formulario se registran como eventos
//   para marcarlos como "eventos clave" (conversiones) en GA4.
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const enabled = typeof window !== 'undefined' && Boolean(GA_ID);

let lastTrackedPath = null;

function gtag() {
  window.dataLayer.push(arguments);
}

export function initAnalytics() {
  if (!enabled || window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID, { send_page_view: false });

  const load = () => {
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(s);
  };
  const whenIdle = () => (window.requestIdleCallback ? requestIdleCallback(load, { timeout: 3000 }) : setTimeout(load, 1500));
  if (document.readyState === 'complete') whenIdle();
  else window.addEventListener('load', whenIdle, { once: true });

  document.addEventListener('click', onLinkClick, { capture: true });
}

export function trackPageView() {
  if (!enabled || !window.gtag) return;
  const path = window.location.pathname;
  if (path === lastTrackedPath) return; // useSEO puede re-ejecutarse en la misma ruta (ej. datos de Sanity)
  lastTrackedPath = path;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackEvent(name, params = {}) {
  if (!enabled || !window.gtag) return;
  window.gtag('event', name, params);
}

function onLinkClick(e) {
  const a = e.target.closest?.('a[href]');
  if (!a) return;
  const href = a.getAttribute('href');
  const params = { page_path: window.location.pathname, link_text: a.textContent.trim().slice(0, 80) };
  if (href.includes('wa.me/') || href.includes('api.whatsapp.com')) trackEvent('click_whatsapp', params);
  else if (href.startsWith('tel:')) trackEvent('click_telefono', params);
  else if (href.startsWith('mailto:')) trackEvent('click_email', params);
}
