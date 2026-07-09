"use client"

import React, { useRef, useLayoutEffect, useState, useEffect } from "react"
import { useParams, Link as RouterLink } from "react-router-dom"
import { fetchProcedimiento, fetchProcedimientos, mergeProcedimiento } from "../lib/sanity"
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
    imageSrc: "/images/mama.webp",
    secondaryImageSrc: "/images/implantes2.webp",
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
    imageSrc: "/images/lipo.webp",
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
  "04": {
    number: "04",
    title: "Abdominoplastia",
    subtitle: "Remodelación Completa",
    category: "Contorno Corporal",
    imageSrc: "/images/abdomino.webp",
    catchPhrase: "Recupera tu silueta ideal con procedimientos avanzados de tensado.",
    description: "La abdominoplastia es un procedimiento integral que elimina el exceso de piel y grasa abdominal, repara la musculatura y redefine el contorno.",
    objetivo: "Eliminación de exceso de piel, corrección de diástasis, mejora del contorno.",
    specs: {
      tipo: "Ambulatoria",
      lugar: "Block quirúrgico",
      anestesia: "General",
      duracion: "3-4 horas"
    },
    tecnica: "Incisión horizontal baja, eliminación de exceso de piel y grasa, reparación muscular.",
    recuperacion: "Reposo relativo por 2 semanas. Uso de faja compresiva por 6-8 semanas."
  },
  "06": {
    number: "06",
    title: "Tratamientos Faciales",
    subtitle: "INDIBA & DEKA DuoGlide",
    category: "Medicina Estética Facial",
    imageSrc: "/images/image.webp",
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

  const fallback = procedimientosData[id] || procedimientosData["01"]
  const [procedimiento, setProcedimiento] = useState(fallback)
  const [procedimientos, setProcedimientos] = useState(allProcedures)

  // Trae los datos frescos de Sanity y los mezcla sobre el texto/imagen actual.
  // Si Sanity no responde o un campo está vacío, se queda el contenido del sitio.
  useEffect(() => {
    let active = true
    // Cambio INSTANTÁNEO al contenido local; Sanity refina después sin bloquear la navegación.
    setProcedimiento(fallback)
    fetchProcedimiento(id).then((doc) => {
      if (active && doc) setProcedimiento(mergeProcedimiento(doc, fallback))
    })
    return () => { active = false }
  }, [id])

  // Lista de procedimientos para las pills de navegación (con fallback al set actual).
  useEffect(() => {
    let active = true
    fetchProcedimientos().then((docs) => {
      if (!active || !docs.length) return
      setProcedimientos(
        docs.map((d) => mergeProcedimiento(d, procedimientosData[d.number] || {}))
      )
    })
    return () => { active = false }
  }, [])

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

      // Orden de entrada por IMPORTANCIA, no por posición en el DOM:
      // título (h1) → catchphrase (descripción) → meta (nº/categoría) → nav pills.
      // Las pills están más arriba pero son lo menos importante, así que entran últimas.
      const revealEls = gsap.utils.toArray(".hero-text-reveal")
        .sort((a, b) => Number(a.dataset.revealOrder) - Number(b.dataset.revealOrder))
      gsap.fromTo(revealEls,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.5 }
      )

    }, containerRef)
    return () => ctx.revert()
  }, [id])

  if (!procedimiento) return <Box>No encontrado</Box>

  return (
    <Box ref={containerRef} sx={{ backgroundColor: "#FAFFFF", minHeight: "100vh" }}>

      {/* ─── HERO SECTION ──────────────────────── */}
      <Box sx={{
        pt: { xs: 15, md: 20 },
        pb: { xs: 6, md: 8 },
        px: { xs: "20px", md: "70px" },
      }}>
        {/* ─── Procedure Nav (Clean Pills) ─────── */}
        <Box className="hero-text-reveal" data-reveal-order="4" sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: { xs: "8px", md: "10px" },
          mb: { xs: 5, md: 6 },
        }}>
          {procedimientos.map((proc) => (
            <Box
              key={proc.number}
              component={RouterLink}
              to={`/procedimiento/${proc.number}`}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                px: { xs: "12px", md: "16px" },
                py: { xs: "6px", md: "8px" },
                position: "relative",
                zIndex: 1,
                cursor: "pointer",
                borderRadius: "999px",
                // Glass sólido con luz entrando por el borde superior-izquierdo (-45°).
                backdropFilter: "blur(22px) saturate(105%)",
                WebkitBackdropFilter: "blur(22px) saturate(105%)",
                border: "1px solid",
                borderColor: proc.number === id ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.75)",
                background: proc.number === id
                  ? "linear-gradient(135deg, rgba(26,28,32,0.92) 0%, rgba(38,40,46,0.82) 100%)"
                  : "linear-gradient(135deg, rgba(238,240,243,0.88) 0%, rgba(226,229,233,0.62) 100%)",
                // Rim-light: highlight blanco arriba-izq, sombra sutil abajo-der = grosor de vidrio + drop shadow sólido.
                boxShadow: proc.number === id
                  ? "inset 1.5px 1.5px 1.5px rgba(255,255,255,0.28), inset -1.5px -1.5px 2px rgba(0,0,0,0.4), 0 8px 22px rgba(0,0,0,0.22)"
                  : "inset 1.5px 1.5px 1.5px rgba(255,255,255,0.95), inset -1.5px -1.5px 2px rgba(0,0,0,0.05), 0 8px 22px rgba(0,0,0,0.10)",
                textDecoration: "none",
                fontFamily: "Poppins, sans-serif",
                fontSize: { xs: "12px", md: "13px" },
                fontWeight: proc.number === id ? 600 : 500,
                color: proc.number === id ? "#fff" : "#111",
                letterSpacing: "-0.01em",
                transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s ease, background 0.25s ease",
                "&:hover": {
                  transform: "translateY(-1.5px)",
                  boxShadow: proc.number === id
                    ? "inset 1.5px 1.5px 1.5px rgba(255,255,255,0.35), inset -1.5px -1.5px 2px rgba(0,0,0,0.4), 0 12px 28px rgba(0,0,0,0.26)"
                    : "inset 1.5px 1.5px 1.5px rgba(255,255,255,1), inset -1.5px -1.5px 2px rgba(0,0,0,0.06), 0 12px 28px rgba(0,0,0,0.14)"
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
        <Box sx={{ display: "flex", alignItems: "baseline", gap: 2, mb: 4 }} className="hero-text-reveal" data-reveal-order="3">
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
        <Typography variant="h1" className="hero-text-reveal" data-reveal-order="1" sx={{
          fontFamily: "Poppins",
          fontSize: { xs: "30px", md: "42px", lg: "48px" },
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
        <Typography className="hero-text-reveal" data-reveal-order="2" sx={{
          fontFamily: "Poppins",
          fontSize: { xs: "15px", md: "18px" },
          fontWeight: 400,
          color: "rgba(0,0,0,0.7)",
          maxWidth: "680px",
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
        pb: { xs: 16, md: 24 }
      }}>
        {/* Left Column: Image (Sticky + Reveal Animation) */}
        <Box sx={{
          gridColumn: { xs: "1 / -1", md: "1 / 7" },
          position: { md: "sticky" },
          top: "120px",
          alignSelf: "start",
          height: { xs: "300px", md: "58vh" },
          maxHeight: { md: "620px" },
          borderRadius: "16px",
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
              fetchPriority="high"
              decoding="async"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 35%",
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
                { c: procedimiento.comparativa.duoglide, bg: "#ffffff" },
              ].map(({ c, bg }, i) => (
                <Box key={i} sx={{
                  backgroundColor: bg,
                  borderRadius: "16px",
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
          <Box sx={{
            backgroundColor: "#F0F0F1",
            border: "1px solid rgba(0,0,0,0.04)",
            p: 4,
            borderRadius: "16px",
          }}>
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

          {/* CTA WhatsApp — consulta directa por este procedimiento */}
          <Box
            component="a"
            href={`https://wa.me/59899016358?text=${encodeURIComponent(
              `Hola! Quiero hacer una consulta por ${procedimiento.title}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              position: "relative",
              overflow: "hidden",
              isolation: "isolate",
              display: "inline-flex",
              alignItems: "center",
              gap: 1.5,
              alignSelf: "flex-start",
              px: 3,
              py: 1.6,
              borderRadius: "999px",
              background: "linear-gradient(180deg, rgba(48,48,52,0.86) 0%, rgba(16,16,18,0.94) 100%)",
              backdropFilter: "blur(22px) saturate(180%)",
              WebkitBackdropFilter: "blur(22px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.16)",
              textDecoration: "none",
              transition:
                "transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.35s ease",
              boxShadow: [
                "inset 0 1px 0 rgba(255,255,255,0.22)",
                "inset 0 -1px 1px rgba(255,255,255,0.05)",
                "0 1px 2px rgba(0,0,0,0.2)",
                "0 12px 30px rgba(0,0,0,0.18)",
              ].join(", "),
              // Sheen superior: la luz "apoyada" sobre el vidrio
              "&::before": {
                content: '""',
                position: "absolute",
                inset: 0,
                borderRadius: "inherit",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0) 58%)",
                pointerEvents: "none",
              },
              // Reflejo especular que barre la pill en hover
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                bottom: 0,
                left: "-70%",
                width: "55%",
                background:
                  "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
                transform: "skewX(-18deg)",
                transition: "left 0.65s cubic-bezier(0.22,1,0.36,1)",
                pointerEvents: "none",
              },
              "&:hover": {
                transform: "translateY(-2px) scale(1.015)",
                borderColor: "rgba(255,255,255,0.24)",
                boxShadow: [
                  "inset 0 1px 0 rgba(255,255,255,0.3)",
                  "inset 0 -1px 1px rgba(255,255,255,0.07)",
                  "0 2px 4px rgba(0,0,0,0.2)",
                  "0 18px 42px rgba(0,0,0,0.24)",
                ].join(", "),
              },
              "&:hover::after": {
                left: "120%",
              },
              "&:active": {
                transform: "translateY(0) scale(0.98)",
              },
            }}
          >
            <Box component="svg" viewBox="0 0 24 24" sx={{ width: 18, height: 18, flexShrink: 0 }} fill="#25D366" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </Box>
            <Typography sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: { xs: "13px", md: "14px" },
              fontWeight: 500,
              color: "#fff",
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}>
              Consultar por este procedimiento
            </Typography>
          </Box>

          {procedimiento.secondaryImageSrc && (
            <Box sx={{ width: "100%", borderRadius: "16px", overflow: "hidden" }}>
              {/* height auto: la imagen es panoramica (2.24:1); con altura fija + cover queda zoomeada/rota */}
              <Box
                component="img"
                src={procedimiento.secondaryImageSrc}
                alt={`${procedimiento.title} detalle`}
                loading="lazy"
                decoding="async"
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
          backgroundColor: "#FAFFFF",
          py: { xs: 10, md: 15 },
          px: { xs: "20px", md: "70px" },
          borderTop: "1px solid rgba(0,0,0,0.05)"
        }}>
          <Box sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" },
            gap: { xs: 4, md: 6 },
            alignItems: "center"
          }}>
            {/* SaaS-style Crisalix preview card */}
            <Box sx={{
              gridColumn: { xs: "1 / -1", md: "2 / 6" },
              backgroundColor: "#F2F2F2",
              borderRadius: { xs: "22px", md: "20px" },
              padding: { xs: "5px", md: "5px" },
              position: "relative",
              border: "1px solid rgba(0,0,0,0.04)",
              boxShadow: "0 16px 42px rgba(0,0,0,0.05), inset 0 0 0 1px rgba(255,255,255,0.55)",
            }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {/* Left: Text Info */}
                <Box sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: { xs: "18px", md: "16px" },
                  px: { xs: "18px", md: "18px" },
                  py: { xs: "14px", md: "14px" },
                  border: "1px solid rgba(0,0,0,0.05)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.035)",
                }}>
                  <Box sx={{ mb: 0 }}>
                    <Typography sx={{
                      fontFamily: "Poppins", fontSize: { xs: "11px", md: "10px" }, textTransform: "uppercase",
                      color: "#0081C7", fontWeight: 600, letterSpacing: "0.1em", mb: 1, textAlign: "left"
                    }}>
                      Previsualización 3D
                    </Typography>
                    <Typography sx={{
                      fontFamily: "Poppins", fontSize: { xs: "20px", md: "21px" }, fontWeight: 500, color: "#111", lineHeight: 1.1, textAlign: "left", whiteSpace: "nowrap"
                    }}>
                      Tecnología Crisalix®
                    </Typography>
                  </Box>

                  <Box sx={{ display: "none", flexDirection: "column", gap: 2 }}>
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

                {/* Right: Before/After Slider */}
                <Box sx={{
                  width: "100%",
                  maxWidth: "none",
                  mx: 0,
                  flexShrink: 0,
                  backgroundColor: "transparent",
                  borderRadius: { xs: "18px", md: "16px" },
                  p: 0,
                  overflow: "hidden",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.035)",
                }}>
                  <BeforeAfterSlider
                    beforeSrc="/videos/antes.mp4"
                    afterSrc="/videos/despues.mp4"
                    beforeAlt="Simulación Crisalix: torso antes del aumento mamario"
                    afterAlt="Simulación Crisalix: torso después del aumento mamario"
                    aspectRatio="1 / 1"
                    fit="contain"
                  />
                </Box>
                <Box sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: { xs: "16px", md: "14px" },
                  px: { xs: "14px", md: "14px" },
                  py: { xs: "10px", md: "10px" },
                  border: "1px solid rgba(0,0,0,0.05)",
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 1,
                }}>
                  {["Original", "Simulado", "Volumen", "Perfil"].map((label) => (
                    <Typography key={label} sx={{
                      fontFamily: "Poppins",
                      fontSize: { xs: "10px", md: "10px" },
                      color: "rgba(0,0,0,0.58)",
                      textAlign: "center",
                      whiteSpace: "nowrap",
                    }}>
                      {label}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Box>

            {/* Content Left */}
            <Box sx={{ gridColumn: { xs: "1 / -1", md: "7 / 12" } }}>
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
        backgroundColor: "#FAFFFF",
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
      <Box sx={{ backgroundColor: "#FAFFFF", px: { xs: "20px", md: "70px" }, py: { xs: 8, md: 12 } }}>
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
            borderRadius: { xs: "16px", md: "24px" },
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
                  borderRadius: { xs: "12px", md: "16px" },
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

      <Footer backgroundColor="#FAFFFF" cardBackgroundColor="#EBEDEF" />
    </Box>
  )
}
