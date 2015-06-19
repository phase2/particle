"use strict";
(function($, Drupal, undefined) {

  // A demo Drupal behavior
  Drupal.behaviors.es6Sandbox = {
    attach: function(context, settings) {
      const es6Message = "Hello from the future!";
      console.log(es6Message);
    }
  };


})(jQuery, Drupal);
