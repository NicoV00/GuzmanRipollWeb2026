import { Box, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { styled } from "@mui/material/styles";

gsap.registerPlugin(ScrollTrigger);

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
  const rootRef = useRef(null);

  // Texto para desktop - párrafo continuo
  const textDesktop = "El Dr. Guzmán Ripoll es cirujano plástico, especializado en cirugía mamaria estética y reconstructiva, con sede en Punta del Este.";

  // Texto para mobile - párrafo completo
  const textMobile = "El Dr. Guzmán Ripoll es cirujano plástico especializado en cirugía mamaria estética y reconstructiva, con sede en Punta del Este.";

  // Reveal por líneas (mismo efecto de máscara que el hero/contacto):
  // cada línea entra desde abajo dentro de su propia línea, al scrollear.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let splits = [];
    let tweens = [];
    let cancelled = false;

    const run = () => {
      if (cancelled) return;

      root.querySelectorAll("[data-line-reveal]").forEach((el) => {
        // Ignora la copia oculta del layout (desktop vs mobile)
        if (el.offsetParent === null) return;

        // text-indent del párrafo grande: al partir en líneas-bloque lo
        // heredarían todas; se preserva solo en la primera.
        const indent = window.getComputedStyle(el).textIndent;
        const split = new SplitType(el, { types: "lines" });
        splits.push(split);
        if (indent && indent !== "0px" && split.lines.length) {
          el.style.textIndent = "0";
          split.lines[0].style.textIndent = indent;
        }

        // Máscara por línea para que entren "dentro de su propia línea"
        split.lines.forEach((line) => {
          const mask = document.createElement("div");
          mask.style.overflow = "hidden";
          mask.style.display = "block";
          line.parentNode.insertBefore(mask, line);
          mask.appendChild(line);
        });

        gsap.set(split.lines, { yPercent: 115 });
        tweens.push(
          gsap.to(split.lines, {
            yPercent: 0,
            duration: 1.05,
            ease: "power4.out",
            stagger: 0.09,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          })
        );
      });

      root.querySelectorAll("[data-fade-reveal]").forEach((el) => {
        if (el.offsetParent === null) return;
        tweens.push(
          gsap.fromTo(
            el,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            }
          )
        );
      });

      ScrollTrigger.refresh();
    };

    // Espera a que carguen las fuentes para que el corte de líneas sea el real
    const timer = setTimeout(() => {
      if (document.fonts?.ready) document.fonts.ready.then(run);
      else run();
    }, 100);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      tweens.forEach((tw) => {
        tw.scrollTrigger?.kill();
        tw.kill();
      });
      splits.forEach((s) => s.revert());
    };
  }, []);

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
      ref={rootRef}
      sx={{
        position: "relative",
        zIndex: 1,
        height: { xs: "auto", md: "150vh" },
        display: "grid",
        backgroundColor: "#FAFFFF",
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
        <Box data-fade-reveal sx={{ display: "flex", alignItems: "baseline", gap: "10px", mb: 3 }}>
          <Typography component="span" sx={{ fontFamily: "Poppins, sans-serif", fontSize: "18px", fontWeight: 600, color: "rgba(0, 0, 0, 0.44)", lineHeight: 1 }}>
            01
          </Typography>
          <Typography color="#000000" fontFamily={"Poppins"} fontSize={"18px"} sx={{ textTransform: "uppercase", fontWeight: 500, letterSpacing: "0.0em", lineHeight: 1 }}>
            Clínica
          </Typography>
        </Box>
        <Typography component="div" sx={{ fontFamily: "Poppins", fontSize: "18px", fontWeight: 600, color: "rgb(0, 0, 0)", lineHeight: 1.2, textAlign: "left", mt: 0, height: "calc(40vh - 70px)", display: "flex", alignItems: "flex-end", pb: 1 }}>
          {/* Span en bloque: el split por líneas no puede vivir directo en un flex */}
          <Box component="span" data-line-reveal sx={{ display: "block" }}>
            Como especialistas en cirugía mamaria, combinamos tecnología avanzada, experiencia médica y atención cercana para brindar una experiencia precisa, segura y humana en cada etapa del proceso.
          </Box>
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
          data-line-reveal
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
            <Typography data-line-reveal sx={{ fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit", color: "inherit", lineHeight: 1.2 }}>Cirugía plástica</Typography>
            <Typography data-line-reveal sx={{ fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit", color: "inherit", lineHeight: 1.2 }}>y estética</Typography>
          </Box>
          <Typography data-line-reveal sx={{ gridColumn: "7 / 11", fontFamily: "Poppins", fontSize: "18px", fontWeight: 600, color: "#000", lineHeight: 1.2, textAlign: "left", alignSelf: "start" }}>
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
        <Box data-fade-reveal sx={{ display: "flex", alignItems: "baseline", gap: "10px", mb: 5 }}>
          <Typography component="span" sx={{ fontFamily: "Poppins, sans-serif", fontSize: "16px", fontWeight: 500, color: "rgba(0,0,0,0.2)", lineHeight: 1 }}>01</Typography>
          <Typography component="span" sx={{ fontFamily: "Poppins", fontSize: "16px", fontWeight: 500, textTransform: "uppercase", color: "#000000", letterSpacing: "0.03em", lineHeight: 1 }}>Clínica</Typography>
        </Box>
        <Typography data-line-reveal sx={{ fontFamily: "Poppins", fontSize: "16px", fontWeight: 600, color: "rgba(0,0,0,0.85)", lineHeight: 1.1, textAlign: "left", mb: 6 }}>
          Como especialistas en cirugía mamaria, combinamos precisión médica, innovación tecnológica y un acompañamiento cercano en cada etapa del proceso.
        </Typography>
        <Box sx={{ width: "100%", aspectRatio: "1/1", borderRadius: "10px", overflow: "hidden", mb: 8 }}>
          <img src={"/images/Paper Texture@2160p.png"} alt="scroll" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Box>
        <Typography data-line-reveal sx={{ fontFamily: "Poppins", fontSize: { xs: "28px", sm: "34px" }, fontWeight: 500, lineHeight: 1.08, letterSpacing: "-0.055em", color: "#000000", textAlign: "left", width: { xs: "calc(100% + 16px)", sm: "100%" }, maxWidth: "100vw", mb: 4 }}>
          {textMobile}
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Typography data-line-reveal sx={{ fontFamily: "Poppins", fontSize: "18px", fontWeight: 600, color: "#000", mb: 2, textAlign: "left" }}>Cirugía plástica y estética</Typography>
          <Typography data-line-reveal sx={{ fontFamily: "Poppins", fontSize: "16px", fontWeight: 600, color: "#000", lineHeight: 1.1, textAlign: "left" }}>
            Nuestra práctica abarca un amplio rango de procedimientos, desde intervenciones no quirúrgicas hasta procesos altamente especializados. Lo que nos distingue es nuestro enfoque humano: priorizamos el acompañamiento cercano y el cuidado integral durante todo el proceso.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
