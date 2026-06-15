import { Box, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
        gridTemplateRows: "auto auto 1fr",
        columnGap: "20px",
        px: { xs: "20px", md: "70px" },
        pt: { xs: "100px", md: "120px" },
        pb: { xs: "40px", md: "60px" },
      }}
    >
      {/* Row 1: Description text — columns 7-8 only (2 cols max) */}
      <Box
        sx={{
          gridColumn: { xs: "1 / 8", md: "7 / 10" },
          gridRow: "1",
          mb: { xs: 1, md: 2 },
        }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "14px", md: "18px" },
            fontWeight: 300,
            lineHeight: 1.5,
            color: "rgba(255,255,255,0.45)",
            textAlign: "left",
          }}
        >
          La página que buscas no existe o fue movida a otra ubicación.
        </Typography>
      </Box>

      {/* Row 2: Button — columns 7-8 */}
      <Box
        sx={{
          gridColumn: { xs: "1 / 8", md: "7 / 10" },
          gridRow: "2",
          mb: { xs: 4, md: 0 },
        }}
      >
        <Box
          component={RouterLink}
          to="/contacto"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: "#fff",
            textDecoration: "underline",
            textUnderlineOffset: "4px",
            textDecorationThickness: "1px",
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "13px", md: "14px" },
            fontWeight: 400,
            transition: "opacity 0.2s ease",
            "&:hover": { opacity: 0.7 },
          }}
        >
          Contáctanos
          <ArrowRight size={14} strokeWidth={2} />
        </Box>
      </Box>

      {/* Row 3: 404 number — starts at column 7 */}
      <Box
        sx={{
          gridColumn: { xs: "1 / -1", md: "7 / 13" },
          gridRow: { xs: "3", md: "3" },
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "center", md: "flex-start" },
        }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "140px", sm: "200px", md: "280px", lg: "360px" },
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            color: "#fff",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          404
        </Typography>
      </Box>

      {/* "Esta Escena No Existe" — columns 1-6, bottom-left, spans rows 2-3 */}
      <Box
        sx={{
          gridColumn: { xs: "1 / -1", md: "1 / 7" },
          gridRow: { xs: "4", md: "2 / 4" },
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "36px", sm: "48px", md: "72px", lg: "100px" },
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#fff",
            textAlign: "left",
          }}
        >
          Esta Escena
          <br />
          No Existe
        </Typography>
      </Box>
    </Box>
  );
}
