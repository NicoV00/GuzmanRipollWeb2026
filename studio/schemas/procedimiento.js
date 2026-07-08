import { defineType, defineField, defineArrayMember } from 'sanity'

// Procedimiento — espejo del objeto procedimientosData del sitio.
// El cirujano edita estos campos y el sitio los lee desde Sanity.
export default defineType({
  name: 'procedimiento',
  title: 'Procedimiento',
  type: 'document',
  fields: [
    defineField({
      name: 'number',
      title: 'Número (ej. 01, 02)',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      description: 'Se usa en la dirección /procedimiento/...',
    }),
    defineField({ name: 'subtitle', title: 'Subtítulo', type: 'string' }),
    defineField({ name: 'category', title: 'Categoría', type: 'string' }),

    defineField({
      name: 'image',
      title: 'Imagen principal',
      type: 'image',
      options: { hotspot: true },
      description: 'Arrastrá la foto acá. Se sube sola.',
    }),
    defineField({
      name: 'secondaryImage',
      title: 'Imagen secundaria',
      type: 'image',
      options: { hotspot: true },
    }),

    defineField({ name: 'catchPhrase', title: 'Frase destacada', type: 'text', rows: 2 }),
    defineField({ name: 'description', title: 'Descripción', type: 'text' }),
    defineField({ name: 'filosofia', title: 'Filosofía', type: 'text' }),
    defineField({ name: 'objetivo', title: 'Objetivo', type: 'text' }),

    defineField({
      name: 'specs',
      title: 'Especificaciones',
      type: 'object',
      fields: [
        { name: 'tipo', title: 'Tipo', type: 'string' },
        { name: 'lugar', title: 'Lugar', type: 'string' },
        { name: 'anestesia', title: 'Anestesia', type: 'string' },
        { name: 'duracion', title: 'Duración', type: 'string' },
      ],
    }),

    defineField({ name: 'tecnica', title: 'Técnica quirúrgica', type: 'text' }),
    defineField({ name: 'recuperacion', title: 'Recuperación', type: 'text' }),

    defineField({
      name: 'subprocedimientos',
      title: 'Subprocedimientos',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'name', title: 'Nombre', type: 'string' },
            { name: 'description', title: 'Descripción', type: 'text' },
          ],
          preview: { select: { title: 'name', subtitle: 'description' } },
        }),
      ],
    }),

    // Comparativa opcional (lo usa, por ej., Tratamientos Faciales: INDIBA vs DUOGlide)
    defineField({
      name: 'comparativa',
      title: 'Comparativa (opcional)',
      type: 'object',
      fields: [
        {
          name: 'indiba',
          title: 'Columna A',
          type: 'object',
          fields: [
            { name: 'title', title: 'Título', type: 'string' },
            { name: 'items', title: 'Ítems', type: 'array', of: [{ type: 'string' }] },
          ],
        },
        {
          name: 'duoglide',
          title: 'Columna B',
          type: 'object',
          fields: [
            { name: 'title', title: 'Título', type: 'string' },
            { name: 'items', title: 'Ítems', type: 'array', of: [{ type: 'string' }] },
          ],
        },
      ],
    }),

    defineField({
      name: 'orden',
      title: 'Orden de aparición',
      type: 'number',
      description: 'Menor número = aparece primero.',
    }),
  ],

  orderings: [
    { title: 'Orden', name: 'ordenAsc', by: [{ field: 'orden', direction: 'asc' }] },
  ],

  preview: {
    select: { title: 'title', subtitle: 'category', media: 'image' },
  },
})
