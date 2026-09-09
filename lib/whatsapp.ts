export function whatsappLink(phone: string, message?: string) {
  const digits = phone.replace(/[^\d]/g, '')
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${digits}${text}`
}
