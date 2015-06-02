module.exports = function (grunt, config) {
  "use strict";
  // `config` vars set in `Gruntconfig.yml`
  
  grunt.registerTask('regressionQA', [
    'phantomcss:all',
    'clean:postRegressionQA'
  ]);
  
  grunt.config.merge({

    phantomcss: {// https://github.com/micahgodbolt/grunt-phantomcss
      options: {
        mismatchTolerance: 0.05,
        logLevel: 'error',
        cleanupComparisonImages: true
      },
      all: {
        options: {
          screenshots: 'baselines',
          results: 'results',
          viewportSize: [1280, 800]
        },
        src: [
          'pattern-lab/source/_patterns/**/*.test.js'
        ]
      }
    },
    
    clean: {// https://www.npmjs.com/package/grunt-contrib-clean
      //preRegressionQA: [
      //  'baselines',
      //  'pattern-lab/source/_patterns/**/results/*.png'
      //],
      postRegressionQA: [
        'baselines',
        'pattern-lab/source/_patterns/**/baselines/*.{diff,fail}.png'
      ]
    }


  });

};
