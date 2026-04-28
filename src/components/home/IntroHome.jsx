'use client';
import { Box, Typography } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { gsap } from "gsap";
import { ShaderMakerEmbed } from "./ShaderMakerEmbed";
import BeamCTAButton from "../UI/BeamCTAButton";

export default function IntroHome() {
  const [isPinned, setIsPinned] = useState(true);
  const biasVideoRef = useRef(null);
  const videoRef = useRef(null);
  const inteligenteBoxRef = useRef(null);
  const inteligenteTextRef = useRef(null);
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    if (biasVideoRef.current) {
      gsap.fromTo(
        biasVideoRef.current,
        {
          scale: 0.8,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.3
        }
      );
    }
  }, []);

  useEffect(() => {
    if (inteligenteBoxRef.current && inteligenteTextRef.current) {
      const box = inteligenteBoxRef.current;
      const text = inteligenteTextRef.current;
      const wOffset = isMobile ? 15 : 50;

      const finalHeight = text.offsetHeight + 15;
      const finalWidth = text.offsetWidth + wOffset;

      gsap.set(box, {
        width: 0,
        height: 0,
        opacity: 1
      });

      const tl = gsap.timeline({ delay: 0.5 });

      tl.to(box, {
        width: 1,
        height: finalHeight,
        duration: 0.4,
        ease: "power2.out"
      }).to(box, {
        width: finalWidth,
        duration: 0.6,
        ease: "power2.out"
      });
    }
  }, []);

  useEffect(() => {
    gsap.fromTo(".intro-animate",
      {
        opacity: 0,
        y: 20,
        filter: "blur(20px)"
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.4
      }
    );
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: { xs: "100dvh", md: "100vh" },
        maxHeight: { xs: "100dvh", md: "100vh" },
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        paddingX: { xs: "20px", sm: "30px", md: "50px", lg: "70px" },
        columnGap: { xs: "15px", sm: "20px" },
        paddingTop: { xs: "160px", sm: "140px", md: "160px", lg: "180px", xl: "200px" },
        paddingBottom: { xs: "30px", md: "60px" },
        overflow: "hidden",
        "& > section": {
          gridColumn: "1 / -1",
        },
        "& .intro-animate": {
          opacity: 0,
        }
      }}
    >
      {/* ── Background: shader + overlays + grain ── */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
          backgroundColor: "#050816",
          /* color / gradient overlay */
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(2, 4, 16, 0.28) 0%, rgba(2, 4, 16, 0.08) 38%, rgba(2, 4, 16, 0.34) 100%)",
            zIndex: 1,
            pointerEvents: "none"
          },
          /* radial glow + vignette */
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(circle at 50% 50%, transparent 0%, rgba(5, 8, 22, 0.12) 62%, rgba(5, 8, 22, 0.70) 100%)
            `,
            zIndex: 2,
            pointerEvents: "none"
          },
          "& .shader-frame": {
            position: "absolute",
            inset: 0,
            zIndex: 0,
            "& canvas": {
              width: "100%",
              height: "100%",
              display: "block"
            }
          }
        }}
      >
        <Box className="shader-frame">
          <ShaderMakerEmbed />
        </Box>
      </Box>

      {/* ── Heading ── */}
      <Box
        className="intro-animate"
        sx={{
          gridColumn: {
            xs: '1 / 13',
            sm: '1 / 13',
            md: '1 / 13',
            lg: '1 / 10',
            xl: '1 / 8'
          },
          backgroundColor: "transparent",
          gridRow: '1',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          textAlign: { xs: 'left', sm: 'left', md: 'left', lg: 'left' },
          alignItems: { xs: 'flex-start', sm: 'flex-start', md: 'flex-start', lg: 'flex-start' },
          justifyContent: 'flex-start',
          marginBottom: { xs: '10px', sm: '40px', md: '50px' },
        }}
      >
        <Typography
          fontFamily={'Poppins'}
          sx={{
            fontSize: {
              xs: 'clamp(38px, 10vw, 44px)',
              sm: 'clamp(40px, 7vw, 50px)',
              md: 'clamp(48px, 6vw, 60px)',
              lg: 'clamp(55px, 5vw, 65px)',
              xl: 'clamp(60px, 4.5vw, 70px)'
            },
            width: '100%',
            color: 'textSecondary',
            letterSpacing: { xs: '-1.5px', sm: '-1.5px', md: '-2px', lg: '-2.5px', xl: '-3px' },
            lineHeight: 1.1,
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            whiteSpace: 'normal',
            gap: { xs: '4px', sm: '5px', md: '6px', lg: '7px', xl: '8px' },
          }}
        >
          Cirugía mamaria{' '}
          <Typography
            ref={inteligenteTextRef}
            component="span"
            fontFamily={'Poppins'}
            sx={{
              fontSize: 'inherit',
              color: 'textAccent',
              letterSpacing: 'inherit',
              fontWeight: 'semibold',
              lineHeight: 1.2,
              whiteSpace: 'normal',
            }}
          >
            inteligente
          </Typography>
          <Typography
            component="span"
            sx={{
              fontSize: 'inherit',
              color: 'textAccent',
              letterSpacing: 'inherit',
              fontWeight: 'inherit'
            }}
          >
            ,
          </Typography>
        </Typography>

        <Typography
          fontFamily={'Poppins'}
          sx={{
            fontSize: {
              xs: 'clamp(38px, 10vw, 44px)',
              sm: 'clamp(40px, 7vw, 50px)',
              md: 'clamp(48px, 6vw, 60px)',
              lg: 'clamp(55px, 5vw, 65px)',
              xl: 'clamp(60px, 4.5vw, 70px)'
            },
            width: '100%',
            color: 'textSecondary',
            letterSpacing: { xs: '-1.5px', sm: '-1.5px', md: '-2px', lg: '-2.5px', xl: '-3px' },
            lineHeight: 1.1,
          }}
        >
          conexión humana
        </Typography>
      </Box>

      {/* ── Stats (hidden) ── */}
      <Box
        sx={{
          gridColumn: { xs: '1 / 13', md: '10 / 13' },
          gridRow: { xs: '4', md: '1' },
          display: 'none',
          flexDirection: 'row',
          textAlign: { xs: 'left', md: 'right' },
          alignItems: 'center',
          zIndex: 1,
          justifyContent: { xs: 'flex-start', md: 'flex-end' },
          marginBottom: { xs: '20px', md: '0' },
        }}
      >
        <Typography
          fontFamily={'Red Hat Display'}
          sx={{
            fontSize: {
              xs: 'clamp(14px, 4vw, 16px)',
              sm: 'clamp(16px, 3.5vw, 18px)',
              md: 'clamp(18px, 2vw, 21px)'
            },
            width: '100%',
            color: 'textSecondary',
            textTransform: 'capitalize',
            letterSpacing: '-0.5px',
            fontWeight: 500
          }}
        >
          + 400 intervenciones exitosas
        </Typography>
      </Box>

      {/* ── Subtitle + CTAs ── */}
      <Box
        sx={{
          gridColumn: {
            xs: '1 / 13',
            sm: '1 / 13',
            md: '1 / 6',
            lg: '1 / 5'
          },
          gridRow: { xs: '2', md: '2' },
          display: 'flex',
          zIndex: 1,
          flexDirection: 'column',
          alignItems: { xs: 'flex-start', sm: 'flex-start', md: 'flex-start' },
          justifyContent: 'flex-start',
          marginTop: { xs: '-30px', md: 'auto' },
          marginBottom: { xs: '0px', md: '0px' },
        }}
      >
        <Typography
          className="intro-animate"
          color="#E9E9E9"
          fontFamily={'Poppins'}
          sx={{
            fontSize: {
              xs: 'clamp(13px, 3.5vw, 14px)',
              sm: 'clamp(14px, 3vw, 15px)',
              md: 'clamp(16px, 2vw, 18px)',
              lg: 'clamp(18px, 1.8vw, 20px)'
            },
            textAlign: { xs: 'left', sm: 'left', md: 'left' },
            marginBottom: { xs: '20px', sm: '18px', md: '20px' },
            letterSpacing: { xs: '-0.3px', md: '-0.5px', lg: '-0.8px' },
            lineHeight: 1.5,
            fontWeight: 400,
            maxWidth: { xs: '100%', md: '90%' }
          }}
        >
          Cirugía Plástica Estética y Reconstructiva, especializados en brindar soluciones avanzadas
        </Typography>

        <Box
          className="intro-animate"
          sx={{
            display: 'flex',
            gap: { xs: '10px', sm: '12px', md: '14px' },
            flexWrap: 'nowrap',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: 'auto',
            flexDirection: 'row',
          }}
        >
          <Box
            sx={{ flex: '0 0 auto' }}
          >
            <BeamCTAButton
              to="/contacto"
              tone="light"
              sx={{
                minHeight: { xs: '42px', md: '44px' },
                px: { xs: 2.2, md: 2.5 },
                py: { xs: 1, md: 1.1 },
                fontSize: { xs: '13px', md: '14px' },
                fontWeight: 500,
                ml: 0,
              }}
              beamProps={{
                size: 'sm',
                strength: 0.5,
                brightness: 1.1,
                saturation: 1.1,
                hueRange: 12,
                duration: 3.15,
              }}
            >
              Agendar consulta
            </BeamCTAButton>
          </Box>
          <BeamCTAButton
            to="/procedimientos"
            tone="dark"
            sx={{
              minHeight: { xs: '42px', md: '44px' },
              px: { xs: 2.2, md: 2.5 },
              py: { xs: 1, md: 1.1 },
              fontSize: { xs: '13px', md: '14px' },
              fontWeight: 500,
              color: '#F4FAFF',
              background: 'linear-gradient(180deg, rgba(24, 38, 89, 0.32) 0%, rgba(17, 29, 72, 0.46) 100%)',
              border: '1px solid rgba(167, 207, 255, 0.15)',
              boxShadow: '0 8px 20px rgba(0, 10, 30, 0.1), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(101,163,255,0.08)',
              '&:hover': {
                transform: 'translateY(-1px)',
                boxShadow: '0 12px 26px rgba(0, 12, 34, 0.14), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(101,163,255,0.12)',
                background: 'linear-gradient(180deg, rgba(26, 42, 98, 0.38) 0%, rgba(19, 33, 82, 0.52) 100%)',
              },
            }}
            beamProps={{
              size: 'sm',
              strength: 0.28,
              brightness: 1.05,
              saturation: 1.05,
              hueRange: 10,
              duration: 3.15,
            }}
          >
            Ver procedimientos
          </BeamCTAButton>
        </Box>
      </Box>

      {/* ── Scroll indicator ── */}
      <Box
        sx={{
          gridColumn: { xs: '1 / 13', md: '12 / 13' },
          gridRow: { xs: '4', md: '2' },
          display: 'flex',
          zIndex: 1,
          alignItems: { xs: 'flex-end', md: 'flex-end' },
          justifyContent: { xs: 'flex-end', md: 'flex-end' },
          marginTop: { xs: '-15%', md: '0px' },
        }}
      >
        <Typography
          color="#ffffff"
          fontFamily={'Poppins'}
          sx={{
            fontSize: {
              xs: 'clamp(14px, 4vw, 16px)',
              sm: 'clamp(16px, 3.5vw, 18px)',
              md: 'clamp(18px, 2vw, 20px)'
            },
            fontWeight: 300,
            letterSpacing: '0.5px'
          }}
        >
          (Scroll)
        </Typography>
      </Box>
    </Box>
  );
}
