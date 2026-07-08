import React, { useRef, useState, useEffect, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { ChevronsLeftRight } from "lucide-react";

// Easing tipo Apple, sin ease-in. Transiciones < 300ms.
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const isVideo = (src = "") => /\.(mp4|webm|mov)$/i.test(src);

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  aspectRatio = "3 / 4",
  fit = "cover",              // "cover" = llena y recorta | "contain" = muestra completo sin recortar
  beforeAlt = "Antes de la simulación",
  afterAlt = "Después de la simulación",
}) {
  const containerRef = useRef(null);
  const [pos, setPos] = useState(50);        // % del divisor (arranca al 50%)
  const [dragging, setDragging] = useState(false);
  const [instant, setInstant] = useState(false); // true = seguir el dedo sin transición (sin lag)
  const [reduced, setReduced] = useState(false);

  // prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const posFromClientX = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return 50;
    return Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
  }, []);

  // Pointer Events: unifica mouse + touch. touch-action:none evita el scroll al arrastrar.
  const onPointerDown = useCallback((e) => {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setInstant(false);                 // click puntual => salto con transición suave
    setDragging(true);
    setPos(posFromClientX(e.clientX));
  }, [posFromClientX]);

  const onPointerMove = useCallback((e) => {
    if (!dragging) return;
    setInstant(true);                  // ya estamos arrastrando => sin transición
    setPos(posFromClientX(e.clientX));
  }, [dragging, posFromClientX]);

  const endDrag = useCallback(() => {
    setDragging(false);
    setInstant(false);
  }, []);

  // Teclado: flechas mueven el divisor, Home/End a los extremos.
  const onKeyDown = useCallback((e) => {
    let next = null;
    if (e.key === "ArrowLeft") next = pos - 2;
    else if (e.key === "ArrowRight") next = pos + 2;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = 100;
    if (next === null) return;
    e.preventDefault();
    setInstant(false);
    setPos(Math.max(0, Math.min(100, next)));
  }, [pos]);

  // Solo animamos transform / clip-path / left. Sin transición al arrastrar o con reduced-motion.
  const revealMotion = reduced || instant ? "none" : `clip-path 0.25s ${EASE}, left 0.25s ${EASE}`;
  const handleLeftMotion = reduced || instant ? "0s" : `0.25s`;

  const mediaSx = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: fit,
    display: "block",
    pointerEvents: "none",
  };

  const renderMedia = (src, alt) =>
    isVideo(src) ? (
      <Box component="video" src={src} autoPlay muted loop playsInline aria-label={alt} sx={mediaSx} />
    ) : (
      <Box component="img" src={src} alt={alt} sx={mediaSx} />
    );

  const pillSx = {
    position: "absolute",
    top: 12,
    zIndex: 4,
    px: "11px",
    py: "5px",
    borderRadius: "999px",
    fontFamily: "Poppins, sans-serif",
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#1a1a1a",
    backgroundColor: "#F2F2F2",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.14)",
    pointerEvents: "none",
    lineHeight: 1,
  };

  return (
    <Box
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio,
        borderRadius: "18px",
        overflow: "hidden",
        cursor: "ew-resize",
        userSelect: "none",
        touchAction: "none",
        backgroundColor: "#e9e6e1",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      }}
    >
      {/* DESPUÉS (fondo completo) */}
      {renderMedia(afterSrc, afterAlt)}

      {/* ANTES (recortado por el divisor) */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          clipPath: `inset(0 ${100 - pos}% 0 0)`,
          transition: revealMotion,
          willChange: "clip-path",
        }}
      >
        {renderMedia(beforeSrc, beforeAlt)}
      </Box>

      {/* Pills */}
      <Typography component="span" sx={{ ...pillSx, left: 12 }}>Antes</Typography>
      <Typography component="span" sx={{ ...pillSx, right: 12 }}>Después</Typography>

      {/* Divisor */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: `${pos}%`,
          transform: "translateX(-50%)",
          width: "2px",
          height: "100%",
          backgroundColor: "rgba(255,255,255,0.95)",
          boxShadow: "0 0 8px rgba(0,0,0,0.25)",
          zIndex: 5,
          pointerEvents: "none",
          transition: revealMotion,
          willChange: "left",
        }}
      />

      {/* Handle circular (navegable por teclado) */}
      <Box
        role="slider"
        tabIndex={0}
        aria-label="Comparador antes y después"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={onKeyDown}
        sx={{
          position: "absolute",
          top: "50%",
          left: `${pos}%`,
          transform: `translate(-50%, -50%) scale(${dragging ? 1.05 : 1})`,
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: "#fff",
          border: "3px solid #fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#1a1a1a",
          zIndex: 6,
          boxShadow: dragging
            ? "0 6px 18px rgba(0,0,0,0.28)"
            : "0 4px 12px rgba(0,0,0,0.22)",
          cursor: "ew-resize",
          outline: "none",
          touchAction: "none",
          transition: reduced
            ? "none"
            : `transform 0.2s ${EASE}, box-shadow 0.2s ${EASE}, left ${handleLeftMotion} ${EASE}`,
          "&:focus-visible": {
            boxShadow: "0 0 0 4px rgba(0,129,199,0.45), 0 4px 12px rgba(0,0,0,0.22)",
          },
        }}
      >
        <ChevronsLeftRight size={18} strokeWidth={2.5} />
      </Box>
    </Box>
  );
}
