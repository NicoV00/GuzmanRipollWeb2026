import { Box, Typography } from "@mui/material";
import { useState } from "react";
import useSEO from "../hooks/useSEO";
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

  useSEO({
    title: 'Cirugía Plástica y Estética en Uruguay',
    description: 'Sitio oficial del Dr. Guzmán Ripoll, especialista en Cirugía Plástica, Estética y Reconstructiva en Punta del Este, Uruguay. Lipoescultura VASER, Cirugía Mamaria, Abdominoplastia y tratamientos avanzados no invasivos.',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Physician",
      "name": "Dr. Guzmán Ripoll",
      "image": "https://www.guzmanripoll.com/images/GR_9_Isologo.png",
      "medicalSpecialty": "PlasticSurgery",
      "telephone": "+59892566656",
      "email": "info@guzmanripoll.com",
      "url": "https://www.guzmanripoll.com/",
      "logo": "https://www.guzmanripoll.com/images/GR_9_Isologo.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Punta del Este",
        "addressLocality": "Punta del Este",
        "addressRegion": "Maldonado",
        "postalCode": "20100",
        "addressCountry": "UY"
      },
      "sameAs": [
        "https://www.instagram.com/dr.guzmanripoll/",
        "https://www.facebook.com/dr.guzmanripoll",
        "https://www.linkedin.com/in/guzmanripoll/"
      ]
    }
  });


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
