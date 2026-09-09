'use client'

import { useState } from 'react'
import { SearchParams } from '@/app/page'

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
  const [step, setStep] = useState<'people' | 'details' | 'payment' | 'confirmation'>('people')
  const [formData, setFormData] = useState({
    numPeople: 1,
    fullName: '',
    email: '',
    phone: '',
    confirmEmail: '',
  })
  const [paymentMethod, setPaymentMethod] = useState<'applepay' | 'bizum' | 'googlepay' | null>(null)
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
      setError('El nombre completo es obligatorio')
      return
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Por favor ingresa un email válido')
      return
    }
    if (formData.email !== formData.confirmEmail) {
      setError('Los emails no coinciden')
      return
    }
    if (!formData.phone.trim() || formData.phone.length < 9) {
      setError('Por favor ingresa un teléfono válido')
      return
    }

    setStep('payment')
  }

  const handlePayment = async (method: 'applepay' | 'bizum' | 'googlepay') => {
    setPaymentMethod(method)
    setLoading(true)
    setError('')

    try {
      // Aquí se integraría con un procesador de pagos real
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Enviar email de confirmación
      const emailData = {
        to: formData.email,
        subject: 'Reserva confirmada - Maragota Boats',
        reservation: {
          boat: boat.name,
          numPeople: formData.numPeople,
          date: searchParams.date,
          time: searchParams.time,
          totalPrice: formData.numPeople * 60,
          customerName: formData.fullName,
        }
      }

      // TODO: Integrar con Resend para enviar email
      console.log('Email de confirmación:', emailData)

      setStep('confirmation')
    } catch (err) {
      setError('Error procesando el pago. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const reservationFee = 15
  const franchiseeFee = 45
  const totalPrice = formData.numPeople * (reservationFee + franchiseeFee)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-maragota-black text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{boat.name}</h2>
              <p className="text-gray-300 text-sm mt-1">Completa tu reserva en 3 pasos</p>
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
              <h3 className="text-lg font-bold text-maragota-black mb-6">¿Cuántas personas?</h3>

              <div className="mb-8">
                <label className="block text-sm font-semibold text-maragota-black mb-4">
                  Número de personas (máximo {boat.availableSeats})
                </label>
                <select
                  name="numPeople"
                  value={formData.numPeople}
                  onChange={handleInputChange}
                  className="input-field text-lg py-4"
                >
                  {Array.from({ length: boat.availableSeats }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} persona{i + 1 > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price preview */}
              <div className="bg-maragota-light-gray p-4 rounded-lg mb-6">
                <div className="text-sm text-gray-600 mb-4">Precio total para {formData.numPeople} persona{formData.numPeople > 1 ? 's' : ''}:</div>
                <div className="text-3xl font-bold text-maragota-orange">{formData.numPeople * 60}€</div>
                <div className="text-xs text-gray-500 mt-2">
                  • Reserva ahora: {formData.numPeople * reservationFee}€<br/>
                  • Paga en destino: {formData.numPeople * franchiseeFee}€
                </div>
              </div>

              <button type="submit" className="btn-primary w-full">
                Continuar
              </button>
            </form>
          )}

          {/* Step 2: Personal Details */}
          {step === 'details' && (
            <form onSubmit={handleDetailsSubmit}>
              <h3 className="text-lg font-bold text-maragota-black mb-6">Tus datos personales</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-maragota-black mb-2">
                    Nombre completo *
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
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="tu@email.com"
                    className="input-field"
                  />
                  <p className="text-xs text-gray-500 mt-1">Recibirás la confirmación en este email</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-maragota-black mb-2">
                    Confirmar email *
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
                    Teléfono *
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
                  <span>Reserva ({formData.numPeople} x {reservationFee}€):</span>
                  <span className="font-semibold">{formData.numPeople * reservationFee}€</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>A pagar en destino:</span>
                  <span>{formData.numPeople * franchiseeFee}€</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep('people')}
                  className="btn-secondary flex-1"
                >
                  Atrás
                </button>
                <button type="submit" className="btn-primary flex-1">
                  Continuar al pago
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Payment */}
          {step === 'payment' && (
            <div>
              <h3 className="text-lg font-bold text-maragota-black mb-4">Método de pago</h3>
              <p className="text-gray-600 mb-6">
                Selecciona cómo quieres pagar <span className="font-bold text-maragota-orange">{formData.numPeople * reservationFee}€</span>
              </p>

              <div className="space-y-3 mb-6">
                <button
                  onClick={() => handlePayment('applepay')}
                  disabled={loading}
                  className="w-full p-4 border-2 border-maragota-light-gray rounded-lg hover:border-maragota-orange transition-colors flex items-center justify-center gap-3 font-semibold disabled:opacity-50"
                >
                  <span className="text-2xl">🍎</span> Apple Pay
                </button>

                <button
                  onClick={() => handlePayment('bizum')}
                  disabled={loading}
                  className="w-full p-4 border-2 border-maragota-light-gray rounded-lg hover:border-maragota-orange transition-colors flex items-center justify-center gap-3 font-semibold disabled:opacity-50"
                >
                  <span className="text-2xl">📱</span> Bizum
                </button>

                <button
                  onClick={() => handlePayment('googlepay')}
                  disabled={loading}
                  className="w-full p-4 border-2 border-maragota-light-gray rounded-lg hover:border-maragota-orange transition-colors flex items-center justify-center gap-3 font-semibold disabled:opacity-50"
                >
                  <span className="text-2xl">🔵</span> Google Pay
                </button>
              </div>

              {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="btn-secondary flex-1"
                >
                  Atrás
                </button>
                <button
                  onClick={() => handlePayment('bizum')}
                  disabled={loading}
                  className="btn-primary flex-1"
                >
                  {loading ? 'Procesando...' : 'Pagar ahora'}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 'confirmation' && (
            <div className="text-center">
              <div className="text-6xl mb-4">✓</div>
              <h3 className="text-2xl font-bold text-maragota-black mb-2">¡Reserva confirmada!</h3>
              <p className="text-gray-600 mb-6">Te hemos enviado un email con todos los detalles de tu reserva</p>

              <div className="bg-maragota-light-gray p-6 rounded-lg mb-6 text-left">
                <p className="text-sm text-gray-600 mb-2">Confirmación enviada a:</p>
                <p className="font-semibold text-maragota-black mb-6">{formData.email}</p>

                <div className="space-y-3 text-sm border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Barco:</span>
                    <span className="font-semibold">{boat.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Personas:</span>
                    <span className="font-semibold">{formData.numPeople}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pagado hoy:</span>
                    <span className="font-semibold text-maragota-orange">{formData.numPeople * reservationFee}€</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6 text-left text-sm">
                <p className="font-semibold text-blue-900 mb-2">📌 Próximos pasos:</p>
                <ul className="text-blue-800 space-y-1">
                  <li>✓ Revisamos tu email</li>
                  <li>• El franquiciado te contactará en 24h</li>
                  <li>• Paga {formData.numPeople * franchiseeFee}€ al llegar (efectivo o tarjeta)</li>
                  <li>• ¡A disfrutar de la pesca!</li>
                </ul>
              </div>

              <button onClick={onClose} className="btn-primary w-full">
                Volver al inicio
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
