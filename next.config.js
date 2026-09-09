/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Export estático para Cloudflare Pages
  output: 'export',

  // Configuración de imagen
  images: {
    unoptimized: true, // Cloudflare Pages no soporta Image Optimization
  },

  // Configuración de build
  compress: true,
}

module.exports = nextConfig
