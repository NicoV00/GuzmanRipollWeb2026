"use client"

import React, { useEffect, useRef, useState } from "react"
import { Box, Grid, Typography, IconButton, useTheme } from "@mui/material"
import { useLocation } from "react-router-dom"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { BlurText } from "../components/animations/BlurScrollEffect"
import "../components/animations/blur-scroll-effect.css"
import Footer from "../components/UI/Footer"
import About from "../components/clinica/about"
import Conexion from "../components/clinica/conexion"
import { PurposeSection } from "../components/clinica/PurposeSection"

gsap.registerPlugin(ScrollTrigger)

export default function Clinica({ id }) {
  const location = useLocation()
  const theme = useTheme()
  const heroTextRef = useRef(null)
  const resultadosTitleRef = useRef(null)
  const doctorTitleRef = useRef(null)
  const humanConnectionTitleRef = useRef(null)
  const typographyRef = useRef(null)
  const heroContainerRef = useRef(null)
  const stickyTextRef = useRef(null)
  const imageRef = useRef(null)
  const headlineRef = useRef(null)
  const [showContent, setShowContent] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e) => {
    if (typographyRef.current) {
      const rect = typographyRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

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
      setShowContent(true)

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
    { src: '/images/logo-apaisado.png', alt: 'Logo 1' },
    { src: '/images/logo-scpreu.png', alt: 'Logo 2' },
    { src: '/images/images.jpg', alt: 'Logo 3' },
    { src: '/images/logo-apaisado.png', alt: 'Logo 4' },
  ];

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
                height: { xs: "400px", md: "900px" }, // Reduced height as requested
                overflow: "hidden",
                borderRadius: "2px",
                position: "relative"
              }}>
                <img
                  src="/images/Paper Texture@2160p.png"
                  alt="Clínica Guzmán Ripoll"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
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



          {/* LOGO GRID - Logos separados con gutter entre ellos */}
          <Box sx={{
            gridColumn: { xs: '1 / 13', md: '1 / 13' },
            zIndex: 1,
            width: '100%',
            py: { xs: "40px", md: "80px" },
            backgroundColor: 'transparent',
          }}>
            <Box sx={{
              display: 'grid',
              position: 'relative',
              gridTemplateColumns: { xs: 'repeat(4, 1fr)', md: 'repeat(12, 1fr)' },
              columnGap: { xs: "16px", md: "20px" },
              rowGap: { xs: "16px", md: "0" },
              width: '100%',
              zIndex: 0,
            }}>
              {logos.map((logo, index) => {
                const mobileCol = index % 2 === 0 ? '1 / 3' : '3 / 5';
                const desktopCol = `${index * 3 + 1} / ${index * 3 + 4}`;

                return (
                  <Box
                    key={index}
                    sx={{
                      gridColumn: {
                        xs: mobileCol,
                        md: desktopCol
                      },
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: { xs: '30px 15px', md: '60px 40px' },
                      minHeight: { xs: '120px', md: '200px' },
                      border: '1px solid rgba(0, 0, 0, 0.06)',
                      backgroundColor: '#ffffff',
                      overflow: 'hidden',
                      zIndex: 1,
                      position: 'relative',
                    }}
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      style={{
                        maxWidth: '100%',
                        maxHeight: index === 2 ? '80px' : '60px',
                        width: 'auto',
                        height: 'auto',
                        objectFit: 'contain',
                        filter: 'grayscale(100%) brightness(1.1)',
                        opacity: 0.6,
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.filter = 'grayscale(0%) brightness(1)';
                        e.target.style.opacity = '1';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.filter = 'grayscale(100%) brightness(1.1)';
                        e.target.style.opacity = '0.6';
                      }}
                    />
                  </Box>
                );
              })}
            </Box>
          </Box>

          <Conexion />
          <About />
        </Box>
      </Box>

      <Box sx={{ position: "relative", zIndex: 100 }}>
        <Footer />
      </Box>
    </Box>
  )
}
