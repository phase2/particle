module.exports = function (grunt, config) {
  "use strict";

  // https://github.com/sapegin/grunt-webfont
  grunt.registerTask('cleanup_font_icon_build', 'Don\'t run this directly', function () {
    grunt.file.copy(config.plDir + 'source/_patterns/00-atoms/04-images/icons.html', config.plDir + 'source/_patterns/00-atoms/04-images/icons.mustache');
    grunt.file.delete(config.plDir + 'source/_patterns/00-atoms/04-images/icons.html');
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
        destCss: config.scssDir + 'icons',
        options: {
          engine: "node",
          stylesheet: 'scss',
          relativeFontPath: 'images/icons/output/fonts/',
          template: 'images/icons/templates/icons.template.css',
          htmlDemo: true,
          htmlDemoTemplate: 'images/icons/templates/08-icons.html',
          destHtml: config.plDir + 'source/_patterns/00-atoms/04-images/',
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
