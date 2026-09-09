'use client'

import { useEffect, useRef, useState } from 'react'
import { SearchParams } from '@/app/page'
import StripePaymentForm from './StripePaymentForm'
import { useLocale } from '@/lib/i18n/context'
import { COUNTRY_CODES } from '@/lib/countryCodes'

const STRIPE_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
const SITE_URL = 'https://maragota-boats.pages.dev'
const DATE_LOCALES: Record<string, string> = { es: 'es-ES', en: 'en-GB', fr: 'fr-FR' }

interface Boat {
  id: string
  name: string
  location: string
  franchisee: string
  availableSeats: number
  totalSeats: number
}

interface ReservationModalProps {
  boat: Boat
  searchParams: SearchParams
  isOpen: boolean
  onClose: () => void
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function toICSDateTime(d: Date) {
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`
}

export default function ReservationModal({
  boat,
  searchParams,
  isOpen,
  onClose,
}: ReservationModalProps) {
  const { t, locale } = useLocale()
  const [step, setStep] = useState<'people' | 'details' | 'payment' | 'confirmation'>('people')
  const [bookingType, setBookingType] = useState<'shared' | 'private'>('shared')
  const [formData, setFormData] = useState({
    numPeople: 1,
    fullName: '',
    email: '',
    phone: '',
    countryDial: '+34',
    confirmEmail: '',
  })
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [, setPaymentMethod] = useState<'applepay' | 'bizum' | 'googlepay' | 'card' | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const modalRef = useRef<HTMLDivElement>(null)

  const reservationFee = 15
  const franchiseeFee = 45
  const maxPeople = bookingType === 'private' ? boat.totalSeats : boat.availableSeats
  const billedPeople = bookingType === 'private' ? boat.totalSeats : formData.numPeople
  const draftKey = `maragota_draft_${boat.id}`

  // Restaura el borrador si el cliente recargó la página a mitad de reservar.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(draftKey)
      if (saved) {
        const draft = JSON.parse(saved)
        if (draft.formData) setFormData((prev) => ({ ...prev, ...draft.formData }))
        if (draft.bookingType) setBookingType(draft.bookingType)
      }
    } catch {
      // Ignorar si sessionStorage no está disponible o el borrador es inválido.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (step === 'confirmation') {
      try {
        sessionStorage.removeItem(draftKey)
      } catch {}
      return
    }
    try {
      sessionStorage.setItem(draftKey, JSON.stringify({ formData, bookingType }))
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, bookingType, step])

  // Escape cierra el modal; Tab queda atrapado dentro mientras está abierto.
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    modalRef.current?.focus()
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'numPeople' ? Math.min(parseInt(value) || 1, maxPeople) : value,
    }))
  }

  const handlePeopleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setStep('details')
  }

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.fullName.trim()) {
      setError(t.reservationModal.errorFullNameRequired)
      return
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError(t.reservationModal.errorEmailInvalid)
      return
    }
    if (formData.email !== formData.confirmEmail) {
      setError(t.reservationModal.errorEmailMismatch)
      return
    }
    const digitsOnly = formData.phone.replace(/\D/g, '')
    if (!formData.phone.trim() || digitsOnly.length < 7) {
      setError(t.reservationModal.errorPhoneInvalid)
      return
    }
    if (!acceptedTerms) {
      setError(t.reservationModal.errorTermsRequired)
      return
    }

    setStep('payment')
  }

  const sendConfirmationEmail = () => {
    fetch('/api/send-confirmation-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: formData.email,
        customerName: formData.fullName,
        boatName: boat.name,
        numPeople: billedPeople,
        date: searchParams.date,
        time: searchParams.time,
        reservationFeeTotal: billedPeople * reservationFee,
        franchiseeFeeTotal: billedPeople * franchiseeFee,
      }),
    }).catch(() => {
      // Best-effort: el pago ya se confirmó, no bloqueamos al cliente si
      // falla el envío del email.
    })
  }

  const handlePayment = async (method: 'applepay' | 'bizum' | 'googlepay' | 'card') => {
    setPaymentMethod(method)
    setLoading(true)
    setError('')

    try {
      // Aquí se integraría con un procesador de pagos real
      await new Promise((resolve) => setTimeout(resolve, 2000))

      sendConfirmationEmail()
      setStep('confirmation')
    } catch (err) {
      setError(t.reservationModal.errorPaymentGeneric)
    } finally {
      setLoading(false)
    }
  }

  const handleStripeSuccess = () => {
    sendConfirmationEmail()
    setStep('confirmation')
  }

  const handleStripeError = (message: string) => {
    setError(message)
  }

  const handleAddToCalendar = () => {
    if (!searchParams.date) return
    const [y, m, d] = searchParams.date.split('-').map(Number)
    const [hh, mm] = (searchParams.time || '08:00').split(':').map(Number)
    const start = new Date(y, m - 1, d, hh, mm)
    const end = new Date(start.getTime() + 3 * 60 * 60 * 1000)

    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Maragota Boats//ES',
      'BEGIN:VEVENT',
      `UID:${boat.id}-${Date.now()}@maragotaboats.com`,
      `DTSTAMP:${toICSDateTime(new Date())}Z`,
      `DTSTART:${toICSDateTime(start)}`,
      `DTEND:${toICSDateTime(end)}`,
      `SUMMARY:Salida de pesca - ${boat.name}`,
      `LOCATION:${boat.location}`,
      `DESCRIPTION:Reserva confirmada con Maragota Boats.`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'maragota-boats-reserva.ics'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const shareDateTime = searchParams.date
    ? ` — ${new Date(searchParams.date).toLocaleDateString(DATE_LOCALES[locale])}${searchParams.time ? ` ${searchParams.time}` : ''}`
    : ''

  const shareWhatsAppHref = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${t.reservationModal.shareWhatsAppMessage(boat.name, boat.location, shareDateTime)} ${SITE_URL}`
  )}`

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]">
      <div
        ref={modalRef}
        tabIndex={-1}
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto outline-none"
      >
        {/* Header */}
        <div className="bg-maragota-black text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{boat.name}</h2>
              <p className="text-gray-300 text-sm mt-1">{t.reservationModal.completeIn3Steps}</p>
            </div>
            <button
              onClick={onClose}
              className="text-2xl leading-none hover:text-gray-300"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Step indicator */}
          <div className="flex gap-2 mb-8">
            <div className={`flex-1 h-2 rounded transition-colors ${['people', 'details', 'payment', 'confirmation'].indexOf(step) >= 0 ? 'bg-maragota-orange' : 'bg-gray-300'}`}></div>
            <div className={`flex-1 h-2 rounded transition-colors ${['details', 'payment', 'confirmation'].indexOf(step) >= 0 ? 'bg-maragota-orange' : 'bg-gray-300'}`}></div>
            <div className={`flex-1 h-2 rounded transition-colors ${['payment', 'confirmation'].indexOf(step) >= 0 ? 'bg-maragota-orange' : 'bg-gray-300'}`}></div>
            <div className={`flex-1 h-2 rounded transition-colors ${step === 'confirmation' ? 'bg-maragota-orange' : 'bg-gray-300'}`}></div>
          </div>

          {/* Step 1: Number of People */}
          {step === 'people' && (
            <form onSubmit={handlePeopleSubmit}>
              <h3 className="text-lg font-bold text-maragota-black mb-6">{t.reservationModal.peopleTitle}</h3>

              {/* Compartido / Privado */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setBookingType('shared')}
                  className={`text-left p-3 rounded-lg border-2 transition-colors ${
                    bookingType === 'shared' ? 'border-maragota-orange bg-orange-50' : 'border-maragota-light-gray'
                  }`}
                >
                  <p className="font-semibold text-sm">{t.reservationModal.sharedLabel}</p>
                  <p className="text-xs text-gray-600 mt-1">{t.reservationModal.sharedDesc}</p>
                </button>
                <button
                  type="button"
                  onClick={() => setBookingType('private')}
                  className={`text-left p-3 rounded-lg border-2 transition-colors ${
                    bookingType === 'private' ? 'border-maragota-orange bg-orange-50' : 'border-maragota-light-gray'
                  }`}
                >
                  <p className="font-semibold text-sm">{t.reservationModal.privateLabel}</p>
                  <p className="text-xs text-gray-600 mt-1">{t.reservationModal.privateDesc}</p>
                </button>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-semibold text-maragota-black mb-4">
                  {t.reservationModal.peopleLabel(maxPeople)}
                </label>
                <select
                  name="numPeople"
                  value={formData.numPeople}
                  onChange={handleInputChange}
                  className="input-field text-lg py-4"
                >
                  {Array.from({ length: maxPeople }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {t.reservationModal.personOption(i + 1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price preview */}
              <div className="bg-maragota-light-gray p-4 rounded-lg mb-6">
                <div className="text-sm text-gray-600 mb-4">
                  {bookingType === 'private'
                    ? t.reservationModal.privatePriceNote(billedPeople * 60)
                    : t.reservationModal.priceForPeople(formData.numPeople)}
                </div>
                <div className="text-3xl font-bold text-maragota-orange">{billedPeople * 60}€</div>
                <div className="text-xs text-gray-500 mt-2">
                  • {t.reservationModal.reserveNowLine(billedPeople * reservationFee)}<br/>
                  • {t.reservationModal.payAtDestinationLine(billedPeople * franchiseeFee)}
                </div>
              </div>

              <button type="submit" className="btn-primary w-full">
                {t.reservationModal.continueButton}
              </button>
            </form>
          )}

          {/* Step 2: Personal Details */}
          {step === 'details' && (
            <form onSubmit={handleDetailsSubmit}>
              <h3 className="text-lg font-bold text-maragota-black mb-6">{t.reservationModal.detailsTitle}</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-maragota-black mb-2">
                    {t.reservationModal.fullNameLabel}
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Juan García López"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-maragota-black mb-2">
                    {t.reservationModal.emailLabel}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="tu@email.com"
                    className="input-field"
                  />
                  <p className="text-xs text-gray-500 mt-1">{t.reservationModal.emailHint}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-maragota-black mb-2">
                    {t.reservationModal.confirmEmailLabel}
                  </label>
                  <input
                    type="email"
                    name="confirmEmail"
                    value={formData.confirmEmail}
                    onChange={handleInputChange}
                    placeholder="tu@email.com"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-maragota-black mb-2">
                    {t.reservationModal.phoneLabel}
                  </label>
                  <div className="flex gap-2">
                    <select
                      name="countryDial"
                      value={formData.countryDial}
                      onChange={handleInputChange}
                      className="input-field !w-32 shrink-0 px-2"
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.dial}>
                          {c.flag} {c.dial}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={t.reservationModal.phonePlaceholder}
                      className="input-field flex-1 min-w-0"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                  {error}
                </div>
              )}

              {/* Price summary */}
              <div className="bg-maragota-light-gray p-4 rounded-lg mb-4">
                <div className="flex justify-between mb-2">
                  <span>{t.reservationModal.reservationLine(billedPeople, reservationFee)}</span>
                  <span className="font-semibold">{billedPeople * reservationFee}€</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{t.availability.franchiseeLater}</span>
                  <span>{billedPeople * franchiseeFee}€</span>
                </div>
              </div>

              <p className="text-xs text-gray-500 mb-4">
                {t.reservationModal.paymentIconsHint}: 🍎 {t.reservationModal.applePay} · 🔵 {t.reservationModal.googlePay} · 📱 {t.reservationModal.bizum} · 💳 {t.reservationModal.cardLabel}
              </p>

              <label className="flex items-start gap-2 text-xs text-gray-500 mb-6">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 shrink-0"
                />
                <span>
                  {t.reservationModal.termsCheckboxPrefix}{' '}
                  <a href="/legal/terminos" target="_blank" rel="noopener noreferrer" className="text-maragota-orange hover:underline">
                    {t.reservationModal.termsLink}
                  </a>{' '}({t.reservationModal.noShowDisclaimer.toLowerCase()})
                </span>
              </label>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep('people')}
                  className="btn-secondary flex-1"
                >
                  {t.reservationModal.backButton}
                </button>
                <button type="submit" className="btn-primary flex-1">
                  {t.reservationModal.continueToPayment}
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Payment */}
          {step === 'payment' && (
            <div>
              <h3 className="text-lg font-bold text-maragota-black mb-4">{t.reservationModal.paymentTitle}</h3>
              <p className="text-gray-600 mb-6">
                {t.reservationModal.selectPaymentMethod(billedPeople * reservationFee)}
              </p>

              {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                  {error}
                </div>
              )}

              {STRIPE_CONFIGURED ? (
                <div className="mb-6">
                  <StripePaymentForm
                    amountEuros={billedPeople * reservationFee}
                    email={formData.email}
                    boatName={boat.name}
                    numPeople={billedPeople}
                    fullName={formData.fullName}
                    onSuccess={handleStripeSuccess}
                    onError={handleStripeError}
                  />
                </div>
              ) : (
                <div className="space-y-3 mb-6">
                  <button
                    onClick={() => handlePayment('applepay')}
                    disabled={loading}
                    className="w-full p-4 border-2 border-maragota-light-gray rounded-lg hover:border-maragota-orange transition-colors flex items-center justify-center gap-3 font-semibold disabled:opacity-50"
                  >
                    <span className="text-2xl">🍎</span> {t.reservationModal.applePay}
                  </button>

                  <button
                    onClick={() => handlePayment('bizum')}
                    disabled={loading}
                    className="w-full p-4 border-2 border-maragota-light-gray rounded-lg hover:border-maragota-orange transition-colors flex items-center justify-center gap-3 font-semibold disabled:opacity-50"
                  >
                    <span className="text-2xl">📱</span> {t.reservationModal.bizum}
                  </button>

                  <button
                    onClick={() => handlePayment('googlepay')}
                    disabled={loading}
                    className="w-full p-4 border-2 border-maragota-light-gray rounded-lg hover:border-maragota-orange transition-colors flex items-center justify-center gap-3 font-semibold disabled:opacity-50"
                  >
                    <span className="text-2xl">🔵</span> {t.reservationModal.googlePay}
                  </button>

                  <button
                    onClick={() => handlePayment('card')}
                    disabled={loading}
                    className="w-full p-4 border-2 border-maragota-light-gray rounded-lg hover:border-maragota-orange transition-colors flex items-center justify-center gap-3 font-semibold disabled:opacity-50"
                  >
                    <span className="text-2xl">💳</span> {t.reservationModal.cardLabel}
                  </button>

                  <button
                    onClick={() => handlePayment('card')}
                    disabled={loading}
                    className="btn-primary w-full"
                  >
                    {loading ? t.reservationModal.processing : t.reservationModal.payNowSimulated}
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={() => setStep('details')}
                className="btn-secondary w-full"
              >
                {t.reservationModal.backButton}
              </button>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 'confirmation' && (
            <div className="text-center">
              <div className="text-6xl mb-4">✓</div>
              <h3 className="text-2xl font-bold text-maragota-black mb-2">{t.reservationModal.confirmationTitle}</h3>
              <p className="text-gray-600 mb-6">{t.reservationModal.confirmationSubtitle}</p>

              <div className="bg-maragota-light-gray p-6 rounded-lg mb-6 text-left">
                <p className="text-sm text-gray-600 mb-2">{t.reservationModal.confirmationSentTo}</p>
                <p className="font-semibold text-maragota-black mb-6">{formData.email}</p>

                <div className="space-y-3 text-sm border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.reservationModal.boatLabel}</span>
                    <span className="font-semibold">{boat.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.reservationModal.peopleLabelShort}</span>
                    <span className="font-semibold">{billedPeople}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.reservationModal.paidTodayLabel}</span>
                    <span className="font-semibold text-maragota-orange">{billedPeople * reservationFee}€</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6 text-left text-sm">
                <p className="font-semibold text-blue-900 mb-2">{t.reservationModal.nextStepsTitle}</p>
                <ul className="text-blue-800 space-y-1">
                  <li>{t.reservationModal.nextStepsCheckEmail}</li>
                  <li>{t.reservationModal.nextStepsContact}</li>
                  <li>{t.reservationModal.nextStepsPay(billedPeople * franchiseeFee)}</li>
                  <li>{t.reservationModal.nextStepsEnjoy}</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-6 text-left text-sm">
                <p className="font-semibold text-green-900 mb-2">{t.reservationModal.whatToBringTitle}</p>
                <ul className="text-green-800 space-y-1">
                  {t.reservationModal.whatToBringItems.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3 mb-3">
                {searchParams.date && (
                  <button onClick={handleAddToCalendar} className="btn-secondary flex-1 text-sm">
                    {t.reservationModal.addToCalendarButton}
                  </button>
                )}
                <a
                  href={shareWhatsAppHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex-1 text-sm text-center"
                >
                  {t.reservationModal.shareWhatsAppButton}
                </a>
              </div>

              <button onClick={onClose} className="btn-primary w-full">
                {t.reservationModal.backHomeButton}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
