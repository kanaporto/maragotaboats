import LegalNav from '@/components/LegalNav'

export const metadata = {
  title: 'Condiciones de reserva',
}

export default function TerminosPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <LegalNav current="/legal/terminos" />

      <h1 className="text-3xl font-bold text-maragota-black mb-2">Condiciones de reserva</h1>
      <p className="text-sm text-gray-500 mb-8">Última actualización: septiembre de 2026</p>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-maragota-black mb-3">1. Qué es Maragota Boats</h2>
          <p>
            Maragota Boats es una red de franquicias de salidas de pesca en España. La plataforma
            (maragota-boats.pages.dev) permite buscar disponibilidad y reservar plaza en salidas
            operadas por franquiciados independientes de Maragota Boats en cada localidad.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-maragota-black mb-3">2. Precio y forma de pago</h2>
          <p>
            El precio de cada salida se divide en dos pagos:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Reserva (15€ por persona):</strong> se cobra en el momento de reservar, a través de la plataforma. Este importe corresponde al uso de la plataforma de reservas y no es reembolsable salvo lo indicado en el punto 4.</li>
            <li><strong>Salida (45€ por persona):</strong> se paga directamente al franquiciado el día de la actividad, en efectivo o tarjeta.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-maragota-black mb-3">3. Cancelaciones por parte del cliente</h2>
          <p>
            Las reservas son finales: el importe de la reserva (15€ por persona) no se reembolsa en
            caso de cancelación por parte del cliente, salvo que el franquiciado, a su criterio, decida
            lo contrario.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-maragota-black mb-3">4. Cambios de fecha por parte del franquiciado</h2>
          <p>
            El franquiciado puede modificar la fecha u hora de una salida ya reservada cuando lo
            considere necesario (condiciones meteorológicas, disponibilidad del barco u otras causas
            operativas), avisando directamente al cliente. Esta facultad es exclusiva del franquiciado
            y no se ofrece como opción de autoservicio al cliente en la plataforma.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-maragota-black mb-3">5. Inasistencia del cliente (no-show)</h2>
          <p>
            Si el cliente no se presenta a la salida reservada sin previo aviso:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Maragota Boats no reembolsa el importe de la reserva (15€ por persona).</li>
            <li>
              El franquiciado no tiene derecho a reclamar a Maragota Boats el importe que habría
              cobrado en destino (45€ por persona) ni ninguna otra compensación por la inasistencia.
            </li>
            <li>
              Maragota Boats no asume responsabilidad alguna, económica o de otro tipo, derivada de
              la inasistencia de un cliente a una salida reservada.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-maragota-black mb-3">6. Requisitos de la actividad</h2>
          <p>
            La salida incluye equipo de pesca y cebo, seguro obligatorio, licencia de pesca colectiva,
            combustible, chaleco salvavidas y monitor guía a bordo. La edad mínima, el grupo mínimo y
            la duración concretos dependen de cada franquicia y se indican en el momento de la reserva.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-maragota-black mb-3">7. Contacto</h2>
          <p>
            Para cualquier consulta sobre una reserva: info@maragotaboats.com — 671 722 272.
          </p>
        </section>
      </div>
    </div>
  )
}
