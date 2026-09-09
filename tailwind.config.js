/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        maragota: {
          orange: '#FF6B35',
          'dark-orange': '#E55100',
          black: '#1A1A1A',
          white: '#FFFFFF',
          'light-gray': '#F5F5F5',
        }
      }
    },
  },
  plugins: [],
}
