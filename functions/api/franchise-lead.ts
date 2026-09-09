// Cloudflare Pages Function — receives "become a franchisee" inquiries.
// Franchisee accounts are still created by hand (see lib/dummyData.ts /
// AUTHORIZED_FRANCHISEES), so this just notifies the team by email instead
// of self-registering anyone.
// Endpoint: POST /api/franchise-lead

interface Env {
  RESEND_API_KEY: string
  FRANCHISE_NOTIFICATION_EMAIL: string
}

interface FranchiseLeadBody {
  fullName: string
  city: string
  province: string
  phone: string
  email: string
  experience: string
  message: string
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  let body: FranchiseLeadBody
  try {
    body = await context.request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Datos inválidos' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { fullName, city, province, phone, email, experience, message } = body

  if (!fullName?.trim() || !city?.trim() || !phone?.trim() || !email?.trim()) {
    return new Response(JSON.stringify({ error: 'Faltan datos obligatorios' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Sin RESEND_API_KEY configurada seguimos aceptando la solicitud (no
  // bloqueamos al usuario) pero no se envía ningún email todavía.
  if (context.env.RESEND_API_KEY) {
    const notifyTo = context.env.FRANCHISE_NOTIFICATION_EMAIL || 'geno@maragota.com'

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Maragota Boats <solicitudes@maragotaboats.com>',
        to: [notifyTo],
        reply_to: email,
        subject: `Nueva solicitud de franquicia — ${fullName} (${city})`,
        html: `
          <h2>Nueva solicitud de franquicia</h2>
          <p><strong>Nombre:</strong> ${fullName}</p>
          <p><strong>Ubicación:</strong> ${city}, ${province}</p>
          <p><strong>Teléfono:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Experiencia:</strong> ${experience || '(no especificada)'}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${(message || '(sin mensaje)').replace(/\n/g, '<br/>')}</p>
        `,
      }),
    }).catch(() => {
      // Best-effort: no bloqueamos la respuesta al usuario si Resend falla.
    })
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
