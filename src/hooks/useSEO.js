import { useEffect } from 'react';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../seo/seo.js';
import { trackPageView } from '../lib/ga4.js';

const DEFAULT_TITLE = 'Cirujano Plástico en Punta del Este, Uruguay | Dr. Guzmán Ripoll';

/**
 * Mantiene el <head> sincronizado al navegar dentro de la SPA.
 * El HTML inicial de cada ruta ya sale con estos mismos valores desde scripts/prerender.mjs;
 * ambos leen de src/seo/seo.js, así que no se desincronizan.
 *
 * @param {Object} seo
 * @param {string} seo.title - Título completo (ya incluye "| Dr. Guzmán Ripoll").
 * @param {string} seo.description
 * @param {string} [seo.path] - Ruta canónica (ej. "/procedimientos/abdominoplastia").
 * @param {string} [seo.ogType]
 * @param {string} [seo.ogImage]
 * @param {string} [seo.robots] - Ej. "noindex, follow". Si falta, se quita el meta.
 * @param {Object} [seo.structuredData] - JSON-LD.
 */
export default function useSEO({
  title,
  description,
  path,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  robots,
  structuredData,
} = {}) {
  useEffect(() => {
    const pageTitle = title || DEFAULT_TITLE;
    document.title = pageTitle;

    const updateMeta = (key, value, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.head.querySelector(`meta[${attr}="${key}"]`);
      if (value === undefined || value === null) {
        if (el) el.remove();
        return;
      }
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    if (description) {
      updateMeta('description', description);
      updateMeta('og:description', description, true);
      updateMeta('twitter:description', description);
    }
    updateMeta('og:title', pageTitle, true);
    updateMeta('twitter:title', pageTitle);
    updateMeta('og:type', ogType, true);
    updateMeta('robots', robots);

    const canonicalPath = path ?? window.location.pathname;
    const canonicalUrl = `${SITE_URL}${canonicalPath === '/' ? '/' : canonicalPath.replace(/\/$/, '')}`;
    updateMeta('og:url', canonicalUrl, true);
    let canonicalLink = document.head.querySelector('link[rel="canonical"]');
    if (robots && robots.includes('noindex')) {
      if (canonicalLink) canonicalLink.remove();
    } else {
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonicalUrl);
    }

    const absoluteOgImage = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`;
    updateMeta('og:image', absoluteOgImage, true);
    updateMeta('twitter:image', absoluteOgImage);

    let scriptEl = document.getElementById('structured-data-seo');
    if (structuredData) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = 'structured-data-seo';
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(structuredData);
    } else if (scriptEl) {
      scriptEl.remove();
    }

    // GA4: page_view con el título ya actualizado (deduplicado por ruta).
    trackPageView();
  }, [title, description, path, ogType, ogImage, robots, structuredData]);
}
