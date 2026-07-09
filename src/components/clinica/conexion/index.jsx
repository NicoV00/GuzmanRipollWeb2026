import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Box, Typography } from "@mui/material"

gsap.registerPlugin(ScrollTrigger)

export default function Conexion() {
  const humanConnectionTitleRef = useRef(null)
  const pointsRef = useRef([])

  useEffect(() => {
    pointsRef.current = pointsRef.current.slice(0, 3)

    const elements = [humanConnectionTitleRef.current, ...pointsRef.current]

    elements.forEach((el, index) => {
      if (!el) return

      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          delay: index * 0.1
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const humanConnectionPoints = [
    {
      title: "Escucha activa",
      description: "Cada tratamiento empieza con una escucha empática. Entendemos tus necesidades y objetivos, construyendo confianza desde el primer encuentro."
    },
    {
      title: "Precisión con inteligencia",
      description: "Usamos tecnología avanzada e inteligencia artificial para planificar cada detalle, elevando desde lo más importante: el cuidado humano."
    },
    {
      title: "Resultados a medida",
      description: "Cada cuerpo es único, por lo que diseñamos soluciones personalizadas que combinan técnica, estética y conexión emocional."
    }
  ]

  return (
    <>
      <Box sx={{
        gridColumn: { xs: '1 / 13', md: '1 / 6' },
        position: "relative",
        height: { xs: "64vh", md: "108vh" },
        maxHeight: { md: "860px" },
        marginTop: { xs: "-4px", md: "-132px" },
        marginBottom: { xs: 6, md: 0 },
        marginLeft: { xs: 0, md: "-34px" },
        zIndex: 1,
        order: { xs: 1, md: 1 },
      }}>
        <Box sx={{
          borderRadius: "24px",
          overflow: "hidden",
          height: "100%",
          backgroundImage: 'url("/images/conexion.webp")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />
      </Box>

      <Box sx={{
        gridColumn: { xs: '1 / 13', md: '7 / 13' },
        zIndex: 1,
        order: { xs: 2, md: 2 },
        py: { xs: 2, md: 0 },
        display: "grid",
        gridTemplateColumns: { md: "repeat(6, 1fr)" },
        columnGap: "20px",
        height: "auto",
        pt: { md: 0 }
      }}>
        <Box component="section" sx={{
          gridColumn: "1 / 7",
          display: "flex",
          flexDirection: "column",
        }}>
          <Typography
            ref={humanConnectionTitleRef}
            variant="h2"
            sx={{
              ...sectionTitle,
              px: { xs: "0.1rem", md: 0 },
              whiteSpace: "nowrap",
              fontSize: { xs: "2.4rem", md: "3.5rem" },
              mb: { xs: 5, md: 8 },
              textAlign: "left"
            }}
          >
            Conexión humana
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 6, md: 8 } }}>
            {humanConnectionPoints.map((point, index) => (
              <Box
                key={index}
                ref={el => pointsRef.current[index] = el}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(6, 1fr)",
                  columnGap: "20px",
                  px: { xs: 2, md: 0 },
                  alignItems: "start"
                }}>
                <Typography variant="body1" sx={{ ...pointNumberStyle, gridColumn: "1 / 2", textAlign: "left" }}>
                  0{index + 1}.
                </Typography>
                <Box sx={{ gridColumn: "2 / 7", display: "flex", flexDirection: "column", gap: { xs: 2, md: 2.5 } }}>
                  <Typography variant="h3" sx={{ ...pointTitleStyle, mt: "2px" }}>
                    {point.title}
                  </Typography>
                  <Typography variant="body1" sx={pointDescriptionStyle}>
                    {point.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  )
}

const sectionTitle = {
  fontFamily: "Poppins",
  fontSize: { xs: "2.5rem", md: "4rem" },
  fontWeight: 400,
  color: "text.primary",
  lineHeight: 1.2,
  textAlign: "left"
}

const pointNumberStyle = {
  fontFamily: "Poppins",
  fontSize: "1.1rem",
  color: "rgba(0,0,0,0.5)",
  minWidth: "60px",
  fontWeight: 500,
  display: "inline-block"
}

const pointTitleStyle = {
  fontFamily: "Poppins",
  fontSize: "1.4rem",
  fontWeight: 500,
  color: "#000",
  display: "inline-block",
  textAlign: "left"
}

const pointDescriptionStyle = {
  mt: 1,
  fontSize: "1.25rem",
  color: "rgba(0,0,0,0.5)",
  lineHeight: 1.45,
  fontWeight: 500,
  textAlign: "left",
  maxWidth: "520px",
}
