'use client'

import Script from 'next/script'

// Se activa solo si se configura el token — ver .env.local.example.
const TOKEN = process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN

export default function CloudflareAnalytics() {
  if (!TOKEN) return null

  return (
    <Script
      id="cf-web-analytics"
      type="module"
      strategy="afterInteractive"
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token: TOKEN })}
    />
  )
}
