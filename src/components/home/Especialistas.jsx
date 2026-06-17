import React from 'react';
import { Box, Grid, Typography, Container } from '@mui/material';
import { Sparkles, Brain, Zap, HeartHandshake, Activity, Shield } from 'lucide-react';

export default function Especialistas() {
  return (
    <Box sx={{ 
      minHeight: '80vh', 
      bgcolor: '#FAFFFF',
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' } // Responsive layout
    }}>
      {/* Left side - Image gallery grid */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        /* Capa de grain ultra sutil (estilo fotográfico) */
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 2,
          opacity: 0.07,
          mixBlendMode: 'overlay',
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: '160px 160px',
        }
      }}>

        <img src={"/images/bias.png"} alt="Cirugía mamaria" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Box>

      {/* Right side - Content */}
      <Box sx={{
        flex: 0.6,
        bgcolor: '#0A0A0A', // Fondo más negro
        color: 'white',
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        {/* Header text */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="overline"
            sx={{
              fontFamily: 'Red Hat Display',
              color: '#E9E9E9',
              letterSpacing: '0.08em',
              fontSize: '0.8rem',
              fontWeight: 500,
              textAlign: 'left',
              display: 'block',
              maxWidth: '440px',
              lineHeight: 1.5,
            }}
          >
            HISTORIA CLÍNICA, SIMULACIONES 3D Y TÉCNICAS DE VANGUARDIA PARA ACOMPAÑARTE EN CADA PASO.
          </Typography>
        </Box>

      <Box>{/* Main heading */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: 'Poppins',
              fontWeight: 400,  // Reducido de 500 a 400
              lineHeight: 1.1,
              textAlign: 'start',
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            Especialistas en
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontFamily: 'Poppins',
              fontWeight: 400,  // Reducido de 500 a 400
              lineHeight: 1.1,
              color: '#0081C7',
              textAlign: 'start',
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            Cirugía Mamaria
          </Typography>
        </Box>

        {/* Features section */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 0,
          
        }}>
          {/* Procedimientos personalizados */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 3,
              p: 2,
              borderTop: '1px solid',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              // Add this to create vertical separators
              '& > *:not(:last-child)': {
                borderRight: '1px solid',
                borderColor: 'rgba(255, 255, 255, 0.08)',
                paddingRight: 3,
              }
            }}>
            <Box sx={{ width: "70%", textAlign: 'start' }}>
              <Typography variant="h6" sx={{
                fontFamily: 'Poppins',
                fontWeight: 500,
                mb: 0.5,
                fontSize: '1.1rem'
              }}>
                Procedimientos personalizados
              </Typography>
              <Typography variant="body2" sx={{
                fontFamily: 'Red Hat Display',
                color: '#9CA3AF',
                fontSize: '1.05rem'
              }}>
                Cada plan es único, como vos
              </Typography>
            </Box>
            <Box sx={{ width: "30%", display: 'flex', justifyContent: 'center' }}>
              <Box sx={{
                flexShrink: 0,
                width: 48,
                height: 48,
                border: '1px solid',
                borderColor: 'rgba(0, 129, 199, 0.3)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, rgba(0, 129, 199, 0.05), rgba(0, 129, 199, 0.1))'
              }}>
                <HeartHandshake size={22} color="#0081C7" />
              </Box>
            </Box>
          </Box>

          {/* Cirugía inteligente */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 3,
              p: 2,
              borderTop: '1px solid',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              // Add this to create vertical separators
              '& > *:not(:last-child)': {
                borderRight: '1px solid',
                borderColor: 'rgba(255, 255, 255, 0.08)',
                paddingRight: 3,
              }
            }}>
            <Box sx={{ width: "70%", textAlign: 'start' }}>
              <Typography variant="h6" sx={{
                fontFamily: 'Poppins',
                fontWeight: 500,
                mb: 0.5,
                fontSize: '1.1rem'
              }}>
                Cirugía inteligente
              </Typography>
              <Typography variant="body2" sx={{
                fontFamily: 'Red Hat Display',
                color: '#9CA3AF',
                fontSize: '1.05rem'
              }}>
                Integramos inteligencia artificial y tecnología 3D.
              </Typography>
            </Box>
            <Box sx={{ width: "30%", display: 'flex', justifyContent: 'center' }}>
              <Box sx={{
                flexShrink: 0,
                width: 48,
                height: 48,
                border: '1px solid',
                borderColor: 'rgba(0, 129, 199, 0.3)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, rgba(0, 129, 199, 0.05), rgba(0, 129, 199, 0.1))'
              }}>
                <Brain size={22} color="#0081C7" />
              </Box>
            </Box>
          </Box>

          {/* Técnicas de vanguardia */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 3,
              p: 2,
              borderTop: '1px solid',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              // Add this to create vertical separators
              '& > *:not(:last-child)': {
                borderRight: '1px solid',
                borderColor: 'rgba(255, 255, 255, 0.08)',
                paddingRight: 3,
              }
            }}>
            <Box sx={{ width: "70%", textAlign: 'start' }}>
              <Typography variant="h6" sx={{
                fontFamily: 'Poppins',
                fontWeight: 500,
                mb: 0.5,
                fontSize: '1.1rem'
              }}>
                Técnicas de vanguardia
              </Typography>
              <Typography variant="body2" sx={{
                fontFamily: 'Red Hat Display',
                color: '#9CA3AF',
                fontSize: '1.05rem'
              }}>
                Métodos innovadores para optimizar tu recuperación.
              </Typography>
            </Box>
            <Box sx={{ width: "30%", display: 'flex', justifyContent: 'center' }}>
              <Box sx={{
                flexShrink: 0,
                width: 48,
                height: 48,
                border: '1px solid',
                borderColor: 'rgba(0, 129, 199, 0.3)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, rgba(0, 129, 199, 0.05), rgba(0, 129, 199, 0.1))'
              }}>
                <Zap size={22} color="#0081C7" />
              </Box>
            </Box>
          </Box>
        </Box>
        
        </Box>
      </Box>
    </Box>
  );
}
