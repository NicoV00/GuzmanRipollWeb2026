import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Link as MuiLink } from "@mui/material";
import { Instagram, Linkedin, Facebook } from 'lucide-react';

const COLORS = {
  textDark: "#000000",
  textGrey: "#666666",
};

const navLinks = [
  { to: "/", text: "Inicio" },
  { to: "/clinica", text: "Clínica" },
  { to: "/procedimientos", text: "Procedimientos" },
  { to: "/resultados", text: "Resultados" },
  { to: "/contacto", text: "Contacto" },
];

const procedimientosLinks = [
  { to: "/procedimiento/01", text: "Cirugía Mamaria" },
  { to: "/procedimiento/02", text: "Lipoescultura VASER" },
  { to: "/procedimiento/04", text: "Abdominoplastia" },
  { to: "/procedimiento/01", text: "Aumento Mamario" },
  { to: "/procedimiento/06", text: "Tratamientos Faciales" },
];

const colHeadingStyles = {
  fontFamily: "Poppins, sans-serif",
  fontSize: "14px",
  fontWeight: 600,
  color: "#111",
  mb: "20px",
  textAlign: "left",
};

const colLinkStyles = {
  fontFamily: "Poppins, sans-serif",
  fontSize: "14px",
  color: "rgba(0,0,0,0.5)",
  textDecoration: "none",
  display: "block",
  lineHeight: 1.6,
  fontWeight: 500,
  textAlign: "left",
  transition: "color 0.2s ease",
  "&:hover": { color: "#111" },
};

// lucide no incluye el logo de WhatsApp (marca registrada) — SVG inline
const WhatsAppIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const socials = [
  { href: "https://www.instagram.com/clinicaripoll/", Icon: Instagram, label: "Instagram" },
  { href: "https://www.facebook.com/dr.guzmanripoll", Icon: Facebook, label: "Facebook" },
  { href: "https://www.linkedin.com/in/guzmanripoll/", Icon: Linkedin, label: "LinkedIn" },
  { href: "https://wa.me/59899016358", Icon: WhatsAppIcon, label: "WhatsApp" },
];

const socialCircleStyles = {
  width: 36,
  height: 36,
  borderRadius: "50%",
  backgroundColor: "#1A1A1A",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color 0.2s ease",
  "&:hover": { backgroundColor: "#000" },
};

// Estilo base del wordmark grande (compartido por la capa nítida y la borrosa)
const brandBaseStyles = {
  fontFamily: "'Archivo', sans-serif",
  fontWeight: 400,
  color: COLORS.textDark,
  lineHeight: 1.0,
  letterSpacing: { xs: "-2px", md: "-4px" },
  textTransform: "uppercase",
  fontSize: { xs: "9.7vw", md: "clamp(48px, 6.2vw, 100px)" },
  textAlign: { xs: "left", md: "right" },
  whiteSpace: "nowrap",
  width: { xs: "100%", md: "auto" },
  m: 0,
};

export default function Footer({ backgroundColor = "transparent", cardBackgroundColor = "white" }) {
  const currentYear = new Date().getFullYear();

  return (
    // Contenedor alineado al sistema global: maxWidth 1920, px 70, 12 cols, gap 20
    <Box sx={{
      maxWidth: "1920px",
      mx: "auto",
      px: { xs: "10px", md: "70px" },
      pt: { xs: "14px", md: "60px" },
      pb: { xs: "calc(8px + env(safe-area-inset-bottom))", md: "8px" },
      width: "100%",
      boxSizing: "border-box",
      backgroundColor,
    }}>
      {/* ─── CARD (no pasa el margen: ocupa exactamente col 1 → col 12) ─── */}
      <Box component="footer" sx={{
        width: "100%",
        px: { xs: "18px", md: "56px" },
        pt: { xs: "28px", md: "64px" },
        pb: { xs: "22px", md: "44px" },
        bgcolor: cardBackgroundColor,
        color: COLORS.textDark,
        borderRadius: { xs: "16px", md: "24px" },
        // Squircle (corner smoothing iOS) — progressive enhancement, Chromium 139+
        cornerShape: "squircle",
        boxSizing: "border-box",
        border: "1px solid rgba(0,0,0,0.05)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
        display: "flex",
        flexDirection: "column",
        minHeight: { xs: "auto", md: "520px" },
      }}>
        {/* Columnas — grid de 12 alineado al sistema global */}
        <Box sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: { xs: "22px 34px", md: "72px" },
          alignItems: "flex-start",
        }}>
          {/* Navegación */}
          <Box>
            <Typography sx={colHeadingStyles}>Navegación</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {navLinks.map((link) => (
                <MuiLink key={link.to} component={RouterLink} to={link.to} underline="none" sx={colLinkStyles}>
                  {link.text}
                </MuiLink>
              ))}
            </Box>
          </Box>

          {/* Procedimientos */}
          <Box>
            <Typography sx={colHeadingStyles}>Procedimientos</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {procedimientosLinks.map((link) => (
                <MuiLink key={link.to} component={RouterLink} to={link.to} underline="none" sx={colLinkStyles}>
                  {link.text}
                </MuiLink>
              ))}
            </Box>
          </Box>

          {/* Contacto */}
          <Box>
            <Typography sx={colHeadingStyles}>Contacto</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <MuiLink href="https://maps.google.com/?q=Punta+del+Este,+Uruguay" target="_blank" rel="noopener noreferrer" underline="none" sx={colLinkStyles}>
                Punta del Este, Uruguay
              </MuiLink>
              <MuiLink href="tel:+59899016358" underline="none" sx={colLinkStyles}>
                +598 99 016 358
              </MuiLink>
              <MuiLink href="mailto:info@guzmanripoll.com" underline="none" sx={colLinkStyles}>
                info@guzmanripoll.com
              </MuiLink>
            </Box>
          </Box>

          {/* Socials — alineados al borde derecho (col 12) */}
          <Box sx={{
            width: { xs: "100%", md: "auto" },
            ml: { md: "auto" },
            display: "flex",
            gap: "12px",
            alignItems: "flex-start",
            justifyContent: { xs: "flex-start", md: "flex-end" },
          }}>
            {socials.map(({ href, Icon, label }) => (
              <MuiLink key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} sx={socialCircleStyles}>
                <Icon size={18} strokeWidth={2} />
              </MuiLink>
            ))}
          </Box>
        </Box>

        {/* Fila inferior de la card: tagline izquierda + Política derecha */}
        <Box sx={{
          mt: { xs: "26px", md: "auto" },
          pt: { xs: "22px", md: "56px" },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          gap: "16px",
        }}>
          <Typography sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "18px",
            fontWeight: 600,
            color: "#111",
            textAlign: "left",
          }}>
            Cirugía inteligente, conexión humana.
          </Typography>

          <Box sx={{ display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
            <MuiLink component={RouterLink} to="/politica-privacidad" underline="none" sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              color: "#111",
              transition: "opacity 0.2s ease",
              "&:hover": { opacity: 0.6 },
            }}>
              Política y privacidad
            </MuiLink>
            <MuiLink component={RouterLink} to="/procesamiento-datos" underline="none" sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              color: "#111",
              transition: "opacity 0.2s ease",
              "&:hover": { opacity: 0.6 },
            }}>
              Procesamiento de datos
            </MuiLink>
          </Box>
        </Box>
      </Box>

      {/* ─── FUERA DE LA CARD: copyright (col 1) + nombre grande (col 12) ─── */}
      <Box sx={{
        mt: { xs: "12px", md: "40px" },
        display: "flex",
        // En mobile: GUZMÁN RIPOLL arriba y el © abajo (column-reverse). Desktop sin cambios.
        flexDirection: { xs: "column-reverse", md: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", md: "flex-end" },
        gap: { xs: "2px", md: "20px" },
        // En mobile el bloque se sale del padding del wrapper (full-bleed) para que GUZMÁN RIPOLL ocupe todo el ancho
        width: { xs: "100vw", md: "100%" },
        position: { xs: "relative", md: "static" },
        left: { xs: "50%", md: "auto" },
        transform: { xs: "translateX(-50%)", md: "none" },
        px: { xs: 0, md: 0 },
        boxSizing: "border-box",
      }}>
        <Typography sx={{
          fontFamily: "Poppins, sans-serif",
          fontSize: { xs: "11px", md: "16px" },
          fontWeight: 500,
          color: "#000000",
          textAlign: "left",
          whiteSpace: { xs: "normal", md: "nowrap" },
          mb: { xs: 0, md: "10px" },
          pl: { xs: "16px", md: 0 },
          pr: { xs: "16px", md: 0 },
        }}>
          © {currentYear} Dr. Guzmán Ripoll. Todos los derechos reservados.
        </Typography>

        {/* Wordmark grande con glass/refraction sutil contenido dentro de la letra */}
        <Box sx={{
          position: "relative",
          width: { xs: "100%", md: "auto" },
          overflow: "hidden",
          isolation: "isolate",
          pb: "0.02em",
          mb: { xs: "-0.2em", md: "-0.14em" },
          // Margen lateral en mobile (el bloque es full-bleed y quedaba pegado al borde)
          px: { xs: "16px", md: 0 },
          boxSizing: "border-box",
          // Efecto tipo "J A C O": por defecto solo se ven las iniciales (G, R) y el resto
          // queda invisible pero CONSERVANDO su espacio; al hover aparece el nombre completo.
          "& .wm-rest": {
            opacity: 0,
            transition: "opacity 0.6s cubic-bezier(0.22,1,0.36,1)",
          },
          "&:hover .wm-rest": { opacity: 1 },
          // En touch (sin hover) el nombre completo queda fijo, sin efecto
          "@media (hover: none)": {
            "& .wm-rest": { opacity: 1, transition: "none" },
          },
        }}>
          {/* Capa nitida principal */}
          {/* Color directo (sin background-clip): con el clip de gradiente, la opacidad
              de los spans no tiene efecto y el nombre se ve siempre completo. */}
          <Typography sx={{
            ...brandBaseStyles,
            position: "relative",
            color: "#000",
            textShadow: "none",
            WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 90%, rgba(0,0,0,0.86) 100%)",
            maskImage: "linear-gradient(to bottom, #000 0%, #000 90%, rgba(0,0,0,0.86) 100%)",
          }}>
            <Box component="span" className="wm-initial">G</Box>
            <Box component="span" className="wm-rest">uzm{"á"}n&nbsp;</Box>
            <Box component="span" className="wm-initial">R</Box>
            <Box component="span" className="wm-rest">ipoll</Box>
          </Typography>
          {/* Refraccion cromatica fina */}
          <Typography aria-hidden sx={{
            ...brandBaseStyles,
            position: "absolute",
            inset: 0,
            color: "transparent",
            opacity: 0.12,
            filter: "blur(0.08px)",
            textShadow: "0.4px 0 rgba(0,122,255,0.6), -0.4px 0 rgba(255,126,36,0.45)",
            clipPath: "polygon(0 82%, 100% 82%, 100% 93%, 0 93%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, transparent 80%, rgba(0,0,0,0.55) 88%, transparent 96%)",
            maskImage: "linear-gradient(to bottom, transparent 0%, transparent 80%, rgba(0,0,0,0.55) 88%, transparent 96%)",
            pointerEvents: "none",
          }}>
            <Box component="span" className="wm-initial">G</Box>
            <Box component="span" className="wm-rest">uzm{"á"}n&nbsp;</Box>
            <Box component="span" className="wm-initial">R</Box>
            <Box component="span" className="wm-rest">ipoll</Box>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
