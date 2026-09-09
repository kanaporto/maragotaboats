'use client'

import { useEffect, useState } from 'react'

const DEV_PASSWORD = 'Portonovo1986'
const STORAGE_KEY = 'maragota_dev_access'

export default function DevGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false)
  const [checked, setChecked] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === DEV_PASSWORD) {
      setUnlocked(true)
    }
    setChecked(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input === DEV_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, input)
      setUnlocked(true)
      setError('')
    } else {
      setError('Contraseña incorrecta')
    }
  }

  if (!checked) {
    return null
  }

  if (!unlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-maragota-black px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-xl p-8 w-full max-w-sm"
        >
          <h1 className="text-xl font-bold text-maragota-black mb-1">
            Maragota Boats
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Sitio en desarrollo — acceso restringido
          </p>
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Contraseña"
            className="input-field mb-3"
            autoFocus
          />
          {error && (
            <p className="text-red-600 text-sm mb-3">{error}</p>
          )}
          <button type="submit" className="btn-primary w-full">
            Entrar
          </button>
        </form>
      </div>
    )
  }

  return <>{children}</>
}
