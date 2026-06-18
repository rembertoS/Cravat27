import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export const revalidate = 0

async function getStats() {
  const [servicesRes, infoRes] = await Promise.all([
    supabase.from('services').select('id, visible, updated_at').order('updated_at', { ascending: false }),
    supabase.from('business_info').select('*').limit(1).single(),
  ])
  const services = servicesRes.data || []
  const activeCount = services.filter((s) => s.visible).length
  const lastUpdated = services[0]?.updated_at ? new Date(services[0].updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Never'
  return { activeCount, totalCount: services.length, lastUpdated, hasInfo: !!infoRes.data }
}

export default async function AdminHome() {
  const { activeCount, totalCount, lastUpdated, hasInfo } = await getStats()

  const cards = [
    {
      href: '/admin/services',
      title: 'Services',
      desc: 'Edit prices, photos, and visibility for each service.',
      stat: `${activeCount} of ${totalCount} active`,
      statLabel: 'Last updated ' + lastUpdated,
    },
    {
      href: '/admin/info',
      title: 'Business Info',
      desc: 'Update hours, phone, email, and booking link.',
      stat: hasInfo ? 'Connected' : 'Not set',
      statLabel: 'Hours, contact, links',
    },
    {
      href: '/admin/gallery',
      title: 'Gallery',
      desc: 'Upload photos and manage the gallery grid.',
      stat: 'Coming Soon',
      statLabel: 'Photo management',
    },
  ]

  return (
    <>
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontFamily: 'var(--font-bebas, Bebas Neue), sans-serif', fontSize: 48, letterSpacing: 2, color: 'var(--white)', lineHeight: 1 }}>
          Dashboard
        </h1>
        <p style={{ color: 'var(--gray)', marginTop: 8, fontSize: 15 }}>
          Welcome back. What would you like to update today?
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="admin-card-link"
            style={{ textDecoration: 'none' }}
          >
            <div
              className="admin-card"
              style={{
                background: 'var(--navy-light)',
                border: '1px solid var(--border)',
                padding: 24,
                transition: 'border-color 0.2s, transform 0.2s',
                cursor: 'pointer',
              }}
            >
              <h2 style={{ fontFamily: 'var(--font-bebas, Bebas Neue), sans-serif', fontSize: 28, letterSpacing: 1.5, color: 'var(--gold)', marginBottom: 8 }}>
                {card.title}
              </h2>
              <p style={{ color: 'var(--gray)', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>{card.desc}</p>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
                <p style={{ color: 'var(--white)', fontWeight: 600, fontSize: 18, marginBottom: 2 }}>{card.stat}</p>
                <p style={{ color: 'var(--gray)', fontSize: 12, letterSpacing: 0.5 }}>{card.statLabel}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        .admin-card-link:hover .admin-card {
          border-color: var(--gold) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </>
  )
}
