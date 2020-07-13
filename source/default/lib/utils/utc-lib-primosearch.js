(function($, Drupal, drupalSettings) {
  "use strict";
  //Adds Primo Search submit alteration
  Drupal.behaviors.primosearch = {
    attach: function(context) {

      $( "button[name=primosearchsubmit]" , context ).click(function() {
        var sa = "any,contains," + $(this).closest("form").find("input[aria-label='search input for quick search']").val().replace(/[,]/g, " ");
        $(this).closest("form").find("input[name='query']").val(sa);
      });

    }
  };
}(jQuery, Drupal, drupalSettings));
