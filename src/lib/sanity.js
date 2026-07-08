// Cliente de Sanity + helpers para leer procedimientos desde el CMS.
// Filosofía: Sanity manda, pero si un campo está vacío o Sanity no responde,
// se usa el texto/imagen que ya vive en el sitio (fallback). Nunca se rompe ni se ve vacío.
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanity = createClient({
  projectId: 'nzg7h3zh',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // caché rápido; los cambios publicados aparecen en segundos
})

const builder = imageUrlBuilder(sanity)
export const urlFor = (source) => builder.image(source)

// ¿Tiene valor "de verdad"? (string vacío / array vacío / objeto vacío cuentan como sin valor)
const has = (v) => {
  if (v == null) return false
  if (typeof v === 'string') return v.trim().length > 0
  if (Array.isArray(v)) return v.length > 0
  if (typeof v === 'object') return Object.keys(v).length > 0
  return true
}
// Elegí el valor de Sanity si existe; si no, el del sitio.
const pick = (a, b) => (has(a) ? a : b)

// Convierte un documento de Sanity a la forma que ya usa el sitio,
// combinándolo campo por campo con el objeto hardcodeado (fallback).
export function mergeProcedimiento(doc, fallback = {}) {
  if (!doc) return fallback
  return {
    ...fallback,
    number: pick(doc.number, fallback.number),
    title: pick(doc.title, fallback.title),
    subtitle: pick(doc.subtitle, fallback.subtitle),
    category: pick(doc.category, fallback.category),
    imageSrc: doc.image ? urlFor(doc.image).width(1600).url() : fallback.imageSrc,
    secondaryImageSrc: doc.secondaryImage
      ? urlFor(doc.secondaryImage).width(1600).url()
      : fallback.secondaryImageSrc,
    catchPhrase: pick(doc.catchPhrase, fallback.catchPhrase),
    description: pick(doc.description, fallback.description),
    filosofia: pick(doc.filosofia, fallback.filosofia),
    objetivo: pick(doc.objetivo, fallback.objetivo),
    specs: pick(doc.specs, fallback.specs),
    tecnica: pick(doc.tecnica, fallback.tecnica),
    recuperacion: pick(doc.recuperacion, fallback.recuperacion),
    subprocedimientos: pick(doc.subprocedimientos, fallback.subprocedimientos),
    comparativa: pick(doc.comparativa, fallback.comparativa),
  }
}

const PROC_FIELDS = `{
  number, title, subtitle, category, image, secondaryImage,
  catchPhrase, description, filosofia, objetivo, specs, tecnica,
  recuperacion, subprocedimientos, comparativa, orden
}`

// Trae UN procedimiento por su número ("01", "02", ...). Devuelve null si no hay o si falla.
export async function fetchProcedimiento(number) {
  try {
    return await sanity.fetch(
      `*[_type == "procedimiento" && number == $number][0] ${PROC_FIELDS}`,
      { number }
    )
  } catch {
    return null
  }
}

// Trae TODOS los procedimientos ordenados. Devuelve [] si falla.
export async function fetchProcedimientos() {
  try {
    return await sanity.fetch(
      `*[_type == "procedimiento"] | order(orden asc) ${PROC_FIELDS}`
    )
  } catch {
    return []
  }
}
