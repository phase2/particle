  (function($, Drupal, drupalSettings) {
    "use strict";
   //Adds slick arrows 
    Drupal.behaviors.slickcustomarrows = {
        attach: function(context, settings) {
            var scrollToTopButton = $('<a href="#top" title="Scroll to the top" role="button" aria-label="scroll to the top" aria-labelledby="scrollLabel" class="scroll-to-top-button" ' +
            'onclick="return 0" data-smooth-scroll><i class="fas fa-angle-up"></i><span class="sr-only">Scroll to the top</span></a>');
            
            scrollToTopButton.appendTo($('body'));
            
            $(window).scroll(function() {
                if ($(window).scrollTop() >= 700) {
                $(scrollToTopButton).addClass('active');
                }
                else {
                $(scrollToTopButton).removeClass('active');
                }
            });
        }
    };
  }(jQuery, Drupal, drupalSettings));
  