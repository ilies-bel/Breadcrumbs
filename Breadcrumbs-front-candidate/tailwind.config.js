module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "royalblue": "#3572F1"
      }   
    },
    fontFamily: {
      roboto: 'Roboto',
      quicksand: 'Quicksand'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
