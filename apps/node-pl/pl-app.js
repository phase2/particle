/**
 * Compile PL, send in custom global values
 */
const core = require('@pattern-lab/core');
const config = require('./patternlab-config');
const resolveConfig = require('tailwindcss/resolveConfig');
const tailwindConfig = require('../../source/default/tailwind.config.js');

const pl = core(config);

const fullConfig = resolveConfig(tailwindConfig)
const { colors, spacing } = fullConfig.theme;

const { cleanPublic } = config;
const { NODE_ENV } = process.env;
// Start/stop message template
const message = `Pattern Lab Node v${pl.version()} ${NODE_ENV} compile`;
// Shared options between dev/prod
const options = {
  cleanPublic,
  data: {
    env: NODE_ENV || 'production',
    tokens: {
      colors,
      spacing
    },
  },
};
/**
 * Register pre-compile event
 */
pl.events.on('patternlab-build-start', () => console.log(`${message} START!`));
pl.events.on('patternlab-build-end', () => console.log(`${message} END!`));
/**
 * Full build (including ui)
 */
pl.build(options);
