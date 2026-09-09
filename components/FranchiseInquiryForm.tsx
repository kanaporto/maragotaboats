'use client'

import { useState } from 'react'

const PROVINCES = [
  'A Coruña', 'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila',
  'Badajoz', 'Barcelona', 'Burgos', 'Cáceres', 'Cádiz', 'Cantabria',
  'Castellón', 'Ciudad Real', 'Córdoba', 'Cuenca', 'Girona', 'Granada',
  'Guadalajara', 'Guipúzcoa', 'Huelva', 'Huesca', 'Jaén', 'La Rioja',
  'Las Palmas', 'León', 'Lleida', 'Lugo', 'Madrid', 'Málaga', 'Murcia',
  'Navarra', 'Ourense', 'Palencia', 'Pontevedra', 'Salamanca',
  'Santa Cruz de Tenerife', 'Segovia', 'Sevilla', 'Soria', 'Tarragona',
  'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza',
]

export default function FranchiseInquiryForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    city: '',
    province: '',
    phone: '',
    email: '',
    experience: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.fullName.trim() || !formData.city.trim() || !formData.province) {
      setError('Por favor completa nombre, población y provincia')
      return
    }
    if (!formData.phone.trim() || formData.phone.length < 9) {
      setError('Por favor ingresa un teléfono válido')
      return
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Por favor ingresa un email válido')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('/api/franchise-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error('No se pudo enviar la solicitud')
      setStatus('sent')
    } catch (err) {
      setStatus('error')
      setError('Hubo un problema enviando tu solicitud. Intenta de nuevo o escríbenos directamente.')
    }
  }

  if (status === 'sent') {
    return (
      <div className="card text-center">
        <div className="text-5xl mb-3">✓</div>
        <h3 className="text-xl font-bold text-maragota-black mb-2">¡Solicitud recibida!</h3>
        <p className="text-gray-600">
          Gracias, {formData.fullName.split(' ')[0]}. Nuestro equipo revisará tu solicitud y te
          contactará en los próximos días para explicarte los siguientes pasos.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3 className="text-xl font-bold text-maragota-black mb-1">Solicita información</h3>
      <p className="text-gray-600 text-sm mb-6">
        Cuéntanos sobre ti y tu zona. Nuestro equipo se pondrá en contacto contigo.
      </p>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-maragota-black mb-2">
            Nombre completo *
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Juan García López"
            className="input-field"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-maragota-black mb-2">
              Población *
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Ej. Sanxenxo"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-maragota-black mb-2">
              Provincia *
            </label>
            <select
              name="province"
              value={formData.province}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Elige tu provincia</option>
              {PROVINCES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-maragota-black mb-2">
              Teléfono *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+34 6XX XXX XXX"
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
              onChange={handleChange}
              placeholder="tu@email.com"
              className="input-field"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-maragota-black mb-2">
            ¿Tienes barco propio y/o licencia de patrón?
          </label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Ej. Barco propio de 8 plazas, patrón de embarcaciones de recreo"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-maragota-black mb-2">
            Cuéntanos más (opcional)
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            placeholder="Zona donde operas, años de experiencia, disponibilidad..."
            className="input-field"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          {error}
        </div>
      )}

      <button type="submit" disabled={status === 'sending'} className="btn-primary w-full disabled:opacity-50">
        {status === 'sending' ? 'Enviando...' : 'Enviar solicitud'}
      </button>
    </form>
  )
}
