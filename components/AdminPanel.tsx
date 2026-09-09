'use client'

import { useState } from 'react'

type AdminTab = 'franchisees' | 'analytics' | 'reports' | 'new-franchisee'

interface FranchiseeManagement {
  id: string
  name: string
  owner: string
  city: string
  province: string
  email: string
  status: 'active' | 'suspended' | 'inactive'
  suspendedReason?: string
}

interface AdminPanelProps {
  onLogout: () => void
}

export default function AdminPanel({ onLogout }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('franchisees')
  const [franchisees] = useState<FranchiseeManagement[]>([
    {
      id: 'finisterre',
      name: 'Pescas do Cabo Finisterre',
      owner: 'Miguel Rodríguez García',
      city: 'Finisterre',
      province: 'Pontevedra',
      email: 'finisterre@maragota.com',
      status: 'active',
    },
    {
      id: 'bueu',
      name: 'Pesca Artesanal Bueu',
      owner: 'Carmela López Fernández',
      city: 'Bueu',
      province: 'Pontevedra',
      email: 'bueu@maragota.com',
      status: 'active',
    },
    {
      id: 'portonovo',
      name: 'Exploradores Marinos Portonovo',
      owner: 'Antonio Sousa Pérez',
      city: 'Portonovo',
      province: 'Pontevedra',
      email: 'portonovo@maragota.com',
      status: 'active',
    },
    {
      id: 'marin',
      name: 'Aventuras Marineras Marín',
      owner: 'Xosé Manuel González López',
      city: 'Marín',
      province: 'Pontevedra',
      email: 'marin@maragota.com',
      status: 'active',
    },
  ])

  const [showNewFranchiseeForm, setShowNewFranchiseeForm] = useState(false)
  const [newFranchisee, setNewFranchisee] = useState({
    name: '',
    owner: '',
    city: '',
    province: '',
    email: '',
    phone: '',
  })

  const handleAddFranchisee = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Integrar con backend para crear nuevo franquiciado
    console.log('Nuevo franquiciado:', newFranchisee)
    setShowNewFranchiseeForm(false)
    setNewFranchisee({
      name: '',
      owner: '',
      city: '',
      province: '',
      email: '',
      phone: '',
    })
  }

  const mockAnalytics = {
    totalReservations: 247,
    totalRevenue: 14820,
    byProvince: {
      Pontevedra: { reservations: 247, revenue: 14820 },
    },
    topFranchisee: 'Marín (89 reservas)',
    monthOverMonth: 12.5,
  }

  return (
    <div className="min-h-screen bg-maragota-light-gray">
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
                      <p className="text-xs text-gray-600">Reservas este mes</p>
                      <p className="font-semibold text-sm">24</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Ingresos este mes</p>
                      <p className="font-semibold text-sm text-maragota-orange">1.440€</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Rating</p>
                      <p className="font-semibold text-sm">⭐ 4.8</p>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <button className="text-sm px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                      Reset Password
                    </button>
                    <button className="text-sm px-4 py-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200">
                      {franchisee.status === 'suspended' ? 'Reactivar' : 'Suspender'}
                    </button>
                    <button className="text-sm px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200">
                      Dar de baja
                    </button>
                    <button className="text-sm px-4 py-2 bg-purple-100 text-purple-700 rounded hover:bg-purple-200">
                      Ver detalles
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
                <p className="text-4xl font-bold text-maragota-black">{mockAnalytics.totalRevenue}€</p>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="text-lg font-bold text-maragota-black mb-4">Gráfico de Reservas (Próximamente)</h3>
                <div className="h-64 bg-maragota-light-gray rounded flex items-center justify-center">
                  <p className="text-gray-500">Gráfico de tendencias se renderizará aquí</p>
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
                  <button className="btn-primary w-full">Guardar configuración</button>
                </div>
              </div>

              {/* Red Flags */}
              <div className="card">
                <h3 className="text-lg font-bold text-maragota-black mb-4">🚩 Alertas Detectadas</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
                    <p className="font-semibold text-red-900 text-sm">Caída sospechosa - Marín</p>
                    <p className="text-xs text-red-700 mt-1">
                      Reservas bajaron 35% vs año anterior. Requiere investigación.
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                    <p className="font-semibold text-yellow-900 text-sm">Inactividad - Portonovo</p>
                    <p className="text-xs text-yellow-700 mt-1">
                      No ha registrado reservas en 5 días. Verificar estado.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Report Preview */}
            <div className="card">
              <h3 className="text-lg font-bold text-maragota-black mb-4">📊 Último Reporte Mensual (Septiembre 2024)</h3>
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
                <p className="font-semibold text-maragota-black mb-3">Comparativa con Septiembre 2023:</p>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• Reservas: 219 → 247 (+12.8%)</li>
                  <li>• Ingresos: 13.1k€ → 14.8k€ (+13.0%)</li>
                  <li>• Mejor mes: Marín (89 reservas)</li>
                </ul>
              </div>

              <button className="btn-primary">Enviar reporte ahora</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
