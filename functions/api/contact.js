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
//                            (default: info@guzmanripoll.com)
//   CONTACT_FROM_EMAIL    -> remitente del dominio verificado en Brevo
//                            (default: info@guzmanripoll.com)

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const emailTemplate = (consulta) => {
  const name = esc(consulta.firstName);
  const email = esc(consulta.email);
  const phone = esc(consulta.phone);
  const message = esc(consulta.message).replace(/\n/g, '<br>');
  const source = esc(consulta.trafficSource);
  const replyHref = `mailto:${encodeURIComponent(consulta.email)}?subject=${encodeURIComponent(`Re: Consulta web de ${consulta.firstName}`)}`;
  const phoneHref = `tel:${String(consulta.phone).replace(/[^\d+]/g, '')}`;
  const submittedAt = new Intl.DateTimeFormat('es-UY', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/Montevideo',
  }).format(new Date(consulta.createdAt));

  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Nueva consulta web</title>
  </head>
  <body style="margin:0;padding:0;background:#fafafa;color:#171717;font-family:Geist,Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">Nueva consulta de ${name}: ${email}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#fafafa;">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid #ebebeb;border-radius:12px;box-shadow:0 1px 1px rgba(0,0,0,.02),0 8px 16px rgba(0,0,0,.04);overflow:hidden;">
            <tr>
              <td style="padding:28px 32px;background:#171717;color:#ffffff;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="font-size:15px;font-weight:600;letter-spacing:-.2px;">Guzmán Ripoll</td>
                    <td align="right" style="font-family:'SFMono-Regular',Consolas,'Liberation Mono',monospace;font-size:11px;color:#a1a1a1;">CONSULTAS / WEB</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 32px 24px;">
                <span style="display:inline-block;padding:5px 9px;border:1px solid #ebebeb;border-radius:999px;background:#fafafa;color:#4d4d4d;font-family:'SFMono-Regular',Consolas,'Liberation Mono',monospace;font-size:11px;line-height:14px;">NUEVA CONSULTA</span>
                <h1 style="margin:18px 0 8px;font-size:26px;line-height:32px;font-weight:600;letter-spacing:-.8px;color:#171717;">${name} quiere contactarse.</h1>
                <p style="margin:0;color:#888888;font-size:13px;line-height:20px;">Recibida el ${esc(submittedAt)} · Origen: ${source}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 24px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:separate;border-spacing:0;border:1px solid #ebebeb;border-radius:8px;overflow:hidden;">
                  <tr>
                    <td style="width:88px;padding:15px 16px;border-bottom:1px solid #ebebeb;background:#fafafa;color:#888888;font-family:'SFMono-Regular',Consolas,'Liberation Mono',monospace;font-size:11px;vertical-align:top;">EMAIL</td>
                    <td style="padding:15px 16px;border-bottom:1px solid #ebebeb;font-size:14px;line-height:20px;word-break:break-word;"><a href="${replyHref}" style="color:#0070f3;text-decoration:none;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="width:88px;padding:15px 16px;background:#fafafa;color:#888888;font-family:'SFMono-Regular',Consolas,'Liberation Mono',monospace;font-size:11px;vertical-align:top;">TELÉFONO</td>
                    <td style="padding:15px 16px;font-size:14px;line-height:20px;"><a href="${phoneHref}" style="color:#171717;text-decoration:none;">${phone}</a></td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 28px;">
                <p style="margin:0 0 8px;color:#888888;font-family:'SFMono-Regular',Consolas,'Liberation Mono',monospace;font-size:11px;line-height:16px;">MENSAJE</p>
                <div style="padding:20px 22px;border-radius:8px;background:#f5f5f5;color:#171717;font-size:15px;line-height:24px;">${message}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 32px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="border-radius:100px;background:#171717;"><a href="${replyHref}" style="display:inline-block;padding:12px 18px;color:#ffffff;font-size:14px;font-weight:500;line-height:20px;text-decoration:none;">Responder consulta</a></td>
                    <td style="width:10px;"></td>
                    <td style="border:1px solid #ebebeb;border-radius:100px;background:#ffffff;"><a href="${phoneHref}" style="display:inline-block;padding:11px 18px;color:#171717;font-size:14px;font-weight:500;line-height:20px;text-decoration:none;">Llamar</a></td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 32px;border-top:1px solid #ebebeb;background:#fafafa;color:#888888;font-size:12px;line-height:18px;">Esta consulta también quedó respaldada en Sanity.</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

// Envia el aviso por mail via Brevo. Nunca lanza: si falla, la consulta ya quedo en Sanity.
async function sendNotificationEmail(env, consulta) {
  if (!env.BREVO_API_KEY) {
    console.warn('[contact] Consulta guardada en Sanity, pero BREVO_API_KEY no esta configurada.');
    return false;
  }
  const to = (env.CONTACT_NOTIFY_TO || 'info@guzmanripoll.com')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((email) => ({ email }));
  try {
    const emailRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': env.BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'Consultas Web',
          email: env.CONTACT_FROM_EMAIL || 'info@guzmanripoll.com',
        },
        to,
        replyTo: { email: consulta.email, name: consulta.firstName },
        subject: `Nueva consulta web: ${consulta.firstName}`,
        htmlContent: emailTemplate(consulta),
        textContent: `Nueva consulta web\n\nNombre: ${consulta.firstName}\nEmail: ${consulta.email}\nTeléfono: ${consulta.phone}\nMensaje: ${consulta.message}\nOrigen: ${consulta.trafficSource}\n\nTambién quedó respaldada en Sanity.`,
      }),
    });
    if (!emailRes.ok) {
      const detail = await emailRes.text();
      console.error(`[contact] Brevo rechazo el aviso (${emailRes.status}): ${detail.slice(0, 500)}`);
      return false;
    }
    return true;
  } catch (error) {
    console.error('[contact] No se pudo enviar el aviso por Brevo:', error);
    return false;
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
    createdAt,
  });

  return json({ ok: true });
}
