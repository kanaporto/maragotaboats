import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-maragota-black text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🚤</span>
          <span className="text-xl font-bold text-maragota-orange">Maragota</span>
        </Link>

        <div className="flex gap-6">
          <Link href="/" className="hover:text-maragota-orange transition-colors">
            Reservas
          </Link>
          <Link href="/login" className="text-maragota-orange font-semibold hover:text-orange-300 transition-colors">
            Franquiciado
          </Link>
        </div>
      </div>
    </nav>
  )
}
