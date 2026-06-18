import { BUSINESS } from '@/lib/data'

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--navy-light)',
        borderTop: '1px solid var(--border)',
        padding: '48px 24px',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 24,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-bebas, Bebas Neue), sans-serif',
              fontSize: 28,
              letterSpacing: 4,
              color: 'var(--gold)',
              lineHeight: 1,
            }}
          >
            CRAVAT
          </div>
          <p
            style={{
              fontSize: 11,
              letterSpacing: 3,
              color: 'var(--gray)',
              textTransform: 'uppercase',
              marginTop: 4,
            }}
          >
            The Barbershop · 5021 S State Rd 7, Unit 207, Davie, FL 33314
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          {/* Instagram */}
          <a
            href={BUSINESS.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="social-link"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>
          {/* Facebook */}
          <a
            href={BUSINESS.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="social-link"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
          {/* TikTok */}
          <a
            href={BUSINESS.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="social-link"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.79 1.52V6.76a4.85 4.85 0 0 1-1.02-.07z"/>
            </svg>
          </a>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          fontSize: 12,
          color: 'var(--gray)',
          textAlign: 'center',
          borderTop: '1px solid var(--border)',
          paddingTop: 24,
          marginTop: 24,
        }}
      >
        &copy; 2025 Cravat27 Barbershop · 5021 S State Rd 7 Unit 207, Davie FL 33314 · All rights reserved.
      </div>

      <style>{`
        .social-link {
          width: 40px;
          height: 40px;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gray);
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .social-link:hover {
          border-color: var(--gold);
          color: var(--gold);
          background: var(--gold-dim);
        }
        @media (max-width: 768px) {
          footer > div:first-child > div { flex-direction: column; align-items: flex-start; gap: 16px; }
        }
      `}</style>
    </footer>
  )
}
