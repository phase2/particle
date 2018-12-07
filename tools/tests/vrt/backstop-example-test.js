/**
 * A barebones Backstop test using example settings.
 */

const backstop = require('backstopjs');
const backstopConfig = require('./backstop-example-settings.js')();

backstop('test', { config: backstopConfig });
