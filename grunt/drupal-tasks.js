module.exports = function (grunt, options) {
  "use strict";

  function getDrupalJS() {
    var drupalInfoJS = [];
    var infoFiles = grunt.file.read("../mac_base_pc.info");
    infoFiles.match(/^script.*/gm).forEach(function (line) {
      drupalInfoJS.push(line.replace(/^script.*= /, '../'));
    });
    return drupalInfoJS;
  }

  return {
    shell__cc: {
      command: 'cd <%= package.paths.drupal_core %> && drush cc elc && drush cc all'
    },
    watch: {
      files: [
        '<%= package.paths.drupal_base %>/template_api/**/*.mustache',
        '<%= package.paths.drupal_base %>/template_api/**/*.inc',
        '<%= package.paths.drupal_base %>/templates/**/*.tpl.php'
      ],
      tasks: [
        'shell:drupal_cc',
        'shell:livereload'
      ]
    },
    injector__drupal_info_JS_to_PL_head: {
      options: {
        starttag: '<!-- start:drupal_info:JS -->',
        endtag: '<!-- end:drupal_info:JS -->'
      },
      src: getDrupalJS(),
      dest: 'source/_patterns/00-atoms/00-meta/_00-head.mustache'
    },
    injector__drupal_template_api_JS_to_PL_head: {
      options: {
        starttag: '<!-- start:drupal_template_api:JS -->',
        endtag: '<!-- end:drupal_template_api:JS -->'
      },
      src: ['../template_api/**/*.js'],
      dest: 'source/_patterns/00-atoms/00-meta/_01-foot.mustache'
    },
    //injector__PL_only_JS_to_PL_head: {
    //  options: {
    //    starttag: '<!-- start:PL_only:JS -->',
    //    endtag: '<!-- end:PL_only:JS -->'
    //  },
    //  src: [
    //    '../js/pl/pl_load_page_data.js',
    //    '../js/bower_components/sidr/index.js',
    //    '../js/product.js',
    //    '../js/shared/product_data.js',
    //    '../js/shared/product_ui.js',
    //    '../js/modernizr-custom.js',
    //    '../pattern-lab/source/js/script.js',
    //    '../js/header.js'
    //  ],
    //  dest: 'source/_patterns/00-atoms/00-meta/_00-head.mustache'
    //},
    // this is ready to go; just needs items in `src` (or it throws errors)
    injector__PL_only_JS_to_PL_foot: {
      options: {
        starttag: '<!-- start:foot:JS -->',
        endtag: '<!-- end:foot:JS -->'
      },
      src: [
        '../pattern-lab/source/js/pl_load_page_data.js',
        '../js/shared/product_data.js',
        '../js/shared/product_ui.js',
        '../js/product_product.js',
        '../js/product_modules.js',
        '../js/product_app.js',
        '../pattern-lab/source/js/script.js',
        '../js/bower_components/isotope/dist/isotope.pkgd.min.js'
      ],
      dest: 'source/_patterns/00-atoms/00-meta/_01-foot.mustache'
    },
    injector__PL_only_JS_for_IE8_to_PL_head: {
      options: {
        starttag: '<!-- start:PL_only_JS_for_IE8:JS -->',
        endtag: '<!-- end:PL_only_JS_for_IE8:JS -->'
      },
      src: [
        '../js/bower_components/html5shiv/dist/html5shiv.js',
        '../js/bower_components/respond/dest/respond.src.js',
        '../js/bower_components/nwmatcher/src/nwmatcher.js',
        '../js/selectivizr.js'
      ],
      dest: 'source/_patterns/00-atoms/00-meta/_00-head.mustache'
    }
  };
};
