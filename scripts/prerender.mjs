// Prerender de SEO. Corre después de `vite build`.
//
// La web es una SPA: sin esto, todas las URLs devuelven el mismo index.html vacío
// (mismo título, sin texto, sin canonical). Google termina renderizando el JS, pero tarde y no
// siempre; Bing, WhatsApp/Facebook y los rastreadores de IA (ChatGPT, Perplexity, Claude) no lo
// ejecutan. Este script escribe un HTML por ruta con:
//   - <head> propio (title, description, canonical, Open Graph, JSON-LD), desde src/seo/seo.js
//   - el contenido de texto de la página dentro de #root (React lo reemplaza al montar)
// y además genera sitemap.xml y un 404.html con noindex.
//
// Con "cleanUrls" en vercel.json, dist/clinica.html se sirve en /clinica.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

import { PAGE_SEO, NOT_FOUND_SEO, SITE_URL, DOCTOR_NAME, DEFAULT_OG_IMAGE, procedimientoSEO } from "../src/seo/seo.js"
import { procedimientosData, procedimientoPath } from "../src/data/procedimientos.js"
import { faqItems } from "../src/data/faq.js"

const DIST = join(dirname(fileURLToPath(import.meta.url)), "..", "dist")
const template = readFileSync(join(DIST, "index.html"), "utf8")

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
const abs = (p) => (p.startsWith("http") ? p : `${SITE_URL}${p}`)
const canonical = (p) => `${SITE_URL}${p}`

// ─── <head> ──────────────────────────────────────────────
function headFor({ title, description, path, ogImage = DEFAULT_OG_IMAGE, ogType = "website", robots, structuredData }) {
  const image = abs(ogImage)
  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<meta name="robots" content="${esc(robots || "index, follow, max-image-preview:large, max-snippet:-1")}" />`,
    path ? `<link rel="canonical" href="${canonical(path)}" />` : "",
    `<meta property="og:type" content="${ogType}" />`,
    path ? `<meta property="og:url" content="${canonical(path)}" />` : "",
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:alt" content="${esc(DOCTOR_NAME)}, cirujano plástico en Punta del Este" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    structuredData
      ? `<script type="application/ld+json" id="structured-data-seo">${JSON.stringify(structuredData).replace(/</g, "\\u003c")}</script>`
      : "",
  ]
  return tags.filter(Boolean).join("\n    ")
}

// ─── Contenido estático ──────────────────────────────────
// Mismo contenido que la página real, en HTML semántico. Visualmente oculto (como .sr-only)
// para que no parpadee antes de que React monte; React lo reemplaza por completo al iniciar.
const procs = Object.values(procedimientosData)

const nav = `<nav aria-label="Principal"><ul>
  <li><a href="/">Inicio</a></li>
  <li><a href="/clinica">Clínica</a></li>
  <li><a href="/procedimientos">Procedimientos</a><ul>
    ${procs.map((p) => `<li><a href="${procedimientoPath(p.number)}">${esc(p.title)}</a></li>`).join("\n    ")}
  </ul></li>
  <li><a href="/resultados">Resultados</a></li>
  <li><a href="/contacto">Contacto</a></li>
</ul></nav>`

const footer = `<footer>
  <p><strong>${DOCTOR_NAME}</strong> · Cirugía Plástica, Estética y Reconstructiva</p>
  <address>Clínica Select, Av. Roosevelt, Punta del Este, Maldonado 20100, Uruguay ·
  Tel/WhatsApp: <a href="tel:+59892566656">+598 92 566 656</a> ·
  <a href="mailto:info@guzmanripoll.com">info@guzmanripoll.com</a></address>
  <p><a href="/politica-privacidad">Política de privacidad</a> · <a href="/procesamiento-datos">Procesamiento de datos</a></p>
</footer>`

const BIO = [
  "El Dr. Guzmán Ripoll es un Cirujano Plástico, Reconstructivo y Estético certificado con títulos de Doctor en Medicina (CLAEH, Uruguay), Especialista en Cirugía Plástica, Reparadora y Estética (Universidad de la República, Uruguay) y Maestría en Cirugía Mamaria, Reconstructiva y Estética (Universitat de Barcelona).",
  "En la actualidad se dedica principalmente a realizar cirugías mamarias estéticas y reconstructivas, así como también cirugías de remodelamiento corporal, siendo el único especialista en Uruguay en utilizar la lipoaspiración VASER.",
  "Integra la Sociedad de Cirugía Plástica, Reparadora y Estética del Uruguay (SCPREU) y la Asociación Latinoamericana de Microcirugía (ALAM).",
]

const procCard = (p) => `<article>
    <h2><a href="${procedimientoPath(p.number)}">${esc(p.title)}</a></h2>
    <p>${esc(p.subtitle)}</p>
    <p>${esc(p.catchPhrase)}</p>
  </article>`

function procedimientoBody(p) {
  const specs = p.specs
    ? `<h2>Datos del procedimiento</h2><ul>
    <li>Tipo: ${esc(p.specs.tipo)}</li><li>Lugar: ${esc(p.specs.lugar)}</li>
    <li>Anestesia: ${esc(p.specs.anestesia)}</li><li>Duración: ${esc(p.specs.duracion)}</li></ul>`
    : ""
  const subs = p.subprocedimientos?.length
    ? `<h2>También incluye</h2>${p.subprocedimientos.map((s) => `<h3>${esc(s.name)}</h3><p>${esc(s.description)}</p>`).join("")}`
    : ""
  const comp = p.comparativa
    ? `<h2>Tecnologías</h2>${Object.values(p.comparativa)
        .map((c) => `<h3>${esc(c.title)}</h3><p>${esc(c.description)}</p><ul>${c.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`)
        .join("")}`
    : ""
  return `<nav aria-label="Ruta"><a href="/">Inicio</a> › <a href="/procedimientos">Procedimientos</a> › ${esc(p.title)}</nav>
  <h1>${esc(p.title)} en Punta del Este, Uruguay</h1>
  <p>${esc(p.subtitle)} · ${esc(p.category)}</p>
  <p>${esc(p.catchPhrase)}</p>
  <p>${esc(p.description)}</p>
  ${p.filosofia ? `<p>${esc(p.filosofia)}</p>` : ""}
  ${p.objetivo ? `<h2>Objetivo</h2><p>${esc(p.objetivo)}</p>` : ""}
  ${specs}
  ${p.tecnica ? `<h2>Técnica</h2><p>${esc(p.tecnica)}</p>` : ""}
  ${p.recuperacion ? `<h2>Recuperación</h2><p>${esc(p.recuperacion)}</p>` : ""}
  ${subs}
  ${comp}
  <h2>Otros procedimientos</h2><ul>${procs
    .filter((o) => o.number !== p.number)
    .map((o) => `<li><a href="${procedimientoPath(o.number)}">${esc(o.title)}</a></li>`)
    .join("")}</ul>
  <p><a href="/contacto">Agendá tu consulta</a> con el ${DOCTOR_NAME} en Punta del Este.</p>`
}

const BODIES = {
  "/": `<h1>Cirugía Plástica, Estética y Reconstructiva en Punta del Este, Uruguay</h1>
  <p>Conexión humana, innovación tecnológica. Sitio oficial del ${DOCTOR_NAME}, cirujano plástico en Punta del Este y Maldonado.</p>
  ${BIO.map((b) => `<p>${esc(b)}</p>`).join("\n  ")}
  <section><h2>Procedimientos</h2>${procs.map(procCard).join("")}
    <p>Mommy makeover: abdomen y mamas en un solo proceso (<a href="${procedimientoPath("04")}">abdominoplastia</a> y <a href="${procedimientoPath("01")}">cirugía mamaria</a>).</p>
  </section>
  <section><h2>Preguntas frecuentes</h2>${faqItems.map((f) => `<h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p>`).join("")}</section>
  <p><a href="/contacto">Agendá tu consulta</a> · <a href="/resultados">Ver resultados antes y después</a></p>`,
  "/procedimientos": `<h1>Excelencia quirúrgica con enfoque humano</h1>
  <p>Procedimientos de cirugía plástica, estética y reconstructiva y tratamientos no invasivos del ${DOCTOR_NAME} en Punta del Este, Uruguay.</p>
  ${procs.map(procCard).join("\n  ")}`,
  "/clinica": `<h1>Somos la clínica de cirugía mamaria que rehumaniza la medicina estética.</h1>
  <p>Un espacio en Punta del Este diseñado para combinar calidez humana con tecnología de punta.</p>
  <h2>${DOCTOR_NAME}</h2>${BIO.map((b) => `<p>${esc(b)}</p>`).join("")}`,
  "/resultados": `<h1>Casos seleccionados: antes y después</h1>
  <p>Resultados de cirugía mamaria, contorno corporal y tratamientos no invasivos realizados por el ${DOCTOR_NAME} en Punta del Este, Uruguay.</p>
  <ul>${procs.map((p) => `<li><a href="${procedimientoPath(p.number)}">${esc(p.title)}</a></li>`).join("")}</ul>`,
  "/contacto": `<h1>Consultas: cirugía estética especializada y resultados naturales</h1>
  <p>Coordiná tu consulta con el ${DOCTOR_NAME} en Clínica Select, Av. Roosevelt, Punta del Este (Maldonado 20100, Uruguay).</p>
  <p>Teléfono y WhatsApp: <a href="https://wa.me/59892566656">+598 92 566 656</a> · Email: <a href="mailto:info@guzmanripoll.com">info@guzmanripoll.com</a></p>`,
  "/politica-privacidad": `<h1>Política de Privacidad</h1>`,
  "/procesamiento-datos": `<h1>Procesamiento de Datos</h1>`,
}

const SR_ONLY = "position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0"
const bodyFor = (inner) =>
  `<div id="root"><div data-prerender style="${SR_ONLY}">${nav}<main>${inner}</main>${footer}</div></div>`

// ─── Escritura ───────────────────────────────────────────
function render(seo, inner) {
  let html = template
  const head = headFor(seo)
  if (/<!--seo:start[\s\S]*?<!--seo:end-->/.test(html)) {
    html = html.replace(/<!--seo:start[\s\S]*?<!--seo:end-->/, head)
  } else {
    html = html.replace(/<title>[\s\S]*?<\/title>/, "").replace(/<meta name="description"[^>]*>/, "")
    html = html.replace("</head>", `    ${head}\n  </head>`)
  }
  return html.replace('<div id="root"></div>', bodyFor(inner))
}

function write(path, html) {
  const file = path === "/" ? join(DIST, "index.html") : join(DIST, `${path.slice(1)}.html`)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, html)
  return file
}

const pages = []
for (const [path, seo] of Object.entries(PAGE_SEO)) {
  write(path, render(seo, BODIES[path] || ""))
  pages.push(path)
}
for (const p of procs) {
  const seo = procedimientoSEO(p.number)
  write(seo.path, render(seo, procedimientoBody(p)))
  pages.push(seo.path)
}
write("/404", render(NOT_FOUND_SEO, `<h1>Página no encontrada</h1><p>La página que buscás no existe o fue movida.</p>`))

// sitemap.xml (las páginas legales quedan fuera: no aportan búsquedas y diluyen el crawl)
const today = new Date().toISOString().slice(0, 10)
const priority = (p) => (p === "/" ? "1.0" : p.startsWith("/procedimientos/") ? "0.9" : p === "/procedimientos" ? "0.9" : "0.7")
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .filter((p) => !["/politica-privacidad", "/procesamiento-datos"].includes(p))
  .map((p) => `  <url><loc>${canonical(p)}</loc><lastmod>${today}</lastmod><priority>${priority(p)}</priority></url>`)
  .join("\n")}
</urlset>
`
writeFileSync(join(DIST, "sitemap.xml"), sitemap)

console.log(`prerender: ${pages.length} páginas + 404 + sitemap.xml`)
