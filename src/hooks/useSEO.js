import { useEffect } from 'react';

const BASE_URL = 'https://www.guzmanripoll.com';

/**
 * Hook to dynamically manage SEO metadata, canonical links, and structured data in React Router SPA.
 * 
 * @param {Object} seoParams
 * @param {string} seoParams.title - The title of the page (without suffix).
 * @param {string} seoParams.description - The description meta tag value.
 * @param {string} [seoParams.canonicalUrl] - Optional explicit canonical URL.
 * @param {string} [seoParams.ogType] - Open Graph type (defaults to 'website').
 * @param {string} [seoParams.ogImage] - Path to Open Graph image.
 * @param {Object} [seoParams.structuredData] - Optional JSON-LD structured data object.
 */
export default function useSEO({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage = '/images/GR_9_Isologo.png',
  structuredData
}) {
  useEffect(() => {
    // 1. Update Title
    if (title) {
      document.title = `${title} | Dr. Guzman Ripoll`;
    } else {
      document.title = 'Dr. Guzman Ripoll | Cirugía Plástica y Estética';
    }

    // Helper to add or update meta tags
    const updateMeta = (nameOrProperty, value, isProperty = false) => {
      if (value === undefined || value === null) return;
      const selector = isProperty 
        ? `meta[property="${nameOrProperty}"]` 
        : `meta[name="${nameOrProperty}"]`;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (isProperty) {
          el.setAttribute('property', nameOrProperty);
        } else {
          el.setAttribute('name', nameOrProperty);
        }
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    const pageTitle = title ? `${title} | Dr. Guzman Ripoll` : 'Dr. Guzman Ripoll | Cirugía Plástica y Estética';

    // 2. Update Core & OG Description
    updateMeta('description', description);
    updateMeta('og:description', description, true);
    updateMeta('twitter:description', description);

    // 3. Update OG Title
    updateMeta('og:title', pageTitle, true);
    updateMeta('twitter:title', pageTitle);

    // 4. Update Type
    updateMeta('og:type', ogType, true);

    // 5. Update Canonical URL
    const currentPath = window.location.pathname;
    // Canonical URL overrides or resolves /inicio -> /
    const resolvedPath = (currentPath === '/' || currentPath === '/inicio') ? '' : currentPath;
    const finalCanonicalUrl = canonicalUrl || `${BASE_URL}${resolvedPath}`;
    updateMeta('og:url', finalCanonicalUrl, true);

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', finalCanonicalUrl);

    // 6. Update OG Image
    const absoluteOgImage = ogImage.startsWith('http') 
      ? ogImage 
      : `${BASE_URL}${ogImage}`;
    updateMeta('og:image', absoluteOgImage, true);
    updateMeta('twitter:image', absoluteOgImage);
    updateMeta('twitter:card', 'summary_large_image');

    // 7. Update Structured Data (JSON-LD)
    let scriptEl = document.getElementById('structured-data-seo');
    if (structuredData) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = 'structured-data-seo';
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(structuredData);
    } else {
      if (scriptEl) {
        scriptEl.remove();
      }
    }

    // Cleanup when component unmounts
    return () => {
      const cleanScript = document.getElementById('structured-data-seo');
      if (cleanScript) {
        cleanScript.remove();
      }
    };
  }, [title, description, canonicalUrl, ogType, ogImage, structuredData]);
}
