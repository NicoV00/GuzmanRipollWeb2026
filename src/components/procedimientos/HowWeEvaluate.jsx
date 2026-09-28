import React, { useState, useRef, useEffect } from "react"
import { Box } from "@mui/material"
import { AnimatePresence, motion } from "framer-motion"

const MBox = motion.create(Box)

/**
 * Pill + burbuja oscura con spinner girando y texto que se revela palabra
 * por palabra (gris → blanco). Patrón "How did we calculate this".
 */
export default function HowWeEvaluate({
  label = "Cómo evaluamos tu caso",
  text = "Analizamos tus rasgos, proporciones y calidad de piel con planificación digital y simulación 3D para diseñar un plan quirúrgico a medida.",
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const words = text.split(" ")

  // Cerrar al tocar fuera / con Escape
  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === "Escape" && setOpen(false)
    document.addEventListener("pointerdown", onDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("pointerdown", onDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <Box
      ref={rootRef}
      sx={{ position: "relative", display: "inline-block", maxWidth: "100%" }}
    >
      <AnimatePresence>
        {open && (
          <MBox
            key="bubble"
            initial={{ opacity: 0, y: 10, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96, transition: { duration: 0.18 } }}
            transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.7 }}
            sx={{
              position: "absolute",
              bottom: "calc(100% + 14px)",
              left: 0,
              transformOrigin: "bottom left",
              width: { xs: "min(88vw, 400px)", md: "440px" },
              backgroundColor: "#252525",
              borderRadius: "22px",
              p: { xs: "20px 22px 22px", md: "22px 26px 24px" },
              boxShadow: "0 18px 40px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.12)",
              zIndex: 5,
              // Colita apuntando hacia el pill
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: "-9px",
                left: "38px",
                width: 0,
                height: 0,
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                borderTop: "10px solid #252525",
              },
            }}
          >
            {/* Spinner tipo iOS, gira en 12 pasos */}
            <Box
              component="svg"
              viewBox="0 0 24 24"
              aria-hidden
              sx={{
                width: 22,
                height: 22,
                display: "block",
                mb: 1.75,
                animation: "hwe-spin 0.9s steps(12, end) infinite",
                "@keyframes hwe-spin": { to: { transform: "rotate(360deg)" } },
                "@media (prefers-reduced-motion: reduce)": { animation: "none" },
              }}
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <rect
                  key={i}
                  x="11.1"
                  y="1.6"
                  width="1.8"
                  height="5.6"
                  rx="0.9"
                  fill="#fff"
                  opacity={0.15 + (i / 11) * 0.65}
                  transform={`rotate(${i * 30} 12 12)`}
                />
              ))}
            </Box>

            <Box
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: { xs: "15px", md: "16.5px" },
                lineHeight: 1.55,
                fontWeight: 400,
                textAlign: "left",
                letterSpacing: "-0.01em",
              }}
            >
              {words.map((w, i) => (
                <motion.span
                  key={i}
                  initial={{ color: "rgba(255,255,255,0.22)" }}
                  animate={{ color: "rgba(255,255,255,1)" }}
                  transition={{ duration: 0.35, delay: 0.15 + i * 0.055 }}
                  style={{ display: "inline-block", marginRight: "0.28em" }}
                >
                  {w}
                </motion.span>
              ))}
            </Box>
          </MBox>
        )}
      </AnimatePresence>

      {/* Pill: dos segmentos separados, como la referencia */}
      <Box
        component="button"
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          border: 0,
          p: 0,
          background: "none",
          cursor: "pointer",
          WebkitTapHighlightColor: "transparent",
          "& .hwe-seg": {
            backgroundColor: open ? "rgba(0,0,0,0.075)" : "rgba(0,0,0,0.045)",
            transition: "background-color .25s cubic-bezier(.22,1,.36,1), transform .25s cubic-bezier(.22,1,.36,1)",
          },
          "&:hover .hwe-seg": { backgroundColor: "rgba(0,0,0,0.075)" },
          "&:active .hwe-seg": { transform: "scale(0.975)" },
          "&:focus-visible": { outline: "2px solid #0081C7", outlineOffset: "3px", borderRadius: "100px" },
        }}
      >
        <Box
          className="hwe-seg"
          sx={{
            width: 46,
            height: 46,
            borderRadius: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Box
            component="svg"
            viewBox="0 0 24 24"
            aria-hidden
            sx={{ width: 22, height: 22 }}
            fill="none"
            stroke="rgba(0,0,0,0.5)"
            strokeWidth="1.6"
          >
            <circle cx="12" cy="12" r="9.2" />
            <path
              d="M9.6 9.3a2.5 2.5 0 1 1 3.2 2.4c-.6.2-.9.7-.9 1.3v.5"
              strokeLinecap="round"
            />
            <circle cx="11.9" cy="16.6" r="0.95" fill="rgba(0,0,0,0.5)" stroke="none" />
          </Box>
        </Box>

        <Box
          className="hwe-seg"
          sx={{
            height: 46,
            display: "flex",
            alignItems: "center",
            px: "20px",
            borderRadius: "100px",
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "14px", md: "15px" },
            fontWeight: 400,
            color: "rgba(0,0,0,0.55)",
            whiteSpace: "nowrap",
            letterSpacing: "-0.01em",
          }}
        >
          {label}
        </Box>
      </Box>
    </Box>
  )
}
