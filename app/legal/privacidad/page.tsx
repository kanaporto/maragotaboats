import LegalNav from '@/components/LegalNav'

export const metadata = {
  title: 'Privacidad',
}

export default function PrivacidadPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <LegalNav current="/legal/privacidad" />

      <h1 className="text-3xl font-bold text-maragota-black mb-2">Política de privacidad</h1>
      <p className="text-sm text-gray-500 mb-8">Última actualización: septiembre de 2026</p>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-maragota-black mb-3">Responsable del tratamiento</h2>
          <p>
            Maragota Boats S.L., CIF B09805979, Calle La Marina 14, 1º, Portonovo, 36970 Sanxenxo
            (Pontevedra) — info@maragotaboats.com — 671 722 272. Esta política cumple con el
            Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos
            Personales y garantía de los derechos digitales (LOPD-GDD).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-maragota-black mb-3">Qué datos recogemos y para qué</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse mt-2">
              <thead>
                <tr className="bg-maragota-light-gray text-left">
                  <th className="p-3 border">Dato</th>
                  <th className="p-3 border">Cuándo</th>
                  <th className="p-3 border">Finalidad</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border">Nombre, email, teléfono</td>
                  <td className="p-3 border">Al hacer una reserva</td>
                  <td className="p-3 border">Gestionar la reserva y comunicarla al franquiciado</td>
                </tr>
                <tr>
                  <td className="p-3 border">Datos de pago</td>
                  <td className="p-3 border">Al pagar la reserva</td>
                  <td className="p-3 border">Procesados directamente por Stripe; no accedemos ni almacenamos tu tarjeta</td>
                </tr>
                <tr>
                  <td className="p-3 border">Nombre, email, teléfono, ubicación</td>
                  <td className="p-3 border">Al solicitar ser franquiciado</td>
                  <td className="p-3 border">Gestionar la solicitud y contactar contigo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-maragota-black mb-3">Con quién compartimos tus datos</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>El franquiciado</strong> de la salida que reservas, para poder prestarte el servicio.</li>
            <li><strong>Stripe</strong>, como pasarela de pago, para procesar el cobro de la reserva.</li>
            <li><strong>Resend</strong>, para el envío de emails transaccionales (confirmación de reserva, recordatorios).</li>
          </ul>
          <p className="mt-2">No vendemos ni cedemos tus datos a terceros con fines publicitarios.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-maragota-black mb-3">Conservación de los datos</h2>
          <p>
            Conservamos los datos de una reserva mientras sea necesario para gestionarla y durante el
            plazo legal aplicable a efectos fiscales y de posibles reclamaciones.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-maragota-black mb-3">Tus derechos</h2>
          <p>
            Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y
            portabilidad escribiendo a info@maragotaboats.com. También puedes reclamar ante la
            Agencia Española de Protección de Datos (aepd.es).
          </p>
        </section>
      </div>
    </div>
  )
}
