'use client'

import { getAllFranchisees } from '@/lib/dummyData'
import { getZoneByCity } from '@/lib/fishingZones'
import { useLocale } from '@/lib/i18n/context'

const RESERVATION_FEE = 15
const FRANCHISEE_FEE = 45

interface FeaturedFranchisesProps {
  onSelectProvince: (province: string) => void
}

export default function FeaturedFranchises({ onSelectProvince }: FeaturedFranchisesProps) {
  const { t } = useLocale()
  const franchisees = getAllFranchisees()

  return (
    <section className="py-12 px-4 bg-maragota-light-gray">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-maragota-black text-center mb-2">
          {t.featured.title}
        </h2>
        <p className="text-gray-600 text-center mb-10">
          {t.featured.subtitle}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {franchisees.map((franchisee) => {
            const zone = getZoneByCity(franchisee.city)
            const totalReviews = franchisee.boats.reduce((sum, b) => sum + b.reviews, 0)
            const weightedRating = franchisee.boats.reduce((sum, b) => sum + b.rating * b.reviews, 0)
            const averageRating = totalReviews > 0 ? Math.round((weightedRating / totalReviews) * 10) / 10 : 0

            return (
              <button
                key={franchisee.id}
                onClick={() => onSelectProvince(franchisee.province)}
                className="card text-left hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-maragota-black">{franchisee.companyName}</h3>
                    <p className="text-sm text-gray-500">📍 {franchisee.city}, {franchisee.province}</p>
                  </div>
                  {totalReviews > 0 && (
                    <div className="flex items-center gap-1 text-sm whitespace-nowrap">
                      <span className="text-yellow-400">★</span>
                      <span className="font-semibold">{averageRating}</span>
                    </div>
                  )}
                </div>

                {zone && zone.localFish.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {zone.localFish.slice(0, 3).map((fish) => (
                      <span key={fish} className="text-xs bg-blue-100 text-blue-900 px-2 py-0.5 rounded-full">
                        {fish}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t text-sm">
                  <span className="text-gray-600">{t.featured.boatsLabel(franchisee.boats.length)}</span>
                  <span className="font-semibold text-maragota-orange">
                    {t.featured.fromPrice(RESERVATION_FEE + FRANCHISEE_FEE)}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
