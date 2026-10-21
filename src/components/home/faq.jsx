"use client"

import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Collapse
} from "@mui/material";
import { faqItems } from "../../data/faq";

export default function Faq() {
  const [expandedItem, setExpandedItem] = useState(1);



  const toggleItem = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      mx: 'auto',
      p: 3,
      pt: { xs: '64px', md: '120px' },
      bgcolor: '#FAFFFF'
    }}>
      <Box sx={{
        gridColumn: '1 / 13',
        gridRow: '1 / 1',
        mx: { xs: 1, md: 4 },
      }}>

        <Box sx={{
          mb: "80px",
          textAlign: 'start',
        }}>
          {/* Eyebrow numerado — consistente con el resto de la home */}
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '10px', mb: { xs: '20px', md: '24px' } }}>
            <Typography component="span" sx={{
              fontFamily: "Poppins, sans-serif", fontSize: { xs: "16px", md: "18px" },
              fontWeight: 600, color: "rgba(0,0,0,0.42)", lineHeight: 1,
            }}>
              05
            </Typography>
            <Typography component="span" sx={{
              fontFamily: "Poppins, sans-serif", fontSize: { xs: "16px", md: "18px" }, fontWeight: 500,
              textTransform: "uppercase", color: "#000000", letterSpacing: "0.03em", lineHeight: 1,
            }}>
              FAQ
            </Typography>
          </Box>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 400,
              fontFamily: 'Poppins, sans-serif',
              color: 'text.primary',
              fontSize: { xs: 'clamp(28px, 8vw, 38px)', md: '45px', xl: '70px' },
              mb: 1
            }}
          >
            Tenes dudas?
          </Typography>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 400,
              fontFamily: 'Poppins, sans-serif',
              color: 'textAccent',
              fontSize: { xs: 'clamp(28px, 8vw, 38px)', md: '45px', xl: '70px' },
              mb: 2
            }}
          >
            Tenemos respuestas
          </Typography>
          <Typography variant="body" color="background" sx={{}}>
            En cualquier caso, te sugerimos comunicarte con nosotros si tienes alguna consulta.
          </Typography>
        </Box>
      </Box>


      <Box sx={{
        gridColumn: '1 / 13',
        gridRow: '2 / 2',
        mx: { xs: 1, md: 4 },
        mb: { xs: 4, md: 6 },
      }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {faqItems.map((item) => (
            <Box key={item.id}>
              <Divider />
              <Box sx={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                py: 2
              }}>
                <Box sx={{ display: 'flex', gap: 2, flex: 1 }}>
                  <Typography
                    variant="body"
                    color="textPrimary"
                    sx={{ mt: 0.5, fontWeight: 'bold', marginLeft: '20px', fontSize: { xs: '20px', md: '24px' } }}
                  >
                    {item.id}.
                  </Typography>
                  <Box sx={{ width: '82%', marginLeft: 'auto', textAlign: 'start' }}>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{ fontSize: { xs: '16px', md: '20px' }, fontWeight: 500, mb: 1 }}
                    >
                      {item.question}
                    </Typography>
                    <Collapse in={expandedItem === item.id}>
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        sx={{
                          fontSize: { xs: '16px', md: '20px' },
                          lineHeight: 1.75,
                          pb: 2,
                          maxWidth: { xs: '100%', md: 'calc(100% - 280px)' }
                        }}
                      >
                        {item.answer}
                      </Typography>
                    </Collapse>
                  </Box>
                </Box>
                <IconButton
                  onClick={() => toggleItem(item.id)}
                  aria-label={expandedItem === item.id ? `Cerrar respuesta: ${item.question}` : `Ver respuesta: ${item.question}`}
                  aria-expanded={expandedItem === item.id}
                  size="small"
                  sx={{
                    ml: 1,
                    height: 32,
                    width: 32,
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: expandedItem === item.id ? 'rotate(45deg)' : 'rotate(0deg)',
                    '&:hover': { backgroundColor: 'transparent' }
                  }}
                >
                  <Plus size={18} strokeWidth={2} />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
