'use client'

import { useState } from 'react'
import { SearchParams } from '@/app/page'
import StripePaymentForm from './StripePaymentForm'
import { useLocale } from '@/lib/i18n/context'

const STRIPE_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

interface Boat {
  id: string
  name: string
  location: string
  franchisee: string
  availableSeats: number
}

interface ReservationModalProps {
  boat: Boat
  searchParams: SearchParams
  isOpen: boolean
  onClose: () => void
}

export default function ReservationModal({
  boat,
  searchParams,
  isOpen,
  onClose,
}: ReservationModalProps) {
  const { t } = useLocale()
  const [step, setStep] = useState<'people' | 'details' | 'payment' | 'confirmation'>('people')
  const [formData, setFormData] = useState({
    numPeople: 1,
    fullName: '',
    email: '',
    phone: '',
    confirmEmail: '',
  })
  const [, setPaymentMethod] = useState<'applepay' | 'bizum' | 'googlepay' | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'numPeople' ? Math.min(parseInt(value) || 1, boat.availableSeats) : value,
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
    if (!formData.phone.trim() || formData.phone.length < 9) {
      setError(t.reservationModal.errorPhoneInvalid)
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
        numPeople: formData.numPeople,
        date: searchParams.date,
        time: searchParams.time,
        reservationFeeTotal: formData.numPeople * reservationFee,
        franchiseeFeeTotal: formData.numPeople * franchiseeFee,
      }),
    }).catch(() => {
      // Best-effort: el pago ya se confirmó, no bloqueamos al cliente si
      // falla el envío del email.
    })
  }

  const handlePayment = async (method: 'applepay' | 'bizum' | 'googlepay') => {
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

  const reservationFee = 15
  const franchiseeFee = 45

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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

              <div className="mb-8">
                <label className="block text-sm font-semibold text-maragota-black mb-4">
                  {t.reservationModal.peopleLabel(boat.availableSeats)}
                </label>
                <select
                  name="numPeople"
                  value={formData.numPeople}
                  onChange={handleInputChange}
                  className="input-field text-lg py-4"
                >
                  {Array.from({ length: boat.availableSeats }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {t.reservationModal.personOption(i + 1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price preview */}
              <div className="bg-maragota-light-gray p-4 rounded-lg mb-6">
                <div className="text-sm text-gray-600 mb-4">{t.reservationModal.priceForPeople(formData.numPeople)}</div>
                <div className="text-3xl font-bold text-maragota-orange">{formData.numPeople * 60}€</div>
                <div className="text-xs text-gray-500 mt-2">
                  • {t.reservationModal.reserveNowLine(formData.numPeople * reservationFee)}<br/>
                  • {t.reservationModal.payAtDestinationLine(formData.numPeople * franchiseeFee)}
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
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+34 6XX XXX XXX"
                    className="input-field"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                  {error}
                </div>
              )}

              {/* Price summary */}
              <div className="bg-maragota-light-gray p-4 rounded-lg mb-6">
                <div className="flex justify-between mb-2">
                  <span>{t.reservationModal.reservationLine(formData.numPeople, reservationFee)}</span>
                  <span className="font-semibold">{formData.numPeople * reservationFee}€</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{t.availability.franchiseeLater}</span>
                  <span>{formData.numPeople * franchiseeFee}€</span>
                </div>
              </div>

              <p className="text-xs text-gray-500 mb-6">
                {t.reservationModal.noShowDisclaimer}{' '}
                <a href="/legal/terminos" target="_blank" rel="noopener noreferrer" className="text-maragota-orange hover:underline">
                  {t.reservationModal.termsLink}
                </a>.
              </p>

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
                {t.reservationModal.selectPaymentMethod(formData.numPeople * reservationFee)}
              </p>

              {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                  {error}
                </div>
              )}

              {STRIPE_CONFIGURED ? (
                <div className="mb-6">
                  <StripePaymentForm
                    amountEuros={formData.numPeople * reservationFee}
                    email={formData.email}
                    boatName={boat.name}
                    numPeople={formData.numPeople}
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
                    onClick={() => handlePayment('bizum')}
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
                    <span className="font-semibold">{formData.numPeople}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.reservationModal.paidTodayLabel}</span>
                    <span className="font-semibold text-maragota-orange">{formData.numPeople * reservationFee}€</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6 text-left text-sm">
                <p className="font-semibold text-blue-900 mb-2">{t.reservationModal.nextStepsTitle}</p>
                <ul className="text-blue-800 space-y-1">
                  <li>{t.reservationModal.nextStepsCheckEmail}</li>
                  <li>{t.reservationModal.nextStepsContact}</li>
                  <li>{t.reservationModal.nextStepsPay(formData.numPeople * franchiseeFee)}</li>
                  <li>{t.reservationModal.nextStepsEnjoy}</li>
                </ul>
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
