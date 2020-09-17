//https://www.drupal.org/project/drupal/issues/3065095#comment-13311079
// it allows ckeditor tables to behave as expected.
(function ($, Drupal) {
   // if ($('#layout-builder-modal') != null ) {
   //    orig_allowInteraction = $.ui.dialog.prototype._allowInteraction;
   //    $.ui.dialog.prototype._allowInteraction = function(event) {
   //       if ($(event.target).closest('.cke_dialog').length) {
   //          return true;
   //       }
   //       return orig_allowInteraction.apply(this, arguments);
   //    };
   // }
  })(jQuery, Drupal);