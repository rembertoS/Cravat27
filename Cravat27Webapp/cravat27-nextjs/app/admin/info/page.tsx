import { supabase } from '@/lib/supabase'
import InfoAdmin from './InfoAdmin'

export const revalidate = 0

export default async function InfoPage() {
  const { data } = await supabase.from('business_info').select('*').limit(1).single()
  return <InfoAdmin initial={data} />
}
