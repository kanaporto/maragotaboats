'use client'

import Link from 'next/link'
import { useLocale } from '@/lib/i18n/context'
import { LOCALE_LABELS, Locale } from '@/lib/i18n/translations'

const LOCALES: Locale[] = ['es', 'en', 'fr']

export default function Navbar() {
  const { locale, setLocale, t } = useLocale()

  return (
    <nav className="bg-maragota-black text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Maragota_Principal.webp" alt="Maragota Boats" className="h-16 w-auto" />
        </Link>

        <div className="flex gap-6 items-center">
          <Link href="/" className="hover:text-maragota-orange transition-colors">
            {t.nav.reservas}
          </Link>
          <Link href="/franquiciate" className="hover:text-maragota-orange transition-colors">
            {t.nav.franquiciate}
          </Link>
          <Link href="/login" className="text-maragota-orange font-semibold hover:text-orange-300 transition-colors">
            {t.nav.franquiciado}
          </Link>

          <div className="flex gap-1 border-l border-gray-700 pl-4">
            {LOCALES.map((l) => (
              <button
                key={l}
                onClick={() => setLocale(l)}
                className={`text-xs font-bold px-2 py-1 rounded transition-colors ${
                  locale === l
                    ? 'bg-maragota-orange text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {LOCALE_LABELS[l]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
