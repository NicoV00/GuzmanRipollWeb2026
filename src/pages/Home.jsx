import { Box, Typography } from "@mui/material";
import { useState } from "react";
import useSEO from "../hooks/useSEO";
import { PAGE_SEO } from "../seo/seo";
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

  useSEO(PAGE_SEO["/"]);


  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#07111C', // Navy continuity for Safari
        overflowX: 'clip',
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
      }}
    >
      {/* Hero flows naturally so the framed video stays accessible on small screens. */}
      <Box sx={{ position: 'relative', zIndex: 0 }}>
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
