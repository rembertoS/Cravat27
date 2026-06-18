import { GalleryItem } from '@/lib/supabase'
import { BUSINESS } from '@/lib/data'

type Props = { gallery: GalleryItem[] | null }

// Matches the original site: 5-tile mosaic with captions. When no real photos
// exist yet, tiles show the brand gradient (as the original did on broken images).
const PLACEHOLDER_TILES = [
  { caption: 'The Shop', area: { gridColumn: '1 / 3', gridRow: '1' }, minHeight: 320 },
  { caption: 'Premium Fade', area: { gridColumn: '3', gridRow: '1' }, minHeight: 320 },
  { caption: 'Ready for You', area: { gridColumn: '1', gridRow: '2' }, minHeight: 240 },
  { caption: 'Sharp Lines', area: { gridColumn: '2', gridRow: '2' }, minHeight: 240 },
  { caption: 'The Standard', area: { gridColumn: '3', gridRow: '1 / 3' }, minHeight: 560 },
]

export default function Gallery({ gallery }: Props) {
  const items = gallery ? gallery.filter((g) => g.visible).sort((a, b) => a.display_order - b.display_order) : []
  const hasPhotos = items.length > 0

  return (
    <section
      id="gallery"
      style={{
        background: 'var(--navy-light)',
        borderTop: '1px solid var(--border)',
        padding: '100px 24px',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="reveal">
          <p style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>
            The Shop
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
            Our Work
          </h2>
          <div style={{ width: 48, height: 2, background: 'var(--gold)', marginBottom: 40 }} />
        </div>

        {hasPhotos ? (
          <div className="gallery-grid reveal">
            {items.map((item, i) => (
              <div key={item.id} className={`gallery-item${i === 0 ? ' gallery-featured' : ''}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image_url} alt={item.caption || `Gallery photo ${i + 1}`} />
                <div className="gallery-overlay">
                  {item.caption && <span className="gallery-caption">{item.caption}</span>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="gallery-mosaic reveal">
            {PLACEHOLDER_TILES.map((tile) => (
              <div
                key={tile.caption}
                className="gallery-item gallery-tile"
                style={{ ...tile.area, minHeight: tile.minHeight }}
              >
                <div className="gallery-overlay gallery-overlay-static">
                  <span className="gallery-caption">{tile.caption}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="reveal" style={{ textAlign: 'center', marginTop: 24, fontSize: 12, color: 'var(--gray)', letterSpacing: 1 }}>
          Follow us on Instagram{' '}
          <a href={BUSINESS.instagramUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
            {BUSINESS.instagram}
          </a>{' '}
          for the latest work
        </p>
      </div>

      <style>{`
        .gallery-grid, .gallery-mosaic {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: auto;
          gap: 8px;
          margin-top: 16px;
        }
        .gallery-featured { grid-column: 1 / 3; }
        .gallery-item {
          overflow: hidden;
          position: relative;
          background: var(--navy);
          border: 1px solid var(--border);
        }
        .gallery-tile {
          background: linear-gradient(135deg, #1a1f2e 0%, #2a2f3e 100%);
        }
        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease, filter 0.5s ease;
          filter: brightness(0.85) saturate(0.8);
          min-height: 240px;
        }
        .gallery-item:hover img {
          transform: scale(1.05);
          filter: brightness(1) saturate(1);
        }
        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(18,21,31,0.6), transparent);
          opacity: 0;
          transition: opacity 0.3s;
          display: flex;
          align-items: flex-end;
          padding: 16px;
        }
        .gallery-overlay-static { opacity: 1; }
        .gallery-item:hover .gallery-overlay { opacity: 1; }
        .gallery-caption {
          font-family: var(--font-bebas, 'Bebas Neue'), sans-serif;
          font-size: 18px;
          letter-spacing: 2px;
          color: var(--gold);
        }
        @media (max-width: 768px) {
          .gallery-grid, .gallery-mosaic { grid-template-columns: 1fr 1fr; }
          .gallery-featured { grid-column: 1 / 3; }
          .gallery-tile { grid-column: auto !important; grid-row: auto !important; min-height: 200px !important; }
        }
      `}</style>
    </section>
  )
}
