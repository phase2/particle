/**
 * Tailwind config for design system
 *   Requires Tailwind 1.4.0 or greater
 */

const path = require('path');

// Tailwind Plugins
const tailwindForms = require('@tailwindcss/forms');

const colors = require('./tokens/colors.tailwind');
const customForms = require('./tokens/forms.tailwind');
const fontFamily = require('./tokens/font-family.tailwind');

// Default Tailwind config can be found here: https://github.com/tailwindcss/tailwindcss/blob/v1.2.0/stubs/defaultConfig.stub.js
module.exports = {
  important: true,
  // Purge CSS from Tailwind Only.
  purge: {
    content: [path.resolve(__dirname, '_patterns/**/*.*'), path.resolve(__dirname, '../../apps/drupal-default/particle_theme/templates/**/*.*')],
    options: {
      // Whitelist Non-DS Dependent Patterns.
      whitelistPatterns: [/^bg/, /^text/, /:?-?m[xy]?-/, /:?p[xy]?-/],
      defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
      extensions: ['yml', 'twig', 'json', 'js', 'ts'],
    },
  },
  theme: {
    colors,
    customForms,
    fontFamily,
    extend: {
      gridTemplateRows: {
        // Adds a custom template for the utc hero block
        'utchero': '30px 1fr 1fr 30px',
      },
      gridTemplateColumns: {
        // Adds a custom template for the utc hero block
        'utchero': '1fr 1fr 1fr',
        'utcheroright': '10px 1fr 1fr 1fr',
        'utcherolarge': '1fr minmax(min-content,120rem) minmax(min-content,50rem) 1fr',
        'utcherolargeright': '1fr minmax(min-content,50rem) minmax(min-content,120rem) 1fr',
      }
    },
    minHeight: {
      '23': '23rem'
    }
  },
  variants: {},
  plugins: [tailwindForms],
};
