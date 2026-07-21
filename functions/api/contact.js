// Cloudflare Pages Function: POST /api/contact
// Requiere estas variables de entorno en el proyecto de Cloudflare Pages:
//   TURNSTILE_SECRET_KEY  -> Secret key del widget de Turnstile
//   SANITY_WRITE_TOKEN    -> token de Sanity con permiso para crear documentos en el dataset privado
// Opcionales:
//   SANITY_CONTACT_PROJECT_ID -> default: SANITY_PROJECT_ID o nzg7h3zh
//   SANITY_CONTACT_DATASET    -> default: consultas

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const getSanityConfig = (env) => ({
  projectId: env.SANITY_CONTACT_PROJECT_ID || env.SANITY_PROJECT_ID || 'nzg7h3zh',
  dataset: env.SANITY_CONTACT_DATASET || 'consultas',
  apiVersion: '2024-01-01',
});

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Solicitud invalida.' }, 400);
  }

  const { firstName, email, phone, message, token, trafficSource } = body;

  if (!firstName || !email || !phone || !message || !token) {
    return json({ error: 'Faltan campos obligatorios.' }, 400);
  }

  const verifyRes = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: env.TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: request.headers.get('CF-Connecting-IP'),
      }),
    }
  );
  const verify = await verifyRes.json();

  if (!verify.success) {
    return json({ error: 'Fallo la verificacion anti-bot. Recarga e intenta de nuevo.' }, 403);
  }

  const sanityWriteToken = env.SANITY_CONTACT_WRITE_TOKEN || env.SANITY_WRITE_TOKEN;
  if (!sanityWriteToken) {
    return json({ error: 'No esta configurado el guardado de consultas.' }, 500);
  }

  const { projectId, dataset, apiVersion } = getSanityConfig(env);
  const mutationUrl = `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`;
  const createdAt = new Date().toISOString();

  const saveRes = await fetch(mutationUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${sanityWriteToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mutations: [
        {
          create: {
            _type: 'consulta',
            firstName: String(firstName).trim(),
            email: String(email).trim(),
            phone: String(phone).trim(),
            message: String(message).trim(),
            createdAt,
            source: 'web',
            trafficSource: trafficSource ? String(trafficSource).trim().slice(0, 120) : 'directo',
          },
        },
      ],
    }),
  });

  if (!saveRes.ok) {
    return json({ error: 'No se pudo guardar la consulta. Intenta mas tarde.' }, 502);
  }

  return json({ ok: true });
}
