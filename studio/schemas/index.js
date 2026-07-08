import procedimiento from './procedimiento'
import publicacion from './publicacion'
import consulta from './consulta'

// Todos los tipos de contenido editables desde el Studio.
export const contentSchemaTypes = [procedimiento, publicacion]
export const consultaSchemaTypes = [consulta]
export const schemaTypes = [...contentSchemaTypes, ...consultaSchemaTypes]
