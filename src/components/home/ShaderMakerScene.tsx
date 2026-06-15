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
        activePoints: 4,
        point1Color: "#020414", // Very dark navy
        point1Position: [0.1, -0.1],
        point1Weight: 0.8,
        point2Color: "#050b2a", // Deep sapphire
        point2Position: [-0.6, -0.4],
        point2Weight: 2.0,
        point3Color: "#0a164c", // Medium deep blue
        point3Position: [0.7, 0.4],
        point3Weight: 1.5,
        point4Color: "#122675", // Slightly brighter highlight
        point4Position: [0.2, -0.7],
        point4Weight: 1.0,
        point5Color: "#1a2f8a",
        point5Position: [-0.5, 0.7],
        point5Weight: 1,
        noiseType: "simplex", // Smoother than turbulence
        noiseSeed: 42.0,
        warpAmount: 0.015, // Less intense distortion
        warpScale: 0.12, // Larger, broader waves
        warpIterations: 2,
        warpDecay: 1,
        warpBias: 0.5,
        vortexAmount: 0.3,
        animate: true,
        falloff: 3.5, // Smoother blending
        motionAmount: 0.25,
        motionSpeed: 0.2,
        tonemapMode: "totos",
        glowStrength: 0.05,
        glowThreshold: 0.4,
        grainAmount: 0,
        vignetteStrength: 0.6,
        vignetteRadius: 1.4,
        vignetteSoftness: 1,
      },
      saturation: 1.1,
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

    // Check for large screen size
    const isLargeScreen = hasWindow && (window.innerWidth > 1920 || window.innerHeight > 1080);

    const gradientLayer = configRef.current.layers.find((layer) => layer.type === "gradient");
    if (gradientLayer) {
      // Reduce complexity on both low-end devices AND large screens
      const reduceComplexity = isLowEndDevice || isLargeScreen;
      gradientLayer.params.activePoints = reduceComplexity ? 2 : 3;
      gradientLayer.params.point3Weight = reduceComplexity ? 1.1 : 1.2;
      gradientLayer.params.warpIterations = reduceComplexity ? 1 : 2;
      gradientLayer.params.motionAmount = reduceComplexity ? 0.22 : 0.32;
      gradientLayer.params.motionSpeed = reduceComplexity ? 0.18 : 0.28;
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
      // Reduce pixel ratio for better performance on large screens while keeping it smooth
      return Math.min(baseRatio, lowEndDeviceRef.current ? 0.75 : 1);
    };

    const applySize = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));

      // Scale down resolution for large windows to prevent performance issues
      // Cap at 1920x1080 effective resolution, scaling down larger windows
      const maxWidth = 1920;
      const maxHeight = 1080;
      let pixelRatio = getPixelRatio();

      // If the actual size exceeds our max, reduce pixel ratio to compensate
      if (width > maxWidth || height > maxHeight) {
        const widthScale = width > maxWidth ? maxWidth / width : 1;
        const heightScale = height > maxHeight ? maxHeight / height : 1;
        const minScale = Math.min(widthScale, heightScale);
        pixelRatio = pixelRatio * minScale * 0.9; // Additional 0.9 safety factor
      }

      resize(width, height, pixelRatio);
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
    // Optimize frame rates for fluid and smooth performance
    const onscreenFrameBudget = lowEndDeviceRef.current ? 1000 / 30 : 1000 / 60; // Increased to 60 FPS
    const offscreenFrameBudget = priority === "high" ? 1000 / 12 : Infinity;

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

      // Faster lerp for a fluid, responsive trail
      currentPos.current[0] = lerp(currentPos.current[0], targetPos.current[0], 0.05);
      currentPos.current[1] = lerp(currentPos.current[1], targetPos.current[1], 0.05);

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