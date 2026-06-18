import Image from 'next/image'
import { Service } from '@/lib/supabase'
import { BOOKING_URL, SERVICES_SEED } from '@/lib/data'

type Props = { services: Service[] | null }

export default function Services({ services }: Props) {
  const items =
    services && services.length > 0
      ? services.filter((s) => s.visible).sort((a, b) => a.display_order - b.display_order)
      : SERVICES_SEED.map((s, i) => ({ ...s, id: String(i), visible: true, created_at: '', updated_at: '' }))

  return (
    <section
      id="services"
      style={{ background: 'var(--navy)', padding: '100px 24px' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="reveal" style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>
            What We Offer
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
            Services
          </h2>
          <div style={{ width: 48, height: 2, background: 'var(--gold)', marginBottom: 32 }} />
          <p style={{ color: 'var(--gray)', fontSize: 14 }}>
            Click any service to book directly through Square.
          </p>
        </div>

        <div className="services-grid">
          {items.map((service, i) => (
            <a
              key={service.id}
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`service-card service-card-top reveal`}
              style={{ animationDelay: `${(i % 4) * 0.08}s`, textDecoration: 'none' }}
            >
              {/* Photo or placeholder */}
              <div className="card-img-wrap">
                {service.image_url ? (
                  <Image
                    src={service.image_url}
                    alt={service.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="card-img"
                  />
                ) : (
                  <div className="card-img-placeholder">
                    <span>✂</span>
                  </div>
                )}
                <div className="card-overlay" />
              </div>

              {/* Info */}
              <div className="card-info">
                <p className="card-name">{service.name}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
                  <span className="card-price">{service.price}</span>
                  <span className="card-dur">{service.duration}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .service-card {
          background: var(--navy-light);
          border: 1px solid var(--border);
          cursor: pointer;
          transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
          display: block;
          text-decoration: none;
        }
        .service-card:hover {
          transform: translateY(-4px);
          border-color: rgba(201,152,42,0.5);
          box-shadow: 0 12px 40px rgba(0,0,0,0.3);
        }
        .card-img-wrap {
          position: relative;
          aspect-ratio: 3/2;
          overflow: hidden;
          background: var(--navy);
        }
        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease, filter 0.4s ease;
          filter: brightness(0.85) saturate(0.8);
        }
        .service-card:hover .card-img {
          transform: scale(1.06);
          filter: brightness(1) saturate(1);
        }
        .card-img-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--navy);
          color: var(--gold);
          font-size: 36px;
          opacity: 0.4;
        }
        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(18,21,31,0.7) 0%, transparent 60%);
          transition: opacity 0.3s;
        }
        .card-info {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .card-name {
          font-family: var(--font-bebas, 'Bebas Neue'), sans-serif;
          font-size: 18px;
          letter-spacing: 1.5px;
          color: var(--white);
          line-height: 1.1;
        }
        .card-price {
          font-family: var(--font-bebas, 'Bebas Neue'), sans-serif;
          font-size: 20px;
          color: var(--gold);
          letter-spacing: 1px;
        }
        .card-dur {
          font-size: 11px;
          color: var(--gray);
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        @media (max-width: 768px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
          .card-name { font-size: 14px; letter-spacing: 1px; }
          .card-price { font-size: 17px; }
          .card-dur { font-size: 10px; }
          .card-info { padding: 12px; }
        }
      `}</style>
    </section>
  )
}
