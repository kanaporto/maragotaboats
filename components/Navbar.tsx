import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-maragota-black text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Maragota_Principal.webp" alt="Maragota Boats" className="h-10 w-auto" />
        </Link>

        <div className="flex gap-6 items-center">
          <Link href="/" className="hover:text-maragota-orange transition-colors">
            Reservas
          </Link>
          <Link href="/franquiciate" className="hover:text-maragota-orange transition-colors">
            Franquíciate
          </Link>
          <Link href="/login" className="text-maragota-orange font-semibold hover:text-orange-300 transition-colors">
            Franquiciado
          </Link>
        </div>
      </div>
    </nav>
  )
}
