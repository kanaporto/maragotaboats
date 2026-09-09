'use client'

import { useLocale } from '@/lib/i18n/context'

// TODO: sustituir por el número de WhatsApp Business cuando esté dado de alta.
const WHATSAPP_NUMBER = '34671469616'

export default function WhatsAppButton() {
  const { t } = useLocale()
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.whatsapp.defaultMessage)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.ariaLabel}
      title={t.whatsapp.tooltip}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
    >
      <svg viewBox="0 0 32 32" className="w-8 h-8 fill-white" aria-hidden="true">
        <path d="M16.001 3C9.373 3 4 8.373 4 15.001c0 2.386.7 4.61 1.902 6.478L4 29l7.72-1.867A11.94 11.94 0 0 0 16.001 27C22.629 27 28 21.627 28 15.001 28 8.373 22.629 3 16.001 3zm0 21.818a9.78 9.78 0 0 1-4.98-1.362l-.357-.212-4.583 1.108 1.13-4.47-.233-.365A9.78 9.78 0 0 1 5.909 15c0-5.57 4.523-10.09 10.092-10.09 5.568 0 10.09 4.52 10.09 10.09 0 5.569-4.522 10.09-10.09 10.09zm5.533-7.56c-.303-.152-1.792-.885-2.07-.986-.278-.101-.48-.152-.682.152-.202.303-.783.985-.96 1.187-.177.202-.353.227-.657.076-.303-.152-1.28-.472-2.438-1.505-.901-.804-1.51-1.797-1.687-2.1-.177-.303-.019-.467.133-.618.136-.135.303-.353.454-.53.152-.177.202-.303.303-.505.101-.202.05-.379-.025-.53-.076-.152-.682-1.644-.935-2.252-.246-.591-.497-.51-.682-.52-.176-.008-.379-.01-.581-.01-.202 0-.53.076-.808.379-.278.303-1.06 1.036-1.06 2.527s1.085 2.931 1.236 3.134c.152.202 2.135 3.26 5.172 4.571.723.312 1.287.498 1.727.637.726.23 1.386.198 1.908.12.582-.087 1.792-.733 2.045-1.44.253-.708.253-1.314.177-1.44-.076-.126-.278-.202-.581-.354z"/>
      </svg>
    </a>
  )
}
