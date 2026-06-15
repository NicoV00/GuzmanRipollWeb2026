import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Plus, X, MessageCircle, Stethoscope } from 'lucide-react';
import BeamCTAButton from './BeamCTAButton';
import GlassSurface from './GlassSurface';

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
            <Stethoscope size={16} color="rgba(255,255,255,0.6)" strokeWidth={2} />
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
              background: 'rgba(255, 255, 255, 0.09)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.11)',
              boxShadow: `
                0 4px 20px rgba(0, 0, 0, 0.18),
                inset 0 1.5px 0 rgba(255, 255, 255, 0.38),
                inset 0 -1px 0 rgba(0, 0, 0, 0.12),
                inset 1px 0 0 rgba(255, 255, 255, 0.09),
                inset -1px 0 0 rgba(255, 255, 255, 0.05)
              `,
              color: 'rgba(255,255,255,0.92)',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                borderRadius: 'inherit',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 38%, transparent 58%)',
                pointerEvents: 'none',
                zIndex: 0,
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '45%',
                borderRadius: '999px 999px 60% 60% / 999px 999px 40px 40px',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%)',
                pointerEvents: 'none',
                zIndex: 0,
              },
              '&:hover': {
                transform: 'translateY(-1px)',
                background: 'rgba(255, 255, 255, 0.13)',
                boxShadow: `
                  0 8px 28px rgba(0, 0, 0, 0.22),
                  inset 0 1.5px 0 rgba(255, 255, 255, 0.48),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.14),
                  inset 1px 0 0 rgba(255, 255, 255, 0.12),
                  inset -1px 0 0 rgba(255, 255, 255, 0.07)
                `,
              },
            }}
            beamProps={{ strength: 0.05, brightness: 0.92, saturation: 0.2, hueRange: 0, duration: 5 }}
          >
            {buttonText}
          </BeamCTAButton>
        )}

        {/* BOTÓN WHATSAPP - Con GlassSurface efecto completo */}
        {!isPanelOpen && (
          <Box
            component="a"
            href="https://wa.me/5491112345678"
            target="_blank"
            sx={{
              flex: '0 0 44px',
              width: '44px',
              height: '44px',
              display: 'block',
              textDecoration: 'none',
              transition: 'transform 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
              '&:active': { transform: 'scale(0.92)' },
            }}
          >
            <GlassSurface
              width={44}
              height={44}
              borderRadius={22}
              borderWidth={0.12}
              brightness={58}
              opacity={1}
              blur={10}
              displace={3}
              backgroundOpacity={0.2}
              saturation={1.8}
              distortionScale={-220}
              redOffset={8}
              greenOffset={-15}
              blueOffset={-35}
              mixBlendMode="screen"
            >
              <MessageCircle size={19} strokeWidth={2.1} color="#F5F8FF" />
            </GlassSurface>
          </Box>
        )}

        {/* BOTÓN TOGGLE (CHISPAS/X) - Con GlassSurface efecto completo */}
        <Box
          onClick={() => setIsPanelOpen((prev) => !prev)}
          sx={{
            flex: '0 0 44px',
            width: '44px',
            height: '44px',
            display: 'block',
            cursor: 'pointer',
            transition: 'transform 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
            '&:active': { transform: 'scale(0.92)' },
          }}
        >
          <GlassSurface
            width={44}
            height={44}
            borderRadius={22}
            borderWidth={0.12}
            brightness={isPanelOpen ? 65 : 58}
            opacity={1}
            blur={10}
            displace={3}
            backgroundOpacity={isPanelOpen ? 0.25 : 0.2}
            saturation={1.8}
            distortionScale={-220}
            redOffset={8}
            greenOffset={-15}
            blueOffset={-35}
            mixBlendMode="screen"
          >
            {isPanelOpen ? (
              <X size={20} color="#fff" strokeWidth={2.5} />
            ) : (
              <Plus size={20} color="#fff" strokeWidth={2} />
            )}
          </GlassSurface>
        </Box>
      </Box>
    </>
  );
}