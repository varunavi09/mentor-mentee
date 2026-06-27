/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: (() => {
        const colors = require('tailwindcss/colors');
        // Use emerald & green palettes for gradients; map prior brand names to green spectrum.
        const emerald = colors.emerald;
        const green = colors.green;
        const lime = colors.lime;
        // Provide unified mapping: indigo -> emerald (lighter vibrant), purple -> green (standard), pink/rose -> lime (accent)
        return {
          indigo: emerald,
            purple: green,
            pink: lime,
            rose: green,
            gray: colors.neutral,
            black: '#000'
        };
      })()
    },
  },
  plugins: [],
}
