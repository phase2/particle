module.exports = function (grunt, config) {
  "use strict";
  // `config` vars set in `Gruntconfig.json`

  var assets = grunt.file.readJSON("pattern-lab-assets.json");
  
  grunt.registerTask("plBuild", [
    "injector",
    "pattern_lab_component_builder",
    "shell:plBuild"
  ]);

  grunt.config.merge({
    
    shell: {
      plBuild: {
        command: "php " + config.plDir + "core/builder.php --generate --nocache"
      },
      livereload: {
        command: "touch .change-to-reload.txt"
      }
    },
    
    jsonlint: {
      pl: {
        src: [
          config.plDir + "source/_patterns/**/*.json",
          config.plDir + "source/_data/*.json"
        ]
      }
    },
    
    watch: {
      pl: {
        files: config.plDir + "source/**/*.*",
        tasks: [
          "shell:plBuild",
          "shell:livereload",
          "newer:jsonlint:pl"
        ]
      },
      livereload: {
        options: {
          livereload: true
        },
        files: ".change-to-reload.txt"
      }
    },
    
    // local server
    connect: { // https://www.npmjs.org/package/grunt-contrib-connect
      pl: {
        options: {
          port: 9005,
          useAvailablePort: true,
          base: config.serverDir,
          keepalive: true,
          livereload: true,
          open: "http://localhost:9005/" + config.serverPath,
          middleware: function(connect, options, middlewares) {

            middlewares.unshift(function(req, res, next) {
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.setHeader('Access-Control-Allow-Credentials', true);
              res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
              res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
              next();
            });

            return middlewares;
          }
        }
      }
    },
    
    pattern_lab_component_builder: {
      colors: {
        options: {
          regex: "^\\$color--.*",
          allow_var_values: false
        },
        src: config.scssDir + '00-config/_colors.scss',
        dest: config.plDir + 'source/_patterns/00-atoms/01-global/00-colors.json'
      },
      fonts: {
        options: {
          regex: "^\\$font--family--.*",
          allow_var_values: false
        },
        src: config.scssDir + '00-config/_fonts.scss',
        dest: config.plDir + 'source/_patterns/00-atoms/01-global/01-fonts.json'
      },
      fontSizes: {
        options: {
          regex: "^\\$font-size.*",
          allow_var_values: false
        },
        src: config.scssDir + '00-config/_fonts.scss',
        dest: config.plDir + "source/_patterns/00-atoms/02-text/00-font-sizes.json"
      },
      breakpoints: {
        options: {
          regex: '^\\$bp.*',
          allow_var_values: false
        },
        src: config.scssDir + '00-config/_breakpoints.scss',
        dest: config.plDir + "source/_patterns/01-molecules/01-layout/99-breakpoints.json"
      }
    },

    // injector's job is to read the pattern-lab-assets.json file and inject those assets into PL
    injector: {
      // https://github.com/klei/grunt-injector
      options: {
        addRootSlash: false,
        ignorePath: []
      },
      headerCSS: {
        options: {
          starttag: '<!-- start:headerCSS -->',
          endtag: '<!-- end:headerCSS -->',
          transform: function (filePath) {
            filePath = "../../../../" + filePath;
            return '<link href="' + filePath + '" media="all" />';
          }
        },
        src: assets.headerCSS,
        dest: config.plDir + 'source/_patterns/00-atoms/00-meta/_00-head.mustache'
      },
      footerJS: {
        options: {
          starttag: '<!-- start:footerJS -->',
          endtag: '<!-- end:footerJS -->',
          transform: function (filePath) {
            filePath = "../../../../" + filePath;
            return '<script src="' + filePath + '"></script>';
          }
        },
        src: assets.footerJS,
        dest: config.plDir + 'source/_patterns/00-atoms/00-meta/_01-foot.mustache'
      },
      headerJS: {
        options: {
          starttag: '<!-- start:headerJS -->',
          endtag: '<!-- start:headerJS -->',
          transform: function (filePath) {
            filePath = "../../../../" + filePath;
            return '<script src="' + filePath + '"></script>';
          }
        },
        src: assets.headerJS,
        dest: config.plDir + 'source/_patterns/00-atoms/00-meta/_00-head.mustache'
      }
    }
    
  });

};
