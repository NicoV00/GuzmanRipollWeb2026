"use client"

import React, { useEffect, useRef } from "react"
import { Box, Grid, Typography, IconButton } from "@mui/material"
import { useLocation } from "react-router-dom"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import useSEO from "../hooks/useSEO"

import { BlurText } from "../components/animations/BlurScrollEffect"
import "../components/animations/blur-scroll-effect.css"
import Footer from "../components/UI/Footer"
import About from "../components/clinica/about"
import Conexion from "../components/clinica/conexion"
import { PurposeSection } from "../components/clinica/PurposeSection"

gsap.registerPlugin(ScrollTrigger)

export default function Clinica({ id }) {
  const location = useLocation()
  const heroContainerRef = useRef(null)
  const stickyTextRef = useRef(null)
  const imageRef = useRef(null)
  const headlineRef = useRef(null)

  useSEO({
    title: 'Nuestra Clínica',
    description: 'Conocé la clínica del Dr. Guzmán Ripoll en Punta del Este, Uruguay. Un espacio diseñado para rehumanizar la medicina estética combinando calidez humana con tecnología de punta.',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);


  useEffect(() => {
    if (!heroContainerRef.current || !stickyTextRef.current || !imageRef.current) return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 900px)", () => {
      ScrollTrigger.create({
        trigger: imageRef.current,
        start: "top 100px", // Precise start to match headline spacing better
        end: () => `bottom ${100 + stickyTextRef.current.offsetHeight}px`, // Ends precisely when image bottom aligns with text bottom
        pin: stickyTextRef.current,
        pinSpacing: false,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });
    });

    return () => mm.revert();
  }, []);

  // Intro Animation useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.2 } })

      tl.fromTo(headlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, delay: 0.2 }
      )
        .fromTo(stickyTextRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0 },
          "-=0.8"
        )
        .fromTo(imageRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0 },
          "-=1"
        )
    }, 100)

    return () => clearTimeout(timer)
  }, []);

  const logos = [
    { src: '/images/logo-apaisado.png', alt: 'FILACP — Federación Ibero Latinoamericana de Cirugía Plástica' },
    { src: '/images/logo-scpreu.png', alt: 'SCPREU — Sociedad de Cirugía Plástica y Reconstructiva del Uruguay' },
    { src: '/images/alam-logo.webp', alt: 'ALAM — Asociación Latinoamericana de Microcirugía', size: 78 },
  ];

  const imageGrainSx = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    opacity: 0.13,
    mixBlendMode: "multiply",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E")`,
    backgroundSize: "140px 140px",
  };

  return (
    <Box id={id} sx={{
      position: "relative",
      width: "100%",
      maxWidth: "100vw",
      zIndex: 1
    }}>

      <Box sx={{
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
        zIndex: 0,
      }}>

        <Box
          ref={heroContainerRef}
          sx={{
            position: "relative",
            zIndex: 1,
            mt: { xs: "280px", md: "330px" }, // AJUSTAR AQUI: Espacio blanco arriba del título
            px: { xs: "20px", md: "70px" },
            backgroundColor: "transparent",
            width: "100%",
            textAlign: "left"
          }}
        >
          {/* Big Bold Headline */}
          <Typography
            ref={headlineRef}
            variant="h1"
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: { xs: "36px", md: "76px" },
              fontWeight: 500,
              lineHeight: 1.1,
              mb: { xs: "40px", md: "40px" },
              letterSpacing: "-0.04em",
              maxWidth: "1100px",
              textAlign: "left",
              opacity: 0,
            }}
          >
            Somos la clínica de cirugía mamaria que rehumaniza la medicina estética.
          </Typography>

          <Box sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" },
            gap: { xs: "40px", md: "0" },
            alignItems: "start",
            position: "relative"
          }}>
            {/* Left Column: GSAP Pinned Paragraph */}
            <Box
              ref={stickyTextRef}
              sx={{
                gridColumn: { xs: "1 / -1", md: "1 / 7" },
                opacity: 0,
                order: { xs: 2, md: 0 }, // Subtext last on mobile
              }}
            >
              <Typography sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: { xs: "18px", md: "24px" },
                lineHeight: 1.3,
                color: "#000",
                fontWeight: 500,
                textAlign: "left",
                maxWidth: { md: "520px" }
              }}>
                Como expertos en cirugía mamaria, ofrecemos tratamientos personalizados que combinan
                precisión tecnológica con un cuidado humano excepcional. Trabajamos con planificación cuidadosa y atención al detalle en cada etapa.
                Creamos un entorno cómodo, profesional y serio, con contención y orientación constante desde la primera consulta hasta el postoperatorio.
              </Typography>
            </Box>

            {/* Right Column: Large Image */}
            <Box
              ref={imageRef}
              sx={{
                gridColumn: { xs: "1 / -1", md: "7 / 13" },
                opacity: 0,
                order: { xs: 1, md: 0 }, // Image after title on mobile
              }}
            >
              <Box sx={{
                width: "100%",
                height: { xs: "400px", md: "800px" }, // Reduced height as requested
                overflow: "hidden",
                borderRadius: "2px",
                position: "relative"
              }}>
                <img
                  src="/images/clinic1.webp"
                  alt="Clínica Guzmán Ripoll"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
                <Box
                  aria-hidden="true"
                  sx={imageGrainSx}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Content Container for following sections */}
        <Box sx={{
          position: "relative",
          zIndex: 1,
          mt: { xs: "60px", md: "140px" },
          display: "grid",
          backgroundColor: "transparent",
          gridTemplateColumns: "repeat(12, 1fr)",
          marginInline: { xs: "20px", md: "70px" },
          columnGap: { xs: "16px", md: "20px" },
          "& > section": {
            gridColumn: "1 / -1",
          },
        }}>
          {/* 01 NUESTRO PROPÓSITO */}
          <PurposeSection />

          {/* Imagen full-width entre propósito y liderazgo */}
          <Box sx={{
            gridColumn: "1 / -1",
            width: "100%",
            height: { xs: "300px", md: "86vh" },
            maxHeight: { md: "800px" },
            borderRadius: { xs: "16px", md: "2px" },
            cornerShape: "squircle",
            overflow: "hidden",
            mb: { xs: "60px", md: "120px" },
            position: "relative",
          }}>
            <img
              src="/images/grande.webp"
              alt="Clínica Guzmán Ripoll"
              loading="lazy"
              decoding="async"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center center",
                display: "block",
              }}
            />
            <Box
              aria-hidden="true"
              sx={imageGrainSx}
            />
          </Box>

          {/* 02 LIDERAZGO — Dr. Guzmán Ripoll (imagen del cirujano) */}
          <About />

          {/* LOGO GRID - Logos separados con gutter entre ellos */}
          <Box sx={{
            gridColumn: { xs: '1 / 13', md: '1 / 13' },
            zIndex: 1,
            width: '100%',
            mt: { xs: "12px", md: "28px" },
            pt: 0,
            pb: { xs: "12px", md: "18px" },
            backgroundColor: 'transparent',
          }}>
            {/* Eyebrow numerado — número y título pegados (como 02 LIDERAZGO) */}
            <Box sx={{
              display: "flex",
              alignItems: "baseline",
              gap: "10px",
              mb: { xs: "18px", md: "24px" },
            }}>
              <Typography component="span" sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: { xs: "16px", md: "18px" },
                fontWeight: 500,
                color: "rgba(0, 0, 0, 0.37)",
                lineHeight: 1,
              }}>
                (03)
              </Typography>
              <Typography component="span" sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: { xs: "16px", md: "18px" },
                fontWeight: 500,
                color: "black",
                textTransform: "uppercase",
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}>
                SOCIEDADES QUE INTEGRA
              </Typography>
            </Box>
            {/* Cinta infinita de logos (marquee) — se pausa al pasar el mouse */}
            <Box sx={{
              position: 'relative',
              width: { xs: '100%', md: '50%' },
              overflow: 'hidden',
              py: { xs: '12px', md: '18px' },
              // Desvanece los logos en los bordes de la cinta
              maskImage: 'linear-gradient(to right, transparent, black 14%, black 86%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 14%, black 86%, transparent)',
              '@keyframes logoMarquee': {
                from: { transform: 'translateX(0)' },
                to: { transform: 'translateX(-50%)' },
              },
            }}>
              <Box sx={{
                display: 'flex',
                width: 'max-content',
                alignItems: 'center',
                animation: 'logoMarquee 30s linear infinite',
                '&:hover': { animationPlayState: 'paused' },
              }}>
                {/* Dos mitades idénticas para que el loop de -50% sea perfecto */}
                {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
                  <Box
                    key={index}
                    sx={{
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      px: { xs: '32px', md: '56px' },
                    }}
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      loading="lazy"
                      decoding="async"
                      style={{
                        maxHeight: `${logo.size || 46}px`,
                        maxWidth: '190px',
                        width: 'auto',
                        height: 'auto',
                        objectFit: 'contain',
                        // Sin opacity: rompería el multiply y el fondo blanco
                        // de los JPG volvería a verse como recuadro.
                        // El desvanecido se logra con brightness sobre el gris.
                        filter: 'grayscale(100%) brightness(1.45)',
                        mixBlendMode: 'multiply',
                        transition: 'filter 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.filter = 'grayscale(0%) brightness(1)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.filter = 'grayscale(100%) brightness(1.45)';
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          <Conexion />

          {/* Aire antes del footer */}
          <Box sx={{ gridColumn: "1 / -1", height: { xs: "180px", md: "320px" } }} />
        </Box>
      </Box>

      <Box sx={{ position: "relative", zIndex: 100 }}>
        <Footer />
      </Box>
    </Box>
  )
}
