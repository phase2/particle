/**
 * Compile PL, send in custom global values
 */

const config = require('./patternlab-config');
const pl = require('@pattern-lab/core')(config);

const { cleanPublic } = config;
const { NODE_ENV } = process.env;

/**
 * Register pre-compile event
 */
pl.events.on('patternlab-build-start', () => {
  console.log(`Pattern Lab Node v${pl.version()} ${NODE_ENV} compile START!`);
});

/**
 * Register post-compile event
 */
pl.events.on('patternlab-build-end', () => {
  console.log(`Pattern Lab Node v${pl.version()} ${NODE_ENV} compile END!`);
});

/**
 * Build PL
 */
pl.build({
  // cleanPublic must be sent over outside of just config
  cleanPublic,
  // Custom vars injected into PL global data
  data: {
    env: NODE_ENV || 'production',
  },
});

