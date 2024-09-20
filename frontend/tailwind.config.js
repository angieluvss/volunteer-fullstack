// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'snow': '#FFFAFA',
        'shasta_red': '#E21C34',
        'lava_black': '#352F36',
        'dark_gray': '#797979',
        'light_gray': '#E7E7E7',
        'persian_plum': '#6F2424',
        'light_pink': '#ffbbc3',
        'medium_pink': '#f68181'
      }
    },
  },
  plugins: [],
}
