(function($, Drupal, drupalSettings) {
  "use strict";

  Drupal.behaviors.sidebarmenu = {
      attach: function(context, settings) {
      $(".sidebar-menu li a").each(function () {
        if ($(this).next().length > 0) {
          $(this).addClass("parent");
        };
      })
      var menux = $('.sidebar-menu li a.parent');
      if ($('.more').length === 0) { 
        $('<div class="more"><i class="fas fa-plus"></i></div>').insertBefore(menux);
      };
      $('.more').click(function () {
        $(this).parent('li').toggleClass('open');
      });
      $('.menu-btn').click(function () {
        $('nav').toggleClass('menu-open');
      });
      $('.menu-item--active-trail').each(function () {
        $(this).toggleClass('open');
      });
           
    }
  };
}(jQuery, Drupal, drupalSettings));
