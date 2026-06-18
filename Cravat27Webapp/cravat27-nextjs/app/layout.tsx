import type { Metadata } from 'next'
import { Bebas_Neue, Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const playfair = Playfair_Display({
  weight: ['700', '900'],
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Cravat27 | The Barbershop — Davie, FL',
  description:
    'Premium barbershop in Davie, FL. Expert fades, cuts, and grooming. Book your appointment online.',
  openGraph: {
    title: 'Cravat27 | The Barbershop',
    description: 'Premium barbershop in Davie, FL. Expert fades, cuts, and grooming.',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${playfair.variable} ${dmSans.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
