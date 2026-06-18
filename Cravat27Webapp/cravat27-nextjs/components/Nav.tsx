'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BOOKING_URL } from '@/lib/data'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#info', label: 'Hours' },
  ]

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: scrolled ? '12px 48px' : '18px 48px',
        background: 'rgba(18,21,31,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        transition: 'padding 0.3s',
      }}
    >
      <Link href="#hero" style={{ textDecoration: 'none' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="Cravat27 The Barbershop"
          style={{ height: 40, objectFit: 'contain' }}
        />
      </Link>

      {/* Desktop nav */}
      <ul
        style={{
          display: 'flex',
          gap: 36,
          listStyle: 'none',
          alignItems: 'center',
          margin: 0,
          padding: 0,
        }}
        className="desktop-nav"
      >
        {navLinks.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              style={{
                color: 'var(--gray)',
                textDecoration: 'none',
                fontSize: 13,
                letterSpacing: 2,
                textTransform: 'uppercase',
                fontWeight: 500,
                transition: 'color 0.2s',
                fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--gray)')}
            >
              {l.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--navy)',
              background: 'var(--gold)',
              textDecoration: 'none',
              fontSize: 13,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              fontWeight: 600,
              padding: '10px 22px',
              transition: 'background 0.2s, transform 0.2s',
              fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--gold-light)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--gold)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Book Now
          </a>
        </li>
      </ul>

      {/* Hamburger */}
      <button
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
        className="hamburger-btn"
        style={{
          display: 'none',
          flexDirection: 'column',
          gap: 5,
          cursor: 'pointer',
          background: 'none',
          border: 'none',
          padding: 4,
        }}
      >
        <span style={{ display: 'block', width: 24, height: 2, background: 'var(--white)', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : '' }} />
        <span style={{ display: 'block', width: 24, height: 2, background: 'var(--white)', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
        <span style={{ display: 'block', width: 24, height: 2, background: 'var(--white)', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : '' }} />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="mobile-menu"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--navy-light)',
            borderBottom: '1px solid var(--border)',
            padding: 24,
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: 'var(--gray)',
                textDecoration: 'none',
                fontSize: 13,
                letterSpacing: 2,
                textTransform: 'uppercase',
                fontWeight: 500,
                fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="btn-primary"
            style={{ textAlign: 'center' }}
          >
            Book Now
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
