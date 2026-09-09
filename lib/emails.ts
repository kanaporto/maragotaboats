// Servicio de emails con Resend
// En producción, se conectaría con Resend real

interface ReservationEmailData {
  to: string
  customerName: string
  boatName: string
  numPeople: number
  date?: string
  time?: string
  totalPrice: number
  reservationId: string
}

interface MonthlyReportData {
  to: string
  franchisoeName: string
  month: string
  year: number
  totalReservations: number
  totalRevenue: number
  byProvince: Record<string, { reservations: number; revenue: number }>
  insights: {
    topProvince: string
    topDay: string
    averagePartySize: number
  }
  trends?: {
    lastYearReservations: number
    lastYearRevenue: number
    reservationChange: number
    revenueChange: number
  }
  redFlags?: Array<{
    province: string
    issue: string
    severity: 'warning' | 'critical'
  }>
}

export async function sendReservationConfirmationEmail(data: ReservationEmailData) {
  try {
    // En desarrollo, solo logueamos
    console.log('📧 Email de confirmación de reserva:', {
      to: data.to,
      subject: `Reserva confirmada - ${data.boatName}`,
      customerName: data.customerName,
      numPeople: data.numPeople,
      totalPrice: data.totalPrice,
      reservationId: data.reservationId,
    })

    // En producción se enviaría con Resend:
    // const response = await resend.emails.send({
    //   from: 'reservas@maragotaboats.com',
    //   to: data.to,
    //   subject: `Reserva confirmada - ${data.boatName}`,
    //   html: generateReservationEmailHTML(data),
    // })

    return { success: true, messageId: `msg-${data.reservationId}` }
  } catch (error) {
    console.error('Error enviando email de reserva:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' }
  }
}

// Recordatorio enviado el día antes de la salida, para reducir no-shows.
// NOTA: para que esto se dispare automáticamente hace falta guardar las
// reservas reales en algún sitio consultable (hoy no persisten en ningún
// lado) y un trigger programado que las revise a diario — pendiente de la
// migración a base de datos real. La función y la plantilla ya están listas
// para cuando exista esa pieza.
export async function sendReminderEmail(data: ReservationEmailData) {
  try {
    console.log('📧 Email recordatorio (día antes):', {
      to: data.to,
      subject: `Recordatorio: tu salida de pesca es mañana - ${data.boatName}`,
      customerName: data.customerName,
      date: data.date,
      time: data.time,
      reservationId: data.reservationId,
    })

    return { success: true, messageId: `reminder-${data.reservationId}` }
  } catch (error) {
    console.error('Error enviando email de recordatorio:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' }
  }
}

export async function sendMonthlyReportEmail(data: MonthlyReportData) {
  try {
    const changePercentage = data.trends
      ? ((data.trends.reservationChange / data.trends.lastYearReservations) * 100).toFixed(1)
      : 0

    console.log('📧 Email de reporte mensual:', {
      to: data.to,
      franchisoeName: data.franchisoeName,
      month: data.month,
      year: data.year,
      totalReservations: data.totalReservations,
      totalRevenue: data.totalRevenue,
      reservationChangePercentage: changePercentage,
      redFlagsCount: data.redFlags?.length || 0,
    })

    return { success: true, messageId: `report-${data.year}-${data.month}` }
  } catch (error) {
    console.error('Error enviando email de reporte:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' }
  }
}

export async function sendFranchisoeeCredentialsEmail(
  email: string,
  franchiseName: string,
  username: string,
  tempPassword: string
) {
  try {
    console.log('📧 Email de credenciales de franquiciado:', {
      to: email,
      franchisoeName: franchiseName,
      username: username,
      tempPassword: tempPassword,
    })

    return { success: true }
  } catch (error) {
    console.error('Error enviando email de credenciales:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' }
  }
}

export async function sendPasswordResetEmail(email: string, resetLink: string) {
  try {
    console.log('📧 Email de reset de contraseña:', {
      to: email,
      resetLink: resetLink,
    })

    return { success: true }
  } catch (error) {
    console.error('Error enviando email de reset:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' }
  }
}

// HTML templates para emails (en desarrollo solo logramos)
export function generateReservationEmailHTML(data: ReservationEmailData): string {
  return `
    <h1>¡Reserva confirmada!</h1>
    <p>Hola ${data.customerName},</p>
    <p>Tu reserva en el barco <strong>${data.boatName}</strong> ha sido confirmada.</p>
    <p><strong>Detalles:</strong></p>
    <ul>
      <li>Personas: ${data.numPeople}</li>
      <li>Precio: ${data.totalPrice}€</li>
      <li>ID de reserva: ${data.reservationId}</li>
    </ul>
    <p>¡Que disfrutes de la pesca!</p>
  `
}

export function generateReminderEmailHTML(data: ReservationEmailData): string {
  return `
    <h1>🎣 ¡Tu salida de pesca es mañana!</h1>
    <p>Hola ${data.customerName},</p>
    <p>Te recordamos tu salida en el barco <strong>${data.boatName}</strong>.</p>
    <ul>
      <li>Fecha: ${data.date}</li>
      <li>Hora: ${data.time}</li>
      <li>Personas: ${data.numPeople}</li>
    </ul>
    <p>Recuerda que si no te presentas, la seña de la reserva no se reembolsa
    (ver <a href="https://maragota-boats.pages.dev/legal/terminos">condiciones de reserva</a>).</p>
    <p>¡Te esperamos!</p>
  `
}
