import LegalNav from '@/components/LegalNav'

export const metadata = {
  title: 'Cookies',
}

export default function CookiesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <LegalNav current="/legal/cookies" />

      <h1 className="text-3xl font-bold text-maragota-black mb-2">Política de cookies</h1>
      <p className="text-sm text-gray-500 mb-8">Última actualización: septiembre de 2026</p>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <section>
          <p>
            Este sitio web usa el almacenamiento local del navegador (localStorage) — técnicamente
            distinto de una cookie, pero con una función equivalente — únicamente para funciones
            necesarias del servicio. No utilizamos cookies de analítica ni de publicidad.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-maragota-black mb-3">Almacenamiento que usamos</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse mt-2">
              <thead>
                <tr className="bg-maragota-light-gray text-left">
                  <th className="p-3 border">Nombre</th>
                  <th className="p-3 border">Tipo</th>
                  <th className="p-3 border">Finalidad</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border">maragota_dev_access</td>
                  <td className="p-3 border">Técnica / necesaria</td>
                  <td className="p-3 border">Mantiene el acceso durante la fase de desarrollo del sitio</td>
                </tr>
                <tr>
                  <td className="p-3 border">franchisee_session</td>
                  <td className="p-3 border">Técnica / necesaria</td>
                  <td className="p-3 border">Mantiene tu sesión iniciada en el panel de franquiciado</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-maragota-black mb-3">Cookies de terceros</h2>
          <p>
            Al procesar un pago, Stripe puede utilizar sus propias cookies técnicas necesarias para
            prevenir el fraude y completar la transacción. Puedes consultar su política en{' '}
            <a href="https://stripe.com/es/privacy" className="text-maragota-orange hover:underline" target="_blank" rel="noopener noreferrer">
              stripe.com/es/privacy
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-maragota-black mb-3">Cómo desactivarlas</h2>
          <p>
            Puedes borrar el almacenamiento local desde la configuración de tu navegador en cualquier
            momento. Al ser técnicas y necesarias para el funcionamiento del sitio, no ofrecemos un
            panel de consentimiento — no se usan con fines de seguimiento ni publicidad.
          </p>
        </section>
      </div>
    </div>
  )
}
