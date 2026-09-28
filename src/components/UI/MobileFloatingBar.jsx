import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

/* ──────────────────────────────────────────────────────────────────────────
   Liquid Glass · iOS 27 — Tier 1 (CSS puro, cross-browser)
   Tres señales ópticas: especular vertical (arriba/abajo), canto oscurecido
   horizontal (izq/der) y difusión del backdrop. Todo derivado de --lg-ref,
   que SIEMPRE es la dimensión MENOR del elemento.
   ────────────────────────────────────────────────────────────────────────── */
const SPRING = 'cubic-bezier(0.22, 1, 0.36, 1)';

function liquidGlass({
  ref,                 // px — dimensión menor real del elemento
  corner = ref / 2,    // px — radio (píldora = alto/2)
  blur = ref * 0.09,
  saturate = 1.8,
  brightness = 1.04,
  edgeA = 0.45,        // canto oscuro lateral
  specA = 1,           // especular arriba/abajo
  specW = ref * 0.032,
  glowTop = 0.55,
  glowBottom = 0.45,
  pool = 0.2,          // charco de luz inferior (cáustica)
  tint = 0.04,
  shadow = true,
  body,                // background alternativo (píldora de color)
} = {}) {
  const edgeW = `max(.5px, ${(ref * 0.014).toFixed(2)}px)`;
  const c = `calc(${corner}px - ${edgeW})`;
  const bd = `blur(${blur.toFixed(2)}px) saturate(${saturate}) brightness(${brightness})`;

  return {
    position: 'relative',
    isolation: 'isolate',
    boxSizing: 'border-box',
    border: 0,
    borderRadius: `${corner}px`,

    background:
      body ||
      `radial-gradient(90% 70% at 50% 78%, rgb(255 255 255 / ${pool}), rgb(255 255 255 / 0) 100%), rgb(255 255 255 / ${tint})`,

    backdropFilter: bd,
    WebkitBackdropFilter: bd,

    boxShadow: [
      ...(shadow
        ? [
            `0 ${(ref * 0.13).toFixed(1)}px ${(ref * 0.34).toFixed(1)}px rgb(0 0 0 / .13)`,
            `0 ${(ref * 0.03).toFixed(1)}px ${(ref * 0.12).toFixed(1)}px rgb(0 0 0 / .07)`,
          ]
        : []),
      `inset 0 ${(ref * 0.05).toFixed(2)}px ${(ref * 0.07).toFixed(2)}px ${(ref * -0.02).toFixed(2)}px rgb(255 255 255 / ${glowTop})`,
      `inset 0 ${(ref * -0.06).toFixed(2)}px ${(ref * 0.1).toFixed(2)}px ${(ref * -0.02).toFixed(2)}px rgb(255 255 255 / ${glowBottom})`,
    ].join(', '),

    // Aros border-only (mask-composite): pintamos y recortamos el interior.
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      borderRadius: 'inherit',
      pointerEvents: 'none',
      zIndex: 0,
      WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
      WebkitMaskComposite: 'xor',
      mask: 'linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)',
    },
    // Canto OSCURECIDO — máximo donde la normal es horizontal (los lados)
    '&::before': {
      inset: 0,
      padding: edgeW,
      background: `linear-gradient(90deg, rgb(0 0 0 / ${edgeA}) 0, rgb(0 0 0 / 0) ${corner}px, rgb(0 0 0 / 0) calc(100% - ${corner}px), rgb(0 0 0 / ${edgeA}) 100%)`,
    },
    // ESPECULAR — máximo donde la normal es vertical (arriba y abajo)
    '&::after': {
      inset: edgeW,
      padding: `${specW.toFixed(2)}px`,
      background: `linear-gradient(180deg,
        rgb(255 255 255 / ${specA}) 0,
        rgb(255 255 255 / ${specA}) calc(${c} * .10),
        rgb(255 255 255 / ${specA * 0.6}) calc(${c} * .35),
        rgb(255 255 255 / ${specA * 0.26}) calc(${c} * .50),
        rgb(255 255 255 / 0) calc(${c} * .70),
        rgb(255 255 255 / 0) calc(100% - ${c} * .70),
        rgb(255 255 255 / ${specA * 0.26}) calc(100% - ${c} * .50),
        rgb(255 255 255 / ${specA * 0.6}) calc(100% - ${c} * .35),
        rgb(255 255 255 / ${specA}) calc(100% - ${c} * .10),
        rgb(255 255 255 / ${specA}) 100%)`,
      // canto ultra sharp: apenas un sub-píxel de difusión
      filter: `blur(${Math.max(0.15, ref * 0.004).toFixed(2)}px)`,
    },

    // El contenido siempre por encima de los aros
    '& > *': { position: 'relative', zIndex: 1 },

    '@media (prefers-reduced-transparency: reduce)': {
      backdropFilter: 'none',
      WebkitBackdropFilter: 'none',
      background: 'rgb(245 245 247 / .96)',
    },
  };
}

const BAR_H = 60;
const PILL_H = 44;

export default function MobileFloatingBar() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Detectar en qué página estamos
  const isHome = location.pathname === '/' || location.pathname === '/inicio';
  const isContacto = location.pathname === '/contacto';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const footerElement = document.querySelector('footer');

      // En Home, solo mostrar en la sección de procedimientos
      if (isHome) {
        const procedimientosSection = document.getElementById('procedimientos-home-section');
        if (procedimientosSection) {
          const rect = procedimientosSection.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const visibilityThreshold = windowHeight * 0.1;

          setIsVisible(
            rect.top < windowHeight - visibilityThreshold && rect.bottom > visibilityThreshold
          );
          return;
        }
        setIsVisible(false);
        return;
      }

      // Para otras páginas (incluido Procedimientos)
      if (footerElement) {
        const footerRect = footerElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (footerRect.top < windowHeight) {
          setIsVisible(false);
        } else {
          setIsVisible(!(currentScrollY > lastScrollY && currentScrollY > 100));
        }
      } else {
        setIsVisible(currentScrollY > 100);
      }

      setLastScrollY(currentScrollY);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isHome, location.pathname]);

  // Don't show on contacto page (has its own floating bar)
  if (isContacto) return null;

  const pillBase = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: `${PILL_H}px`,
    textDecoration: 'none',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '13px',
    whiteSpace: 'nowrap',
    // Morph de presión: escala + hundido del glow, sin reflow
    transition: `transform .28s ${SPRING}, box-shadow .28s ${SPRING}, filter .28s ${SPRING}`,
    willChange: 'transform',
    '&:active': { transform: 'scale(.955)', filter: 'brightness(.97)' },
    '&:focus-visible': { outline: '2px solid #0a84ff', outlineOffset: '3px' },
  };

  return (
    <Box
      sx={{
        ...liquidGlass({
          ref: BAR_H,
          corner: BAR_H / 2,
          blur: 18,
          saturate: 1.85,
          brightness: 1.045,
          edgeA: 0.5,
          specA: 1,
          specW: BAR_H * 0.034,
          pool: 0.22,
        }),

        position: 'fixed',
        bottom: '34px',
        left: '50%',
        display: { xs: 'flex', md: 'none' },
        zIndex: 1000,
        width: 'auto',
        minWidth: '340px',
        maxWidth: '96%',
        height: `${BAR_H}px`,
        px: '8px',
        gap: '10px',
        alignItems: 'center',
        justifyContent: 'center',

        // ── Morph de entrada/salida: translate + scale + fade, un solo spring.
        // Animamos transform/opacity (compositor), nunca `bottom`.
        transform: isVisible
          ? 'translate3d(-50%, 0, 0) scale(1)'
          : 'translate3d(-50%, 140%, 0) scale(.86)',
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        transformOrigin: '50% 120%',
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
        transition: `transform .62s ${SPRING}, opacity .34s ease`,

        // Stagger de los hijos al aparecer (morph escalonado)
        '& > *': {
          position: 'relative',
          zIndex: 1,
          transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(10px) scale(.92)',
          opacity: isVisible ? 1 : 0,
          transition: `transform .55s ${SPRING}, opacity .3s ease`,
        },
        '& > *:nth-of-type(1)': { transitionDelay: isVisible ? '.06s' : '0s' },
        '& > *:nth-of-type(2)': { transitionDelay: isVisible ? '.12s' : '0s' },

        '@media (prefers-contrast: more)': {
          '&::before': { background: 'linear-gradient(90deg, rgb(0 0 0 / .7) 0, rgb(0 0 0 / 0) 30px, rgb(0 0 0 / 0) calc(100% - 30px), rgb(0 0 0 / .7) 100%)' },
        },
        '@media (prefers-reduced-motion: reduce)': {
          transition: 'opacity .2s linear',
          transform: 'translate3d(-50%, 0, 0)',
          '& > *': { transform: 'none', transition: 'opacity .2s linear' },
        },
      }}
    >
      <Box
        component={RouterLink}
        to="/contacto"
        sx={{
          ...liquidGlass({
            ref: PILL_H,
            corner: PILL_H / 2,
            blur: 10,
            saturate: 1.6,
            brightness: 1,
            edgeA: 0.4,
            specA: 0.85,
            glowTop: 0.4,
            glowBottom: 0.22,
            shadow: false,
            body: 'linear-gradient(180deg, rgba(44,104,232,.94), rgba(18,58,158,.94))',
          }),
          ...pillBase,
          gap: '8px',
          px: '22px',
          color: '#fff',
          fontWeight: 600,
          boxShadow:
            'inset 0 1.5px 1px -.5px rgba(255,255,255,.55), inset 0 -1.5px 2px -1px rgba(0,0,0,.3), 0 6px 16px rgba(20,60,160,.34)',
        }}
      >
        Agendar consulta
        <ArrowForwardIcon sx={{ fontSize: 16 }} />
      </Box>

      <Box
        component={RouterLink}
        to="/procedimientos"
        sx={{
          ...liquidGlass({
            ref: PILL_H,
            corner: PILL_H / 2,
            blur: 12,
            saturate: 1.7,
            brightness: 1.03,
            edgeA: 0.34,
            specA: 1,
            glowTop: 0.6,
            glowBottom: 0.42,
            pool: 0.26,
            tint: 0.16,
            shadow: false,
          }),
          ...pillBase,
          px: '18px',
          color: '#111',
          fontWeight: 500,
        }}
      >
        Ver más
      </Box>
    </Box>
  );
}
