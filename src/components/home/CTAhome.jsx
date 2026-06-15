import { Box, Typography } from "@mui/material";
import { useEffect } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoBackground from "../UI/VideoBackground";
import BeamCTAButton from "../UI/BeamCTAButton";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    title: "Confianza",
    number: "1",
    image: "/images/maxi1.png",
    subtitle: "Tu seguridad es nuestra prioridad",
    text: "Nuestra sólida trayectoria y experiencia avalan cada procedimiento. Trabajamos con los más altos estándares de seguridad, brindándote total confianza desde la primera consulta.",
  },
  {
    title: "Simulación",
    number: "2",
    image: "/images/maxi2.png",
    subtitle: "Visualiza tu cambio antes de operar",
    text: "La tecnología Crisalix genera una simulación 3D detallada de tu procedimiento. Visualiza tu aspecto postoperatorio antes de tomar cualquier decisión.",
  },
  {
    title: "Técnologia",
    number: "3",
    image: "/images/maxi3.png",
    subtitle: "Procedimientos de vanguardia",
    text: "Empleamos técnicas de última generación diseñadas a medida para cada paciente. Nuestro enfoque combina precisión técnica con criterio estético para resultados naturales.",
  },
  {
    title: "Recuperación",
    number: "4",
    image: "/images/recuperacion.png",
    subtitle: "Cuidado integral post cirugía",
    text: "Contarás con un plan de seguimiento personalizado y asesoría continua. Nuestro equipo te acompaña en cada etapa para una recuperación óptima.",
  },
];

export default function CTAhome() {
  useEffect(() => {
    const leftSection = document.getElementById("left-section");
    if (!leftSection) return;

    const isMobile = () => window.innerWidth <= 768;
    let scrollTriggerInstance;

    const createScrollTrigger = () => {
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: leftSection,
        start: "top 12%",
        end: isMobile() ? "bottom+=5000% top" : "bottom+=300% top",
        pin: isMobile() ? false : true,
        pinSpacing: false,
        scrub: true,
        markers: false,
        anticipatePin: 1,
      });
    };

    createScrollTrigger();

    const handleResize = () => {
      createScrollTrigger();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "auto", md: "260vh" },
        marginTop: { xs: "0px", md: "0px" },
        overflowY: "scroll",
        overflowX: "hidden",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        flexDirection: { xs: "column", md: "row" },
        columnGap: { xs: "16px", md: "20px" },
        paddingInline: { xs: "18px", md: "70px" },
        paddingTop: { xs: "22px", md: 0 },
        paddingBottom: { xs: "44px", md: 0 },
        marginBottom: { xs: "6vh", md: "4vh" },
        backgroundColor: "#07111C",
      }}
    >
      <Box
        sx={{
          display: "block",
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          zIndex: 0,
          backgroundColor: "#050816",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(2, 4, 16, 0.28) 0%, rgba(2, 4, 16, 0.08) 38%, rgba(2, 4, 16, 0.34) 100%)",
            zIndex: 1,
            pointerEvents: "none",
          },
          "& .shader-frame": {
            position: "absolute",
            inset: 0,
            zIndex: 0,
          }
        }}
      >
        <Box className="shader-frame">
          <VideoBackground src="/videos/Background.mp4" />
        </Box>
      </Box>

      <Box
        sx={{
          marginTop: { xs: 0, md: "100px" },
          gridColumn: { xs: "1 / 13", md: "1 / 7" },
          gridRow: "1 / 1",
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          textAlign: "start",
          alignItems: "start",
          justifyContent: "start",
        }}
      >
        <Box
          sx={{
            display: "flex",  // Show on both mobile and desktop
            alignItems: "baseline",
            gap: "10px",
            mb: 2,
          }}
        >
          <Typography
            component="span"
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: { xs: "16px", md: "18px" },
              fontWeight: 600,
              color: "rgba(255,255,255,0.42)",
              lineHeight: 1,
            }}
          >
            03
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: { xs: "16px", md: "18px" },
              fontWeight: 500,
              textTransform: "uppercase",
              color: "rgba(245,247,251,0.92)",
              letterSpacing: "0.03em",
              lineHeight: 1,
            }}
          >
            Resultados
          </Typography>
        </Box>

        <div id="left-section" style={{ width: "100%" }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: { xs: 3, md: 0 },
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: { xs: "clamp(40px, 10vw, 48px)", md: "48px", xl: "70px" },
                fontWeight: 400,
                color: "#F5F7FB",
                lineHeight: { xs: 1.04, md: 1.1 },
                letterSpacing: { xs: "-1.6px", md: "-3px" },
                textAlign: "left",
                maxWidth: { xs: "90%", md: "unset" },
              }}
            >
              Diseñados para
              <Box component="span" sx={{ display: "block" }}>
                <Typography
                  component="span"
                  fontFamily="Poppins"
                  fontSize="inherit"
                  sx={{ color: "#5C9DFF", letterSpacing: "inherit" }}
                >
                  maximizar
                </Typography>
                {" "}tus
                <Box component="span" sx={{ display: "block" }}>
                  resultados
                </Box>
              </Box>
            </Typography>
          </Box>

          <Typography
            fontFamily="Poppins"
            fontSize={{ xs: "14px", md: "16px", xl: "16px" }}
            component="p"
            sx={{
              width: { xs: "76%", md: "80%" },
              marginTop: "20px",
              lineHeight: 1.22,
              color: "rgba(245,247,251,0.82)",
            }}
          >
            Tratamientos avanzados para procesos de recuperación más rápidos.
          </Typography>

          <Box sx={{ marginTop: "22px" }}>
            <BeamCTAButton
              to="/contacto"
              tone="light"
              sx={{
                minHeight: { xs: "42px", md: "44px" },
                px: { xs: 2.2, md: 2.5 },
                py: { xs: 1, md: 1.1 },
                fontSize: { xs: "13px", md: "14px" },
                fontWeight: 500,
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
          </Box>
        </div>
      </Box>

      <Box
        sx={{
          fontFamily: "Poppins",
          fontWeight: 200,
          display: "flex",
          gridColumn: { xs: "1 / 13", md: "8 / 13" },
          gridRow: { xs: "2 / 3", md: "1 / 1" },
          position: "relative",
          zIndex: 1,
          flexDirection: "column",
          height: "fit-content",
          justifyContent: "space-between",
          alignItems: { xs: "stretch", md: "flex-end" },
          flexWrap: "wrap",
          marginTop: { xs: "28px", md: "100px" },
        }}
      >
        {cards.map((card, index) => (
          <Box
            key={index}
            sx={{
              width: "100%",
              mb: { xs: 5, md: card.title === "Recuperación" ? 8 : 4 },
              mr: { xs: 0, md: 20 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: { xs: "auto", md: card.title === "Recuperación" ? "550px" : "450px" },
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ display: "flex", width: "100%", flexDirection: "column" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  borderTop: "1px solid rgba(255,255,255,0.16)",
                  pt: 2,
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#FFFFFF",
                    borderRadius: "50%",
                    width: { xs: 28, md: 30 },
                    height: { xs: 28, md: 30 },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    top: 15,
                    left: 0,
                  }}
                >
                  <Box sx={{ color: "#07111C", fontWeight: 700, fontSize: "14px" }}>
                    {card.number}
                  </Box>
                </Box>
                <Box
                  sx={{
                    ml: 4,
                    marginLeft: "40px",
                    fontSize: { xs: "1.35rem", md: "1.2rem" },
                    fontWeight: { xs: 400, md: 200 },
                    color: "#F5F7FB",
                    lineHeight: { xs: 1.3, md: 1.7 },
                  }}
                >
                  {card.title}
                </Box>
              </Box>

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  mt: { xs: 4, md: 3 },
                  mb: { xs: 4, md: card.title === "Recuperación" ? 2 : 4 },
                  height: { xs: "280px", md: card.title === "Recuperación" ? "320px" : "auto" },
                  borderRadius: 0,
                  overflow: "visible",
                  backgroundColor: "transparent",
                }}
              >
                <Box
                  component="img"
                  src={card.image}
                  alt={card.title}
                  sx={{
                    width: { xs: card.title === "Recuperación" ? "68%" : "58%", md: card.title === "Recuperación" ? "60%" : "50%" },
                    height: { xs: card.title === "Recuperación" ? "100%" : "300px", md: card.title === "Recuperación" ? "100%" : "300px" },
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ mt: { xs: 0, md: 4 }, width: { xs: "100%", md: "80%" } }}>
              <Box
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "18px", md: "18px", xl: "18px" },
                  color: "#F5F7FB",
                  lineHeight: 1.1,
                  textAlign: "start",
                }}
              >
                {card.subtitle}
              </Box>
              <Box
                sx={{
                  mt: 1,
                  fontSize: { xs: "0.88rem", md: "0.9rem" },
                  fontWeight: 500,
                  color: "rgba(245,247,251,0.74)",
                  lineHeight: { xs: 1.5, md: 1.5 },
                  textAlign: "start",
                }}
              >
                {card.text}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
