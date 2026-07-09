import { useEffect, useRef } from 'react';

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

let scriptPromise = null;

function loadTurnstileScript() {
  if (window.turnstile) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}

// Renderizado explícito: soporta las dos instancias del form (desktop y mobile)
// montadas a la vez. Turnstile inyecta un input oculto "cf-turnstile-response"
// dentro del <form> contenedor, que se lee en el submit.
export function TurnstileWidget() {
  const containerRef = useRef(null);

  useEffect(() => {
    let widgetId = null;
    let cancelled = false;

    loadTurnstileScript().then(() => {
      if (cancelled || !containerRef.current) return;
      if (!SITE_KEY) {
        console.error('[TurnstileWidget] Falta VITE_TURNSTILE_SITE_KEY.');
        return;
      }
      widgetId = window.turnstile.render(containerRef.current, {
        sitekey: SITE_KEY,
        theme: 'light',
        size: 'flexible',
        language: 'es',
      });
    });

    return () => {
      cancelled = true;
      if (widgetId !== null && window.turnstile) {
        window.turnstile.remove(widgetId);
      }
    };
  }, []);

  return <div ref={containerRef} className="contact-turnstile" />;
}
