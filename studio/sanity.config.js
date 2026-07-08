import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { contentSchemaTypes, consultaSchemaTypes } from './schemas'

const projectId = 'nzg7h3zh'

export default defineConfig([
  {
    name: 'contenido',
    title: 'Guzman Ripoll',
    projectId,
    dataset: 'production',
    plugins: [structureTool(), visionTool()],
    schema: {
      types: contentSchemaTypes,
    },
  },
  {
    name: 'consultas',
    title: 'Consultas',
    projectId,
    dataset: 'consultas',
    plugins: [structureTool()],
    schema: {
      types: consultaSchemaTypes,
    },
  },
])
