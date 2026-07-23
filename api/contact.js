export const config = {
  maxDuration: 10,
};

const json = (res, data, status = 200) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
};

const getBody = (req) => {
  if (typeof req.body === 'object' && req.body !== null) return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body);
  return {};
};

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Envia el aviso por mail via Brevo. Nunca lanza: si falla, la consulta ya quedo en Sanity.
async function sendNotificationEmail(consulta) {
  if (!process.env.BREVO_API_KEY) return;
  const to = (process.env.CONTACT_NOTIFY_TO || 'info@guzmanripoll.com, nicovalles1900@gmail.com')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((email) => ({ email }));
  try {
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'Consultas Web',
          email: process.env.CONTACT_FROM_EMAIL || 'consultas@guzmanripoll.com',
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

const getSanityConfig = () => ({
  projectId: process.env.SANITY_CONTACT_PROJECT_ID || process.env.SANITY_PROJECT_ID || 'nzg7h3zh',
  dataset: process.env.SANITY_CONTACT_DATASET || 'consultas',
  apiVersion: '2024-01-01',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, { error: 'Metodo no permitido.' }, 405);
  }

  let body;
  try {
    body = getBody(req);
  } catch {
    return json(res, { error: 'Solicitud invalida.' }, 400);
  }

  const { firstName, email, phone, message, token, trafficSource } = body;

  if (!firstName || !email || !phone || !message || !token) {
    return json(res, { error: 'Faltan campos obligatorios.' }, 400);
  }

  const verifyRes = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: req.headers['x-forwarded-for']?.split(',')[0],
      }),
    }
  );
  const verify = await verifyRes.json();

  if (!verify.success) {
    return json(res, { error: 'Fallo la verificacion anti-bot. Recarga e intenta de nuevo.' }, 403);
  }

  const sanityWriteToken = process.env.SANITY_CONTACT_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN;
  if (!sanityWriteToken) {
    return json(res, { error: 'No esta configurado el guardado de consultas.' }, 500);
  }

  const { projectId, dataset, apiVersion } = getSanityConfig();
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
    return json(res, { error: 'No se pudo guardar la consulta. Intenta mas tarde.' }, 502);
  }

  await sendNotificationEmail({
    firstName: String(firstName).trim(),
    email: String(email).trim(),
    phone: String(phone).trim(),
    message: String(message).trim(),
    trafficSource: trafficSource ? String(trafficSource).trim().slice(0, 120) : 'directo',
  });

  return json(res, { ok: true });
}
