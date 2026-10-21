// Contenido base de cada procedimiento. Lo usan la página de detalle (como fallback de Sanity)
// y el prerender de SEO (scripts/prerender.mjs), así que debe ser JS plano, sin JSX ni alias.

const todosLosProcedimientos = {
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
      { name: "Reconstrucción", description: "Restauración de volumen y forma post-mastectomía." }
    ],
    relacionadosTitulo: "Procedimientos de cirugía mamaria",
    relacionados: ["01a", "01b", "01c", "01d", "01e"],
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
    recuperacion: "Reposo relativo por 2 semanas. Uso de faja compresiva por 6-8 semanas.",
    relacionados: ["04a", "02"],
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
  },

  // ─── Páginas por cirugía (SEO) ─────────────────────────
  // `parent` = procedimiento madre (pills, pasos del proceso, número que se muestra).
  // BORRADOR: los datos marcados "A CONFIRMAR" tienen que validarse con el Dr. Ripoll antes de publicar.
  "01a": {
    number: "01a",
    borrador: true,
    parent: "01",
    title: "Aumento Mamario",
    subtitle: "Implantes de gel cohesivo",
    category: "Cirugía Mamaria",
    imageSrc: "/images/aumento.webp",
    secondaryImageSrc: "/images/implantes2.webp",
    catchPhrase: "Más volumen y mejor proporción, con un plan diseñado a partir de tu anatomía y tus expectativas.",
    description: "El aumento mamario con implantes permite aumentar el volumen de las mamas, mejorar su forma y proyección y corregir asimetrías. Es una cirugía ambulatoria que se planifica a medida: el tipo, el tamaño y el perfil del implante, la vía de abordaje y el plano de colocación se definen en consulta según tu anatomía, la calidad de tu piel y el resultado que buscás.",
    objetivo: "Aumento de tamaño mamario, mejora de la forma y la proyección, corrección de asimetrías y de malformaciones congénitas.",
    specs: {
      tipo: "Ambulatoria",
      lugar: "Block quirúrgico",
      anestesia: "General",
      duracion: "90 minutos"
    },
    tecnica: "Es variable según la paciente y sus expectativas. Existen diferentes vías de abordaje (submamaria, periareolar) y diferentes planos donde se coloca el implante (retroglandular, submuscular, subfascial, dual plane). Puede asociarse a un levantamiento o pexia mamaria si es necesario. Con tecnología Crisalix podés ver una previsualización 3D de los posibles resultados antes de la cirugía.",
    candidatos: "Mujeres mayores de edad, con buena salud general, que desean más volumen, que perdieron volumen después del embarazo, la lactancia o un descenso de peso, o que presentan asimetrías entre ambas mamas. Si además hay caída de la mama, puede indicarse asociar una mastopexia. Se recomienda esperar al menos 6 meses después de terminar la lactancia.", // A CONFIRMAR: 6 meses
    recuperacion: "Reposo laboral por 7 días con retorno progresivo a las actividades, pudiendo realizar deporte al mes de la cirugía. Durante las primeras semanas se indica el uso de un sostén posquirúrgico.", // A CONFIRMAR: sostén
    protocolo: {
      label: "Protocolo de rápida recuperación",
      hashtag: "#earlybreastrecoveryexperience",
    },
    riesgos: "Como toda cirugía, tiene riesgos que se explican en detalle en la consulta: hematoma, infección, cambios en la sensibilidad del pezón, asimetrías o contractura capsular, entre otros. Operar en block quirúrgico habilitado, con implantes de calidad y un seguimiento postoperatorio cercano, permite minimizarlos. Los implantes no son de por vida: se recomiendan controles periódicos.",
    faq: [
      { question: "¿Cuánto cuesta un aumento mamario en Uruguay?", answer: "El costo depende del tipo de implante, de si se asocia otro procedimiento (como una pexia) y de los gastos de block quirúrgico y anestesia. Por eso se define después de la consulta de evaluación, donde recibís un presupuesto detallado." },
      { question: "¿Cómo elijo el tamaño de los implantes?", answer: "Se define en consulta según tus medidas, la calidad de tu piel y el resultado que buscás. Con la simulación 3D Crisalix podés ver cómo quedarían distintos volúmenes y perfiles antes de decidir." },
      { question: "¿Cuánto dura la recuperación?", answer: "El reposo laboral es de 7 días, con retorno progresivo a las actividades. El deporte se puede retomar al mes de la cirugía." },
      { question: "¿Se puede amamantar con implantes?", answer: "En la mayoría de los casos la lactancia es posible, ya que el implante se coloca por detrás de la glándula o del músculo. Se evalúa en cada caso según la técnica elegida." }, // A CONFIRMAR
      { question: "¿Los implantes duran para siempre?", answer: "No son de por vida. Con controles periódicos pueden durar muchos años; se cambian si aparece alguna complicación o si la paciente desea modificar el resultado." },
      { question: "¿Qué es el protocolo de rápida recuperación?", answer: "Es el protocolo #earlybreastrecoveryexperience, pensado para que retomes tus actividades lo antes posible y con el menor malestar, con el acompañamiento del equipo en cada etapa." }, // A CONFIRMAR: descripción del protocolo
    ],
    relacionados: ["01b", "01c", "04a"],
  },
  "01b": {
    number: "01b",
    borrador: true,
    parent: "01",
    title: "Mastopexia",
    subtitle: "Levantamiento de mamas",
    category: "Cirugía Mamaria",
    imageSrc: "/images/mamaria.webp",
    secondaryImageSrc: "/images/clinicasi.webp",
    catchPhrase: "Recuperá la posición, la forma y la firmeza de tus mamas.",
    description: "La mastopexia o pexia mamaria corrige la caída de las mamas, muy frecuente después del embarazo, la lactancia, un descenso importante de peso o con el paso del tiempo. Se eleva y remodela la glándula, se reposiciona la areola y se retira el exceso de piel para lograr una mama más firme y armónica. Por sí sola no aumenta el volumen, pero puede combinarse con implantes (mastopexia de aumento) cuando también se busca más volumen.",
    objetivo: "Elevar y remodelar la mama, reposicionar la areola y el pezón, y corregir el exceso de piel.",
    specs: { // A CONFIRMAR
      tipo: "Ambulatoria",
      lugar: "Block quirúrgico",
      anestesia: "General",
      duracion: "2-3 horas"
    },
    tecnica: "La técnica depende del grado de caída y de la calidad de la piel. En caídas leves puede alcanzar una cicatriz alrededor de la areola (periareolar); en caídas moderadas se suma una cicatriz vertical, y en las más marcadas se utiliza la cicatriz en forma de T invertida. Siempre se busca la cicatriz más corta posible para el resultado que necesitás. Cuando falta volumen, se puede colocar un implante en la misma cirugía.",
    candidatos: "Mujeres con mamas caídas o vacías después del embarazo, la lactancia o una pérdida de peso, con la areola a la altura o por debajo del surco submamario. Es ideal haber alcanzado un peso estable y no planificar embarazos a corto plazo, ya que pueden modificar el resultado.",
    recuperacion: "En general, reposo laboral de 7 a 10 días con retorno progresivo a las actividades. Se indica sostén posquirúrgico durante las primeras semanas y evitar esfuerzos y cargar peso durante aproximadamente un mes.", // A CONFIRMAR
    riesgos: "Las cicatrices son permanentes, aunque se aclaran y afinan con los meses. Como en toda cirugía pueden presentarse hematoma, infección, retardo en la cicatrización (más frecuente en fumadoras), cambios en la sensibilidad o asimetrías, que se explican y previenen en la consulta.",
    faq: [
      { question: "¿La mastopexia aumenta el tamaño de las mamas?", answer: "No, la mastopexia eleva y remodela la mama sin agregar volumen. Si también buscás más volumen, se puede combinar con implantes en la misma cirugía (mastopexia de aumento)." },
      { question: "¿Qué cicatriz deja?", answer: "Depende del grado de caída: puede ser solo alrededor de la areola, alrededor de la areola y vertical, o en forma de T invertida. Siempre se elige la cicatriz más corta posible para tu caso." },
      { question: "¿Puedo amamantar después de una mastopexia?", answer: "En muchos casos sí, porque la glándula se conserva, aunque no puede garantizarse. Por eso se recomienda operarse después de haber completado los embarazos." },
      { question: "¿Cuánto dura el resultado?", answer: "Es un resultado duradero, pero nuevos embarazos, cambios de peso y el paso del tiempo pueden hacer que la mama vuelva a descender con los años." },
      { question: "¿Se puede hacer junto con una abdominoplastia?", answer: "Sí. La combinación de cirugía mamaria y abdominoplastia después de la maternidad se conoce como mommy makeover, y se evalúa en consulta si conviene hacerla en una o en dos etapas." },
    ],
    relacionados: ["01a", "01c", "04a"],
  },
  "01c": {
    number: "01c",
    borrador: true,
    parent: "01",
    title: "Reducción Mamaria",
    subtitle: "Mamoplastia de reducción",
    category: "Cirugía Mamaria",
    imageSrc: "/images/mama.webp",
    secondaryImageSrc: "/images/clinicasi.webp",
    catchPhrase: "Menos peso, más bienestar: mamas proporcionadas a tu cuerpo.",
    description: "La reducción mamaria disminuye el volumen y el peso de mamas muy grandes (hipertrofia mamaria), retirando tejido glandular, grasa y piel, y elevando la mama a una posición más armónica. Más allá de lo estético, suele indicarse para aliviar molestias físicas como dolor de espalda, cuello y hombros, marcas de los breteles, irritación debajo de la mama o dificultad para hacer deporte.",
    objetivo: "Reducir el volumen y el peso mamario, aliviar molestias físicas y lograr una mama más proporcionada y elevada.",
    specs: { // A CONFIRMAR
      tipo: "Ambulatoria",
      lugar: "Block quirúrgico",
      anestesia: "General",
      duracion: "2-3 horas"
    },
    tecnica: "Se planifica según el volumen a reducir y el grado de caída. Las cicatrices suelen ubicarse alrededor de la areola y en forma vertical, o en forma de T invertida en las reducciones mayores. La areola se reposiciona (y se reduce si es necesario) y se remodela la glándula para que la mama quede más alta, firme y proporcionada.",
    candidatos: "Mujeres con mamas desproporcionadamente grandes para su contextura, que les generan molestias físicas o limitaciones en su vida diaria, con el desarrollo mamario completo y buena salud general. Antes de la cirugía puede solicitarse una mamografía o ecografía mamaria.", // A CONFIRMAR: estudios previos
    recuperacion: "En general, reposo laboral de 7 a 14 días con retorno progresivo, sostén posquirúrgico y evitar esfuerzos durante las primeras semanas. Muchas pacientes notan alivio de las molestias de espalda y cuello desde los primeros días.", // A CONFIRMAR
    riesgos: "Las cicatrices son permanentes y se van aclarando con el tiempo. La lactancia posterior no puede garantizarse y fumar aumenta el riesgo de problemas de cicatrización. Otros riesgos, como hematoma, infección, cambios de sensibilidad o asimetrías, se explican y previenen en la consulta.",
    faq: [
      { question: "¿Cuánto se puede reducir?", answer: "Depende de tu anatomía y de lo que buscás. En la consulta se define un volumen que alivie las molestias y quede en proporción con tu cuerpo." },
      { question: "¿La reducción mamaria deja cicatriz?", answer: "Sí. Las cicatrices se ubican alrededor de la areola y en el sector inferior de la mama, y se van aclarando y afinando con los meses." },
      { question: "¿Se puede amamantar después de una reducción?", answer: "Algunas mujeres pueden hacerlo, pero no es predecible ni puede garantizarse. Es un punto importante a conversar en la consulta si planificás embarazos." },
      { question: "¿A qué edad se puede hacer?", answer: "Cuando la mama ya completó su desarrollo. En pacientes jóvenes se evalúa cada caso según las molestias y la estabilidad del volumen mamario." },
      { question: "¿El resultado es definitivo?", answer: "Es un resultado duradero. Cambios importantes de peso, embarazos o el paso del tiempo pueden modificar el volumen y la forma de las mamas." },
    ],
    relacionados: ["01b", "01a", "01e"],
  },
  "01d": {
    number: "01d",
    borrador: true,
    parent: "01",
    title: "Reconstrucción Mamaria",
    subtitle: "Después de la mastectomía",
    category: "Cirugía Mamaria Reconstructiva",
    imageSrc: "/images/implantes2.webp",
    secondaryImageSrc: "/images/clinicasi.webp",
    catchPhrase: "Recuperar la forma de la mama también es parte del tratamiento.",
    description: "La reconstrucción mamaria busca restaurar el volumen, la forma y la simetría de la mama después de una mastectomía o de una cirugía conservadora por cáncer de mama. Se planifica junto con el equipo oncológico, respetando los tiempos de cada tratamiento, y se adapta a cada paciente: no hay una única técnica, sino un plan a medida de tu cuerpo y de tu historia.",
    objetivo: "Restaurar el volumen, la forma y la simetría mamaria luego de una mastectomía o cirugía oncológica, mejorando la calidad de vida.",
    specs: { // A CONFIRMAR
      tipo: "Según la técnica",
      lugar: "Block quirúrgico",
      anestesia: "General",
      duracion: "Variable"
    },
    tecnica: "Puede ser inmediata (en la misma cirugía de la mastectomía) o diferida (meses o años después). Las opciones incluyen la reconstrucción con expansor y luego implante definitivo, el implante directo o la reconstrucción con tejido propio (colgajos), además de la transferencia de grasa para afinar detalles. En muchos casos se completa con la reconstrucción de la areola y el pezón y con una cirugía de simetrización de la otra mama. El Dr. Ripoll cuenta con una Maestría en Cirugía Mamaria, Reconstructiva y Estética (Universitat de Barcelona) e integra la Asociación Latinoamericana de Microcirugía (ALAM).",
    candidatos: "Mujeres que tuvieron o van a tener una mastectomía, o que presentan secuelas de una cirugía conservadora de la mama. El momento y la técnica dependen del tratamiento oncológico (por ejemplo, si se indica radioterapia), del estado de los tejidos y de las preferencias de cada paciente.",
    recuperacion: "Varía según la técnica: la reconstrucción con implantes suele tener una recuperación más corta, mientras que la que utiliza tejido propio requiere más tiempo. Cada etapa se acompaña con controles cercanos.",
    riesgos: "Como en toda cirugía pueden presentarse complicaciones (infección, problemas de cicatrización o contractura capsular en el caso de implantes), y a veces se necesitan cirugías complementarias para lograr el mejor resultado. La radioterapia puede influir en la elección de la técnica y en el resultado final.",
    faq: [
      { question: "¿Es mejor la reconstrucción inmediata o diferida?", answer: "Depende de cada caso. La inmediata evita atravesar la etapa sin mama y puede reducir el número de cirugías; la diferida permite más previsibilidad cuando se indica radioterapia. Se decide junto con el equipo oncológico." },
      { question: "¿Cuántas cirugías lleva una reconstrucción?", answer: "Generalmente se realiza en más de una etapa: la reconstrucción del volumen, ajustes de forma y simetría, y finalmente la reconstrucción de la areola y el pezón." },
      { question: "¿Se puede reconstruir la areola y el pezón?", answer: "Sí. Suele ser la etapa final de la reconstrucción, cuando la nueva mama ya tomó su forma definitiva." },
      { question: "¿Se puede reconstruir si la mastectomía fue hace años?", answer: "Sí. La reconstrucción diferida puede hacerse meses o incluso años después de la mastectomía." },
      { question: "¿Se puede hacer después de la radioterapia?", answer: "Sí, aunque la radioterapia condiciona la elección de la técnica. En esos casos suele preferirse la reconstrucción con tejido propio o combinarla con transferencia de grasa." }, // A CONFIRMAR
    ],
    relacionados: ["01a", "01b", "01c"],
  },
  "01e": {
    number: "01e",
    borrador: true,
    parent: "01",
    title: "Ginecomastia",
    subtitle: "Corrección del tórax masculino",
    category: "Cirugía Mamaria",
    imageSrc: "/images/clinicasi.webp",
    imagePosition: "center 30%",
    catchPhrase: "Un tórax más plano y definido, para sentirte cómodo con tu cuerpo.",
    description: "La ginecomastia es el desarrollo excesivo de la mama en el hombre. Puede deberse a tejido glandular, a grasa o a una combinación de ambos, y es frecuente que genere incomodidad al usar ropa ajustada, en la playa o al hacer deporte. La cirugía elimina ese exceso y redefine el contorno del pecho para lograr un tórax más plano y masculino.",
    objetivo: "Eliminar el exceso de tejido mamario y graso en el hombre y lograr un contorno torácico plano y definido.",
    specs: { // A CONFIRMAR
      tipo: "Ambulatoria",
      lugar: "Block quirúrgico",
      anestesia: "General",
      duracion: "1-2 horas"
    },
    tecnica: "Cuando predomina la grasa, se realiza una liposucción; cuando hay tejido glandular, se reseca a través de una pequeña incisión en el borde inferior de la areola, poco visible. En la mayoría de los casos se combinan ambas técnicas para lograr un resultado uniforme. Si hay exceso de piel, puede ser necesario retirarlo.",
    candidatos: "Hombres con ginecomastia estable, que no mejora con el tiempo, el ejercicio o el descenso de peso, y con buena salud general. En adolescentes suele esperarse, porque muchas veces se resuelve sola. Antes de operar se descartan causas hormonales o por medicamentos.",
    recuperacion: "En general, retorno a trabajos de oficina en alrededor de una semana, uso de chaleco compresivo durante varias semanas y evitar el ejercicio intenso durante las primeras 2 a 3 semanas. La inflamación baja progresivamente y el resultado final se aprecia a los pocos meses.", // A CONFIRMAR
    riesgos: "Pueden presentarse hematoma, seroma, irregularidades del contorno, cambios de sensibilidad o asimetrías, que se explican y previenen en la consulta. Para mantener el resultado es importante sostener un peso estable y evitar sustancias que puedan provocar nuevamente la ginecomastia, como los anabólicos.",
    faq: [
      { question: "¿La ginecomastia se puede corregir con ejercicio?", answer: "Si el componente es glandular, no: la glándula no se elimina con dieta ni ejercicio. Cuando el exceso es solo grasa, bajar de peso puede mejorar, pero muchas veces igual hace falta la cirugía." },
      { question: "¿Queda cicatriz?", answer: "La incisión es pequeña y se ubica en el borde inferior de la areola, donde el cambio de color la disimula. Si se hace liposucción, las incisiones son de pocos milímetros." },
      { question: "¿Puede volver a aparecer?", answer: "Es poco frecuente si se retira el tejido glandular, pero pueden influir el aumento de peso, algunos medicamentos o el uso de anabólicos." },
      { question: "¿Cuándo puedo volver a entrenar?", answer: "La actividad se retoma de forma progresiva: en general se evita el ejercicio intenso durante las primeras 2 a 3 semanas, y el entrenamiento de pecho se incorpora según la indicación del cirujano." },
      { question: "¿Hay que hacer estudios antes?", answer: "Sí. En la consulta se evalúa el tipo de ginecomastia y, si corresponde, se solicitan estudios para descartar causas hormonales o por medicamentos." },
    ],
    relacionados: ["01c", "02"],
  },
  "04a": {
    number: "04a",
    borrador: true,
    parent: "04",
    title: "Mommy Makeover",
    subtitle: "Abdomen y mamas en un solo proceso",
    category: "Contorno Corporal",
    imageSrc: "/images/mom.webp",
    secondaryImageSrc: "/images/abdomino.webp",
    catchPhrase: "Recuperá tu cuerpo después de la maternidad, con un plan integral y personalizado.",
    description: "El mommy makeover combina en un mismo plan quirúrgico los procedimientos que tratan los cambios más frecuentes después del embarazo y la lactancia: el abdomen (exceso de piel, grasa y separación de los músculos o diástasis) y las mamas (pérdida de volumen o caída). La combinación más habitual es la abdominoplastia con aumento mamario o mastopexia, y puede sumarse lipoescultura para definir el contorno.",
    objetivo: "Tratar en conjunto los cambios del abdomen y las mamas después de la maternidad: exceso de piel y grasa, diástasis de rectos, pérdida de volumen y caída mamaria.",
    specs: { // A CONFIRMAR
      tipo: "Según la combinación",
      lugar: "Block quirúrgico",
      anestesia: "General",
      duracion: "3-5 horas"
    },
    tecnica: "Se planifica qué procedimientos combinar según tus necesidades: abdominoplastia (con reparación de la diástasis de los rectos y retiro del exceso de piel y grasa), aumento mamario con implantes, mastopexia o ambos, y lipoescultura de zonas puntuales. Hacerlo en una sola cirugía permite una única anestesia y un único período de recuperación, siempre que la evaluación médica lo considere seguro; en algunos casos se recomienda hacerlo en etapas.",
    candidatos: "Mujeres que ya completaron sus embarazos, que terminaron la lactancia hace algunos meses y que tienen un peso estable y buena salud general. La diástasis abdominal no se corrige con dieta ni ejercicio, por eso suele ser uno de los motivos principales para esta cirugía.",
    recuperacion: "La recuperación es la de la cirugía más extensa del plan, en general la abdominoplastia: reposo relativo de aproximadamente 2 semanas, faja compresiva por 6 a 8 semanas y sostén posquirúrgico. Conviene contar con ayuda en casa durante los primeros días, especialmente si hay niños pequeños.",
    riesgos: "Al combinar procedimientos, la seguridad es la prioridad: se evalúa tu estado de salud y la duración total de la cirugía, y se opera en block quirúrgico habilitado. Los riesgos de cada procedimiento (hematoma, seroma, problemas de cicatrización, asimetrías) se explican en detalle en la consulta. Las cicatrices son permanentes, aunque se ubican en zonas que se ocultan con ropa interior o bikini.",
    faq: [
      { question: "¿Cuánto tiempo después del embarazo me puedo operar?", answer: "Se recomienda esperar al menos 6 meses después de terminar la lactancia y haber alcanzado un peso estable, para que los tejidos del abdomen y de las mamas se asienten." }, // A CONFIRMAR
      { question: "¿Puedo tener más hijos después?", answer: "Es posible, pero un nuevo embarazo puede modificar el resultado del abdomen y de las mamas. Por eso se aconseja operarse una vez completada la familia." },
      { question: "¿Se hace todo en una sola cirugía?", answer: "Muchas veces sí, lo que permite una única anestesia y una única recuperación. Si la evaluación indica que es más seguro, se planifica en dos etapas." },
      { question: "¿Qué es la diástasis de rectos?", answer: "Es la separación de los músculos rectos del abdomen que se produce durante el embarazo. Genera un abdomen abultado que no mejora con dieta ni ejercicio, y se corrige durante la abdominoplastia." },
      { question: "¿Cuánto tarda la recuperación?", answer: "En general, unas 2 semanas de reposo relativo, con faja compresiva durante 6 a 8 semanas. El retorno a las actividades es progresivo según la combinación de procedimientos." },
    ],
    relacionados: ["01a", "01b", "02"],
  }
}

// ─── Borradores ──────────────────────────────────────────
// Las páginas con `borrador: true` (pendientes de revisión médica) quedan ocultas en producción:
// no tienen ruta, no salen en el sitemap y los links que apuntan a ellas caen en su página madre.
// Para verlas, compilar con VITE_MOSTRAR_BORRADORES=1 (local o en un deploy de preview).
// Cuando el Dr. Ripoll apruebe una, se le borra `borrador: true` y queda publicada.
const MOSTRAR_BORRADORES =
  import.meta.env?.VITE_MOSTRAR_BORRADORES === "1" ||
  (typeof process !== "undefined" && process.env?.VITE_MOSTRAR_BORRADORES === "1")

export const procedimientosData = Object.fromEntries(
  Object.entries(todosLosProcedimientos).filter(([, p]) => MOSTRAR_BORRADORES || !p.borrador)
)

// URLs con palabra clave. El número sigue siendo la clave interna (y la de Sanity).
export const PROCEDIMIENTO_SLUGS = {
  "01": "cirugia-mamaria",
  "02": "lipoescultura-vaser",
  "04": "abdominoplastia",
  "06": "tratamientos-no-invasivos",
  "01a": "aumento-mamario",
  "01b": "mastopexia",
  "01c": "reduccion-mamaria",
  "01d": "reconstruccion-mamaria",
  "01e": "ginecomastia",
  "04a": "mommy-makeover",
}

// Solo los procedimientos "madre" (los que tienen pill de navegación y card en el listado).
export const procedimientosPrincipales = Object.values(procedimientosData).filter((p) => !p.parent)

const NUMBER_BY_SLUG = Object.fromEntries(
  Object.entries(PROCEDIMIENTO_SLUGS).map(([number, slug]) => [slug, number])
)

export const procedimientoPath = (number) => {
  // Si la página está oculta (borrador), el link lleva a su procedimiento madre.
  if (!procedimientosData[number] && todosLosProcedimientos[number]?.parent) number = todosLosProcedimientos[number].parent
  return PROCEDIMIENTO_SLUGS[number] ? `/procedimientos/${PROCEDIMIENTO_SLUGS[number]}` : "/procedimientos"
}

// Acepta el slug nuevo o el número viejo ("01") y devuelve el número.
export const numberFromParam = (param) => {
  const number = NUMBER_BY_SLUG[param] || param
  return procedimientosData[number] ? number : null
}
