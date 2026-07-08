import React, { useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MedicalProcedures() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const sectionRef = useRef(null);
  const introRef = useRef(null);

  const procedures = [
    {
      id: "01",
      number: "001",
      name: "Cirugía Mamaria",
      image: "/images/mama.png",
      description: "Procedimientos destinados a mejorar la forma, el volumen y la posición de las mamas mediante técnicas personalizadas.",
      listTitle: "Incluye",
      items: [
        "Aumento mamario con implantes",
        "Mastopexia",
        "Reducción mamaria",
        "Recambio de implantes",
        "Reconstrucción mamaria"
      ]
    },
    {
      id: "02",
      number: "002",
      name: "Lipoescultura VASER",
      image: "/images/lipo.png",
      description: "Remodelación corporal mediante eliminación de grasa localizada utilizando tecnología avanzada.",
      listTitle: "Tecnologías",
      items: [
        "VASER Liposuction",
        "Morpheus RF"
      ]
    },
    {
      id: "04",
      number: "003",
      name: "Abdominoplastia",
      image: "/images/abdomino.webp",
      description: "Procedimiento quirúrgico que permite remodelar el abdomen eliminando exceso de piel y grasa.",
      listTitle: null,
      items: []
    },
    {
      id: "01",
      number: "004",
      name: "Aumento Mamario",
      image: "/images/aumento.png",
      description: "Utilización de implantes de alta gama o transferencia de grasa propia para mejorar el volumen y proyección de las mamas.",
      listTitle: "Técnicas",
      items: [
        "Implantes de gel cohesivo",
        "Lipotransferencia",
        "Abordaje submuscular"
      ]
    },
    {
      id: "06",
      number: "006",
      name: "Tratamientos Faciales",
      image: "/images/image.png",
      description: "Regeneración y resurfacing facial sin cirugía, combinando la radiofrecuencia INDIBA con el láser DEKA DuoGlide.",
      listTitle: "Tecnologías",
      items: [
        "INDIBA",
        "DEKA DuoGlide"
      ]
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro headline words
      const wordElements = gsap.utils.toArray(".proc-word");
      if (wordElements.length > 0) {
        gsap.fromTo(wordElements,
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.03,
            scrollTrigger: {
              trigger: introRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            }
          }
        );
      }

      // Cards stagger
      const cards = gsap.utils.toArray(".proc-card");
      if (cards.length > 0) {
        gsap.fromTo(cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: ".proc-grid",
              start: "top 85%",
              toggleActions: "play none none none",
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  const headlineText = "Excelencia quirúrgica con enfoque humano";
  const headlineWords = headlineText.split(" ");

  return (
    <Box
      ref={sectionRef}
      sx={{
        position: "relative",
        zIndex: 1,
        backgroundColor: "#F2F2F2",
        pt: { xs: "80px", md: "140px" },
        pb: { xs: "60px", md: "100px" },
      }}
    >
      {/* Espacio vacío en móviles en lugar del título */}
      <Box sx={{ display: { xs: "block", md: "none" }, height: "40px" }} />
      {/* ═══════════════════════════════════════════════
          INTRO — Editorial layout like clinica
          ═══════════════════════════════════════════════ */}
      <Box
        ref={introRef}
        sx={{
          px: { xs: "20px", md: "70px" },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" },
          columnGap: "20px",
          mb: { xs: "60px", md: "120px" },
        }}
      >
        {/* Label — left */}
        <Box sx={{
          gridColumn: { xs: "1 / -1", md: "1 / 4" },
          display: "flex",
          alignItems: "baseline",
          gap: "12px",
          mb: { xs: "24px", md: 0 },
        }}>
          <Typography sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "14px", md: "16px" },
            fontWeight: 500,
            color: "rgba(0,0,0,0.35)",
            lineHeight: 1,
          }}>
            (01)
          </Typography>
          <Typography sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "14px", md: "16px" },
            fontWeight: 500,
            color: "#000",
            textTransform: "uppercase",
            letterSpacing: "-0.01em",
            lineHeight: 1,
          }}>
            Nuestro proceso
          </Typography>
        </Box>

        {/* Headline — center */}
        <Box sx={{ gridColumn: { xs: "1 / -1", md: "4 / 11" }, mb: { xs: "24px", md: 0 } }}>
          <Typography sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "32px", md: "56px", lg: "64px" },
            fontWeight: 500,
            lineHeight: 1.18,
            letterSpacing: "-0.04em",
            color: "black",
            textAlign: "left",
            overflow: "hidden",
          }}>
            {headlineWords.map((word, i) => (
              <Box component="span" key={i} sx={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", mr: "0.25em" }}>
                <Box component="span" className="proc-word" sx={{ display: "inline-block", willChange: "transform" }}>
                  {word}
                </Box>
              </Box>
            ))}
          </Typography>
        </Box>

        {/* Description — right */}
        <Box sx={{ gridColumn: { xs: "1 / -1", md: "9 / 13" }, mt: { md: "8px" } }}>
          <Typography sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "16px", md: "17px" },
            lineHeight: 1.55,
            color: "rgba(0,0,0,0.5)",
            fontWeight: 600,
            textAlign: "left",
          }}>
            Como expertos en cirugía mamaria, ofrecemos tratamientos personalizados que combinan precisión tecnológica con un cuidado humano excepcional.
          </Typography>
        </Box>
      </Box>

      {/* ═══════════════════════════════════════════════
          PROCEDURE CARDS — Clean grid
          ═══════════════════════════════════════════════ */}
      <Box
        className="proc-grid"
        sx={{
          px: { xs: "20px", md: "70px" },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: { xs: "16px", md: "20px" },
        }}
      >
        {procedures.map((procedure) => (
          <Box
            key={procedure.id}
            className="proc-card"
            component={RouterLink}
            to={`/procedimiento/${procedure.id}`}
            sx={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              borderRadius: "14px",
              backgroundColor: { xs: "#EBEBEB", md: "white" },
              position: "relative",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              "&:hover": {
                backgroundColor: "#FFFFFF",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.04)",
                transform: "translateY(-4px)",
              },
              "&:hover .proc-card-img": {
                transform: "scale(1.05)",
              },
              "&:hover .proc-card-arrow": {
                transform: "translate(4px, -4px)",
                color: "#0081C7",
              }
            }}
          >
            {/* Image */}
            <Box sx={{
              width: "100%",
              height: { xs: "240px", md: "320px", lg: "360px" },
              overflow: "hidden",
            }}>
              <Box
                className="proc-card-img"
                component="img"
                src={procedure.image}
                alt={procedure.name}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            </Box>

            {/* Content */}
            <Box sx={{ p: { xs: "20px", md: "28px" }, display: "flex", flexDirection: "column", flexGrow: 1 }}>
              {/* Number + Arrow row */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                  <Typography sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#0081C7",
                    letterSpacing: "0.05em",
                  }}>
                    //{procedure.number}
                  </Typography>
                  <ArrowUpRight size={16} color="#0081C7" strokeWidth={2.5} className="proc-card-arrow" style={{ transition: 'transform 0.4s ease' }} />
                </Box>

              {/* Title */}
              <Typography sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: { xs: "20px", md: "24px" },
                fontWeight: 500,
                color: "#111",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                textAlign: "left",
                mb: "12px",
              }}>
                {procedure.name}
              </Typography>

              {/* Description */}
              <Typography sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: { xs: "13px", md: "14px" },
                color: "rgba(0,0,0,0.45)",
                lineHeight: 1.6,
                fontWeight: 400,
                textAlign: "left",
                mb: "auto",
              }}>
                {procedure.description}
              </Typography>

              {/* Items */}
              {procedure.items && procedure.items.length > 0 && (
                <Box sx={{ mt: "20px", pt: "16px", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <Typography sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "10px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "rgba(0,0,0,0.3)",
                    mb: "10px",
                    textAlign: "left",
                  }}>
                    {procedure.listTitle}
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: "4px 20px" }}>
                    {procedure.items.map((item, i) => (
                      <Typography key={i} sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "12px",
                        color: "rgba(0,0,0,0.45)",
                        fontWeight: 500,
                        lineHeight: 1.6,
                        textAlign: "left",
                      }}>
                        {item}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        ))}
      </Box>

    </Box>
  );
}
