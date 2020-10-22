/**
 * Tailwind config for design system
 *   Requires Tailwind 1.4.0 or greater
 */

const path = require('path');

// Tailwind Plugins
const tailwindCustomForms = require('@tailwindcss/custom-forms');

const colors = require('./tokens/colors.tailwind');
const customForms = require('./tokens/custom-forms.tailwind');
const fontFamily = require('./tokens/font-family.tailwind');

// Default Tailwind config can be found here: https://github.com/tailwindcss/tailwindcss/blob/v1.2.0/stubs/defaultConfig.stub.js
module.exports = {
  // Purge CSS from Tailwind Only.
  purge: {
    content: [path.resolve(__dirname, '_patterns/**/*.*')],
    options: {
      // Whitelist Non-DS Dependent Patterns.
      whitelistPatterns: [/^bg/, /^text/, /^w-/, /^h-/, /^js-/, /^form-/],
      defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
      extensions: ['yml', 'twig', 'json', 'js', 'ts'],
    },
  },
  theme: {
    // Replace default Tailwind config here
    colors,
    customForms,
    fontFamily,
    // Extend (add to) default Tailwdind config here
    extend: {},
  },
  variants: {},
  plugins: [tailwindCustomForms],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
};
