import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Sparkles, X, MessageCircle } from 'lucide-react';
import BeamCTAButton from './BeamCTAButton';

export default function ContactFloatingBar() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const isContacto = location.pathname === '/contacto';

  useEffect(() => {
    if (isContacto) {
      const timer = setTimeout(() => setIsVisible(true), 100);

      const handleFooterAwareScroll = () => {
        const footerElement = document.querySelector('footer');
        if (!footerElement) {
          setIsVisible(true);
          return;
        }

        const footerRect = footerElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        setIsVisible(footerRect.top >= windowHeight);
      };

      window.addEventListener('scroll', handleFooterAwareScroll, { passive: true });
      handleFooterAwareScroll();

      return () => {
        clearTimeout(timer);
        window.removeEventListener('scroll', handleFooterAwareScroll);
      };
    }

    const handleScroll = () => {
      const footerElement = document.querySelector('footer');
      const isPastThreshold = window.scrollY > 100;

      if (!footerElement) {
        setIsVisible(isPastThreshold);
        return;
      }

      const footerRect = footerElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      setIsVisible(isPastThreshold && footerRect.top >= windowHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isContacto]);

  useEffect(() => {
    setIsPanelOpen(false);
  }, [location.pathname]);

  const buttonText = isContacto ? 'Ver todos' : 'Agendar consulta';
  const buttonLink = isContacto ? '/procedimientos' : '/contacto';
  
  // ESTILOS BASE PARA LOS BOTONES CIRCULARES (ORBES) - Efecto Glass Elevado
  const iconOrbStyles = {
    position: 'relative',
    flex: '0 0 44px',
    width: '44px',
    minWidth: '44px',
    maxWidth: '44px',
    height: '44px',
    minHeight: '44px',
    maxHeight: '44px',
    aspectRatio: '1 / 1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.08)', 
    border: '1px solid rgba(255, 255, 255, 0.05)',
    boxShadow: `
      0 4px 12px rgba(0, 0, 0, 0.15),
      inset 0 1px 1px rgba(255, 255, 255, 0.15),
      inset 0 -1px 2px rgba(0, 0, 0, 0.1)
    `,
    overflow: 'hidden',
    transition: 'all 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
    '&:active': { transform: 'scale(0.92)' },
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.12)',
    }
  };

  return (
    <>
      {/* PANEL DESPLEGABLE SUPERIOR - Actualizado para matchear el Glass Effect */}
      <Box
        sx={{
          position: 'fixed',
          bottom: isPanelOpen ? '110px' : '-400px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'column',
          zIndex: 999,
          width: 'calc(100% - 40px)',
          maxWidth: '400px',
          borderRadius: '20px',
          background: 'rgba(30, 30, 30, 0.45)', // Transparente y neutro
          backdropFilter: 'blur(40px) saturate(200%)',
          WebkitBackdropFilter: 'blur(40px) saturate(200%)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: `
            0 -8px 40px rgba(0, 0, 0, 0.4), 
            inset 0 1.5px 1px rgba(255, 255, 255, 0.15)
          `,
          transition: 'bottom 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', px: '20px', pt: '18px', pb: '12px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={16} color="rgba(255,255,255,0.6)" />
            <Typography
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '13px',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.9)',
                letterSpacing: '0.02em',
              }}
            >
              Proceso Personalizado
            </Typography>
          </Box>
        </Box>

        <Box sx={{ height: '1px', mx: '20px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />

        <Box sx={{ px: '24px', py: '18px', textAlign: 'left' }}>
          <Typography
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '13px',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.7)',
              fontWeight: 400,
              letterSpacing: '0.01em',
            }}
          >
            Evaluamos cada caso de forma individual para diseñar un plan quirúrgico a medida, adaptado a tu anatomía y expectativas reales. Nuestro compromiso es brindarte un seguimiento profesional continuo en cada etapa, asegurando resultados naturales y una recuperación óptima.
          </Typography>
        </Box>
      </Box>

      {/* CONTENEDOR PRINCIPAL DE LA BARRA (GLASS EFFECT PURO) */}
      <Box
        sx={{
          position: 'fixed',
          bottom: isVisible ? { xs: 'calc(20px + env(safe-area-inset-bottom))', md: '34px' } : '-100px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: { xs: 'flex', md: 'none' },
          zIndex: 1000,
          transition: 'all 0.6s cubic-bezier(0.32, 0.72, 0, 1)',
          width: isPanelOpen ? '60px' : 'auto',
          height: '56px',
          minWidth: isPanelOpen ? '60px' : '324px',
          px: isPanelOpen ? 0 : '6px',
          py: '6px',
          borderRadius: '999px',
          background: 'rgba(30, 30, 30, 0.35)', 
          backdropFilter: 'blur(40px) saturate(200%)',
          WebkitBackdropFilter: 'blur(40px) saturate(200%)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: `
            0 24px 48px rgba(0, 0, 0, 0.4), 
            inset 0 1.5px 1px rgba(255, 255, 255, 0.15), 
            inset 0 -1px 1px rgba(0, 0, 0, 0.3)
          `,
          gap: '7px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {!isPanelOpen && (
          <BeamCTAButton
            to={buttonLink}
            fullWidth
            tone="dark"
            sx={{
              flex: 1,
              minHeight: '44px',
              px: '22px',
              py: '9px',
              fontSize: '13px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              borderRadius: '999px',
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -1px 2px rgba(0,0,0,0.1)',
              color: 'rgba(255,255,255,0.92)',
              '&:hover': {
                transform: 'translateY(-1px)',
                background: 'rgba(255, 255, 255, 0.13)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -1px 2px rgba(0,0,0,0.12)',
              },
            }}
            beamProps={{ strength: 0.06, brightness: 0.9, saturation: 0.3, hueRange: 0, duration: 4 }}
          >
            {buttonText}
          </BeamCTAButton>
        )}

        {/* BOTÓN WHATSAPP - Adaptado para combinar sutilmente */}
        {!isPanelOpen && (
          <Box
            component="a"
            href="https://wa.me/5491112345678"
            target="_blank"
            sx={{
              ...iconOrbStyles,
              background: 'rgba(90, 110, 200, 0.15)', 
              border: '1px solid rgba(150, 170, 255, 0.1)',
              boxShadow: `
                0 4px 12px rgba(0, 0, 0, 0.15),
                inset 0 1px 1px rgba(200, 220, 255, 0.2), 
                inset 0 -1px 2px rgba(0, 0, 0, 0.2)
              `,
              color: '#F5F8FF',
              '&:hover': {
                background: 'rgba(90, 110, 200, 0.25)',
              },
            }}
          >
            <MessageCircle size={19} strokeWidth={2.1} style={{ position: 'relative', zIndex: 1 }} />
          </Box>
        )}

        {/* BOTÓN TOGGLE (CHISPAS/X) */}
        <Box
          onClick={() => setIsPanelOpen((prev) => !prev)}
          sx={{
            ...iconOrbStyles,
            cursor: 'pointer',
            background: isPanelOpen
              ? 'rgba(255, 255, 255, 0.15)'
              : 'rgba(255, 255, 255, 0.08)',
          }}
        >
          {isPanelOpen ? (
            <X size={20} color="#fff" strokeWidth={2.5} style={{ position: 'relative', zIndex: 1 }} />
          ) : (
            <Sparkles size={20} color="#fff" strokeWidth={1.5} style={{ position: 'relative', zIndex: 1 }} />
          )}
        </Box>
      </Box>
    </>
  );
}