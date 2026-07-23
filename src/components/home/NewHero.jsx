'use client';
import { Box, Typography } from "@mui/material";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Link as RouterLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import UnicornScene from "unicornstudio-react";

export default function NewHero() {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        paddingX: { xs: "20px", md: "70px" },
        columnGap: "20px",
        paddingTop: { xs: "120px", md: "140px" },
        paddingBottom: { xs: "60px", md: "20px" },
        overflow: "hidden",
      }}
    >
      {/* Fondo interactivo de Unicorn Studio - Pantalla completa */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          pointerEvents: "auto",
          overflow: "hidden",
          "& > div": {
            width: "100% !important",
            height: "100% !important",
          },
          "& canvas": {
            width: "100% !important",
            height: "100% !important",
            objectFit: "cover",
          }
        }}
      >
        <UnicornScene
          projectId="WPUXZwywkQSIFX5v2ghw"
          width="100%"
          height="100%"
          scale={1}
          dpi={1.5}
          sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@2.1.5/dist/unicornStudio.umd.js"
        />
      </Box>

      {/* Línea separadora vertical central */}
      <Box
        sx={{
          position: "absolute",
          left: { xs: 0, md: "50%" },
          top: { xs: "50%", md: 0 },
          bottom: { xs: "auto", md: 0 },
          width: { xs: "100%", md: "1px" },
          height: { xs: "1px", md: "100%" },
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          zIndex: 1,
          display: { xs: "none", md: "block" },
        }}
      />



      {/* Lado Derecho - Contenido */}
      <Box
        sx={{
          gridColumn: { xs: "1 / 13", md: "7 / 13" },
          order: { xs: 1, md: 2 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          gap: { xs: "30px", md: "40px" },
          position: "relative",
          zIndex: 2,
          paddingLeft: { xs: "0px", md: "70px" },
          paddingBottom: { xs: "30px", md: "30px" },
          paddingTop: { xs: "40px", md: "220px" },
          width: "100%",
          boxSizing: "border-box"
        }}
      >
        {/* Título Principal */}
        <Box sx={{ position: "relative" }}>
          <Typography
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: { xs: "38px", md: "42px", lg: "48px" },
              color: "white",
              fontWeight: 400,
              lineHeight: { xs: 1.1, md: 0.95 },
              letterSpacing: "-1.5px",
              textAlign: "left",
            }}
          >
            Conexión{" "}
            <Box
              component="span"
              sx={{
                color: "#0081C7",
                fontWeight: 500,
              }}
            >
              humana
            </Box>,
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: { xs: "38px", md: "42px", lg: "48px" },
              color: "white",
              fontWeight: 400,
              lineHeight: { xs: 1.1, md: 0.95 },
              letterSpacing: "-1.5px",
              textAlign: "left",
            }}
          >
            innovación tecnológica
          </Typography>
        </Box>

        {/* Botones de acción */}
        <Box sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", md: "row" }, 
          gap: "16px",
          width: "100%" 
        }}>
          {/* Conoce Más (Apple Multi-Layer Glass) */}
          <Box
            component={RouterLink}
            to="/clinica"
            sx={{
              position: "relative",
              isolation: "isolate",
              overflow: "hidden",
              flex: 1,
              fontFamily: "'Poppins', sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.95)",
              background: "rgba(255, 255, 255, 0.13)",
              backdropFilter: "blur(40px) saturate(180%)",
              WebkitBackdropFilter: "blur(40px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.14)",
              borderRadius: "100px",
              padding: "16px 32px",
              cursor: "pointer",
              textAlign: "center",
              textDecoration: "none",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              boxShadow: `
                0 8px 32px rgba(0, 0, 0, 0.18),
                inset 0 1.5px 0 rgba(255, 255, 255, 0.42),
                inset 0 -1px 0 rgba(0, 0, 0, 0.12),
                inset 1px 0 0 rgba(255, 255, 255, 0.1),
                inset -1px 0 0 rgba(255, 255, 255, 0.06)
              `,
              "&::before": {
                content: '""',
                position: "absolute",
                inset: 0,
                borderRadius: "inherit",
                background: "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 38%, transparent 58%)",
                pointerEvents: "none",
                zIndex: 0,
              },
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "45%",
                borderRadius: "100px 100px 60% 60% / 100px 100px 40px 40px",
                background: "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, transparent 100%)",
                pointerEvents: "none",
                zIndex: 0,
              },
              "& > *": { position: "relative", zIndex: 1 },
              "&:hover": {
                transform: "translateY(-3px)",
                background: "rgba(255, 255, 255, 0.18)",
                boxShadow: `
                  0 16px 40px rgba(0, 0, 0, 0.22),
                  inset 0 1.5px 0 rgba(255, 255, 255, 0.5),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.14),
                  inset 1px 0 0 rgba(255, 255, 255, 0.14),
                  inset -1px 0 0 rgba(255, 255, 255, 0.08)
                `,
              },
              "&:active": { transform: "translateY(0) scale(0.98)" }
            }}
          >
            Conoce mas
          </Box>

          {/* Ver Procedimientos (Apple Multi-Layer Glass — más sutil) */}
          <Box
            component={RouterLink}
            to="/procedimientos"
            sx={{
              position: "relative",
              isolation: "isolate",
              overflow: "hidden",
              flex: 1,
              fontFamily: "'Poppins', sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.85)",
              background: "rgba(255, 255, 255, 0.07)",
              backdropFilter: "blur(40px) saturate(180%)",
              WebkitBackdropFilter: "blur(40px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "100px",
              padding: "16px 32px",
              cursor: "pointer",
              textAlign: "center",
              textDecoration: "none",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              boxShadow: `
                0 4px 24px rgba(0, 0, 0, 0.14),
                inset 0 1.5px 0 rgba(255, 255, 255, 0.28),
                inset 0 -1px 0 rgba(0, 0, 0, 0.1),
                inset 1px 0 0 rgba(255, 255, 255, 0.07)
              `,
              "&::before": {
                content: '""',
                position: "absolute",
                inset: 0,
                borderRadius: "inherit",
                background: "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 40%, transparent 60%)",
                pointerEvents: "none",
                zIndex: 0,
              },
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "45%",
                borderRadius: "100px 100px 60% 60% / 100px 100px 40px 40px",
                background: "linear-gradient(180deg, rgba(255,255,255,0.09) 0%, transparent 100%)",
                pointerEvents: "none",
                zIndex: 0,
              },
              "& > *": { position: "relative", zIndex: 1 },
              "&:hover": {
                transform: "translateY(-3px)",
                background: "rgba(255, 255, 255, 0.11)",
                boxShadow: `
                  0 12px 32px rgba(0, 0, 0, 0.18),
                  inset 0 1.5px 0 rgba(255, 255, 255, 0.36),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.12),
                  inset 1px 0 0 rgba(255, 255, 255, 0.1)
                `,
              },
              "&:active": { transform: "translateY(0) scale(0.98)" }
            }}
          >
            Ver procedimientos
          </Box>
        </Box>
      </Box>

      {/* Indicador de scroll — flechita hacia abajo */}
      <Box
        role="button"
        aria-label="Bajar"
        onClick={() => window.scrollBy({ top: window.innerHeight * 0.9, behavior: "smooth" })}
        sx={{
          position: "absolute",
          bottom: { xs: "20px", md: "28px" },
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(255,255,255,0.7)",
          cursor: "pointer",
          transition: "color 0.3s ease",
          animation: "heroBounce 2s ease-in-out infinite",
          "&:hover": { color: "rgba(255,255,255,1)" },
          "@keyframes heroBounce": {
            "0%, 100%": { transform: "translateX(-50%) translateY(0)" },
            "50%": { transform: "translateX(-50%) translateY(6px)" },
          },
          "@media (prefers-reduced-motion: reduce)": { animation: "none" },
        }}
      >
        <ChevronDown size={28} strokeWidth={1.75} />
      </Box>
    </Box>
  );
}
