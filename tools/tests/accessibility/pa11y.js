// All PL paths
const { htmlPaths } = require('../../pl-paths');

const plRoot = 'http://0.0.0.0:8080/app-pl/pl'; // @TODO: move this to config
const urls = htmlPaths.map(partial => `${plRoot}/${partial}`);

// Put together some options to use in each test.
// See pa11y config https://github.com/pa11y/pa11y-ci#usage
module.exports = {
  standard: 'WCAG2AAA',
  defaults: {
    concurrency: 5,
    timeout: 20000,
    wait: 2000,
    ignore: [
      'WCAG2AAA.Principle3.Guideline3_1.3_1_1.H57.2',
      'WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail',
      'WCAG2AA.Principle1.Guideline1_4.1_4_3.G145.Fail',
    ],
  },
  urls,
};
