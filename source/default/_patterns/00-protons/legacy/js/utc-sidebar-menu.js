(function($, Drupal, drupalSettings) {
    "use strict";

    Drupal.behaviors.sidebarmenu = {
        attach: function(context, settings) {
            $('<div aria-hidden="true" class="more closed"><i class="fas fa-angle-right"></i></div>').prependTo('.menu-item--expanded');
            $('.menu-item--expanded.menu-item--active-trail').addClass('open');
            
            $(document).delegate('.more.open', 'click', function(){
                $(this).removeClass('open').addClass('closed');
                $(this).parent().removeClass('open');
            });
            $(document).delegate('.more.closed', 'click', function(){
                $(this).removeClass('closed').addClass('open');
                $(this).parent().addClass('open');
            });
            $('.menu-item--expanded.menu-item--active-trail.open>.more').click();
            $('.menu-item--expanded.menu-item--active-trail.open>.more .more.open').removeClass('open').addClass('closed');
        }
    };
}(jQuery, Drupal, drupalSettings));