/**
 * Compile PL, send in custom global values
 */

const core = require('@pattern-lab/core');
const config = require('./patternlab-config');

const pl = core(config);

const { cleanPublic } = config;
const { NODE_ENV } = process.env;

const message = `Pattern Lab Node v${pl.version()} ${NODE_ENV} compile`;

/**
 * Register pre-compile event
 */
pl.events.on('patternlab-build-start', () => console.log(`${message} START!`));

/**
 * Build PL patterns only
 */
pl.patternsonly({
  cleanPublic,
  // Custom vars injected into PL global data
  data: {
    env: NODE_ENV || 'production',
  },
}).then(() => console.log(`${message} END!`));
