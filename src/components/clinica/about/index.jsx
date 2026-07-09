import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Box, Typography } from "@mui/material"

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const doctorTitleRef = useRef(null)
  const labelRef = useRef(null)
  const contentRef = useRef(null)
  const doctorImageRef = useRef(null)

  const imageGrainSx = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    opacity: 0.13,
    mixBlendMode: "multiply",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E")`,
    backgroundSize: "140px 140px",
  }

  useEffect(() => {
    const elements = [
      { ref: doctorTitleRef, y: 50 },
      { ref: labelRef, y: 50 },
      { ref: contentRef, y: 50 }
    ]

    const animations = elements.map((el, index) =>
      gsap.fromTo(
        el.ref.current,
        { opacity: 0, y: el.y },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el.ref.current,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          delay: index * 0.1 // Adding stagger
        }
      )
    )

    // Parallax effect for doctor image
    if (doctorImageRef.current) {
      gsap.to(doctorImageRef.current, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: doctorImageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      })
    }

    return () => {
      animations.forEach(anim => anim.scrollTrigger?.kill())
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <>
      <Box sx={{
        gridColumn: { xs: '1 / 4', md: '1 / 4' },
        display: { xs: 'none', md: 'flex' },
        flexDirection: "column",
        textAlign: "start",
        zIndex: 1,
        maxWidth: "100%",
        overflow: "hidden",
      }}>
        <svg viewBox="0 0 24 24" width={"72"} height={"72"} fill="black" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
      </Box>

      {/* Título principal - Ahora PRIMERO */}
      <Box sx={{
        gridColumn: { xs: '1 / 13', md: '4 / 12' },
        display: "flex",
        flexDirection: "column",
        textAlign: "start",
        mb: { xs: "40px", md: "80px" },
      }}>
        <Typography ref={doctorTitleRef} variant="h2" sx={doctorTitleStyle}>
          Líderes en cirugía plástica mamaria, estética & reconstructiva
        </Typography>
      </Box>

      {/* Row 2: Label (Left) + Content (Right) */}

      {/* 02 LIDERAZGO */}
      <Box
        ref={labelRef}
        sx={{
          py: { xs: 0, md: 0 },
          mb: { xs: "20px", md: 0 },
          gridColumn: { xs: "1 / 13", md: "4 / 7" }, // Left column
          zIndex: 1,
          display: "flex",
          alignItems: "baseline",
          gap: "10px"
        }}
      >
        <Typography component="span" sx={{
          fontFamily: "Poppins, sans-serif",
          fontSize: { xs: "16px", md: "18x" },
          fontWeight: 300,
          color: "rgba(0,0,0,0.2)",
          lineHeight: 1
        }}>
          02
        </Typography>
        <Typography component="span" sx={{
          fontFamily: "Poppins, sans-serif",
          fontSize: { xs: "16px", md: "18px" },
          fontWeight: 500,
          color: "black",
          textTransform: "uppercase",
          letterSpacing: "0.03em",
          lineHeight: 1
        }}>
          LIDERAZGO
        </Typography>
      </Box>

      {/* Contenido Dr. Guzman Ripoll */}
      <Box
        ref={contentRef}
        sx={{
          gridColumn: { xs: '1 / 13', md: '7 / 11' }, // Right column
          display: "flex",
          flexDirection: "column",
          textAlign: "start",
          zIndex: 1,
        }}>
        <Box component="section" sx={{
          pt: { xs: "20px", md: 0 }, 
          pb: { xs: "40px", md: 20 },
          width: "100%",
        }}>
          <Typography variant="body1" sx={{
            fontFamily: "Poppins",
            fontSize: { xs: "22px", md: "20px" },
            fontWeight: 600,
            color: "black",
            mb: { xs: "15px", md: 2 },
            lineHeight: 1.2,
          }}>
            Dr. Guzman Ripoll
          </Typography>

          <Typography variant="body1" sx={{ ...bodyTextStyle, mt: 0 }}>
            El Dr. Guzman Ripoll es un Cirujano Plástico, Reconstructivo y Estético certificado con títulos de Doctor en Medicina (CLAEH, Uruguay), Especialista en Cirugía Plástica, Reparadora y Estética (Universidad de la República, Uruguay) y Maestría en Cirugía Mamaria, Reconstructiva y Estética (Universitat de Barcelona).
          </Typography>
          <Typography variant="body1" sx={{ ...bodyTextStyle, mt: { xs: "20px", md: 2 } }}>
            En la actualidad se dedica principalmente a realizar cirugías mamarias estéticas y reconstructivas, así como también cirugías de remodelamiento corporal, siendo el único especialista en Uruguay en utilizar la lipoaspiración VASER.
          </Typography>
          <Typography variant="body1" sx={{ ...bodyTextStyle, mt: { xs: "20px", md: 2 } }}>
            Su enfoque se centra en ofrecer a los pacientes los mejores tratamientos y resultados posibles, manteniendo altos estándares de calidad y cuidado. Su dedicación a la formación y la mejora continua le permite cumplir con los más altos estándares de excelencia en su práctica profesional.
          </Typography>
        </Box>
      </Box>

      {/* Imagen del doctor */}
      <Box sx={{
        mt: { xs: 2, md: 3 },
        mb: { xs: "60px", md: 10 },
        borderRadius: { xs: "16px", md: "20px" },
        overflow: "hidden",
        clipPath: { xs: "inset(0 round 16px)", md: "inset(0 round 20px)" },
        gridColumn: { xs: '1 / 13', md: '7 / 11' },
        zIndex: 1,
        height: "auto",
        width: "100%",
        position: "relative",
      }}>
        <img
          ref={doctorImageRef}
          src="/images/clinica3.webp"
          alt="Dr. Guzman Ripoll"
          loading="lazy"
          decoding="async"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            objectFit: "contain",
            maxHeight: "780px",
            borderRadius: "inherit"
          }}
        />
        <Box
          aria-hidden="true"
          sx={imageGrainSx}
        />
      </Box>
    </>
  );
}


const doctorTitleStyle = {
  fontFamily: "Poppins",
  fontWeight: { xs: 600, md: 400 },
  fontSize: { xs: "30px", md: "3.4rem" },
  lineHeight: { xs: 1.06, md: 1.1 },
  letterSpacing: { xs: "-0.01em", md: "-0.03em" },
  color: "text.primary",
  textAlign: "left"
}

const bodyTextStyle = {
  fontFamily: "Poppins",
  fontSize: { xs: "18px", md: "21px" }, // 🔺 TAMAÑO TEXTO MOBILE (aumentado de 14px a 18px)
  fontWeight: { xs: 400, md: 500 },
  color: { xs: "#5f6368", md: "text.secondary" },
  lineHeight: { xs: 1.55, md: 1.8 },
  paddingRight: { xs: "0px", md: "0px" },
  maxWidth: "100%",
  wordWrap: "break-word",
  overflowWrap: "break-word"
}
