import React from "react";
import { ResultsCarousel } from "../components/resultados/results-carousel";
import useSEO from "../hooks/useSEO";
import { PAGE_SEO } from "../seo/seo";

export default function Resultados() {
  useSEO(PAGE_SEO["/resultados"]);

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
