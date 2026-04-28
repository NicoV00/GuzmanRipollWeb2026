import {
  useShaderLabCanvasSource,
  type ShaderLabConfig,
} from "@basementstudio/shader-lab";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { StaticFallback } from "./ShaderMakerEmbed";
import { AnimatedGradientCanvas } from "./AnimatedGradientCanvas";

const initialConfig: ShaderLabConfig = {
  composition: { height: 917, width: 1905 },
  layers: [
    {
      blendMode: "normal",
      compositeMode: "filter",
      maskConfig: { invert: false, mode: "multiply", source: "luminance" },
      hue: 0,
      id: "a924d323-7026-4b54-8738-355ef0d17009",
      kind: "source",
      name: "Gradient",
      opacity: 1,
      params: {
        preset: "neon-glow",
        activePoints: 3,
        point1Color: "#0a0836",
        point1Position: [0.1100000000000001, -0.09],
        point1Weight: 0.6,
        point2Color: "#070730",
        point2Position: [-0.7, -0.5],
        point2Weight: 2.3,
        point3Color: "#10205c",
        point3Position: [0.8, 0.3],
        point3Weight: 1.2,
        point4Color: "#12296e80",
        point4Position: [0.2, -0.8],
        point4Weight: 0.9,
        point5Color: "#1a2f8a60",
        point5Position: [-0.5, 0.7],
        point5Weight: 1,
        noiseType: "turbulence",
        noiseSeed: 93.1,
        warpAmount: 0.022,
        warpScale: 0.2,
        warpIterations: 3,
        warpDecay: 1,
        warpBias: 0.43,
        vortexAmount: 0.45,
        animate: true,
        falloff: 4.2,
        motionAmount: 0.32,
        motionSpeed: 0.28,
        tonemapMode: "totos",
        glowStrength: 0.1,
        glowThreshold: 0.25,
        grainAmount: 0,
        vignetteStrength: 0.5,
        vignetteRadius: 1.5,
        vignetteSoftness: 1,
      },
      saturation: 1.4,
      type: "gradient",
      visible: true,
    },
  ],
  timeline: { duration: 8, loop: true, tracks: [] },
};

const POINTER_EPSILON = 0.0025;

const cloneConfig = () =>
  JSON.parse(JSON.stringify(initialConfig)) as ShaderLabConfig;

type ShaderMakerSceneProps = {
  priority?: "normal" | "high";
};

const lerp = (start: number, end: number, factor: number) =>
  start + (end - start) * factor;

export function ShaderMakerScene({ priority = "normal" }: ShaderMakerSceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasHostRef = useRef<HTMLDivElement | null>(null);
  const configRef = useRef<ShaderLabConfig>(cloneConfig());
  const targetPos = useRef<[number, number]>([0, 0]);
  const currentPos = useRef<[number, number]>([0, 0]);
  const isVisibleRef = useRef(true);
  const isPageVisibleRef = useRef(true);
  const isScrollingRef = useRef(false);
  const isInteractivePointerRef = useRef(true);
  const lowEndDeviceRef = useRef(false);
  const lastPointerUpdateRef = useRef(0);
  const scrollTimeoutRef = useRef<number | null>(null);
  const elapsedTimeRef = useRef(0);
  const lastUpdateTimeRef = useRef<number | null>(null);
  const warmupFramesRef = useRef(0);
  const [canUseWebGPU, setCanUseWebGPU] = useState<boolean | null>(null);

  const { canvas, ready, resize, update } = useShaderLabCanvasSource(configRef.current);

  useEffect(() => {
    const hasNavigator = typeof navigator !== "undefined";
    const hasWindow = typeof window !== "undefined";

    // Check for mobile devices
    const isMobile = hasWindow && (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.innerWidth <= 768
    );

    // WebGPU is not well supported on mobile, use fallback
    const hasWebGPU = hasNavigator && "gpu" in navigator && !isMobile;
    setCanUseWebGPU(hasWebGPU);

    if (!hasWebGPU || !hasNavigator || !hasWindow) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const prefersCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const connection = navigator as Navigator & {
      connection?: { saveData?: boolean };
      deviceMemory?: number;
    };
    const saveData = connection.connection?.saveData ?? false;
    const lowCores = navigator.hardwareConcurrency
      ? navigator.hardwareConcurrency < 4
      : false;
    const lowMemory =
      typeof connection.deviceMemory === "number" && connection.deviceMemory < 4;

    const isLowEndDevice =
      prefersReducedMotion || prefersCoarsePointer || saveData || lowCores || lowMemory || isMobile;

    lowEndDeviceRef.current = isLowEndDevice;
    isInteractivePointerRef.current = !(prefersCoarsePointer || prefersReducedMotion || isMobile);

    const gradientLayer = configRef.current.layers.find((layer) => layer.type === "gradient");
    if (gradientLayer) {
      gradientLayer.params.activePoints = isLowEndDevice ? 2 : 3;
      gradientLayer.params.point3Weight = isLowEndDevice ? 1.1 : 1.2;
      gradientLayer.params.warpIterations = isLowEndDevice ? 2 : 3;
      gradientLayer.params.motionAmount = isLowEndDevice ? 0.22 : 0.32;
      gradientLayer.params.motionSpeed = isLowEndDevice ? 0.18 : 0.28;
    }

    const handleVisibilityChange = () => {
      isPageVisibleRef.current = document.visibilityState === "visible";
      if (!isPageVisibleRef.current) {
        lastUpdateTimeRef.current = null;
      }
    };

    const handleScroll = () => {
      isScrollingRef.current = true;

      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = window.setTimeout(() => {
        isScrollingRef.current = false;
      }, 140);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange, {
      passive: true,
    });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const host = canvasHostRef.current;
    if (!host || !canvas) return;

    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";

    if (!host.contains(canvas)) {
      host.replaceChildren(canvas);
    }
  }, [canvas]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || canUseWebGPU !== true) return;

    const getPixelRatio = () => {
      const baseRatio = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      // Further reduce pixel ratio for better performance
      return Math.min(baseRatio, lowEndDeviceRef.current ? 1 : 1.25); // Reduced from 1.35 to 1.25
    };

    const applySize = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));

      resize(width, height, getPixelRatio());
    };

    applySize();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        applySize();
      });
      resizeObserver.observe(container);
    } else {
      window.addEventListener("resize", applySize);
    }

    let intersectionObserver: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          isVisibleRef.current = Boolean(entries[0]?.isIntersecting);
          if (!isVisibleRef.current) {
            lastUpdateTimeRef.current = null;
          }
        },
        {
          threshold: 0,
          rootMargin: "150px 0px",
        }
      );
      intersectionObserver.observe(container);
    }

    return () => {
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      window.removeEventListener("resize", applySize);
    };
  }, [canUseWebGPU, resize]);

  useEffect(() => {
    if (canUseWebGPU !== true || !ready) return;

    let rafId = 0;
    // Further optimize frame rates for better performance
    const onscreenFrameBudget = lowEndDeviceRef.current ? 1000 / 24 : 1000 / 30; // Reduced from 30/45 to 24/30
    const offscreenFrameBudget = priority === "high" ? 1000 / 8 : Infinity; // Reduced from 12 to 8

    const tick = (now: number) => {
      rafId = requestAnimationFrame(tick);

      if (!isPageVisibleRef.current || isScrollingRef.current) {
        lastUpdateTimeRef.current = null;
        return;
      }

      const shouldWarmupOffscreen =
        priority === "high" && (!isVisibleRef.current || warmupFramesRef.current < 8);
      const isActivelyRenderable = isVisibleRef.current || shouldWarmupOffscreen;

      if (!isActivelyRenderable) {
        lastUpdateTimeRef.current = null;
        return;
      }

      if (lastUpdateTimeRef.current === null) {
        lastUpdateTimeRef.current = now;
      }

      const deltaMs = now - lastUpdateTimeRef.current;
      const currentFrameBudget = isVisibleRef.current ? onscreenFrameBudget : offscreenFrameBudget;

      if (deltaMs < currentFrameBudget) {
        return;
      }

      const deltaSeconds = Math.min(deltaMs / 1000, 0.05);
      lastUpdateTimeRef.current = now;
      elapsedTimeRef.current += deltaSeconds;
      warmupFramesRef.current += 1;

      // Slower lerp for smoother performance
      currentPos.current[0] = lerp(currentPos.current[0], targetPos.current[0], 0.015); // Reduced from 0.025
      currentPos.current[1] = lerp(currentPos.current[1], targetPos.current[1], 0.015); // Reduced from 0.025

      const gradientLayer = configRef.current.layers.find((layer) => layer.type === "gradient");
      if (gradientLayer) {
        gradientLayer.params.point3Position = [currentPos.current[0], currentPos.current[1]];
      }

      const deltaX = Math.abs(targetPos.current[0] - currentPos.current[0]);
      const deltaY = Math.abs(targetPos.current[1] - currentPos.current[1]);
      if (deltaX < POINTER_EPSILON && deltaY < POINTER_EPSILON) {
        targetPos.current = [currentPos.current[0], currentPos.current[1]];
      }

      update(elapsedTimeRef.current, deltaSeconds);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [canUseWebGPU, priority, ready, update]);

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (
      canUseWebGPU !== true ||
      !isInteractivePointerRef.current ||
      event.pointerType === "touch" ||
      !isVisibleRef.current ||
      !isPageVisibleRef.current
    ) {
      return;
    }

    const now = performance.now();
    if (now - lastPointerUpdateRef.current < 32) {
      return;
    }
    lastPointerUpdateRef.current = now;

    const { currentTarget, clientX, clientY } = event;
    const rect = currentTarget.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((clientY - rect.top) / rect.height) * 2 - 1);

    targetPos.current = [x * 0.3, y * 0.3];
  };

  const handlePointerLeave = () => {
    if (!isInteractivePointerRef.current) return;
    targetPos.current = [0, 0];
  };

  if (canUseWebGPU === false) {
    return <AnimatedGradientCanvas />;
  }

  return (
    <div
      ref={containerRef}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      style={{
        height: "100%",
        inset: 0,
        overflow: "hidden",
        position: "absolute",
        width: "100%",
      }}
    >
      {canUseWebGPU !== true || !ready ? <StaticFallback /> : null}
      <div
        ref={canvasHostRef}
        style={{
          height: "100%",
          opacity: canUseWebGPU && ready ? 1 : 0,
          transition: "opacity 0.5s ease",
          width: "100%",
        }}
      />
    </div>
  );
}