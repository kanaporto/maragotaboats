import { getAllFranchisees } from '@/lib/dummyData'

const REASONS = [
  {
    icon: '🛡️',
    title: 'Seguridad primero',
    description: 'Seguro obligatorio, licencia de pesca colectiva y chaleco salvavidas en cada salida.',
  },
  {
    icon: '🎣',
    title: 'Patrones que conocen su mar',
    description: 'Cada franquiciado opera su propia zona y sabe dónde está la pesca en cada época del año.',
  },
  {
    icon: '💶',
    title: 'Precio fijo, sin sorpresas',
    description: 'Sabes exactamente lo que pagas antes de reservar: seña online más el resto en destino.',
  },
  {
    icon: '📱',
    title: 'Reserva en minutos',
    description: 'Sin registro ni contraseñas. Reservas con tu email y teléfono y listo.',
  },
  {
    icon: '🌊',
    title: 'Red en expansión por España',
    description: 'Empezamos en Galicia y seguimos sumando localidades con el mismo estándar de calidad.',
  },
]

function computeFleetStats() {
  const franchisees = getAllFranchisees()
  const boats = franchisees.flatMap((f) => f.boats)
  const totalReviews = boats.reduce((sum, b) => sum + b.reviews, 0)
  const weightedRating = boats.reduce((sum, b) => sum + b.rating * b.reviews, 0)
  const averageRating = totalReviews > 0 ? weightedRating / totalReviews : 0

  return {
    franchiseeCount: franchisees.length,
    boatCount: boats.length,
    totalReviews,
    averageRating: Math.round(averageRating * 10) / 10,
  }
}

export default function WhyChooseUs() {
  const stats = computeFleetStats()

  return (
    <section className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-maragota-black text-center mb-2">
          ¿Por qué reservar con Maragota Boats?
        </h2>
        <p className="text-gray-600 text-center mb-10">
          {stats.franchiseeCount} franquicias · {stats.boatCount} barcos · ⭐ {stats.averageRating} sobre {stats.totalReviews} opiniones
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {REASONS.map((reason) => (
            <div key={reason.title} className="card">
              <div className="text-3xl mb-3">{reason.icon}</div>
              <h3 className="font-bold text-maragota-black mb-2">{reason.title}</h3>
              <p className="text-sm text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
