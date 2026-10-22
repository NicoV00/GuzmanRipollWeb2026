import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { MessageCircle, Sparkles, X } from 'lucide-react';
import { GlassFilter, HALO, makeHaloMap, makeLensMap } from '../components/UI/glassMaps.jsx';
import './GlassLab.css';

/* Laboratorio de Liquid Glass (/glass-lab). No enlazado ni indexado.
   Cada variante = tokens CSS (data-variant) + parámetros del filtro SVG.
   Los mapas se generan UNA vez por estado (cerrado/abierto) y se cambian al
   alternar; nada se recalcula durante el morph, así se puede pulsar sin parar. */

const SIZES = {
  closed: { w: 350, h: 64, r: 32 },
  open: { w: 362, h: 266, r: 32 },
};

const VARIANTS = [
  { id: 'milky', name: 'A · Lechoso', lens: { scale: 12, bezel: 14, n: 1.5, ca: 0.08 } },
  { id: 'lens', name: 'B · Lente claro', lens: { scale: 72, bezel: 30, n: 1.5, ca: 0.14 } },
  { id: 'frost', name: 'C · Lente + escarcha', lens: { scale: 60, bezel: 28, n: 1.5, ca: 0.12 } },
  { id: 'halo', name: 'D · Lente + ripple fuera', lens: { scale: 60, bezel: 28, n: 1.5, ca: 0.12 }, halo: { scale: 22 } },
  { id: 'dark', name: 'E · Oscuro', lens: { scale: 46, bezel: 24, n: 1.5, ca: 0.12 } },
  { id: 'ios', name: 'F · iOS 26 brillante', lens: { scale: 50, bezel: 28, n: 1.6, ca: 0.1 }, halo: { scale: 18 } },
];

function GlassBar({ variant, open, onToggle }) {
  const uid = useId().replace(/:/g, '');
  const maps = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const out = {};
    ['closed', 'open'].forEach((state) => {
      out[state] = {
        lens: makeLensMap(SIZES[state], variant.lens),
        halo: variant.halo ? makeHaloMap(SIZES[state], HALO) : '',
      };
    });
    return out;
  }, [variant]);

  const state = open ? 'open' : 'closed';
  const style = {
    '--f': `url(#gl-lens-${uid}-${state})`,
    '--hf': `url(#gl-halo-${uid}-${state})`,
  };

  return (
    <>
      {maps && (
        <svg className="gl-defs" aria-hidden="true" focusable="false">
          <defs>
            {['closed', 'open'].map((s) => (
              <React.Fragment key={s}>
                <GlassFilter id={`gl-lens-${uid}-${s}`} href={maps[s].lens} scale={variant.lens.scale} ca={variant.lens.ca} />
                {variant.halo && (
                  <GlassFilter id={`gl-halo-${uid}-${s}`} href={maps[s].halo} scale={variant.halo.scale} ca={0.04} />
                )}
              </React.Fragment>
            ))}
          </defs>
        </svg>
      )}

      {variant.halo && <div className="gl-halo" data-open={open} style={style} aria-hidden="true" />}

      <nav className="gl-bar" data-open={open} data-variant={variant.id} style={style}>
        <div className="gl-rim" aria-hidden="true" />

        <div className="gl-compact" aria-hidden={open}>
          <a className="gl-pill gl-primary" href="#" onClick={(e) => e.preventDefault()} tabIndex={open ? -1 : 0}>
            Agendar consulta
          </a>
          <a className="gl-pill gl-icon" href="#" onClick={(e) => e.preventDefault()} aria-label="WhatsApp" tabIndex={open ? -1 : 0}>
            <MessageCircle size={22} strokeWidth={2} />
          </a>
          <button className="gl-pill gl-icon" type="button" aria-label="Abrir" onClick={onToggle} tabIndex={open ? -1 : 0}>
            <Sparkles size={21} strokeWidth={2} />
          </button>
        </div>

        <div className="gl-expanded" aria-hidden={!open}>
          <div className="gl-list">
            {['Ver procedimientos', 'Clínica', 'Procedimientos', 'Resultados'].map((label, i) => (
              <a
                key={label}
                className={`gl-row${i === 0 ? ' gl-row-main' : ''}`}
                style={{ '--i': i }}
                href="#"
                onClick={(e) => e.preventDefault()}
                tabIndex={open ? 0 : -1}
              >
                {label}
              </a>
            ))}
          </div>
          <div className="gl-actions">
            <a className="gl-pill gl-wa" href="#" onClick={(e) => e.preventDefault()} tabIndex={open ? 0 : -1}>
              WhatsApp
            </a>
            <button className="gl-pill gl-icon" type="button" aria-label="Cerrar" onClick={onToggle} tabIndex={open ? 0 : -1}>
              <X size={20} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

function Stage({ variant, forceOpen }) {
  const [open, setOpen] = useState(false);
  const stageRef = useRef(null);

  /* Arrastrar la barra (desde cualquier parte) para ver cómo interactúa con el contenido */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    let start = null;
    let moved = false;
    let pos = { x: 0, y: 0 };

    const down = (e) => {
      if (!e.target.closest('.gl-bar')) return;
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
      if (!e.target.closest('.gl-bar')) return;
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

  useEffect(() => {
    if (forceOpen !== null) setOpen(forceOpen);
  }, [forceOpen]);

  return (
    <figure className="gl-figure">
      <figcaption>{variant.name}</figcaption>
      <div className="gl-stage" ref={stageRef}>
        <div className="gl-content">
          <h3>Cirugía mamaria</h3>
          <p>Aumento, mastopexia y reconstrucción</p>
          <div className="gl-cards">
            <div className="gl-card gl-card-marble" />
            <div className="gl-card gl-card-photo" />
          </div>
          <h3>Lipoescultura VASER</h3>
          <p>Abdominoplastia · Dr. Guzmán Ripoll</p>
          <div className="gl-cards">
            <div className="gl-card gl-card-navy" />
            <div className="gl-card gl-card-warm" />
          </div>
          <p className="gl-big">Conexión humana, innovación tecnológica en cirugía.</p>
        </div>
        <GlassBar variant={variant} open={open} onToggle={() => setOpen((v) => !v)} />
      </div>
    </figure>
  );
}

export default function GlassLab() {
  const [forceOpen, setForceOpen] = useState(null);

  useEffect(() => {
    document.body.classList.add('gl-lab-active');
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      document.body.classList.remove('gl-lab-active');
      meta.remove();
    };
  }, []);

  return (
    <main className="gl-lab">
      <header className="gl-head">
        <h1>Glass lab</h1>
        <p>Arrastrá cada barra por el contenido (doble clic la devuelve). Pulsá ✨ para abrir, también varias veces seguidas. Solo Chromium muestra la refracción SVG.</p>
        <div className="gl-ctrl">
          <button type="button" onClick={() => setForceOpen(true)}>Abrir todas</button>
          <button type="button" onClick={() => setForceOpen(false)}>Cerrar todas</button>
        </div>
      </header>
      <div className="gl-grid">
        {VARIANTS.map((v) => (
          <Stage key={v.id} variant={v} forceOpen={forceOpen} />
        ))}
      </div>
    </main>
  );
}
