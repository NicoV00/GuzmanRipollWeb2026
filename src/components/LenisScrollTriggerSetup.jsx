import { useEffect } from 'react';
import { useLenis } from 'lenis/dist/lenis-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Componente que configura la integración entre Lenis y GSAP ScrollTrigger
 * Debe ser renderizado dentro del contexto de ReactLenis
 */
export default function LenisScrollTriggerSetup() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Actualizar ScrollTrigger cuando Lenis hace scroll
    function update(e) {
      ScrollTrigger.update();
    }

    lenis.on('scroll', update);

    // Sincronizar Lenis con el ticker de GSAP para que el scroll y los pins
    // se actualicen en el MISMO frame (evita el "rebote" al fijar secciones).
    function raf(time) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Hacer que ScrollTrigger use el método de Lenis para obtener la posición de scroll
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll || 0;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      }
    });

    // Refrescar ScrollTrigger cuando se redimensiona la ventana
    ScrollTrigger.addEventListener('refresh', () => lenis.resize());
    ScrollTrigger.refresh();

    return () => {
      lenis.off('scroll', update);
      gsap.ticker.remove(raf);
      ScrollTrigger.removeEventListener('refresh', () => lenis.resize());
    };
  }, [lenis]);

  return null;
}