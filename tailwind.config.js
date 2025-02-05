/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'notion-bg': '#F5F5F6',
        'notion-border': '#EEE',
        'notion-text': '#37352F',
        'notion-blue': '#337EA9'
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
