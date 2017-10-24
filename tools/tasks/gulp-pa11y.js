const fs = require('fs');
const path = require('path');

const pa11y = require('pa11y');
const reporter = require('pa11y-reporter-cli'); // As pa11y 5 stabilizes, we can pull this off pa11y
const _ = require('lodash');
const through = require('through2');

// Grab project root pa11y.json as object
const pallyJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'pa11y.json')));
// Custom logging tools for pa11y
const logConfig = {
  log: {
    debug: console.log,
    error: console.error,
    info: console.log,
  },
};
// Smash them together
const pa11yConfig = _.assign(pallyJson, logConfig);

/**
 * Run pa11y testing one after the next
 * @returns {*}
 */
function pa11yConsecutive() {
  function bufferContents(vinylFile, encoding, callback) {
    // ignore empty files
    if (vinylFile.isNull()) {
      callback();
      return;
    }
    pa11y(vinylFile.path, pa11yConfig)
      .then((result) => {
        pa11yConfig.log.info(reporter.results(result));
        callback();
      })
      .catch((error) => {
        pa11yConfig.log.error(error.message);
        callback();
      });
  }

  function endStream(callback) {
    callback();
  }

  return through.obj(bufferContents, endStream);
}

/**
 * Gather all paths and run all pa11y tests simultaneously.
 * (Tends to run out of memory)
 * @returns {*}
 */
function pa11yParallel() {
  // All paths to test with pa11y
  const filePaths = [];

  function bufferContents(vinylFile, encoding, callback) {
    // ignore empty files
    if (vinylFile.isNull()) {
      callback();
      return;
    }
    // Simply add the path onto the array of paths to test
    filePaths.push(vinylFile.path);
    callback();
  }

  function endStream(callback) {
    // Run tests against multiple URLs
    Promise.all(_.map(filePaths, filePath => pa11y(filePath, pa11yConfig)))
      .then((results) => {
        results.forEach((result) => {
          pa11yConfig.log.info(reporter.results(result));
        });
        callback();
      })
      .catch((error) => {
        pa11yConfig.log.error(error.message);
        callback();
      });
  }

  return through.obj(bufferContents, endStream);
}

module.exports = {
  pa11yConsecutive,
  pa11yParallel,
};
