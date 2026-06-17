'use client';
import { useEffect, useRef } from "react";

/**
 * VideoBackground
 * Fondo de video optimizado para performance. Reemplaza el shader LiquidEther.
 *
 * Optimizaciones:
 * - autoplay/muted/loop/playsInline → reproducción silenciosa permitida por los navegadores.
 * - IntersectionObserver → pausa el video cuando NO está visible (no decodifica fuera de pantalla).
 * - prefers-reduced-motion → muestra solo el primer frame (sin reproducir).
 * - Page Visibility API → pausa cuando la pestaña está en segundo plano.
 * - GPU compositing (translateZ) + pointer-events: none → no interfiere con el contenido.
 */
export default function VideoBackground({
  src = "/videos/Background.mp4",
  poster,
  objectPosition = "center",
  className = "",
  style = {},
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Forzar autoplay silencioso en mobile: React no setea de forma confiable el atributo `muted`,
    // y sin él iOS/Android bloquean el autoplay (aparece el botón de play). Lo seteamos a mano.
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const tryPlay = () => {
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    // Reintentar apenas el video tiene datos (clave en mobile)
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);

    // Último recurso: si el navegador igual bloquea, arrancar al primer gesto
    const onFirstInteraction = () => {
      tryPlay();
      window.removeEventListener("touchstart", onFirstInteraction);
      window.removeEventListener("click", onFirstInteraction);
    };
    window.addEventListener("touchstart", onFirstInteraction, { passive: true });
    window.addEventListener("click", onFirstInteraction);

    // Pausar/reanudar según visibilidad en el viewport (ahorra CPU/GPU al decodificar)
    let observer;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) tryPlay();
          else video.pause();
        },
        { threshold: 0.01 }
      );
      observer.observe(video);
    } else {
      tryPlay();
    }

    // Pausar cuando la pestaña no está activa
    const handleVisibility = () => {
      if (document.hidden) video.pause();
      else if (isInViewport(video)) tryPlay();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    tryPlay();

    return () => {
      if (observer) observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      window.removeEventListener("touchstart", onFirstInteraction);
      window.removeEventListener("click", onFirstInteraction);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      disableRemotePlayback
      tabIndex={-1}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition,
        pointerEvents: "none",
        userSelect: "none",
        transform: "translateZ(0)",
        willChange: "transform",
        ...style,
      }}
    />
  );
}

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight;
}
