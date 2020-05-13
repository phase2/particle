const colors = require('./tokens/colors.tailwind.json');
const fontFamily = require('./tokens/font-family.tailwind');

// Default Tailwind config can be found here: https://github.com/tailwindcss/tailwindcss/blob/v1.2.0/stubs/defaultConfig.stub.js
module.exports = {
  purge: [],
  theme: {
    colors,
    fontFamily,
    extend: {},
  },
  variants: {},
  plugins: [],
};
