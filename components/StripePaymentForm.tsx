'use client'

import { useEffect, useState } from 'react'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

let stripePromise: Promise<Stripe | null> | null = null
function getStripe() {
  if (!stripePromise && PUBLISHABLE_KEY) {
    stripePromise = loadStripe(PUBLISHABLE_KEY)
  }
  return stripePromise
}

export const PENDING_RESERVATION_KEY = 'maragota_pending_reservation'

interface PendingReservation {
  boatName: string
  numPeople: number
  fullName: string
  email: string
  amountEuros: number
}

interface StripePaymentFormProps {
  amountEuros: number
  email: string
  boatName: string
  numPeople: number
  fullName: string
  onSuccess: () => void
  onError: (message: string) => void
}

export default function StripePaymentForm(props: StripePaymentFormProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amountCents: Math.round(props.amountEuros * 100),
        email: props.email,
        boatName: props.boatName,
        numPeople: props.numPeople,
      }),
    })
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Error creando el pago')
        setClientSecret(data.clientSecret)
      })
      .catch((err) => setLoadError(err.message))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!PUBLISHABLE_KEY) {
    return (
      <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 p-4 rounded-lg text-sm">
        Stripe todavía no está configurado (falta NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY).
      </div>
    )
  }

  if (loadError) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
        {loadError}
      </div>
    )
  }

  if (!clientSecret) {
    return <p className="text-gray-500 text-sm">Cargando métodos de pago…</p>
  }

  return (
    <Elements
      stripe={getStripe()}
      options={{
        clientSecret,
        locale: 'es',
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#FF6B35',
            colorText: '#1A1A1A',
          },
        },
      }}
    >
      <PaymentForm {...props} />
    </Elements>
  )
}

function PaymentForm({
  amountEuros,
  email,
  boatName,
  numPeople,
  fullName,
  onSuccess,
  onError,
}: StripePaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setSubmitting(true)

    // Bizum requires leaving the page to confirm in the bank app, so we
    // stash the reservation details to restore them after the redirect back.
    const pending: PendingReservation = { boatName, numPeople, fullName, email, amountEuros }
    sessionStorage.setItem(PENDING_RESERVATION_KEY, JSON.stringify(pending))

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/`,
        receipt_email: email,
      },
      redirect: 'if_required',
    })

    setSubmitting(false)

    if (error) {
      sessionStorage.removeItem(PENDING_RESERVATION_KEY)
      onError(error.message || 'Error procesando el pago')
      return
    }

    // Methods that don't need a redirect (e.g. card without 3DS) land here directly.
    sessionStorage.removeItem(PENDING_RESERVATION_KEY)
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || submitting}
        className="btn-primary w-full mt-6 disabled:opacity-50"
      >
        {submitting ? 'Procesando...' : `Pagar ${amountEuros}€`}
      </button>
    </form>
  )
}
