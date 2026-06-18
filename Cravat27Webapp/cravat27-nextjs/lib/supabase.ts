import { createClient } from '@supabase/supabase-js'

// Falls back to harmless placeholder values so the site still builds/runs in
// "seed data" mode before Supabase is configured. Queries will simply error and
// the components fall back to the local SERVICES_SEED / BUSINESS constants.
const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const isSupabaseConfigured =
  !!envUrl && !!envKey && /^https?:\/\//.test(envUrl)

const supabaseUrl = isSupabaseConfigured ? envUrl! : 'https://placeholder.supabase.co'
const supabaseAnonKey = isSupabaseConfigured ? envKey! : 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Service = {
  id: string
  name: string
  price: string
  duration: string
  image_url: string | null
  visible: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export type BusinessInfo = {
  id: string
  hours_weekday: string
  hours_sunday: string
  phone: string
  email: string
  address: string
  instagram_handle: string
  booking_url: string
}

export type GalleryItem = {
  id: string
  image_url: string
  caption: string | null
  display_order: number
  visible: boolean
  created_at: string
}
