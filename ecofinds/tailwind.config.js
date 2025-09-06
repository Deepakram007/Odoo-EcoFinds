/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        black1:{
          DEFAULT: 'rgb(0,0,0)',
          50: 'rgb(39,39,39)',
          150: 'rgb(39,39,39,.4)',
          100: 'rgb(230,230,230)',
        },
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