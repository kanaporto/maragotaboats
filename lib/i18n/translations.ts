// Diccionarios de traducción. La interfaz Translations es la fuente de
// verdad de la forma: TypeScript obliga a que 'en' y 'fr' implementen
// exactamente las mismas claves que 'es', así que no puede faltar una
// traducción sin que el build falle.

export type Locale = 'es' | 'gl' | 'ca' | 'eu' | 'en' | 'fr'

export const LOCALE_LABELS: Record<Locale, string> = {
  es: 'ES',
  gl: 'GL',
  ca: 'CA',
  eu: 'EU',
  en: 'EN',
  fr: 'FR',
}

// Galicia, Cataluña y Euskadi no tienen bandera propia en el estándar Unicode
// (a diferencia de países), así que usamos la bandera de España para las
// cuatro lenguas cooficiales y las distinguimos por nombre en el desplegable.
export const LOCALE_FLAGS: Record<Locale, string> = {
  es: '🇪🇸',
  gl: '🇪🇸',
  ca: '🇪🇸',
  eu: '🇪🇸',
  en: '🇬🇧',
  fr: '🇫🇷',
}

export const LOCALE_NAMES: Record<Locale, string> = {
  es: 'Español',
  gl: 'Galego',
  ca: 'Català',
  eu: 'Euskara',
  en: 'English',
  fr: 'Français',
}

export interface Translations {
  nav: {
    reservas: string
    franquiciate: string
    franquiciado: string
  }
  whatsapp: {
    ariaLabel: string
    tooltip: string
    defaultMessage: string
  }
  footer: {
    forProfessionals: string
    terms: string
    privacy: string
    legal: string
    cookies: string
  }
  home: {
    heroTitle: string
    heroSubtitle1: string
    heroSubtitle2: string
    howItWorksTitle: string
    step1Title: string
    step1Desc: string
    step2Title: string
    step2Desc: string
    step3Title: string
    step3Desc: string
    paymentConfirmedTitle: string
    paidLabel: string
    confirmationSentTo: string
    closeButton: string
  }
  whyChooseUs: {
    title: string
    statsLine: (franchises: number, boats: number, rating: number, reviews: number) => string
    reasons: { icon: string; title: string; description: string }[]
  }
  featured: {
    title: string
    subtitle: string
    boatsLabel: (n: number) => string
    fromPrice: (amount: number) => string
  }
  search: {
    title: string
    subtitle: string
    tabProvince: string
    tabPostal: string
    tabNearMe: string
    provinceLabel: string
    provincePlaceholder: string
    dateLabel: string
    postalLabel: string
    postalPlaceholder: string
    postalHint: string
    nearMeLabel: string
    nearMeHint: string
    timeLabel: string
    timeAny: string
    timeSlots: { value: string; label: string }[]
    searchButton: string
    searching: string
    hint: string
    errorSelectProvince: string
    errorEnterPostal: string
    errorGeoFailed: string
    errorGeoDenied: string
    errorGeoUnsupported: string
    errorPostalNotFound: string
    errorPostalGeneric: string
  }
  availability: {
    title: string
    nearMeLabel: string
    provinceLabel: (province: string) => string
    allProvinces: string
    dateLabel: (date: string) => string
    timeLabel: (time: string) => string
    noResultsTitle: string
    noResultsHint: string
    distanceLabel: string
    localFishLabel: string
    reviewsLabel: (n: number) => string
    includesTitle: string
    includesItems: string[]
    seatsLabel: (available: number, total: number) => string
    fullBadge: string
    priceBreakdownTitle: string
    reservationNow: string
    franchiseeLater: string
    totalLabel: string
    perPerson: string
    reserveButton: string
    noAvailabilityButton: string
    fallbackNotice: (province: string) => string
  }
  reservationModal: {
    completeIn3Steps: string
    peopleTitle: string
    peopleLabel: (max: number) => string
    personOption: (n: number) => string
    priceForPeople: (n: number) => string
    reserveNowLine: (amount: number) => string
    payAtDestinationLine: (amount: number) => string
    continueButton: string
    sharedLabel: string
    sharedDesc: string
    privateLabel: string
    privateDesc: string
    privatePriceNote: (total: number) => string
    detailsTitle: string
    fullNameLabel: string
    emailLabel: string
    emailHint: string
    confirmEmailLabel: string
    phoneLabel: string
    phonePlaceholder: string
    reservationLine: (n: number, fee: number) => string
    payAtDestination: (amount: number) => string
    noShowDisclaimer: string
    termsLink: string
    termsCheckboxPrefix: string
    errorTermsRequired: string
    paymentIconsHint: string
    cardLabel: string
    backButton: string
    continueToPayment: string
    errorFullNameRequired: string
    errorEmailInvalid: string
    errorEmailMismatch: string
    errorPhoneInvalid: string
    errorPaymentGeneric: string
    paymentTitle: string
    selectPaymentMethod: (amount: number) => string
    applePay: string
    bizum: string
    googlePay: string
    payNowSimulated: string
    processing: string
    confirmationTitle: string
    confirmationSubtitle: string
    confirmationSentTo: string
    boatLabel: string
    peopleLabelShort: string
    paidTodayLabel: string
    nextStepsTitle: string
    nextStepsCheckEmail: string
    nextStepsContact: string
    nextStepsPay: (amount: number) => string
    nextStepsEnjoy: string
    backHomeButton: string
    addToCalendarButton: string
    shareWhatsAppButton: string
    shareWhatsAppMessage: (boatName: string, location: string, dateTime: string) => string
    whatToBringTitle: string
    whatToBringItems: string[]
  }
  faq: {
    title: string
    items: { question: string; answer: string }[]
  }
}

export const es: Translations = {
  nav: {
    reservas: 'Reservas',
    franquiciate: 'Franquíciate',
    franquiciado: 'Acceso franquiciados',
  },
  whatsapp: {
    ariaLabel: 'Escríbenos por WhatsApp',
    tooltip: '¿Dudas? Escríbenos',
    defaultMessage: 'Hola, tengo una pregunta sobre Maragota Boats',
  },
  footer: {
    forProfessionals: '¿Tienes un barco?',
    terms: 'Condiciones de reserva',
    privacy: 'Privacidad',
    legal: 'Aviso legal',
    cookies: 'Cookies',
  },
  home: {
    heroTitle: 'Maragota Boats',
    heroSubtitle1: 'Vive la experiencia de pesca más auténtica de España',
    heroSubtitle2: 'Reserva tu salida con los mejores pescadores locales',
    howItWorksTitle: '¿Cómo funciona?',
    step1Title: '1. Busca',
    step1Desc: 'Encuentra la salida perfecta cerca de ti',
    step2Title: '2. Selecciona',
    step2Desc: 'Elige la fecha, hora y número de personas',
    step3Title: '3. Reserva',
    step3Desc: 'Confirma tu reserva y ¡a pescar!',
    paymentConfirmedTitle: '¡Reserva confirmada!',
    paidLabel: 'Pagado:',
    confirmationSentTo: 'Te hemos enviado la confirmación a',
    closeButton: 'Cerrar',
  },
  whyChooseUs: {
    title: '¿Por qué reservar con Maragota Boats?',
    statsLine: (f, b, r, rv) => `${f} franquicias · ${b} barcos · ⭐ ${r} sobre ${rv} opiniones`,
    reasons: [
      {
        icon: '🛡️',
        title: 'Seguridad primero',
        description: 'Seguro obligatorio, licencia de pesca colectiva y chaleco salvavidas en cada salida.',
      },
      {
        icon: '🎣',
        title: 'Patrones que conocen su mar',
        description: 'Cada franquiciado opera su propia zona y sabe dónde está la pesca en cada época del año.',
      },
      {
        icon: '🤝',
        title: 'Trato cercano y familiar',
        description: 'Somos patrones y familias de toda la vida, no una gran empresa anónima. Te tratamos como a uno más.',
      },
      {
        icon: '💶',
        title: 'Precio fijo, sin sorpresas',
        description: 'Sabes exactamente lo que pagas antes de reservar: seña online más el resto en destino.',
      },
      {
        icon: '📱',
        title: 'Reserva en minutos',
        description: 'Sin registro ni contraseñas. Reservas con tu email y teléfono y listo.',
      },
      {
        icon: '🌊',
        title: 'Red en expansión por España',
        description: 'Empezamos en Galicia y seguimos sumando localidades con el mismo estándar de calidad.',
      },
    ],
  },
  featured: {
    title: 'Nuestras franquicias',
    subtitle: 'Cada localidad tiene su propia pesca y sus propios caladeros',
    boatsLabel: (n) => `${n} barco${n !== 1 ? 's' : ''}`,
    fromPrice: (amount) => `Desde ${amount}€ / persona`,
  },
  search: {
    title: '¿Dónde vamos a pescar hoy?',
    subtitle: 'Encuentra la mejor experiencia de pesca cerca de ti',
    tabProvince: '📍 Provincia',
    tabPostal: '🔍 Código Postal',
    tabNearMe: '📌 Cerca de mí',
    provinceLabel: 'Selecciona una provincia',
    provincePlaceholder: 'Elige tu provincia',
    dateLabel: 'Fecha',
    postalLabel: 'Código postal o población',
    postalPlaceholder: 'Ej: 36960 o Marín',
    postalHint: 'Te mostrará los más cercanos',
    nearMeLabel: 'Tu ubicación actual',
    nearMeHint: '📍 Usaremos tu ubicación actual para encontrar las zonas más cercanas',
    timeLabel: 'Hora de salida (opcional)',
    timeAny: 'Cualquier hora',
    timeSlots: [
      { value: '06:00', label: '🌅 06:00 - Madrugada' },
      { value: '08:00', label: '🌄 08:00 - Mañana' },
      { value: '10:00', label: '☀️ 10:00 - Mediamañana' },
      { value: '13:00', label: '🌞 13:00 - Tarde' },
      { value: '16:00', label: '🌅 16:00 - Atardecer' },
    ],
    searchButton: '🎣 Buscar salidas',
    searching: '🔍 Buscando...',
    hint: '* Verás resultados ordenados por distancia en km. Cada zona tiene su pesca local',
    errorSelectProvince: 'Por favor selecciona una provincia',
    errorEnterPostal: 'Por favor ingresa un código postal',
    errorGeoFailed: 'No se pudo obtener tu ubicación. Intenta buscando por código postal.',
    errorGeoDenied: 'Has bloqueado el permiso de ubicación. Actívalo en los ajustes del navegador o busca por código postal.',
    errorGeoUnsupported: 'Tu navegador no soporta geolocalización.',
    errorPostalNotFound: 'Código postal no encontrado. Intenta con otro.',
    errorPostalGeneric: 'Error al buscar por código postal.',
  },
  availability: {
    title: 'Disponibilidad',
    nearMeLabel: '📍 Mostrando salidas más cercanas a ti',
    provinceLabel: (province) => `📍 Provincia: ${province}`,
    allProvinces: 'Todas',
    dateLabel: (date) => `📅 Fecha: ${date}`,
    timeLabel: (time) => `⏰ Hora: ${time}`,
    noResultsTitle: 'No hay salidas disponibles para los criterios seleccionados.',
    noResultsHint: 'Intenta cambiar la fecha, hora o provincia.',
    distanceLabel: 'de distancia',
    localFishLabel: '🎣 Pesca local:',
    reviewsLabel: (n) => `(${n} opiniones)`,
    includesTitle: '✓ Tu salida incluye:',
    includesItems: [
      'Equipo de pesca y cebo',
      'Seguro y licencia colectiva',
      'Chaleco salvavidas',
      'Monitor guía a bordo',
      'GPS / sonda de pesca',
      'Combustible incluido',
    ],
    seatsLabel: (available, total) => `Sitios disponibles: ${available}/${total}`,
    fullBadge: 'Barco completo para esta fecha',
    priceBreakdownTitle: 'Desglose de precio',
    reservationNow: 'Reserva (ahora):',
    franchiseeLater: 'Franquiciado (después):',
    totalLabel: 'Total:',
    perPerson: 'Por persona',
    reserveButton: 'Reservar ahora',
    noAvailabilityButton: 'Sin disponibilidad',
    fallbackNotice: (province) => `Todavía no tenemos franquicia en ${province}. Te mostramos las salidas disponibles más cercanas.`,
  },
  reservationModal: {
    completeIn3Steps: 'Completa tu reserva en 3 pasos',
    peopleTitle: '¿Cuántas personas?',
    peopleLabel: (max) => `Número de personas (máximo ${max})`,
    personOption: (n) => `${n} persona${n > 1 ? 's' : ''}`,
    priceForPeople: (n) => `Precio total para ${n} persona${n > 1 ? 's' : ''}:`,
    reserveNowLine: (amount) => `Reserva ahora: ${amount}€`,
    payAtDestinationLine: (amount) => `Paga en destino: ${amount}€`,
    continueButton: 'Continuar',
    sharedLabel: '🤝 Compartido',
    sharedDesc: 'Compartes el barco con otros pescadores. Pagas solo por tu grupo.',
    privateLabel: '🔒 Privado',
    privateDesc: 'El barco entero para vosotros solos. Nadie más se une a la salida.',
    privatePriceNote: (total) => `Precio fijo del barco completo: ${total}€, vengáis los que vengáis`,
    detailsTitle: 'Tus datos personales',
    fullNameLabel: 'Nombre completo *',
    emailLabel: 'Email *',
    emailHint: 'Recibirás la confirmación en este email',
    confirmEmailLabel: 'Confirmar email *',
    phoneLabel: 'Teléfono *',
    phonePlaceholder: '6XX XXX XXX',
    reservationLine: (n, fee) => `Reserva (${n} x ${fee}€):`,
    payAtDestination: (amount) => `${amount}€`,
    noShowDisclaimer: 'Si no te presentas a la salida, la reserva no se reembolsa. Consulta las',
    termsLink: 'condiciones de reserva',
    termsCheckboxPrefix: 'He leído y acepto las',
    errorTermsRequired: 'Debes aceptar las condiciones de reserva para continuar',
    paymentIconsHint: 'Métodos de pago aceptados',
    cardLabel: 'Tarjeta',
    backButton: 'Atrás',
    continueToPayment: 'Continuar al pago',
    errorFullNameRequired: 'El nombre completo es obligatorio',
    errorEmailInvalid: 'Por favor ingresa un email válido',
    errorEmailMismatch: 'Los emails no coinciden',
    errorPhoneInvalid: 'Por favor ingresa un teléfono válido (mínimo 7 dígitos)',
    errorPaymentGeneric: 'Error procesando el pago. Intenta de nuevo.',
    paymentTitle: 'Método de pago',
    selectPaymentMethod: (amount) => `Selecciona cómo quieres pagar ${amount}€`,
    applePay: 'Apple Pay',
    bizum: 'Bizum',
    googlePay: 'Google Pay',
    payNowSimulated: 'Pagar ahora (simulado)',
    processing: 'Procesando...',
    confirmationTitle: '¡Reserva confirmada!',
    confirmationSubtitle: 'Te hemos enviado un email con todos los detalles de tu reserva',
    confirmationSentTo: 'Confirmación enviada a:',
    boatLabel: 'Barco:',
    peopleLabelShort: 'Personas:',
    paidTodayLabel: 'Pagado hoy:',
    nextStepsTitle: '📌 Próximos pasos:',
    nextStepsCheckEmail: '✓ Revisamos tu email',
    nextStepsContact: '• El franquiciado te contactará en 24h',
    nextStepsPay: (amount) => `• Paga ${amount}€ al llegar (efectivo o tarjeta)`,
    nextStepsEnjoy: '• ¡A disfrutar de la pesca!',
    backHomeButton: 'Volver al inicio',
    addToCalendarButton: '📅 Añadir al calendario',
    shareWhatsAppButton: '💬 Compartir por WhatsApp',
    shareWhatsAppMessage: (boatName, location, dateTime) => `¡He reservado una salida de pesca con Maragota Boats en ${boatName} (${location})${dateTime}! 🎣 Reserva la tuya:`,
    whatToBringTitle: '🎒 Qué llevar el día de la salida',
    whatToBringItems: [
      'Protector solar y gorra',
      'Ropa de abrigo o impermeable',
      'Calzado antideslizante',
      'Algo para el mareo si eres propenso',
      'Cámara para las fotos',
    ],
  },
  faq: {
    title: 'Preguntas frecuentes',
    items: [
      {
        question: '¿Puedo cancelar mi reserva?',
        answer: 'La seña de 15€ no es reembolsable, salvo que el franquiciado decida lo contrario. Consulta las condiciones de reserva completas.',
      },
      {
        question: '¿Hay edad mínima?',
        answer: 'Depende de cada franquicia y salida. Se indica en el momento de la reserva; para menores debe ir acompañados de un adulto.',
      },
      {
        question: '¿Qué pasa si hace mal tiempo?',
        answer: 'El franquiciado puede cambiar la fecha u hora de la salida por seguridad. Te avisará directamente si es necesario.',
      },
      {
        question: '¿Puedo reservar el barco solo para mi grupo?',
        answer: 'Sí, elige la opción "Privado" al reservar: pagas un precio fijo por el barco completo y nadie más se une a la salida.',
      },
      {
        question: '¿Qué incluye el precio?',
        answer: 'Equipo de pesca, cebo, seguro, licencia de pesca colectiva, chaleco salvavidas, monitor guía y combustible.',
      },
      {
        question: '¿Cómo pago?',
        answer: 'La seña se paga online al reservar (tarjeta, Bizum, Apple Pay o Google Pay). El resto se paga en destino, en efectivo o con tarjeta.',
      },
    ],
  },
}

export const gl: Translations = {
  nav: {
    reservas: 'Reservas',
    franquiciate: 'Franquíciate',
    franquiciado: 'Acceso franquiciados',
  },
  whatsapp: {
    ariaLabel: 'Escríbenos por WhatsApp',
    tooltip: 'Dúbidas? Escríbenos',
    defaultMessage: 'Ola, teño unha pregunta sobre Maragota Boats',
  },
  footer: {
    forProfessionals: 'Tes un barco?',
    terms: 'Condicións de reserva',
    privacy: 'Privacidade',
    legal: 'Aviso legal',
    cookies: 'Cookies',
  },
  home: {
    heroTitle: 'Maragota Boats',
    heroSubtitle1: 'Vive a experiencia de pesca máis auténtica de España',
    heroSubtitle2: 'Reserva a túa saída cos mellores pescadores locais',
    howItWorksTitle: 'Como funciona?',
    step1Title: '1. Busca',
    step1Desc: 'Atopa a saída perfecta preto de ti',
    step2Title: '2. Selecciona',
    step2Desc: 'Escolle a data, hora e número de persoas',
    step3Title: '3. Reserva',
    step3Desc: 'Confirma a túa reserva e a pescar!',
    paymentConfirmedTitle: 'Reserva confirmada!',
    paidLabel: 'Pagado:',
    confirmationSentTo: 'Enviámosche a confirmación a',
    closeButton: 'Pechar',
  },
  whyChooseUs: {
    title: 'Por que reservar con Maragota Boats?',
    statsLine: (f, b, r, rv) => `${f} franquías · ${b} barcos · ⭐ ${r} sobre ${rv} opinións`,
    reasons: [
      {
        icon: '🛡️',
        title: 'Seguridade primeiro',
        description: 'Seguro obrigatorio, licenza de pesca colectiva e chaleco salvavidas en cada saída.',
      },
      {
        icon: '🎣',
        title: 'Patróns que coñecen o seu mar',
        description: 'Cada franquiado opera a súa propia zona e sabe onde está a pesca en cada época do ano.',
      },
      {
        icon: '🤝',
        title: 'Trato próximo e familiar',
        description: 'Somos patróns e familias de toda a vida, non unha gran empresa anónima. Trátaste como un máis.',
      },
      {
        icon: '💶',
        title: 'Prezo fixo, sen sorpresas',
        description: 'Sabes exactamente o que pagas antes de reservar: sinal online máis o resto en destino.',
      },
      {
        icon: '📱',
        title: 'Reserva en minutos',
        description: 'Sen rexistro nin contrasinais. Reservas co teu email e teléfono e listo.',
      },
      {
        icon: '🌊',
        title: 'Rede en expansión por España',
        description: 'Comezamos en Galicia e seguimos sumando localidades co mesmo estándar de calidade.',
      },
    ],
  },
  featured: {
    title: 'As nosas franquías',
    subtitle: 'Cada localidade ten a súa propia pesca e os seus propios caladoiros',
    boatsLabel: (n) => `${n} barco${n !== 1 ? 's' : ''}`,
    fromPrice: (amount) => `Desde ${amount}€ / persoa`,
  },
  search: {
    title: 'Onde imos pescar hoxe?',
    subtitle: 'Atopa a mellor experiencia de pesca preto de ti',
    tabProvince: '📍 Provincia',
    tabPostal: '🔍 Código Postal',
    tabNearMe: '📌 Preto de min',
    provinceLabel: 'Selecciona unha provincia',
    provincePlaceholder: 'Escolle a túa provincia',
    dateLabel: 'Data',
    postalLabel: 'Código postal ou poboación',
    postalPlaceholder: 'Ex: 36960 ou Marín',
    postalHint: 'Mostrarémosche os máis próximos',
    nearMeLabel: 'A túa localización actual',
    nearMeHint: '📍 Usaremos a túa localización actual para atopar as zonas máis próximas',
    timeLabel: 'Hora de saída (opcional)',
    timeAny: 'Calquera hora',
    timeSlots: [
      { value: '06:00', label: '🌅 06:00 - Madrugada' },
      { value: '08:00', label: '🌄 08:00 - Mañá' },
      { value: '10:00', label: '☀️ 10:00 - Media mañá' },
      { value: '13:00', label: '🌞 13:00 - Tarde' },
      { value: '16:00', label: '🌅 16:00 - Solpor' },
    ],
    searchButton: '🎣 Buscar saídas',
    searching: '🔍 Buscando...',
    hint: '* Verás resultados ordenados por distancia en km. Cada zona ten a súa pesca local',
    errorSelectProvince: 'Por favor selecciona unha provincia',
    errorEnterPostal: 'Por favor introduce un código postal',
    errorGeoFailed: 'Non se puido obter a túa localización. Tenta buscar por código postal.',
    errorGeoDenied: 'Bloqueaches o permiso de localización. Actívao nos axustes do navegador ou busca por código postal.',
    errorGeoUnsupported: 'O teu navegador non soporta xeolocalización.',
    errorPostalNotFound: 'Código postal non atopado. Téntao con outro.',
    errorPostalGeneric: 'Erro ao buscar por código postal.',
  },
  availability: {
    title: 'Dispoñibilidade',
    nearMeLabel: '📍 Mostrando saídas máis próximas a ti',
    provinceLabel: (province) => `📍 Provincia: ${province}`,
    allProvinces: 'Todas',
    dateLabel: (date) => `📅 Data: ${date}`,
    timeLabel: (time) => `⏰ Hora: ${time}`,
    noResultsTitle: 'Non hai saídas dispoñibles para os criterios seleccionados.',
    noResultsHint: 'Tenta cambiar a data, hora ou provincia.',
    distanceLabel: 'de distancia',
    localFishLabel: '🎣 Pesca local:',
    reviewsLabel: (n) => `(${n} opinións)`,
    includesTitle: '✓ A túa saída inclúe:',
    includesItems: [
      'Equipo de pesca e cebo',
      'Seguro e licenza colectiva',
      'Chaleco salvavidas',
      'Monitor guía a bordo',
      'GPS / sonda de pesca',
      'Combustible incluído',
    ],
    seatsLabel: (available, total) => `Prazas dispoñibles: ${available}/${total}`,
    fullBadge: 'Barco completo para esta data',
    priceBreakdownTitle: 'Desglose de prezo',
    reservationNow: 'Reserva (agora):',
    franchiseeLater: 'Franquiado (despois):',
    totalLabel: 'Total:',
    perPerson: 'Por persoa',
    reserveButton: 'Reservar agora',
    noAvailabilityButton: 'Sen dispoñibilidade',
    fallbackNotice: (province) => `Aínda non temos franquía en ${province}. Mostrámosche as saídas dispoñibles máis próximas.`,
  },
  reservationModal: {
    completeIn3Steps: 'Completa a túa reserva en 3 pasos',
    peopleTitle: 'Cantas persoas?',
    peopleLabel: (max) => `Número de persoas (máximo ${max})`,
    personOption: (n) => `${n} persoa${n > 1 ? 's' : ''}`,
    priceForPeople: (n) => `Prezo total para ${n} persoa${n > 1 ? 's' : ''}:`,
    reserveNowLine: (amount) => `Reserva agora: ${amount}€`,
    payAtDestinationLine: (amount) => `Paga en destino: ${amount}€`,
    continueButton: 'Continuar',
    sharedLabel: '🤝 Compartido',
    sharedDesc: 'Compartes o barco con outros pescadores. Pagas só polo teu grupo.',
    privateLabel: '🔒 Privado',
    privateDesc: 'O barco enteiro só para vós. Ninguén máis se une á saída.',
    privatePriceNote: (total) => `Prezo fixo do barco completo: ${total}€, veñades os que veñades`,
    detailsTitle: 'Os teus datos persoais',
    fullNameLabel: 'Nome completo *',
    emailLabel: 'Email *',
    emailHint: 'Recibirás a confirmación neste email',
    confirmEmailLabel: 'Confirmar email *',
    phoneLabel: 'Teléfono *',
    phonePlaceholder: '6XX XXX XXX',
    reservationLine: (n, fee) => `Reserva (${n} x ${fee}€):`,
    payAtDestination: (amount) => `${amount}€`,
    noShowDisclaimer: 'Se non te presentas á saída, a reserva non se reembolsa. Consulta as',
    termsLink: 'condicións de reserva',
    termsCheckboxPrefix: 'Lin e acepto as',
    errorTermsRequired: 'Debes aceptar as condicións de reserva para continuar',
    paymentIconsHint: 'Métodos de pago aceptados',
    cardLabel: 'Tarxeta',
    backButton: 'Atrás',
    continueToPayment: 'Continuar ao pago',
    errorFullNameRequired: 'O nome completo é obrigatorio',
    errorEmailInvalid: 'Por favor introduce un email válido',
    errorEmailMismatch: 'Os emails non coinciden',
    errorPhoneInvalid: 'Por favor introduce un teléfono válido (mínimo 7 díxitos)',
    errorPaymentGeneric: 'Erro procesando o pago. Téntao de novo.',
    paymentTitle: 'Método de pago',
    selectPaymentMethod: (amount) => `Selecciona como queres pagar ${amount}€`,
    applePay: 'Apple Pay',
    bizum: 'Bizum',
    googlePay: 'Google Pay',
    payNowSimulated: 'Pagar agora (simulado)',
    processing: 'Procesando...',
    confirmationTitle: 'Reserva confirmada!',
    confirmationSubtitle: 'Enviámosche un email con todos os detalles da túa reserva',
    confirmationSentTo: 'Confirmación enviada a:',
    boatLabel: 'Barco:',
    peopleLabelShort: 'Persoas:',
    paidTodayLabel: 'Pagado hoxe:',
    nextStepsTitle: '📌 Vindeiros pasos:',
    nextStepsCheckEmail: '✓ Revisamos o teu email',
    nextStepsContact: '• O franquiado contactará contigo en 24h',
    nextStepsPay: (amount) => `• Paga ${amount}€ ao chegar (efectivo ou tarxeta)`,
    nextStepsEnjoy: '• A gozar da pesca!',
    backHomeButton: 'Volver ao inicio',
    addToCalendarButton: '📅 Engadir ao calendario',
    shareWhatsAppButton: '💬 Compartir por WhatsApp',
    shareWhatsAppMessage: (boatName, location, dateTime) => `Reservei unha saída de pesca con Maragota Boats en ${boatName} (${location})${dateTime}! 🎣 Reserva a túa:`,
    whatToBringTitle: '🎒 Que levar o día da saída',
    whatToBringItems: [
      'Protector solar e gorra',
      'Roupa de abrigo ou impermeable',
      'Calzado antiescorregadizo',
      'Algo para o mareo se es propenso',
      'Cámara para as fotos',
    ],
  },
  faq: {
    title: 'Preguntas frecuentes',
    items: [
      {
        question: 'Podo cancelar a miña reserva?',
        answer: 'O sinal de 15€ non é reembolsable, salvo que o franquiado decida o contrario. Consulta as condicións de reserva completas.',
      },
      {
        question: 'Hai idade mínima?',
        answer: 'Depende de cada franquía e saída. Indícase no momento da reserva; os menores deben ir acompañados dun adulto.',
      },
      {
        question: 'Que pasa se fai mal tempo?',
        answer: 'O franquiado pode cambiar a data ou hora da saída por seguridade. Avisarache directamente se é necesario.',
      },
      {
        question: 'Podo reservar o barco só para o meu grupo?',
        answer: 'Si, escolle a opción "Privado" ao reservar: pagas un prezo fixo polo barco completo e ninguén máis se une á saída.',
      },
      {
        question: 'Que inclúe o prezo?',
        answer: 'Equipo de pesca, cebo, seguro, licenza de pesca colectiva, chaleco salvavidas, monitor guía e combustible.',
      },
      {
        question: 'Como pago?',
        answer: 'O sinal páganse online ao reservar (tarxeta, Bizum, Apple Pay ou Google Pay). O resto páganse en destino, en efectivo ou con tarxeta.',
      },
    ],
  },
}

export const ca: Translations = {
  nav: {
    reservas: 'Reserves',
    franquiciate: "Franquicia't",
    franquiciado: 'Accés franquiciats',
  },
  whatsapp: {
    ariaLabel: 'Escriu-nos per WhatsApp',
    tooltip: 'Dubtes? Escriu-nos',
    defaultMessage: 'Hola, tinc una pregunta sobre Maragota Boats',
  },
  footer: {
    forProfessionals: 'Tens un vaixell?',
    terms: 'Condicions de reserva',
    privacy: 'Privadesa',
    legal: 'Avís legal',
    cookies: 'Cookies',
  },
  home: {
    heroTitle: 'Maragota Boats',
    heroSubtitle1: "Viu l'experiència de pesca més autèntica d'Espanya",
    heroSubtitle2: 'Reserva la teva sortida amb els millors pescadors locals',
    howItWorksTitle: 'Com funciona?',
    step1Title: '1. Cerca',
    step1Desc: 'Troba la sortida perfecta a prop teu',
    step2Title: '2. Selecciona',
    step2Desc: 'Tria la data, hora i nombre de persones',
    step3Title: '3. Reserva',
    step3Desc: 'Confirma la teva reserva i a pescar!',
    paymentConfirmedTitle: 'Reserva confirmada!',
    paidLabel: 'Pagat:',
    confirmationSentTo: "T'hem enviat la confirmació a",
    closeButton: 'Tancar',
  },
  whyChooseUs: {
    title: 'Per què reservar amb Maragota Boats?',
    statsLine: (f, b, r, rv) => `${f} franquícies · ${b} vaixells · ⭐ ${r} sobre ${rv} opinions`,
    reasons: [
      {
        icon: '🛡️',
        title: 'Seguretat primer',
        description: "Assegurança obligatòria, llicència de pesca col·lectiva i armilla salvavides a cada sortida.",
      },
      {
        icon: '🎣',
        title: 'Patrons que coneixen el seu mar',
        description: "Cada franquiciat opera la seva pròpia zona i sap on és la pesca en cada època de l'any.",
      },
      {
        icon: '🤝',
        title: 'Tracte proper i familiar',
        description: 'Som patrons i famílies de tota la vida, no una gran empresa anònima. Et tractem com un més.',
      },
      {
        icon: '💶',
        title: 'Preu fix, sense sorpreses',
        description: 'Saps exactament què pagues abans de reservar: paga i senyal en línia més la resta a destinació.',
      },
      {
        icon: '📱',
        title: 'Reserva en minuts',
        description: 'Sense registre ni contrasenyes. Reserves amb el teu email i telèfon i llest.',
      },
      {
        icon: '🌊',
        title: 'Xarxa en expansió per Espanya',
        description: "Vam començar a Galícia i seguim afegint localitats amb el mateix estàndard de qualitat.",
      },
    ],
  },
  featured: {
    title: 'Les nostres franquícies',
    subtitle: 'Cada localitat té la seva pròpia pesca i els seus propis caladors',
    boatsLabel: (n) => `${n} vaixell${n !== 1 ? 's' : ''}`,
    fromPrice: (amount) => `Des de ${amount}€ / persona`,
  },
  search: {
    title: 'On anem a pescar avui?',
    subtitle: 'Troba la millor experiència de pesca a prop teu',
    tabProvince: '📍 Província',
    tabPostal: '🔍 Codi Postal',
    tabNearMe: '📌 A prop meu',
    provinceLabel: 'Selecciona una província',
    provincePlaceholder: 'Tria la teva província',
    dateLabel: 'Data',
    postalLabel: 'Codi postal o població',
    postalPlaceholder: 'Ex: 36960 o Marín',
    postalHint: 'Et mostrarem els més propers',
    nearMeLabel: 'La teva ubicació actual',
    nearMeHint: '📍 Utilitzarem la teva ubicació actual per trobar les zones més properes',
    timeLabel: 'Hora de sortida (opcional)',
    timeAny: 'Qualsevol hora',
    timeSlots: [
      { value: '06:00', label: '🌅 06:00 - Matinada' },
      { value: '08:00', label: '🌄 08:00 - Matí' },
      { value: '10:00', label: '☀️ 10:00 - Migmatí' },
      { value: '13:00', label: '🌞 13:00 - Tarda' },
      { value: '16:00', label: '🌅 16:00 - Posta de sol' },
    ],
    searchButton: '🎣 Cercar sortides',
    searching: '🔍 Cercant...',
    hint: '* Veuràs resultats ordenats per distància en km. Cada zona té la seva pesca local',
    errorSelectProvince: 'Si us plau selecciona una província',
    errorEnterPostal: 'Si us plau introdueix un codi postal',
    errorGeoFailed: "No s'ha pogut obtenir la teva ubicació. Prova de cercar per codi postal.",
    errorGeoDenied: "Has bloquejat el permís d'ubicació. Activa'l als ajustos del navegador o cerca per codi postal.",
    errorGeoUnsupported: 'El teu navegador no admet geolocalització.',
    errorPostalNotFound: 'Codi postal no trobat. Prova amb un altre.',
    errorPostalGeneric: 'Error en cercar per codi postal.',
  },
  availability: {
    title: 'Disponibilitat',
    nearMeLabel: '📍 Mostrant les sortides més properes a tu',
    provinceLabel: (province) => `📍 Província: ${province}`,
    allProvinces: 'Totes',
    dateLabel: (date) => `📅 Data: ${date}`,
    timeLabel: (time) => `⏰ Hora: ${time}`,
    noResultsTitle: 'No hi ha sortides disponibles per als criteris seleccionats.',
    noResultsHint: 'Prova de canviar la data, hora o província.',
    distanceLabel: 'de distància',
    localFishLabel: '🎣 Pesca local:',
    reviewsLabel: (n) => `(${n} opinions)`,
    includesTitle: '✓ La teva sortida inclou:',
    includesItems: [
      'Equip de pesca i esquer',
      "Assegurança i llicència col·lectiva",
      'Armilla salvavides',
      'Monitor guia a bord',
      'GPS / sonda de pesca',
      'Combustible inclòs',
    ],
    seatsLabel: (available, total) => `Places disponibles: ${available}/${total}`,
    fullBadge: 'Vaixell complet per a aquesta data',
    priceBreakdownTitle: 'Desglossament de preu',
    reservationNow: 'Reserva (ara):',
    franchiseeLater: 'Franquiciat (després):',
    totalLabel: 'Total:',
    perPerson: 'Per persona',
    reserveButton: 'Reserva ara',
    noAvailabilityButton: 'Sense disponibilitat',
    fallbackNotice: (province) => `Encara no tenim franquícia a ${province}. Et mostrem les sortides disponibles més properes.`,
  },
  reservationModal: {
    completeIn3Steps: 'Completa la teva reserva en 3 passos',
    peopleTitle: 'Quantes persones?',
    peopleLabel: (max) => `Nombre de persones (màxim ${max})`,
    personOption: (n) => `${n} ${n > 1 ? 'persones' : 'persona'}`,
    priceForPeople: (n) => `Preu total per a ${n} ${n > 1 ? 'persones' : 'persona'}:`,
    reserveNowLine: (amount) => `Reserva ara: ${amount}€`,
    payAtDestinationLine: (amount) => `Paga a destinació: ${amount}€`,
    continueButton: 'Continuar',
    sharedLabel: '🤝 Compartit',
    sharedDesc: 'Comparteixes el vaixell amb altres pescadors. Pagues només pel teu grup.',
    privateLabel: '🔒 Privat',
    privateDesc: "El vaixell sencer només per a vosaltres. Ningú més s'uneix a la sortida.",
    privatePriceNote: (total) => `Preu fix del vaixell complet: ${total}€, vingueu els que vingueu`,
    detailsTitle: 'Les teves dades personals',
    fullNameLabel: 'Nom complet *',
    emailLabel: 'Email *',
    emailHint: 'Rebràs la confirmació en aquest email',
    confirmEmailLabel: 'Confirmar email *',
    phoneLabel: 'Telèfon *',
    phonePlaceholder: '6XX XXX XXX',
    reservationLine: (n, fee) => `Reserva (${n} x ${fee}€):`,
    payAtDestination: (amount) => `${amount}€`,
    noShowDisclaimer: 'Si no et presentes a la sortida, la reserva no es reemborsa. Consulta les',
    termsLink: 'condicions de reserva',
    termsCheckboxPrefix: 'He llegit i accepto les',
    errorTermsRequired: "Has d'acceptar les condicions de reserva per continuar",
    paymentIconsHint: 'Mètodes de pagament acceptats',
    cardLabel: 'Targeta',
    backButton: 'Enrere',
    continueToPayment: 'Continuar al pagament',
    errorFullNameRequired: 'El nom complet és obligatori',
    errorEmailInvalid: 'Si us plau introdueix un email vàlid',
    errorEmailMismatch: 'Els emails no coincideixen',
    errorPhoneInvalid: 'Si us plau introdueix un telèfon vàlid (mínim 7 dígits)',
    errorPaymentGeneric: 'Error en processar el pagament. Torna-ho a provar.',
    paymentTitle: 'Mètode de pagament',
    selectPaymentMethod: (amount) => `Selecciona com vols pagar ${amount}€`,
    applePay: 'Apple Pay',
    bizum: 'Bizum',
    googlePay: 'Google Pay',
    payNowSimulated: 'Pagar ara (simulat)',
    processing: 'Processant...',
    confirmationTitle: 'Reserva confirmada!',
    confirmationSubtitle: "T'hem enviat un email amb tots els detalls de la teva reserva",
    confirmationSentTo: 'Confirmació enviada a:',
    boatLabel: 'Vaixell:',
    peopleLabelShort: 'Persones:',
    paidTodayLabel: 'Pagat avui:',
    nextStepsTitle: '📌 Propers passos:',
    nextStepsCheckEmail: '✓ Revisem el teu email',
    nextStepsContact: '• El franquiciat et contactarà en 24h',
    nextStepsPay: (amount) => `• Paga ${amount}€ en arribar (efectiu o targeta)`,
    nextStepsEnjoy: '• Gaudeix de la pesca!',
    backHomeButton: "Tornar a l'inici",
    addToCalendarButton: '📅 Afegir al calendari',
    shareWhatsAppButton: '💬 Compartir per WhatsApp',
    shareWhatsAppMessage: (boatName, location, dateTime) => `He reservat una sortida de pesca amb Maragota Boats a ${boatName} (${location})${dateTime}! 🎣 Reserva la teva:`,
    whatToBringTitle: '🎒 Què portar el dia de la sortida',
    whatToBringItems: [
      'Protector solar i gorra',
      "Roba d'abric o impermeable",
      'Calçat antilliscant',
      'Alguna cosa pel mareig si hi ets propens',
      'Càmera per a les fotos',
    ],
  },
  faq: {
    title: 'Preguntes freqüents',
    items: [
      {
        question: 'Puc cancel·lar la meva reserva?',
        answer: "La paga i senyal de 15€ no és reemborsable, tret que el franquiciat decideixi el contrari. Consulta les condicions de reserva completes.",
      },
      {
        question: 'Hi ha edat mínima?',
        answer: "Depèn de cada franquícia i sortida. S'indica en el moment de la reserva; els menors han d'anar acompanyats d'un adult.",
      },
      {
        question: 'Què passa si fa mal temps?',
        answer: "El franquiciat pot canviar la data o hora de la sortida per seguretat. T'avisarà directament si cal.",
      },
      {
        question: 'Puc reservar el vaixell només per al meu grup?',
        answer: 'Sí, tria l\'opció "Privat" en reservar: pagues un preu fix pel vaixell complet i ningú més s\'uneix a la sortida.',
      },
      {
        question: 'Què inclou el preu?',
        answer: "Equip de pesca, esquer, assegurança, llicència de pesca col·lectiva, armilla salvavides, monitor guia i combustible.",
      },
      {
        question: 'Com pago?',
        answer: 'La paga i senyal es paga en línia en reservar (targeta, Bizum, Apple Pay o Google Pay). La resta es paga a destinació, en efectiu o amb targeta.',
      },
    ],
  },
}

export const eu: Translations = {
  nav: {
    reservas: 'Erreserbak',
    franquiciate: 'Frankiziatu',
    franquiciado: 'Frankiziadunen sarbidea',
  },
  whatsapp: {
    ariaLabel: 'Idatzi WhatsApp bidez',
    tooltip: 'Zalantzak? Idatzi',
    defaultMessage: 'Kaixo, galdera bat dut Maragota Boats-i buruz',
  },
  footer: {
    forProfessionals: 'Ba al duzu itsasontzirik?',
    terms: 'Erreserba baldintzak',
    privacy: 'Pribatutasuna',
    legal: 'Lege oharra',
    cookies: 'Cookieak',
  },
  home: {
    heroTitle: 'Maragota Boats',
    heroSubtitle1: 'Bizi Espainiako arrantza esperientziarik benetakoena',
    heroSubtitle2: 'Erreserbatu zure irteera arrantzale lokal onenekin',
    howItWorksTitle: 'Nola dabil?',
    step1Title: '1. Bilatu',
    step1Desc: 'Aurkitu zure ondoan dagoen irteera egokia',
    step2Title: '2. Aukeratu',
    step2Desc: 'Aukeratu data, ordua eta pertsona kopurua',
    step3Title: '3. Erreserbatu',
    step3Desc: 'Berretsi zure erreserba eta arrantzara!',
    paymentConfirmedTitle: 'Erreserba baieztatuta!',
    paidLabel: 'Ordainduta:',
    confirmationSentTo: 'Baieztapena bidali dizugu hona:',
    closeButton: 'Itxi',
  },
  whyChooseUs: {
    title: 'Zergatik erreserbatu Maragota Boats-ekin?',
    statsLine: (f, b, r, rv) => `${f} frankizia · ${b} itsasontzi · ⭐ ${r} ${rv} iritziren gainean`,
    reasons: [
      {
        icon: '🛡️',
        title: 'Segurtasuna lehenik',
        description: 'Nahitaezko asegurua, kolektiboko arrantza-lizentzia eta salbamendu-jaka irteera bakoitzean.',
      },
      {
        icon: '🎣',
        title: 'Beren itsasoa ezagutzen duten patroiak',
        description: 'Frankiziadun bakoitzak bere eremua kudeatzen du eta badaki non dagoen arraina urteko une bakoitzean.',
      },
      {
        icon: '🤝',
        title: 'Tratu hurbil eta familiarra',
        description: 'Beti izan garen patroiak eta familiak gara, ez enpresa anonimo handi bat. Bat gehiago bezala tratatuko zaitugu.',
      },
      {
        icon: '💶',
        title: 'Prezio finkoa, ezustekorik gabe',
        description: 'Zehazki dakizu zer ordaintzen duzun erreserbatu aurretik: aurrerapena online eta gainerakoa lekuan bertan.',
      },
      {
        icon: '📱',
        title: 'Erreserbatu minutu gutxitan',
        description: 'Ez da erregistrorik ez pasahitzik behar. Zure email eta telefonoarekin erreserbatu eta listo.',
      },
      {
        icon: '🌊',
        title: 'Espainian hedatzen ari den sarea',
        description: 'Galizian hasi ginen eta kalitate estandar berarekin herri gehiago gehitzen jarraitzen dugu.',
      },
    ],
  },
  featured: {
    title: 'Gure frankiziak',
    subtitle: 'Herri bakoitzak bere arrantza eta bere arrantzalekuak ditu',
    boatsLabel: (n) => `${n} itsasontzi`,
    fromPrice: (amount) => `${amount}€ -tik / pertsonako`,
  },
  search: {
    title: 'Non arrantzatuko dugu gaur?',
    subtitle: 'Aurkitu zure ondoan arrantza esperientziarik onena',
    tabProvince: '📍 Probintzia',
    tabPostal: '🔍 Posta Kodea',
    tabNearMe: '📌 Nire ondoan',
    provinceLabel: 'Aukeratu probintzia bat',
    provincePlaceholder: 'Aukeratu zure probintzia',
    dateLabel: 'Data',
    postalLabel: 'Posta kodea edo herria',
    postalPlaceholder: 'Adib: 36960 edo Marín',
    postalHint: 'Hurbilenak erakutsiko dizkizugu',
    nearMeLabel: 'Zure uneko kokapena',
    nearMeHint: '📍 Zure uneko kokapena erabiliko dugu eremurik hurbilenak aurkitzeko',
    timeLabel: 'Irteera ordua (aukerakoa)',
    timeAny: 'Edozein ordu',
    timeSlots: [
      { value: '06:00', label: '🌅 06:00 - Goizaldea' },
      { value: '08:00', label: '🌄 08:00 - Goiza' },
      { value: '10:00', label: '☀️ 10:00 - Eguerdi aurrea' },
      { value: '13:00', label: '🌞 13:00 - Arratsaldea' },
      { value: '16:00', label: '🌅 16:00 - Ilunabarra' },
    ],
    searchButton: '🎣 Bilatu irteerak',
    searching: '🔍 Bilatzen...',
    hint: '* Emaitzak distantziaren arabera antolatuta ikusiko dituzu km-tan. Eremu bakoitzak bere arrantza lokala du',
    errorSelectProvince: 'Mesedez aukeratu probintzia bat',
    errorEnterPostal: 'Mesedez sartu posta kode bat',
    errorGeoFailed: 'Ezin izan da zure kokapena lortu. Saiatu posta kodearekin bilatzen.',
    errorGeoDenied: 'Kokapen baimena blokeatu duzu. Aktibatu nabigatzailearen ezarpenetan edo bilatu posta kodearekin.',
    errorGeoUnsupported: 'Zure nabigatzaileak ez du geolokalizazioa onartzen.',
    errorPostalNotFound: 'Posta kodea ez da aurkitu. Saiatu beste batekin.',
    errorPostalGeneric: 'Errorea posta kodearekin bilatzean.',
  },
  availability: {
    title: 'Erabilgarritasuna',
    nearMeLabel: '📍 Zure ondoko irteerarik hurbilenak erakusten',
    provinceLabel: (province) => `📍 Probintzia: ${province}`,
    allProvinces: 'Guztiak',
    dateLabel: (date) => `📅 Data: ${date}`,
    timeLabel: (time) => `⏰ Ordua: ${time}`,
    noResultsTitle: 'Ez dago irteerarik erabilgarri hautatutako irizpideetarako.',
    noResultsHint: 'Saiatu data, ordua edo probintzia aldatzen.',
    distanceLabel: 'distantziara',
    localFishLabel: '🎣 Arrantza lokala:',
    reviewsLabel: (n) => `(${n} iritzi)`,
    includesTitle: '✓ Zure irteerak hau dakar:',
    includesItems: [
      'Arrantza-ekipoa eta amua',
      'Asegurua eta lizentzia kolektiboa',
      'Salbamendu-jaka',
      'Gidari monitorea ontzian',
      'GPS / arrantza-sonda',
      'Erregaia barne',
    ],
    seatsLabel: (available, total) => `Leku erabilgarriak: ${available}/${total}`,
    fullBadge: 'Itsasontzia beteta data honetarako',
    priceBreakdownTitle: 'Prezioaren xehetasuna',
    reservationNow: 'Erreserba (orain):',
    franchiseeLater: 'Frankiziaduna (gero):',
    totalLabel: 'Guztira:',
    perPerson: 'Pertsonako',
    reserveButton: 'Erreserbatu orain',
    noAvailabilityButton: 'Ez dago erabilgarri',
    fallbackNotice: (province) => `Oraindik ez dugu frankiziarik ${province}(e)n. Hurbilen dauden irteera erabilgarriak erakusten dizkizugu.`,
  },
  reservationModal: {
    completeIn3Steps: 'Osatu zure erreserba 3 urratsetan',
    peopleTitle: 'Zenbat pertsona?',
    peopleLabel: (max) => `Pertsona kopurua (gehienez ${max})`,
    personOption: (n) => `${n} pertsona`,
    priceForPeople: (n) => `${n} pertsonarentzako prezio osoa:`,
    reserveNowLine: (amount) => `Erreserba orain: ${amount}€`,
    payAtDestinationLine: (amount) => `Ordaindu helmugan: ${amount}€`,
    continueButton: 'Jarraitu',
    sharedLabel: '🤝 Partekatua',
    sharedDesc: 'Itsasontzia beste arrantzale batzuekin partekatzen duzu. Zure taldearengatik bakarrik ordaintzen duzu.',
    privateLabel: '🔒 Pribatua',
    privateDesc: 'Itsasontzi osoa zuentzat bakarrik. Ez da beste inor irteerara batzen.',
    privatePriceNote: (total) => `Itsasontzi osoaren prezio finkoa: ${total}€, etorri zaretenak etorrita ere`,
    detailsTitle: 'Zure datu pertsonalak',
    fullNameLabel: 'Izen-abizenak *',
    emailLabel: 'Emaila *',
    emailHint: 'Baieztapena email honetara bidaliko dizugu',
    confirmEmailLabel: 'Baieztatu emaila *',
    phoneLabel: 'Telefonoa *',
    phonePlaceholder: '6XX XXX XXX',
    reservationLine: (n, fee) => `Erreserba (${n} x ${fee}€):`,
    payAtDestination: (amount) => `${amount}€`,
    noShowDisclaimer: 'Irteerara agertzen ez bazara, erreserba ez da itzultzen. Kontsultatu',
    termsLink: 'erreserba baldintzak',
    termsCheckboxPrefix: 'Irakurri eta onartzen ditut',
    errorTermsRequired: 'Erreserba baldintzak onartu behar dituzu jarraitzeko',
    paymentIconsHint: 'Onartutako ordainketa metodoak',
    cardLabel: 'Txartela',
    backButton: 'Atzera',
    continueToPayment: 'Jarraitu ordainketara',
    errorFullNameRequired: 'Izen-abizenak beharrezkoak dira',
    errorEmailInvalid: 'Mesedez sartu email baliozko bat',
    errorEmailMismatch: 'Emailak ez datoz bat',
    errorPhoneInvalid: 'Mesedez sartu telefono baliozko bat (gutxienez 7 digitu)',
    errorPaymentGeneric: 'Errorea ordainketa prozesatzean. Saiatu berriro.',
    paymentTitle: 'Ordainketa metodoa',
    selectPaymentMethod: (amount) => `Aukeratu nola ordaindu nahi duzun ${amount}€`,
    applePay: 'Apple Pay',
    bizum: 'Bizum',
    googlePay: 'Google Pay',
    payNowSimulated: 'Ordaindu orain (simulatua)',
    processing: 'Prozesatzen...',
    confirmationTitle: 'Erreserba baieztatuta!',
    confirmationSubtitle: 'Zure erreserbaren xehetasun guztiekin email bat bidali dizugu',
    confirmationSentTo: 'Baieztapena bidalita hona:',
    boatLabel: 'Itsasontzia:',
    peopleLabelShort: 'Pertsonak:',
    paidTodayLabel: 'Gaur ordainduta:',
    nextStepsTitle: '📌 Hurrengo urratsak:',
    nextStepsCheckEmail: '✓ Begiratu zure emaila',
    nextStepsContact: '• Frankiziadunak 24 orduren buruan jarriko da zurekin harremanetan',
    nextStepsPay: (amount) => `• Ordaindu ${amount}€ iristean (eskudirutan edo txartelarekin)`,
    nextStepsEnjoy: '• Gozatu arrantzaz!',
    backHomeButton: 'Itzuli hasierara',
    addToCalendarButton: '📅 Gehitu egutegira',
    shareWhatsAppButton: '💬 Partekatu WhatsApp bidez',
    shareWhatsAppMessage: (boatName, location, dateTime) => `Maragota Boats-ekin arrantza irteera erreserbatu dut ${boatName}-n (${location})${dateTime}! 🎣 Erreserbatu zurea:`,
    whatToBringTitle: '🎒 Zer eraman irteera egunean',
    whatToBringItems: [
      'Eguzki-babesa eta txapela',
      'Arropa beroa edo iragazgaitza',
      'Oinetako irristagaitzak',
      'Mareoarentzako zerbait, joera baduzu',
      'Kamera argazkietarako',
    ],
  },
  faq: {
    title: 'Ohiko galderak',
    items: [
      {
        question: 'Nire erreserba bertan behera utzi dezaket?',
        answer: 'Ordaindu duzun 15€-ko aurrerapena ez da itzultzen, frankiziadunak besterik erabakitzen ez badu. Kontsultatu erreserba baldintza osoak.',
      },
      {
        question: 'Gutxieneko adinik badago?',
        answer: 'Frankizia eta irteera bakoitzaren araberakoa da. Erreserba egiterakoan adierazten da; adingabeek helduren batekin joan behar dute.',
      },
      {
        question: 'Zer gertatzen da eguraldi txarra egiten badu?',
        answer: 'Frankiziadunak irteeraren data edo ordua alda dezake segurtasunagatik. Beharrezkoa balitz, zuzenean jakinaraziko dizu.',
      },
      {
        question: 'Itsasontzia nire taldearentzat bakarrik erreserba dezaket?',
        answer: 'Bai, aukeratu "Pribatua" aukera erreserbatzean: itsasontzi osoarengatik prezio finko bat ordaintzen duzu eta ez da beste inor irteerara batzen.',
      },
      {
        question: 'Zer dakar prezioak?',
        answer: 'Arrantza-ekipoa, amua, asegurua, kolektiboko arrantza-lizentzia, salbamendu-jaka, gidari monitorea eta erregaia.',
      },
      {
        question: 'Nola ordaintzen dut?',
        answer: 'Aurrerapena online ordaintzen da erreserbatzean (txartela, Bizum, Apple Pay edo Google Pay). Gainerakoa helmugan ordaintzen da, eskudirutan edo txartelarekin.',
      },
    ],
  },
}

export const en: Translations = {
  nav: {
    reservas: 'Book now',
    franquiciate: 'Become a franchisee',
    franquiciado: 'Franchisee login',
  },
  whatsapp: {
    ariaLabel: 'Message us on WhatsApp',
    tooltip: 'Questions? Message us',
    defaultMessage: 'Hi, I have a question about Maragota Boats',
  },
  footer: {
    forProfessionals: 'Have a boat?',
    terms: 'Booking terms',
    privacy: 'Privacy',
    legal: 'Legal notice',
    cookies: 'Cookies',
  },
  home: {
    heroTitle: 'Maragota Boats',
    heroSubtitle1: "Experience Spain's most authentic fishing trips",
    heroSubtitle2: 'Book your trip with the best local fishermen',
    howItWorksTitle: 'How does it work?',
    step1Title: '1. Search',
    step1Desc: 'Find the perfect trip near you',
    step2Title: '2. Select',
    step2Desc: 'Choose the date, time and number of people',
    step3Title: '3. Book',
    step3Desc: 'Confirm your booking and go fishing!',
    paymentConfirmedTitle: 'Booking confirmed!',
    paidLabel: 'Paid:',
    confirmationSentTo: "We've sent the confirmation to",
    closeButton: 'Close',
  },
  whyChooseUs: {
    title: 'Why book with Maragota Boats?',
    statsLine: (f, b, r, rv) => `${f} franchises · ${b} boats · ⭐ ${r} from ${rv} reviews`,
    reasons: [
      {
        icon: '🛡️',
        title: 'Safety first',
        description: 'Mandatory insurance, collective fishing licence and life jackets on every trip.',
      },
      {
        icon: '🎣',
        title: 'Skippers who know their waters',
        description: 'Each franchisee operates their own area and knows where the fish are all year round.',
      },
      {
        icon: '🤝',
        title: 'A warm, personal welcome',
        description: "We're skippers and families, not a faceless company. You're treated like one of our own.",
      },
      {
        icon: '💶',
        title: 'Fixed price, no surprises',
        description: 'You know exactly what you pay before booking: an online deposit plus the rest on-site.',
      },
      {
        icon: '📱',
        title: 'Book in minutes',
        description: 'No account or password needed. Book with just your email and phone number.',
      },
      {
        icon: '🌊',
        title: 'A growing network across Spain',
        description: 'We started in Galicia and keep adding locations with the same quality standard.',
      },
    ],
  },
  featured: {
    title: 'Our franchises',
    subtitle: 'Every location has its own fishing grounds and species',
    boatsLabel: (n) => `${n} boat${n !== 1 ? 's' : ''}`,
    fromPrice: (amount) => `From €${amount} / person`,
  },
  search: {
    title: 'Where are we fishing today?',
    subtitle: 'Find the best fishing experience near you',
    tabProvince: '📍 Province',
    tabPostal: '🔍 Postal code',
    tabNearMe: '📌 Near me',
    provinceLabel: 'Select a province',
    provincePlaceholder: 'Choose your province',
    dateLabel: 'Date',
    postalLabel: 'Postal code or town',
    postalPlaceholder: 'E.g. 36960 or Marín',
    postalHint: "We'll show you the closest trips",
    nearMeLabel: 'Your current location',
    nearMeHint: "📍 We'll use your current location to find the nearest areas",
    timeLabel: 'Departure time (optional)',
    timeAny: 'Any time',
    timeSlots: [
      { value: '06:00', label: '🌅 06:00 - Early morning' },
      { value: '08:00', label: '🌄 08:00 - Morning' },
      { value: '10:00', label: '☀️ 10:00 - Mid-morning' },
      { value: '13:00', label: '🌞 13:00 - Afternoon' },
      { value: '16:00', label: '🌅 16:00 - Sunset' },
    ],
    searchButton: '🎣 Search trips',
    searching: '🔍 Searching...',
    hint: "* Results are sorted by distance in km. Each area has its own local catch",
    errorSelectProvince: 'Please select a province',
    errorEnterPostal: 'Please enter a postal code',
    errorGeoFailed: "We couldn't get your location. Try searching by postal code instead.",
    errorGeoDenied: "Location access is blocked. Enable it in your browser settings, or search by postal code instead.",
    errorGeoUnsupported: "Your browser doesn't support geolocation.",
    errorPostalNotFound: 'Postal code not found. Try another one.',
    errorPostalGeneric: 'Error searching by postal code.',
  },
  availability: {
    title: 'Availability',
    nearMeLabel: '📍 Showing the trips closest to you',
    provinceLabel: (province) => `📍 Province: ${province}`,
    allProvinces: 'All',
    dateLabel: (date) => `📅 Date: ${date}`,
    timeLabel: (time) => `⏰ Time: ${time}`,
    noResultsTitle: 'No trips available for the selected criteria.',
    noResultsHint: 'Try changing the date, time or province.',
    distanceLabel: 'away',
    localFishLabel: '🎣 Local catch:',
    reviewsLabel: (n) => `(${n} reviews)`,
    includesTitle: '✓ Your trip includes:',
    includesItems: [
      'Fishing gear and bait',
      'Insurance and collective licence',
      'Life jacket',
      'Guide skipper on board',
      'GPS / fish finder',
      'Fuel included',
    ],
    seatsLabel: (available, total) => `Spots available: ${available}/${total}`,
    fullBadge: 'Boat fully booked for this date',
    priceBreakdownTitle: 'Price breakdown',
    reservationNow: 'Deposit (now):',
    franchiseeLater: 'On-site (later):',
    totalLabel: 'Total:',
    perPerson: 'Per person',
    reserveButton: 'Book now',
    noAvailabilityButton: 'Not available',
    fallbackNotice: (province) => `We don't have a franchise in ${province} yet. Here are the closest available trips.`,
  },
  reservationModal: {
    completeIn3Steps: 'Complete your booking in 3 steps',
    peopleTitle: 'How many people?',
    peopleLabel: (max) => `Number of people (max ${max})`,
    personOption: (n) => `${n} ${n > 1 ? 'people' : 'person'}`,
    priceForPeople: (n) => `Total price for ${n} ${n > 1 ? 'people' : 'person'}:`,
    reserveNowLine: (amount) => `Deposit now: €${amount}`,
    payAtDestinationLine: (amount) => `Pay on-site: €${amount}`,
    continueButton: 'Continue',
    sharedLabel: '🤝 Shared',
    sharedDesc: "You share the boat with other anglers. You only pay for your group.",
    privateLabel: '🔒 Private',
    privateDesc: 'The whole boat just for you. No one else joins the trip.',
    privatePriceNote: (total) => `Fixed price for the whole boat: €${total}, however many of you come`,
    detailsTitle: 'Your details',
    fullNameLabel: 'Full name *',
    emailLabel: 'Email *',
    emailHint: "We'll send your confirmation to this email",
    confirmEmailLabel: 'Confirm email *',
    phoneLabel: 'Phone *',
    phonePlaceholder: '7XXX XXXXXX',
    reservationLine: (n, fee) => `Deposit (${n} x €${fee}):`,
    payAtDestination: (amount) => `€${amount}`,
    noShowDisclaimer: "If you don't show up, the deposit isn't refunded. See the",
    termsLink: 'booking terms',
    termsCheckboxPrefix: 'I have read and accept the',
    errorTermsRequired: 'You must accept the booking terms to continue',
    paymentIconsHint: 'Accepted payment methods',
    cardLabel: 'Card',
    backButton: 'Back',
    continueToPayment: 'Continue to payment',
    errorFullNameRequired: 'Full name is required',
    errorEmailInvalid: 'Please enter a valid email',
    errorEmailMismatch: "Emails don't match",
    errorPhoneInvalid: 'Please enter a valid phone number (at least 7 digits)',
    errorPaymentGeneric: 'Error processing the payment. Please try again.',
    paymentTitle: 'Payment method',
    selectPaymentMethod: (amount) => `Choose how you want to pay €${amount}`,
    applePay: 'Apple Pay',
    bizum: 'Bizum',
    googlePay: 'Google Pay',
    payNowSimulated: 'Pay now (simulated)',
    processing: 'Processing...',
    confirmationTitle: 'Booking confirmed!',
    confirmationSubtitle: "We've sent you an email with all the details of your booking",
    confirmationSentTo: 'Confirmation sent to:',
    boatLabel: 'Boat:',
    peopleLabelShort: 'People:',
    paidTodayLabel: 'Paid today:',
    nextStepsTitle: '📌 Next steps:',
    nextStepsCheckEmail: '✓ Check your email',
    nextStepsContact: '• The franchisee will contact you within 24h',
    nextStepsPay: (amount) => `• Pay €${amount} on arrival (cash or card)`,
    nextStepsEnjoy: '• Enjoy your fishing trip!',
    backHomeButton: 'Back to home',
    addToCalendarButton: '📅 Add to calendar',
    shareWhatsAppButton: '💬 Share on WhatsApp',
    shareWhatsAppMessage: (boatName, location, dateTime) => `I just booked a fishing trip with Maragota Boats on ${boatName} (${location})${dateTime}! 🎣 Book yours:`,
    whatToBringTitle: '🎒 What to bring on the day',
    whatToBringItems: [
      'Sunscreen and a cap',
      'Warm or waterproof clothing',
      'Non-slip footwear',
      'Motion sickness remedy if you are prone to it',
      'A camera for the photos',
    ],
  },
  faq: {
    title: 'Frequently asked questions',
    items: [
      {
        question: 'Can I cancel my booking?',
        answer: 'The €15 deposit is non-refundable, unless the franchisee decides otherwise. See the full booking terms.',
      },
      {
        question: 'Is there a minimum age?',
        answer: 'It depends on the franchise and trip. It is shown when booking; minors must be accompanied by an adult.',
      },
      {
        question: 'What happens if the weather is bad?',
        answer: 'The franchisee may reschedule the trip for safety reasons. They will contact you directly if needed.',
      },
      {
        question: 'Can I book the boat just for my group?',
        answer: 'Yes, choose the "Private" option when booking: you pay a fixed price for the whole boat and no one else joins the trip.',
      },
      {
        question: "What's included in the price?",
        answer: 'Fishing gear, bait, insurance, collective fishing licence, life jacket, guide skipper and fuel.',
      },
      {
        question: 'How do I pay?',
        answer: 'The deposit is paid online when booking (card, Bizum, Apple Pay or Google Pay). The rest is paid on-site, in cash or by card.',
      },
    ],
  },
}

export const fr: Translations = {
  nav: {
    reservas: 'Réserver',
    franquiciate: 'Devenir franchisé',
    franquiciado: 'Espace franchisé',
  },
  whatsapp: {
    ariaLabel: 'Écrivez-nous sur WhatsApp',
    tooltip: 'Des questions ? Écrivez-nous',
    defaultMessage: "Bonjour, j'ai une question sur Maragota Boats",
  },
  footer: {
    forProfessionals: 'Vous avez un bateau ?',
    terms: 'Conditions de réservation',
    privacy: 'Confidentialité',
    legal: 'Mentions légales',
    cookies: 'Cookies',
  },
  home: {
    heroTitle: 'Maragota Boats',
    heroSubtitle1: "Vivez l'expérience de pêche la plus authentique d'Espagne",
    heroSubtitle2: 'Réservez votre sortie avec les meilleurs pêcheurs locaux',
    howItWorksTitle: 'Comment ça marche ?',
    step1Title: '1. Cherchez',
    step1Desc: 'Trouvez la sortie idéale près de chez vous',
    step2Title: '2. Sélectionnez',
    step2Desc: 'Choisissez la date, l\'heure et le nombre de personnes',
    step3Title: '3. Réservez',
    step3Desc: 'Confirmez votre réservation et partez pêcher !',
    paymentConfirmedTitle: 'Réservation confirmée !',
    paidLabel: 'Payé :',
    confirmationSentTo: 'Nous avons envoyé la confirmation à',
    closeButton: 'Fermer',
  },
  whyChooseUs: {
    title: 'Pourquoi réserver avec Maragota Boats ?',
    statsLine: (f, b, r, rv) => `${f} franchises · ${b} bateaux · ⭐ ${r} sur ${rv} avis`,
    reasons: [
      {
        icon: '🛡️',
        title: 'La sécurité avant tout',
        description: 'Assurance obligatoire, licence de pêche collective et gilets de sauvetage à chaque sortie.',
      },
      {
        icon: '🎣',
        title: 'Des patrons qui connaissent leur mer',
        description: 'Chaque franchisé gère sa propre zone et sait où se trouve le poisson toute l\'année.',
      },
      {
        icon: '🤝',
        title: 'Un accueil chaleureux et familial',
        description: 'Nous sommes des patrons et des familles, pas une grande entreprise anonyme. Vous êtes traité comme l\'un des nôtres.',
      },
      {
        icon: '💶',
        title: 'Prix fixe, sans surprise',
        description: 'Vous savez exactement ce que vous payez avant de réserver : acompte en ligne puis le reste sur place.',
      },
      {
        icon: '📱',
        title: 'Réservez en quelques minutes',
        description: 'Sans compte ni mot de passe. Réservez avec simplement votre email et votre téléphone.',
      },
      {
        icon: '🌊',
        title: 'Un réseau en expansion en Espagne',
        description: 'Nous avons commencé en Galice et continuons d\'ajouter des destinations avec le même niveau de qualité.',
      },
    ],
  },
  featured: {
    title: 'Nos franchises',
    subtitle: 'Chaque localité a sa propre pêche et ses propres zones de pêche',
    boatsLabel: (n) => `${n} bateau${n !== 1 ? 'x' : ''}`,
    fromPrice: (amount) => `À partir de ${amount}€ / personne`,
  },
  search: {
    title: 'Où allons-nous pêcher aujourd\'hui ?',
    subtitle: 'Trouvez la meilleure expérience de pêche près de chez vous',
    tabProvince: '📍 Province',
    tabPostal: '🔍 Code postal',
    tabNearMe: '📌 Près de moi',
    provinceLabel: 'Sélectionnez une province',
    provincePlaceholder: 'Choisissez votre province',
    dateLabel: 'Date',
    postalLabel: 'Code postal ou ville',
    postalPlaceholder: 'Ex. 36960 ou Marín',
    postalHint: 'Nous vous montrerons les plus proches',
    nearMeLabel: 'Votre position actuelle',
    nearMeHint: '📍 Nous utiliserons votre position actuelle pour trouver les zones les plus proches',
    timeLabel: 'Heure de départ (facultatif)',
    timeAny: 'Peu importe l\'heure',
    timeSlots: [
      { value: '06:00', label: '🌅 06:00 - Aube' },
      { value: '08:00', label: '🌄 08:00 - Matin' },
      { value: '10:00', label: '☀️ 10:00 - Milieu de matinée' },
      { value: '13:00', label: '🌞 13:00 - Après-midi' },
      { value: '16:00', label: '🌅 16:00 - Coucher du soleil' },
    ],
    searchButton: '🎣 Rechercher des sorties',
    searching: '🔍 Recherche...',
    hint: '* Les résultats sont triés par distance en km. Chaque zone a sa propre pêche locale',
    errorSelectProvince: 'Veuillez sélectionner une province',
    errorEnterPostal: 'Veuillez saisir un code postal',
    errorGeoFailed: "Impossible d'obtenir votre position. Essayez de rechercher par code postal.",
    errorGeoDenied: "L'accès à la position est bloqué. Activez-le dans les paramètres du navigateur, ou recherchez par code postal.",
    errorGeoUnsupported: 'Votre navigateur ne prend pas en charge la géolocalisation.',
    errorPostalNotFound: 'Code postal introuvable. Essayez-en un autre.',
    errorPostalGeneric: 'Erreur lors de la recherche par code postal.',
  },
  availability: {
    title: 'Disponibilité',
    nearMeLabel: '📍 Sorties les plus proches de vous',
    provinceLabel: (province) => `📍 Province : ${province}`,
    allProvinces: 'Toutes',
    dateLabel: (date) => `📅 Date : ${date}`,
    timeLabel: (time) => `⏰ Heure : ${time}`,
    noResultsTitle: 'Aucune sortie disponible pour les critères sélectionnés.',
    noResultsHint: "Essayez de changer la date, l'heure ou la province.",
    distanceLabel: 'de distance',
    localFishLabel: '🎣 Pêche locale :',
    reviewsLabel: (n) => `(${n} avis)`,
    includesTitle: '✓ Votre sortie comprend :',
    includesItems: [
      'Matériel de pêche et appâts',
      'Assurance et licence collective',
      'Gilet de sauvetage',
      'Skipper guide à bord',
      'GPS / sondeur de pêche',
      'Carburant inclus',
    ],
    seatsLabel: (available, total) => `Places disponibles : ${available}/${total}`,
    fullBadge: 'Bateau complet pour cette date',
    priceBreakdownTitle: 'Détail du prix',
    reservationNow: 'Acompte (maintenant) :',
    franchiseeLater: 'Sur place (ensuite) :',
    totalLabel: 'Total :',
    perPerson: 'Par personne',
    reserveButton: 'Réserver',
    noAvailabilityButton: 'Indisponible',
    fallbackNotice: (province) => `Nous n'avons pas encore de franchise à ${province}. Voici les sorties disponibles les plus proches.`,
  },
  reservationModal: {
    completeIn3Steps: 'Complétez votre réservation en 3 étapes',
    peopleTitle: 'Combien de personnes ?',
    peopleLabel: (max) => `Nombre de personnes (maximum ${max})`,
    personOption: (n) => `${n} personne${n > 1 ? 's' : ''}`,
    priceForPeople: (n) => `Prix total pour ${n} personne${n > 1 ? 's' : ''} :`,
    reserveNowLine: (amount) => `Acompte maintenant : ${amount}€`,
    payAtDestinationLine: (amount) => `À payer sur place : ${amount}€`,
    continueButton: 'Continuer',
    sharedLabel: '🤝 Partagé',
    sharedDesc: 'Vous partagez le bateau avec d\'autres pêcheurs. Vous ne payez que pour votre groupe.',
    privateLabel: '🔒 Privé',
    privateDesc: 'Le bateau entier rien que pour vous. Personne d\'autre ne participe à la sortie.',
    privatePriceNote: (total) => `Prix fixe pour le bateau entier : ${total}€, quel que soit le nombre de participants`,
    detailsTitle: 'Vos informations personnelles',
    fullNameLabel: 'Nom complet *',
    emailLabel: 'Email *',
    emailHint: 'Vous recevrez la confirmation à cet email',
    confirmEmailLabel: "Confirmer l'email *",
    phoneLabel: 'Téléphone *',
    phonePlaceholder: '6 XX XX XX XX',
    reservationLine: (n, fee) => `Acompte (${n} x ${fee}€) :`,
    payAtDestination: (amount) => `${amount}€`,
    noShowDisclaimer: "Si vous ne vous présentez pas, l'acompte n'est pas remboursé. Consultez les",
    termsLink: 'conditions de réservation',
    termsCheckboxPrefix: "J'ai lu et j'accepte les",
    errorTermsRequired: 'Vous devez accepter les conditions de réservation pour continuer',
    paymentIconsHint: 'Moyens de paiement acceptés',
    cardLabel: 'Carte',
    backButton: 'Retour',
    continueToPayment: 'Continuer vers le paiement',
    errorFullNameRequired: 'Le nom complet est obligatoire',
    errorEmailInvalid: 'Veuillez saisir un email valide',
    errorEmailMismatch: 'Les emails ne correspondent pas',
    errorPhoneInvalid: 'Veuillez saisir un téléphone valide (7 chiffres minimum)',
    errorPaymentGeneric: 'Erreur lors du traitement du paiement. Veuillez réessayer.',
    paymentTitle: 'Méthode de paiement',
    selectPaymentMethod: (amount) => `Choisissez comment payer ${amount}€`,
    applePay: 'Apple Pay',
    bizum: 'Bizum',
    googlePay: 'Google Pay',
    payNowSimulated: 'Payer maintenant (simulé)',
    processing: 'Traitement...',
    confirmationTitle: 'Réservation confirmée !',
    confirmationSubtitle: 'Nous vous avons envoyé un email avec tous les détails de votre réservation',
    confirmationSentTo: 'Confirmation envoyée à :',
    boatLabel: 'Bateau :',
    peopleLabelShort: 'Personnes :',
    paidTodayLabel: "Payé aujourd'hui :",
    nextStepsTitle: '📌 Prochaines étapes :',
    nextStepsCheckEmail: '✓ Vérifiez votre email',
    nextStepsContact: '• Le franchisé vous contactera sous 24h',
    nextStepsPay: (amount) => `• Payez ${amount}€ à votre arrivée (espèces ou carte)`,
    nextStepsEnjoy: '• Profitez de votre sortie pêche !',
    backHomeButton: "Retour à l'accueil",
    addToCalendarButton: '📅 Ajouter au calendrier',
    shareWhatsAppButton: '💬 Partager sur WhatsApp',
    shareWhatsAppMessage: (boatName, location, dateTime) => `Je viens de réserver une sortie de pêche avec Maragota Boats à bord de ${boatName} (${location})${dateTime} ! 🎣 Réservez la vôtre :`,
    whatToBringTitle: '🎒 Quoi apporter le jour J',
    whatToBringItems: [
      'Crème solaire et casquette',
      'Vêtements chauds ou imperméables',
      'Chaussures antidérapantes',
      'Un remède contre le mal de mer si vous y êtes sujet',
      'Un appareil photo pour les souvenirs',
    ],
  },
  faq: {
    title: 'Questions fréquentes',
    items: [
      {
        question: 'Puis-je annuler ma réservation ?',
        answer: "L'acompte de 15€ n'est pas remboursable, sauf décision contraire du franchisé. Consultez les conditions de réservation complètes.",
      },
      {
        question: 'Y a-t-il un âge minimum ?',
        answer: "Cela dépend de chaque franchise et sortie. C'est indiqué au moment de la réservation ; les mineurs doivent être accompagnés d'un adulte.",
      },
      {
        question: "Que se passe-t-il s'il fait mauvais temps ?",
        answer: 'Le franchisé peut changer la date ou l\'heure de la sortie pour des raisons de sécurité. Il vous préviendra directement si nécessaire.',
      },
      {
        question: 'Puis-je réserver le bateau juste pour mon groupe ?',
        answer: 'Oui, choisissez l\'option "Privé" lors de la réservation : vous payez un prix fixe pour le bateau entier et personne d\'autre ne participe à la sortie.',
      },
      {
        question: 'Que comprend le prix ?',
        answer: 'Matériel de pêche, appâts, assurance, licence de pêche collective, gilet de sauvetage, skipper guide et carburant.',
      },
      {
        question: 'Comment puis-je payer ?',
        answer: "L'acompte se paie en ligne lors de la réservation (carte, Bizum, Apple Pay ou Google Pay). Le reste se paie sur place, en espèces ou par carte.",
      },
    ],
  },
}

export const translations: Record<Locale, Translations> = { es, gl, ca, eu, en, fr }
