"use strict";

(function ($, Drupal, undefined) {
  "use strict";

  // A demo Drupal behavior
  Drupal.behaviors.es6Sandbox = {
    attach: function attach(context, settings) {
      var es6Message = "Helslo from the future!";
      console.log(es6Message);
    }
  };
})(jQuery, Drupal);
//# sourceMappingURL=compiled-from-es6.js.map
