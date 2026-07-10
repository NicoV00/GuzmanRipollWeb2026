"use client"

import { useState, useEffect } from "react"
import { CarouselItem } from "./carousel-item"
// @ts-ignore - Footer is a .jsx file
import Footer from "../UI/Footer.jsx"

const originalItems = [
  {
    title: "AUMENTO MAMARIO",
    subtitle: "(Cirugía Mamaria)",
    antes: "/images/resultados/pares/aumento1-antes.webp",
    despues: "/images/resultados/pares/aumento1-despues.webp",
  },
  {
    title: "REDUCCIÓN MAMARIA",
    subtitle: "(Cirugía Mamaria)",
    antes: "/images/resultados/pares/reduccion1-antes.webp",
    despues: "/images/resultados/pares/reduccion1-despues.webp",
  },
  {
    title: "LIPOSUCCIÓN",
    subtitle: "(Contorno Corporal)",
    antes: "/images/resultados/pares/lipo-antes.webp",
    despues: "/images/resultados/pares/lipo-despues.webp",
  },
  {
    title: "AUMENTO MAMARIO",
    subtitle: "(Cirugía Mamaria)",
    antes: "/images/resultados/pares/aumento3-antes.webp",
    despues: "/images/resultados/pares/aumento3-despues.webp",
  },
  {
    title: "REDUCCIÓN MAMARIA",
    subtitle: "(Cirugía Mamaria)",
    antes: "/images/resultados/pares/reduccion4-antes.webp",
    despues: "/images/resultados/pares/reduccion4-despues.webp",
  },
  {
    title: "AUMENTO MAMARIO",
    subtitle: "(Cirugía Mamaria)",
    antes: "/images/resultados/pares/aumento2-antes.webp",
    despues: "/images/resultados/pares/aumento2-despues.webp",
  },
  {
    title: "REDUCCIÓN MAMARIA",
    subtitle: "(Cirugía Mamaria)",
    antes: "/images/resultados/pares/reduccion3-antes.webp",
    despues: "/images/resultados/pares/reduccion3-despues.webp",
  },
  {
    title: "REDUCCIÓN MAMARIA",
    subtitle: "(Cirugía Mamaria)",
    antes: "/images/resultados/pares/reduccion2-antes.webp",
    despues: "/images/resultados/pares/reduccion2-despues.webp",
  },
]

export function ResultsCarousel() {
  const [isMobile, setIsMobile] = useState(false)
 
   useEffect(() => {
     const handleResize = () => {
       const w = window.innerWidth
       setIsMobile(w <= 768)
     }
 
     handleResize()
     window.addEventListener("resize", handleResize)
     return () => window.removeEventListener("resize", handleResize)
   }, [])

  // MOBILE VERSION - Static vertical scroll
  if (isMobile) {
    return (
      <div style={{ width: "100%", backgroundColor: "#F2F2F2", overflow: "hidden" }}>
        {/* Header con título y subtítulo */}
        <div
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingTop: "75px",
            paddingBottom: "80px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline"
          }}
        >
          <h1
            style={{
              color: "#000000",
              lineHeight: "1.2",
              fontWeight: "700", // BOLD
              fontSize: "24px",
              fontFamily: "Poppins, sans-serif",
              margin: 0,
              textAlign: "left",
              letterSpacing: "-0.5px",
            }}
          >
            Casos Seleccionados
          </h1>
          <p
            style={{
              color: "#000000",
              fontSize: "24px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "400",
              margin: 0,
              textAlign: "right",
            }}
          >
            17 - 26
          </p>
        </div>

        {/* Grid estático vertical */}
        <div
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingBottom: "120px",
          }}
        >
          {originalItems.map((item, index) => (
            <div
              key={index}
              style={{
                marginBottom: index < originalItems.length - 1 ? "40px" : "0",
                width: "100%",
              }}
            >
              <CarouselItem item={item} index={index} itemWidth={window.innerWidth - 40} isMobile={true} />
            </div>
          ))}
        </div>

        {/* Footer solo en mobile */}
        <Footer variant="contact" />
      </div>
    )
  }

  // DESKTOP VERSION - Grid 2 columns (6 columnas cada uno)
  return (
    <div style={{ width: "100%", backgroundColor: "#F2F2F2" }}>
      {/* Grid de 12 columnas */}
      <div
        style={{
          paddingLeft: "70px",
          paddingRight: "70px",
          paddingBottom: "100px",
          maxWidth: "1920px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            columnGap: "20px",
            rowGap: "40px",
          }}
        >
          {/* Título a la izquierda - primeras 4 columnas */}
          <div style={{ gridColumn: "span 4", paddingTop: "75px", paddingBottom: "80px" }}>
            <h1
              style={{
                color: "#000000",
                lineHeight: "1.2",
                fontWeight: "700",
                fontSize: "72px",
                fontFamily: "Poppins, sans-serif",
                margin: "0 0 8px 0",
                textAlign: "left",
                letterSpacing: "-2px",
                display: "none", // Ocultamos el título anterior
              }}
            >
            </h1>
            <p
              style={{
                color: "#000000",
                fontSize: "20px",
                fontFamily: "Poppins, sans-serif",
                fontWeight: "600", // Bold
                margin: 0,
                paddingTop: "25px",
                textAlign: "left",
                textTransform: "uppercase",
              }}
            >
              CASOS SELECCIONADOS
            </p>
          </div>

          {/* Centro - '01' - siguientes 4 columnas */}
          <div style={{ gridColumn: "span 4", paddingTop: "75px", paddingBottom: "80px", display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
            <p
              style={{
                color: "#D1D5DB", // Light gray
                fontSize: "20px",
                fontFamily: "Poppins, sans-serif",
                fontWeight: "600",
                margin: 0,
                paddingTop: "25px",
                textAlign: "center",
              }}
            >
              01
            </p>
          </div>

          {/* Scroll text a la derecha - siguientes 4 columnas */}
          <div style={{ gridColumn: "span 4", paddingTop: "75px", paddingBottom: "80px", display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
            <p
              style={{
                color: "#000000",
                fontSize: "20px",
                fontFamily: "Poppins, sans-serif",
                fontWeight: "600", // Bold
                margin: 0,
                paddingTop: "25px",
                textAlign: "right",
              }}
            >
              17 - 26&apos;
            </p>
          </div>

          {/* Items del grid - cada uno ocupa 6 columnas */}
          {originalItems.map((item, index) => (
            <div key={index} style={{ gridColumn: "span 6", width: "100%" }}>
              <CarouselItem item={item} index={index} itemWidth={0} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
