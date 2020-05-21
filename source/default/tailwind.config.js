/**
 * Tailwind config for design system
 *   Requires Tailwind 1.4.0 or greater
 */

const path = require('path');

const colors = require('./tokens/colors.tailwind.json');
const fontFamily = require('./tokens/font-family.tailwind.json');

// Default Tailwind config can be found here: https://github.com/tailwindcss/tailwindcss/blob/v1.2.0/stubs/defaultConfig.stub.js
module.exports = {
  // Purge CSS from Tailwind Only.
  purge: {
    content: [path.resolve(__dirname, '_patterns/**/*.*')],
    options: {
      // Whitelist Non-DS Dependent Patterns.
      whitelistPatterns: [/^bg/, /^text/, /:?-?m[xy]?-/, /:?p[xy]?-/],
      defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
      extensions: ['yml', 'twig', 'json', 'js', 'ts'],
    },
  },
  theme: {
    colors,
    fontFamily,
    extend: {},
  },
  variants: {},
  plugins: [],
};
