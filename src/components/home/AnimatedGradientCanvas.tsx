import { useEffect, useRef } from "react";

export function AnimatedGradientCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let t = 0;
    let w = 1;
    let h = 1;
    let last = 0;
    const INTERVAL = 1000 / 30;

    const resize = () => {
      w = el.offsetWidth || window.innerWidth;
      h = el.offsetHeight || window.innerHeight;
      el.width = w;
      el.height = h;
    };
    resize();

    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    ro?.observe(el);

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (now - last < INTERVAL) return;
      last = now;
      t += 0.003;

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#050816";
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "screen";

      const b1x = (0.11 + Math.sin(t * 0.7) * 0.09) * w;
      const b1y = (0.18 + Math.cos(t * 0.5) * 0.08) * h;
      const g1 = ctx.createRadialGradient(b1x, b1y, 0, b1x, b1y, 0.58 * Math.max(w, h));
      g1.addColorStop(0, "rgba(10,8,54,0.96)");
      g1.addColorStop(0.45, "rgba(10,8,54,0.35)");
      g1.addColorStop(1, "rgba(10,8,54,0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      const b2x = (0.78 + Math.cos(t * 0.4) * 0.1) * w;
      const b2y = (0.28 + Math.sin(t * 0.6) * 0.1) * h;
      const g2 = ctx.createRadialGradient(b2x, b2y, 0, b2x, b2y, 0.45 * Math.max(w, h));
      g2.addColorStop(0, "rgba(16,32,92,0.72)");
      g2.addColorStop(0.5, "rgba(16,32,92,0.22)");
      g2.addColorStop(1, "rgba(16,32,92,0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      const b3x = (0.3 + Math.sin(t * 0.35) * 0.13) * w;
      const b3y = (0.75 + Math.cos(t * 0.45) * 0.1) * h;
      const g3 = ctx.createRadialGradient(b3x, b3y, 0, b3x, b3y, 0.44 * Math.max(w, h));
      g3.addColorStop(0, "rgba(7,7,48,0.9)");
      g3.addColorStop(0.4, "rgba(7,7,48,0.3)");
      g3.addColorStop(1, "rgba(7,7,48,0)");
      ctx.fillStyle = g3;
      ctx.fillRect(0, 0, w, h);

      const b4x = (0.45 + Math.sin(t * 0.28) * 0.12) * w;
      const b4y = (0.45 + Math.cos(t * 0.38) * 0.12) * h;
      const g4 = ctx.createRadialGradient(b4x, b4y, 0, b4x, b4y, 0.35 * Math.max(w, h));
      g4.addColorStop(0, "rgba(18,41,110,0.42)");
      g4.addColorStop(0.5, "rgba(18,41,110,0.1)");
      g4.addColorStop(1, "rgba(18,41,110,0)");
      ctx.fillStyle = g4;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "source-over";
      const vig = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.75);
      vig.addColorStop(0, "transparent");
      vig.addColorStop(0.62, "rgba(5,8,22,0.12)");
      vig.addColorStop(1, "rgba(5,8,22,0.70)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
    />
  );
}
