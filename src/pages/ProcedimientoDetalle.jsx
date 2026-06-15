"use client"

import React, { useRef, useLayoutEffect } from "react"
import { useParams, Link as RouterLink } from "react-router-dom"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Box, Typography } from "@mui/material"
import { Sparkles, ShieldCheck, HeartPulse, Users, Cpu, Check } from "lucide-react"

import Footer from "../components/UI/Footer"
import ProcessSteps from "../components/procedimientos/ProcessSteps.tsx"
import BeforeAfterSlider from "../components/procedimientos/BeforeAfterSlider"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// ─── Data ────────────────────────────────────────────────
const procedimientosData = {
  "01": {
    number: "01",
    title: "Cirugía Mamaria",
    subtitle: "Aumento, Reducción & Reconstrucción",
    category: "Especialización Principal",
    imageSrc: "/images/implantes.png",
    secondaryImageSrc: "/images/implantes2.jpg",
    catchPhrase: "Procedimientos seguros y personalizados para lograr resultados naturales y armoniosos.",
    description: "La cirugía mamaria es una decisión médica importante. Por eso, requiere información clara y una evaluación responsable.",
    filosofia: "Cada paciente es distinta. La planificación y el criterio médico son parte fundamental del proceso. La información, el acompañamiento y el seguimiento forman parte del tratamiento.",
    objetivo: "Aumento de tamaño mamario, corrección de deformidades, asimetrías, malformaciones congénitas.",
    specs: {
      tipo: "Ambulatoria",
      lugar: "Block quirúrgico",
      anestesia: "General",
      duracion: "90 minutos"
    },
    tecnica: "Es variable según la paciente y las expectativas de la misma. Existen diferentes vías de abordaje (submamario, periareolar), y diferentes planos donde se coloca el implante (retroglandular, submuscular, subfascial, dual plane). Puede asociarse a levantamiento o pexia mamaria de ser necesario. Contamos con tecnología Crisalix para previsualización 3D, permitiéndote ver los posibles resultados antes de la cirugía.",
    recuperacion: "Reposo laboral por 7 días con retorno progresivo a las actividades, pudiendo realizar deporte al mes de la cirugía.",
    subprocedimientos: [
      { name: "Pexia Mamaria", description: "Levantamiento del tejido mamario descendido." },
      { name: "Reducción Mamaria", description: "Disminución del volumen excesivo para aliviar molestias." },
      { name: "Ginecomastia", description: "Corrección del desarrollo mamario en hombres." },
      { name: "Reconstrucción", description: "Restauración de volumen y forma post-mastectomía. Previsualización Crisalix disponible." }
    ]
  },
  "02": {
    number: "02",
    title: "Lipoescultura VASER",
    subtitle: "BodyTite & Morpheus8",
    category: "Contorno Corporal",
    imageSrc: "/images/imagen5.jpg",
    catchPhrase: "Tecnología de vanguardia para remodelación corporal avanzada con resultados inmediatos.",
    description: "Tecnología avanzada de remodelación corporal que combina BodyTite (radiofrequencia asistida) con Morpheus8 para contornear y definir tu figura ideal con mínima invasión y máximos resultados.",
    objetivo: "Remodelación corporal avanzada, eliminación de grasa localizada y tensado de piel simultáneo.",
    specs: {
      tipo: "Ambulatoria",
      lugar: "Block quirúrgico",
      anestesia: "Local / General",
      duracion: "2-3 horas"
    },
    tecnica: "BodyTite utiliza radiofrequencia asistida para licuar la grasa mientras tensa la piel simultáneamente. Morpheus8 combina microagujas con radiofrequencia.",
    recuperacion: "Reposo laboral de 7-10 días. Resultados visibles inmediatos que mejoran por 6 meses.",
    subprocedimientos: [
      { name: "BodyTite RFAL", description: "Liposucción asistida por radiofrecuencia para tensado." },
      { name: "Morpheus8", description: "Tratamiento fraccionado profundo para remodelación dérmica." }
    ]
  },
  "03": {
    number: "03",
    title: "Rinoplastia",
    subtitle: "Estética & Funcional",
    category: "Cirugía Facial",
    imageSrc: "/images/imagen4.jpg",
    catchPhrase: "Armonía facial perfecta mediante técnicas quirúrgicas precisas y resultados naturales.",
    description: "La rinoplastia es un procedimiento quirúrgico diseñado para mejorar la forma y función de la nariz, logrando armonía con las demás características faciales.",
    objetivo: "Corrección estética y funcional de la nariz, mejora de la armonía facial.",
    specs: {
      tipo: "Ambulatoria",
      lugar: "Block quirúrgico",
      anestesia: "General",
      duracion: "2-3 horas"
    },
    tecnica: "Técnica abierta o cerrada según el caso, con remodelación de estructuras óseas y cartilaginosas.",
    recuperacion: "Férula nasal por 7-10 días. Inflamación inicial disminuye en 2-3 semanas."
  },
  "04": {
    number: "04",
    title: "Abdominoplastia",
    subtitle: "Remodelación Completa",
    category: "Contorno Corporal",
    imageSrc: "/images/imagen4.jpg",
    catchPhrase: "Recupera tu silueta ideal con procedimientos avanzados de tensado.",
    description: "La abdominoplastia es un procedimiento integral que elimina el exceso de piel y grasa abdominal, repara la musculatura y redefine el contorno.",
    objetivo: "Eliminación de exceso de piel, corrección de diástasis, mejora del contorno.",
    specs: {
      tipo: "Internación 24h",
      lugar: "Block quirúrgico",
      anestesia: "General",
      duracion: "3-4 horas"
    },
    tecnica: "Incisión horizontal baja, eliminación de exceso de piel y grasa, reparación muscular.",
    recuperacion: "Reposo relativo por 2 semanas. Uso de faja compresiva por 6-8 semanas."
  },
  "05": {
    number: "05",
    title: "Blefaroplastia",
    subtitle: "Rejuvenecimiento Facial",
    category: "Cirugía Facial",
    imageSrc: "/images/imagen4.jpg",
    catchPhrase: "Revitaliza tu expresión con procedimientos que devuelven juventud.",
    description: "La blefaroplastia elimina el exceso de piel y grasa en los párpados, reduciendo bolsas y flacidez para lograr una mirada más juvenil.",
    objetivo: "Rejuvenecimiento periocular, eliminación de bolsas y exceso de piel.",
    specs: {
      tipo: "Ambulatoria",
      lugar: "Block quirúrgico",
      anestesia: "Local / Sedación",
      duracion: "1-2 horas"
    },
    tecnica: "Incisiones ocultas en pliegues naturales. Eliminación de exceso de piel y grasa.",
    recuperacion: "Hematomas desaparecen en 7-10 días. Resultado definitivo en 2-3 meses."
  },
  "06": {
    number: "06",
    title: "Tratamientos Faciales",
    subtitle: "INDIBA & DEKA DuoGlide",
    category: "Medicina Estética Facial",
    imageSrc: "/images/image.png",
    catchPhrase: "Regeneración y resurfacing facial sin cirugía, combinando lo mejor de INDIBA y DEKA DuoGlide.",
    description: "¿Sabías que también podemos usar DEKA DuoGlide para tratamientos faciales? INDIBA trabaja desde la regeneración, mientras que DuoGlide actúa de forma más intensa sobre la corrección de la piel.",
    specs: {
      tipo: "Ambulatorio",
      lugar: "Consultorio",
      anestesia: "Tópica / No requiere",
      duracion: "30–60 minutos"
    },
    comparativa: {
      indiba: {
        title: "INDIBA → Regenerar y reafirmar",
        items: ["Estimula colágeno", "Mejora firmeza y luminosidad", "Desinflama", "Mejora la calidad de piel", "Sin downtime"]
      },
      duoglide: {
        title: "DUOGlide → Renovar y corregir",
        items: ["Manchas", "Textura", "Poros", "Cicatrices", "Arrugas y resurfacing"]
      }
    },
    tecnica: "Combinamos INDIBA (radiofrecuencia regenerativa) con el láser DEKA DuoGlide para abordar tanto la regeneración profunda como la corrección de la superficie de la piel, adaptando el protocolo a cada paciente.",
    recuperacion: "INDIBA no requiere downtime. Con DuoGlide puede haber un enrojecimiento leve y transitorio según la intensidad del resurfacing."
  }
}

const allProcedures = Object.values(procedimientosData)

const benefitsData = [
  { title: "Resultados Naturales", description: "Utilizamos técnicas quirúrgicas avanzadas orientadas a lograr resultados armoniosos y proporcionados. Cada procedimiento se planifica con precisión para respetar la anatomía y las expectativas del paciente." },
  { title: "Seguridad Certificada", description: "Todos los procedimientos se realizan bajo los más altos estándares de calidad y seguridad. Contamos con protocolos estrictos, equipamiento de última generación e instalaciones habilitadas." },
  { title: "Recuperación Optimizada", description: "Diseñamos protocolos de recuperación personalizados para cada paciente. El seguimiento postoperatorio continuo permite una vuelta a las actividades de forma segura y cómoda." },
  { title: "Atención Personalizada", description: "Cada procedimiento es único porque cada paciente lo es. Desde la primera consulta adaptamos el plan quirúrgico a tus objetivos, contexto y expectativas reales." },
  { title: "Tecnología de Vanguardia", description: "Incorporamos equipamiento de última generación para elevar la precisión y los resultados de cada intervención quirúrgica personalizada." }
]

export default function ProcedimientoDetalle() {
  const { id } = useParams()
  const containerRef = useRef(null)
  const heroImageRef = useRef(null)

  const procedimiento = procedimientosData[id] || procedimientosData["01"]

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    const ctx = gsap.context(() => {
      if (heroImageRef.current) {
        gsap.fromTo(heroImageRef.current,
          { clipPath: "inset(25% 20% 25% 20%)", scale: 1.1 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: 1.5,
            ease: "power3.inOut",
            delay: 0.1
          }
        )
      }

      gsap.fromTo(".hero-text-reveal",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.5 }
      )

      // Benefits cards staggered entrance
      gsap.fromTo(".benefit-card",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power3.out",
          scrollTrigger: {
            trigger: ".benefits-grid",
            start: "top 85%",
          }
        }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [id])

  if (!procedimiento) return <Box>No encontrado</Box>

  return (
    <Box ref={containerRef} sx={{ backgroundColor: "#F2F2F2", minHeight: "100vh" }}>

      {/* ─── HERO SECTION ──────────────────────── */}
      <Box sx={{
        pt: { xs: 15, md: 20 },
        pb: { xs: 6, md: 8 },
        px: { xs: "20px", md: "70px" },
      }}>
        {/* ─── Procedure Nav (Clean Pills) ─────── */}
        <Box className="hero-text-reveal" sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: { xs: "8px", md: "10px" },
          mb: { xs: 5, md: 6 },
        }}>
          {allProcedures.map((proc) => (
            <Box
              key={proc.number}
              component={RouterLink}
              to={`/procedimiento/${proc.number}`}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                px: { xs: "12px", md: "16px" },
                py: { xs: "6px", md: "8px" },
                borderRadius: "10px",
                backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)",
                borderTop: "1px solid",
                borderLeft: "1px solid",
                borderRight: "1px solid",
                borderBottom: "1px solid",
                borderTopColor: proc.number === id ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.8)",
                borderLeftColor: proc.number === id ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.6)",
                borderRightColor: proc.number === id ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.3)",
                borderBottomColor: proc.number === id ? "rgba(255, 255, 255, 0.02)" : "rgba(255, 255, 255, 0.2)",
                boxShadow: proc.number === id ? "0 4px 16px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.15)" : "0 4px 12px rgba(0,0,0,0.02), inset 0 1px 0 rgba(255,255,255,0.6)",
                background: proc.number === id ? "linear-gradient(135deg, rgba(18, 20, 24, 0.9), rgba(30, 32, 38, 0.8))" : "rgba(255, 255, 255, 0.65)",
                textDecoration: "none",
                fontFamily: "Poppins, sans-serif",
                fontSize: { xs: "12px", md: "13px" },
                fontWeight: proc.number === id ? 600 : 500,
                color: proc.number === id ? "#fff" : "#111",
                letterSpacing: "-0.01em",
                transition: "all 0.25s ease",
                "&:hover": {
                  background: proc.number === id ? "linear-gradient(135deg, rgba(28, 30, 34, 0.95), rgba(40, 42, 48, 0.85))" : "rgba(255, 255, 255, 0.95)",
                  transform: "translateY(-1px)"
                },
                "&:active": {
                  transform: "translateY(0)"
                }
              }}
            >
              {proc.title}
            </Box>
          ))}
        </Box>

        {/* Number & Category */}
        <Box sx={{ display: "flex", alignItems: "baseline", gap: 2, mb: 4 }} className="hero-text-reveal">
          <Typography sx={{
            fontFamily: "Poppins", fontSize: "16px", fontWeight: 600, color: "rgba(0,0,0,0.4)"
          }}>
            ({procedimiento.number})
          </Typography>
          <Typography sx={{
            fontFamily: "Poppins", fontSize: "16px", fontWeight: 600, color: "#111", textTransform: "uppercase", letterSpacing: "0.05em"
          }}>
            {procedimiento.category}
          </Typography>
        </Box>

        {/* Title */}
        <Typography variant="h1" className="hero-text-reveal" sx={{
          fontFamily: "Poppins",
          fontSize: { xs: "48px", md: "80px", lg: "96px" },
          fontWeight: 500,
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          color: "#111",
          maxWidth: "1200px",
          textAlign: "left",
          mb: 4
        }}>
          {procedimiento.title}
        </Typography>

        {/* Subtitle / Catchphrase */}
        <Typography className="hero-text-reveal" sx={{
          fontFamily: "Poppins",
          fontSize: { xs: "20px", md: "28px" },
          fontWeight: 400,
          color: "rgba(0,0,0,0.7)",
          maxWidth: "800px",
          lineHeight: 1.4,
          textAlign: "left",
        }}>
          {procedimiento.catchPhrase}
        </Typography>
      </Box>

      {/* ─── MAIN CONTENT GRID ─────────────────── */}
      <Box sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" },
        gap: { xs: 6, md: 4 },
        px: { xs: "20px", md: "70px" },
        pb: { xs: 10, md: 15 }
      }}>
        {/* Left Column: Image (Sticky + Reveal Animation) */}
        <Box sx={{
          gridColumn: { xs: "1 / -1", md: "1 / 7" },
          position: { md: "sticky" },
          top: "140px",
          alignSelf: "start",
          height: { xs: "320px", md: "50vh" },
          borderRadius: "12px",
          overflow: "hidden"
        }}>
          <Box sx={{
            width: "100%",
            height: "100%"
          }}>
            <Box
              ref={heroImageRef}
              component="img"
              src={procedimiento.imageSrc}
              alt={procedimiento.title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                clipPath: "inset(25% 20% 25% 20%)",
                transform: "scale(1.1)"
              }}
            />
          </Box>
        </Box>

        {/* Right Column: Details */}
        <Box sx={{
          gridColumn: { xs: "1 / -1", md: "8 / 13" },
          display: "flex",
          flexDirection: "column",
          gap: 5,
          pt: { md: 4 }
        }}>

          {/* Specs Grid — oculto en Cirugía Mamaria (id "01") porque agrupa todos los procesos */}
          {id !== "01" && (
            <Box sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px 16px",
              borderBottom: "1px solid rgba(0,0,0,0.1)",
              pb: 6
            }}>
              {Object.entries(procedimiento.specs).map(([key, value]) => (
                <Box key={key}>
                  <Typography sx={{
                    fontFamily: "Poppins", fontSize: "12px", textTransform: "uppercase",
                    color: "rgba(0,0,0,0.4)", fontWeight: 600, letterSpacing: "0.05em", mb: 0.5,
                    textAlign: "left",
                  }}>
                    {key}
                  </Typography>
                  <Typography sx={{
                    fontFamily: "Poppins", fontSize: "15px", color: "#111", fontWeight: 500,
                    textAlign: "left",
                  }}>
                    {value}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          {/* Description */}
          <Box>
            <Typography variant="h3" sx={{
              fontFamily: "Poppins", fontSize: { xs: "16px", md: "18px" }, fontWeight: 600, mb: 1.5, textAlign: "left",
            }}>
              Sobre el procedimiento
            </Typography>
            <Typography sx={{
              fontFamily: "Poppins", fontSize: { xs: "15px", md: "16px" }, lineHeight: 1.8, color: "rgba(0,0,0,0.7)", textAlign: "left",
            }}>
              {procedimiento.description}
            </Typography>
          </Box>

          {/* Comparativa INDIBA / DUOGLIDE (solo Tratamientos Faciales) */}
          {procedimiento.comparativa && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[
                { c: procedimiento.comparativa.indiba, bg: "#ffffff" },
                { c: procedimiento.comparativa.duoglide, bg: "#f5f5f5" },
              ].map(({ c, bg }, i) => (
                <Box key={i} sx={{
                  backgroundColor: bg,
                  borderRadius: "12px",
                  p: { xs: 3, md: 3.5 },
                  border: "1px solid rgba(0,0,0,0.06)",
                }}>
                  <Typography sx={{
                    fontFamily: "Poppins", fontSize: { xs: "16px", md: "18px" }, fontWeight: 600,
                    color: "#111", mb: 2, textAlign: "left",
                  }}>
                    {c.title}
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
                    {c.items.map((item, j) => (
                      <Box key={j} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                        <Check size={16} strokeWidth={2.4} color="#0081C7" style={{ marginTop: "3px", flexShrink: 0 }} />
                        <Typography sx={{
                          fontFamily: "Poppins", fontSize: { xs: "14px", md: "15px" },
                          color: "rgba(0,0,0,0.72)", lineHeight: 1.5, textAlign: "left",
                        }}>
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          )}

          {/* Technique */}
          <Box>
            <Typography variant="h3" sx={{
              fontFamily: "Poppins", fontSize: { xs: "16px", md: "18px" }, fontWeight: 600, mb: 1.5, textAlign: "left",
            }}>
              Técnica Quirúrgica
            </Typography>
            <Typography sx={{
              fontFamily: "Poppins", fontSize: { xs: "15px", md: "16px" }, lineHeight: 1.8, color: "rgba(0,0,0,0.7)", textAlign: "left",
            }}>
              {procedimiento.tecnica}
            </Typography>
          </Box>

          {/* Recovery */}
          <Box sx={{ backgroundColor: "#f5f5f5", p: 4, borderRadius: "12px" }}>
            <Typography variant="h3" sx={{
              fontFamily: "Poppins", fontSize: { xs: "20px", md: "22px" }, fontWeight: 500, mb: 2, textAlign: "left",
            }}>
              Recuperación
            </Typography>
            <Typography sx={{
              fontFamily: "Poppins", fontSize: { xs: "14px", md: "15px" }, lineHeight: 1.7, color: "rgba(0,0,0,0.7)", textAlign: "left",
            }}>
              {procedimiento.recuperacion}
            </Typography>
          </Box>

          {procedimiento.secondaryImageSrc && (
            <Box sx={{ width: "100%", borderRadius: "12px", overflow: "hidden" }}>
              <Box
                component="img"
                src={procedimiento.secondaryImageSrc}
                alt={`${procedimiento.title} detalle`}
                sx={{
                  width: "100%",
                  height: "auto",
                  display: "block"
                }}
              />
            </Box>
          )}

        </Box>
      </Box>

      {/* ─── CRISALIX SECTION (Breast Surgery Only) ─── */}
      {id === "01" && (
        <Box sx={{
          backgroundColor: "#F2F2F2",
          py: { xs: 10, md: 15 },
          px: { xs: "20px", md: "70px" },
          borderTop: "1px solid rgba(0,0,0,0.05)"
        }}>
          <Box sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" },
            gap: { xs: 4, md: 8 },
            alignItems: "center"
          }}>
            <Box sx={{
              gridColumn: { xs: "1 / -1", md: "1 / 7" },
              backgroundColor: "#fff",
              borderRadius: "24px",
              padding: { xs: "24px", md: "40px" },
              boxShadow: "0 20px 40px rgba(0,0,0,0.03)",
              border: "1px solid rgba(0,129,199,0.1)",
              position: "relative",
              overflow: "hidden"
            }}>
              {/* Horizontal layout: info left, slider right on desktop */}
              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 3, md: 2 }, alignItems: { md: "stretch" } }}>
                {/* Left: Text Info */}
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ mb: 3 }}>
                    <Typography sx={{
                      fontFamily: "Poppins", fontSize: "12px", textTransform: "uppercase",
                      color: "#0081C7", fontWeight: 600, letterSpacing: "0.1em", mb: 1, textAlign: "left"
                    }}>
                      Previsualización 3D
                    </Typography>
                    <Typography sx={{
                      fontFamily: "Poppins", fontSize: { xs: "22px", md: "28px" }, fontWeight: 500, color: "#111", lineHeight: 1.1, textAlign: "left", whiteSpace: "nowrap"
                    }}>
                      Tecnología Crisalix®
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {[
                      { t: "Simulación Realista", d: "Motor de renderizado 3D basado en tu anatomía real." },
                      { t: "Alineación de Expectativas", d: "Elegí el volumen y forma con total seguridad." },
                      { t: "Precisión Quirúrgica", d: "Mejor planificación para mejores resultados." }
                    ].map((item, i) => (
                      <Box key={i} sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                        <Box sx={{
                          width: "6px", height: "6px", borderRadius: "50%",
                          backgroundColor: "#0081C7", mt: "7px", flexShrink: 0
                        }} />
                        <Box>
                          <Typography sx={{ fontFamily: "Poppins", fontSize: "15px", fontWeight: 600, color: "#111", textAlign: "left" }}>
                            {item.t}
                          </Typography>
                          <Typography sx={{ fontFamily: "Poppins", fontSize: "14px", color: "rgba(0,0,0,0.5)", textAlign: "left", lineHeight: 1.5 }}>
                            {item.d}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* Right: Compact Before/After Slider – same height as info */}
                <Box sx={{ width: { xs: "280px", md: "240px" }, mx: "auto", flexShrink: 0, display: "flex" }}>
                  <Box sx={{ width: "100%", borderRadius: "16px", overflow: "hidden" }}>
                    <BeforeAfterSlider
                      beforeSrc="/videos/antes.mp4"
                      afterSrc="/videos/despues.mp4"
                    />
                  </Box>
                </Box>
              </Box>

            </Box>

            {/* Content Left */}
            <Box sx={{ gridColumn: { xs: "1 / -1", md: "8 / 13" } }}>
              <Typography variant="h2" sx={{
                fontFamily: "Poppins",
                fontSize: { xs: "32px", md: "48px" },
                fontWeight: 500,
                lineHeight: 1.1,
                color: "#111",
                letterSpacing: "-0.02em",
                textAlign: "left",
                mb: 4
              }}>
                Mirá tus resultados <span style={{ color: '#0081C7' }}>antes de la cirugía.</span>
              </Typography>
              <Typography sx={{
                fontFamily: "Poppins", fontSize: "18px", lineHeight: 1.6, color: "rgba(0,0,0,0.6)", textAlign: "left",
              }}>
                Contamos con la tecnología líder a nivel mundial en simulación estética. Mediante Crisalix®, transformamos la consulta en una experiencia interactiva donde podés visualizar diferentes opciones de volumen y perfil, asegurando que el plan quirúrgico sea exactamente lo que deseás.
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      {/* ─── PHILOSOPHY SECTION ─── */}
      <Box sx={{
        backgroundColor: "#F2F2F2",
        py: { xs: 10, md: 15 },
        px: { xs: "20px", md: "70px" },
        borderTop: "1px solid rgba(0,0,0,0.05)"
      }}>
        <Box sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" },
          gap: { xs: 6, md: 4 },
          alignItems: "start"
        }}>
          {/* Col 1: Label */}
          <Box sx={{ gridColumn: { xs: "1 / -1", md: "1 / 4" }, display: "flex", alignItems: "baseline", gap: { xs: "10px", md: "16px" } }}>
            <Typography component="span" sx={{
              fontFamily: "Poppins, sans-serif", fontSize: { xs: "14px", md: "18px" }, fontWeight: 500,
              color: "rgba(0, 0, 0, 0.37)", lineHeight: 1,
            }}>
              (02)
            </Typography>
            <Typography component="span" sx={{
              fontFamily: "Poppins, sans-serif", fontSize: { xs: "14px", md: "18px" }, fontWeight: 500,
              color: "black", textTransform: "uppercase", letterSpacing: "-0.03em", lineHeight: 1,
            }}>
              NUESTRA FILOSOFÍA
            </Typography>
          </Box>

          {/* Col 4-9: Large Headline (Shifted 1 col to the right) */}
          <Box sx={{ gridColumn: { xs: "1 / -1", md: "4 / 10" } }}>
            <Typography variant="h2" sx={{
              fontFamily: "Poppins",
              fontSize: { xs: "32px", md: "48px", lg: "56px" },
              fontWeight: 500,
              lineHeight: 1.1,
              color: "#111",
              letterSpacing: "-0.02em",
              textAlign: "left",
            }}>
              Construyendo confianza, inspirando seguridad, entregando excelencia.
            </Typography>
          </Box>

          {/* Col 10-12: Paragraph (Lowered and slightly larger) */}
          <Box sx={{ gridColumn: { xs: "1 / -1", md: "10 / 13" }, pt: { md: 24 } }}>
            <Typography sx={{
              fontFamily: "Poppins", fontSize: "18px", fontWeight: 500, lineHeight: 1.6, color: "rgba(0,0,0,0.7)",
              textAlign: "left",
            }}>
              Impulsados por el propósito y guiados por nuestros valores, transformamos nuestros compromisos en acciones significativas que inspiran confianza y crean relaciones duraderas con cada paciente.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* ─── BENEFITS GRID (Approach-style) ─────────────────────── */}
      <Box sx={{ backgroundColor: "#ffffff", px: { xs: "20px", md: "70px" }, py: { xs: 8, md: 12 } }}>
        <Box sx={{
          maxWidth: { md: "1100px" },
          mx: { md: "auto" },
        }}>
          {/* Section label */}
          <Box sx={{ display: "flex", alignItems: "baseline", gap: { xs: "10px", md: "16px" }, mb: { xs: 3, md: 4 } }}>
            <Typography component="span" sx={{
              fontFamily: "Poppins, sans-serif", fontSize: { xs: "14px", md: "18px" }, fontWeight: 500,
              color: "rgba(0, 0, 0, 0.37)", lineHeight: 1,
            }}>
              (03)
            </Typography>
            <Typography component="span" sx={{
              fontFamily: "Poppins, sans-serif", fontSize: { xs: "14px", md: "18px" }, fontWeight: 500,
              color: "black", textTransform: "uppercase", letterSpacing: "-0.03em", lineHeight: 1,
            }}>
              NUESTRO ENFOQUE
            </Typography>
          </Box>

          {/* Outer container */}
          <Box sx={{
            backgroundColor: "#EEEEEE",
            borderRadius: { xs: "14px", md: "18px" },
            p: { xs: "8px", md: "10px" },
            maxWidth: { md: "1100px" },
            mx: { md: "auto" },
          }}>
            {/* Cards grid: 3 top + 2 bottom on desktop */}
            <Box className="benefits-grid" sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(6, 1fr)" },
              gap: { xs: "8px", md: "10px" },
            }}>
              {benefitsData.map((benefit, idx) => (
                <Box key={idx} className="benefit-card" sx={{
                  gridColumn: { xs: "auto", md: idx < 3 ? "span 2" : "span 3" },
                  backgroundColor: "#E2E2E2",
                  borderRadius: { xs: "10px", md: "12px" },
                  px: { xs: "16px", md: "24px" },
                  py: { xs: "18px", md: "24px" },
                  transition: "background-color 0.25s ease",
                  cursor: "default",
                  "&:hover": {
                    backgroundColor: "#D6D6D6",
                  },
                }}>
                  {/* Icon */}
                  <Box sx={{ mb: 2 }}>
                    {idx === 0 && <Sparkles size={22} strokeWidth={1.8} color="#111" />}
                    {idx === 1 && <ShieldCheck size={22} strokeWidth={1.8} color="#111" />}
                    {idx === 2 && <HeartPulse size={22} strokeWidth={1.8} color="#111" />}
                    {idx === 3 && <Users size={22} strokeWidth={1.8} color="#111" />}
                    {idx === 4 && <Cpu size={22} strokeWidth={1.8} color="#111" />}
                  </Box>

                  <Typography sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: { xs: "15px", md: "16px" },
                    fontWeight: 600,
                    color: "#111",
                    mb: 1,
                    lineHeight: 1.2,
                    textAlign: "left",
                  }}>
                    {benefit.title}
                  </Typography>

                  <Typography sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: { xs: "13px", md: "13px" },
                    color: "rgba(0,0,0,0.5)",
                    lineHeight: 1.55,
                    textAlign: "left",
                  }}>
                    {benefit.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ─── PROCESS STEPS ─────────────────────── */}
      <ProcessSteps procedureId={id} />

      <Footer />
    </Box>
  )
}