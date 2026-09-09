import FranchiseInquiryForm from '@/components/FranchiseInquiryForm'

const STEPS = [
  {
    icon: '📝',
    title: 'Solicita información',
    description: 'Rellena el formulario con tus datos y tu zona. Es gratis y no te compromete a nada.',
  },
  {
    icon: '🤝',
    title: 'Hablamos contigo',
    description: 'Nuestro equipo revisa tu solicitud y te contacta para conocer tu experiencia y disponibilidad.',
  },
  {
    icon: '📋',
    title: 'Alta como franquiciado',
    description: 'Formalizamos el acuerdo y verificamos documentación, seguros y licencia de patrón.',
  },
  {
    icon: '🚤',
    title: 'Configura tu barco',
    description: 'Damos de alta tu barco y tu zona en la app: plazas, disponibilidad y datos de contacto.',
  },
  {
    icon: '📲',
    title: 'Recibe reservas',
    description: 'Los clientes reservan y pagan la seña online. Tú cobras el resto en destino y sales a pescar.',
  },
]

const BENEFITS = [
  {
    icon: '🌊',
    title: 'Marca reconocida',
    description: 'Te unes a una red con presencia en toda Galicia y en expansión por España, con marketing centralizado.',
  },
  {
    icon: '💶',
    title: 'Modelo de precios simple',
    description: 'Un precio fijo y transparente para el cliente. Tú te centras en pescar, nosotros en traer reservas.',
  },
  {
    icon: '📱',
    title: 'Panel de gestión propio',
    description: 'Gestiona tus barcos, plazas y reservas desde tu propio panel, accesible desde cualquier dispositivo.',
  },
  {
    icon: '💳',
    title: 'Cobros ya resueltos',
    description: 'La seña se cobra online al reservar. Tú solo gestionas el cobro del resto en destino.',
  },
  {
    icon: '📈',
    title: 'Tú decides tu disponibilidad',
    description: 'Marca los días y plazas que quieres ofrecer. El control de tu actividad sigue siendo tuyo.',
  },
  {
    icon: '🚤',
    title: 'Te damos el barco',
    description: 'La franquicia incluye un barco Poly Made diseñado para pesca. Tú solo tienes que salir a pescar.',
  },
]

export default function FranchisePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-maragota-light-gray to-white">
      {/* Hero */}
      <section className="bg-maragota-black text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Maragota_Principal.webp" alt="Maragota Boats" className="h-20 w-auto mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Franquíciate con <span className="text-maragota-orange">Maragota Boats</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Convierte tu barco y tu experiencia en un negocio. Nosotros traemos a los pescadores,
            tú les enseñas el mar.
          </p>
          <a href="#solicitud" className="btn-primary inline-block">
            Quiero ser franquiciado
          </a>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-maragota-black text-center mb-2">
            ¿Cómo unirte a Maragota Boats?
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Un proceso sencillo, sin registro automático — hablamos contigo en cada paso.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {STEPS.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="text-4xl">{step.icon}</div>
                  <div className="absolute -top-2 -right-3 bg-maragota-orange text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                    {i + 1}
                  </div>
                </div>
                <h3 className="font-bold text-maragota-black mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 px-4 bg-maragota-light-gray">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-maragota-black text-center mb-12">
            ¿Por qué franquiciarte con nosotros?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BENEFITS.map((benefit) => (
              <div key={benefit.title} className="card">
                <div className="text-3xl mb-3">{benefit.icon}</div>
                <h3 className="font-bold text-maragota-black mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulario */}
      <section id="solicitud" className="py-16 px-4">
        <div className="max-w-xl mx-auto">
          <FranchiseInquiryForm />
        </div>
      </section>
    </div>
  )
}
