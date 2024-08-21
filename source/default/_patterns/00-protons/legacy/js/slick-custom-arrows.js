(function ($, Drupal, drupalSettings) {
  'use strict';
  //Adds slick arrows
  Drupal.behaviors.slickcustomarrows = {
    attach: function (context, settings) {
      if ($('.slick-next').children().length === 0) {
        $('<span class="fas fa-chevron-right"</span>').appendTo(
          $('.slick-next')
        );
      }
      if ($('.slick-prev').children().length === 0) {
        $('<span class="fas fa-chevron-left"</span>').appendTo(
          $('.slick-prev')
        );
      }
    },
  };
})(jQuery, Drupal, drupalSettings);
