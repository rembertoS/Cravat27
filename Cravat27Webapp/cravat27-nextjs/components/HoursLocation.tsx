import { BusinessInfo } from '@/lib/supabase'
import { BUSINESS } from '@/lib/data'

type Props = { info: BusinessInfo | null }

export default function HoursLocation({ info }: Props) {
  const data = info || {
    hours_weekday: BUSINESS.hoursWeekday,
    hours_sunday: BUSINESS.hoursSunday,
    phone: BUSINESS.phone,
    email: BUSINESS.email,
    address: BUSINESS.address,
    instagram_handle: BUSINESS.instagram,
    booking_url: BUSINESS.bookingUrl,
  }

  const mapQuery = encodeURIComponent('5021 S State Rd 7 Unit 207 Davie FL 33314')

  return (
    <section
      id="info"
      style={{
        background: 'var(--navy)',
        borderTop: '1px solid var(--border)',
        padding: '100px 24px',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="reveal" style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>
            Find Us
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
            Hours &amp; Location
          </h2>
          <div style={{ width: 48, height: 2, background: 'var(--gold)' }} />
        </div>

        <div className="info-grid">
          {/* Left: hours + contact */}
          <div className="reveal">
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginTop: 8 }}>
              {[
                { day: 'Monday – Saturday', time: data.hours_weekday },
                { day: 'Sunday', time: data.hours_sunday },
              ].map((row) => (
                <li
                  key={row.day}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '14px 0',
                    borderBottom: '1px solid var(--border)',
                    fontSize: 15,
                  }}
                >
                  <span style={{ color: 'var(--gray)' }}>{row.day}</span>
                  <span style={{ color: 'var(--gold)', fontWeight: 500 }}>{row.time}</span>
                </li>
              ))}
            </ul>
            <p style={{ marginTop: 12, fontSize: 12, color: 'var(--gray)', fontStyle: 'italic' }}>
              Extended hours available for scheduled clients.
            </p>

            <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <a href={`tel:${data.phone}`} className="contact-item">
                <span className="contact-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </span>
                {data.phone}
              </a>
              <a href={`mailto:${data.email}`} className="contact-item">
                <span className="contact-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </span>
                {data.email}
              </a>
              <a
                href={`https://maps.google.com/?q=${mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item"
              >
                <span className="contact-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </span>
                {data.address}
              </a>
              <a
                href={BUSINESS.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item"
              >
                <span className="contact-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </span>
                {data.instagram_handle}
              </a>
            </div>
          </div>

          {/* Right: map */}
          <div className="reveal">
            <div style={{ marginTop: 24, border: '1px solid var(--border)', overflow: 'hidden' }}>
              <iframe
                src="https://maps.google.com/maps?q=5021+S+State+Rd+7+Unit+207+Davie+FL+33314&output=embed&z=16"
                width="100%"
                height="300"
                style={{ display: 'block', filter: 'grayscale(30%) contrast(1.1)', border: 'none' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Cravat27 Barbershop Location"
              />
            </div>
            <div style={{ marginTop: 20, textAlign: 'center' }}>
              <a
                href={`https://maps.google.com/?q=${mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ fontSize: 12, padding: '12px 28px' }}
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: start;
        }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--gray);
          font-size: 14px;
          text-decoration: none;
          transition: color 0.2s;
        }
        .contact-item:hover { color: var(--gold); }
        .contact-icon {
          width: 36px;
          height: 36px;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          flex-shrink: 0;
          transition: border-color 0.2s, background 0.2s;
          color: var(--gray);
        }
        .contact-item:hover .contact-icon {
          border-color: var(--gold);
          background: var(--gold-dim);
          color: var(--gold);
        }
        @media (max-width: 768px) {
          .info-grid { grid-template-columns: 1fr; gap: 32px; }
        }
      `}</style>
    </section>
  )
}
