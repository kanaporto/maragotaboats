// Diccionarios de traducción. La interfaz Translations es la fuente de
// verdad de la forma: TypeScript obliga a que 'en' y 'fr' implementen
// exactamente las mismas claves que 'es', así que no puede faltar una
// traducción sin que el build falle.

export type Locale = 'es' | 'en' | 'fr'

export const LOCALE_LABELS: Record<Locale, string> = {
  es: 'ES',
  en: 'EN',
  fr: 'FR',
}

export const LOCALE_FLAGS: Record<Locale, string> = {
  es: '🇪🇸',
  en: '🇬🇧',
  fr: '🇫🇷',
}

export const LOCALE_NAMES: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  fr: 'Français',
}

export interface Translations {
  nav: {
    reservas: string
    franquiciate: string
    franquiciado: string
  }
  footer: {
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
    detailsTitle: string
    fullNameLabel: string
    emailLabel: string
    emailHint: string
    confirmEmailLabel: string
    phoneLabel: string
    reservationLine: (n: number, fee: number) => string
    payAtDestination: (amount: number) => string
    noShowDisclaimer: string
    termsLink: string
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
  }
}

export const es: Translations = {
  nav: {
    reservas: 'Reservas',
    franquiciate: 'Franquíciate',
    franquiciado: 'Franquiciado',
  },
  footer: {
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
    detailsTitle: 'Tus datos personales',
    fullNameLabel: 'Nombre completo *',
    emailLabel: 'Email *',
    emailHint: 'Recibirás la confirmación en este email',
    confirmEmailLabel: 'Confirmar email *',
    phoneLabel: 'Teléfono *',
    reservationLine: (n, fee) => `Reserva (${n} x ${fee}€):`,
    payAtDestination: (amount) => `${amount}€`,
    noShowDisclaimer: 'Si no te presentas a la salida, la reserva no se reembolsa. Consulta las',
    termsLink: 'condiciones de reserva',
    backButton: 'Atrás',
    continueToPayment: 'Continuar al pago',
    errorFullNameRequired: 'El nombre completo es obligatorio',
    errorEmailInvalid: 'Por favor ingresa un email válido',
    errorEmailMismatch: 'Los emails no coinciden',
    errorPhoneInvalid: 'Por favor ingresa un teléfono válido',
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
  },
}

export const en: Translations = {
  nav: {
    reservas: 'Book now',
    franquiciate: 'Become a franchisee',
    franquiciado: 'Franchisee login',
  },
  footer: {
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
    detailsTitle: 'Your details',
    fullNameLabel: 'Full name *',
    emailLabel: 'Email *',
    emailHint: "We'll send your confirmation to this email",
    confirmEmailLabel: 'Confirm email *',
    phoneLabel: 'Phone *',
    reservationLine: (n, fee) => `Deposit (${n} x €${fee}):`,
    payAtDestination: (amount) => `€${amount}`,
    noShowDisclaimer: "If you don't show up, the deposit isn't refunded. See the",
    termsLink: 'booking terms',
    backButton: 'Back',
    continueToPayment: 'Continue to payment',
    errorFullNameRequired: 'Full name is required',
    errorEmailInvalid: 'Please enter a valid email',
    errorEmailMismatch: "Emails don't match",
    errorPhoneInvalid: 'Please enter a valid phone number',
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
  },
}

export const fr: Translations = {
  nav: {
    reservas: 'Réserver',
    franquiciate: 'Devenir franchisé',
    franquiciado: 'Espace franchisé',
  },
  footer: {
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
    detailsTitle: 'Vos informations personnelles',
    fullNameLabel: 'Nom complet *',
    emailLabel: 'Email *',
    emailHint: 'Vous recevrez la confirmation à cet email',
    confirmEmailLabel: "Confirmer l'email *",
    phoneLabel: 'Téléphone *',
    reservationLine: (n, fee) => `Acompte (${n} x ${fee}€) :`,
    payAtDestination: (amount) => `${amount}€`,
    noShowDisclaimer: "Si vous ne vous présentez pas, l'acompte n'est pas remboursé. Consultez les",
    termsLink: 'conditions de réservation',
    backButton: 'Retour',
    continueToPayment: 'Continuer vers le paiement',
    errorFullNameRequired: 'Le nom complet est obligatoire',
    errorEmailInvalid: 'Veuillez saisir un email valide',
    errorEmailMismatch: 'Les emails ne correspondent pas',
    errorPhoneInvalid: 'Veuillez saisir un téléphone valide',
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
  },
}

export const translations: Record<Locale, Translations> = { es, en, fr }
