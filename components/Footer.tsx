import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-maragota-black text-gray-400 py-8 px-4 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
        <p>© 2026 Maragota Boats S.L. — CIF B09805979</p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link href="/legal/terminos" className="hover:text-maragota-orange transition-colors">
            Condiciones de reserva
          </Link>
          <Link href="/legal/privacidad" className="hover:text-maragota-orange transition-colors">
            Privacidad
          </Link>
          <Link href="/legal/aviso-legal" className="hover:text-maragota-orange transition-colors">
            Aviso legal
          </Link>
          <Link href="/legal/cookies" className="hover:text-maragota-orange transition-colors">
            Cookies
          </Link>
        </div>
      </div>
    </footer>
  )
}
