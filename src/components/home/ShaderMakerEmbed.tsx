import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatedGradientCanvas } from "./AnimatedGradientCanvas";

const loadShaderMakerScene = () =>
  import("./ShaderMakerScene");

const ShaderMakerScene = lazy(async () => {
  const module = await loadShaderMakerScene();
  return { default: module.ShaderMakerScene };
});

type ShaderMakerEmbedProps = {
  priority?: "normal" | "high";
};

// Error boundary — catches WebGPU crashes so they don't blank the page
class ShaderErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return <AnimatedGradientCanvas />;
    return this.props.children;
  }
}

// Keep exported — used by ShaderMakerScene as brief loading state
export function StaticFallback() {
  return (
    <div
      aria-hidden="true"
      style={{
        height: "100%",
        inset: 0,
        overflow: "hidden",
        position: "absolute",
        width: "100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 18% 18%, rgba(5, 11, 42, 0.96) 0%, rgba(5, 11, 42, 0) 42%), radial-gradient(circle at 78% 30%, rgba(10, 22, 76, 0.72) 0%, rgba(10, 22, 76, 0) 36%), radial-gradient(circle at 32% 78%, rgba(18, 38, 117, 0.42) 0%, rgba(18, 38, 117, 0) 34%), linear-gradient(145deg, #020414 0%, #03061c 38%, #050b2a 100%)",
          filter: "blur(0px)",
          transform: "scale(1.08)",
          animation: "shader-fallback-drift-a 18s ease-in-out infinite alternate",
          willChange: "transform",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "-12%",
          background:
            "radial-gradient(circle at 72% 18%, rgba(2, 4, 20, 0.92) 0%, rgba(2, 4, 20, 0) 36%), radial-gradient(circle at 68% 72%, rgba(10, 22, 76, 0.28) 0%, rgba(10, 22, 76, 0) 30%), radial-gradient(circle at 42% 48%, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 22%)",
          mixBlendMode: "screen",
          filter: "blur(26px)",
          opacity: 0.95,
          animation: "shader-fallback-drift-b 22s ease-in-out infinite alternate",
          willChange: "transform, opacity",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 50%, transparent 0%, rgba(5, 8, 22, 0.12) 62%, rgba(5, 8, 22, 0.7) 100%)",
          pointerEvents: "none",
        }}
      />
      <style>
        {`
          @keyframes shader-fallback-drift-a {
            0% { transform: scale(1.08) translate3d(-1.5%, -1%, 0) rotate(0deg); }
            50% { transform: scale(1.12) translate3d(1.5%, 1.2%, 0) rotate(2deg); }
            100% { transform: scale(1.1) translate3d(-0.5%, 2%, 0) rotate(-1.5deg); }
          }

          @keyframes shader-fallback-drift-b {
            0% { transform: translate3d(0%, 0%, 0) scale(1); opacity: 0.82; }
            50% { transform: translate3d(-2%, 1.5%, 0) scale(1.04); opacity: 1; }
            100% { transform: translate3d(2%, -1%, 0) scale(0.98); opacity: 0.88; }
          }
        `}
      </style>
    </div>
  );
}

export function ShaderMakerEmbed({ priority = "normal" }: ShaderMakerEmbedProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(priority === "high");

  useEffect(() => {
    if (shouldLoad) return;

    const preload = () => { void loadShaderMakerScene(); };

    if (priority === "high") {
      preload();
      return;
    }

    const requestIdle =
      typeof window !== "undefined" && "requestIdleCallback" in window
        ? window.requestIdleCallback.bind(window)
        : null;

    if (requestIdle) {
      const idleId = requestIdle(() => { preload(); }, { timeout: 1200 });
      return () => { window.cancelIdleCallback?.(idleId); };
    }

    const timeoutId = window.setTimeout(preload, 500);
    return () => window.clearTimeout(timeoutId);
  }, [priority, shouldLoad]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || shouldLoad) return;

    if (priority === "high") {
      setShouldLoad(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "1200px 0px", threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [priority, shouldLoad]);

  return (
    <div
      ref={containerRef}
      style={{
        height: "100%",
        inset: 0,
        overflow: "hidden",
        position: "absolute",
        width: "100%",
      }}
    >
      <Suspense fallback={<StaticFallback />}>
        <ShaderErrorBoundary>
          {shouldLoad ? <ShaderMakerScene priority={priority} /> : <StaticFallback />}
        </ShaderErrorBoundary>
      </Suspense>
    </div>
  );
}
