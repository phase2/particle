(function($, Drupal, drupalSettings) {
    "use strict";
   //Handles hover image effects to custom blocks 
    Drupal.behaviors.hoverimages = {
        attach: function(context, settings) {
        //Find out whether the image that is being placed (inputed) is horizontal or vertical.
        function imageInputOrientation() {
            $('.utc-hover-image-effect img').each(function(){
                var hoverOrientationW = $(this).width();
                var hoverOrientationH = $(this).height();
                if ( hoverOrientationW > hoverOrientationH ){
                    $(this).parent().parent().addClass('input-horizontal');
                } else {
                    $(this).parent().parent().addClass('input-vertical');
                }
            });
        }
        imageInputOrientation();
        $(window).resize(function() {
            imageInputOrientation();
            $('.utc-hover-image-effect.input-vertical.input-horizontal').each(function(){
                $(this).removeClass('input-horizontal');
            });
            $('.utc-hover-image-effect.input-horizontal.input-vertical').each(function(){
                $(this).removeClass('input-vertical');
            });
            location.reload(true/false);
        });
        //Tell the grid how many columns to apply based on number of children.
        $('.image-count-1:first-child').each(function(){
            $(this).parent().addClass('grid-cols-1');
        });
        $('.image-count-2:first-child').each(function(){
            $(this).parent().addClass('grid-cols-2');
        });
        $('.image-count-3:first-child').each(function(){
            $(this).parent().addClass('grid-cols-3');
        });
        $('.image-count-4:first-child').each(function(){
            $(this).parent().addClass('grid-cols-4');
        });
      }
    };
  }(jQuery, Drupal, drupalSettings));