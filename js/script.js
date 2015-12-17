(function($, Drupal) {
  'use strict';

  // A demo Drupal behavior
  Drupal.behaviors.customBehavior = {
    attach: function(context, settings) {
      //$('body', context).prepend('Demo drupal behavior in js/script.js');
      //console.log('Drupal behavior from js/script.js');
      let x = 'hi';
      console.log(x);
    }
  };
  Drupal.behaviors.HighlightJsStartup = {
    attach: function(context, settings) {
      //$('body', context).prepend('Demo drupal behavior in js/script.js');
      hljs.initHighlightingOnLoad();
      //console.log(hljs.listLanguages());
    }
  };


})(jQuery, Drupal);

