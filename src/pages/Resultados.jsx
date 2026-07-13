import React from "react";
import { ResultsCarousel } from "../components/resultados/results-carousel";
import useSEO from "../hooks/useSEO";

export default function Resultados() {
  useSEO({
    title: 'Resultados Antes y Después',
    description: 'Galería de casos de antes y después en cirugía mamaria, contorno corporal y tratamientos no invasivos realizados por el Dr. Guzmán Ripoll.',
  });

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F2F2F2',
      color: 'black',
      margin: 0,
      padding: 0
    }}>
      {/* NavBar ya está incluido en App.js, no lo duplicamos aquí */}
      <main style={{ paddingTop: '80px' }}>
        <ResultsCarousel />
      </main>
    </div>
  );
}
