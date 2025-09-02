/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.html",
    "./assets/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0B2831',
        secondary: '#1e293b',
        accent: '#60a5fa',
        'dark-bg': '#0B2831',
        'text-primary': '#f8fafc',
        'text-secondary': '#cbd5e1',
        'text-muted': '#94a3b8'
      }
    },
  },
  plugins: [],
}

