# Panel de edición (Sanity Studio) — Guzmán Ripoll

CMS donde el cirujano edita textos, imágenes y su research **sin tocar código**.
Proyecto **separado** del sitio: vive en `/studio` y no afecta al sitio web.

- Project ID: **nzg7h3zh**
- Dataset: **production**
- Estado: configurado, dependencias instaladas, esquemas validados (build OK). ✅

## Lo único que falta (necesita TU login de Sanity)

```bash
cd studio
npx sanity login      # abre el navegador → entrá con la cuenta que creaste
npx sanity deploy     # te pide un nombre → queda en https://<nombre>.sanity.studio
```

Después invitás al cirujano: en https://www.sanity.io → tu proyecto → **Members** →
agregás su mail. Él entra a esa URL `.sanity.studio`, hace login y edita.
Las imágenes y PDFs se suben **arrastrando** al campo.

## Probar el panel en local (opcional)
```bash
cd studio
npm run dev           # http://localhost:3333
```

## Tipos de contenido ya armados
- **Procedimiento** — espejo de los datos actuales del sitio.
- **Publicación / Research** — trabajos: título, autores, fecha, PDF, link, imagen, resumen.

## Siguiente paso (lo hace el dev, no el cirujano)
Conectar el sitio para que **lea** de Sanity en vez de los datos hardcodeados,
con fallback al texto actual para que nunca se rompa ni se vea vacío.
Se hace cuando quieras; el sitio actual sigue intacto hasta entonces.
