export const config = {
  maxDuration: 10,
};

const csvEscape = (value) => {
  const textValue = value == null ? '' : String(value);
  return `"${textValue.replace(/"/g, '""')}"`;
};

const toCsv = (rows) => {
  const headers = ['Fecha', 'Nombre', 'Telefono', 'Email', 'Mensaje', 'Origen'];
  const lines = rows.map((row) =>
    [
      row.createdAt,
      row.firstName,
      row.phone,
      row.email,
      row.message,
      row.source,
    ].map(csvEscape).join(',')
  );

  return `\uFEFF${headers.map(csvEscape).join(',')}\n${lines.join('\n')}`;
};

const text = (res, message, status = 200) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end(message);
};

const getSanityConfig = () => ({
  projectId: process.env.SANITY_CONTACT_PROJECT_ID || process.env.SANITY_PROJECT_ID || 'nzg7h3zh',
  dataset: process.env.SANITY_CONTACT_DATASET || 'consultas',
  apiVersion: '2024-01-01',
});

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return text(res, 'Metodo no permitido.', 405);
  }

  if (!process.env.ADMIN_EXPORT_TOKEN) {
    return text(res, 'No esta configurada la clave de exportacion.', 500);
  }

  const auth = req.headers.authorization || '';
  const url = new URL(req.url, `https://${req.headers.host || 'localhost'}`);
  const token = auth.replace(/^Bearer\s+/i, '') || url.searchParams.get('token');

  if (token !== process.env.ADMIN_EXPORT_TOKEN) {
    return text(res, 'No autorizado.', 401);
  }

  const sanityToken = process.env.SANITY_CONTACT_READ_TOKEN ||
    process.env.SANITY_READ_TOKEN ||
    process.env.SANITY_CONTACT_WRITE_TOKEN ||
    process.env.SANITY_WRITE_TOKEN;
  if (!sanityToken) {
    return text(res, 'No esta configurado el token de Sanity.', 500);
  }

  const { projectId, dataset, apiVersion } = getSanityConfig();
  const query = `*[_type == "consulta"] | order(createdAt desc) {
    createdAt,
    firstName,
    phone,
    email,
    message,
    source
  }`;

  const queryUrl = new URL(`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`);
  queryUrl.searchParams.set('query', query);

  const sanityRes = await fetch(queryUrl, {
    headers: { Authorization: `Bearer ${sanityToken}` },
  });

  if (!sanityRes.ok) {
    return text(res, 'No se pudieron leer las consultas.', 502);
  }

  const data = await sanityRes.json();
  const csv = toCsv(data.result || []);
  const date = new Date().toISOString().slice(0, 10);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="consultas-guzman-ripoll-${date}.csv"`);
  res.setHeader('Cache-Control', 'no-store');
  res.end(csv);
}
