import React, { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from 'lenis/dist/lenis-react';
import Home from "./pages/Home";
// Rutas secundarias en chunks separados: solo se descargan al navegar a ellas
const Clinica = lazy(() => import("./pages/Clinica"));
const Resultados = lazy(() => import("./pages/Resultados"));
const ProcedimientoDetalle = lazy(() => import("./pages/ProcedimientoDetalle"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PoliticaPrivacidad = lazy(() => import("./pages/PoliticaPrivacidad"));
const ProcesamientoDatos = lazy(() => import("./pages/ProcesamientoDatos"));
const Procedimientos = lazy(() => import("./pages/Procedimientos"));
const ContactSection = lazy(() =>
  import("./components/contact/ContactSection").then((m) => ({ default: m.ContactSection }))
);
// import Research from "./pages/Research"; // Research oculto temporalmente

import NavBar from "./components/UI/NavBar";
import ContactFloatingBar from "./components/UI/ContactFloatingBar";
import LenisScrollTriggerSetup from "./components/LenisScrollTriggerSetup";

import { ThemeProvider, CssBaseline } from '@mui/material';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { lightTheme, darkTheme } from './utils/theme';

gsap.registerPlugin(ScrollTrigger);

// Componentes temporales
const ProcedimientoCero = () => (
  <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Typography variant="h4">Cirugía Mamaria - En construcción</Typography>
  </Box>
);

const NavButtons = () => (
  <Box>
    <Typography>Nav Buttons</Typography>
  </Box>
);

// 🎛️ GRID DEBUGGER COMPONENT

// 🎯 COMPONENTE PRINCIPAL
const App = () => {
  const [mode, setMode] = useState('light');
  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);
  const toggleTheme = () => setMode(prev => (prev === 'light' ? 'dark' : 'light'));

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <Router autoScrollToTop>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ReactLenis
          root
          autoRaf={false}
          options={{
            lerp: 0.1, duration: 1.0, smoothTouch: false, smoothWheel: true,
            wheelMultiplier: 1, touchMultiplier: 2, infinite: false, syncTouch: false,
            syncTouchLerp: 0.1, prevent: false, virtualScroll: false,
          }}
        >
          <AppShell toggleTheme={toggleTheme} />
        </ReactLenis>
        <Analytics />
        <SpeedInsights />
      </ThemeProvider>
    </Router>
  );
};

function AppShell({ toggleTheme }) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionPhase, setTransitionPhase] = useState("idle");
  
  const TRANSITION_STAGGER_MS = 80;
  const TRANSITION_BLOCK_COUNT = 4;
  const ENTER_DURATION_MS = 720;
  const EXIT_DURATION_MS = 820;
  const TOTAL_STAGGER_MS = TRANSITION_STAGGER_MS * (TRANSITION_BLOCK_COUNT - 1);
  const COVER_COMPLETE_MS = ENTER_DURATION_MS + TOTAL_STAGGER_MS;
  const EXIT_COMPLETE_MS = EXIT_DURATION_MS + TOTAL_STAGGER_MS;

  useEffect(() => {
    // Si la ruta a la que vamos es igual a la que estamos mostrando, abortamos.
    if (location.pathname === displayLocation.pathname) {
      return;
    }

    // Fase 1: Baja el telón (los bloques entran)
    setTransitionPhase("enter");

    let exitTimer;
    let idleTimer;

    // Fase 2: Cambiar la ruta real cuando la pantalla está azul
    const swapTimer = setTimeout(() => {
      setDisplayLocation(location);
      window.scrollTo(0, 0);

      // Fase 3: Sube el telón (los bloques se van)
      exitTimer = setTimeout(() => {
        setTransitionPhase("exit");

        // Fase 4: Ocultar el overlay
        idleTimer = setTimeout(() => {
          setTransitionPhase("idle");
        }, EXIT_COMPLETE_MS);

      }, 50); 
    }, COVER_COMPLETE_MS);

    return () => {
      clearTimeout(swapTimer);
      clearTimeout(exitTimer);
      clearTimeout(idleTimer);
    };
  }, [location]); 

  return (
    <>
      <LenisScrollTriggerSetup />

      <Box id="scroll-container" sx={{ textAlign: "center", overflowX: "clip", position: "relative", width: "100%", maxWidth: "100vw" }}>
        <NavBar toggleTheme={toggleTheme} />
        <ContactFloatingBar />

        {/* Carga la vista retrasada (la que decide el temporizador) */}
        <Suspense fallback={null}>
          <Routes location={displayLocation}>
            <Route path="/" element={<Home toggleTheme={toggleTheme} />} />
            <Route path="/inicio" element={<Home toggleTheme={toggleTheme} />} />
            <Route path="/clinica" element={<Clinica />} />
            <Route path="/procedimientos" element={<Procedimientos toggleTheme={toggleTheme} />} />
            <Route path="/procedimiento/:id" element={<ProcedimientoDetalle />} />
            <Route path="/resultados" element={<Resultados />} />
            {/* Research oculto temporalmente
            <Route path="/research" element={<Research />} /> */}
            <Route path="/contacto" element={<ContactSection />} />
            <Route path="/cir-mamaria" element={<ProcedimientoCero />} />
            <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
            <Route path="/procesamiento-datos" element={<ProcesamientoDatos />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>

        <ConditionalNavButtons />

      </Box>

      <RouteTransitionOverlay phase={transitionPhase} />
    </>
  );
}

// 🔧 Componente auxiliar
function ConditionalNavButtons() {
  const location = useLocation();
  const shouldShowNavButtons = location.pathname !== "/cir-mamaria" && location.pathname !== "/" && false; 

  if (!shouldShowNavButtons) return null;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '82%' }}>
      <NavButtons />
    </Box>
  );
}

function RouteTransitionOverlay({ phase }) {
  const blockColor = "#081743";
  const isActive = phase !== "idle";

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        pointerEvents: isActive ? "auto" : "none",
        zIndex: 20000,
        visibility: isActive ? "visible" : "hidden",
      }}
    >
      {[0, 1, 2, 3].map((index) => {
        const staggerDelay = index * 0.08; 

        let translateY = "100%"; 
        if (phase === "enter") translateY = "0%"; 
        if (phase === "exit") translateY = "-100%"; 

        let transition = "none";
        if (phase === "enter") {
          transition = `transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${staggerDelay}s`;
        } else if (phase === "exit") {
          transition = `transform 0.8s cubic-bezier(0.77, 0, 0.175, 1) ${staggerDelay}s`;
        }

        return (
          <Box
            key={index}
            sx={{
              position: "absolute",
              left: `${index * 25}%`,
              top: 0,
              // FIX: calc(25% + 2px) soluciona las líneas blancas (sub-pixel rendering) en móviles
              width: "calc(25% + 2px)", 
              height: "100%",
              backgroundColor: blockColor,
              transform: `translateY(${translateY})`,
              transition: transition,
              willChange: "transform",
            }}
          />
        );
      })}
    </Box>
  );
}

export default App;
