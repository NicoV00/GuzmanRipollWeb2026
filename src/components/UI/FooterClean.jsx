import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

// Logo
import LogoGR from "/images/GR_6_Iso+Nombre_Blanco.png";

export default function FooterClean() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        bgcolor: "#000",
        color: "#fff",
        py: { xs: 6, md: 8 }
      }}
    >
      <Container maxWidth="lg">
        {/* Main Content */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
            gap: { xs: 4, md: 6 },
            mb: 4
          }}
        >
          {/* Logo Column - Aligned Left */}
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <Box
              component="img"
              src={LogoGR}
              alt="Guzmán Ripoll"
              sx={{
                height: { xs: 36, md: 44 },
                width: "auto"
              }}
            />
          </Box>

          {/* Nuestra Web Column */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                mb: 2,
                fontSize: { xs: "13px", md: "14px" },
                letterSpacing: "0.5px"
              }}
            >
              Nuestra web
            </Typography>
            <Box
              component="nav"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.5
              }}
            >
              {[
                { to: "/", text: "Inicio" },
                { to: "/clinica", text: "Clínica" },
                { to: "/tratamientos", text: "Tratamientos" },
                { to: "/resultados", text: "Resultados" },
              ].map((link) => (
                <MuiLink
                  key={link.text}
                  component={RouterLink}
                  to={link.to}
                  underline="none"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: { xs: "14px", md: "15px" },
                    fontWeight: 400,
                    transition: "color 0.2s ease",
                    "&:hover": {
                      color: "#fff"
                    },
                  }}
                >
                  {link.text}
                </MuiLink>
              ))}
            </Box>
          </Box>

          {/* Contact Column */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                mb: 2,
                fontSize: { xs: "13px", md: "14px" },
                letterSpacing: "0.5px"
              }}
            >
              Contacto
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <MuiLink
                href="mailto:info@guzmanripoll.com"
                underline="none"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: { xs: "14px", md: "15px" },
                  fontWeight: 400,
                  transition: "color 0.2s ease",
                  "&:hover": { color: "#fff" },
                }}
              >
                info@guzmanripoll.com
              </MuiLink>
              <MuiLink
                href="tel:+59892566656"
                underline="none"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: { xs: "14px", md: "15px" },
                  fontWeight: 400,
                  transition: "color 0.2s ease",
                  "&:hover": { color: "#fff" },
                }}
              >
                +598 92 566 656
              </MuiLink>

              {/* Social Icons */}
              <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                <MuiLink
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    transition: "color 0.2s ease",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  <InstagramIcon fontSize="small" />
                </MuiLink>
                <MuiLink
                  href="https://www.linkedin.com/in/guzmanripoll/"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    transition: "color 0.2s ease",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  <LinkedInIcon fontSize="small" />
                </MuiLink>
                <MuiLink
                  href="https://www.facebook.com/dr.guzmanripoll"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    transition: "color 0.2s ease",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  <FacebookIcon fontSize="small" />
                </MuiLink>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Divider Line */}
        <Box
          sx={{
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            pt: 3,
            mt: 2
          }}
        >
          {/* Copyright */}
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255, 255, 255, 0.5)",
              fontSize: { xs: "12px", md: "13px" },
              fontWeight: 400,
              textAlign: { xs: "center", md: "left" }
            }}
          >
            © 2025 Guzmán Ripoll. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}