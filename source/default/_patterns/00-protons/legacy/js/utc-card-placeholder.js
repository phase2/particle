(function($, Drupal, drupalSettings) {
  "use strict";
  //Prevents all cards from being a placeholder card at once.
  Drupal.behaviors.cardsplaceholder = {
    attach: function(context) {

        $('select[data-drupal-selector="edit-settings-block-form-field-card-count"]' ).each(function(){
            var cardCount = $(this).val();
            
            var cardOnePlaceholder = $('input[data-drupal-selector="edit-settings-block-form-field-card-1-placeholder-value"]');
            var cardTwoPlaceholder = $('input[data-drupal-selector="edit-settings-block-form-field-card-2-placeholder-value"]');
            var cardThreePlaceholder = $('input[data-drupal-selector="edit-settings-block-form-field-card-3-placeholder-value"]');

            if (cardCount == 2) {
                $(cardOnePlaceholder).change(function() {
                    if ($(cardTwoPlaceholder).is(':checked')) {
                        $(cardOnePlaceholder).prop( "checked", false );
                        alert('You cannot hide all the cards.');
                    }
                });
                $(cardTwoPlaceholder).change(function() {
                    if ($(cardOnePlaceholder).is(':checked')) {
                        $(cardTwoPlaceholder).prop( "checked", false );
                        alert('You cannot hide all the cards.');
                    }
                });
            }
            if (cardCount == 3) {
                $(cardOnePlaceholder).change(function() {
                    if ($(cardTwoPlaceholder).is(':checked')) {
                        if ($(cardThreePlaceholder).is(':checked')) {
                            $(cardOnePlaceholder).prop( "checked", false );
                            alert('You cannot hide all the cards.');
                        }
                    }
                });
                $(cardTwoPlaceholder).change(function() {
                    if ($(cardOnePlaceholder).is(':checked')) {
                        if ($(cardThreePlaceholder).is(':checked')) {
                            $(cardTwoPlaceholder).prop( "checked", false );
                            alert('You cannot hide all the cards.');
                        }
                    }
                });
                $(cardThreePlaceholder).change(function() {
                    if ($(cardOnePlaceholder).is(':checked')) {
                        if ($(cardTwoPlaceholder).is(':checked')) {
                            $(cardThreePlaceholder).prop( "checked", false );
                            alert('You cannot hide all the cards.');
                        }
                    }
                });
            }

        });

    }
  };
}(jQuery, Drupal, drupalSettings));




    