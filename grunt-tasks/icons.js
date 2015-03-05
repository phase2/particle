module.exports = function (grunt, options) {
  "use strict";
  var scssDir = "scss/";
  var plDir = "pattern-lab/";

  // https://github.com/sapegin/grunt-webfont
  grunt.registerTask('cleanup_font_icon_build', 'Don\'t run this directly', function () {
    grunt.file.copy(plDir + 'source/_patterns/00-atoms/04-images/icons.html', plDir + 'source/_patterns/00-atoms/04-images/icons.mustache');
    grunt.file.delete(plDir + 'source/_patterns/00-atoms/04-images/icons.html');
  });
  grunt.registerTask('buildIcons', [
    'webfont:icons',
    'cleanup_font_icon_build'
  ]);
  grunt.config.merge({
    webfont: {
      icons: {
        src: 'images/icons/src/*.svg',
        dest: 'images/icons/output/fonts',
        destCss: scssDir + 'icons',
        options: {
          engine: "node",
          stylesheet: 'scss',
          relativeFontPath: 'images/icons/output/fonts/',
          template: 'images/icons/templates/icons.template.css',
          htmlDemo: true,
          htmlDemoTemplate: 'images/icons/templates/08-icons.html',
          destHtml: plDir + 'source/_patterns/00-atoms/04-images/',
          hashes: false
        }
      }
    },
    watch: {
      files: [
        'images/icons/src/**/*',
        'images/icons/templates/*'
      ],
      tasks: ['buildIcons']
    }
  });
};
