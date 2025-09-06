/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: 'rgb(255,215,0)',
          600: 'rgb(255,215,0)',
          700: 'rgb(204,172,0)', // a darker gold for hover or emphasis
        },
      },
    },
  },
  plugins: [],
}