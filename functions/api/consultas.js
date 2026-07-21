// Cloudflare Pages Function: GET /api/consultas
// Descarga las consultas como CSV.
// Requiere:
//   ADMIN_EXPORT_TOKEN -> clave privada para descargar
//   SANITY_WRITE_TOKEN -> token de Sanity, o SANITY_READ_TOKEN si preferis separar permisos
// Opcionales:
//   SANITY_CONTACT_PROJECT_ID -> default: SANITY_PROJECT_ID o nzg7h3zh
//   SANITY_CONTACT_DATASET    -> default: consultas

const csvEscape = (value) => {
  const textValue = value == null ? '' : String(value);
  return `"${textValue.replace(/"/g, '""')}"`;
};

const toCsv = (rows) => {
  const headers = ['Fecha', 'Nombre', 'Telefono', 'Email', 'Mensaje', 'Origen', 'De donde vino'];
  const lines = rows.map((row) =>
    [
      row.createdAt,
      row.firstName,
      row.phone,
      row.email,
      row.message,
      row.source,
      row.trafficSource,
    ].map(csvEscape).join(',')
  );

  return `\uFEFF${headers.map(csvEscape).join(',')}\n${lines.join('\n')}`;
};

const text = (message, status = 200) =>
  new Response(message, {
    status,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });

const getSanityConfig = (env) => ({
  projectId: env.SANITY_CONTACT_PROJECT_ID || env.SANITY_PROJECT_ID || 'nzg7h3zh',
  dataset: env.SANITY_CONTACT_DATASET || 'consultas',
  apiVersion: '2024-01-01',
});

export async function onRequestGet({ request, env }) {
  if (!env.ADMIN_EXPORT_TOKEN) {
    return text('No esta configurada la clave de exportacion.', 500);
  }

  const auth = request.headers.get('Authorization') || '';
  const url = new URL(request.url);
  const token = auth.replace(/^Bearer\s+/i, '') || url.searchParams.get('token');

  if (token !== env.ADMIN_EXPORT_TOKEN) {
    return text('No autorizado.', 401);
  }

  const sanityToken = env.SANITY_CONTACT_READ_TOKEN ||
    env.SANITY_READ_TOKEN ||
    env.SANITY_CONTACT_WRITE_TOKEN ||
    env.SANITY_WRITE_TOKEN;
  if (!sanityToken) {
    return text('No esta configurado el token de Sanity.', 500);
  }

  const { projectId, dataset, apiVersion } = getSanityConfig(env);
  const query = `*[_type == "consulta"] | order(createdAt desc) {
    createdAt,
    firstName,
    phone,
    email,
    message,
    source,
    trafficSource
  }`;

  const queryUrl = new URL(`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`);
  queryUrl.searchParams.set('query', query);

  const sanityRes = await fetch(queryUrl, {
    headers: { Authorization: `Bearer ${sanityToken}` },
  });

  if (!sanityRes.ok) {
    return text('No se pudieron leer las consultas.', 502);
  }

  const data = await sanityRes.json();
  const csv = toCsv(data.result || []);
  const date = new Date().toISOString().slice(0, 10);

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="consultas-guzman-ripoll-${date}.csv"`,
      'Cache-Control': 'no-store',
    },
  });
}
