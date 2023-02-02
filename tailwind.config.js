/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite.{js,ts}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    require('flowbite'),
    require('flowbite/plugin'),

  ],
  theme: {
    extend: {},
  },
  plugins: [],
}