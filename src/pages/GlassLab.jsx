import React, { useEffect, useRef, useState } from 'react';
import ContactFloatingBar from '../components/UI/ContactFloatingBar.jsx';
import './GlassTune.css';
import './GlassLab.css';

/* /glass-lab: la barra REAL con distintos presets, una al lado de otra.
   Cada preset pisa solo lo que cambia; el resto son los valores por defecto. */

const PRESETS = [
  {
    id: 'prod',
    name: 'A · Lo que está subido',
    note: 'Lechoso 58%, blur 8, sat 190',
    preset: {
      luz: { grosor: 1, bordeOscuro: 0.38 },
      vidrio: { velo: 0.58, blur: 8, saturacion: 190, brillo: 1.1, relleno: 0.36, volumen: 1 },
      refraccion: { lente: 42, biselLente: 32, halo: 12 },
    },
  },
  {
    id: 'apple',
    name: 'B · Apple claro (anterior)',
    note: 'Velo 26%, blur 5, sat 150, borde 1px',
    preset: {
      luz: { grosor: 1, grosorGris: 0.75, intensidad: 1.05, alcance: 1.2, rebote: 1.15, bordeOscuro: 0.38 },
      vidrio: { velo: 0.26, blur: 5, relleno: 0.14, volumen: 0.6 },
    },
  },
  {
    id: 'clear',
    name: 'C · Casi transparente',
    note: 'Como el toolbar de Mail',
    preset: {
      vidrio: { velo: 0.14, blur: 3, saturacion: 140, brillo: 1.04, relleno: 0.06, volumen: 0.4 },
      refraccion: { lente: 58, biselLente: 34, halo: 14 },
    },
  },
  {
    id: 'frost',
    name: 'D · Escarcha Apple',
    note: 'Más legible, algo de cuerpo',
    preset: {
      vidrio: { velo: 0.36, blur: 11, saturacion: 165, brillo: 1.08, relleno: 0.2, volumen: 0.8 },
      refraccion: { lente: 44, biselLente: 30, halo: 10 },
    },
  },
  {
    id: 'liquid',
    name: 'E · Líquido (más tensión)',
    note: 'Lente 72, halo 18',
    preset: {
      vidrio: { velo: 0.22, blur: 4, saturacion: 150, brillo: 1.06, relleno: 0.12, volumen: 0.6 },
      refraccion: { lente: 72, biselLente: 40, aberracion: 0.08, halo: 18, anchoHalo: 18 },
    },
  },
  {
    id: 'rim',
    name: 'F · Borde Apple fino (ELEGIDA)',
    note: 'La del sitio: vidrio blanco glassy (velo 46%), hilo 0.8px',
    preset: {},
  },
];

const BACKGROUNDS = [
  { id: 'light', label: 'Claro' },
  { id: 'dark', label: 'Oscuro (hero)' },
  { id: 'photo', label: 'Foto' },
];

function Stage({ item, bg }) {
  const ref = useRef(null);

  /* Arrastrar la barra por el contenido; doble clic la devuelve */
  useEffect(() => {
    const stage = ref.current;
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
    const click = (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } };
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
    <figure className="gl-figure">
      <figcaption>
        <strong>{item.name}</strong>
        <span>{item.note}</span>
      </figcaption>
      <div className="gt-phone gl-phone" ref={ref} data-bg={bg}>
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
        </div>
        <ContactFloatingBar embedded preset={item.preset} />
      </div>
    </figure>
  );
}

export default function GlassLab() {
  const [bg, setBg] = useState('light');

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  return (
    <main className="gl-lab">
      <header className="gl-head">
        <h1>Glass lab</h1>
        <p>
          Seis versiones de la barra real, lado a lado. Arrastrá cada barra sobre el contenido, abrí con ✨ y cambiá el fondo.
          Para ajustar a mano una de ellas: <a href="/glass-lab/tune">/glass-lab/tune</a>.
        </p>
        <div className="gl-ctrl">
          {BACKGROUNDS.map((b) => (
            <button key={b.id} type="button" data-on={bg === b.id} onClick={() => setBg(b.id)}>
              {b.label}
            </button>
          ))}
        </div>
      </header>
      <div className="gl-grid">
        {PRESETS.map((p) => (
          <Stage key={p.id} item={p} bg={bg} />
        ))}
      </div>
    </main>
  );
}
