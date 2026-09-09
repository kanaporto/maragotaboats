import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

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
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
