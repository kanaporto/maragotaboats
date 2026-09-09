'use client'

import SearchForm from '@/components/SearchForm'
import AvailabilityList from '@/components/AvailabilityList'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { PENDING_RESERVATION_KEY } from '@/components/StripePaymentForm'

export interface SearchParams {
  province?: string
  date?: string
  time?: string
  nearMe?: boolean
  userLocation?: { lat: number; lng: number }
}

interface ConfirmedReservation {
  boatName: string
  numPeople: number
  fullName: string
  email: string
  amountEuros: number
}

export default function Home() {
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null)
  const [confirmedPayment, setConfirmedPayment] = useState<ConfirmedReservation | null>(null)

  // Bizum (and other redirect-based methods) send the buyer back here after
  // they approve the payment in their bank app. Stripe appends the outcome
  // as query params, and we restore the reservation details we stashed
  // before leaving.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const redirectStatus = params.get('redirect_status')

    if (redirectStatus === 'succeeded') {
      const saved = sessionStorage.getItem(PENDING_RESERVATION_KEY)
      if (saved) {
        setConfirmedPayment(JSON.parse(saved))
        sessionStorage.removeItem(PENDING_RESERVATION_KEY)
      }
    }

    if (redirectStatus) {
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-maragota-light-gray to-white relative">
      {confirmedPayment && (
        <div className="max-w-4xl mx-auto pt-8 px-4">
          <div className="card text-center">
            <div className="text-5xl mb-3">✓</div>
            <h2 className="text-xl font-bold text-maragota-black mb-2">¡Reserva confirmada!</h2>
            <p className="text-gray-600 mb-1">
              {confirmedPayment.boatName} — {confirmedPayment.numPeople} persona
              {confirmedPayment.numPeople > 1 ? 's' : ''}
            </p>
            <p className="text-gray-600 mb-4">
              Pagado: <span className="font-semibold text-maragota-orange">{confirmedPayment.amountEuros}€</span>
            </p>
            <p className="text-sm text-gray-500">
              Te hemos enviado la confirmación a {confirmedPayment.email}
            </p>
            <button onClick={() => setConfirmedPayment(null)} className="btn-secondary mt-6">
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Secret Admin Key */}
      <Link href="/franchisee" className="absolute top-20 right-4 text-4xl hover:scale-110 transition-transform opacity-0 hover:opacity-100" title="Panel franquiciado">
        🔑
      </Link>

      {/* Hero Section */}
      <section className="bg-maragota-black text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Maragota Boats</h1>
          <p className="text-xl text-gray-300 mb-2">Vive la experiencia de pesca más auténtica de España</p>
          <p className="text-gray-400">Reserva tu salida con los mejores pescadores locales</p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <SearchForm onSearch={setSearchParams} />
        </div>
      </section>

      {/* Results Section */}
      {searchParams && (
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <AvailabilityList searchParams={searchParams} />
          </div>
        </section>
      )}

      {!searchParams && (
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="card">
              <h2 className="text-2xl font-bold text-maragota-black mb-4">¿Cómo funciona?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div>
                  <div className="text-4xl text-maragota-orange mb-4">🔍</div>
                  <h3 className="font-bold mb-2">1. Busca</h3>
                  <p className="text-gray-600">Encuentra la salida perfecta cerca de ti</p>
                </div>
                <div>
                  <div className="text-4xl text-maragota-orange mb-4">📅</div>
                  <h3 className="font-bold mb-2">2. Selecciona</h3>
                  <p className="text-gray-600">Elige la fecha, hora y número de personas</p>
                </div>
                <div>
                  <div className="text-4xl text-maragota-orange mb-4">🎣</div>
                  <h3 className="font-bold mb-2">3. Reserva</h3>
                  <p className="text-gray-600">Confirma tu reserva y ¡a pescar!</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
