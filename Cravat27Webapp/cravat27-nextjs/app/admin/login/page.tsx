'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const redirectTo = params.get('redirect') || '/admin'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    router.replace(redirectTo)
    router.refresh()
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    background: 'var(--navy)',
    border: '1px solid var(--border)',
    color: 'var(--white)',
    fontSize: 16,
    fontFamily: 'inherit',
    marginTop: 6,
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--navy)',
        padding: 24,
        fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: '100%',
          maxWidth: 380,
          background: 'var(--navy-light)',
          border: '1px solid var(--border)',
          padding: 32,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-bebas, Bebas Neue), sans-serif',
            fontSize: 32,
            letterSpacing: 3,
            color: 'var(--gold)',
            textAlign: 'center',
            marginBottom: 4,
          }}
        >
          CRAVAT27 ADMIN
        </div>
        <p style={{ color: 'var(--gray)', fontSize: 13, textAlign: 'center', marginBottom: 28 }}>
          Sign in to manage your site
        </p>

        <div style={{ marginBottom: 18 }}>
          <label style={{ fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--gold)' }}>Email</label>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--gold)' }}>Password</label>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
        </div>

        {error && (
          <p style={{ color: '#e0796f', fontSize: 13, marginBottom: 16 }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            minHeight: 52,
            background: 'var(--gold)',
            border: 'none',
            color: 'var(--navy)',
            fontSize: 14,
            letterSpacing: 2,
            textTransform: 'uppercase',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  )
}
