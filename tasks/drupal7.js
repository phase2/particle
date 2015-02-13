module.exports = function (grunt, options) {
  "use strict";

  var plDir = "pattern-lab/";
  var infoFile = "drupal7-theme.info";

  function getDrupalJS() {
    var drupalInfoJS = [];
    var info = grunt.file.read(infoFile);
    info.match(/^scripts.*/gm).forEach(function (line) {
      drupalInfoJS.push(line.replace(/^script.*= /, ''));
    });
    //console.log(drupalInfoJS);
    return drupalInfoJS;
  }

  function getDrupalCSS() {
    var drupalInfoCSS = [];
    var info = grunt.file.read(infoFile);
    info.match(/^stylesheets.*/gm).forEach(function (line) {
      drupalInfoCSS.push(line.replace(/^stylesheets.*= /, ''));
    });
    //console.log(drupalInfoCSS);
    return drupalInfoCSS;
  }

  grunt.config.merge({

    // injector's job is to read the Drupal 7 theme.info file and inject those assets into PL
    injector: {
      // https://github.com/klei/grunt-injector
      options: {
        addRootSlash: false,
        ignorePath: []
      },
      headCSS: {
        options: {
          starttag: '<!-- start:headCSS -->',
          endtag: '<!-- end:headCSS -->',
          transform: function (filePath) {
            filePath = "../../../../" + filePath;
            return '<link rel="stylesheet" href="' + filePath + '" media="all" />';
          }
        },
        src: getDrupalCSS(),
        dest: plDir + 'source/_patterns/00-atoms/00-meta/_00-head.mustache'
      },
      footJS: {
        options: {
          starttag: '<!-- start:footJS -->',
          endtag: '<!-- end:footJS -->',
          transform: function (filePath) {
            filePath = "../../../../" + filePath; // @todo consider better pathing method 
            return '<script src="' + filePath + '"></script>';
          }
        },
        src: getDrupalJS(),
        dest: plDir + 'source/_patterns/00-atoms/00-meta/_01-foot.mustache'
      }
    },

    // @todo Get WireDep working; needs to inject bower JS & CSS into Drupal 7 theme.info file
    // wiredep's job is to take assets declared by Bower and add them to the Drupal 7 theme.info file
    wiredep: {// https://github.com/stephenplusplus/grunt-wiredep
      options: {
        directory: 'bower_components',
        bowerJson: 'bower.json'
      },
      drupal: {
        src: infoFile,
        devDependencies: true,
        dependencies: true,
        exclude: [],

        fileTypes: {
          info: {
            block: /(([ \t]*);\s*bower:*(\S*))(\n|\r|.)*?(;\s*endbower)/gi,
            //block: /;\s*bower.*(\n|.)*?;\s*endbower/mi,
            //block: /(([ \t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
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
    }

  });
};