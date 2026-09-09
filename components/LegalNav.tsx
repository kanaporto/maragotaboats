import Link from 'next/link'

const LINKS = [
  { href: '/legal/terminos', label: 'Condiciones de reserva' },
  { href: '/legal/privacidad', label: 'Privacidad' },
  { href: '/legal/aviso-legal', label: 'Aviso legal' },
  { href: '/legal/cookies', label: 'Cookies' },
]

export default function LegalNav({ current }: { current: string }) {
  return (
    <div className="flex gap-2 flex-wrap mb-8 pb-4 border-b">
      {LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`text-sm px-3 py-1.5 rounded-full transition-colors ${
            current === link.href
              ? 'bg-maragota-orange text-white'
              : 'bg-maragota-light-gray text-gray-700 hover:bg-gray-200'
          }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}
