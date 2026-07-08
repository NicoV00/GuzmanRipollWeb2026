import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'consulta',
  title: 'Consulta',
  type: 'document',
  fields: [
    defineField({
      name: 'createdAt',
      title: 'Fecha',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'firstName',
      title: 'Nombre',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'phone',
      title: 'Telefono',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'message',
      title: 'Mensaje',
      type: 'text',
      rows: 5,
      readOnly: true,
    }),
    defineField({
      name: 'source',
      title: 'Origen',
      type: 'string',
      readOnly: true,
    }),
  ],
  orderings: [
    { title: 'Mas recientes', name: 'createdAtDesc', by: [{ field: 'createdAt', direction: 'desc' }] },
  ],
  preview: {
    select: {
      title: 'firstName',
      subtitle: 'createdAt',
    },
  },
})
