import React, { useEffect, useRef, useState } from 'react';
import ContactFloatingBar from '../components/UI/ContactFloatingBar.jsx';
import './GlassLab.css';
import './GlassTune.css';

/* /glass-lab/tune: la barra REAL (C + halo) aislada en un teléfono de 390px,
   con el panel de DialKit al costado. Lo que ajustes acá se guarda (persist) con
   el mismo id que usa la barra del sitio, así que en esta misma máquina ya queda
   aplicado en la web real. */

const BACKGROUNDS = [
  { id: 'light', label: 'Claro' },
  { id: 'dark', label: 'Oscuro (hero)' },
  { id: 'photo', label: 'Foto' },
];

export default function GlassTune() {
  const stageRef = useRef(null);
  const [bg, setBg] = useState('light');

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  /* Arrastrar la barra por el contenido; doble clic la devuelve a su sitio */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    let start = null;
    let moved = false;
    let pos = { x: 0, y: 0 };

    const down = (e) => {
      if (!e.target.closest('.mobile-glass-nav')) return;
      start = { x: e.clientX - pos.x, y: e.clientY - pos.y };
      moved = false;
    };
    const move = (e) => {
      if (!start) return;
      const nx = e.clientX - start.x;
      const ny = e.clientY - start.y;
      if (!moved && Math.hypot(nx - pos.x, ny - pos.y) < 5) return;
      if (!moved) stage.setPointerCapture?.(e.pointerId);
      moved = true;
      pos = { x: nx, y: ny };
      stage.style.setProperty('--dx', `${nx}px`);
      stage.style.setProperty('--dy', `${ny}px`);
    };
    const up = () => { start = null; };
    const click = (e) => {
      if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
    };
    const reset = (e) => {
      if (!e.target.closest('.mobile-glass-nav')) return;
      pos = { x: 0, y: 0 };
      stage.style.setProperty('--dx', '0px');
      stage.style.setProperty('--dy', '0px');
    };

    stage.addEventListener('pointerdown', down);
    stage.addEventListener('pointermove', move);
    stage.addEventListener('pointerup', up);
    stage.addEventListener('pointercancel', up);
    stage.addEventListener('click', click, true);
    stage.addEventListener('dblclick', reset);
    return () => {
      stage.removeEventListener('pointerdown', down);
      stage.removeEventListener('pointermove', move);
      stage.removeEventListener('pointerup', up);
      stage.removeEventListener('pointercancel', up);
      stage.removeEventListener('click', click, true);
      stage.removeEventListener('dblclick', reset);
    };
  }, []);

  return (
    <main className="gt-page">
      <div className="gt-side">
        <h1>Glass tune</h1>
        <p>Barra real, aislada. Ajustá con el panel de la derecha. Arrastrala sobre el contenido (doble clic la devuelve) y probá abrir/cerrar con ✨.</p>
        <div className="gt-bg">
          {BACKGROUNDS.map((b) => (
            <button key={b.id} type="button" data-on={bg === b.id} onClick={() => setBg(b.id)}>
              {b.label}
            </button>
          ))}
        </div>
      </div>

      <div className="gt-phone" ref={stageRef} data-bg={bg}>
        <div className="gt-scroll" data-lenis-prevent>
          <h3>Cirugía mamaria</h3>
          <p>Aumento, mastopexia y reconstrucción</p>
          <div className="gl-cards">
            <div className="gl-card gl-card-marble" />
            <div className="gl-card gl-card-photo" />
          </div>
          <p className="gl-big">Conexión humana, innovación tecnológica en cirugía.</p>
          <h3>Lipoescultura VASER</h3>
          <p>Abdominoplastia · Dr. Guzmán Ripoll</p>
          <div className="gl-cards">
            <div className="gl-card gl-card-navy" />
            <div className="gl-card gl-card-warm" />
          </div>
          <p className="gl-big">Cirugía plástica, estética y reconstructiva en Punta del Este.</p>
          <div className="gl-cards">
            <div className="gl-card gl-card-photo" />
            <div className="gl-card gl-card-marble" />
          </div>
          <p className="gl-big">Acompañamiento cercano durante todo el proceso.</p>
        </div>
        <ContactFloatingBar embedded />
      </div>
    </main>
  );
}
