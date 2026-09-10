'use client'

import { useEffect, useState } from 'react'
import { getFranchiseeById, getAllFranchisees, FranchiseeSession } from '@/lib/dummyData'
import { whatsappLink } from '@/lib/whatsapp'
import AdminPanel from './AdminPanel'

// Fecha "hoy" fija de referencia para que la demo de "Hoy y mañana" tenga
// sentido con los datos de ejemplo, en vez de depender del reloj real.
const TODAY = '2026-09-10'

function addDays(dateStr: string, days: number): string {
  const d = new Date(`${dateStr}T00:00:00`)
  d.setDate(d.getDate() + days)
  // OJO: no usar toISOString() aquí — convierte a UTC y en zonas horarias
  // adelantadas a UTC (como España) puede devolver el mismo día de nuevo.
  // Construimos el string a partir de los componentes locales.
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

// Historial de ingresos — solo de esta franquicia, nunca de la red completa
// ni de otros franquiciados.
const REVENUE_HISTORY = [
  { month: 'Jun', revenue: 540 },
  { month: 'Jul', revenue: 690 },
  { month: 'Ago', revenue: 615 },
  { month: 'Sep', revenue: 720 },
]

interface FranchiseeDashboardProps {
  session: FranchiseeSession
  onLogout: () => void
}

type TabType = 'overview' | 'boats' | 'reservations' | 'analytics' | 'settings' | 'franchisees'

export default function FranchiseeDashboard({
  session,
  onLogout,
}: FranchiseeDashboardProps) {
  // Si es admin (Geno), mostrar panel admin especial
  if (session.isAdmin) {
    return <AdminPanel onLogout={onLogout} />
  }

  // El operario solo tiene acceso a gestión operativa pura (reservas y barcos),
  // nunca a ingresos, analytics ni configuración.
  const isOperario = session.role === 'operario'

  const [activeTab, setActiveTab] = useState<TabType>(isOperario ? 'reservations' : 'overview')
  const [, setSelectedBoatId] = useState<string | null>(null)
  const [, setShowEditModal] = useState(false)

  const franchisee = session.isAdmin ? null : getFranchiseeById(session.franchiseeId)
  const allFranchisees = session.isAdmin ? getAllFranchisees() : []

  const boats = franchisee?.boats || []

  // Mock reservations data
  const [mockReservations, setMockReservations] = useState([
    {
      id: '1',
      boatId: boats[0]?.id,
      customerName: 'Juan García López',
      customerEmail: 'juan@example.com',
      customerPhone: '+34 611 222 111',
      date: TODAY,
      time: '08:00',
      numPeople: 4,
      totalPrice: 60,
      status: 'confirmed',
    },
    {
      id: '2',
      boatId: boats[0]?.id,
      customerName: 'María Rodríguez',
      customerEmail: 'maria@example.com',
      customerPhone: '+34 622 333 222',
      date: addDays(TODAY, 1),
      time: '14:00',
      numPeople: 2,
      totalPrice: 60,
      status: 'pending',
    },
    {
      id: '3',
      boatId: boats[0]?.id,
      customerName: 'Diego Souto',
      customerEmail: 'diego@example.com',
      customerPhone: '+34 633 444 333',
      date: addDays(TODAY, 5),
      time: '10:00',
      numPeople: 3,
      totalPrice: 60,
      status: 'confirmed',
    },
  ])

  const [reschedulingId, setReschedulingId] = useState<string | null>(null)
  const [rescheduleDate, setRescheduleDate] = useState('')
  const [rescheduleTime, setRescheduleTime] = useState('')

  const [toast, setToast] = useState('')
  const showToast = (message: string) => {
    setToast(message)
    setTimeout(() => setToast(''), 3000)
  }

  // Ajustes persistidos: URL de webhook del gestor de reservas externo (si
  // lo tienen) y días bloqueados.
  const [webhookUrl, setWebhookUrl] = useState('')
  const [blockedDates, setBlockedDates] = useState<string[]>([])
  const [newBlockedDate, setNewBlockedDate] = useState('')
  const [settingsLoaded, setSettingsLoaded] = useState(false)

  useEffect(() => {
    if (!session.franchiseeId) return
    fetch(`/api/franchisee-settings?franchiseeId=${session.franchiseeId}`)
      .then((res) => res.json())
      .then((data) => {
        setWebhookUrl(data.webhookUrl || '')
        setBlockedDates(data.blockedDates || [])
      })
      .catch(() => {})
      .finally(() => setSettingsLoaded(true))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const saveSettings = async (patch: { webhookUrl?: string; blockedDates?: string[] }) => {
    try {
      await fetch('/api/franchisee-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ franchiseeId: session.franchiseeId, ...patch }),
      })
      showToast('Guardado')
    } catch {
      showToast('Error guardando los ajustes')
    }
  }

  const handleAddBlockedDate = () => {
    if (!newBlockedDate || blockedDates.includes(newBlockedDate)) return
    const updated = [...blockedDates, newBlockedDate].sort()
    setBlockedDates(updated)
    setNewBlockedDate('')
    saveSettings({ blockedDates: updated })
  }

  const handleRemoveBlockedDate = (date: string) => {
    const updated = blockedDates.filter((d) => d !== date)
    setBlockedDates(updated)
    saveSettings({ blockedDates: updated })
  }

  const handleSaveWebhook = () => {
    saveSettings({ webhookUrl })
  }

  const todayAndTomorrow = mockReservations.filter(
    (r) => r.date === TODAY || r.date === addDays(TODAY, 1)
  )

  const startReschedule = (id: string, currentDate: string, currentTime: string) => {
    setReschedulingId(id)
    setRescheduleDate(currentDate)
    setRescheduleTime(currentTime)
  }

  const confirmReschedule = (id: string) => {
    setMockReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, date: rescheduleDate, time: rescheduleTime } : r))
    )
    // TODO: Integrar con backend real + email al cliente avisando del cambio (lib/emails.ts)
    setReschedulingId(null)
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
            <span className="text-3xl">🔑</span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{session.companyName}</h1>
                {isOperario && (
                  <span className="text-xs font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                    OPERARIO
                  </span>
                )}
              </div>
              <p className="text-gray-400 text-sm">{session.email}</p>
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

      {/* Navigation Tabs */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8 overflow-x-auto">
            {!isOperario && (
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-4 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'text-maragota-orange border-maragota-orange'
                    : 'text-gray-600 border-transparent hover:text-maragota-orange'
                }`}
              >
                📊 Resumen
              </button>
            )}
            <button
              onClick={() => setActiveTab('boats')}
              className={`py-4 px-4 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'boats'
                  ? 'text-maragota-orange border-maragota-orange'
                  : 'text-gray-600 border-transparent hover:text-maragota-orange'
              }`}
            >
              🚤 Barcos
            </button>
            <button
              onClick={() => setActiveTab('reservations')}
              className={`py-4 px-4 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'reservations'
                  ? 'text-maragota-orange border-maragota-orange'
                  : 'text-gray-600 border-transparent hover:text-maragota-orange'
              }`}
            >
              📅 Reservas
            </button>
            {session.isAdmin && (
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
            )}
            {!isOperario && (
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-4 px-4 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'analytics'
                    ? 'text-maragota-orange border-maragota-orange'
                    : 'text-gray-600 border-transparent hover:text-maragota-orange'
                }`}
              >
                📈 Analytics
              </button>
            )}
            {!isOperario && (
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-4 px-4 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'settings'
                    ? 'text-maragota-orange border-maragota-orange'
                    : 'text-gray-600 border-transparent hover:text-maragota-orange'
                }`}
              >
                ⚙️ Configuración
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && !isOperario && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-maragota-black">Bienvenido, {session.companyName}</h2>

            {!session.isAdmin && franchisee && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company Info Card */}
                <div className="card">
                  <h3 className="text-lg font-bold text-maragota-black mb-4">📍 Información de tu negocio</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-semibold">Empresa:</span> {franchisee.companyName}
                    </p>
                    <p>
                      <span className="font-semibold">Propietario:</span> {franchisee.owner}
                    </p>
                    <p>
                      <span className="font-semibold">Ubicación:</span> {franchisee.city}, {franchisee.province}
                    </p>
                    <p>
                      <span className="font-semibold">Teléfono:</span> {franchisee.phone}
                    </p>
                    <p>
                      <span className="font-semibold">Email:</span> {franchisee.email}
                    </p>
                  </div>
                </div>

                {/* Stats Card */}
                <div className="card">
                  <h3 className="text-lg font-bold text-maragota-black mb-4">📊 Estadísticas</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total de barcos:</span>
                      <span className="text-2xl font-bold text-maragota-orange">{boats.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Sitios disponibles:</span>
                      <span className="text-2xl font-bold text-green-600">
                        {boats.reduce((acc, b) => acc + b.availableSeats, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Reservas este mes:</span>
                      <span className="text-2xl font-bold text-blue-600">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Ingresos totales:</span>
                      <span className="text-2xl font-bold text-maragota-orange">720€</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!session.isAdmin && todayAndTomorrow.length > 0 && (
              <div className="card border-l-4 border-maragota-orange">
                <h3 className="text-lg font-bold text-maragota-black mb-4">📅 Hoy y mañana</h3>
                <div className="space-y-3">
                  {todayAndTomorrow.map((r) => (
                    <div key={r.id} className="flex justify-between items-center text-sm border-b pb-2">
                      <div>
                        <p className="font-semibold">{r.customerName}</p>
                        <p className="text-xs text-gray-500">
                          {r.date === TODAY ? 'Hoy' : 'Mañana'} · {r.time} · {r.numPeople} personas
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <a href={`tel:${r.customerPhone}`} className="text-xs px-3 py-1.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                          📞
                        </a>
                        <a href={whatsappLink(r.customerPhone)} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 bg-green-100 text-green-700 rounded hover:bg-green-200">
                          💬
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!session.isAdmin && (
              <div className="card">
                <h3 className="text-lg font-bold text-maragota-black mb-4">💶 Tus ingresos (solo esta franquicia)</h3>
                <div className="flex items-end gap-4 h-32">
                  {REVENUE_HISTORY.map((m) => {
                    const max = Math.max(...REVENUE_HISTORY.map((x) => x.revenue))
                    return (
                      <div key={m.month} className="flex-1 flex flex-col items-center justify-end h-full gap-1">
                        <span className="text-xs font-semibold text-maragota-orange">{m.revenue}€</span>
                        <div
                          className="w-full bg-maragota-orange rounded-t"
                          style={{ height: `${(m.revenue / max) * 100}%` }}
                        />
                        <span className="text-xs text-gray-500">{m.month}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {session.isAdmin && (
              <div className="card">
                <h3 className="text-lg font-bold text-maragota-black mb-4">📋 Panel de Administrador</h3>
                <p className="text-gray-600 mb-4">Tienes acceso a todas las franquicias de Maragota Boats.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-maragota-light-gray p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Total Franquicias</p>
                    <p className="text-3xl font-bold text-maragota-orange">{allFranchisees.length}</p>
                  </div>
                  <div className="bg-maragota-light-gray p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Total Barcos</p>
                    <p className="text-3xl font-bold text-maragota-orange">
                      {allFranchisees.reduce((acc, f) => acc + f.boats.length, 0)}
                    </p>
                  </div>
                  <div className="bg-maragota-light-gray p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Sitios Totales</p>
                    <p className="text-3xl font-bold text-maragota-orange">
                      {allFranchisees.reduce((acc, f) => acc + f.boats.reduce((b, boat) => b + boat.availableSeats, 0), 0)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Boats Tab */}
        {activeTab === 'boats' && !session.isAdmin && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-maragota-black">Gestionar Barcos</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {boats.map((boat) => (
                <div key={boat.id} className="card">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-maragota-black">{boat.name}</h3>
                      <p className="text-sm text-gray-600">ID: {boat.id}</p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedBoatId(boat.id)
                        setShowEditModal(true)
                      }}
                      className="text-maragota-orange hover:text-maragota-dark-orange font-semibold"
                    >
                      Editar
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Sitios:</span>
                      <span className="font-semibold">{boat.availableSeats}/{boat.totalSeats}</span>
                    </div>

                    <div className="flex gap-1">
                      {Array.from({ length: boat.totalSeats }).map((_, i) => (
                        <div
                          key={i}
                          className={`flex-1 h-6 rounded text-xs flex items-center justify-center font-bold ${
                            i < boat.availableSeats
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-300 text-gray-600'
                          }`}
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-sm text-gray-600">Rating:</span>
                      <span className="font-bold">
                        {boat.rating} ⭐ ({boat.reviews} reviews)
                      </span>
                    </div>

                    <button className="btn-secondary w-full text-sm">Cambiar disponibilidad</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reservations Tab */}
        {activeTab === 'reservations' && !session.isAdmin && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-maragota-black">Reservas Recientes</h2>

            <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-xs text-blue-900">
              💡 Puedes cambiar la fecha u hora de una reserva si lo consideras necesario (mal tiempo,
              disponibilidad del barco, etc). Esta opción es a tu criterio profesional y no se ofrece
              públicamente a los clientes — avísales tú directamente del cambio.
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-white border-b-2 border-maragota-light-gray">
                    <th className="text-left py-4 px-4 font-bold text-maragota-black">Cliente</th>
                    <th className="text-left py-4 px-4 font-bold text-maragota-black">Contacto</th>
                    <th className="text-left py-4 px-4 font-bold text-maragota-black">Barco</th>
                    <th className="text-left py-4 px-4 font-bold text-maragota-black">Fecha</th>
                    <th className="text-left py-4 px-4 font-bold text-maragota-black">Personas</th>
                    <th className="text-left py-4 px-4 font-bold text-maragota-black">Total</th>
                    <th className="text-left py-4 px-4 font-bold text-maragota-black">Estado</th>
                    <th className="text-left py-4 px-4 font-bold text-maragota-black"></th>
                  </tr>
                </thead>
                <tbody>
                  {mockReservations.map((res) => (
                    <tr key={res.id} className="border-b hover:bg-maragota-light-gray">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-semibold text-maragota-black">{res.customerName}</p>
                          <p className="text-xs text-gray-600">{res.customerEmail}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-1">
                          <a href={`tel:${res.customerPhone}`} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200" title="Llamar">
                            📞
                          </a>
                          <a href={whatsappLink(res.customerPhone)} target="_blank" rel="noopener noreferrer" className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200" title="WhatsApp">
                            💬
                          </a>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{boats.find((b) => b.id === res.boatId)?.name}</td>
                      <td className="py-4 px-4 text-gray-600">
                        {reschedulingId === res.id ? (
                          <div className="flex gap-2 items-center">
                            <input
                              type="date"
                              value={rescheduleDate}
                              onChange={(e) => setRescheduleDate(e.target.value)}
                              className="input-field text-xs py-1"
                            />
                            <input
                              type="time"
                              value={rescheduleTime}
                              onChange={(e) => setRescheduleTime(e.target.value)}
                              className="input-field text-xs py-1"
                            />
                          </div>
                        ) : (
                          <>{new Date(res.date).toLocaleDateString('es-ES')} {res.time}</>
                        )}
                      </td>
                      <td className="py-4 px-4 text-gray-600">{res.numPeople}</td>
                      <td className="py-4 px-4 font-bold text-maragota-orange">{res.totalPrice}€</td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            res.status === 'confirmed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {res.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {reschedulingId === res.id ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => confirmReschedule(res.id)}
                              className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
                            >
                              Guardar
                            </button>
                            <button
                              onClick={() => setReschedulingId(null)}
                              className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                            >
                              Cancelar
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => startReschedule(res.id, res.date, res.time)}
                            className="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
                          >
                            Cambiar fecha
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bloquear días */}
            <div className="card">
              <h3 className="text-lg font-bold text-maragota-black mb-2">🚫 Bloquear días</h3>
              <p className="text-xs text-gray-500 mb-4">
                Marca días en los que no puedes salir (vacaciones, mantenimiento del barco, mal
                tiempo previsto). Es una anotación operativa para vosotros — la búsqueda pública
                todavía no filtra por estos días.
              </p>
              <div className="flex gap-2 mb-4">
                <input
                  type="date"
                  value={newBlockedDate}
                  onChange={(e) => setNewBlockedDate(e.target.value)}
                  className="input-field"
                />
                <button onClick={handleAddBlockedDate} className="btn-primary whitespace-nowrap">
                  Bloquear día
                </button>
              </div>
              {settingsLoaded && blockedDates.length === 0 && (
                <p className="text-sm text-gray-500">No tienes días bloqueados.</p>
              )}
              <div className="flex flex-wrap gap-2">
                {blockedDates.map((date) => (
                  <span key={date} className="flex items-center gap-2 text-sm bg-red-100 text-red-700 px-3 py-1.5 rounded-full">
                    {new Date(`${date}T00:00:00`).toLocaleDateString('es-ES')}
                    <button onClick={() => handleRemoveBlockedDate(date)} className="hover:text-red-900 font-bold">
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Franchisees Tab (Admin only) */}
        {activeTab === 'franchisees' && session.isAdmin && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-maragota-black">Todas las Franquicias</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allFranchisees.map((f) => (
                <div key={f.id} className="card">
                  <h3 className="text-xl font-bold text-maragota-black mb-2">{f.companyName}</h3>
                  <p className="text-sm text-gray-600 mb-4">{f.owner}</p>

                  <div className="space-y-2 text-sm mb-4">
                    <p>
                      <span className="font-semibold">Ubicación:</span> {f.city}, {f.province}
                    </p>
                    <p>
                      <span className="font-semibold">Postal:</span> {f.postalCode}
                    </p>
                    <p>
                      <span className="font-semibold">Teléfono:</span> {f.phone}
                    </p>
                    <p>
                      <span className="font-semibold">Barcos:</span> {f.boats.length}
                    </p>
                    <p>
                      <span className="font-semibold">Sitios disponibles:</span> {f.boats.reduce((acc, b) => acc + b.availableSeats, 0)}
                    </p>
                  </div>

                  <div className="bg-maragota-light-gray p-3 rounded-lg text-sm">
                    <p className="font-semibold text-maragota-black mb-2">Barcos:</p>
                    <ul className="space-y-1">
                      {f.boats.map((boat) => (
                        <li key={boat.id} className="text-gray-600">
                          • {boat.name} ({boat.availableSeats}/{boat.totalSeats})
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && !isOperario && (
          <div className="card">
            <h2 className="text-2xl font-bold text-maragota-black mb-6">📈 Analytics</h2>
            <div className="bg-maragota-light-gray p-8 rounded-lg text-center text-gray-600">
              <p>Analytics dashboard en desarrollo...</p>
              <p className="text-sm mt-2">Próximamente: gráficos de ocupación, ingresos y tendencias</p>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && !session.isAdmin && !isOperario && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-maragota-black">⚙️ Configuración</h2>

            <div className="card">
              <h3 className="text-lg font-bold text-maragota-black mb-4">Precio de la Franquicia</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-maragota-black mb-2">
                    Precio (€ por persona)
                  </label>
                  <input type="number" defaultValue="45" className="input-field" />
                  <p className="text-xs text-gray-500 mt-2">Este es el precio que cobra tu franquicia además de la reserva (15€)</p>
                </div>
                <button className="btn-primary">Guardar cambios</button>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold text-maragota-black mb-4">Configuración de Información</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-maragota-black mb-2">
                    Dirección
                  </label>
                  <input type="text" defaultValue={franchisee?.address} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-maragota-black mb-2">
                    Teléfono
                  </label>
                  <input type="tel" defaultValue={franchisee?.phone} className="input-field" />
                </div>
                <button className="btn-primary">Guardar cambios</button>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold text-maragota-black mb-2">🔌 Conectar tu gestor de reservas</h3>
              <p className="text-xs text-gray-500 mb-4">
                Si ya usas otro sistema para gestionar tus reservas, pega aquí su URL de webhook.
                Cada vez que entre una reserva nueva por Maragota Boats, te la enviaremos también
                a esa dirección en formato JSON, además del email de aviso habitual.
              </p>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://tu-sistema.com/webhooks/maragota"
                  className="input-field"
                />
                <button onClick={handleSaveWebhook} className="btn-primary whitespace-nowrap">
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
