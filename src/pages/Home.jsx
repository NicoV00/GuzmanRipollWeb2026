import { Box, Typography } from "@mui/material";
import { useState } from "react";
import IntroHome from "../components/home/IntroHome";
import ConoceMasHome from "../components/home/ConoceMasHome";
import VerMasProcedimientosHome from "../components/home/VerMasProcedimientosHome";
import CTAhome from "../components/home/CTAhome";
import Testimonios from "../components/home/Testimonios";
import Especialistas from "../components/home/Especialistas";
import Faq from "../components/home/faq";
import CTAFinalHome from "../components/home/CTAFinalHome";
import Footer from "../components/UI/Footer";

export default function Home({ toggleTheme }) {
  const [isPinned, setIsPinned] = useState(true)

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#07111C', // Navy continuity for Safari
        overflowX: 'hidden',
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
      }}
    >
      {/* Hero Section pinned to bottom */}
      <Box sx={{ position: 'sticky', top: 0, zIndex: 0 }}>
        <IntroHome />
      </Box>

      {/* Content scrolling over the Hero */}
      <Box sx={{ position: 'relative', zIndex: 10, backgroundColor: '#FAFFFF' }}>
        <ConoceMasHome />

        <VerMasProcedimientosHome />

        <CTAhome />

        <Testimonios />

        <Especialistas />

        <Faq />

        <CTAFinalHome />

        <Footer backgroundColor="#FAFFFF" cardBackgroundColor="#EBEDEF" />
      </Box>
    </Box>
  );
}
