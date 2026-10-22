import React from 'react';

/* Mapas de desplazamiento + filtro SVG para el Liquid Glass (lab y barra real).
   Chromium aplica backdrop-filter:url(#svg); Safari/Firefox caen al blur normal. */

export const HALO = 14;

const clampByte = (v) => Math.max(0, Math.min(255, Math.round(v)));

/* Distancia con signo a un rectángulo redondeado + normal saliente */
function sdRoundRect(px, py, hw, hh, r) {
  const sx = px < 0 ? -1 : 1;
  const sy = py < 0 ? -1 : 1;
  const qx = Math.abs(px) - (hw - r);
  const qy = Math.abs(py) - (hh - r);
  if (qx > 0 && qy > 0) {
    const len = Math.hypot(qx, qy);
    return { d: len - r, nx: (qx / len) * sx, ny: (qy / len) * sy };
  }
  if (qx > qy) return { d: qx - r, nx: sx, ny: 0 };
  return { d: qy - r, nx: 0, ny: sy };
}

/* Mapa del LENTE (dentro de la forma). Perfil convexo + ley de Snell:
   el desvío crece hacia el canto, donde la pendiente de la superficie es máxima. */
export function makeLensMap({ w, h, r }, { bezel, n }) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  const img = ctx.createImageData(w, h);
  const hw = w / 2;
  const hh = h / 2;

  const table = [];
  for (let i = 0; i <= 64; i += 1) {
    const t = i / 64;
    const u = 1 - t;
    const slope = u / Math.sqrt(Math.max(1e-4, 1 - u * u));
    const theta = Math.atan(slope);
    const refr = Math.asin(Math.min(1, Math.sin(theta) / n));
    table.push(theta - refr);
  }
  const max = table[0] || 1;

  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      const { d, nx, ny } = sdRoundRect(x + 0.5 - hw, y + 0.5 - hh, hw, hh, r);
      let ox = 0;
      let oy = 0;
      const depth = -d;
      if (depth >= 0 && depth < bezel) {
        const mag = table[Math.round((depth / bezel) * 64)] / max;
        ox = -nx * mag;
        oy = -ny * mag;
      }
      const i = (y * w + x) * 4;
      img.data[i] = clampByte(128 + ox * 127);
      img.data[i + 1] = clampByte(128 + oy * 127);
      img.data[i + 2] = 128;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL('image/png');
}

/* Mapa del HALO (anillo exterior): neutro dentro, ripple que decae hacia afuera */
export function makeHaloMap({ w, h, r }, halo) {
  const cw = w + halo * 2;
  const ch = h + halo * 2;
  const canvas = document.createElement('canvas');
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext('2d');
  const img = ctx.createImageData(cw, ch);
  for (let y = 0; y < ch; y += 1) {
    for (let x = 0; x < cw; x += 1) {
      const { d, nx, ny } = sdRoundRect(x + 0.5 - cw / 2, y + 0.5 - ch / 2, w / 2, h / 2, r);
      let amount = 0;
      if (d > 0 && d < halo) {
        const t = d / halo;
        amount = Math.pow(1 - t, 2.4);
      }
      const i = (y * cw + x) * 4;
      img.data[i] = clampByte(128 + nx * amount * 127);
      img.data[i + 1] = clampByte(128 + ny * amount * 127);
      img.data[i + 2] = 128;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL('image/png');
}

export function GlassFilter({ id, href, scale, ca }) {
  const s = [scale * (1 + ca), scale, scale * (1 - ca)];
  return (
    <filter id={id} colorInterpolationFilters="sRGB" x="0" y="0" width="100%" height="100%">
      <feImage href={href} preserveAspectRatio="none" result="map" />
      <feDisplacementMap in="SourceGraphic" in2="map" scale={s[0]} xChannelSelector="R" yChannelSelector="G" result="dr" />
      <feDisplacementMap in="SourceGraphic" in2="map" scale={s[1]} xChannelSelector="R" yChannelSelector="G" result="dg" />
      <feDisplacementMap in="SourceGraphic" in2="map" scale={s[2]} xChannelSelector="R" yChannelSelector="G" result="db" />
      <feColorMatrix in="dr" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r" />
      <feColorMatrix in="dg" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g" />
      <feColorMatrix in="db" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b" />
      <feBlend in="r" in2="g" mode="screen" result="rg" />
      <feBlend in="rg" in2="b" mode="screen" />
    </filter>
  );
}
