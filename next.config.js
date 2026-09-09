/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Configuración de imagen
  images: {
    unoptimized: true, // Cloudflare Pages no soporta Image Optimization
  },

  // Headers de seguridad
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },

  // Cache strategy para Cloudflare
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },

  // Configuración de build
  swcMinify: true,
  compress: true,

  // URL base (cambiar si usas subdominio)
  basePath: process.env.BASE_PATH || '',

  // Configuración de Cloudflare Workers
  // Verificar que Next.js puede acceder a Cloudflare Bindings
  publicRuntimeConfig: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  },
}

module.exports = nextConfig
