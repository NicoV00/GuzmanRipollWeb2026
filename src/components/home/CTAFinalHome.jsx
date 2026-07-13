import { Box, Typography } from "@mui/material";
import { ArrowUpRight } from "lucide-react";
import BeamCTAButton from "../UI/BeamCTAButton";
import VideoBackground from "../UI/VideoBackground";

// Grano sutil (SVG feTurbulence) para el fondo del banner
const NOISE_DATA_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// Marca "+" de esquina
function CornerMark({ position }) {
  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        width: "16px",
        height: "16px",
        opacity: 0.55,
        zIndex: 3,
        pointerEvents: "none",
        ...position,
        "&::before, &::after": {
          content: '""',
          position: "absolute",
          backgroundColor: "rgba(245,247,251,0.85)",
        },
        "&::before": {
          left: "50%",
          top: 0,
          bottom: 0,
          width: "1px",
          transform: "translateX(-50%)",
        },
        "&::after": {
          top: "50%",
          left: 0,
          right: 0,
          height: "1px",
          transform: "translateY(-50%)",
        },
      }}
    />
  );
}

export default function CTAFinalHome() {
  return (
    <Box
      sx={{
        backgroundColor: "#FAFFFF",
        // Contenedor alineado al del footer: maxWidth 1920, px 20/70
        maxWidth: "1920px",
        mx: "auto",
        px: { xs: "10px", md: "70px" },
        pb: { xs: "40px", md: "64px" },
        pt: { xs: "20px", md: "40px" },
      }}
    >
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: { xs: "16px", md: "20px" },
          // Squircle (corner smoothing iOS) — progressive enhancement, Chromium 139+
          cornerShape: "squircle",
          backgroundColor: "#020610",
          minHeight: { xs: "auto", md: "440px" },
          display: "flex",
          alignItems: "center",
          isolation: "isolate",
          // Velo oscuro sobre el video para legibilidad (mismo criterio que CTAhome)
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background:
              "linear-gradient(180deg, rgba(2, 4, 16, 0.32) 0%, rgba(2, 4, 16, 0.12) 40%, rgba(2, 4, 16, 0.38) 100%)",
            pointerEvents: "none",
          },
          // Grano
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            zIndex: 1,
            backgroundImage: NOISE_DATA_URI,
            backgroundSize: "160px 160px",
            opacity: 0.1,
            mixBlendMode: "overlay",
            pointerEvents: "none",
          },
        }}
      >
        {/* Shader en movimiento — mismo fondo de video que la home */}
        <Box sx={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <VideoBackground
            src="/videos/Background.mp4"
            webmSrc="/videos/Background.webm"
            poster="/videos/Background-poster.webp"
          />
        </Box>

        <CornerMark position={{ top: "18px", left: "18px" }} />
        <CornerMark position={{ top: "18px", right: "18px" }} />
        <CornerMark position={{ bottom: "18px", left: "18px" }} />
        <CornerMark position={{ bottom: "18px", right: "18px" }} />

        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" },
            alignItems: "center",
            columnGap: { xs: 0, md: "20px" },
            rowGap: { xs: "28px", md: 0 },
            // md sin padding lateral: las 12 columnas internas calzan con la grid global
            // (la card ocupa col 1→12), y el titular queda alineado a la columna 3.
            px: { xs: "22px", md: 0 },
            py: { xs: "72px", md: "80px" },
          }}
        >
          {/* Titular */}
          <Typography
            sx={{
              gridColumn: { xs: "1 / -1", md: "4 / 7" },
              fontFamily: "Poppins, sans-serif",
              fontWeight: 400,
              fontSize: { xs: "clamp(27px, 7.8vw, 34px)", md: "42px", xl: "52px" },
              lineHeight: { xs: 1.2, md: 1.08 },
              letterSpacing: { xs: "-0.5px", md: "-3px" },
              color: "#F5F7FB",
              textAlign: "left",
            }}
          >
            Tu mejor versión{" "}
            <Box component="span" sx={{ display: { xs: "inline", md: "block" } }}>
              empieza con
            </Box>{" "}
            <Box component="span" sx={{ display: { xs: "inline", md: "block" } }}>
              una consulta.
            </Box>
          </Typography>

          {/* Texto + botones */}
          <Box sx={{ gridColumn: { xs: "1 / -1", md: "7 / 11" }, textAlign: "left" }}>
            <Typography
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: { xs: "12px", md: "13.5px" },
                lineHeight: 1.6,
                color: "rgba(245,247,251,0.85)",
                mb: { xs: "88px", md: "28px" },
                maxWidth: { xs: "100%", md: "440px" },
              }}
            >
              Simulación 3D, técnicas de vanguardia y acompañamiento en cada
              etapa del proceso. Todo comienza con una consulta personalizada,
              donde evaluamos tu anatomía y tus objetivos para diseñar el plan
              ideal para vos.
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: { xs: "10px", md: "14px" },
                flexWrap: "nowrap",
                alignItems: "center",
              }}
            >
              <BeamCTAButton
                to="/contacto"
                tone="light"
                endIcon={<ArrowUpRight size={15} />}
                sx={{
                  height: { xs: "40px", md: "46px" },
                  minHeight: 0,
                  py: 0,
                  px: { xs: 1.7, md: 2.6 },
                  fontSize: { xs: "12px", md: "14px" },
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
                beamProps={{
                  size: "sm",
                  strength: 0.5,
                  brightness: 1.1,
                  saturation: 1.1,
                  hueRange: 12,
                  duration: 3.1,
                }}
              >
                Agendar consulta
              </BeamCTAButton>

              <BeamCTAButton
                to="/procedimientos"
                tone="dark"
                sx={{
                  height: { xs: "40px", md: "46px" },
                  minHeight: 0,
                  py: 0,
                  px: { xs: 1.7, md: 2.6 },
                  fontSize: { xs: "12px", md: "14px" },
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  // Azul casi negro para que matchee con el fondo del banner
                  background:
                    "linear-gradient(180deg, rgba(4, 9, 18, 0.92) 0%, rgba(2, 6, 14, 0.96) 100%)",
                  border: "1px solid rgba(139, 214, 255, 0.14)",
                  boxShadow:
                    "0 14px 30px rgba(0, 8, 20, 0.35), inset 0 1px 0 rgba(222, 244, 255, 0.08), inset 0 -1px 0 rgba(56, 151, 255, 0.06)",
                  "&:hover": {
                    transform: "translateY(-1px)",
                    boxShadow:
                      "0 18px 40px rgba(0, 10, 24, 0.42), inset 0 1px 0 rgba(222, 244, 255, 0.12), inset 0 -1px 0 rgba(56, 151, 255, 0.1)",
                  },
                }}
                beamProps={{
                  size: "sm",
                  strength: 0.4,
                  brightness: 1.05,
                  saturation: 1,
                  hueRange: 12,
                  duration: 3.4,
                }}
              >
                Ver procedimientos
              </BeamCTAButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
