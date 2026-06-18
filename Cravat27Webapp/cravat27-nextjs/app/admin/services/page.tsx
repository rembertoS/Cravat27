import { supabase } from '@/lib/supabase'
import ServicesAdmin from './ServicesAdmin'

export const revalidate = 0

export default async function ServicesPage() {
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .order('display_order')

  return <ServicesAdmin initialServices={services || []} />
}
