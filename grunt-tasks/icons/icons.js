module.exports = function (grunt, config) {
  "use strict";

  grunt.config.merge({
    webfont: {
      icons: {
        src: 'images/icons/src/*.svg',
        dest: 'images/icons/output/fonts',
        destCss: 'scss/00-config/',
        options: {
          engine: "node",
          stylesheet: 'scss',
          relativeFontPath: '../images/icons/output/fonts/',
          template: 'images/icons/templates/icons.template.css',
          htmlDemo: true,
          htmlDemoTemplate: 'images/icons/templates/icons.html',
          destHtml: 'images/icons/output/',
          hashes: false,
          syntax: 'bem',
          templateOptions: {
            baseClass: 'icon',
            classPrefix: 'icon--'
          }
        }
      }
    },
    watch: {
      files: [
        'images/icons/src/**/*'
      ],
      tasks: ['icons-build']
    }
  });

  grunt.registerTask('icons-cleanup', function() {
    grunt.file.copy('images/icons/output/icons.html', 'pattern-lab/source/_patterns/00-atoms/04-images/icons.mustache');
    if (grunt.file.exists('images/icons/output/icons.html')) {
      grunt.file.delete('images/icons/output/icons.html');
    }
  });
  grunt.registerTask("icons-build", ['webfont:icons', 'icons-cleanup']);

};
