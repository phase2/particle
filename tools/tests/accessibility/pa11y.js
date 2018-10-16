// All PL paths
const { htmlPaths } = require('../../pl-paths');

const plRoot = 'http://0.0.0.0:8080/pl'; // @TODO: move this to config
const urls = htmlPaths.map(partial => `${plRoot}/${partial}`);

// Put together some options to use in each test.
// See pa11y config https://github.com/pa11y/pa11y-ci#usage
module.exports = {
  standard: 'WCAG2AAA',
  ignore: [
    'WCAG2AAA.Principle3.Guideline3_1.3_1_1.H57.2',
    'WCAG2AAA.Principle1.Guideline1_4.1_4_6.G18',
  ],
  defaults: {
    concurrency: 5,
    timeout: 20000,
    wait: 2000,
    ignore: [],
  },
  urls,
};
