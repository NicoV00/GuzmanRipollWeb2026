"use client"

import { useRef } from "react"
import { Box, Typography } from "@mui/material"
import WebGPUSpinnerComponent from "../animations/WebGPUSpinner"

// ─── Custom Pixel Grid Icon ──────────────────────────────
const PixelGridIcon = ({ stepIndex, isBlue }: { stepIndex: number, isBlue: boolean }) => {
  const activeColor = isBlue ? "#ffffff" : "#0081C7";
  const inactiveColor = isBlue ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.06)";

  // Define patterns for each step (3x3 grid)
  const patterns = [
    // Step 0: 1 pixel lit (top-left)
    [1, 0, 0, 0, 0, 0, 0, 0, 0],
    // Step 1: 4 pixels lit (2x2 square in top-left)
    [1, 1, 0, 1, 1, 0, 0, 0, 0],
    // Step 2: 6 pixels lit (3x2 rectangle)
    [1, 1, 1, 1, 1, 1, 0, 0, 0],
    // Step 3: All 9 pixels lit
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  const currentPattern = patterns[stepIndex] || patterns[0];

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', width: '26px', height: '26px' }}>
      {currentPattern.map((isActive, i) => (
        <Box 
          key={i} 
          className="pixel-dot"
          sx={{ 
            width: '6px', 
            height: '6px', 
            backgroundColor: isActive ? activeColor : inactiveColor,
            borderRadius: '1.5px',
            transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
          }} 
        />
      ))}
    </Box>
  )
}

// ─── Data ────────────────────────────────────────────────
export default function ProcessSteps({ procedureId }: { procedureId?: string }) {
  const containerRef = useRef(null)

  const isBreastSurgery = procedureId === "01";

  const currentSteps = [
    {
      title: "Consulta Inicial",
      description: "Evaluación integral de tus expectativas y anatomía para un plan único.",
      isBlue: true,
      type: "flow"
    },
    {
      title: isBreastSurgery ? "Planificación 3D" : "Evaluación Médica",
      description: isBreastSurgery 
        ? "Diseñamos un plan preciso mediante simulación Crisalix 3D avanzada." 
        : "Estudio exhaustivo de cada caso para garantizar resultados seguros y naturales.",
      isBlue: true,
      type: "rose"
    },
    {
      title: "Procedimiento",
      description: "Ejecución quirúrgica impecable en instalaciones de primer nivel.",
      isBlue: true,
      type: "lissajous"
    },
    {
      title: "Resultados & Seguimiento",
      description: "Acompañamiento VIP continuo hasta alcanzar tu mejor versión.",
      isBlue: true,
      type: "loops"
    }
  ];

  return (
    <Box
      ref={containerRef}
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: "20px", md: "70px" },
        backgroundColor: "transparent",
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 8, textAlign: "left", maxWidth: "800px" }}>
        <Box sx={{ display: "flex", alignItems: "baseline", gap: { xs: "10px", md: "16px" }, mb: 3 }}>
          <Typography component="span" sx={{
            fontFamily: "Poppins, sans-serif", fontSize: { xs: "14px", md: "18px" }, fontWeight: 500,
            color: "rgba(0, 0, 0, 0.37)", lineHeight: 1,
          }}>
            (04)
          </Typography>
          <Typography component="span" sx={{
            fontFamily: "Poppins, sans-serif", fontSize: { xs: "14px", md: "18px" }, fontWeight: 500,
            color: "black", textTransform: "uppercase", letterSpacing: "-0.03em", lineHeight: 1,
          }}>
            NUESTRO PROCESO
          </Typography>
        </Box>
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "2.5rem", md: "3.5rem" },
            fontWeight: 500,
            lineHeight: 1.1,
            color: "#111",
            letterSpacing: "-0.03em",
          }}
        >
          Excelencia en cada paso del proceso
        </Typography>
      </Box>

      {/* Grid Layout */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
          gap: "20px",
        }}
      >
        {currentSteps.map((step, index) => (
          <ProcessCard key={index} step={step} index={index} />
        ))}
      </Box>
    </Box>
  )
}

function ProcessCard({ step, index }: { step: any, index: number }) {
  return (
    <Box
      className="process-card"
      sx={{
        position: "relative",
        backgroundColor: step.isBlue ? "#0081C7" : "#ffffff", // Pure white for better contrast
        borderRadius: "24px",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "280px",
        cursor: "pointer",
        transition: "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        overflow: "hidden",
        boxShadow: step.isBlue 
          ? "0 0 20px rgba(0, 129, 199, 0.2)" 
          : "0 10px 40px rgba(0,0,0,0.04)", // Subtle shadow to pop on gray background
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: step.isBlue
            ? "0 0 40px rgba(0, 129, 199, 0.6)" // GLOW effect
            : "0 10px 30px rgba(0,0,0,0.08)",
          "& .pixel-dot": {
            backgroundColor: step.isBlue ? "#ffffff" : "#0081C7",
            transform: "scale(1.15)"
          }
        }
      }}
    >
      {/* Top: Centered Action/Spinner */}
      <Box sx={{ position: "relative", zIndex: 1, width: "100%", height: "150px", mb: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>
        {/* Expanded bounding box so the canvas doesn't hard crop on the sides */}
        <Box sx={{ width: "140px", height: "140px", position: "relative", zIndex: 2 }}>
           <WebGPUSpinnerComponent type={step.type} />
        </Box>

      </Box>

      {/* Bottom: Content */}
      <Box sx={{ position: "relative", zIndex: 1, textAlign: "left", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "1.25rem",
            fontWeight: 600,
            color: step.isBlue ? "#fff" : "#111",
            mb: 1.5,
            letterSpacing: "-0.02em",
          }}
        >
          {step.title}
        </Typography>
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "0.95rem",
            fontWeight: 400,
            color: step.isBlue ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.6)",
            lineHeight: 1.6,
          }}
        >
          {step.description}
        </Typography>
      </Box>
    </Box>
  )
}
