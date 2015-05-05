module.exports = function (grunt, config) {
  "use strict";

  grunt.registerTask("injectBowerComponents", [
    "wiredep:drupal", // add any dependencies installed via `bower install {thing} --save` to our Drupal `infoFile`
    "injector:headCSS", // add any dependencies from the Drupal `infoFile` to our Pattern Lab
    //"injector:footJS", // do that ^ for our JS
    "injector:headJS"
  ]);

  grunt.config.merge({

    shell: {
      drupalCC: {
        command: "drush cc all"
      }
    },

    // wiredep's job is to take assets declared by Bower and add them to the Drupal 7 theme.info file
    wiredep: {// https://github.com/stephenplusplus/grunt-wiredep
      options: {
        directory: 'bower_components'
      },
      drupal: {
        src: infoFile,
        devDependencies: true,
        dependencies: true,
        exclude: [],

        fileTypes: {
          info: {
            block: /(([ \t]*);\s*bower:*(\S*))(\n|\r|.)*?(;\s*endbower)/gi,
            detect: {
              js: /<script.*src=['"]([^'"]+)/gi,
              css: /<link.*href=['"]([^'"]+)/gi
            },
            replace: {
              js: 'scripts[] = {{filePath}}',
              css: 'stylesheets[] = {{filePath}}'
            }
          }
        }
      }
    },

    watch: {
      bower: {
        files: ['bower.json'],
        tasks: [
          'injectBowerComponents',
          'shell:drupalCC'
        ]
      }
    }

  });
};
