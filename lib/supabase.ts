import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Tables = {
  locations: {
    id: string
    province: string
    city: string
    postal_code: string
    address: string
    franchisee_id: string
    created_at: string
  }
  boats: {
    id: string
    name: string
    location_id: string
    total_seats: number
    franchisee_price: number
    rating: number | null
    created_at: string
  }
  reservations: {
    id: string
    boat_id: string
    customer_name: string
    customer_email: string
    customer_phone: string
    num_people: number
    reservation_date: string
    reservation_time: string
    reservation_fee: number
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
    created_at: string
  }
  franchisees: {
    id: string
    email: string
    company_name: string
    owner_name: string
    phone: string
    created_at: string
  }
}
