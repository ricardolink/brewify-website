/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'coffee-brown': '#4A2C2A',
        'cream': '#F5ECD9',
        'caramel': '#C68E17',
        'espresso-black': '#231F20',
        'latte-foam': '#E6D7B9',
        'light-gray': '#f8f8f8',
        'medium-gray': '#e0e0e0',
        'dark-gray': '#666666',
        'success-green': '#2e7d32',
        'error-red': '#c62828',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
