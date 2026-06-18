'use client'

import { useState } from 'react'
import { BusinessInfo } from '@/lib/supabase'
import { createClient } from '@/lib/supabase/client'
import { BUSINESS } from '@/lib/data'

const EMPTY: Omit<BusinessInfo, 'id'> = {
  hours_weekday: BUSINESS.hoursWeekday,
  hours_sunday: BUSINESS.hoursSunday,
  phone: BUSINESS.phone,
  email: BUSINESS.email,
  address: BUSINESS.address,
  instagram_handle: BUSINESS.instagram,
  booking_url: BUSINESS.bookingUrl,
}

export default function InfoAdmin({ initial }: { initial: BusinessInfo | null }) {
  const supabase = createClient()
  const [form, setForm] = useState<Partial<BusinessInfo>>(initial || EMPTY)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  async function save() {
    setSaving(true)
    setMsg(null)
    let error
    if (initial?.id) {
      ;({ error } = await supabase.from('business_info').update(form).eq('id', initial.id))
    } else {
      ;({ error } = await supabase.from('business_info').insert(form))
    }
    setSaving(false)
    setMsg(error ? 'Error: ' + error.message : 'Saved!')
    if (!error) setTimeout(() => setMsg(null), 2500)
  }

  const fields: { key: keyof BusinessInfo; label: string }[] = [
    { key: 'hours_weekday', label: 'Hours (Mon–Sat)' },
    { key: 'hours_sunday', label: 'Hours (Sunday)' },
    { key: 'phone', label: 'Phone' },
    { key: 'email', label: 'Email' },
    { key: 'address', label: 'Address' },
    { key: 'instagram_handle', label: 'Instagram Handle' },
    { key: 'booking_url', label: 'Square Booking URL' },
  ]

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    background: 'var(--navy-light)',
    border: '1px solid var(--border)',
    color: 'var(--white)',
    fontSize: 16,
    fontFamily: 'inherit',
    marginTop: 6,
  }

  return (
    <>
      <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-bebas, Bebas Neue), sans-serif', fontSize: 48, letterSpacing: 2, color: 'var(--white)', lineHeight: 1 }}>
            Business Info
          </h1>
          <p style={{ color: 'var(--gray)', marginTop: 8, fontSize: 15 }}>
            Update your hours, contact details, and booking link.
          </p>
        </div>
        {msg && <span style={{ color: 'var(--gold)', fontSize: 14, fontWeight: 600 }}>{msg}</span>}
      </div>

      <div style={{ maxWidth: 560, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {fields.map((f) => (
          <div key={f.key}>
            <label style={{ fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--gold)' }}>{f.label}</label>
            <input
              style={inputStyle}
              value={(form[f.key] as string) || ''}
              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
            />
          </div>
        ))}

        <button
          onClick={save}
          disabled={saving}
          style={{
            minHeight: 52,
            background: 'var(--gold)',
            border: 'none',
            color: 'var(--navy)',
            fontSize: 14,
            letterSpacing: 2,
            textTransform: 'uppercase',
            fontWeight: 700,
            cursor: 'pointer',
            marginTop: 8,
          }}
        >
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>
    </>
  )
}
