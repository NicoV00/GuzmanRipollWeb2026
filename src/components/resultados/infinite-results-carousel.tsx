"use client"

import React, { useRef, useState, useEffect, useCallback } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { CarouselItem } from "./carousel-item"

const originalItems = [
  { title: "LIPOASPIRACIÓN", subtitle: "(BodyTite, Morpheus8)" },
  { title: "MASTOPEXIA EN T", subtitle: "(Cirugía Mamaria)" },
  { title: "LIPOASPIRACIÓN", subtitle: "(BodyTite)" },
  { title: "LIPOASPIRACIÓN 2024", subtitle: "(BodyTite)" },
  { title: "LIPOESCULTURA", subtitle: "(BodyTite)" },
  { title: "ABDOMINOPLASTIA", subtitle: "(Cirugía Abdominal)" },
  { title: "REDUCCIÓN MAMARIA", subtitle: "(Cirugía Mamaria)" },
  { title: "MODELACIÓN CORPORAL", subtitle: "(BodyTite)" },
  { title: "AUMENTO MAMARIO", subtitle: "(Cirugía Mamaria)" },
  { title: "MORPHEUS8", subtitle: "(Radiofrecuencia Facial)" },
  { title: "GINECOMASTIA", subtitle: "(Reducción Mamaria)" },
  { title: "LIFTING FACIAL", subtitle: "(Rejuvenecimiento)" },
]

const GUTTER = 20
const LERP_FACTOR = 0.1
const LERP_THRESHOLD = 0.5
const WHEEL_MULTIPLIER = 1.2
const TOUCH_MULTIPLIER = 1.0
const LINE_HEIGHT = 16
const MAX_COPIES = 10
const BUFFER = 1

export function InfiniteResultsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const targetScrollRef = useRef<number>(0)
  const animatedScrollRef = useRef<number>(0)
  const touchStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  const [contentWidth, setContentWidth] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const [itemWidth, setItemWidth] = useState(430)
  const [isInitialized, setIsInitialized] = useState(false)

  // Calculate copies needed
  const copiesPerSide = React.useMemo(() => {
    if (contentWidth === 0 || containerWidth === 0) return 2

    const maxPerSide = Math.max(1, Math.floor(MAX_COPIES / 2))
    const requiredPerSide = Math.max(0, Math.ceil(containerWidth / contentWidth) - 1)
    const withBuffer = requiredPerSide + BUFFER

    return Math.min(maxPerSide, Math.max(1, withBuffer))
  }, [contentWidth, containerWidth])

  const beforeKeys = Array.from({ length: copiesPerSide }, (_, i) => `before-${i}`)
  const afterKeys = Array.from({ length: copiesPerSide }, (_, i) => `after-${i}`)

  // Normalize scroll to center zone
  const normalizeScroll = useCallback(
    (scroll: number) => {
      if (contentWidth === 0) return scroll

      const centerZoneStart = contentWidth * copiesPerSide
      const centerZoneEnd = centerZoneStart + contentWidth

      if (scroll < centerZoneStart || scroll >= centerZoneEnd) {
        const withinCycle = ((scroll % contentWidth) + contentWidth) % contentWidth
        return centerZoneStart + withinCycle
      }

      return scroll
    },
    [contentWidth, copiesPerSide]
  )

  // Initialize
  useEffect(() => {
    const handleResize = () => {
      const scrollEl = scrollRef.current
      const contentEl = contentRef.current
      if (!scrollEl || !contentEl) return

      const w = scrollEl.offsetWidth
      setContainerWidth(w)

      const gridWidth = w - 140
      const calculatedWidth = Math.max(300, (gridWidth / 12) * 4)
      setItemWidth(calculatedWidth)

      const cWidth = contentEl.scrollWidth
      setContentWidth(cWidth)

      if (!isInitialized && cWidth > 0) {
        const initialPos = cWidth * copiesPerSide
        scrollEl.scrollLeft = initialPos
        targetScrollRef.current = initialPos
        animatedScrollRef.current = initialPos
        setIsInitialized(true)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [copiesPerSide, isInitialized])

  // Wheel handler
  const handleWheel = useCallback(
    (event: WheelEvent) => {
      event.preventDefault()

      const { deltaX, deltaY, deltaMode } = event
      const multiplier =
        deltaMode === 1 ? LINE_HEIGHT : deltaMode === 2 ? containerWidth || window.innerWidth : 1

      const delta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY
      targetScrollRef.current += delta * multiplier * WHEEL_MULTIPLIER
    },
    [containerWidth]
  )

  // Touch handlers
  const handleTouchStart = useCallback((event: TouchEvent) => {
    const touch = event.targetTouches?.[0] ?? event.changedTouches?.[0]
    if (!touch) return
    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
  }, [])

  const handleTouchMove = useCallback((event: TouchEvent) => {
    event.preventDefault()
    const touch = event.targetTouches?.[0] ?? event.changedTouches?.[0]
    if (!touch) return

    const deltaX = -(touch.clientX - touchStartRef.current.x) * TOUCH_MULTIPLIER
    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
    targetScrollRef.current += deltaX
  }, [])

  // RAF loop
  const animate = useCallback(() => {
    const element = scrollRef.current

    if (!element || contentWidth === 0) {
      rafRef.current = requestAnimationFrame(animate)
      return
    }

    const target = targetScrollRef.current
    const current = animatedScrollRef.current
    const distance = Math.abs(target - current)
    const next = distance < LERP_THRESHOLD ? target : current + (target - current) * LERP_FACTOR

    animatedScrollRef.current = next

    const normalized = normalizeScroll(next)

    if (normalized !== next) {
      const offset = normalized - next
      animatedScrollRef.current = normalized
      targetScrollRef.current += offset
    }

    element.scrollTo({ left: animatedScrollRef.current, behavior: "instant" as ScrollBehavior })
    rafRef.current = requestAnimationFrame(animate)
  }, [normalizeScroll, contentWidth])

  // Start RAF
  useEffect(() => {
    if (!isInitialized) return

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [animate, isInitialized])

  // Event listeners
  useEffect(() => {
    const scrollEl = scrollRef.current
    if (!scrollEl) return

    scrollEl.addEventListener("wheel", handleWheel, { passive: false })
    scrollEl.addEventListener("touchstart", handleTouchStart, { passive: false })
    scrollEl.addEventListener("touchmove", handleTouchMove, { passive: false })

    return () => {
      scrollEl.removeEventListener("wheel", handleWheel)
      scrollEl.removeEventListener("touchstart", handleTouchStart)
      scrollEl.removeEventListener("touchmove", handleTouchMove)
    }
  }, [handleWheel, handleTouchStart, handleTouchMove])

  // Button navigation
  const scroll = (dir: "left" | "right") => {
    const scrollAmount = itemWidth + GUTTER
    targetScrollRef.current += dir === "left" ? -scrollAmount : scrollAmount
  }

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header with title */}
      <div
        style={{
          paddingLeft: "70px",
          paddingRight: "70px",
          paddingTop: "100px",
          paddingBottom: "40px",
          flexShrink: 0,
        }}
      >
        <h1
          style={{
            color: "#000000",
            lineHeight: "1.2",
            fontWeight: "700",
            fontSize: "72px",
            fontFamily: "Poppins, sans-serif",
            margin: 0,
            letterSpacing: "-2px",
          }}
        >
        </h1>
      </div>

      {/* Navigation arrows */}
      <div
        style={{
          paddingLeft: "70px",
          paddingRight: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: "30px",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <button
            onClick={() => scroll("left")}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              opacity: 1,
              transition: "opacity 0.2s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.6"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1"
            }}
            aria-label="Anterior"
          >
            <ArrowLeft color="black" size={24} strokeWidth={1.5} />
          </button>
          <button
            onClick={() => scroll("right")}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              opacity: 1,
              transition: "opacity 0.2s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.6"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1"
            }}
            aria-label="Siguiente"
          >
            <ArrowRight color="black" size={24} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Infinite carousel - flex-grow to fill remaining space */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          position: "relative",
          overflowX: "hidden",
          overflowY: "hidden",
          cursor: "grab",
          minHeight: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            height: "100%",
            userSelect: "none",
            willChange: "transform",
          }}
        >
          {/* Copies before */}
          {beforeKeys.map((key) => (
            <div
              key={key}
              aria-hidden="true"
              style={{
                display: "flex",
                height: "100%",
                paddingLeft: key === "before-0" ? "70px" : "0",
              }}
            >
              {originalItems.map((item, index) => (
                <div
                  key={`${key}-${index}`}
                  style={{
                    marginRight: GUTTER,
                    flexShrink: 0,
                    height: "100%",
                  }}
                >
                  <CarouselItem item={item} index={index} itemWidth={itemWidth} />
                </div>
              ))}
            </div>
          ))}

          {/* Real content */}
          <div
            ref={contentRef}
            style={{
              display: "flex",
              height: "100%",
              paddingLeft: copiesPerSide === 0 ? "70px" : "0",
            }}
          >
            {originalItems.map((item, index) => (
              <div
                key={index}
                style={{
                  marginRight: GUTTER,
                  flexShrink: 0,
                  height: "100%",
                }}
              >
                <CarouselItem item={item} index={index} itemWidth={itemWidth} />
              </div>
            ))}
          </div>

          {/* Copies after */}
          {afterKeys.map((key) => (
            <div
              key={key}
              aria-hidden="true"
              style={{
                display: "flex",
                height: "100%",
              }}
            >
              {originalItems.map((item, index) => (
                <div
                  key={`${key}-${index}`}
                  style={{
                    marginRight: GUTTER,
                    flexShrink: 0,
                    height: "100%",
                  }}
                >
                  <CarouselItem item={item} index={index} itemWidth={itemWidth} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          paddingLeft: "70px",
          paddingRight: "70px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "40px",
          paddingBottom: "40px",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            color: "black",
            fontSize: "16px",
            letterSpacing: "-0.5px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
          }}
        >
          Pacientes - 2018/2025
        </span>
        <span
          style={{
            color: "black",
            fontSize: "16px",
            letterSpacing: "-0.5px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
          }}
        >
          (Scroll infinito)
        </span>
      </div>
    </div>
  )
}
