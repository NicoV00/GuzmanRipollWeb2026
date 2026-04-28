import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

// Vertex Shader con morfeo de esfera a rosa abstracta
const vertexShader = `
uniform float uTime;
uniform float uFrequency;
uniform float uAmplitude;
uniform float uDensity;
uniform float uStrength;

varying float vDistortion;

#define PI 3.14159265359

void main() {
  float t = uTime * 0.25; // Velocidad de animación más lenta
  
  // Ciclo extendido: 0-1.5 esfera, 1.5-4 transición a rosa, 4-8 rosa, 8-10.5 transición a esfera, 10.5-12 esfera
  float cycle = mod(t, 12.0);
  float morphProgress = 0.0;
  
  if (cycle < 1.5) {
    // Esfera
    morphProgress = 0.0;
  } else if (cycle < 4.0) {
    // Transición lenta a rosa (2.5 segundos)
    morphProgress = smoothstep(0.0, 1.0, (cycle - 1.5) / 2.5);
  } else if (cycle < 8.0) {
    // Forma de rosa (4 segundos)
    morphProgress = 1.0;
  } else if (cycle < 10.5) {
    // Transición lenta de vuelta a esfera (2.5 segundos)
    morphProgress = 1.0 - smoothstep(0.0, 1.0, (cycle - 8.0) / 2.5);
  } else {
    // Esfera final
    morphProgress = 0.0;
  }
  
  // Coordenadas esféricas
  float radius = length(position);
  float theta = atan(position.z, position.x);
  float phi = acos(clamp(position.y / radius, -1.0, 1.0));
  
  // Alargamiento vertical (forma más elongada)
  float verticalStretch = 1.5;
  
  // Capas de pétalos (múltiples ondulaciones radiales)
  float petalCount = 8.0; // Número de pétalos
  float petalLayer1 = sin(theta * petalCount + t * 0.5) * 0.4;
  float petalLayer2 = sin(theta * petalCount * 1.5 + t * 0.3) * 0.25;
  float petalLayer3 = sin(theta * petalCount * 0.5 - t * 0.4) * 0.3;
  
  // Variación vertical de los pétalos (más pronunciado en el centro)
  float verticalInfluence = sin(position.y * 2.0 + t) * 0.3;
  float centerBulge = smoothstep(-0.3, 0.3, position.y) * (1.0 - smoothstep(0.3, 0.8, abs(position.y)));
  
  // Ondulaciones espirales
  float spiral = sin(phi * 5.0 + theta * 2.0 + t) * 0.2;
  
  // Combinar capas de pétalos
  float petalDeform = (petalLayer1 + petalLayer2 + petalLayer3) * centerBulge;
  petalDeform += spiral * 0.5;
  petalDeform += verticalInfluence;
  
  // Deformación radial (pétalos se expanden hacia afuera)
  vec3 radialDir = normalize(vec3(position.x, 0.0, position.z));
  vec3 roseDeform = normal * petalDeform * 1.2;
  roseDeform += radialDir * petalDeform * 0.8;
  
  // Estiramiento vertical
  roseDeform.y *= verticalStretch;
  
  // Agregar textura orgánica con ondulaciones más pequeñas
  float organicNoise = sin(position.x * 8.0 + t) * sin(position.y * 8.0 - t) * sin(position.z * 8.0 + t * 0.5);
  roseDeform += normal * organicNoise * 0.15;
  
  // Interpolación entre esfera y rosa
  vec3 deformation = roseDeform * morphProgress * uStrength;
  
  // Movimiento vertical durante transiciones (más sutil y con delay)
  float verticalMovement = 0.0;
  
  if (cycle >= 1.5 && cycle < 4.0) {
    // Transición a rosa
    float totalTransition = (cycle - 1.5) / 2.5;
    
    // Delay de 1 segundo (0.4 del progreso de transición)
    if (totalTransition > 0.4) {
      float delayedProgress = (totalTransition - 0.4) / 0.6;
      verticalMovement = -smoothstep(0.0, 1.0, delayedProgress) * 0.15;
    }
  } else if (cycle >= 4.0 && cycle < 8.0) {
    // Posición baja mientras está en forma de rosa
    verticalMovement = -0.15;
  } else if (cycle >= 8.0 && cycle < 10.5) {
    // Subiendo durante transición de vuelta a esfera
    float transitionProgress = (cycle - 8.0) / 2.5;
    verticalMovement = -0.15 + (smoothstep(0.0, 1.0, transitionProgress) * 0.15);
  }
  
  // Ondulación base sutil
  float waveDistortion = sin(position.y * uFrequency + t) * uAmplitude * 0.08;
  
  vec3 pos = position + deformation + normal * waveDistortion;
  pos.y += verticalMovement;
  
  // Distorsión para el color
  vDistortion = length(deformation) * 0.6 + abs(waveDistortion) + abs(petalDeform) * 0.3;

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
      // Lower pixel ratio for mobile to improve performance
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
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