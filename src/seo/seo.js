// Fuente única de SEO: títulos, descripciones y datos estructurados (JSON-LD) por ruta.
// La usan el hook useSEO (en el navegador) y scripts/prerender.mjs (en el build, para que
// cada URL salga con su <head> y su contenido en el HTML inicial). JS plano: sin JSX ni alias.
import { procedimientosData, procedimientoPath } from "../data/procedimientos.js"
import { faqItems } from "../data/faq.js"

export const SITE_URL = "https://www.guzmanripoll.com"
export const DOCTOR_NAME = "Dr. Guzmán Ripoll"
export const DEFAULT_OG_IMAGE = "/images/foto-perfil-guzman.webp"
export const PHONE = "+59892566656"
export const EMAIL = "info@guzmanripoll.com"

export const SAME_AS = [
  "https://www.instagram.com/dr.guzmanripoll/",
  "https://www.facebook.com/dr.guzmanripoll",
  "https://www.linkedin.com/in/guzmanripoll/",
]

const abs = (path) => (path.startsWith("http") ? path : `${SITE_URL}${path}`)
const ID = {
  website: `${SITE_URL}/#website`,
  clinic: `${SITE_URL}/#clinica`,
  doctor: `${SITE_URL}/#dr-guzman-ripoll`,
}

// ─── Entidades base ──────────────────────────────────────
// Physician es un LocalBusiness: es la ficha que Google cruza con el Perfil de Empresa.
// La dirección debe coincidir EXACTAMENTE con la de Google Business Profile.
const clinicEntity = {
  "@type": "Physician",
  "@id": ID.clinic,
  name: `${DOCTOR_NAME} · Cirugía Plástica`,
  alternateName: ["Guzmán Ripoll Cirugía Plástica", "Dr. Guzman Ripoll"],
  url: `${SITE_URL}/`,
  logo: abs("/images/GR_9_Isologo.png"),
  image: abs(DEFAULT_OG_IMAGE),
  telephone: PHONE,
  email: EMAIL,
  medicalSpecialty: "PlasticSurgery",
  isAcceptingNewPatients: true,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Clínica Select, Av. Roosevelt",
    addressLocality: "Punta del Este",
    addressRegion: "Maldonado",
    postalCode: "20100",
    addressCountry: "UY",
  },
  areaServed: [
    { "@type": "City", name: "Punta del Este" },
    { "@type": "City", name: "Maldonado" },
    { "@type": "City", name: "Montevideo" },
    { "@type": "Country", name: "Uruguay" },
  ],
  availableService: Object.values(procedimientosData).map((p) => ({
    "@type": "MedicalProcedure",
    name: p.title,
    url: abs(procedimientoPath(p.number)),
  })),
  founder: { "@id": ID.doctor },
  sameAs: SAME_AS,
}

const doctorEntity = {
  "@type": "Person",
  "@id": ID.doctor,
  name: DOCTOR_NAME,
  jobTitle: "Cirujano Plástico, Reconstructivo y Estético",
  image: abs(DEFAULT_OG_IMAGE),
  url: `${SITE_URL}/clinica`,
  worksFor: { "@id": ID.clinic },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Universidad CLAEH" },
    { "@type": "CollegeOrUniversity", name: "Universidad de la República" },
    { "@type": "CollegeOrUniversity", name: "Universitat de Barcelona" },
  ],
  memberOf: [
    { "@type": "MedicalOrganization", name: "Sociedad de Cirugía Plástica, Reparadora y Estética del Uruguay (SCPREU)" },
    { "@type": "MedicalOrganization", name: "Asociación Latinoamericana de Microcirugía (ALAM)" },
  ],
  knowsAbout: [
    "Cirugía plástica", "Cirugía estética", "Cirugía reconstructiva", "Aumento mamario",
    "Mastopexia", "Reducción mamaria", "Reconstrucción mamaria", "Lipoescultura VASER",
    "Abdominoplastia", "Mommy makeover", "INDIBA", "Morpheus8",
  ],
  sameAs: SAME_AS,
}

const websiteEntity = {
  "@type": "WebSite",
  "@id": ID.website,
  url: `${SITE_URL}/`,
  name: DOCTOR_NAME,
  inLanguage: "es-UY",
  publisher: { "@id": ID.clinic },
}

const breadcrumbs = (items) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: abs(path),
  })),
})

const webPage = (path, name, description, type = "WebPage") => ({
  "@type": type,
  "@id": `${abs(path)}#webpage`,
  url: abs(path),
  name,
  description,
  inLanguage: "es-UY",
  isPartOf: { "@id": ID.website },
  about: { "@id": ID.clinic },
})

const graph = (...nodes) => ({ "@context": "https://schema.org", "@graph": nodes })

// ─── SEO por procedimiento ───────────────────────────────
// Palabra clave principal al comienzo del título; ciudad siempre presente.
export const PROCEDIMIENTO_SEO = {
  "01": {
    title: "Aumento Mamario y Cirugía Mamaria en Punta del Este | Dr. Guzmán Ripoll",
    description:
      "Aumento mamario con implantes, mastopexia, reducción y reconstrucción mamaria en Punta del Este, Uruguay. Dr. Guzmán Ripoll, máster en Cirugía Mamaria. Simulación 3D.",
    bodyLocation: "Mamas",
  },
  "02": {
    title: "Lipoescultura VASER en Uruguay · Punta del Este | Dr. Guzmán Ripoll",
    description:
      "Lipoescultura VASER en Punta del Este: remodelación corporal, grasa localizada y tensado de piel. El Dr. Guzmán Ripoll es el único especialista en Uruguay que utiliza VASER.",
    bodyLocation: "Abdomen, cintura, espalda, piernas y brazos",
  },
  "04": {
    title: "Abdominoplastia y Mommy Makeover en Punta del Este | Dr. Guzmán Ripoll",
    description:
      "Abdominoplastia en Punta del Este, Uruguay: elimina el exceso de piel y grasa abdominal, corrige la diástasis y redefine el contorno. Mommy makeover: abdomen y mamas.",
    bodyLocation: "Abdomen",
  },
  "06": {
    title: "INDIBA, Morpheus8 y DEKA DuoGlide en Punta del Este | Dr. Guzmán Ripoll",
    description:
      "Tratamientos no invasivos en Punta del Este: radiofrecuencia INDIBA, Morpheus8 y láser DEKA DuoGlide para reafirmar la piel, mejorar flacidez y celulitis, sin cirugía.",
    bodyLocation: "Rostro y cuerpo",
  },
}

export function procedimientoSEO(number, proc = procedimientosData[number]) {
  const seo = PROCEDIMIENTO_SEO[number]
  if (!proc || !seo) return null
  const path = procedimientoPath(number)
  const isSurgery = number !== "06"
  return {
    path,
    title: seo.title,
    description: seo.description,
    ogImage: proc.imageSrc || DEFAULT_OG_IMAGE,
    ogType: "article",
    structuredData: graph(
      websiteEntity,
      clinicEntity,
      {
        ...webPage(path, seo.title, seo.description, "MedicalWebPage"),
        mainEntity: { "@id": `${abs(path)}#procedimiento` },
        breadcrumb: { "@id": `${abs(path)}#breadcrumb` },
      },
      {
        "@type": isSurgery ? "SurgicalProcedure" : "TherapeuticProcedure",
        "@id": `${abs(path)}#procedimiento`,
        name: proc.title,
        alternateName: proc.subtitle,
        description: proc.description,
        image: abs(proc.imageSrc || DEFAULT_OG_IMAGE),
        bodyLocation: seo.bodyLocation,
        procedureType: isSurgery ? "https://schema.org/SurgicalProcedure" : "https://schema.org/NoninvasiveProcedure",
        howPerformed: proc.tecnica,
        followup: proc.recuperacion,
        url: abs(path),
        provider: { "@id": ID.clinic },
      },
      {
        ...breadcrumbs([["Inicio", "/"], ["Procedimientos", "/procedimientos"], [proc.title, path]]),
        "@id": `${abs(path)}#breadcrumb`,
      }
    ),
  }
}

// ─── SEO por página ──────────────────────────────────────
const page = (path, title, description, extra = {}) => ({
  path,
  title,
  description,
  ogImage: DEFAULT_OG_IMAGE,
  structuredData: graph(websiteEntity, clinicEntity, webPage(path, title, description, extra.pageType), ...(extra.nodes || [])),
  ...extra.fields,
})

const HOME_TITLE = "Cirujano Plástico en Punta del Este, Uruguay | Dr. Guzmán Ripoll"
const HOME_DESC =
  "Cirugía plástica, estética y reconstructiva en Punta del Este y Maldonado, Uruguay. Aumento mamario, lipoescultura VASER y abdominoplastia con el Dr. Guzmán Ripoll."

export const PAGE_SEO = {
  "/": page("/", HOME_TITLE, HOME_DESC, {
    nodes: [
      doctorEntity,
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: faqItems.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  }),
  "/procedimientos": page(
    "/procedimientos",
    "Cirugías Estéticas en Punta del Este y Uruguay | Dr. Guzmán Ripoll",
    "Procedimientos de cirugía plástica en Punta del Este, Uruguay: aumento mamario, mastopexia, lipoescultura VASER, abdominoplastia, mommy makeover y tratamientos INDIBA y Morpheus8.",
    {
      pageType: "CollectionPage",
      nodes: [breadcrumbs([["Inicio", "/"], ["Procedimientos", "/procedimientos"]])],
    }
  ),
  "/clinica": page(
    "/clinica",
    "Clínica y Dr. Guzmán Ripoll · Cirujano Plástico en Punta del Este",
    "Conocé al Dr. Guzmán Ripoll, cirujano plástico titulado por la Universidad de la República con maestría en Cirugía Mamaria (U. de Barcelona), y su clínica en Punta del Este.",
    {
      pageType: "AboutPage",
      nodes: [doctorEntity, breadcrumbs([["Inicio", "/"], ["Clínica", "/clinica"]])],
    }
  ),
  "/resultados": page(
    "/resultados",
    "Antes y Después de Cirugía Plástica en Uruguay | Dr. Guzmán Ripoll",
    "Resultados reales de antes y después en cirugía mamaria, contorno corporal y tratamientos no invasivos realizados por el Dr. Guzmán Ripoll en Punta del Este, Uruguay.",
    { nodes: [breadcrumbs([["Inicio", "/"], ["Resultados", "/resultados"]])] }
  ),
  "/contacto": page(
    "/contacto",
    "Consulta con Cirujano Plástico en Punta del Este | Dr. Guzmán Ripoll",
    "Agendá tu consulta de cirugía plástica en Punta del Este, Maldonado. Clínica Select, Av. Roosevelt. WhatsApp +598 92 566 656 o escribinos desde el formulario.",
    {
      pageType: "ContactPage",
      nodes: [breadcrumbs([["Inicio", "/"], ["Contacto", "/contacto"]])],
    }
  ),
  "/politica-privacidad": page(
    "/politica-privacidad",
    "Política de Privacidad | Dr. Guzmán Ripoll",
    "Política de privacidad del sitio del Dr. Guzmán Ripoll: cómo recopilamos, usamos y protegemos tus datos personales."
  ),
  "/procesamiento-datos": page(
    "/procesamiento-datos",
    "Procesamiento de Datos | Dr. Guzmán Ripoll",
    "Información sobre el procesamiento de datos personales de pacientes y consultas en el sitio del Dr. Guzmán Ripoll."
  ),
}

export const NOT_FOUND_SEO = {
  title: "Página no encontrada | Dr. Guzmán Ripoll",
  description: "La página que buscás no existe o fue movida.",
  robots: "noindex, follow",
}
