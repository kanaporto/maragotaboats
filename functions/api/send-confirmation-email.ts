// Cloudflare Pages Function — sends the real booking confirmation email via
// Resend. Runs server-side so the API key never reaches the browser.
// Endpoint: POST /api/send-confirmation-email

interface Env {
  RESEND_API_KEY: string
}

interface ConfirmationEmailBody {
  to: string
  customerName: string
  boatName: string
  numPeople: number
  date?: string
  time?: string
  reservationFeeTotal: number
  franchiseeFeeTotal: number
}

function buildEmailHtml(data: ConfirmationEmailBody): string {
  return `
    <div style="font-family: -apple-system, sans-serif; max-width: 480px; margin: 0 auto;">
      <h1 style="color: #1A1A1A;">¡Reserva confirmada! 🎣</h1>
      <p>Hola ${data.customerName},</p>
      <p>Tu reserva en <strong>${data.boatName}</strong> está confirmada.</p>
      <ul>
        <li>Personas: ${data.numPeople}</li>
        ${data.date ? `<li>Fecha: ${data.date}</li>` : ''}
        ${data.time ? `<li>Hora: ${data.time}</li>` : ''}
        <li>Pagado hoy: ${data.reservationFeeTotal}€</li>
        <li>A pagar en destino: ${data.franchiseeFeeTotal}€ (efectivo o tarjeta)</li>
      </ul>
      <p>El franquiciado te contactará en las próximas 24h para confirmar los detalles finales.</p>
      <p style="font-size: 13px; color: #666;">
        Si no puedes asistir, ten en cuenta que la reserva no es reembolsable. Consulta las
        <a href="https://maragota-boats.pages.dev/legal/terminos">condiciones de reserva</a>.
      </p>
      <p>¡Que disfrutes de la pesca!<br/>Maragota Boats</p>
    </div>
  `
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  let body: ConfirmationEmailBody
  try {
    body = await context.request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Datos inválidos' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (!body.to || !body.customerName || !body.boatName || !body.numPeople) {
    return new Response(JSON.stringify({ error: 'Faltan datos de la reserva' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (!context.env.RESEND_API_KEY) {
    // Sin clave configurada seguimos devolviendo éxito (no bloqueamos al
    // cliente) pero no se envía ningún email real todavía.
    return new Response(JSON.stringify({ success: true, sent: false }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Maragota Boats <reservas@maragotaboats.com>',
        to: [body.to],
        subject: `Reserva confirmada — ${body.boatName}`,
        html: buildEmailHtml(body),
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      return new Response(JSON.stringify({ success: false, error: errText }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ success: true, sent: true }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error enviando el email'
    return new Response(JSON.stringify({ success: false, error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
