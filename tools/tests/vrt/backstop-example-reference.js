/**
 * A barebones Backstop reference using example settings.
 */

// eslint-disable-next-line
const backstop = require('backstopjs');
const backstopConfig = require('./backstop-example-settings.js')();

backstop('reference', { config: backstopConfig });
