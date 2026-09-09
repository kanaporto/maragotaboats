'use client'

import SearchForm from '@/components/SearchForm'
import AvailabilityList from '@/components/AvailabilityList'
import FeaturedFranchises from '@/components/FeaturedFranchises'
import WhyChooseUs from '@/components/WhyChooseUs'
import Faq from '@/components/Faq'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { PENDING_RESERVATION_KEY } from '@/components/StripePaymentForm'
import { useLocale } from '@/lib/i18n/context'

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
  const { t } = useLocale()
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

  // Lleva al usuario a los resultados cuando aparecen, tanto si vienen del
  // formulario de búsqueda como de una tarjeta de "Franquicias destacadas".
  useEffect(() => {
    if (searchParams) {
      document.getElementById('resultados')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [searchParams])

  const handleSelectProvince = (province: string) => {
    setSearchParams({ province })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-maragota-light-gray to-white relative">
      {confirmedPayment && (
        <div className="max-w-4xl mx-auto pt-8 px-4">
          <div className="card text-center">
            <div className="text-5xl mb-3">✓</div>
            <h2 className="text-xl font-bold text-maragota-black mb-2">{t.home.paymentConfirmedTitle}</h2>
            <p className="text-gray-600 mb-1">
              {confirmedPayment.boatName} — {t.reservationModal.personOption(confirmedPayment.numPeople)}
            </p>
            <p className="text-gray-600 mb-4">
              {t.home.paidLabel} <span className="font-semibold text-maragota-orange">{confirmedPayment.amountEuros}€</span>
            </p>
            <p className="text-sm text-gray-500">
              {t.home.confirmationSentTo} {confirmedPayment.email}
            </p>
            <button onClick={() => setConfirmedPayment(null)} className="btn-secondary mt-6">
              {t.home.closeButton}
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
          <h1 className="text-5xl font-bold mb-4">{t.home.heroTitle}</h1>
          <p className="text-xl text-gray-300 mb-2">{t.home.heroSubtitle1}</p>
          <p className="text-gray-400">{t.home.heroSubtitle2}</p>
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
        <section id="resultados" className="py-12 px-4 scroll-mt-20">
          <div className="max-w-4xl mx-auto">
            <AvailabilityList searchParams={searchParams} />
          </div>
        </section>
      )}

      {!searchParams && (
        <>
          <FeaturedFranchises onSelectProvince={handleSelectProvince} />

          <WhyChooseUs />

          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="card">
                <h2 className="text-2xl font-bold text-maragota-black mb-4">{t.home.howItWorksTitle}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                  <div>
                    <div className="text-4xl text-maragota-orange mb-4">🔍</div>
                    <h3 className="font-bold mb-2">{t.home.step1Title}</h3>
                    <p className="text-gray-600">{t.home.step1Desc}</p>
                  </div>
                  <div>
                    <div className="text-4xl text-maragota-orange mb-4">📅</div>
                    <h3 className="font-bold mb-2">{t.home.step2Title}</h3>
                    <p className="text-gray-600">{t.home.step2Desc}</p>
                  </div>
                  <div>
                    <div className="text-4xl text-maragota-orange mb-4">🎣</div>
                    <h3 className="font-bold mb-2">{t.home.step3Title}</h3>
                    <p className="text-gray-600">{t.home.step3Desc}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Faq />
        </>
      )}
    </div>
  )
}
