'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  // Login page renders bare (no dashboard chrome).
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  async function logout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.replace('/admin/login')
    router.refresh()
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--navy)', color: 'var(--white)', fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif' }}>
      <nav style={{ background: 'var(--navy-light)', borderBottom: '1px solid var(--border)', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <Link href="/admin" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: 'var(--font-bebas, Bebas Neue), sans-serif', fontSize: 22, letterSpacing: 2, color: 'var(--gold)' }}>
              CRAVAT27 · ADMIN
            </span>
          </Link>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {[
              { href: '/admin/services', label: 'Services' },
              { href: '/admin/info', label: 'Business Info' },
              { href: '/admin/gallery', label: 'Gallery' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  color: pathname === l.href ? 'var(--gold)' : 'var(--gray)',
                  textDecoration: 'none',
                  fontSize: 13,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  padding: '8px 14px',
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link
            href="/"
            style={{
              fontSize: 12,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              color: 'var(--gray)',
              textDecoration: 'none',
              padding: '8px 14px',
              border: '1px solid var(--border)',
            }}
          >
            ← View Site
          </Link>
          <button
            onClick={logout}
            style={{
              fontSize: 12,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              color: 'var(--gray)',
              background: 'transparent',
              cursor: 'pointer',
              padding: '8px 14px',
              border: '1px solid var(--border)',
            }}
          >
            Log Out
          </button>
        </div>
      </nav>

      <main style={{ padding: '32px 24px', maxWidth: 1100, margin: '0 auto' }}>
        {children}
      </main>
    </div>
  )
}
