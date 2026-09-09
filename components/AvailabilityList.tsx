'use client'

import { SearchParams } from '@/app/page'
import { useState } from 'react'
import ReservationModal from './ReservationModal'
import { getAllFranchisees, searchFranchisees } from '@/lib/dummyData'
import { calculateDistance, getZoneByCity, FISHING_ZONES } from '@/lib/fishingZones'

interface BoatWithFranchisee {
  id: string
  name: string
  franchisee: string
  location: string
  totalSeats: number
  availableSeats: number
  franchiseePrice: number
  rating: number
  reviews: number
  franchiseeId: string
  distance?: number
  localFish?: string[]
}

interface AvailabilityListProps {
  searchParams: SearchParams
}

export default function AvailabilityList({ searchParams }: AvailabilityListProps) {
  const [selectedBoat, setSelectedBoat] = useState<BoatWithFranchisee | null>(null)
  const [showReservationModal, setShowReservationModal] = useState(false)

  // Get boats from dummy data based on search params
  const getAvailableBoats = (): BoatWithFranchisee[] => {
    let franchisees = searchParams.province
      ? searchFranchisees(searchParams.province)
      : getAllFranchisees()

    const boats: BoatWithFranchisee[] = []

    franchisees.forEach((franchisee) => {
      franchisee.boats.forEach((boat) => {
        // Buscar zona de pesca para información local
        const zone = getZoneByCity(franchisee.city) || FISHING_ZONES.find(z => z.name.includes(franchisee.companyName))

        // Calcular distancia si el usuario está cerca
        let distance: number | undefined
        if (searchParams.userLocation) {
          distance = calculateDistance(
            searchParams.userLocation.lat,
            searchParams.userLocation.lng,
            zone?.coordinates.lat || franchisee.id.charCodeAt(0),
            zone?.coordinates.lng || franchisee.id.charCodeAt(1)
          )
        }

        boats.push({
          id: boat.id,
          name: boat.name,
          franchisee: franchisee.companyName,
          location: `${franchisee.city}, ${franchisee.province}`,
          totalSeats: boat.totalSeats,
          availableSeats: boat.availableSeats,
          franchiseePrice: 45,
          rating: boat.rating,
          reviews: boat.reviews,
          franchiseeId: franchisee.id,
          distance,
          localFish: zone?.localFish || [],
        })
      })
    })

    // Ordenar por distancia si está disponible
    if (searchParams.nearMe && searchParams.userLocation) {
      boats.sort((a, b) => (a.distance || 999) - (b.distance || 999))
    }

    return boats
  }

  const boats = getAvailableBoats()

  const handleReserve = (boat: BoatWithFranchisee) => {
    setSelectedBoat(boat)
    setShowReservationModal(true)
  }

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-maragota-black mb-4">Disponibilidad</h2>
        <div className="text-sm text-gray-600 mb-6 p-4 bg-maragota-light-gray rounded-lg">
          {searchParams.nearMe ? (
            <p>📍 Mostrando salidas más cercanas a ti</p>
          ) : (
            <p>📍 Provincia: {searchParams.province || 'Todas'}</p>
          )}
          {searchParams.date && <p>📅 Fecha: {new Date(searchParams.date).toLocaleDateString('es-ES')}</p>}
          {searchParams.time && <p>⏰ Hora: {searchParams.time}</p>}
        </div>
      </div>

      {boats.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-600 mb-4">No hay salidas disponibles para los criterios seleccionados.</p>
          <p className="text-sm text-gray-500">Intenta cambiar la fecha, hora o provincia.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {boats.map((boat) => (
            <div key={boat.id} className="card">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left: Boat info */}
                <div className="md:col-span-2">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-maragota-black">{boat.name}</h3>
                      <p className="text-gray-600 text-sm">{boat.franchisee}</p>
                    </div>
                    {boat.distance !== undefined && (
                      <div className="text-right bg-maragota-light-gray px-3 py-2 rounded">
                        <p className="text-sm font-bold text-maragota-orange">{boat.distance} km</p>
                        <p className="text-xs text-gray-600">de distancia</p>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-4">📍 {boat.location}</p>

                  {/* Pesca local */}
                  {boat.localFish && boat.localFish.length > 0 && (
                    <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                      <p className="text-xs font-semibold text-blue-900 mb-2">🎣 Pesca local:</p>
                      <div className="flex flex-wrap gap-2">
                        {boat.localFish.map((fish) => (
                          <span
                            key={fish}
                            className="inline-block bg-blue-200 text-blue-900 text-xs px-2 py-1 rounded-full"
                          >
                            {fish}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="font-semibold">{boat.rating}</span>
                      <span className="text-gray-500 text-sm">({boat.reviews} opiniones)</span>
                    </div>
                  </div>

                  {/* Seats info */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Sitios disponibles: {boat.availableSeats}/{boat.totalSeats}</p>
                    <div className="flex gap-1">
                      {Array.from({ length: boat.totalSeats }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                            i < boat.availableSeats
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-300 text-gray-600'
                          }`}
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                  </div>

                  {boat.availableSeats === 0 && (
                    <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-lg text-sm">
                      Barco completo para esta fecha
                    </div>
                  )}
                </div>

                {/* Right: Pricing and CTA */}
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="mb-6">
                      <div className="text-sm text-gray-600 mb-2">Desglose de precio</div>
                      <div className="space-y-1 text-sm mb-4 pb-4 border-b">
                        <div className="flex justify-between">
                          <span>Reserva (ahora):</span>
                          <span className="font-semibold">15€</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Franquiciado (después):</span>
                          <span className="font-semibold">45€</span>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-maragota-orange">
                        Total: <span className="text-2xl">60€</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Por persona</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleReserve(boat)}
                    disabled={boat.availableSeats === 0}
                    className={boat.availableSeats === 0 ? 'btn-secondary opacity-50 cursor-not-allowed' : 'btn-primary w-full'}
                  >
                    {boat.availableSeats === 0 ? 'Sin disponibilidad' : 'Reservar ahora'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedBoat && (
        <ReservationModal
          boat={selectedBoat}
          searchParams={searchParams}
          isOpen={showReservationModal}
          onClose={() => setShowReservationModal(false)}
        />
      )}
    </>
  )
}
