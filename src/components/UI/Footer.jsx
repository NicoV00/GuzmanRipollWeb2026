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
  { to: "/procedimiento/03", text: "Abdominoplastia" },
  { to: "/procedimiento/04", text: "Aumento Mamario" },
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

const socials = [
  { href: "https://www.instagram.com/clinicaripoll/", Icon: Instagram, label: "Instagram" },
  { href: "https://facebook.com/guzmanripoll", Icon: Facebook, label: "Facebook" },
  { href: "https://linkedin.com", Icon: Linkedin, label: "LinkedIn" },
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

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // Contenedor alineado EXACTO al GridDebugger: maxWidth 1920, px 70, 12 cols, gap 20
    <Box sx={{
      maxWidth: "1920px",
      mx: "auto",
      px: { xs: "20px", md: "70px" },
      pt: { xs: "20px", md: "60px" },
      pb: { xs: "calc(12px + env(safe-area-inset-bottom))", md: "40px" },
      width: "100%",
      boxSizing: "border-box",
    }}>
      {/* ─── CARD (no pasa el margen: ocupa exactamente col 1 → col 12) ─── */}
      <Box component="footer" sx={{
        width: "100%",
        px: { xs: "24px", md: "56px" },
        pt: { xs: "44px", md: "64px" },
        pb: { xs: "32px", md: "44px" },
        bgcolor: "white",
        color: COLORS.textDark,
        borderRadius: "20px",
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
          gap: { xs: "36px 48px", md: "72px" },
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
          mt: { xs: "44px", md: "auto" },
          pt: { xs: "36px", md: "56px" },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          gap: "16px",
        }}>
          <Typography sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "15px",
            fontWeight: 600,
            color: "#111",
            textAlign: "left",
          }}>
            Cirugía inteligente, conexión humana.
          </Typography>

          <MuiLink component={RouterLink} to="/contacto" underline="none" sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "14px",
            fontWeight: 500,
            color: "#111",
            transition: "opacity 0.2s ease",
            "&:hover": { opacity: 0.6 },
          }}>
            Política y privacidad
          </MuiLink>
        </Box>
      </Box>

      {/* ─── FUERA DE LA CARD: copyright (col 1) + nombre grande (col 12) ─── */}
      <Box sx={{
        mt: { xs: "28px", md: "40px" },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", md: "flex-end" },
        gap: { xs: "16px", md: "20px" },
        // En mobile el bloque se sale del padding del wrapper (full-bleed) para que GUZMÁN RIPOLL ocupe todo el ancho
        width: { xs: "100vw", md: "100%" },
        position: { xs: "relative", md: "static" },
        left: { xs: "50%", md: "auto" },
        transform: { xs: "translateX(-50%)", md: "none" },
        px: { xs: "8px", md: 0 },
        boxSizing: "border-box",
      }}>
        <Typography sx={{
          fontFamily: "Poppins, sans-serif",
          fontSize: { xs: "13px", md: "16px" },
          fontWeight: 500,
          color: "#000000",
          textAlign: "left",
          whiteSpace: { xs: "normal", md: "nowrap" },
        }}>
          © {currentYear} Dr. Guzmán Ripoll. Todos los derechos reservados.
        </Typography>

        <Typography sx={{
          fontFamily: "'Red Hat Display', sans-serif",
          fontWeight: 400,
          color: COLORS.textDark,
          lineHeight: 0.9,
          letterSpacing: "-0.04em",
          textTransform: "uppercase",
          fontSize: { xs: "11.6vw", md: "clamp(54px, 7vw, 116px)" },
          textAlign: { xs: "left", md: "right" },
          whiteSpace: "nowrap",
          width: { xs: "100%", md: "auto" },
        }}>
          Guzmán Ripoll
        </Typography>
      </Box>
    </Box>
  );
}
