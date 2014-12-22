module.exports = function(grunt, options) {
  "use strict";
  return {
    // https://github.com/klei/grunt-injector
    options: {
      addRootSlash: false,
      ignorePath: [],
      transform: function (filepath) {
        var newfilepath = filepath.replace("../", "{{ drupal_theme_mac_base_path }}");
        return '<script src="' + newfilepath + '"></script>';
      }
    }
  };
};
