const pa11y = require('pa11y');
const reporter = require('pa11y-reporter-cli'); // As pa11y 5 stabilizes, we can pull this off pa11y

// @TODO pl data from src/themes/particle/dist/pl/styleguide/data/patternlab-data.js.
// An Array of URLs for pa11y to test.
const urls = [
  'http://0.0.0.0:8080/pl/patterns/00-protons-demo-borders/00-protons-demo-borders.html',
  'http://0.0.0.0:8080/pl/patterns/02-molecules-card-demo-cards/02-molecules-card-demo-cards.html',
];

// Put together some options to use in each test
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
 * Returns an array of URLs with pa11y options.
 * @param {Array} urls - the urls we want to test.
 * @param {Array} options - the pa11y options we evaluate against.
 * @return {Array} pallyUrls
 */
const pallyUrls = urls.map(url => pa11y(url, options));

Promise.all(pallyUrls)
  .then(results => results.forEach(result => options.log.info(reporter.results(result))))
  .catch(error => options.log.error(error.message));
