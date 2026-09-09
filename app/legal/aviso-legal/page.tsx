import LegalNav from '@/components/LegalNav'

export const metadata = {
  title: 'Aviso legal',
}

export default function AvisoLegalPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <LegalNav current="/legal/aviso-legal" />

      <h1 className="text-3xl font-bold text-maragota-black mb-2">Aviso legal</h1>
      <p className="text-sm text-gray-500 mb-8">Última actualización: septiembre de 2026</p>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-maragota-black mb-3">Titular del sitio web</h2>
          <ul className="space-y-1">
            <li><strong>Razón social:</strong> Maragota Boats S.L.</li>
            <li><strong>CIF:</strong> B09805979</li>
            <li><strong>Domicilio:</strong> Calle La Marina 14, 1º, Portonovo, 36970 Sanxenxo (Pontevedra)</li>
            <li><strong>Registro Mercantil:</strong> Registro Mercantil de Pontevedra, tomo 4396, folio 85, hoja 69598</li>
            <li><strong>Teléfono:</strong> 671 722 272</li>
            <li><strong>Email:</strong> info@maragotaboats.com</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-maragota-black mb-3">Objeto</h2>
          <p>
            Este sitio web (maragota-boats.pages.dev) permite buscar y reservar salidas de pesca
            operadas por franquiciados de la red Maragota Boats en distintas localidades de España.
            El uso de este sitio web atribuye la condición de usuario y supone la aceptación de este
            aviso legal, de las <a href="/legal/terminos" className="text-maragota-orange hover:underline">condiciones de reserva</a> y
            de la <a href="/legal/privacidad" className="text-maragota-orange hover:underline">política de privacidad</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-maragota-black mb-3">Legislación aplicable</h2>
          <p>
            Las relaciones entre Maragota Boats S.L. y los usuarios de este sitio web se rigen por la
            legislación española. Para cualquier controversia que pudiera surgir, las partes se
            someten a los juzgados y tribunales del domicilio del usuario, cuando este tenga la
            condición de consumidor.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-maragota-black mb-3">Propiedad intelectual</h2>
          <p>
            El diseño, la marca, los textos y el código de este sitio web son propiedad de Maragota
            Boats S.L. o de sus franquiciados. Queda prohibida su reproducción total o parcial sin
            autorización expresa.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-maragota-black mb-3">Franquiciados</h2>
          <p>
            Cada salida de pesca es operada por un franquiciado independiente de Maragota Boats,
            responsable de la prestación del servicio en el día de la actividad. Maragota Boats S.L.
            opera la plataforma de reservas y actúa de intermediario entre el cliente y el
            franquiciado en los términos descritos en las <a href="/legal/terminos" className="text-maragota-orange hover:underline">condiciones de reserva</a>.
          </p>
        </section>
      </div>
    </div>
  )
}
