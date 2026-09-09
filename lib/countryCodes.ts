// Prefijos telefónicos: España primero, luego Europa (alfabético), luego
// resto del mundo (alfabético).
export interface CountryCode {
  code: string
  name: string
  dial: string
  flag: string
}

export const COUNTRY_CODES: CountryCode[] = [
  { code: 'ES', name: 'España', dial: '+34', flag: '🇪🇸' },

  // Europa
  { code: 'DE', name: 'Alemania', dial: '+49', flag: '🇩🇪' },
  { code: 'AT', name: 'Austria', dial: '+43', flag: '🇦🇹' },
  { code: 'BE', name: 'Bélgica', dial: '+32', flag: '🇧🇪' },
  { code: 'BG', name: 'Bulgaria', dial: '+359', flag: '🇧🇬' },
  { code: 'CY', name: 'Chipre', dial: '+357', flag: '🇨🇾' },
  { code: 'HR', name: 'Croacia', dial: '+385', flag: '🇭🇷' },
  { code: 'DK', name: 'Dinamarca', dial: '+45', flag: '🇩🇰' },
  { code: 'SK', name: 'Eslovaquia', dial: '+421', flag: '🇸🇰' },
  { code: 'SI', name: 'Eslovenia', dial: '+386', flag: '🇸🇮' },
  { code: 'EE', name: 'Estonia', dial: '+372', flag: '🇪🇪' },
  { code: 'FI', name: 'Finlandia', dial: '+358', flag: '🇫🇮' },
  { code: 'FR', name: 'Francia', dial: '+33', flag: '🇫🇷' },
  { code: 'GR', name: 'Grecia', dial: '+30', flag: '🇬🇷' },
  { code: 'NL', name: 'Países Bajos', dial: '+31', flag: '🇳🇱' },
  { code: 'HU', name: 'Hungría', dial: '+36', flag: '🇭🇺' },
  { code: 'IE', name: 'Irlanda', dial: '+353', flag: '🇮🇪' },
  { code: 'IT', name: 'Italia', dial: '+39', flag: '🇮🇹' },
  { code: 'LV', name: 'Letonia', dial: '+371', flag: '🇱🇻' },
  { code: 'LT', name: 'Lituania', dial: '+370', flag: '🇱🇹' },
  { code: 'LU', name: 'Luxemburgo', dial: '+352', flag: '🇱🇺' },
  { code: 'MT', name: 'Malta', dial: '+356', flag: '🇲🇹' },
  { code: 'NO', name: 'Noruega', dial: '+47', flag: '🇳🇴' },
  { code: 'PL', name: 'Polonia', dial: '+48', flag: '🇵🇱' },
  { code: 'PT', name: 'Portugal', dial: '+351', flag: '🇵🇹' },
  { code: 'GB', name: 'Reino Unido', dial: '+44', flag: '🇬🇧' },
  { code: 'CZ', name: 'República Checa', dial: '+420', flag: '🇨🇿' },
  { code: 'RO', name: 'Rumanía', dial: '+40', flag: '🇷🇴' },
  { code: 'SE', name: 'Suecia', dial: '+46', flag: '🇸🇪' },
  { code: 'CH', name: 'Suiza', dial: '+41', flag: '🇨🇭' },

  // Resto del mundo
  { code: 'SA', name: 'Arabia Saudí', dial: '+966', flag: '🇸🇦' },
  { code: 'DZ', name: 'Argelia', dial: '+213', flag: '🇩🇿' },
  { code: 'AR', name: 'Argentina', dial: '+54', flag: '🇦🇷' },
  { code: 'AU', name: 'Australia', dial: '+61', flag: '🇦🇺' },
  { code: 'BR', name: 'Brasil', dial: '+55', flag: '🇧🇷' },
  { code: 'CA', name: 'Canadá', dial: '+1', flag: '🇨🇦' },
  { code: 'CL', name: 'Chile', dial: '+56', flag: '🇨🇱' },
  { code: 'CN', name: 'China', dial: '+86', flag: '🇨🇳' },
  { code: 'CO', name: 'Colombia', dial: '+57', flag: '🇨🇴' },
  { code: 'KR', name: 'Corea del Sur', dial: '+82', flag: '🇰🇷' },
  { code: 'EG', name: 'Egipto', dial: '+20', flag: '🇪🇬' },
  { code: 'AE', name: 'Emiratos Árabes Unidos', dial: '+971', flag: '🇦🇪' },
  { code: 'US', name: 'Estados Unidos', dial: '+1', flag: '🇺🇸' },
  { code: 'PH', name: 'Filipinas', dial: '+63', flag: '🇵🇭' },
  { code: 'IN', name: 'India', dial: '+91', flag: '🇮🇳' },
  { code: 'ID', name: 'Indonesia', dial: '+62', flag: '🇮🇩' },
  { code: 'IL', name: 'Israel', dial: '+972', flag: '🇮🇱' },
  { code: 'JP', name: 'Japón', dial: '+81', flag: '🇯🇵' },
  { code: 'MA', name: 'Marruecos', dial: '+212', flag: '🇲🇦' },
  { code: 'MX', name: 'México', dial: '+52', flag: '🇲🇽' },
  { code: 'NZ', name: 'Nueva Zelanda', dial: '+64', flag: '🇳🇿' },
  { code: 'PK', name: 'Pakistán', dial: '+92', flag: '🇵🇰' },
  { code: 'PE', name: 'Perú', dial: '+51', flag: '🇵🇪' },
  { code: 'RU', name: 'Rusia', dial: '+7', flag: '🇷🇺' },
  { code: 'SG', name: 'Singapur', dial: '+65', flag: '🇸🇬' },
  { code: 'ZA', name: 'Sudáfrica', dial: '+27', flag: '🇿🇦' },
  { code: 'TH', name: 'Tailandia', dial: '+66', flag: '🇹🇭' },
  { code: 'TR', name: 'Turquía', dial: '+90', flag: '🇹🇷' },
  { code: 'UY', name: 'Uruguay', dial: '+598', flag: '🇺🇾' },
  { code: 'VE', name: 'Venezuela', dial: '+58', flag: '🇻🇪' },
]
