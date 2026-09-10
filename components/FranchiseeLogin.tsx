'use client'

import { useState } from 'react'
import { AUTHORIZED_FRANCHISEES, FranchiseeSession } from '@/lib/dummyData'

interface FranchiseeLoginProps {
  onLogin: (session: FranchiseeSession) => void
}

export default function FranchiseeLogin({ onLogin }: FranchiseeLoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Validate credentials
      const auth = AUTHORIZED_FRANCHISEES[email as keyof typeof AUTHORIZED_FRANCHISEES]

      if (!auth || auth.password !== password) {
        setError('Email o contraseña incorrectos')
        setLoading(false)
        return
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const isAdmin = email === 'geno@maragota.com'

      // Import to get franchisee data
      const { getFranchiseeById } = await import('@/lib/dummyData')
      const franchisee = isAdmin ? null : getFranchiseeById(auth.franchiseeId)

      const session: FranchiseeSession = {
        franchiseeId: auth.franchiseeId,
        companyName: isAdmin ? 'Administrador Maragota' : franchisee?.companyName || '',
        email,
        isAdmin,
        role: auth.role,
      }

      onLogin(session)
    } catch (err) {
      setError('Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-maragota-black to-maragota-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🔑</div>
          <h1 className="text-3xl font-bold text-white mb-2">Panel Franquiciado</h1>
          <p className="text-gray-400">Gestiona tu negocio de pesca</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-maragota-black mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nombre@maragota.com"
                className="input-field"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-maragota-black mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-field"
                disabled={loading}
              />
            </div>

            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Verificando...' : 'Ingresar'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4 font-semibold">Credenciales de demostración:</p>
            <div className="space-y-2 text-xs">
              <div className="bg-gray-50 p-3 rounded">
                <p className="font-mono">finisterre@maragota.com</p>
                <p className="font-mono text-gray-500">finisterre2024</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="font-mono">bueu@maragota.com</p>
                <p className="font-mono text-gray-500">bueu2024</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="font-mono">portonovo@maragota.com</p>
                <p className="font-mono text-gray-500">portonovo2024</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="font-mono">marin@maragota.com</p>
                <p className="font-mono text-gray-500">marin2024</p>
              </div>
              <div className="bg-gray-50 p-3 rounded border border-blue-300">
                <p className="font-mono text-blue-600 font-bold">operario.bueu@maragota.com (OPERARIO)</p>
                <p className="font-mono text-gray-500">operario2024</p>
              </div>
              <div className="bg-gray-50 p-3 rounded border border-yellow-300">
                <p className="font-mono text-maragota-orange font-bold">geno@maragota.com (ADMIN)</p>
                <p className="font-mono text-gray-500">geno2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            ← Volver a reservas
          </a>
        </div>
      </div>
    </div>
  )
}
