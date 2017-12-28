const pa11y = require('pa11y');

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

// Run tests against multiple URLs
// @TODO Update promise to pull all PL data:
// From src/themes/particle/dist/pl/styleguide/data/patternlab-data.js.
Promise.all([
  pa11y('http://0.0.0.0:8080/pl/patterns/00-protons-demo-borders/00-protons-demo-borders.html', options),
  pa11y('http://0.0.0.0:8080/pl/patterns/02-molecules-card-demo-cards/02-molecules-card-demo-cards.html', options),
])
  .then(results => {
    console.log(results[0]); // Results for the first URL
    console.log(results[1]); // Results for the second URL
  })
  .catch(error => {
    console.error(error.message);
  });
