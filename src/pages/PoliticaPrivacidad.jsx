import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Footer from "../components/UI/Footer";

// Contenido básico de privacidad (Ley N° 18.331 de Protección de Datos Personales, Uruguay)
const secciones = [
  {
    titulo: "Introducción y responsable del tratamiento",
    parrafos: [
      "En la clínica del Dr. Guzmán Ripoll nos comprometemos a proteger la privacidad de nuestros pacientes y de quienes visitan este sitio web. La presente política describe qué datos personales recopilamos, con qué finalidad y cuáles son tus derechos, en conformidad con la Ley N° 18.331 de Protección de Datos Personales de la República Oriental del Uruguay.",
      "El responsable del tratamiento de los datos es el Dr. Guzmán Ripoll, con sede en Punta del Este, Uruguay. Podés contactarnos por cualquier consulta vinculada a esta política a info@guzmanripoll.com.",
    ],
  },
  {
    titulo: "Datos que recopilamos",
    parrafos: [
      "Recopilamos únicamente los datos que nos proporcionás de forma voluntaria al comunicarte con nosotros:",
    ],
    lista: [
      "Datos de contacto: nombre, teléfono y correo electrónico, cuando completás el formulario de contacto, agendás una consulta o nos escribís por WhatsApp.",
      "Información de la consulta: el procedimiento o tratamiento por el que consultás y los mensajes que nos envíes.",
      "Datos de navegación: información técnica básica (tipo de dispositivo, navegador y páginas visitadas) recopilada de forma anónima para mejorar el funcionamiento del sitio.",
    ],
  },
  {
    titulo: "Finalidad del tratamiento",
    parrafos: [
      "Utilizamos tus datos exclusivamente para:",
    ],
    lista: [
      "Responder tus consultas y coordinar citas médicas.",
      "Brindarte información sobre los procedimientos por los que consultaste.",
      "Realizar el seguimiento de tu atención cuando ya sos paciente.",
      "Mejorar la experiencia de uso y el contenido de nuestro sitio web.",
    ],
    cierre:
      "No utilizamos tus datos con fines publicitarios masivos ni los vendemos o cedemos a terceros con fines comerciales.",
  },
  {
    titulo: "Confidencialidad y datos de salud",
    parrafos: [
      "La información vinculada a tu salud que compartas durante una consulta está protegida por el secreto profesional médico y por la normativa sanitaria vigente. Solo el equipo de salud interviniente en tu atención accede a ella, y se conserva con las medidas de seguridad adecuadas.",
    ],
  },
  {
    titulo: "Imágenes de resultados de pacientes",
    parrafos: [
      "Las fotografías de resultados (antes y después) publicadas en la sección Resultados de este sitio se difunden con el consentimiento informado, expreso y por escrito de cada paciente, otorgado de forma libre y revocable. Las imágenes se publican preservando la identidad de la persona: no incluyen el rostro ni datos que permitan identificarla.",
      "Cualquier paciente puede revocar su consentimiento en cualquier momento escribiendo a info@guzmanripoll.com, en cuyo caso las imágenes serán retiradas del sitio a la brevedad. Estas fotografías tienen una finalidad exclusivamente informativa sobre los procedimientos realizados y no constituyen una garantía de resultados, que varían según cada paciente.",
    ],
  },
  {
    titulo: "Servicios de terceros",
    parrafos: [
      "Este sitio puede utilizar servicios de terceros para su funcionamiento, como plataformas de mensajería (WhatsApp), herramientas de medición de audiencia y servicios de alojamiento. Estos proveedores procesan datos según sus propias políticas de privacidad y solo en la medida necesaria para prestar el servicio.",
    ],
  },
  {
    titulo: "Cookies",
    parrafos: [
      "Utilizamos cookies técnicas necesarias para el funcionamiento del sitio y, eventualmente, cookies de analítica para conocer de forma agregada cómo se usa la web. Podés configurar tu navegador para bloquear o eliminar cookies en cualquier momento sin que ello afecte tu acceso al contenido.",
    ],
  },
  {
    titulo: "Tus derechos",
    parrafos: [
      "En cualquier momento podés ejercer los derechos de acceso, rectificación, actualización, inclusión o supresión de tus datos personales, previstos por la Ley N° 18.331. Para hacerlo, escribinos a info@guzmanripoll.com indicando tu solicitud, y la responderemos dentro de los plazos legales.",
      "También tenés derecho a presentar una consulta o denuncia ante la Unidad Reguladora y de Control de Datos Personales (URCDP) si considerás que el tratamiento de tus datos no se ajusta a la normativa.",
    ],
  },
  {
    titulo: "Seguridad y conservación",
    parrafos: [
      "Aplicamos medidas técnicas y organizativas razonables para proteger tus datos contra el acceso no autorizado, la pérdida o la alteración. Conservamos la información únicamente durante el tiempo necesario para las finalidades descritas o el que exija la normativa aplicable.",
    ],
  },
  {
    titulo: "Cambios en esta política",
    parrafos: [
      "Podemos actualizar esta política para reflejar cambios normativos o en nuestros servicios. La versión vigente estará siempre publicada en esta página, con su fecha de última actualización.",
    ],
  },
];

export default function PoliticaPrivacidad() {
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
          {/* Eyebrow pill */}
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
            Política de Privacidad
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

              {s.parrafos.map((p, i) => (
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
                <Box component="ul" sx={{ m: 0, pl: "22px", mb: 1.5 }}>
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

              {s.cierre && (
                <Typography sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: { xs: "14px", md: "15px" },
                  lineHeight: 1.8,
                  color: "rgba(0,0,0,0.65)",
                }}>
                  {s.cierre}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      </Box>

      <Footer backgroundColor="#FAFFFF" cardBackgroundColor="#EBEDEF" />
    </Box>
  );
}
