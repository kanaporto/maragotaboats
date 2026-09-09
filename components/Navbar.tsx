'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useLocale } from '@/lib/i18n/context'
import { LOCALE_FLAGS, LOCALE_NAMES, Locale } from '@/lib/i18n/translations'

const LOCALES: Locale[] = ['es', 'en', 'fr']

function LanguageDropdown() {
  const { locale, setLocale } = useLocale()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 text-xl px-2 py-1 rounded hover:bg-white/10 transition-colors"
        aria-label="Change language"
      >
        {LOCALE_FLAGS[locale]}
        <span className="text-xs text-gray-400">▾</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl overflow-hidden min-w-[140px] z-50">
          {LOCALES.map((l) => (
            <button
              key={l}
              onClick={() => {
                setLocale(l)
                setOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors ${
                locale === l
                  ? 'bg-maragota-light-gray text-maragota-orange font-semibold'
                  : 'text-maragota-black hover:bg-maragota-light-gray'
              }`}
            >
              <span className="text-lg">{LOCALE_FLAGS[l]}</span>
              {LOCALE_NAMES[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const { t } = useLocale()

  return (
    <nav className="bg-maragota-black text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Maragota_Principal.webp" alt="Maragota Boats" className="h-16 w-auto" />
        </Link>

        <div className="flex gap-4 sm:gap-6 items-center">
          <Link href="/" className="hover:text-maragota-orange transition-colors">
            {t.nav.reservas}
          </Link>

          <div className="border-l border-gray-700 pl-4">
            <LanguageDropdown />
          </div>
        </div>
      </div>
    </nav>
  )
}
