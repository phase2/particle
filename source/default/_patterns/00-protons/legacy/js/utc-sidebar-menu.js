(function ($, Drupal, drupalSettings) {
  'use strict';

  Drupal.behaviors.sidebarmenu = {
    attach: function (context, settings) {
      $(document).delegate('.utc-sidebar .more.open', 'click', function () {
        $(this).removeClass('open').addClass('closed');
        $(this).parent().removeClass('open');
      });
      $(document).delegate('.utc-sidebar .more.closed', 'click', function () {
        $(this).removeClass('closed').addClass('open');
        $(this).parent().addClass('open');
      });
    },
  };
})(jQuery, Drupal, drupalSettings);
