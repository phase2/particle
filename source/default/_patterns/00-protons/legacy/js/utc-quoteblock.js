(function ($, Drupal, drupalSettings) {
  'use strict';
  Drupal.behaviors.blockquote = {
    attach: function (context, settings) {
      // Remove any "&nbsp;" from blockquotes bc this interferes with formatting
      $('blockquote').each(function () {
        var blockQuote = $(this).html();
        blockQuote = blockQuote.replace(/&nbsp;/g, ' ');
        $(this).html(blockQuote);
      });
    },
  };
})(jQuery, Drupal, drupalSettings);
