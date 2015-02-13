module.exports = function (grunt, options) {
  "use strict";

  var plDir = "pattern-lab/";

  function getDrupalJS() {
    var drupalInfoJS = [];
    var infoFiles = grunt.file.read("drupal7-theme.info");
    infoFiles.match(/^scripts.*/gm).forEach(function (line) {
      drupalInfoJS.push(line.replace(/^script.*= /, ''));
    });
    //console.log(drupalInfoJS);
    return drupalInfoJS;
  }

  function getDrupalCSS() {
    var drupalInfoCSS = [];
    var infoFiles = grunt.file.read("drupal7-theme.info");
    infoFiles.match(/^stylesheets.*/gm).forEach(function (line) {
      drupalInfoCSS.push(line.replace(/^stylesheets.*= /, ''));
    });
    //console.log(drupalInfoCSS);
    return drupalInfoCSS;
  }

  grunt.config.merge({
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
            filePath = "../../../../" + filePath;
            return '<script src="' + filePath + '"></script>';
          }
        },
        src: getDrupalJS(),
        dest: plDir + 'source/_patterns/00-atoms/00-meta/_01-foot.mustache'
      }
    }
  });
};