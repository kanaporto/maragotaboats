export interface Boat {
  id: string
  name: string
  totalSeats: number
  availableSeats: number
  rating: number
  reviews: number
}

export interface Franchisee {
  id: string
  companyName: string
  owner: string
  province: string
  city: string
  postalCode: string
  address: string
  phone: string
  email: string
  boats: Boat[]
}

export const DUMMY_FRANCHISEES: Record<string, Franchisee> = {
  finisterre: {
    id: 'finisterre',
    companyName: 'Pescas do Cabo Finisterre',
    owner: 'Miguel Rodríguez García',
    province: 'Pontevedra',
    city: 'Finisterre',
    postalCode: '15109',
    address: 'Paseo Marítimo s/n, Puerto de Finisterre',
    phone: '+34 981 74 00 00',
    email: 'info@pescasfiniesterre.es',
    boats: [
      {
        id: 'f1',
        name: 'Mar Atlántico',
        totalSeats: 8,
        availableSeats: 5,
        rating: 4.9,
        reviews: 234,
      },
      {
        id: 'f2',
        name: 'A Ría de Muros',
        totalSeats: 8,
        availableSeats: 3,
        rating: 4.7,
        reviews: 189,
      },
    ],
  },
  bueu: {
    id: 'bueu',
    companyName: 'Pesca Artesanal Bueu',
    owner: 'Carmela López Fernández',
    province: 'Pontevedra',
    city: 'Bueu',
    postalCode: '36940',
    address: 'Muelle de Pescadores s/n, Puerto de Bueu',
    phone: '+34 986 32 40 00',
    email: 'info@pescabueu.es',
    boats: [
      {
        id: 'b1',
        name: 'O Bueu Pescador',
        totalSeats: 8,
        availableSeats: 8,
        rating: 4.8,
        reviews: 156,
      },
      {
        id: 'b2',
        name: 'Ría da Guarda',
        totalSeats: 8,
        availableSeats: 2,
        rating: 4.6,
        reviews: 97,
      },
      {
        id: 'b3',
        name: 'Brava do Atlántico',
        totalSeats: 8,
        availableSeats: 0,
        rating: 4.9,
        reviews: 203,
      },
    ],
  },
  portonovo: {
    id: 'portonovo',
    companyName: 'Exploradores Marinos Portonovo',
    owner: 'Antonio Sousa Pérez',
    province: 'Pontevedra',
    city: 'Portonovo',
    postalCode: '36960',
    address: 'Avenida Castelao 15, Puerto de Portonovo',
    phone: '+34 986 74 08 00',
    email: 'info@exploradoresmarinosportonovo.es',
    boats: [
      {
        id: 'p1',
        name: 'Mariscos de Portonovo',
        totalSeats: 8,
        availableSeats: 4,
        rating: 4.7,
        reviews: 128,
      },
      {
        id: 'p2',
        name: 'Viaje al Fondo Marino',
        totalSeats: 8,
        availableSeats: 6,
        rating: 4.8,
        reviews: 167,
      },
    ],
  },
  marin: {
    id: 'marin',
    companyName: 'Aventuras Marineras Marín',
    owner: 'Xosé Manuel González López',
    province: 'Pontevedra',
    city: 'Marín',
    postalCode: '36960',
    address: 'Dársena 3, Puerto de Marín',
    phone: '+34 986 92 55 00',
    email: 'info@aventurasmarenamarin.es',
    boats: [
      {
        id: 'm1',
        name: 'Fragata Marín',
        totalSeats: 8,
        availableSeats: 1,
        rating: 4.9,
        reviews: 312,
      },
      {
        id: 'm2',
        name: 'Vela Blanca',
        totalSeats: 8,
        availableSeats: 5,
        rating: 4.8,
        reviews: 201,
      },
      {
        id: 'm3',
        name: 'Capitán Cousteau',
        totalSeats: 8,
        availableSeats: 7,
        rating: 4.7,
        reviews: 145,
      },
    ],
  },
}

// Franquiciados autenticados con contraseña hardcodeada
// role 'owner' = acceso completo a su franquicia; 'operario' = solo gestión operativa (reservas/barcos)
export const AUTHORIZED_FRANCHISEES = {
  'finisterre@maragota.com': {
    password: 'finisterre2024',
    franchiseeId: 'finisterre',
    role: 'owner' as const,
  },
  'operario.finisterre@maragota.com': {
    password: 'operario2024',
    franchiseeId: 'finisterre',
    role: 'operario' as const,
  },
  'bueu@maragota.com': {
    password: 'bueu2024',
    franchiseeId: 'bueu',
    role: 'owner' as const,
  },
  'operario.bueu@maragota.com': {
    password: 'operario2024',
    franchiseeId: 'bueu',
    role: 'operario' as const,
  },
  'portonovo@maragota.com': {
    password: 'portonovo2024',
    franchiseeId: 'portonovo',
    role: 'owner' as const,
  },
  'operario.portonovo@maragota.com': {
    password: 'operario2024',
    franchiseeId: 'portonovo',
    role: 'operario' as const,
  },
  'marin@maragota.com': {
    password: 'marin2024',
    franchiseeId: 'marin',
    role: 'owner' as const,
  },
  'operario.marin@maragota.com': {
    password: 'operario2024',
    franchiseeId: 'marin',
    role: 'operario' as const,
  },
  'geno@maragota.com': {
    password: 'geno2024',
    franchiseeId: 'admin', // Admin tiene acceso a todo
    role: 'owner' as const,
  },
}

export const getAllFranchisees = (): Franchisee[] => {
  return Object.values(DUMMY_FRANCHISEES)
}

export const getFranchiseeById = (id: string): Franchisee | undefined => {
  return DUMMY_FRANCHISEES[id]
}

export const getFranchiseeByCity = (city: string): Franchisee | undefined => {
  return Object.values(DUMMY_FRANCHISEES).find(
    (f) => f.city.toLowerCase() === city.toLowerCase()
  )
}

export const searchFranchisees = (
  province?: string,
  city?: string
): Franchisee[] => {
  return Object.values(DUMMY_FRANCHISEES).filter((f) => {
    if (province && f.province !== province) return false
    if (city && f.city.toLowerCase() !== city.toLowerCase()) return false
    return true
  })
}

// Tipo para sesión de franquiciado
export type FranchiseeRole = 'owner' | 'operario'

export interface FranchiseeSession {
  franchiseeId: string
  companyName: string
  email: string
  isAdmin: boolean
  role: FranchiseeRole
}
