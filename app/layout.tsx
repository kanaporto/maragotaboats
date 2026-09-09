import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DevGate from '@/components/DevGate'
import WhatsAppButton from '@/components/WhatsAppButton'
import { LocaleProvider } from '@/lib/i18n/context'

export const metadata: Metadata = {
  title: 'Maragota Boats - Reservas de Pesca',
  description: 'Reserva tu experiencia de pesca en España',
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
      </body>
    </html>
  )
}
