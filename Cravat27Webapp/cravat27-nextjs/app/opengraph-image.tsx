import { ImageResponse } from 'next/og'

export const alt = 'Cravat27 — The Barbershop · Davie, FL'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#12151f',
          color: '#f5f0e8',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 8, color: '#c9982a', textTransform: 'uppercase', marginBottom: 16 }}>
          Davie, Florida · Est. 2025
        </div>
        <div style={{ fontSize: 150, fontWeight: 900, letterSpacing: 6, lineHeight: 1, display: 'flex' }}>
          <span>CRAVAT</span>
          <span style={{ color: '#c9982a' }}>27</span>
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 30,
            letterSpacing: 12,
            textTransform: 'uppercase',
            color: '#8a8a9a',
            borderTop: '1px solid rgba(201,152,42,0.4)',
            borderBottom: '1px solid rgba(201,152,42,0.4)',
            padding: '12px 32px',
          }}
        >
          The Barbershop
        </div>
      </div>
    ),
    { ...size }
  )
}
