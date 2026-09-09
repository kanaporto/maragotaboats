'use client'

import { useEffect, useState } from 'react'

type AdminTab = 'franchisees' | 'leads' | 'analytics' | 'reports'

interface FranchiseeManagement {
  id: string
  name: string
  owner: string
  city: string
  province: string
  email: string
  phone: string
  status: 'active' | 'suspended' | 'inactive'
  reservationsThisMonth: number
  revenueThisMonth: number
  rating: number
  boats: number
}

interface FranchiseLead {
  id: string
  fullName: string
  city: string
  province: string
  phone: string
  email: string
  experience: string
  message: string
  createdAt: string
  updatedAt: string
  status: 'nuevo' | 'primer_contacto' | 'negociacion' | 'documentos_firmados' | 'implementado' | 'rechazado'
  primerContacto: boolean
  primerContactoFecha: string
  negociacionCompleta: 'pendiente' | 'si' | 'no'
  notas: string
  tiempoEstimado: string
  documentosFirmados: boolean
  barcoOfrecido: boolean
  tiempoImplementacion: string
}

interface AdminPanelProps {
  onLogout: () => void
}

const LEAD_STATUS_LABELS: Record<FranchiseLead['status'], string> = {
  nuevo: '🆕 Nuevo',
  primer_contacto: '📞 Primer contacto',
  negociacion: '🤝 En negociación',
  documentos_firmados: '📋 Documentos firmados',
  implementado: '✅ Implementado',
  rechazado: '✕ Rechazado',
}

const LEAD_STATUS_COLORS: Record<FranchiseLead['status'], string> = {
  nuevo: 'bg-blue-100 text-blue-700',
  primer_contacto: 'bg-purple-100 text-purple-700',
  negociacion: 'bg-yellow-100 text-yellow-700',
  documentos_firmados: 'bg-orange-100 text-orange-700',
  implementado: 'bg-green-100 text-green-700',
  rechazado: 'bg-red-100 text-red-700',
}

function whatsappLink(phone: string) {
  const digits = phone.replace(/[^\d]/g, '')
  return `https://wa.me/${digits}`
}

// Datos de ejemplo para presentar el panel — sustituir por datos reales
// cuando haya reservas de verdad.
const UPCOMING_RESERVATIONS = [
  { id: 'r1', boat: 'Maregata I', franchisee: 'Pescas do Cabo Finisterre', date: '2026-09-12', time: '08:00', numPeople: 3, customer: 'Laura Fernández' },
  { id: 'r2', boat: 'Maregata II', franchisee: 'Pescas do Cabo Finisterre', date: '2026-09-12', time: '13:00', numPeople: 2, customer: 'Diego Souto' },
  { id: 'r3', boat: 'Pulpeira I', franchisee: 'Pesca Artesanal Bueu', date: '2026-09-13', time: '10:00', numPeople: 4, customer: 'Marta Iglesias' },
  { id: 'r4', boat: 'Doradiña', franchisee: 'Exploradores Marinos Portonovo', date: '2026-09-13', time: '16:00', numPeople: 1, customer: 'Carlos Pena' },
  { id: 'r5', boat: 'Sargueira', franchisee: 'Aventuras Marineras Marín', date: '2026-09-14', time: '06:00', numPeople: 5, customer: 'Ana Beloso' },
  { id: 'r6', boat: 'Pulpeira II', franchisee: 'Pesca Artesanal Bueu', date: '2026-09-15', time: '08:00', numPeople: 2, customer: 'Iván Castro' },
]

const PAST_RESERVATIONS = [
  { id: 'p1', boat: 'Maregata I', franchisee: 'Pescas do Cabo Finisterre', date: '2026-09-01', numPeople: 4, customer: 'Sofía Naya', total: 240 },
  { id: 'p2', boat: 'Sargueira', franchisee: 'Aventuras Marineras Marín', date: '2026-09-02', numPeople: 2, customer: 'Pablo Vidal', total: 120 },
  { id: 'p3', boat: 'Pulpeira I', franchisee: 'Pesca Artesanal Bueu', date: '2026-09-03', numPeople: 6, customer: 'Grupo Rodríguez', total: 360 },
  { id: 'p4', boat: 'Doradiña', franchisee: 'Exploradores Marinos Portonovo', date: '2026-09-04', numPeople: 1, customer: 'Xoán Represas', total: 60 },
  { id: 'p5', boat: 'Maregata II', franchisee: 'Pescas do Cabo Finisterre', date: '2026-09-05', numPeople: 3, customer: 'Beatriz Lago', total: 180 },
  { id: 'p6', boat: 'Sargueira II', franchisee: 'Aventuras Marineras Marín', date: '2026-09-06', numPeople: 8, customer: 'Despedida Grupo M.', total: 480 },
  { id: 'p7', boat: 'Pulpeira II', franchisee: 'Pesca Artesanal Bueu', date: '2026-09-07', numPeople: 2, customer: 'Noa Freire', total: 120 },
]

const FRANCHISE_RANKING = [
  { name: 'Aventuras Marineras Marín', reservations: 89, revenue: 5340, rating: 4.9 },
  { name: 'Pescas do Cabo Finisterre', reservations: 74, revenue: 4440, rating: 4.9 },
  { name: 'Pesca Artesanal Bueu', reservations: 61, revenue: 3660, rating: 4.7 },
  { name: 'Exploradores Marinos Portonovo', reservations: 23, revenue: 1380, rating: 4.6 },
]

export default function AdminPanel({ onLogout }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('franchisees')

  const [franchisees, setFranchisees] = useState<FranchiseeManagement[]>([
    {
      id: 'finisterre',
      name: 'Pescas do Cabo Finisterre',
      owner: 'Miguel Rodríguez García',
      city: 'Finisterre',
      province: 'Pontevedra',
      email: 'finisterre@maragota.com',
      phone: '+34 611 222 001',
      status: 'active',
      reservationsThisMonth: 74,
      revenueThisMonth: 4440,
      rating: 4.9,
      boats: 2,
    },
    {
      id: 'bueu',
      name: 'Pesca Artesanal Bueu',
      owner: 'Carmela López Fernández',
      city: 'Bueu',
      province: 'Pontevedra',
      email: 'bueu@maragota.com',
      phone: '+34 611 222 002',
      status: 'active',
      reservationsThisMonth: 61,
      revenueThisMonth: 3660,
      rating: 4.7,
      boats: 3,
    },
    {
      id: 'portonovo',
      name: 'Exploradores Marinos Portonovo',
      owner: 'Antonio Sousa Pérez',
      city: 'Portonovo',
      province: 'Pontevedra',
      email: 'portonovo@maragota.com',
      phone: '+34 611 222 003',
      status: 'active',
      reservationsThisMonth: 23,
      revenueThisMonth: 1380,
      rating: 4.6,
      boats: 2,
    },
    {
      id: 'marin',
      name: 'Aventuras Marineras Marín',
      owner: 'Xosé Manuel González López',
      city: 'Marín',
      province: 'Pontevedra',
      email: 'marin@maragota.com',
      phone: '+34 611 222 004',
      status: 'active',
      reservationsThisMonth: 89,
      revenueThisMonth: 5340,
      rating: 4.9,
      boats: 3,
    },
  ])

  const [selectedFranchisee, setSelectedFranchisee] = useState<FranchiseeManagement | null>(null)
  const [toast, setToast] = useState('')

  const [showNewFranchiseeForm, setShowNewFranchiseeForm] = useState(false)
  const [newFranchisee, setNewFranchisee] = useState({
    name: '',
    owner: '',
    city: '',
    province: '',
    email: '',
    phone: '',
  })

  // Solicitudes de franquicia
  const [leads, setLeads] = useState<FranchiseLead[]>([])
  const [leadsLoading, setLeadsLoading] = useState(true)
  const [leadsError, setLeadsError] = useState('')
  const [selectedLead, setSelectedLead] = useState<FranchiseLead | null>(null)
  const [savingLead, setSavingLead] = useState(false)

  useEffect(() => {
    fetch('/api/franchise-leads')
      .then(async (res) => {
        if (!res.ok) throw new Error('No se pudieron cargar las solicitudes')
        const data = await res.json()
        setLeads(data.leads || [])
      })
      .catch((err) => setLeadsError(err.message))
      .finally(() => setLeadsLoading(false))
  }, [])

  const showToast = (message: string) => {
    setToast(message)
    setTimeout(() => setToast(''), 3000)
  }

  const handleAddFranchisee = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Integrar con backend real para crear nuevo franquiciado
    setFranchisees((prev) => [
      ...prev,
      {
        id: newFranchisee.name.toLowerCase().replace(/\s+/g, '-'),
        name: newFranchisee.name,
        owner: newFranchisee.owner,
        city: newFranchisee.city,
        province: newFranchisee.province,
        email: newFranchisee.email,
        phone: newFranchisee.phone,
        status: 'active',
        reservationsThisMonth: 0,
        revenueThisMonth: 0,
        rating: 0,
        boats: 0,
      },
    ])
    showToast(`Franquicia "${newFranchisee.name}" creada`)
    setShowNewFranchiseeForm(false)
    setNewFranchisee({ name: '', owner: '', city: '', province: '', email: '', phone: '' })
  }

  const handleResetPassword = (f: FranchiseeManagement) => {
    // TODO: Integrar con backend real + lib/emails.ts sendPasswordResetEmail
    showToast(`Contraseña reseteada para ${f.name}. Se ha simulado el envío de email a ${f.email}.`)
  }

  const handleToggleSuspend = (f: FranchiseeManagement) => {
    setFranchisees((prev) =>
      prev.map((x) =>
        x.id === f.id ? { ...x, status: x.status === 'suspended' ? 'active' : 'suspended' } : x
      )
    )
    showToast(f.status === 'suspended' ? `${f.name} reactivada` : `${f.name} suspendida`)
  }

  const handleDeactivate = (f: FranchiseeManagement) => {
    if (!confirm(`¿Dar de baja a ${f.name}? Esta acción se puede revertir manualmente.`)) return
    setFranchisees((prev) => prev.map((x) => (x.id === f.id ? { ...x, status: 'inactive' } : x)))
    showToast(`${f.name} dada de baja`)
  }

  const updateLead = async (id: string, patch: Partial<FranchiseLead>) => {
    setSavingLead(true)
    try {
      const res = await fetch(`/api/franchise-leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      })
      if (!res.ok) throw new Error('No se pudo guardar')
      const data = await res.json()
      setLeads((prev) => prev.map((l) => (l.id === id ? data.lead : l)))
      setSelectedLead(data.lead)
      showToast('Solicitud actualizada')
    } catch {
      showToast('Error guardando los cambios')
    } finally {
      setSavingLead(false)
    }
  }

  const mockAnalytics = {
    totalReservations: 247,
    totalRevenue: 14820,
    topFranchisee: 'Marín (89 reservas)',
    monthOverMonth: 12.5,
  }

  return (
    <div className="min-h-screen bg-maragota-light-gray">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-maragota-black text-white px-6 py-3 rounded-lg shadow-lg">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="bg-maragota-black text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-3xl">👑</span>
            <div>
              <h1 className="text-2xl font-bold">Panel Administrador</h1>
              <p className="text-gray-400 text-sm">Geno - Control total de Maragota Boats</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('franchisees')}
              className={`py-4 px-4 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'franchisees'
                  ? 'text-maragota-orange border-maragota-orange'
                  : 'text-gray-600 border-transparent hover:text-maragota-orange'
              }`}
            >
              🏢 Franquicias
            </button>
            <button
              onClick={() => setActiveTab('leads')}
              className={`py-4 px-4 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'leads'
                  ? 'text-maragota-orange border-maragota-orange'
                  : 'text-gray-600 border-transparent hover:text-maragota-orange'
              }`}
            >
              📥 Solicitudes {leads.length > 0 && `(${leads.length})`}
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-4 px-4 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'analytics'
                  ? 'text-maragota-orange border-maragota-orange'
                  : 'text-gray-600 border-transparent hover:text-maragota-orange'
              }`}
            >
              📊 Analytics
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`py-4 px-4 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'reports'
                  ? 'text-maragota-orange border-maragota-orange'
                  : 'text-gray-600 border-transparent hover:text-maragota-orange'
              }`}
            >
              📈 Reportes
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Franchisees Tab */}
        {activeTab === 'franchisees' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-maragota-black">Gestión de Franquicias</h2>
              <button
                onClick={() => setShowNewFranchiseeForm(!showNewFranchiseeForm)}
                className="btn-primary"
              >
                + Nueva franquicia
              </button>
            </div>

            {showNewFranchiseeForm && (
              <form onSubmit={handleAddFranchisee} className="card">
                <h3 className="text-lg font-bold text-maragota-black mb-4">Registrar nueva franquicia</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Nombre de la empresa"
                    value={newFranchisee.name}
                    onChange={(e) => setNewFranchisee({ ...newFranchisee, name: e.target.value })}
                    className="input-field"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Nombre del propietario"
                    value={newFranchisee.owner}
                    onChange={(e) => setNewFranchisee({ ...newFranchisee, owner: e.target.value })}
                    className="input-field"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Ciudad"
                    value={newFranchisee.city}
                    onChange={(e) => setNewFranchisee({ ...newFranchisee, city: e.target.value })}
                    className="input-field"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Provincia"
                    value={newFranchisee.province}
                    onChange={(e) => setNewFranchisee({ ...newFranchisee, province: e.target.value })}
                    className="input-field"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={newFranchisee.email}
                    onChange={(e) => setNewFranchisee({ ...newFranchisee, email: e.target.value })}
                    className="input-field"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    value={newFranchisee.phone}
                    onChange={(e) => setNewFranchisee({ ...newFranchisee, phone: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="btn-primary flex-1">
                    Crear franquicia
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewFranchiseeForm(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}

            {/* Franchisees List */}
            <div className="space-y-4">
              {franchisees.map((franchisee) => (
                <div key={franchisee.id} className="card">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-maragota-black">{franchisee.name}</h3>
                      <p className="text-sm text-gray-600">{franchisee.owner}</p>
                      <p className="text-sm text-gray-500">{franchisee.city}, {franchisee.province}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold ${
                        franchisee.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : franchisee.status === 'suspended'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {franchisee.status === 'active' ? '✓ Activo' : franchisee.status === 'suspended' ? '⏸ Suspendido' : 'Inactivo'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pb-4 border-b">
                    <div>
                      <p className="text-xs text-gray-600">Email</p>
                      <p className="font-semibold text-sm">{franchisee.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Teléfono</p>
                      <a href={`tel:${franchisee.phone}`} className="font-semibold text-sm text-maragota-orange hover:underline">
                        {franchisee.phone}
                      </a>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Reservas este mes</p>
                      <p className="font-semibold text-sm">{franchisee.reservationsThisMonth}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Ingresos este mes</p>
                      <p className="font-semibold text-sm text-maragota-orange">{franchisee.revenueThisMonth.toLocaleString('es-ES')}€</p>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <a
                      href={whatsappLink(franchisee.phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 flex items-center gap-1"
                    >
                      💬 WhatsApp
                    </a>
                    <button
                      onClick={() => handleResetPassword(franchisee)}
                      className="text-sm px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    >
                      Reset Password
                    </button>
                    <button
                      onClick={() => handleToggleSuspend(franchisee)}
                      className="text-sm px-4 py-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
                    >
                      {franchisee.status === 'suspended' ? 'Reactivar' : 'Suspender'}
                    </button>
                    <button
                      onClick={() => handleDeactivate(franchisee)}
                      className="text-sm px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
                    >
                      Dar de baja
                    </button>
                    <button
                      onClick={() => setSelectedFranchisee(franchisee)}
                      className="text-sm px-4 py-2 bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
                    >
                      Ver detalles
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Leads / Solicitudes Tab */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-maragota-black">Solicitudes de Franquicia</h2>
              <p className="text-gray-600 text-sm mt-1">
                Gancho de venta: barco <strong>Poly Made</strong> de pesca incluido en la franquicia —
                &ldquo;te lo damos todo, solo tienes que salir a pescar&rdquo;.
              </p>
            </div>

            {leadsLoading && <p className="text-gray-500">Cargando solicitudes...</p>}
            {leadsError && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">{leadsError}</div>
            )}
            {!leadsLoading && !leadsError && leads.length === 0 && (
              <div className="card text-center py-12">
                <p className="text-gray-600">Todavía no hay solicitudes de franquicia.</p>
                <p className="text-sm text-gray-500 mt-1">
                  Aparecerán aquí en cuanto alguien rellene el formulario en /franquiciate.
                </p>
              </div>
            )}

            <div className="space-y-4">
              {leads.map((lead) => (
                <div key={lead.id} className="card">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-maragota-black">{lead.fullName}</h3>
                      <p className="text-sm text-gray-500">📍 {lead.city}, {lead.province}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap ${LEAD_STATUS_COLORS[lead.status]}`}>
                      {LEAD_STATUS_LABELS[lead.status]}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-xs text-gray-600">Email</p>
                      <p className="font-semibold">{lead.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Teléfono</p>
                      <a href={`tel:${lead.phone}`} className="font-semibold text-maragota-orange hover:underline">
                        {lead.phone}
                      </a>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Recibida</p>
                      <p className="font-semibold">{new Date(lead.createdAt).toLocaleDateString('es-ES')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Negociación completa</p>
                      <p className="font-semibold">
                        {lead.negociacionCompleta === 'si' ? '✓ Sí' : lead.negociacionCompleta === 'no' ? '✕ No' : '⏳ Pendiente'}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <a
                      href={whatsappLink(lead.phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200"
                    >
                      💬 WhatsApp
                    </a>
                    <button
                      onClick={() => setSelectedLead(lead)}
                      className="text-sm px-4 py-2 bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
                    >
                      Gestionar negociación
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-maragota-black">Analytics Global</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="card text-center">
                <p className="text-sm text-gray-600 mb-2">Total Reservas</p>
                <p className="text-4xl font-bold text-maragota-orange">{mockAnalytics.totalReservations}</p>
                <p className="text-xs text-green-600 mt-2">↑ +12.5% vs mes anterior</p>
              </div>
              <div className="card text-center">
                <p className="text-sm text-gray-600 mb-2">Ingresos Totales</p>
                <p className="text-4xl font-bold text-maragota-black">{mockAnalytics.totalRevenue.toLocaleString('es-ES')}€</p>
                <p className="text-xs text-green-600 mt-2">↑ +12.5% vs mes anterior</p>
              </div>
              <div className="card text-center">
                <p className="text-sm text-gray-600 mb-2">Franquicia Top</p>
                <p className="text-lg font-bold text-maragota-black">{mockAnalytics.topFranchisee}</p>
                <p className="text-xs text-gray-500 mt-2">Mejor rendimiento</p>
              </div>
              <div className="card text-center">
                <p className="text-sm text-gray-600 mb-2">Provincia Top</p>
                <p className="text-lg font-bold text-maragota-black">Pontevedra</p>
                <p className="text-xs text-gray-500 mt-2">247 reservas</p>
              </div>
            </div>

            {/* Ranking de franquicias */}
            <div className="card">
              <h3 className="text-lg font-bold text-maragota-black mb-4">🏆 Ranking de Franquicias (este mes)</h3>
              <div className="space-y-3">
                {FRANCHISE_RANKING.map((f, i) => (
                  <div key={f.name} className="flex items-center gap-4">
                    <span className="text-xl font-bold text-gray-400 w-6">{i + 1}</span>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-semibold text-sm">{f.name}</span>
                        <span className="text-sm text-gray-600">{f.reservations} reservas · {f.revenue.toLocaleString('es-ES')}€ · ⭐ {f.rating}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded">
                        <div
                          className="h-full bg-maragota-orange rounded"
                          style={{ width: `${(f.reservations / FRANCHISE_RANKING[0].reservations) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Próximas reservas */}
              <div className="card">
                <h3 className="text-lg font-bold text-maragota-black mb-4">📅 Próximas Reservas</h3>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {UPCOMING_RESERVATIONS.map((r) => (
                    <div key={r.id} className="flex justify-between items-center text-sm border-b pb-2">
                      <div>
                        <p className="font-semibold">{r.customer}</p>
                        <p className="text-xs text-gray-500">{r.boat} · {r.franchisee}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{new Date(r.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}</p>
                        <p className="text-xs text-gray-500">{r.time} · {r.numPeople}p</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reservas pasadas */}
              <div className="card">
                <h3 className="text-lg font-bold text-maragota-black mb-4">✓ Reservas Completadas</h3>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {PAST_RESERVATIONS.map((r) => (
                    <div key={r.id} className="flex justify-between items-center text-sm border-b pb-2">
                      <div>
                        <p className="font-semibold">{r.customer}</p>
                        <p className="text-xs text-gray-500">{r.boat} · {r.franchisee}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{new Date(r.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}</p>
                        <p className="text-xs text-maragota-orange font-semibold">{r.total}€</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold text-maragota-black mb-4">Ingresos por Provincia</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Pontevedra</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-200 rounded">
                      <div className="w-full h-full bg-maragota-orange rounded"></div>
                    </div>
                    <span className="font-bold text-sm">14.820€</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-maragota-black">Reportes y Análisis</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Report Configuration */}
              <div className="card">
                <h3 className="text-lg font-bold text-maragota-black mb-4">⚙️ Configurar Reportes Automáticos</h3>
                <div className="space-y-4">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                    <span className="text-sm">Enviar reporte mensual por email</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                    <span className="text-sm">Alertas de anomalías (Red Flags)</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                    <span className="text-sm">Comparación con años anteriores</span>
                  </label>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Día del mes para enviar reporte:</label>
                    <select className="input-field" defaultValue="28">
                      <option>1</option>
                      <option>15</option>
                      <option>28</option>
                    </select>
                  </div>
                  <button onClick={() => showToast('Configuración guardada')} className="btn-primary w-full">
                    Guardar configuración
                  </button>
                </div>
              </div>

              {/* Red Flags */}
              <div className="card">
                <h3 className="text-lg font-bold text-maragota-black mb-4">🚩 Alertas Detectadas</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                    <p className="font-semibold text-yellow-900 text-sm">Inactividad - Portonovo</p>
                    <p className="text-xs text-yellow-700 mt-1">
                      Reservas 62% por debajo de la media de la red. Requiere seguimiento.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Report Preview */}
            <div className="card">
              <h3 className="text-lg font-bold text-maragota-black mb-4">📊 Último Reporte Mensual (Septiembre 2026)</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <p className="text-xs text-gray-600">Reservas</p>
                  <p className="text-2xl font-bold">247</p>
                  <p className="text-xs text-green-600">↑ +12.5%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Ingresos</p>
                  <p className="text-2xl font-bold">14.8k€</p>
                  <p className="text-xs text-green-600">↑ +12.5%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Ticket promedio</p>
                  <p className="text-2xl font-bold">60€</p>
                  <p className="text-xs text-gray-500">Sin cambios</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Personas promedio</p>
                  <p className="text-2xl font-bold">2.1</p>
                  <p className="text-xs text-gray-500">Sin cambios</p>
                </div>
              </div>

              <div className="bg-maragota-light-gray p-4 rounded-lg mb-6">
                <p className="font-semibold text-maragota-black mb-3">Comparativa con Septiembre 2025:</p>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• Reservas: 219 → 247 (+12.8%)</li>
                  <li>• Ingresos: 13.1k€ → 14.8k€ (+13.0%)</li>
                  <li>• Mejor mes: Marín (89 reservas)</li>
                </ul>
              </div>

              <button onClick={() => showToast('Reporte enviado por email')} className="btn-primary">
                Enviar reporte ahora
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Franchisee details modal */}
      {selectedFranchisee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-maragota-black">{selectedFranchisee.name}</h3>
              <button onClick={() => setSelectedFranchisee(null)} className="text-2xl leading-none text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Propietario</span>
                <span className="font-semibold">{selectedFranchisee.owner}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Ubicación</span>
                <span className="font-semibold">{selectedFranchisee.city}, {selectedFranchisee.province}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Email</span>
                <a href={`mailto:${selectedFranchisee.email}`} className="font-semibold text-maragota-orange hover:underline">
                  {selectedFranchisee.email}
                </a>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Teléfono</span>
                <a href={`tel:${selectedFranchisee.phone}`} className="font-semibold text-maragota-orange hover:underline">
                  {selectedFranchisee.phone}
                </a>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Barcos</span>
                <span className="font-semibold">{selectedFranchisee.boats}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Reservas este mes</span>
                <span className="font-semibold">{selectedFranchisee.reservationsThisMonth}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Ingresos este mes</span>
                <span className="font-semibold text-maragota-orange">{selectedFranchisee.revenueThisMonth.toLocaleString('es-ES')}€</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Rating</span>
                <span className="font-semibold">⭐ {selectedFranchisee.rating}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estado</span>
                <span className="font-semibold">{selectedFranchisee.status === 'active' ? 'Activo' : selectedFranchisee.status === 'suspended' ? 'Suspendido' : 'Inactivo'}</span>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <a href={whatsappLink(selectedFranchisee.phone)} target="_blank" rel="noopener noreferrer" className="btn-primary flex-1 text-center">
                💬 WhatsApp
              </a>
              <a href={`tel:${selectedFranchisee.phone}`} className="btn-secondary flex-1 text-center">
                📞 Llamar
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Lead negotiation modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-maragota-black">{selectedLead.fullName}</h3>
                <p className="text-sm text-gray-500">📍 {selectedLead.city}, {selectedLead.province}</p>
              </div>
              <button onClick={() => setSelectedLead(null)} className="text-2xl leading-none text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            {/* Datos del solicitante */}
            <div className="bg-maragota-light-gray p-4 rounded-lg mb-4 text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Email</span>
                <a href={`mailto:${selectedLead.email}`} className="font-semibold text-maragota-orange hover:underline">{selectedLead.email}</a>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Teléfono</span>
                <a href={`tel:${selectedLead.phone}`} className="font-semibold text-maragota-orange hover:underline">{selectedLead.phone}</a>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Recibida</span>
                <span className="font-semibold">{new Date(selectedLead.createdAt).toLocaleString('es-ES')}</span>
              </div>
              {selectedLead.experience && (
                <div>
                  <span className="text-gray-600">Experiencia / barco propio:</span>
                  <p className="font-semibold">{selectedLead.experience}</p>
                </div>
              )}
              {selectedLead.message && (
                <div>
                  <span className="text-gray-600">Mensaje:</span>
                  <p className="font-semibold">{selectedLead.message}</p>
                </div>
              )}
              <a href={whatsappLink(selectedLead.phone)} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-sm px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200">
                💬 Escribir por WhatsApp
              </a>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg mb-4 text-xs text-blue-900">
              🚤 Recuerda ofrecer el barco <strong>Poly Made</strong> de pesca como parte de la franquicia
              (&ldquo;te lo damos todo, solo tienes que salir a pescar&rdquo;).
            </div>

            {/* Seguimiento / negociación */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-maragota-black mb-2">Estado del seguimiento</label>
                <select
                  className="input-field"
                  value={selectedLead.status}
                  onChange={(e) => updateLead(selectedLead.id, { status: e.target.value as FranchiseLead['status'] })}
                >
                  {Object.entries(LEAD_STATUS_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedLead.primerContacto}
                    onChange={(e) => updateLead(selectedLead.id, {
                      primerContacto: e.target.checked,
                      primerContactoFecha: e.target.checked ? new Date().toISOString() : '',
                    })}
                    className="w-4 h-4"
                  />
                  Primer contacto realizado
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedLead.barcoOfrecido}
                    onChange={(e) => updateLead(selectedLead.id, { barcoOfrecido: e.target.checked })}
                    className="w-4 h-4"
                  />
                  Oferta del barco Poly Made comunicada
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedLead.documentosFirmados}
                    onChange={(e) => updateLead(selectedLead.id, { documentosFirmados: e.target.checked })}
                    className="w-4 h-4"
                  />
                  Documentos firmados
                </label>
              </div>

              <div>
                <label className="block text-sm font-semibold text-maragota-black mb-2">Negociación completa</label>
                <select
                  className="input-field"
                  value={selectedLead.negociacionCompleta}
                  onChange={(e) => updateLead(selectedLead.id, { negociacionCompleta: e.target.value as FranchiseLead['negociacionCompleta'] })}
                >
                  <option value="pendiente">⏳ Pendiente</option>
                  <option value="si">✓ Sí</option>
                  <option value="no">✕ No</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-maragota-black mb-2">Tiempo estimado del encargo</label>
                  <input
                    type="text"
                    className="input-field"
                    defaultValue={selectedLead.tiempoEstimado}
                    onBlur={(e) => updateLead(selectedLead.id, { tiempoEstimado: e.target.value })}
                    placeholder="Ej. 2 semanas"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-maragota-black mb-2">Tiempo de implementación (tras enviar el barco)</label>
                  <input
                    type="text"
                    className="input-field"
                    defaultValue={selectedLead.tiempoImplementacion}
                    onBlur={(e) => updateLead(selectedLead.id, { tiempoImplementacion: e.target.value })}
                    placeholder="Ej. 1 semana"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-maragota-black mb-2">Notas de la negociación</label>
                <textarea
                  className="input-field"
                  rows={4}
                  defaultValue={selectedLead.notas}
                  onBlur={(e) => updateLead(selectedLead.id, { notas: e.target.value })}
                  placeholder="Registro de llamadas, acuerdos, condiciones..."
                />
              </div>

              {savingLead && <p className="text-xs text-gray-500">Guardando...</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
