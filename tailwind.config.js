/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/app/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'primary-main': '#305841',
        primary: '#212B36',
        disabled: '#919EAB',
        secondary: '#637381',
        'tertiary-main': '#ED882D',
        'secondary-50': '#FFFDF3',
        'secondary-lighter': '#FBF4E8'
      }
    },
  },
  plugins: [],
}
