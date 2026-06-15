"use client";

import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { useLenis } from "lenis/dist/lenis-react";
import Footer from "../components/UI/Footer";

// ───────────────────────────────────────────────────────────
// Estudios del cirujano. Contenido placeholder hasta tener los reales.
// ───────────────────────────────────────────────────────────
const STUDIES = [
  {
    id: "estudio-01",
    index: "01",
    short: "Aumento mamario",
    title: "Resultados a largo plazo en aumento mamario con implantes de gel cohesivo",
    meta: ["Dr. Guzmán Ripoll", "En preparación"],
    tags: ["Cirugía mamaria", "Implantes"],
    abstract:
      "Estudio observacional sobre la estabilidad de resultados, tasa de complicaciones y satisfacción de las pacientes a largo plazo en el aumento mamario con implantes de gel cohesivo de alta densidad.",
  },
  {
    id: "estudio-02",
    index: "02",
    short: "Mastopexia",
    title: "Mastopexia con pedículo superomedial: técnica y serie de casos",
    meta: ["Dr. Guzmán Ripoll", "En preparación"],
    tags: ["Cirugía mamaria", "Técnica"],
    abstract:
      "Descripción técnica y análisis de resultados estéticos y de cicatrización en mastopexia con pedículo superomedial, evaluando proyección, simetría y preservación de la sensibilidad.",
  },
  {
    id: "estudio-03",
    index: "03",
    short: "Reconstrucción",
    title: "Reconstrucción mamaria post-mastectomía: enfoque reconstructivo integral",
    meta: ["Dr. Guzmán Ripoll", "En preparación"],
    tags: ["Reconstructiva", "Oncoplastia"],
    abstract:
      "Revisión del abordaje reconstructivo tras mastectomía, con énfasis en la planificación por etapas, la elección de técnica y el acompañamiento integral de la paciente.",
  },
  {
    id: "estudio-04",
    index: "04",
    short: "Lipoescultura VASER",
    title: "Lipoescultura VASER de alta definición: seguridad y resultados",
    meta: ["Dr. Guzmán Ripoll", "En preparación"],
    tags: ["Contorno corporal", "VASER"],
    abstract:
      "Evaluación de seguridad, tiempos de recuperación y definición corporal obtenida con tecnología VASER en procedimientos de contorno corporal de alta definición.",
  },
  {
    id: "estudio-05",
    index: "05",
    short: "Mommy makeover",
    title: "Mommy makeover: abordaje combinado y protocolo de recuperación",
    meta: ["Dr. Guzmán Ripoll", "En preparación"],
    tags: ["Combinado", "Recuperación"],
    abstract:
      "Análisis del abordaje quirúrgico combinado de mama y abdomen en un único tiempo operatorio, y su impacto sobre la recuperación y los resultados globales.",
  },
  {
    id: "estudio-06",
    index: "06",
    short: "Tecnología Morpheus8",
    title: "Morpheus8 y BodyTite en remodelación corporal mínimamente invasiva",
    meta: ["Dr. Guzmán Ripoll", "En preparación"],
    tags: ["Tecnología", "Mínimamente invasivo"],
    abstract:
      "Estudio sobre la aplicación de radiofrecuencia con Morpheus8 y BodyTite para el tensado cutáneo y la remodelación corporal mínimamente invasiva.",
  },
];

const FONT = "'Poppins', sans-serif";
const INK = "#0A0A0A";
const MUTE = "rgba(10,10,10,0.52)";
const LINE = "rgba(10,10,10,0.12)";
const ACCENT = "#0081C7";

export default function Research() {
  const [activeId, setActiveId] = useState(STUDIES[0].id);
  const lenis = useLenis();
  const sectionRefs = useRef({});

  // Scroll-spy: marca el estudio visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: -130, duration: 1.1 });
    } else {
      const y = el.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <Box sx={{ backgroundColor: "#F2F2F2", color: INK, width: "100%", overflowX: "clip" }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          px: { xs: "20px", md: "70px" },
          pt: { xs: "120px", md: "180px" },
          pb: { xs: "80px", md: "160px" },
        }}
      >
        {/* ── Sidebar fijo on-scroll (estilo poolside) ── */}
        <Box
          component="nav"
          aria-label="Índice de estudios"
          sx={{
            display: { xs: "none", md: "block" },
            position: "fixed",
            top: "180px",
            left: "70px",
            width: "220px",
            zIndex: 5,
          }}
        >
          <Box
            sx={{
              fontFamily: FONT,
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: MUTE,
              mb: "22px",
            }}
          >
            Research
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {STUDIES.map((s) => {
              const isActive = activeId === s.id;
              return (
                <Box
                  key={s.id}
                  component="button"
                  onClick={() => scrollTo(s.id)}
                  sx={{
                    appearance: "none",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "baseline",
                    gap: "12px",
                    py: "9px",
                    pl: "14px",
                    position: "relative",
                    fontFamily: FONT,
                    transition: "color 0.25s ease",
                    color: isActive ? INK : MUTE,
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "2px",
                      height: isActive ? "16px" : "0px",
                      backgroundColor: ACCENT,
                      transition: "height 0.25s ease",
                    },
                    "&:hover": { color: INK },
                  }}
                >
                  <Box component="span" sx={{ fontSize: "11px", fontWeight: 600, color: isActive ? ACCENT : MUTE, letterSpacing: "0.04em", minWidth: "16px" }}>
                    {s.index}
                  </Box>
                  <Box component="span" sx={{ fontSize: "14px", fontWeight: isActive ? 600 : 500, letterSpacing: "-0.01em", lineHeight: 1.3 }}>
                    {s.short}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* ── Documento ── */}
        <Box
          component="main"
          sx={{
            minWidth: 0,
            ml: { xs: 0, md: "320px" },
            maxWidth: { xs: "100%", md: "760px" },
          }}
        >
          {/* Encabezado editorial */}
          <Box sx={{ mb: { xs: "44px", md: "64px" } }}>
            <Box
              sx={{
                fontFamily: FONT,
                fontSize: { xs: "12px", md: "13px" },
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: MUTE,
                mb: { xs: "20px", md: "28px" },
              }}
            >
              (04) — Investigación
            </Box>
            <Box
              component="h1"
              sx={{
                fontFamily: FONT,
                fontSize: { xs: "clamp(40px, 11vw, 52px)", md: "clamp(56px, 5vw, 76px)" },
                fontWeight: 500,
                letterSpacing: "-0.04em",
                lineHeight: 1.02,
                m: 0,
                mb: { xs: "24px", md: "32px" },
              }}
            >
              Research
            </Box>
            <Box
              component="p"
              sx={{
                fontFamily: FONT,
                fontSize: { xs: "16px", md: "19px" },
                fontWeight: 400,
                lineHeight: 1.6,
                color: "rgba(10,10,10,0.66)",
                m: 0,
                letterSpacing: "-0.01em",
              }}
            >
              Publicaciones, estudios y trabajos de investigación del Dr. Guzmán Ripoll en cirugía
              plástica, estética y reconstructiva. Una colección viva que crece con cada nueva
              contribución a la especialidad.
            </Box>
          </Box>

          {/* Línea divisoria editorial */}
          <Box sx={{ height: "1px", width: "100%", backgroundColor: LINE, maxWidth: "760px" }} />

          {/* Estudios */}
          {STUDIES.map((s, i) => (
            <Box
              key={s.id}
              id={s.id}
              ref={(el) => (sectionRefs.current[s.id] = el)}
              component="article"
              sx={{
                maxWidth: "760px",
                pt: { xs: "48px", md: "64px" },
                pb: { xs: "48px", md: "64px" },
                borderTop: i === 0 ? "none" : `1px solid ${LINE}`,
                scrollMarginTop: "130px",
              }}
            >
              {/* Meta superior */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontFamily: FONT,
                  fontSize: { xs: "12px", md: "13px" },
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: MUTE,
                  mb: { xs: "20px", md: "24px" },
                }}
              >
                <Box component="span" sx={{ color: ACCENT }}>//{s.index}</Box>
                <Box component="span" sx={{ width: "1px", height: "12px", backgroundColor: LINE }} />
                <Box component="span">{s.meta.join(" · ")}</Box>
              </Box>

              {/* Título */}
              <Box
                component="h2"
                sx={{
                  fontFamily: FONT,
                  fontSize: { xs: "clamp(26px, 6.4vw, 30px)", md: "clamp(30px, 2.6vw, 40px)" },
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.12,
                  m: 0,
                  mb: { xs: "20px", md: "26px" },
                }}
              >
                {s.title}
              </Box>

              {/* Abstract */}
              <Box
                component="p"
                sx={{
                  fontFamily: FONT,
                  fontSize: { xs: "16px", md: "17px" },
                  fontWeight: 400,
                  lineHeight: 1.72,
                  color: "rgba(10,10,10,0.72)",
                  m: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                {s.abstract}
              </Box>

              {/* Tags */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px", mt: { xs: "26px", md: "32px" } }}>
                {s.tags.map((t) => (
                  <Box
                    key={t}
                    sx={{
                      fontFamily: FONT,
                      fontSize: "12px",
                      fontWeight: 500,
                      letterSpacing: "0.01em",
                      color: "rgba(10,10,10,0.6)",
                      border: `1px solid ${LINE}`,
                      borderRadius: "999px",
                      px: "14px",
                      py: "6px",
                    }}
                  >
                    {t}
                  </Box>
                ))}
              </Box>

              {/* Estado: documento en preparación */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  mt: { xs: "28px", md: "34px" },
                  fontFamily: FONT,
                  fontSize: "13px",
                  fontWeight: 500,
                  color: MUTE,
                }}
              >
                <Box sx={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: ACCENT }} />
                Documento completo próximamente
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
