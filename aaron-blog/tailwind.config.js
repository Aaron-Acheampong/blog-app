/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'lightGreen': '#b9e7e7',
      },
      flex: {
        '2': '2 2 0%',
        '3': '3 3 0%',
        '5': '5 5 0%',
      },
    },
  },
  plugins: [],
}
