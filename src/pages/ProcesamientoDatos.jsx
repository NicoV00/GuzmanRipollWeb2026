import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Footer from "../components/UI/Footer";

// Acuerdo mínimo de procesamiento de datos del formulario de contacto
const secciones = [
  {
    titulo: "Alcance",
    parrafos: [
      "Este documento describe, de forma simple y transparente, cómo se procesan los datos personales que nos enviás a través del formulario de contacto de este sitio web, del agendamiento de consultas o de los canales de mensajería vinculados (WhatsApp).",
    ],
  },
  {
    titulo: "Qué datos se procesan",
    lista: [
      "Nombre y apellido.",
      "Teléfono y/o correo electrónico.",
      "El procedimiento o motivo de consulta que indiques y el contenido de tu mensaje.",
    ],
  },
  {
    titulo: "Cómo se procesan",
    parrafos: [
      "Los datos enviados se reciben únicamente en las casillas y dispositivos de la clínica del Dr. Guzmán Ripoll y se utilizan exclusivamente para responderte y coordinar tu consulta. No se incorporan a bases de datos con fines publicitarios, no se venden ni se ceden a terceros.",
      "Cuando la comunicación se realiza por WhatsApp, el intercambio de mensajes se rige además por la política de privacidad de esa plataforma.",
    ],
  },
  {
    titulo: "Plazo de conservación",
    parrafos: [
      "Los mensajes de consulta se conservan solo durante el tiempo necesario para gestionar tu solicitud. Si pasás a ser paciente, la información clínica se conserva conforme a la normativa sanitaria aplicable y al secreto profesional médico.",
    ],
  },
  {
    titulo: "Tus derechos",
    parrafos: [
      "Podés solicitar el acceso, la rectificación o la supresión de los datos que nos enviaste escribiendo a info@guzmanripoll.com, conforme a la Ley N° 18.331 de Protección de Datos Personales (Uruguay). Para más información, consultá nuestra Política de Privacidad.",
    ],
  },
];

export default function ProcesamientoDatos() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box sx={{ backgroundColor: "#FAFFFF", minHeight: "100vh" }}>
      {/* ─── Hero ─── */}
      <Box sx={{
        pt: { xs: 15, md: 22 },
        pb: { xs: 6, md: 10 },
        px: { xs: "20px", md: "70px" },
        maxWidth: "1920px",
        mx: "auto",
      }}>
        <Box sx={{ maxWidth: "820px", mx: "auto", textAlign: "left" }}>
          <Box sx={{
            display: "inline-flex",
            alignItems: "center",
            px: "14px",
            py: "6px",
            borderRadius: "999px",
            backgroundColor: "rgba(0, 129, 199, 0.08)",
            mb: { xs: 3, md: 4 },
          }}>
            <Typography sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#0081C7",
              lineHeight: 1,
            }}>
              Legales
            </Typography>
          </Box>

          <Typography component="h1" sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "34px", md: "56px" },
            fontWeight: 500,
            letterSpacing: { xs: "-1px", md: "-2px" },
            lineHeight: 1.05,
            color: "#111",
            mb: { xs: 2, md: 3 },
          }}>
            Procesamiento de Datos
          </Typography>

          <Typography sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "13px", md: "14px" },
            color: "rgba(0,0,0,0.5)",
          }}>
            Última actualización: julio 2026
          </Typography>
        </Box>
      </Box>

      {/* ─── Contenido ─── */}
      <Box sx={{
        px: { xs: "20px", md: "70px" },
        pb: { xs: 10, md: 14 },
        maxWidth: "1920px",
        mx: "auto",
      }}>
        <Box sx={{
          maxWidth: "820px",
          mx: "auto",
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          gap: { xs: 5, md: 7 },
        }}>
          {secciones.map((s) => (
            <Box key={s.titulo}>
              <Typography component="h2" sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: { xs: "17px", md: "19px" },
                fontWeight: 600,
                color: "#111",
                mb: 2,
              }}>
                {s.titulo}
              </Typography>

              {(s.parrafos || []).map((p, i) => (
                <Typography key={i} sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: { xs: "14px", md: "15px" },
                  lineHeight: 1.8,
                  color: "rgba(0,0,0,0.65)",
                  mb: 1.5,
                }}>
                  {p}
                </Typography>
              ))}

              {s.lista && (
                <Box component="ul" sx={{ m: 0, pl: "22px" }}>
                  {s.lista.map((item, i) => (
                    <Typography key={i} component="li" sx={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: { xs: "14px", md: "15px" },
                      lineHeight: 1.8,
                      color: "rgba(0,0,0,0.65)",
                      mb: 0.5,
                    }}>
                      {item}
                    </Typography>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Box>

      <Footer backgroundColor="#FAFFFF" cardBackgroundColor="#EBEDEF" />
    </Box>
  );
}
