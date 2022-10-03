(function($, Drupal, drupalSettings) {
    "use strict";

    Drupal.behaviors.sidebarmenu = {
        attach: function(context, settings) {

            $(".sidebar-menu li a").each(function() {
                if ($(this).next().length > 0) {
                    $(this).addClass("parent");
                };
            })
            var menux = $('.sidebar-menu li a.parent');
            if ($('.more').length === 0) {
                $('<div aria-hidden="true" class="more closed"><i class="fas fa-angle-right"></i></div>').insertBefore(menux);
            };
            $('.menu-btn').click(function() {
                $('nav').toggleClass('menu-open');
            });
            $('.menu-item--expanded.menu-item--active-trail').addClass('open');
            $('.menu-item--expanded.menu-item--active-trail.open .is-active').prev().removeClass('closed').addClass('open');
            $(document).delegate('.more.open', 'click', function(){
                $(this).removeClass('open').addClass('closed');
                $(this).parent().removeClass('open');
            });
            $(document).delegate('.more.closed', 'click', function(){
                $(this).removeClass('closed').addClass('open');
                $(this).parent().addClass('open');
            });
        }
    };
}(jQuery, Drupal, drupalSettings));