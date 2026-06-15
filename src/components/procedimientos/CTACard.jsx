import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ArrowRight } from 'lucide-react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleLogo from "../animations/ParticleLogo";

gsap.registerPlugin(ScrollTrigger);

export default function CTACard({
  title = "Da el primer paso hoy",
  subtitle = "Contactanos hoy y agendá tu consulta personalizada con nuestro equipo de especialistas.",
  buttonText = "Agenda tu consulta",
  href = "/contacto",
  logoSrc = "/images/GR_9_Isologo_Blanco.png",
}) {
  const containerRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Sizes for the ParticleLogo wrapper
  const particleSize = isMobile ? 380 : 500; // Ajustado a un tamaño más sutil

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        mx: "auto",
        position: "relative",
        mt: { xs: 6, md: 10 },
        mb: { xs: 6, md: 10 },
        px: { xs: "20px", md: "70px" },
      }}
    >
      <Box
        ref={containerRef}
        component={RouterLink}
        to={href}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: { xs: "center", md: "space-between" },
          backgroundColor: "#0081C7", // Requested background color
          borderRadius: { xs: "32px", md: "34px" }, // More rounded borders
          position: "relative",
          overflow: "hidden",
          textDecoration: "none",
          color: "white",
          boxShadow: "0 20px 40px -10px rgba(11, 21, 40, 0.4)",
          minHeight: { xs: "240px", md: "180px" },
          px: { xs: 4, md: 10 },
          py: { xs: 4, md: 5 },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        {/* Content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
            gap: { xs: 1.5, md: 1.2 },
            zIndex: 2,
            width: "100%",
            position: "relative",
            justifyContent: { xs: "center", md: "center" },
          }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: { xs: "24px", md: "34px" },
              fontWeight: 500,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              maxWidth: { md: "700px" },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            {title}
          </Typography>

          {/* Subtitle en letra más chica */}
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: { xs: "14px", md: "15px" },
              fontWeight: 300,
              color: "rgba(255, 255, 255, 0.85)",
              lineHeight: 1.5,
              maxWidth: { md: "500px" },
              textAlign: { xs: "center", md: "left" },
              mb: { xs: 1, md: 2 }
            }}
          >
            {subtitle}
          </Typography>

          {/* Button: Agenda tu consulta con flechita ultra clean */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1.5,
              backgroundColor: "#ffffff",
              color: "#0B1528",
              px: { xs: 2.5, md: 3 },
              py: { xs: 1, md: 1.2 },
              borderRadius: "12px",
              fontSize: { xs: "13px", md: "14px" },
              fontWeight: 600,
              letterSpacing: "0.01em",
              fontFamily: "Poppins, sans-serif",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 10px 24px rgba(0,0,0,0.2)",
                backgroundColor: "#f8fafc"
              },
              "&:hover .arrow-icon": {
                transform: "translateX(4px)"
              }
            }}
          >
            {buttonText}
            <ArrowRight
              className="arrow-icon"
              size={20}
              strokeWidth={2}
              style={{ transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}
            />
          </Box>
        </Box>

        {/* Dynamic Canvas Watermark Logo Filled With Particles */}
        <Box
          sx={{
            position: "absolute",
            top: { xs: "50%", md: "50%" },
            left: { xs: "50%", md: "auto" },
            // Mover hacia adentro (izquierda) dando margen positivo desde la derecha
            right: { xs: "auto", md: "5%" },
            transform: { xs: "translate(-50%, -50%)", md: "translateY(-50%)" },
            width: `${particleSize}px`,
            height: `${particleSize}px`,
            opacity: { xs: 0.8, md: 0.9 },
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          <ParticleLogo
            src={logoSrc}
            width={particleSize}
            height={particleSize}
            particleColor="#ffffff"
            repelRadius={30} // Aún más chico el radio de repulsión
          />
        </Box>
      </Box>
    </Box>
  );
}