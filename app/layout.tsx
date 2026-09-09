import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DevGate from '@/components/DevGate'
import WhatsAppButton from '@/components/WhatsAppButton'
import CloudflareAnalytics from '@/components/CloudflareAnalytics'
import { LocaleProvider } from '@/lib/i18n/context'

const SITE_URL = 'https://maragota-boats.pages.dev'
const TITLE = 'Maragota Boats - Reservas de Pesca'
const DESCRIPTION = 'Reserva tu salida de pesca en Galicia con patrones locales. Equipo, seguro y guía incluidos. Reserva online en minutos.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s | Maragota Boats',
  },
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: 'Maragota Boats',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Maragota Boats' }],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-maragota-white">
        <LocaleProvider>
          <DevGate>
            <Navbar />
            <main>
              {children}
            </main>
            <Footer />
            <WhatsAppButton />
          </DevGate>
        </LocaleProvider>
        <CloudflareAnalytics />
      </body>
    </html>
  )
}
