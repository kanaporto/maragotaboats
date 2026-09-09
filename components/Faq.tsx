'use client'

import { useState } from 'react'
import { useLocale } from '@/lib/i18n/context'

export default function Faq() {
  const { t } = useLocale()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-maragota-black text-center mb-8">
          {t.faq.title}
        </h2>

        <div className="space-y-3">
          {t.faq.items.map((item, i) => (
            <div key={item.question} className="card">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center text-left font-semibold text-maragota-black"
                aria-expanded={openIndex === i}
              >
                {item.question}
                <span className="text-maragota-orange text-xl ml-4 shrink-0">
                  {openIndex === i ? '−' : '+'}
                </span>
              </button>
              {openIndex === i && (
                <p className="text-sm text-gray-600 mt-3 pt-3 border-t">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
