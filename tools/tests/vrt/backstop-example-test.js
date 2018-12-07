/**
 * A barebones Backstop test using example settings.
 */

const backstopConfig = require('./backstop-example-settings.js')();
const backstop = require('backstopjs');

backstop('test', {config: backstopConfig});
