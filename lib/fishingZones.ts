// Información de zonas de pesca en España con pesca local

export interface FishingZone {
  name: string
  city: string
  province: string
  postalCodes: string[]
  coordinates: { lat: number; lng: number }
  localFish: string[]
  description: string
}

export const FISHING_ZONES: FishingZone[] = [
  // Galicia - Pontevedra
  {
    name: 'Pescas do Cabo Finisterre',
    city: 'Finisterre',
    province: 'Pontevedra',
    postalCodes: ['15109', '15100', '15101'],
    coordinates: { lat: 42.8861, lng: -9.2747 },
    localFish: ['Merluza', 'Lubina', 'Rodaballo', 'Lenguado', 'Caballa'],
    description: 'Aguas atlánticas del Cabo Finisterre con excelente pesca de merluza y lubina. Aguas profundas ideales para pesca de altura.'
  },
  {
    name: 'Pesca Artesanal Bueu',
    city: 'Bueu',
    province: 'Pontevedra',
    postalCodes: ['36940', '36941'],
    coordinates: { lat: 42.3214, lng: -8.7456 },
    localFish: ['Pulpo', 'Langostino', 'Centolla', 'Nécora', 'Boquerones'],
    description: 'Aguas de la Ría de Pontevedra. Famosa por su pulpo y langostino. Zona de arrecifes con gran biodiversidad.'
  },
  {
    name: 'Exploradores Marinos Portonovo',
    city: 'Portonovo',
    province: 'Pontevedra',
    postalCodes: ['36960', '36961'],
    coordinates: { lat: 42.3456, lng: -8.6789 },
    localFish: ['Dorada', 'Lubina', 'Lenguado', 'Sardinilla', 'Raya'],
    description: 'Ría de Pontevedra. Zona tranquila ideal para familias. Buena pesca de dorada y lubina en fondos de arena.'
  },
  {
    name: 'Aventuras Marineras Marín',
    city: 'Marín',
    province: 'Pontevedra',
    postalCodes: ['36960', '36962', '36963'],
    coordinates: { lat: 42.3934, lng: -8.6234 },
    localFish: ['Sargo', 'Dorada', 'Sepia', 'Atún', 'Pez Espada'],
    description: 'Base naval histórica de Marín. Excelente pesca de sargo y dorada. Acceso a aguas profundas del Atlántico.'
  },
]

export function getZoneByPostalCode(postalCode: string): FishingZone | undefined {
  return FISHING_ZONES.find(zone => zone.postalCodes.includes(postalCode))
}

export function getZoneByCity(city: string): FishingZone | undefined {
  return FISHING_ZONES.find(zone =>
    zone.city.toLowerCase() === city.toLowerCase()
  )
}

export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Tierra radio en km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c

  return Math.round(distance * 10) / 10 // Redondear a 1 decimal
}

export function getZonesNearby(lat: number, lng: number, maxDistance: number = 50): Array<{
  zone: FishingZone
  distance: number
}> {
  return FISHING_ZONES
    .map(zone => ({
      zone,
      distance: calculateDistance(lat, lng, zone.coordinates.lat, zone.coordinates.lng)
    }))
    .filter(item => item.distance <= maxDistance)
    .sort((a, b) => a.distance - b.distance)
}

// Simulado: en producción usaría Google Maps Geocoding API
export async function getCoordinatesFromPostalCode(postalCode: string): Promise<{ lat: number; lng: number } | null> {
  const zone = getZoneByPostalCode(postalCode)
  if (zone) {
    // Simular pequeña variación dentro de la zona
    return {
      lat: zone.coordinates.lat + (Math.random() - 0.5) * 0.05,
      lng: zone.coordinates.lng + (Math.random() - 0.5) * 0.05
    }
  }
  return null
}

export async function getCoordinatesFromCity(city: string): Promise<{ lat: number; lng: number } | null> {
  const zone = getZoneByCity(city)
  if (zone) {
    return {
      lat: zone.coordinates.lat + (Math.random() - 0.5) * 0.05,
      lng: zone.coordinates.lng + (Math.random() - 0.5) * 0.05
    }
  }
  return null
}
