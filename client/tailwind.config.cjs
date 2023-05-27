/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        darkcyanbg: "#f5fafd"
      },
      screens: {
        'sm' : '690px'
      },
      keyframes: {
        slideButtom: {
          '0%': {transform: 'translate(50%,-100px)'},
          '100%': {transform: 'translate(50%,0)'}
        },
      },
      animation: {
        hbat: 'slideButtom 1s ease-in-out',
      }
    },
  },
  plugins: [],
}
