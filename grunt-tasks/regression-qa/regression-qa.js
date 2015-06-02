module.exports = function (grunt, config) {
  "use strict";
  // `config` vars set in `Gruntconfig.yml`
  
  grunt.config.merge({

    phantomcss: {// https://github.com/micahgodbolt/grunt-phantomcss
      options: {
        mismatchTolerance: 0.05,
        logLevel: 'error',
        cleanupComparisonImages: true
      },
      webux: {
        options: {
          screenshots: 'baselines',
          results: 'results',
          viewportSize: [1280, 800]
        },
        src: [
          'pattern-lab/source/_patterns/**/*.test.js'
        ]
      }
    }


  });

};
