// Cloudflare Pages Function: POST /api/contact
// Requiere estas variables de entorno en el proyecto de Cloudflare Pages
// (Settings → Environment variables):
//   TURNSTILE_SECRET_KEY  → la Secret key del widget de Turnstile
//   RESEND_API_KEY        → API key de Resend (https://resend.com) para enviar el email
//   CONTACT_TO_EMAIL      → opcional, destinatario (default: info@guzmanripoll.com)
//   CONTACT_FROM_EMAIL    → opcional, remitente verificado en Resend

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Solicitud inválida.' }, 400);
  }

  const { firstName, email, phone, message, token } = body;

  if (!firstName || !email || !phone || !message || !token) {
    return json({ error: 'Faltan campos obligatorios.' }, 400);
  }

  // 1. Verificar el token de Turnstile contra Cloudflare (obligatorio server-side)
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
    return json({ error: 'Falló la verificación anti-bot. Recargá e intentá de nuevo.' }, 403);
  }

  // 2. Enviar el email vía Resend
  const to = env.CONTACT_TO_EMAIL || 'info@guzmanripoll.com';
  const from = env.CONTACT_FROM_EMAIL || 'Web Guzmán Ripoll <onboarding@resend.dev>';

  const sendRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Nueva consulta web de ${firstName}`,
      text: [
        `Nombre: ${firstName}`,
        `Email: ${email}`,
        `Teléfono: ${phone}`,
        '',
        'Mensaje:',
        message,
      ].join('\n'),
    }),
  });

  if (!sendRes.ok) {
    return json({ error: 'No se pudo enviar el mensaje. Intentá más tarde.' }, 502);
  }

  return json({ ok: true });
}
