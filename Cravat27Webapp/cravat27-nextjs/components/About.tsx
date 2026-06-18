import { PRINCIPLES, BOOKING_URL } from '@/lib/data'

export default function About() {
  return (
    <section
      id="about"
      style={{
        background: 'var(--navy-light)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '100px 24px',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="about-grid">
          {/* Left: copy */}
          <div className="reveal">
            <p style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>
              Who We Are
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-bebas, Bebas Neue), sans-serif',
                fontSize: 'clamp(40px, 7vw, 72px)',
                letterSpacing: 2,
                lineHeight: 1,
                color: 'var(--white)',
                marginBottom: 24,
              }}
            >
              More Than a Cut. It&apos;s a Standard.
            </h2>
            <div style={{ width: 48, height: 2, background: 'var(--gold)', marginBottom: 40 }} />
            <p style={{ color: 'var(--gray)', lineHeight: 1.8, fontSize: 16, marginBottom: 20 }}>
              Cravat27 is a premier barbershop in Davie, FL, built on the belief that{' '}
              <strong style={{ color: 'var(--gold)', fontWeight: 500 }}>every client deserves a premium experience</strong> — from the moment they walk in to the final line-up.
            </p>
            <p style={{ color: 'var(--gray)', lineHeight: 1.8, fontSize: 16, marginBottom: 20 }}>
              We&apos;re not just a barbershop. We&apos;re a standard of{' '}
              <strong style={{ color: 'var(--gold)', fontWeight: 500 }}>professionalism, quality, and consistency</strong> that you can count on every single visit.
            </p>
            <p style={{ color: 'var(--gray)', lineHeight: 1.8, fontSize: 16, marginBottom: 28 }}>
              Walk-ins welcome. Appointments preferred.
            </p>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Book Your Appointment
            </a>
          </div>

          {/* Right: principles */}
          <div className="reveal principles-grid">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="principle-card">
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .principles-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .principle-card {
          background: var(--navy);
          border: 1px solid var(--border);
          padding: 20px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.2s, transform 0.2s;
          padding-left: 24px;
        }
        .principle-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 3px;
          height: 100%;
          background: var(--gold);
        }
        .principle-card:hover {
          border-color: var(--gold);
          transform: translateY(-2px);
        }
        .principle-card h4 {
          font-family: var(--font-bebas, 'Bebas Neue'), sans-serif;
          font-size: 20px;
          letter-spacing: 1.5px;
          color: var(--white);
          margin-bottom: 4px;
        }
        .principle-card p {
          font-size: 12px;
          color: var(--gray);
          letter-spacing: 0.5px;
        }
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr; gap: 32px; }
          .principles-grid { gap: 10px; }
          .principle-card { padding: 16px 16px 16px 24px; }
          .principle-card h4 { font-size: 16px; }
        }
        @media (max-width: 400px) {
          .principles-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
