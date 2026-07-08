import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function MobileFloatingBar() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Detectar en qué página estamos
  const isHome = location.pathname === '/' || location.pathname === '/inicio';
  const isProcedimientos = location.pathname.startsWith('/procedimientos') || location.pathname.startsWith('/procedimiento');
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

          // Mostrar solo cuando la sección de procedimientos está visible
          // Consideramos que está visible cuando al menos el 10% de la sección está en pantalla
          // Y nos aseguramos de no mostrarlo si estamos muy arriba (en el Hero)
          const visibilityThreshold = windowHeight * 0.1;

          if (rect.top < windowHeight - visibilityThreshold && rect.bottom > visibilityThreshold) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
          return; // Salir temprano para Home
        } else {
          // Si no encuentra la sección, no mostrar en Home
          setIsVisible(false);
          return;
        }
      }

      // Para otras páginas (incluido Procedimientos)
      if (footerElement) {
        const footerRect = footerElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Ocultar cuando el footer es visible
        if (footerRect.top < windowHeight) {
          setIsVisible(false);
        } else {
          // Mostrar/ocultar basado en dirección del scroll
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down - ocultar
            setIsVisible(false);
          } else {
            // Scrolling up - mostrar
            setIsVisible(true);
          }
        }
      } else {
        // Para páginas sin footer (landing de procedimientos, etc)
        if (currentScrollY > 100) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }

      setLastScrollY(currentScrollY);
    };

    // Activar listeners
    const checkVisibility = () => {
      handleScroll(); // Chequeo inicial
      window.addEventListener('scroll', handleScroll);
    };

    checkVisibility();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, isHome, location.pathname]);

  // Don't show on contacto page (has its own floating bar)
  if (isContacto) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: isVisible ? '34px' : '-100px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: { xs: 'flex', md: 'none' },
        zIndex: 1000,
        transition: 'bottom 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
        width: 'auto',
        minWidth: '340px',
        maxWidth: '96%',
        px: '8px',
        py: '8px',
        borderRadius: '100px',
        overflow: 'hidden',
        isolation: 'isolate',
        // ── Liquid glass claro (estilo Outpace) ──────────────
        // Sin base oscura: el vidrio toma el fondo real vía blur + saturación.
        background: 'linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 100%)',
        backdropFilter: 'blur(28px) saturate(190%)',
        WebkitBackdropFilter: 'blur(28px) saturate(190%)',
        border: '1px solid rgba(255, 255, 255, 0.45)',
        // Elevación externa + highlights internos (rim de luz arriba)
        boxShadow: [
          '0 20px 44px rgba(0, 0, 0, 0.18)',
          '0 2px 8px rgba(0, 0, 0, 0.10)',
          'inset 0 1px 0 rgba(255, 255, 255, 0.6)',
          'inset 0 -1px 1px rgba(255, 255, 255, 0.14)',
        ].join(', '),
        gap: '10px',
        alignItems: 'center',
        justifyContent: 'center',
        // Reflejo especular en la mitad superior (la "luz" del vidrio)
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '52%',
          borderRadius: '100px 100px 50% 50% / 100px 100px 34px 34px',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.05) 55%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 0,
        },
        // Sheen de refracción suave desde la esquina superior izquierda
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          background: 'radial-gradient(130% 90% at 0% 0%, rgba(255,255,255,0.12), transparent 52%)',
          pointerEvents: 'none',
          zIndex: 0,
        },
        // El contenido (botones) por encima de los reflejos
        '& > *': { position: 'relative', zIndex: 1 },
      }}
    >
      <Box
        component={RouterLink}
        to="/contacto"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          px: '22px',
          py: '12px',
          borderRadius: '100px',
          background: 'linear-gradient(180deg, rgba(38, 96, 224, 0.92), rgba(18, 58, 158, 0.92))',
          backdropFilter: 'blur(10px) saturate(160%)',
          WebkitBackdropFilter: 'blur(10px) saturate(160%)',
          color: '#fff',
          textDecoration: 'none',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '13px',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          transition: `all 0.25s ${'cubic-bezier(0.22, 1, 0.36, 1)'}`,
          border: '1px solid rgba(255, 255, 255, 0.28)',
          boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,0.45), inset 0 -1px 0 rgba(0,0,0,0.22), 0 6px 16px rgba(20,60,160,0.38)',
          '&:active': { transform: 'scale(0.97)' },
        }}
      >
        Agendar consulta
        <ArrowForwardIcon sx={{ fontSize: 16 }} />
      </Box>

      <Box
        component={RouterLink}
        to="/procedimientos"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: '18px',
          py: '12px',
          borderRadius: '100px',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.07))',
          backdropFilter: 'blur(14px) saturate(160%)',
          WebkitBackdropFilter: 'blur(14px) saturate(160%)',
          color: '#fff',
          textDecoration: 'none',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '13px',
          fontWeight: 500,
          whiteSpace: 'nowrap',
          transition: `all 0.25s ${'cubic-bezier(0.22, 1, 0.36, 1)'}`,
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.30), inset 0 -1px 0 rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.18)',
          '&:active': { transform: 'scale(0.97)' },
        }}
      >
        Ver más
      </Box>
    </Box>
  );
}