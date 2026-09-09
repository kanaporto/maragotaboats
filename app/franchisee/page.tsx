'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import FranchiseeDashboard from '@/components/FranchiseeDashboard'
import FranchiseeLogin from '@/components/FranchiseeLogin'

interface FranchiseeSession {
  franchiseeId: string
  companyName: string
  email: string
  isAdmin: boolean
}

export default function FranchiseePanel() {
  const [session, setSession] = useState<FranchiseeSession | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if there's a session in localStorage
    const savedSession = localStorage.getItem('franchisee_session')
    if (savedSession) {
      try {
        setSession(JSON.parse(savedSession))
      } catch (err) {
        localStorage.removeItem('franchisee_session')
      }
    }
    setLoading(false)
  }, [])

  const handleLogin = (franchiseeSession: FranchiseeSession) => {
    setSession(franchiseeSession)
    localStorage.setItem('franchisee_session', JSON.stringify(franchiseeSession))
  }

  const handleLogout = () => {
    setSession(null)
    localStorage.removeItem('franchisee_session')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-maragota-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-4xl mb-4">🚤</div>
          <p>Cargando...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return <FranchiseeLogin onLogin={handleLogin} />
  }

  return <FranchiseeDashboard session={session} onLogout={handleLogout} />
}
