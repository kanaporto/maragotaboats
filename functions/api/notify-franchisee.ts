// Cloudflare Pages Function — tells the franchisee a new reservation came
// in: an email always (best-effort), and a webhook POST to their external
// reservation manager if they've configured one in Settings.
//
// This is the "connect your existing booking system" integration point:
// point functions/api/franchisee-settings.ts's webhookUrl at your system's
// endpoint and every new reservation gets POSTed there as JSON. A full
// bidirectional sync (them pushing availability back to us) needs the real
// reservations database — this only covers the outbound direction, which
// is what's possible today.
// Endpoint: POST /api/notify-franchisee

import { getFranchiseeById } from '../../lib/dummyData'

interface Env {
  LEADS_KV: KVNamespace
  RESEND_API_KEY: string
}

interface NotifyBody {
  franchiseeId: string
  boatName: string
  customerName: string
  customerEmail: string
  customerPhone: string
  numPeople: number
  date?: string
  time?: string
  reservationFeeTotal: number
  franchiseeFeeTotal: number
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  let body: NotifyBody
  try {
    body = await context.request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Datos inválidos' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const franchisee = getFranchiseeById(body.franchiseeId)
  if (!franchisee) {
    return new Response(JSON.stringify({ error: 'Franquiciado no encontrado' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Email al franquiciado (best-effort)
  if (context.env.RESEND_API_KEY) {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Maragota Boats <reservas@maragotaboats.com>',
        to: [franchisee.email],
        subject: `Nueva reserva — ${body.boatName}`,
        html: `
          <h2>Nueva reserva recibida</h2>
          <p><strong>Barco:</strong> ${body.boatName}</p>
          <p><strong>Cliente:</strong> ${body.customerName} — ${body.customerEmail} — ${body.customerPhone}</p>
          <p><strong>Personas:</strong> ${body.numPeople}</p>
          ${body.date ? `<p><strong>Fecha:</strong> ${body.date} ${body.time || ''}</p>` : ''}
          <p><strong>Pagado online:</strong> ${body.reservationFeeTotal}€</p>
          <p><strong>A cobrar en destino:</strong> ${body.franchiseeFeeTotal}€</p>
        `,
      }),
    }).catch(() => {
      // Best-effort.
    })
  }

  // Webhook al sistema de reservas externo del franquiciado, si lo tiene configurado.
  const settingsRaw = await context.env.LEADS_KV.get(`franchisee-settings:${body.franchiseeId}`)
  const webhookUrl = settingsRaw ? JSON.parse(settingsRaw).webhookUrl : ''

  if (webhookUrl) {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'reservation.created',
        franchiseeId: body.franchiseeId,
        boatName: body.boatName,
        customerName: body.customerName,
        customerEmail: body.customerEmail,
        customerPhone: body.customerPhone,
        numPeople: body.numPeople,
        date: body.date,
        time: body.time,
        reservationFeeTotal: body.reservationFeeTotal,
        franchiseeFeeTotal: body.franchiseeFeeTotal,
      }),
    }).catch(() => {
      // Best-effort: si el sistema externo del franquiciado falla o no
      // responde, no bloqueamos la confirmación del cliente.
    })
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
