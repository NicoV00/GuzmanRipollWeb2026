import React, { useEffect, useId, useState } from 'react';
import { Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { MessageCircle, Sparkles, X } from 'lucide-react';
import { DialRoot, useDialKit } from 'dialkit';
import 'dialkit/styles.css';
import { GlassFilter, makeHaloMap, makeLensMap } from './glassMaps.jsx';
import './ContactFloatingBar.css';

const navItems = [
  { label: 'Clinica', to: '/clinica' },
  { label: 'Procedimientos', to: '/procedimientos' },
  { label: 'Resultados', to: '/resultados' },
];

/* Tamaños de referencia para los mapas. El filtro los estira al tamaño real
   (preserveAspectRatio none), así que no hace falta que coincidan al pixel. */
const SIZES = {
  closed: { w: 350, h: 64, r: 32 },
  open: { w: 362, h: 266, r: 32 },
};

/* Valores por defecto = los que se ven bien hoy. DialKit los expone como panel:
   [valor, mín, máx, paso]. Con persist:true tus ajustes sobreviven al recargar. */
const buildDial = (collapsed) => ({
  luz: {
    angulo: [135, 0, 360, 1],
    intensidad: [1.25, 0, 1.5, 0.01],
    grosor: [0.8, 0.4, 3, 0.05],
    grosorGris: [0.5, 0.25, 2, 0.05],
    alcance: [1.45, 0.4, 1.6, 0.05],
    rebote: [1.3, 0, 1.5, 0.01],
    bordeOscuro: [0.3, 0, 0.7, 0.01],
    brilloInterior: [0.28, 0, 0.8, 0.01],
  },
  vidrio: {
    _collapsed: collapsed,
    velo: [0.46, 0, 1, 0.01],
    blur: [8, 0, 30, 0.5],
    saturacion: [165, 100, 300, 5],
    brillo: [1.08, 0.8, 1.4, 0.01],
    relleno: [0.22, 0, 0.9, 0.01],
    volumen: [0.6, 0, 1.6, 0.01],
    tinta: '#0e1624',
  },
  refraccion: {
    _collapsed: collapsed,
    lente: [50, 0, 100, 1],
    biselLente: [32, 6, 48, 1],
    aberracion: [0.05, 0, 0.4, 0.01],
    halo: [12, 0, 40, 0.5],
    anchoHalo: [16, 0, 28, 1],
  },
});
const DIAL_COLLAPSED = buildDial(true);
const DIAL_OPEN = buildDial(false);

/* Valores por defecto del panel (los arrays [valor, mín, máx, paso] -> valor) */
const dialDefaults = (cfg) =>
  Object.fromEntries(
    Object.entries(cfg).map(([section, controls]) => [
      section,
      Object.fromEntries(
        Object.entries(controls)
          .filter(([key]) => key !== '_collapsed')
          .map(([key, v]) => [key, Array.isArray(v) ? v[0] : v]),
      ),
    ]),
  );
const DIAL_DEFAULTS = dialDefaults(DIAL_OPEN);

/* embedded: dentro de /glass-lab (siempre visible, sin lógica de scroll).
   preset: valores fijos por sección que sustituyen al panel (para comparar variantes). */
export default function ContactFloatingBar({ embedded = false, preset = null }) {
  const location = useLocation();
  const uid = useId().replace(/:/g, '');
  const [isVisible, setIsVisible] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [maps, setMaps] = useState(null);
  /* backdrop-filter:url(#svg) solo existe en Chromium. Si no hay soporte, la regla
     entera sería inválida y se perdería también el blur: por eso se detecta. */
  const [canRefract, setCanRefract] = useState(false);
  useEffect(() => {
    setCanRefract(
      typeof CSS !== 'undefined' &&
        (CSS.supports('backdrop-filter', 'url(#a) blur(2px)') || CSS.supports('-webkit-backdrop-filter', 'url(#a) blur(2px)')) &&
        /Chrome|Chromium|Edg|Brave/.test(navigator.userAgent) &&
        !/iPhone|iPad|iPod/.test(navigator.userAgent),
    );
  }, []);
  const dial = useDialKit('Glass bar', embedded ? DIAL_OPEN : DIAL_COLLAPSED, {
    id: 'glass-bar-v6',
    persist: true,
    defaultCollapsed: !embedded,
  });
  const merged = preset
    ? Object.fromEntries(Object.keys(DIAL_DEFAULTS).map((k) => [k, { ...DIAL_DEFAULTS[k], ...(preset[k] || {}) }]))
    : dial;
  const { luz, vidrio, refraccion } = merged;

  const isContacto = location.pathname === '/contacto';
  const primaryLabel = isContacto ? 'Ver procedimientos' : 'Agendar consulta';
  const primaryLink = isContacto ? '/procedimientos' : '/contacto';

  useEffect(() => {
    if (embedded) {
      setIsVisible(true);
      return undefined;
    }
    const handleScroll = () => {
      const footerElement = document.querySelector('footer');
      const isPastThreshold = isContacto || window.scrollY > 100;

      if (!footerElement) {
        setIsVisible(isPastThreshold);
        return;
      }

      const footerRect = footerElement.getBoundingClientRect();
      setIsVisible(isPastThreshold && footerRect.top >= window.innerHeight);
    };

    const timer = setTimeout(handleScroll, 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isContacto, embedded]);

  useEffect(() => {
    setIsPanelOpen(false);
  }, [location.pathname]);

  /* Mapas una sola vez por estado (cerrado/abierto): nada se recalcula durante
     el morph, así abrir/cerrar repetidamente no genera trabajo ni parpadeos.
     Solo se regeneran si cambias bisel/ancho del halo en el panel (con debounce). */
  const { biselLente, anchoHalo } = refraccion;
  useEffect(() => {
    const timer = setTimeout(() => {
      const next = {};
      ['closed', 'open'].forEach((state) => {
        next[state] = {
          lens: makeLensMap(SIZES[state], { bezel: biselLente, n: 1.5 }),
          halo: makeHaloMap(SIZES[state], anchoHalo),
        };
      });
      setMaps(next);
    }, 120);
    return () => clearTimeout(timer);
  }, [biselLente, anchoHalo]);

  /* El ángulo de la luz mueve el degradado del especular y el desfase de las
     sombras interiores (dirección del gradiente = (sin a, -cos a)). */
  const rad = (luz.angulo * Math.PI) / 180;
  const lightVars = {
    '--la': `${luz.angulo}deg`,
    '--lx': `${(Math.sin(rad) * 2.1).toFixed(2)}px`,
    '--ly': `${(-Math.cos(rad) * 2.1).toFixed(2)}px`,
    '--spec-a': luz.intensidad,
    '--spec-w': `${luz.grosor}px`,
    '--grey-w': `${luz.grosorGris}px`,
    '--reach': luz.alcance,
    '--bounce': luz.rebote,
    '--edge-a': luz.bordeOscuro,
    '--glow-a': luz.brilloInterior,
    '--tint': vidrio.velo,
    '--blur': `${vidrio.blur}px`,
    '--sat': `${vidrio.saturacion}%`,
    '--bri': vidrio.brillo,
    '--puff': vidrio.volumen,
    '--pill-1': `rgba(255, 255, 255, ${vidrio.relleno})`,
    '--pill-2': `rgba(255, 255, 255, ${(vidrio.relleno * 0.55).toFixed(3)})`,
    '--glass-ink': vidrio.tinta,
    '--halo': `${anchoHalo}px`,
  };

  const state = isPanelOpen ? 'open' : 'closed';
  const refractOn = Boolean(maps) && canRefract;
  const glassStyle = {
    ...lightVars,
    ...(refractOn ? { '--glass-f': `url(#cfb-lens-${uid}-${state})`, '--halo-f': `url(#cfb-halo-${uid}-${state})` } : null),
  };

  return (
    <>
      {refractOn && (
        <svg className="mobile-glass-filter" aria-hidden="true" focusable="false">
          <defs>
            {['closed', 'open'].map((s) => (
              <React.Fragment key={s}>
                <GlassFilter id={`cfb-lens-${uid}-${s}`} href={maps[s].lens} scale={refraccion.lente} ca={refraccion.aberracion} />
                <GlassFilter id={`cfb-halo-${uid}-${s}`} href={maps[s].halo} scale={refraccion.halo} ca={0} />
              </React.Fragment>
            ))}
          </defs>
        </svg>
      )}

      <div
        className="mobile-glass-halo"
        aria-hidden="true"
        data-open={isPanelOpen ? 'true' : 'false'}
        data-visible={isVisible ? 'true' : 'false'}
        data-embedded={embedded ? 'true' : undefined}
        data-refract={refractOn ? 'true' : 'false'}
        style={glassStyle}
      />

      <Box
        component="nav"
        aria-label="Navegacion rapida"
        data-open={isPanelOpen ? 'true' : 'false'}
        data-visible={isVisible ? 'true' : 'false'}
        className="mobile-glass-nav"
        data-embedded={embedded ? 'true' : undefined}
        data-refract={refractOn ? 'true' : 'false'}
        style={glassStyle}
      >
        <div className="mobile-glass-rim" aria-hidden="true" />

        <div className="mobile-glass-compact" aria-hidden={isPanelOpen}>
          <RouterLink className="mobile-glass-pill mobile-glass-primary" to={primaryLink} tabIndex={isPanelOpen ? -1 : 0}>
            {primaryLabel}
          </RouterLink>

          <a
            className="mobile-glass-pill mobile-glass-icon"
            href="https://wa.me/59892566656"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escribir por WhatsApp"
            tabIndex={isPanelOpen ? -1 : 0}
          >
            <MessageCircle size={22} strokeWidth={2} />
          </a>

          <button
            className="mobile-glass-pill mobile-glass-icon"
            type="button"
            aria-label="Abrir menu rapido"
            aria-expanded={isPanelOpen}
            onClick={() => setIsPanelOpen(true)}
            tabIndex={isPanelOpen ? -1 : 0}
          >
            <Sparkles size={21} strokeWidth={2} />
          </button>
        </div>

        <div className="mobile-glass-expanded" aria-hidden={!isPanelOpen}>
          <div className="mobile-glass-list">
            <RouterLink className="mobile-glass-row mobile-glass-row-main" style={{ '--i': 0 }} to={primaryLink} tabIndex={isPanelOpen ? 0 : -1}>
              {primaryLabel}
            </RouterLink>
            {navItems.map((item, index) => (
              <RouterLink
                key={item.to}
                className="mobile-glass-row"
                style={{ '--i': index + 1 }}
                to={item.to}
                tabIndex={isPanelOpen ? 0 : -1}
              >
                {item.label}
              </RouterLink>
            ))}
          </div>

          <div className="mobile-glass-actions">
            <a
              className="mobile-glass-pill mobile-glass-wa"
              href="https://wa.me/59892566656"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isPanelOpen ? 0 : -1}
            >
              WhatsApp
            </a>
            <button
              className="mobile-glass-pill mobile-glass-icon"
              type="button"
              onClick={() => setIsPanelOpen(false)}
              aria-label="Cerrar"
              tabIndex={isPanelOpen ? 0 : -1}
            >
              <X size={20} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </Box>

      {/* Panel de ajuste en vivo; en producción solo con ?dial en la URL */}
      {!preset && <DialRoot productionEnabled={import.meta.env.DEV || (typeof window !== 'undefined' && window.location.search.includes('dial'))} />}
    </>
  );
}
