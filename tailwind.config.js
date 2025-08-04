module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // <- for App Router
    './components/**/*.{js,ts,jsx,tsx}', // <- if you have components
    './src/**/*.{js,ts,jsx,tsx}' // <- keep this if you're using /src
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
}
