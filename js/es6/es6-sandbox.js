(function($, Drupal, undefined) {
  "use strict";

  // A demo Drupal behavior
  Drupal.behaviors.es6Sandbox = {
    attach: function(context, settings) {
      const es6Message = "Helslo from the future!";
      console.log(es6Message);
    }
  };


})(jQuery, Drupal);
