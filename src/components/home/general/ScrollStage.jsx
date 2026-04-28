import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Vertex Shader with timed organic deformation
const vertexShader = `
uniform float uTime;
uniform float uFrequency;
uniform float uAmplitude;
uniform float uDensity;
uniform float uStrength;

varying float vDistortion;

#define PI 3.14159265359

void main() {
  float t = uTime;
  
  // 20 second loop: 15s sphere + 5s deformation
  float loopDuration = 20.0;
  float cycleTime = mod(t, loopDuration);
  
  // morphProgress: 0 for first 15s, then smoothly goes to 1 and back to 0 over 5s
  float morphProgress = 0.0;
  if (cycleTime > 15.0) {
    float deformTime = cycleTime - 15.0; // 0 to 5
    // Smooth sine wave: 0 -> 1 -> 0 over 5 seconds
    // sin goes from 0 to 1 to 0 smoothly over the full period
    morphProgress = sin((deformTime / 5.0) * PI);
  }
  
  // Coordenadas esféricas
  float radius = length(position);
  float theta = atan(position.z, position.x);
  float phi = acos(clamp(position.y / radius, -1.0, 1.0));
  
  // Deformación sutil y orgánica
  float subtleWave = sin(theta * 5.0 + t * 0.5) * 0.15;
  float verticalWave = sin(phi * 3.0 + t * 0.3) * 0.12;
  
  // Ondulación suave sin formar pétalos pronunciados
  float organicDistortion = subtleWave + verticalWave;
  
  // Deformación muy sutil en dirección normal
  vec3 subtleDeform = normal * organicDistortion * morphProgress;
  
  // Interpolación entre esfera y deformación sutil
  vec3 deformation = subtleDeform * uStrength * 0.6; // Aumentado para más deformación
  
  // Sin movimiento vertical
  float verticalMovement = 0.0;
  
  // Ondulación base sutil
  float waveDistortion = sin(position.y * uFrequency + t) * uAmplitude * 0.05;
  
  vec3 pos = position + deformation + normal * waveDistortion;
  
  // Distorsión para el color (más sutil)
  vDistortion = length(deformation) * 0.8 + abs(waveDistortion) * 2.0 + abs(organicDistortion) * 0.4;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}
`;

// Fragment Shader
const fragmentShader = `
uniform float uOpacity;
uniform float uDeepPurple;
 
varying float vDistortion;

vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(6.28318 * (c * t + d));
}     
 
void main() {
  float distort = vDistortion * 3.;

  // Dark blue palette
  vec3 brightness = vec3(.05, .1, .3);  // Darker, more blue
  vec3 contrast = vec3(.1, .15, .4);    // Low contrast, emphasize blue
  vec3 oscilation = vec3(.3, .4, .8);   // Blue oscillation
  vec3 phase = vec3(.5, .6, .9);        // Blue phase shift
 
  vec3 color = cosPalette(distort, brightness, contrast, oscilation, phase);
  
  // Add deep blue tint
  gl_FragColor = vec4(color, vDistortion);
  gl_FragColor += vec4(0., 0.1, min(uDeepPurple, 1.) * 0.6, min(uOpacity, 1.));
}
`;

export default function ScrollStage() {
  const canvasRef = useRef(null);
  const meshRef = useRef(null);
  const materialRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Check for mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.innerWidth <= 768;

    // Check WebGL capabilities
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    const isWebGLSupported = !!gl;

    if (!isWebGLSupported) {
      console.warn('WebGL not supported on this device');
      return;
    }

    // Viewport
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    // Settings - optimize for mobile
    const settings = {
      uFrequency: isMobile ? 1.5 : 2,
      uAmplitude: isMobile ? 0.2 : 0.3,
      uDensity: isMobile ? 1.0 : 1.5,
      uStrength: isMobile ? 0.5 : 0.8,
      uDeepPurple: isMobile ? 0.5 : 0.7,
      uOpacity: isMobile ? 0.3 : 0.4
    };

    // Scene setup
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });

    const camera = new THREE.PerspectiveCamera(
      48,
      viewport.width / viewport.height,
      0.1,
      10
    );
    camera.position.set(-0.55, -0.04, 2.5);
    scene.add(camera);

    // Mesh - reduce complexity for mobile
    const geometry = new THREE.IcosahedronGeometry(1, isMobile ? 32 : 64);
    const material = new THREE.ShaderMaterial({
      wireframe: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uFrequency: { value: settings.uFrequency },
        uAmplitude: { value: settings.uAmplitude },
        uDensity: { value: settings.uDensity },
        uStrength: { value: settings.uStrength },
        uDeepPurple: { value: settings.uDeepPurple },
        uOpacity: { value: settings.uOpacity }
      },
      // Add mobile optimizations
      precision: isMobile ? 'mediump' : 'highp'
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    meshRef.current = mesh;
    materialRef.current = material;

    // Clock
    const clock = new THREE.Clock();

    // Event handlers
    const handleResize = () => {
      viewport.width = window.innerWidth;
      viewport.height = window.innerHeight;

      if (viewport.width < viewport.height) {
        mesh.scale.set(0.75, 0.75, 0.75);
      } else {
        mesh.scale.set(1, 1, 1);
      }

      camera.aspect = viewport.width / viewport.height;
      camera.updateProjectionMatrix();

      renderer.setSize(viewport.width, viewport.height);
      // Lower pixel ratio for better performance
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.25)); // Reduced desktop from 1.5 to 1.25
    };

    // Animation loop with performance optimization
    let frameCount = 0;
    const animate = () => {
      frameCount++;

      // Skip frames for better performance (render every 2 frames)
      if (frameCount % 2 === 0) {
        const elapsedTime = clock.getElapsedTime();

        // Update time uniform for morphing
        material.uniforms.uTime.value = elapsedTime;

        // Gentle rotation - slightly slower for better performance
        mesh.rotation.y = elapsedTime * 0.03; // Reduced from 0.05
        mesh.rotation.x = Math.sin(elapsedTime * 0.2) * 0.08; // Reduced from 0.3 and 0.1

        renderer.render(scene, camera);
      }

      requestAnimationFrame(animate);
    };

    // Initialize
    handleResize();
    animate();

    // Event listeners
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-1" 
    />
  );
}