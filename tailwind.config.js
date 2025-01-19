/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./screen/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        textprimary: '#F5F5F5',
        textsecondary: '#ffffffb2',
        semiwhite: '#b6b6b6',
        inactive: '#737373'
      },
      fontFamily: {
        pregular: ["Poppins-Regular", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
      }
    },
  },
  plugins: [],
}