export default function GalleryAdminPage() {
  return (
    <>
      <h1 style={{ fontFamily: 'var(--font-bebas, Bebas Neue), sans-serif', fontSize: 48, letterSpacing: 2, color: 'var(--white)', lineHeight: 1 }}>
        Gallery
      </h1>
      <p style={{ color: 'var(--gray)', marginTop: 8, fontSize: 15 }}>
        Photo management is coming soon. For now, the gallery on the live site shows a
        &ldquo;Photos Coming Soon&rdquo; placeholder until images are added.
      </p>

      <div
        style={{
          marginTop: 32,
          padding: 48,
          border: '1px dashed var(--border)',
          textAlign: 'center',
          color: 'var(--gray)',
          background: 'var(--navy-light)',
        }}
      >
        <div style={{ fontSize: 40, opacity: 0.3, marginBottom: 12 }}>✂</div>
        <p style={{ letterSpacing: 1, textTransform: 'uppercase', fontSize: 13 }}>
          Gallery uploads will appear here
        </p>
      </div>
    </>
  )
}
