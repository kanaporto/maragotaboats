'use client'

import { getAllFranchisees } from '@/lib/dummyData'
import { useLocale } from '@/lib/i18n/context'

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
  const { t } = useLocale()
  const stats = computeFleetStats()

  return (
    <section className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-maragota-black text-center mb-2">
          {t.whyChooseUs.title}
        </h2>
        <p className="text-gray-600 text-center mb-10">
          {t.whyChooseUs.statsLine(stats.franchiseeCount, stats.boatCount, stats.averageRating, stats.totalReviews)}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {t.whyChooseUs.reasons.map((reason) => (
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
