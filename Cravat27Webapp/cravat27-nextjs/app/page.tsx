import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Gallery from '@/components/Gallery'
import HoursLocation from '@/components/HoursLocation'
import BookingCTA from '@/components/BookingCTA'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'

export const revalidate = 60

async function getData() {
  if (!isSupabaseConfigured) {
    return { services: null, info: null, gallery: null }
  }
  const [servicesRes, infoRes, galleryRes] = await Promise.all([
    supabase.from('services').select('*').order('display_order'),
    supabase.from('business_info').select('*').limit(1).single(),
    supabase.from('gallery').select('*').order('display_order'),
  ])
  return {
    services: servicesRes.data,
    info: infoRes.data,
    gallery: galleryRes.data,
  }
}

export default async function HomePage() {
  const { services, info, gallery } = await getData()

  return (
    <>
      <ScrollReveal />
      <Nav />
      <Hero />
      <About />
      <Services services={services} />
      <Gallery gallery={gallery} />
      <HoursLocation info={info} />
      <BookingCTA />
      <Footer />
    </>
  )
}
