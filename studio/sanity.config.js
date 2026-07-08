import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

// ⚠️ REEMPLAZAR 'TU_PROJECT_ID' por el Project ID que te da sanity.io al crear el proyecto.
export default defineConfig({
  name: 'default',
  title: 'Guzmán Ripoll',

  projectId: 'nzg7h3zh',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
