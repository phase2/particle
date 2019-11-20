// All non-protons PL paths
const { componentPaths } = require('../../pl-paths.js');

const { PL_BASE_DOMAIN } = process.env;

// The PL_BASE_DOMAIN environment variable should be set to override the default.
const plRootDomain = PL_BASE_DOMAIN || '0.0.0.0:8080';
const plRoot = `http://${plRootDomain}/app-node-pl/pl`;

// urls comes from particle, includes all demo paths from atoms+
let urls = componentPaths.map(partial => `${plRoot}/${partial}`);

// prod is any other links that need checked
const prod = [];

// smash the two urls arrays together
urls = urls.concat(prod);

// Put together some options to use in each test.
// See pa11y config https://github.com/pa11y/pa11y-ci#usage
module.exports = {
  standard: 'WCAG2AA',
  defaults: {
    chromeLaunchConfig: {
      // this is needed to run in docker
      args: ['--no-sandbox'],
    },
    hideElements: 'img[data-holder-rendered]',
    ignore: [
      'WCAG2AA.Principle1.Guideline1_4.1_4_3.G18',
      'WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail',
    ],
    includeWarnings: false,
    includeNotices: false,
    concurrency: 2,
    timeout: 40000,
    wait: 2000,
  },
  urls,
};
