import { BOOKING_URL, BUSINESS } from '@/lib/data'

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--navy)',
      }}
    >
      {/* Background gradients */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,152,42,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 80% 20%, rgba(201,152,42,0.05) 0%, transparent 60%)
          `,
        }}
      />

      {/* Barber pole accent (desktop only) */}
      <div
        className="pole-accent"
        style={{
          position: 'absolute',
          left: '6%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 6,
          height: 220,
          borderRadius: 3,
          background: 'repeating-linear-gradient(170deg, #c9982a 0px, #c9982a 18px, #fff 18px, #fff 36px, #c0392b 36px, #c0392b 54px)',
          opacity: 0.6,
          animation: 'spinPole 8s linear infinite',
        }}
      />

      {/* Dot grid */}
      <div
        style={{
          position: 'absolute',
          right: '5%',
          bottom: '15%',
          width: 120,
          height: 120,
          backgroundImage: 'radial-gradient(circle, rgba(201,152,42,0.35) 1.5px, transparent 1.5px)',
          backgroundSize: '14px 14px',
          opacity: 0.6,
        }}
      />

      {/* X marks */}
      <span style={{ position: 'absolute', top: '18%', left: '12%', color: 'var(--gold)', fontSize: 22, opacity: 0.5, fontWeight: 900 }}>✕</span>
      <span style={{ position: 'absolute', bottom: '20%', right: '8%', color: 'var(--gold)', fontSize: 22, opacity: 0.5, fontWeight: 900 }}>✕</span>

      {/* Hero content */}
      <div
        style={{
          position: 'relative',
          textAlign: 'center',
          zIndex: 2,
          padding: '120px 24px 80px',
          animation: 'fadeUp 1s ease both',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
            fontSize: 11,
            letterSpacing: 5,
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: 20,
            animation: 'fadeUp 1s 0.2s ease both',
          }}
        >
          Davie, Florida · Est. 2025
        </p>

        <div style={{ animation: 'fadeUp 1s 0.25s ease both', marginBottom: 12 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Cravat27 The Barbershop"
            style={{ height: 'clamp(80px, 22vw, 160px)', objectFit: 'contain', margin: '0 auto', display: 'block' }}
          />
        </div>

        <p
          style={{
            display: 'inline-block',
            marginTop: 14,
            fontFamily: 'var(--font-playfair, Playfair Display), serif',
            fontSize: 'clamp(14px, 2vw, 18px)',
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: 'var(--gray)',
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            padding: '8px 24px',
            animation: 'fadeUp 1s 0.4s ease both',
          }}
        >
          The Barbershop
        </p>

        <div
          style={{
            marginTop: 48,
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
            flexWrap: 'wrap',
            animation: 'fadeUp 1s 0.5s ease both',
          }}
        >
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Book Appointment
          </a>
          <a href="#services" className="btn-outline">
            Our Services
          </a>
        </div>

        {/* Info bar */}
        <div
          style={{
            marginTop: 64,
            display: 'flex',
            gap: 48,
            justifyContent: 'center',
            flexWrap: 'wrap',
            borderTop: '1px solid var(--border)',
            paddingTop: 32,
            animation: 'fadeUp 1s 0.6s ease both',
          }}
        >
          {[
            { label: 'Mon – Sat', value: '9 AM – 8 PM' },
            { label: 'Sunday', value: '10 AM – 4 PM' },
            { label: 'Phone', value: BUSINESS.phone },
            { label: 'Location', value: '5021 S State Rd 7, Unit 207\nDavie, FL 33314' },
          ].map((item) => (
            <div key={item.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, minWidth: 120 }}>
              <span style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold)' }}>{item.label}</span>
              <span style={{ fontSize: 14, color: 'var(--white)', fontWeight: 400, whiteSpace: 'pre-line', textAlign: 'center' }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .pole-accent { display: none !important; }
        }
      `}</style>
    </section>
  )
}
