import React from "react";
import { Box, Typography, Link as MuiLink } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

export default function FooterSocialLinks() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 3
      }}
    >
      {/* Copyright text */}
      <Typography
        variant="caption"
        sx={{
          color: "#fff",
          fontSize: "12px",
          fontWeight: 500,
          letterSpacing: "0.5px"
        }}
      >
        Todos los Derechos Reservados.
      </Typography>
      <Typography
        variant="caption"
        sx={{
          color: "#fff",
          fontSize: "12px",
          fontWeight: 500,
          letterSpacing: "0.5px"
        }}
      >
        Copyright ©2025 Guzman Ripoll
      </Typography>

      {/* LinkedIn Icon */}
      <MuiLink
        href="https://www.linkedin.com/in/guzmanripoll/"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          color: "#fff",
          border: "1px solid #fff",
          borderRadius: "4px",
          p: 0.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s ease",
          "&:hover": {
            opacity: 0.7,
          },
        }}
      >
        <LinkedInIcon fontSize="small" />
      </MuiLink>
    </Box>
  );
}
