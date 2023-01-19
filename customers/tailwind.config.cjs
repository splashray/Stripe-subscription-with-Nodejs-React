const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'transparent': 'transparent',
        'customBlue': '#3E4095',
        'customGrey': '#3C3C43',
        'customDarkGrey': '#626262',
        'customLightGrey': '#A7A7A7',
        'customVeryLight': '#EEEEF1',
        'customOrange': '#F58634',
      },
      screens: {
        '3xl': '1600px',
      },
    },

  },
  plugins: [],
})