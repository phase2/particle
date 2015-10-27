module.exports = function (grunt) {
  "use strict";
  var config = grunt.file.readYAML("Gruntconfig.yml");
  if (grunt.file.exists("Gruntconfig--custom.yml")) {
    var customConfigOverrides = grunt.file.readYAML("Gruntconfig--custom.yml");
    _.extend(config, customConfigOverrides);
  }
  
  var tasks = {};
  tasks.compile = [];
  tasks.validate = [];
  
  require('p2-theme-core')(grunt, config, tasks);

  // Begin Misc Config
  grunt.config.merge({
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      dev: {
        tasks: [
          "watch",
          "connect"
        ]
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
          regex: '^\\$width.*',
          allow_var_values: false
        },
        src: config.scssDir + '00-config/_breakpoints.scss',
        dest: config.plDir + "source/_patterns/01-molecules/01-layout/99-breakpoints.json"
      }
    },

    browserSync: {
      dev: {
        options: {
          proxy: "mysite.local", // you must set URL to your localhost here 
          //tunnel: true, // tunnel your localhost out to the internet ~ http://localtunnel.me
          //reloadDelay: 500,
          watchTask: true,
          open: false,
          ghostMode: {
            clicks: true,
            forms: true,
            scroll: true
          }
        },
        bsFiles: {
          src: "css/style.css"
        }
      }
    }
  });
  // End Misc Config

  if (config.features.patternLab) {
    // adds task to beginning of compile tasks, needs to be before `plBuild` 
    tasks.compile = ['pattern_lab_component_builder'].concat(tasks.compile);
    grunt.config.set('watch.pl.tasks', ['newer:pattern_lab_component_builder'].concat(grunt.config.get('watch.pl.tasks')));
  }

// End Config

// Begin Task Aliases
  grunt.registerTask("compile", tasks.compile);
  grunt.registerTask("build", "compile");

  grunt.registerTask("validate", tasks.validate);

  // this is ran if you do either `grunt default` or `grunt`
  grunt.registerTask("default", [
    "compile",
    //"browserSync",
    "concurrent:dev"
  ]);
// End Task Aliases
  
  require("load-grunt-tasks")(grunt);
  require('time-grunt')(grunt); // shows how long grunt tasks take ~ https://github.com/sindresorhus/time-grunt

};
