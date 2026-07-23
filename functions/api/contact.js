// Cloudflare Pages Function: POST /api/contact
// Requiere estas variables de entorno en el proyecto de Cloudflare Pages:
//   TURNSTILE_SECRET_KEY  -> Secret key del widget de Turnstile
//   SANITY_WRITE_TOKEN    -> token de Sanity con permiso para crear documentos en el dataset privado
// Opcionales:
//   SANITY_CONTACT_PROJECT_ID -> default: SANITY_PROJECT_ID o nzg7h3zh
//   SANITY_CONTACT_DATASET    -> default: consultas
//   BREVO_API_KEY         -> si esta seteada, ademas de guardar en Sanity se envia
//                            un mail de aviso con la consulta (via Brevo, TXT-only DNS,
//                            compatible con dominios cuyo DNS esta en Wix)
//   CONTACT_NOTIFY_TO     -> destinatarios separados por coma
//                            (default: info@guzmanripoll.com, nicovalles1900@gmail.com)
//   CONTACT_FROM_EMAIL    -> remitente del dominio verificado en Brevo
//                            (default: consultas@guzmanripoll.com)

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Envia el aviso por mail via Brevo. Nunca lanza: si falla, la consulta ya quedo en Sanity.
async function sendNotificationEmail(env, consulta) {
  if (!env.BREVO_API_KEY) return;
  const to = (env.CONTACT_NOTIFY_TO || 'info@guzmanripoll.com, nicovalles1900@gmail.com')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((email) => ({ email }));
  try {
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': env.BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'Consultas Web',
          email: env.CONTACT_FROM_EMAIL || 'consultas@guzmanripoll.com',
        },
        to,
        replyTo: { email: consulta.email, name: consulta.firstName },
        subject: `Nueva consulta web: ${consulta.firstName}`,
        htmlContent: `
          <h2>Nueva consulta desde guzmanripoll.com</h2>
          <p><strong>Nombre:</strong> ${esc(consulta.firstName)}</p>
          <p><strong>Email:</strong> ${esc(consulta.email)}</p>
          <p><strong>Telefono:</strong> ${esc(consulta.phone)}</p>
          <p><strong>Mensaje:</strong><br>${esc(consulta.message).replace(/\n/g, '<br>')}</p>
          <p><strong>Origen:</strong> ${esc(consulta.trafficSource)}</p>
          <p style="color:#888">Tambien quedo guardada en Sanity (dataset consultas).</p>
        `,
      }),
    });
  } catch {
    // el guardado en Sanity ya se hizo; el mail es best-effort
  }
}

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

  await sendNotificationEmail(env, {
    firstName: String(firstName).trim(),
    email: String(email).trim(),
    phone: String(phone).trim(),
    message: String(message).trim(),
    trafficSource: trafficSource ? String(trafficSource).trim().slice(0, 120) : 'directo',
  });

  return json({ ok: true });
}
