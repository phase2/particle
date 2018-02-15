/* eslint import/no-unresolved: 0 import/no-extraneous-dependencies: 0 */

const pa11y = require('pa11y');
const reporter = require('pa11y-reporter-cli');

const plPath = 'http://0.0.0.0:8080/pl';
// @TODO dynamically retrieve pl data from config.js.
// An Array of URLs for pa11y to test.
const testPaths = [
  '/patterns/00-protons-demo-borders/00-protons-demo-borders.html',
  '/patterns/01-atoms-alert-demo-alerts/01-atoms-alert-demo-alerts.html',
  '/patterns/02-molecules-card-demo-cards/02-molecules-card-demo-cards.html',
];

// Put together some options to use in each test.
// See pa11y config https://github.com/pa11y/pa11y/tree/5.x#configuration.
const options = {
  standard: 'WCAG2AAA',
  ignore: [
    'WCAG2AAA.Principle3.Guideline3_1.3_1_1.H57.2',
    'WCAG2AAA.Principle1.Guideline1_4.1_4_6.G18',
  ],
  log: {
    debug: console.log,
    error: console.error,
    info: console.log,
  },
};

/**
 * Returns an array of URLs with pa11y options. Join url via template literals.
 * @param {Array} testPaths - the paths we want to test.
 * @param {Array} options - the pa11y options we evaluate against.
 * @return {Array} pa11yPaths - a pa11y array to operate on.
 */
const pa11yPaths = testPaths.map(testPath => pa11y(`${plPath}${testPath}`, options));

Promise.all(pa11yPaths)
  .then(results => results.forEach(result => options.log.info(reporter.results(result))))
  .catch(error => options.log.error(error.message));
