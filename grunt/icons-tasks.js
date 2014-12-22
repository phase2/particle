module.exports = function(grunt, options) {
  "use strict";
  // https://github.com/sapegin/grunt-webfont
  grunt.registerTask('cleanup_font_icon_build', 'Don\'t run this directly', function () {
    grunt.file.copy('source/_patterns/00-atoms/05-images/icons.html', 'source/_patterns/00-atoms/05-images/icons.mustache');
    grunt.file.delete('source/_patterns/00-atoms/05-images/icons.html');
  });
  grunt.registerTask('buildIcons', [
    'webfont:icons',
    'cleanup_font_icon_build'
  ]);
  return {
    webfont: {
      src: '<%= package.paths.drupal_base %>/images/icons/src/*.svg',
      dest: '<%= package.paths.drupal_base %>/images/icons/output/fonts',
      destCss: '<%= package.paths.drupal_base %>/scss/global/icons',
      options: {
        engine: "node",
        stylesheet: 'scss',
        relativeFontPath: '<%= package.paths.drupal_base %>/images/icons/output/fonts/',
        template: '<%= package.paths.drupal_base %>/images/icons/templates/icons.template.css',
        htmlDemo: true,
        htmlDemoTemplate: '<%= package.paths.drupal_base %>/images/icons/templates/08-icons.html',
        destHtml: 'source/_patterns/00-atoms/05-images/',
        hashes: false
      }
    },
    watch: {
      files: [
        '<%= package.paths.drupal_base %>/images/icons/src/**/*',
        '<%= package.paths.drupal_base %>/images/icons/templates/*'
      ],
      tasks: ['buildIcons']
    }
  };
};
