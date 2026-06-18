'use client'

import { useState } from 'react'
import { Service } from '@/lib/supabase'
import { createClient } from '@/lib/supabase/client'

export default function ServicesAdmin({ initialServices }: { initialServices: Service[] }) {
  const supabase = createClient()
  const [services, setServices] = useState<Service[]>(initialServices)
  const [editing, setEditing] = useState<Service | null>(null)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  async function move(index: number, dir: -1 | 1) {
    const target = index + dir
    if (target < 0 || target >= services.length) return
    const reordered = [...services]
    const a = reordered[index]
    const b = reordered[target]
    // swap their display_order values and array positions
    const aOrder = a.display_order
    a.display_order = b.display_order
    b.display_order = aOrder
    reordered[index] = b
    reordered[target] = a
    setServices(reordered)
    const now = new Date().toISOString()
    const [r1, r2] = await Promise.all([
      supabase.from('services').update({ display_order: a.display_order, updated_at: now }).eq('id', a.id),
      supabase.from('services').update({ display_order: b.display_order, updated_at: now }).eq('id', b.id),
    ])
    if (r1.error || r2.error) setMsg('Error reordering: ' + (r1.error || r2.error)?.message)
  }

  async function toggleVisible(s: Service) {
    const newVal = !s.visible
    setServices((prev) => prev.map((x) => (x.id === s.id ? { ...x, visible: newVal } : x)))
    const { error } = await supabase.from('services').update({ visible: newVal, updated_at: new Date().toISOString() }).eq('id', s.id)
    if (error) {
      setMsg('Error saving: ' + error.message)
      setServices((prev) => prev.map((x) => (x.id === s.id ? { ...x, visible: !newVal } : x)))
    }
  }

  async function handleUpload(file: File): Promise<string | null> {
    setUploading(true)
    const ext = file.name.split('.').pop()
    const path = `services/${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('images').upload(path, file, { upsert: true })
    setUploading(false)
    if (error) {
      setMsg('Upload error: ' + error.message)
      return null
    }
    const { data } = supabase.storage.from('images').getPublicUrl(path)
    return data.publicUrl
  }

  async function saveEdit() {
    if (!editing) return
    setSaving(true)
    const { error } = await supabase
      .from('services')
      .update({
        name: editing.name,
        price: editing.price,
        duration: editing.duration,
        image_url: editing.image_url,
        visible: editing.visible,
        updated_at: new Date().toISOString(),
      })
      .eq('id', editing.id)
    setSaving(false)
    if (error) {
      setMsg('Error: ' + error.message)
      return
    }
    setServices((prev) => prev.map((x) => (x.id === editing.id ? editing : x)))
    setEditing(null)
    setMsg('Saved!')
    setTimeout(() => setMsg(null), 2000)
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
  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: 'var(--gold)',
  }

  return (
    <>
      <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-bebas, Bebas Neue), sans-serif', fontSize: 48, letterSpacing: 2, color: 'var(--white)', lineHeight: 1 }}>
            Services
          </h1>
          <p style={{ color: 'var(--gray)', marginTop: 8, fontSize: 15 }}>
            Tap a service to edit. Changes show on the live site within a minute.
          </p>
        </div>
        {msg && (
          <span style={{ color: 'var(--gold)', fontSize: 14, fontWeight: 600 }}>{msg}</span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {services.map((s, index) => (
          <div
            key={s.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              background: 'var(--navy-light)',
              border: '1px solid var(--border)',
              padding: 12,
              flexWrap: 'wrap',
            }}
          >
            {/* Reorder controls */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0 }}>
              <button
                onClick={() => move(index, -1)}
                disabled={index === 0}
                aria-label="Move up"
                style={{
                  width: 30, height: 26, background: 'transparent',
                  border: '1px solid var(--border)', color: index === 0 ? 'var(--border)' : 'var(--gold)',
                  cursor: index === 0 ? 'default' : 'pointer', fontSize: 11, lineHeight: 1,
                }}
              >
                ▲
              </button>
              <button
                onClick={() => move(index, 1)}
                disabled={index === services.length - 1}
                aria-label="Move down"
                style={{
                  width: 30, height: 26, background: 'transparent',
                  border: '1px solid var(--border)', color: index === services.length - 1 ? 'var(--border)' : 'var(--gold)',
                  cursor: index === services.length - 1 ? 'default' : 'pointer', fontSize: 11, lineHeight: 1,
                }}
              >
                ▼
              </button>
            </div>

            {/* Thumbnail */}
            <div style={{ width: 60, height: 60, flexShrink: 0, background: 'var(--navy)', border: '1px solid var(--border)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {s.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={s.image_url} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ color: 'var(--gold)', opacity: 0.4, fontSize: 20 }}>✂</span>
              )}
            </div>

            {/* Name + meta */}
            <div style={{ flex: 1, minWidth: 140 }}>
              <p style={{ color: 'var(--white)', fontWeight: 600, fontSize: 15 }}>{s.name}</p>
              <p style={{ color: 'var(--gray)', fontSize: 13, marginTop: 2 }}>
                {s.price} · {s.duration}
              </p>
            </div>

            {/* Visible toggle */}
            <button
              onClick={() => toggleVisible(s)}
              style={{
                minHeight: 44,
                padding: '0 16px',
                background: s.visible ? 'var(--gold-dim)' : 'transparent',
                border: `1px solid ${s.visible ? 'var(--gold)' : 'var(--border)'}`,
                color: s.visible ? 'var(--gold)' : 'var(--gray)',
                fontSize: 12,
                letterSpacing: 1,
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              {s.visible ? '● Visible' : '○ Hidden'}
            </button>

            {/* Edit */}
            <button
              onClick={() => setEditing(s)}
              style={{
                minHeight: 44,
                padding: '0 20px',
                background: 'var(--gold)',
                border: 'none',
                color: 'var(--navy)',
                fontSize: 12,
                letterSpacing: 1,
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontWeight: 700,
              }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {/* Edit modal */}
      {editing && (
        <div
          onClick={() => setEditing(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
            zIndex: 200,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--navy-light)',
              border: '1px solid var(--gold)',
              padding: 28,
              width: '100%',
              maxWidth: 460,
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <h2 style={{ fontFamily: 'var(--font-bebas, Bebas Neue), sans-serif', fontSize: 30, letterSpacing: 1.5, color: 'var(--gold)', marginBottom: 20 }}>
              Edit Service
            </h2>

            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>Name</label>
              <input style={inputStyle} value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
            </div>

            <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Price</label>
                <input style={inputStyle} value={editing.price} onChange={(e) => setEditing({ ...editing, price: e.target.value })} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Duration</label>
                <input style={inputStyle} value={editing.duration} onChange={(e) => setEditing({ ...editing, duration: e.target.value })} />
              </div>
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>Photo</label>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 6 }}>
                <div style={{ width: 70, height: 70, flexShrink: 0, background: 'var(--navy)', border: '1px solid var(--border)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {editing.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={editing.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ color: 'var(--gold)', opacity: 0.4 }}>✂</span>
                  )}
                </div>
                <label style={{ ...inputStyle, marginTop: 0, cursor: 'pointer', textAlign: 'center', flex: 1 }}>
                  {uploading ? 'Uploading…' : 'Choose Photo'}
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={async (e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        const url = await handleUpload(file)
                        if (url) setEditing({ ...editing, image_url: url })
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', textTransform: 'none', fontSize: 14, color: 'var(--white)' }}>
                <input type="checkbox" checked={editing.visible} onChange={(e) => setEditing({ ...editing, visible: e.target.checked })} style={{ width: 20, height: 20 }} />
                Show on live site
              </label>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={saveEdit}
                disabled={saving}
                style={{
                  flex: 1,
                  minHeight: 48,
                  background: 'var(--gold)',
                  border: 'none',
                  color: 'var(--navy)',
                  fontSize: 13,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {saving ? 'Saving…' : 'Save'}
              </button>
              <button
                onClick={() => setEditing(null)}
                style={{
                  flex: 1,
                  minHeight: 48,
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  color: 'var(--gray)',
                  fontSize: 13,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
