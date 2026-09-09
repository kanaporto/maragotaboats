'use client'

import Link from 'next/link'
import { useLocale } from '@/lib/i18n/context'

export default function Footer() {
  const { t } = useLocale()

  return (
    <footer className="bg-maragota-black text-gray-400 py-8 px-4 mt-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm pb-6 mb-6 border-b border-gray-800">
          <p className="text-gray-500">{t.footer.forProfessionals}</p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link href="/franquiciate" className="hover:text-maragota-orange transition-colors">
              {t.nav.franquiciate}
            </Link>
            <Link href="/login" className="hover:text-maragota-orange transition-colors">
              {t.nav.franquiciado}
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p>© 2026 Maragota Boats S.L. — CIF B09805979</p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link href="/legal/terminos" className="hover:text-maragota-orange transition-colors">
              {t.footer.terms}
            </Link>
            <Link href="/legal/privacidad" className="hover:text-maragota-orange transition-colors">
              {t.footer.privacy}
            </Link>
            <Link href="/legal/aviso-legal" className="hover:text-maragota-orange transition-colors">
              {t.footer.legal}
            </Link>
            <Link href="/legal/cookies" className="hover:text-maragota-orange transition-colors">
              {t.footer.cookies}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
