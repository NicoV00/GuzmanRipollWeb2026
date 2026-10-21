import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useSEO from "../hooks/useSEO";
import { PAGE_SEO } from "../seo/seo";
import Footer from "../components/UI/Footer";
import MedicalProcedures from "../components/procedimientos/preview";
import CTACard from "../components/procedimientos/CTACard";

export default function Procedimientos({ toggleTheme }) {
  const location = useLocation();

  useSEO(PAGE_SEO["/procedimientos"]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);


  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#F2F2F2',
        overflowX: 'hidden',
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
      }}
    >
      <MedicalProcedures />
      <CTACard />
      <Footer variant="contact" />

    </Box>
  );
}