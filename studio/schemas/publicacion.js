import { defineType, defineField } from 'sanity'

// Publicación / Research — el cirujano carga sus trabajos, papers o publicaciones.
// Soporta PDF, link externo, imagen y resumen.
export default defineType({
  name: 'publicacion',
  title: 'Publicación / Research',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'authors', title: 'Autores', type: 'string' }),
    defineField({ name: 'source', title: 'Revista / Fuente', type: 'string' }),
    defineField({ name: 'date', title: 'Fecha', type: 'date' }),
    defineField({ name: 'summary', title: 'Resumen', type: 'text', rows: 4 }),
    defineField({
      name: 'link',
      title: 'Link externo (opcional)',
      type: 'url',
      description: 'Si el trabajo está publicado online, pegá el link.',
    }),
    defineField({
      name: 'pdf',
      title: 'PDF (opcional)',
      type: 'file',
      options: { accept: '.pdf' },
      description: 'Subí el PDF del trabajo. Se sube solo.',
    }),
    defineField({
      name: 'image',
      title: 'Imagen / portada (opcional)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      description: 'Mostrarlo arriba / resaltado.',
      initialValue: false,
    }),
  ],

  orderings: [
    { title: 'Fecha (más reciente)', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ],

  preview: {
    select: { title: 'title', subtitle: 'authors', media: 'image' },
  },
})
