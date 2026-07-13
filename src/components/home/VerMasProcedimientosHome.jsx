import { Box, Typography } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import { useRef, useEffect } from "react";
import gsap from "gsap";

// Dos filas de procedimientos. Nombres y subtítulos variados para no repetir.
const procedures = [
  {
    name: "CIRUGIA MAMARIA",
    to: "/procedimiento/01",
    subtitle: "Aumento, mastopexia y reconstrucción",
    image: "/images/mamaria.webp",
    topBlur: true,
    col: { xs: "auto", md: "1 / 5" },
    row: 1,
    height: { xs: "290px", sm: "330px", md: "50%" },
  },
  {
    name: "AUMENTO MAMARIO",
    to: "/procedimiento/01",
    subtitle: "Implantes de gel cohesivo",
    image: "/images/aumento.webp",
    topBlur: true,
    col: { xs: "auto", md: "9 / 13" },
    row: 2,
    height: { xs: "310px", sm: "350px", md: "80%" },
  },
  {
    name: "TRATAMIENTOS NO INVASIVOS",
    to: "/procedimiento/06",
    subtitle: "INDIBA & DEKA DuoGlide",
    image: "/images/indibaa.webp",
    objectPosition: "center 40%", // protagonismo del cabezal INDIBA sobre la piel
    col: { xs: "auto", md: "9 / 13" },
    row: 1,
    height: { xs: "240px", sm: "280px", md: "50%" },
  },
  {
    name: "MOMMY MAKEOVER",
    to: "/procedimiento/04",
    subtitle: "Abdomen y mamas en un solo proceso",
    image: "/images/mom.webp",
    col: { xs: "auto", md: "1 / 5" },
    row: 2,
    height: { xs: "320px", sm: "360px", md: "80%" },
  },
  {
    name: "ABDOMINOPLASTIA",
    to: "/procedimiento/04",
    subtitle: "Remodelación del abdomen",
    image: "/images/abdomino.webp",
    objectPosition: "center bottom",
    col: { xs: "auto", md: "5 / 9" },
    row: 2,
    height: { xs: "290px", sm: "330px", md: "50%" },
  },
  {
    name: "LIPOESCULTURA VASER",
    to: "/procedimiento/02",
    subtitle: "Definición corporal de alta precisión",
    image: "/images/lipo2.webp",
    col: { xs: "auto", md: "5 / 9" },
    row: 1,
    height: { xs: "340px", sm: "380px", md: "80%" },
  },
];

export default function VerMasProcedimientosHome() {
  const imageRefs = useRef([]);

  useEffect(() => {
    imageRefs.current.forEach((img) => {
      if (img) {
        gsap.set(img, { transformPerspective: 1000 });
      }
    });
  }, []);

  const handleMouseEnter = (index) => {
    const img = imageRefs.current[index];
    if (img) {
      gsap.to(img, {
        duration: 0.3,
        scale: 1.05,
        y: -3,
        rotationX: 1,
        rotationY: 1,
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = (index) => {
    const img = imageRefs.current[index];
    if (img) {
      gsap.to(img, {
        duration: 0.3,
        scale: 1,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        ease: "power2.out"
      });
    }
  };

  const addToRefs = (el, index) => {
    if (el) {
      imageRefs.current[index] = el;
    }
  };

  return (
    <Box
      id="procedimientos-home-section"  // ID único para detectar esta sección
      sx={{
        position: 'relative',
        height: { xs: 'auto', md: 'calc(200vh + 260px)' },
        overflowY: { xs: 'visible', md: 'scroll' },
        overflowX: 'hidden',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        paddingInline: { xs: '20px', md: '70px' },
        paddingBottom: { xs: '150px', md: '440px' },
      }}
    >
      {/* Header con numeración y enlace */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        width: '100%',
        mb: { xs: 2, md: 0 },
        pt: { xs: 4, md: 6 },
      }}>
        {/* Numeración de sección */}
        <Box sx={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '10px',
        }}>
          <Typography component="span" sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "16px", md: "18px" },
            fontWeight: 600,
            color: "rgba(0, 0, 0, 0.44)",
            lineHeight: 1
          }}>
            02
          </Typography>
          <Typography sx={{
            fontFamily: "Poppins",
            fontSize: { xs: "16px", md: "18px" },
            fontWeight: 500,
            textTransform: "uppercase",
            color: "#000000",
            letterSpacing: "0.03em",
            lineHeight: 1
          }}>
            Procedimientos
          </Typography>
        </Box>

        {/* Enlace a todos los procedimientos */}
        <Box
          component={RouterLink}
          to="/procedimientos"
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: '4px',
            textDecoration: 'none',
            position: 'relative',
            overflow: 'hidden',
            pb: '4px',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '1px',
              backgroundColor: '#000',
              transform: 'translateX(-100%)',
              transition: 'transform 0.3s ease-out',
            },
            '&:hover::after': {
              transform: 'translateX(0)',
            }
          }}
        >
          <Typography sx={{
            fontFamily: "Poppins",
            fontSize: "18px",
            fontWeight: 500,
            textTransform: "uppercase",
            color: "#000",
            letterSpacing: "0.03em",
            lineHeight: 1,
          }}>
            Ver todos los procedimientos
          </Typography>
        </Box>
      </Box>

      {/* Grid de procedimientos */}
      <Box sx={{
        display: { xs: 'flex', md: 'grid' },
        flexDirection: { xs: 'column', md: 'row' },
        gridTemplateColumns: { xs: 'none', md: 'repeat(12, 1fr)' },
        columnGap: { xs: '16px', md: '20px' },
        flex: 1,
      }}>
        {procedures.map((card, index) => (
          <Box
            key={card.name}
            component={RouterLink}
            to={card.to}
            sx={{
              marginTop: { xs: '35px', md: '71px' },
              width: { xs: '100%', md: 'auto' },
              gridColumn: card.col,
              gridRow: { xs: 'auto', md: card.row === 1 ? '1 / 1' : '2 / 3' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              justifyContent: 'start',
              textDecoration: 'none',
              color: 'inherit',
              mb: { xs: index === procedures.length - 1 ? '40px' : '0px', md: '0px' },
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: card.height,
                borderRadius: '6px',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              <Box
                component="img"
                src={card.image}
                alt={card.name}
                loading="lazy"
                decoding="async"
                ref={(el) => addToRefs(el, index)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: card.objectPosition || 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                }}
              />
              {/* Blur muy sutil en el borde superior de la imagen */}
              {card.topBlur && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '26%',
                    backdropFilter: 'blur(3px)',
                    WebkitBackdropFilter: 'blur(3px)',
                    WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, transparent 100%)',
                    maskImage: 'linear-gradient(to bottom, #000 0%, transparent 100%)',
                    pointerEvents: 'none',
                    zIndex: 2,
                  }}
                />
              )}
            </Box>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              color: '#000000',
              textAlign: 'start',
              mt: { xs: '20px', md: '15px' }
            }}>
              <Typography variant="p" fontSize={{ xs: '14px', md: '18px' }} fontFamily={'Poppins'} fontWeight={500} sx={{ mb: '4px' }}>{card.name}</Typography>
              <Typography variant="p" fontSize={{ xs: '14px', md: '16px' }} fontFamily={'Poppins'} color="text.secondary" fontWeight={500}>{card.subtitle}</Typography>
            </Box>
          </Box>
        ))}
      </Box> {/* Cierre del grid */}
    </Box>
  );
}
