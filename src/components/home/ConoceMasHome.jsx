import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { styled } from "@mui/material/styles";

// Estilos para el borde animado
const AnimatedBorderBox = styled(Box)(({ theme }) => ({
  position: "relative",
  paddingBottom: "5px",
  cursor: "pointer",
  display: "inline-block",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "1px",
    backgroundColor: "#000000",
    transform: "translateX(0)",
    transition: "transform 0.4s ease",
    zIndex: 1
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "1px",
    backgroundColor: "#000000",
    transform: "translateX(-100%)",
    transition: "transform 0.4s ease",
    zIndex: 1
  },
  "&:hover::before": { transform: "translateX(100%)" },
  "&:hover::after": { transform: "translateX(0)" },
  "a:hover &::before": { transform: "translateX(100%)" },
  "a:hover &::after": { transform: "translateX(0)" }
}));

export default function ConoceMasHome() {
  // Texto para desktop - párrafo continuo
  const textDesktop = "El Dr. Guzmán Ripoll es cirujano plástico, especializado en cirugía mamaria estética y reconstructiva, con sede en Punta del Este.";

  // Texto para mobile - párrafo completo
  const textMobile = "El Dr. Guzmán Ripoll es cirujano plástico especializado en cirugía mamaria estética y reconstructiva, con sede en Punta del Este.";

  useEffect(() => {
    // Pin de la imagen hasta el párrafo con sangría
    const imageBox = document.getElementById("sticky-image");
    const targetParagraph = document.getElementById("main-paragraph");

    if (imageBox && targetParagraph && window.innerWidth > 768) {
      const scrollTriggerInstance = ScrollTrigger.create({
        trigger: imageBox,
        start: "top 120px",
        endTrigger: targetParagraph,
        end: "top 375px",
        pin: true,
        pinSpacing: false,
        markers: false,
        invalidateOnRefresh: true,
      });

      return () => {
        if (scrollTriggerInstance) scrollTriggerInstance.kill();
      };
    }
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 1,
        height: { xs: "auto", md: "150vh" },
        display: "grid",
        backgroundColor: "#F2F2F2",
        gridTemplateColumns: "repeat(12, 1fr)",
        marginInline: { xs: "20px", md: "70px" },
        columnGap: { xs: "16px", md: "20px" },
        "& > section": { gridColumn: "1 / -1" }
      }}
    >

      {/* Imagen izquierda pegada al margen - SOLO DESKTOP */}
      <Box
        id="sticky-image"
        sx={{
          mt: "20px",
          gridColumn: { xs: "3 / 7", md: "1 / 3" },
          gridRow: "1 / 3",
          display: { xs: "none", md: "flex" },
          alignItems: "start",
          justifyContent: "start",
          position: "relative",
          borderRadius: "8px",
          overflow: "hidden",
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "4 8px 6px 0 rgba(31, 38, 135, 0.37)",
          height: "35vh",
          zIndex: 10
        }}
      >
        <img
          src={"/images/Paper Texture@2160p.png"}
          alt="scroll"
          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
        />
      </Box>

      {/* 01 CLÍNICA + Párrafo - columna 7 - SOLO DESKTOP */}
      <Box
        sx={{
          mt: "20px",
          gridColumn: "7 / 11",
          gridRow: "1 / 2",
          display: { xs: "none", md: "block" }
        }}
      >
        <Box sx={{ display: "flex", alignItems: "baseline", gap: "10px", mb: 3 }}>
          <Typography component="span" sx={{ fontFamily: "Poppins, sans-serif", fontSize: "18px", fontWeight: 600, color: "rgba(0, 0, 0, 0.44)", lineHeight: 1 }}>
            01
          </Typography>
          <Typography color="#000000" fontFamily={"Poppins"} fontSize={"18px"} sx={{ textTransform: "uppercase", fontWeight: 500, letterSpacing: "0.0em", lineHeight: 1 }}>
            Clínica
          </Typography>
        </Box>
        <Typography sx={{ fontFamily: "Poppins", fontSize: "18px", fontWeight: 600, color: "rgb(0, 0, 0)", lineHeight: 1.2, textAlign: "left", mt: 0, height: "calc(40vh - 70px)", display: "flex", alignItems: "flex-end", pb: 1 }}>
          Como especialistas en cirugía mamaria, combinamos tecnología avanzada, experiencia médica y atención cercana para brindar una experiencia precisa, segura y humana en cada etapa del proceso.
        </Typography>
      </Box>

      {/* ========== DESKTOP LAYOUT ========== */}
      <Box
        sx={{
          gridColumn: { xs: "1 / -1", md: "1 / 13" },
          gridRow: "2 / 3",
          py: 8,
          display: { xs: "none", md: "block" }
        }}
      >
        <Typography
          id="main-paragraph"
          sx={{
            fontFamily: "Poppins",
            fontSize: { md: "42px", lg: "74px" },
            fontWeight: 500,
            lineHeight: 1,
            color: "#000000",
            textAlign: "left",
            textIndent: "calc((100% / 12) * 3)",
            mt: 10,
            mb: 6
          }}
        >
          {textDesktop}
        </Typography>

        <Box sx={{ mt: 16, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", columnGap: "20px", width: "100%", alignItems: "start" }}>
          <Box sx={{ gridColumn: "4 / 6", fontFamily: "Poppins", fontSize: "22px", fontWeight: 600, color: "#000", textAlign: "left", alignSelf: "start", pt: 0.5 }}>
            <Typography sx={{ fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit", color: "inherit", lineHeight: 1.2 }}>Cirugía plástica</Typography>
            <Typography sx={{ fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit", color: "inherit", lineHeight: 1.2 }}>y estética</Typography>
          </Box>
          <Typography sx={{ gridColumn: "7 / 11", fontFamily: "Poppins", fontSize: "18px", fontWeight: 600, color: "#000", lineHeight: 1.2, textAlign: "left", alignSelf: "start" }}>
            Nuestra práctica abarca un amplio rango de procedimientos, desde intervenciones no quirúrgicas hasta procesos altamente especializados. Lo que nos distingue es nuestro enfoque humano: priorizamos el acompañamiento cercano y el cuidado integral durante todo el proceso.
          </Typography>
        </Box>
      </Box>

      {/* ========== MOBILE LAYOUT ========== */}
      <Box
        sx={{
          gridColumn: "1 / -1",
          gridRow: "2 / 3",
          py: 4,
          display: { xs: "block", md: "none" }
        }}
      >
        <Box sx={{ display: "flex", alignItems: "baseline", gap: "10px", mb: 5 }}>
          <Typography component="span" sx={{ fontFamily: "Poppins, sans-serif", fontSize: "16px", fontWeight: 500, color: "rgba(0,0,0,0.2)", lineHeight: 1 }}>01</Typography>
          <Typography component="span" sx={{ fontFamily: "Poppins", fontSize: "16px", fontWeight: 500, textTransform: "uppercase", color: "#000000", letterSpacing: "0.03em", lineHeight: 1 }}>Clínica</Typography>
        </Box>
        <Typography sx={{ fontFamily: "Poppins", fontSize: "16px", fontWeight: 600, color: "rgba(0,0,0,0.85)", lineHeight: 1.1, textAlign: "left", mb: 6 }}>
          Como especialistas en cirugía mamaria, combinamos precisión médica, innovación tecnológica y un acompañamiento cercano en cada etapa del proceso.
        </Typography>
        <Box sx={{ width: "100%", aspectRatio: "1/1", borderRadius: "10px", overflow: "hidden", mb: 8 }}>
          <img src={"/images/Paper Texture@2160p.png"} alt="scroll" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Box>
        <Typography sx={{ fontFamily: "Poppins", fontSize: "36px", fontWeight: 500, lineHeight: 1.1, color: "#000000", textAlign: "left", mb: 5 }}>
          {textMobile}
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Typography sx={{ fontFamily: "Poppins", fontSize: "18px", fontWeight: 600, color: "#000", mb: 2, textAlign: "left" }}>Cirugía plástica y estética</Typography>
          <Typography sx={{ fontFamily: "Poppins", fontSize: "16px", fontWeight: 600, color: "#000", lineHeight: 1.1, textAlign: "left" }}>
            Nuestra práctica abarca un amplio rango de procedimientos, desde intervenciones no quirúrgicas hasta procesos altamente especializados. Lo que nos distingue es nuestro enfoque humano: priorizamos el acompañamiento cercano y el cuidado integral durante todo el proceso.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
