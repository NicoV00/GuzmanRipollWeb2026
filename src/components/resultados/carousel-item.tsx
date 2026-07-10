"use client"

import React from "react"

interface CarouselItemProps {
  item: { title: string; subtitle: string; antes?: string; despues?: string }
  index: number
  itemWidth: number
  isMobile?: boolean
}

const ITEM_HEIGHT = 525
const ITEM_HEIGHT_MOBILE = 400

const labelStyle: React.CSSProperties = {
  position: "absolute",
  bottom: "10px",
  left: "10px",
  padding: "4px 10px",
  borderRadius: "999px",
  backgroundColor: "rgba(7, 17, 28, 0.55)",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  color: "#fff",
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "0.6px",
  textTransform: "uppercase",
  fontFamily: "Poppins, sans-serif",
  pointerEvents: "none",
}

export function CarouselItem({ item, index, itemWidth, isMobile = false }: CarouselItemProps) {
  const { title: itemTitle, subtitle: itemSubtitle, antes, despues } = item
  const itemHeight = isMobile ? ITEM_HEIGHT_MOBILE : ITEM_HEIGHT

  // Si itemWidth es 0, usar 100% (para grid layout)
  const width = itemWidth === 0 ? "100%" : `${itemWidth}px`

  return (
    <div
      style={{
        width: width,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      {/* Contenedor de imagen: antes y después lado a lado */}
      <div
        style={{
          width: "100%",
          height: `${itemHeight}px`,
          borderRadius: "12px",
          overflow: "hidden",
          position: "relative",
          background: "linear-gradient(to bottom, #B8BABB, #B0B2B3, #A9ABAC)",
          display: "flex",
          gap: "2px",
        }}
      >
        <div style={{ position: "relative", width: "50%", height: "100%" }}>
          {antes && (
            <img
              src={antes}
              alt={`${itemTitle} — antes`}
              loading="lazy"
              decoding="async"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          )}
          <span style={labelStyle}>Antes</span>
        </div>
        <div style={{ position: "relative", width: "50%", height: "100%" }}>
          {despues && (
            <img
              src={despues}
              alt={`${itemTitle} — después`}
              loading="lazy"
              decoding="async"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          )}
          <span style={labelStyle}>Después</span>
        </div>
      </div>

      {/* Título y subtítulo en layout horizontal */}
      <div
        style={{
          paddingTop: "12px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          paddingBottom: "10px",
        }}
      >
        <h3
          style={{
            color: "black",
            fontSize: "18px",
            fontWeight: 500,
            lineHeight: 1.4,
            margin: 0,
            fontFamily: "Poppins, sans-serif",
            textAlign: "left",
          }}
        >
          {itemTitle}
        </h3>
        <p
          style={{
            color: "black",
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: 1.4,
            margin: 0,
            fontFamily: "Poppins, sans-serif",
            textAlign: "right",
          }}
        >
          {itemSubtitle}
        </p>
      </div>

      {/* Línea separadora negra */}
      <div
        style={{
          width: "100%",
          height: "0.2px",
          backgroundColor: "black",
        }}
      />
    </div>
  )
}
