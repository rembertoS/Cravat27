import { BOOKING_URL } from '@/lib/data'

export default function BookingCTA() {
  return (
    <section
      id="book"
      style={{
        background: 'var(--gold)',
        padding: '80px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Watermark */}
      <div
        style={{
          position: 'absolute',
          fontFamily: 'var(--font-bebas, Bebas Neue), sans-serif',
          fontSize: 200,
          letterSpacing: 10,
          color: 'rgba(18,21,31,0.08)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        CRAVAT27
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto' }} className="reveal">
        <p
          style={{
            fontSize: 11,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: 'rgba(18,21,31,0.5)',
            marginBottom: 10,
          }}
        >
          Ready?
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-bebas, Bebas Neue), sans-serif',
            fontSize: 'clamp(40px, 7vw, 72px)',
            letterSpacing: 2,
            lineHeight: 1,
            color: 'var(--navy)',
            marginBottom: 24,
          }}
        >
          Book Your
          <br />
          Appointment
        </h2>
        <p
          style={{
            color: 'rgba(18,21,31,0.7)',
            fontSize: 16,
            maxWidth: 480,
            margin: '0 auto 36px',
            lineHeight: 1.7,
          }}
        >
          Walk-ins are always welcome, but booking ahead guarantees your spot. Skip the wait — reserve your chair in seconds.
        </p>
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-dark">
          Reserve My Spot
        </a>
      </div>
    </section>
  )
}
