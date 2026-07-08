import React, { useEffect, useId, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { ChevronUp, MessageCircle, Sparkles, X } from 'lucide-react';
import './ContactFloatingBar.css';

const navItems = [
  { label: 'Clinica', to: '/clinica' },
  { label: 'Procedimientos', to: '/procedimientos' },
  { label: 'Resultados', to: '/resultados' },
];

const clampByte = (value) => Math.max(0, Math.min(255, Math.round(value)));

function makeOutpaceGlassMap(width, height, radius) {
  if (typeof document === 'undefined' || width <= 0 || height <= 0) return '';

  const pixelRatio = Math.min(Math.max(Math.round(window.devicePixelRatio || 1), 1), 2);
  const canvasWidth = Math.max(1, Math.round(width * pixelRatio));
  const canvasHeight = Math.max(1, Math.round(height * pixelRatio));
  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const image = ctx.createImageData(canvasWidth, canvasHeight);
  const data = image.data;
  const cx = canvasWidth / 2;
  const cy = canvasHeight / 2;
  const halfWidth = canvasWidth / 2;
  const halfHeight = canvasHeight / 2;
  const glassRadius = Math.max(0, Math.min(radius * pixelRatio, halfWidth, halfHeight));
  const rimDepth = Math.max(14, Math.min(42, Math.min(width, height) * 0.28)) * pixelRatio;
  const curvature = 2.85;
  const splay = -1;

  for (let y = 0; y < canvasHeight; y += 1) {
    for (let x = 0; x < canvasWidth; x += 1) {
      const px = x + 0.5 - cx;
      const py = y + 0.5 - cy;
      const absX = Math.abs(px);
      const absY = Math.abs(py);
      const signX = px < 0 ? -1 : 1;
      const signY = py < 0 ? -1 : 1;
      const qx = absX - (halfWidth - glassRadius);
      const qy = absY - (halfHeight - glassRadius);

      let offsetX = 0;
      let offsetY = 0;

      if (qx > 0 && qy > 0) {
        const len = Math.hypot(qx, qy);
        const inward = glassRadius - len;
        if (inward > 0 && inward < rimDepth) {
          const bend = splay * Math.pow(1 - inward / rimDepth, curvature);
          const dirX = len > 0 ? (qx / len) * signX : Math.SQRT1_2 * signX;
          const dirY = len > 0 ? (qy / len) * signY : Math.SQRT1_2 * signY;
          offsetX = dirX * bend;
          offsetY = dirY * bend;
        }
      } else {
        const inX = halfWidth - absX;
        const inY = halfHeight - absY;
        if (inX > 0 && inX < rimDepth) {
          offsetX += signX * splay * Math.pow(1 - inX / rimDepth, curvature);
        }
        if (inY > 0 && inY < rimDepth) {
          offsetY += signY * splay * Math.pow(1 - inY / rimDepth, curvature);
        }
      }

      const index = (y * canvasWidth + x) * 4;
      data[index] = clampByte(128 + offsetX * 127);
      data[index + 1] = clampByte(128 + offsetY * 127);
      data[index + 2] = 128;
      data[index + 3] = 255;
    }
  }

  ctx.putImageData(image, 0, 0);
  return canvas.toDataURL('image/png');
}

export default function ContactFloatingBar() {
  const location = useLocation();
  const navRef = useRef(null);
  const filterId = useId().replace(/:/g, '');
  const [isVisible, setIsVisible] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [glassMap, setGlassMap] = useState('');

  const isContacto = location.pathname === '/contacto';
  const primaryLabel = isContacto ? 'Ver procedimientos' : 'Agendar consulta';
  const primaryLink = isContacto ? '/procedimientos' : '/contacto';

  useEffect(() => {
    const handleScroll = () => {
      const footerElement = document.querySelector('footer');
      const isPastThreshold = isContacto || window.scrollY > 100;

      if (!footerElement) {
        setIsVisible(isPastThreshold);
        return;
      }

      const footerRect = footerElement.getBoundingClientRect();
      setIsVisible(isPastThreshold && footerRect.top >= window.innerHeight);
    };

    const timer = setTimeout(handleScroll, 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isContacto]);

  useEffect(() => {
    setIsPanelOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const node = navRef.current;
    if (!node) return undefined;

    let frame = 0;
    const updateMap = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const radius = parseFloat(getComputedStyle(node).borderTopLeftRadius) || rect.height / 2;
        setGlassMap(makeOutpaceGlassMap(rect.width, rect.height, radius));
      });
    };

    updateMap();
    const observer = new ResizeObserver(updateMap);
    observer.observe(node);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [isPanelOpen]);

  return (
    <>
      <svg className="mobile-glass-filter" aria-hidden="true" focusable="false">
        <defs>
          <filter id={`mobile-liquid-glass-${filterId}`} colorInterpolationFilters="sRGB" x="-8%" y="-8%" width="116%" height="116%">
            <feImage href={glassMap} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="glassMap" />
            <feDisplacementMap in="SourceGraphic" in2="glassMap" scale="38" xChannelSelector="R" yChannelSelector="G" result="glassGreen" />
            <feDisplacementMap in="SourceGraphic" in2="glassMap" scale="41" xChannelSelector="R" yChannelSelector="G" result="glassRed" />
            <feDisplacementMap in="SourceGraphic" in2="glassMap" scale="34" xChannelSelector="R" yChannelSelector="G" result="glassBlue" />
            <feColorMatrix in="glassRed" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />
            <feColorMatrix in="glassGreen" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green" />
            <feColorMatrix in="glassBlue" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue" />
            <feBlend in="red" in2="green" mode="screen" result="redGreen" />
            <feBlend in="redGreen" in2="blue" mode="screen" />
          </filter>
        </defs>
      </svg>

      <Box
        ref={navRef}
        component="nav"
        aria-label="Navegacion rapida"
        data-open={isPanelOpen ? 'true' : 'false'}
        data-visible={isVisible ? 'true' : 'false'}
        className="mobile-glass-nav"
        style={{ '--mobile-glass-filter': `url(#mobile-liquid-glass-${filterId})` }}
      >
        <div className="mobile-glass-rim" aria-hidden="true" />

        <div className="mobile-glass-compact" aria-hidden={isPanelOpen}>
          <RouterLink className="mobile-glass-primary" to={primaryLink} tabIndex={isPanelOpen ? -1 : 0}>
            {primaryLabel}
          </RouterLink>

          <a
            className="mobile-glass-icon"
            href="https://wa.me/59892566656"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escribir por WhatsApp"
            tabIndex={isPanelOpen ? -1 : 0}
          >
            <MessageCircle size={19} strokeWidth={2.05} />
          </a>

          <button
            className="mobile-glass-icon mobile-glass-toggle"
            type="button"
            aria-label="Abrir menu rapido"
            aria-expanded={isPanelOpen}
            onClick={() => setIsPanelOpen(true)}
            tabIndex={isPanelOpen ? -1 : 0}
          >
            <Sparkles size={18} strokeWidth={2.05} />
          </button>
        </div>

        <div className="mobile-glass-expanded" aria-hidden={!isPanelOpen}>
          <button
            className="mobile-glass-heading"
            type="button"
            onClick={() => setIsPanelOpen(false)}
            aria-label="Cerrar menu rapido"
            tabIndex={isPanelOpen ? 0 : -1}
          >
            <span>Menu</span>
            <ChevronUp size={16} strokeWidth={2.2} />
          </button>

          <div className="mobile-glass-list">
            <RouterLink className="mobile-glass-row mobile-glass-row-main" to={primaryLink} tabIndex={isPanelOpen ? 0 : -1}>
              {primaryLabel}
            </RouterLink>
            {navItems.map((item, index) => (
              <RouterLink
                key={item.to}
                className="mobile-glass-row"
                style={{ '--item-index': index + 1 }}
                to={item.to}
                tabIndex={isPanelOpen ? 0 : -1}
              >
                {item.label}
              </RouterLink>
            ))}
          </div>

          <div className="mobile-glass-actions">
            <a href="https://wa.me/59892566656" target="_blank" rel="noopener noreferrer" tabIndex={isPanelOpen ? 0 : -1}>
              WhatsApp
            </a>
            <button type="button" onClick={() => setIsPanelOpen(false)} aria-label="Cerrar" tabIndex={isPanelOpen ? 0 : -1}>
              <X size={16} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </Box>
    </>
  );
}
