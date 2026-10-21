// Contenido base de cada procedimiento. Lo usan la página de detalle (como fallback de Sanity)
// y el prerender de SEO (scripts/prerender.mjs), así que debe ser JS plano, sin JSX ni alias.

export const procedimientosData = {
  "01": {
    number: "01",
    title: "Cirugía Mamaria",
    subtitle: "Aumento, Reducción & Reconstrucción",
    category: "Especialización Principal",
    imageSrc: "/images/mama.webp",
    secondaryImageSrc: "/images/implantes2.webp",
    catchPhrase: "Procedimientos seguros y personalizados para lograr resultados naturales y armoniosos.",
    description: "La cirugía mamaria es una decisión médica importante. Por eso, requiere información clara y una evaluación responsable.",
    filosofia: "Cada paciente es distinta. La planificación y el criterio médico son parte fundamental del proceso. La información, el acompañamiento y el seguimiento forman parte del tratamiento.",
    objetivo: "Aumento de tamaño mamario, corrección de deformidades, asimetrías, malformaciones congénitas.",
    specs: {
      tipo: "Ambulatoria",
      lugar: "Block quirúrgico",
      anestesia: "General",
      duracion: "90 minutos"
    },
    tecnica: "Es variable según la paciente y las expectativas de la misma. Existen diferentes vías de abordaje (submamario, periareolar), y diferentes planos donde se coloca el implante (retroglandular, submuscular, subfascial, dual plane). Puede asociarse a levantamiento o pexia mamaria de ser necesario. Contamos con tecnología Crisalix para previsualización 3D, permitiéndote ver los posibles resultados antes de la cirugía.",
    recuperacion: "Reposo laboral por 7 días con retorno progresivo a las actividades, pudiendo realizar deporte al mes de la cirugía.",
    // Mención del protocolo tal cual lo comunica la clínica (sin especificaciones médicas)
    protocolo: {
      label: "Protocolo de rápida recuperación",
      hashtag: "#earlybreastrecoveryexperience",
    },
    subprocedimientos: [
      { name: "Pexia Mamaria", description: "Levantamiento del tejido mamario descendido." },
      { name: "Reducción Mamaria", description: "Disminución del volumen excesivo para aliviar molestias." },
      { name: "Ginecomastia", description: "Corrección del desarrollo mamario en hombres." },
      { name: "Reconstrucción", description: "Restauración de volumen y forma post-mastectomía. Previsualización Crisalix disponible." }
    ]
  },
  "02": {
    number: "02",
    title: "Lipoescultura VASER",
    subtitle: "BodyTite & Morpheus8",
    category: "Contorno Corporal",
    imageSrc: "/images/lipo.webp",
    catchPhrase: "Tecnología de vanguardia para remodelación corporal avanzada con resultados inmediatos.",
    description: "Tecnología avanzada de remodelación corporal que combina BodyTite (radiofrequencia asistida) con Morpheus8 para contornear y definir tu figura ideal con mínima invasión y máximos resultados.",
    objetivo: "Remodelación corporal avanzada, eliminación de grasa localizada y tensado de piel simultáneo.",
    specs: {
      tipo: "Ambulatoria",
      lugar: "Block quirúrgico",
      anestesia: "Local / General",
      duracion: "2-3 horas"
    },
    tecnica: "BodyTite utiliza radiofrequencia asistida para licuar la grasa mientras tensa la piel simultáneamente. Morpheus8 combina microagujas con radiofrequencia.",
    recuperacion: "Reposo laboral de 7-10 días. Resultados visibles inmediatos que mejoran por 6 meses.",
    subprocedimientos: [
      { name: "BodyTite RFAL", description: "Liposucción asistida por radiofrecuencia para tensado." },
      { name: "Morpheus8", description: "Tratamiento fraccionado profundo para remodelación dérmica." }
    ]
  },
  "04": {
    number: "04",
    title: "Abdominoplastia",
    subtitle: "Remodelación Completa",
    category: "Contorno Corporal",
    imageSrc: "/images/abdomino.webp",
    catchPhrase: "Recupera tu silueta ideal con procedimientos avanzados de tensado.",
    description: "La abdominoplastia es un procedimiento integral que elimina el exceso de piel y grasa abdominal, repara la musculatura y redefine el contorno.",
    objetivo: "Eliminación de exceso de piel, corrección de diástasis, mejora del contorno.",
    specs: {
      tipo: "Ambulatoria",
      lugar: "Block quirúrgico",
      anestesia: "General",
      duracion: "3-4 horas"
    },
    tecnica: "Incisión horizontal baja, eliminación de exceso de piel y grasa, reparación muscular.",
    recuperacion: "Reposo relativo por 2 semanas. Uso de faja compresiva por 6-8 semanas."
  },
  "06": {
    number: "06",
    title: "Tratamientos No Invasivos",
    subtitle: "INDIBA, DEKA DuoGlide & Morpheus8",
    category: "Contorno Corporal & Facial",
    imageSrc: "/images/indibaa.webp",
    imagePosition: "center 40%", // protagonismo del cabezal INDIBA sobre la piel
    secondaryImageSrc: "/images/confianza.webp",
    catchPhrase: "Una piel más luminosa, firme y revitalizada, y un cuerpo más tonificado — sin agujas invasivas, sin cirugía y con mínimo tiempo de recuperación.",
    description: "INDIBA es una radiofrecuencia de 448 kHz que estimula la regeneración celular desde el interior de la piel: más luminosidad, firmeza e hidratación en el rostro, y tonificación del contorno corporal, mejorando flacidez y celulitis. Complementamos con DEKA DuoGlide para la corrección más intensa de la superficie de la piel, y con Morpheus8 para el remodelado profundo del colágeno cuando la flacidez requiere mayor tensado.",
    specs: {
      tipo: "Ambulatorio",
      lugar: "Consultorio",
      anestesia: "Tópica / No requiere",
      duracion: "30–60 minutos"
    },
    comparativa: {
      indiba: {
        title: "INDIBA → Regenerar, reafirmar y tonificar",
        description: "Radiofrecuencia de 448 kHz que estimula la regeneración celular desde el interior de la piel, sin agujas ni cirugía.",
        items: ["Más luminosidad, firmeza e hidratación", "Estimula colágeno y elastina", "Reafirma rostro y cuerpo", "Mejora flacidez y celulitis", "Aspecto más descansado y saludable", "Sin downtime"]
      },
      duoglide: {
        title: "DUOGlide → Renovar y corregir",
        description: "Combina dos tecnologías en un solo procedimiento: reducción de medidas, mejora de la firmeza y estimulación del colágeno de forma rápida y eficaz.",
        items: ["Resultados visibles y duraderos", "No invasivo, sin tiempo de recuperación", "Ideal para modelar el cuerpo y mejorar la textura de la piel", "Manchas, poros y cicatrices", "Arrugas y resurfacing"]
      },
      morpheus: {
        title: "Morpheus8 → Remodelar y tensar en profundidad",
        description: "Microagujas de radiofrecuencia fraccionada que remodelan el colágeno en las capas profundas de la piel, indicado cuando la flacidez requiere mayor tensado que el que ofrece la radiofrecuencia de superficie.",
        items: ["Tensa y remodela la piel en profundidad", "Mejora la flacidez moderada de rostro y cuerpo", "Reduce cicatrices y estrías", "Uniforma la textura de la piel", "Resultados progresivos que continúan mejorando con las semanas", "Downtime mínimo (1 a 3 días de enrojecimiento)"]
      }
    },
    tecnica: "La radiofrecuencia INDIBA (sistema Proionic de 448 kHz) trabaja desde el interior del tejido: activa el metabolismo celular y la microcirculación para reafirmar la piel y remodelar el contorno corporal de forma progresiva y natural. En rostro se complementa con el láser DEKA DuoGlide para corregir la superficie de la piel, y con Morpheus8 —microagujas que liberan radiofrecuencia fraccionada en profundidad— cuando el objetivo es un mayor tensado y remodelado del colágeno. El protocolo se adapta a cada paciente combinando las tecnologías según su necesidad.",
    recuperacion: "INDIBA y DuoGlide no requieren downtime, aunque con DuoGlide puede haber un enrojecimiento leve y transitorio según la intensidad del resurfacing. Con Morpheus8 el downtime es mínimo: entre 1 y 3 días de enrojecimiento o sensibilidad leve en la zona tratada."
  }
}

// URLs con palabra clave. El número sigue siendo la clave interna (y la de Sanity).
export const PROCEDIMIENTO_SLUGS = {
  "01": "cirugia-mamaria",
  "02": "lipoescultura-vaser",
  "04": "abdominoplastia",
  "06": "tratamientos-no-invasivos",
}

const NUMBER_BY_SLUG = Object.fromEntries(
  Object.entries(PROCEDIMIENTO_SLUGS).map(([number, slug]) => [slug, number])
)

export const procedimientoPath = (number) =>
  PROCEDIMIENTO_SLUGS[number] ? `/procedimientos/${PROCEDIMIENTO_SLUGS[number]}` : "/procedimientos"

// Acepta el slug nuevo o el número viejo ("01") y devuelve el número.
export const numberFromParam = (param) =>
  NUMBER_BY_SLUG[param] || (procedimientosData[param] ? param : null)
