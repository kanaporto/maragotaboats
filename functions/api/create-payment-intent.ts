// Cloudflare Pages Function — runs server-side, separate from the static export.
// Creates a Stripe PaymentIntent so the secret key never reaches the browser.
// Endpoint: POST /api/create-payment-intent

import Stripe from 'stripe'

interface Env {
  STRIPE_SECRET_KEY: string
}

interface CreatePaymentIntentBody {
  amountCents: number
  email: string
  boatName: string
  numPeople: number
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  if (!context.env.STRIPE_SECRET_KEY) {
    return new Response(
      JSON.stringify({ error: 'Stripe no está configurado todavía (falta STRIPE_SECRET_KEY).' }),
      { status: 501, headers: { 'Content-Type': 'application/json' } }
    )
  }

  let body: CreatePaymentIntentBody
  try {
    body = await context.request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Cuerpo de la petición inválido' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { amountCents, email, boatName, numPeople } = body

  if (!amountCents || amountCents < 50 || !email || !boatName || !numPeople) {
    return new Response(JSON.stringify({ error: 'Faltan datos de la reserva' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const stripe = new Stripe(context.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-06-20',
  })

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: 'eur',
      receipt_email: email,
      // automatic_payment_methods lets Stripe decide which methods to show
      // (card, Apple Pay, Google Pay, Bizum) based on what's enabled in the
      // Dashboard and what the buyer's device/location supports.
      automatic_payment_methods: { enabled: true },
      metadata: {
        boatName,
        numPeople: String(numPeople),
      },
    })

    return new Response(JSON.stringify({ clientSecret: paymentIntent.client_secret }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error creando el pago'
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
