(function($, Drupal, drupalSettings) {
  "use strict";

  Drupal.behaviors.chatbutton = {
    attach: function(context, settings) {

      if ($('#utc-library-chat-widget').length){
        $('#sliderVertical').hide();
        $.getScript( "https://libraryh3lp.com/js/libraryh3lp.js?14392" );
      }else{
        $('#sliderVertical').show();
        $.getScript( "https://libraryh3lp.com/js/libraryh3lp.js?15293" );
      }
      $.fn.extend({
        toggleText: function (apple, banana) {
          return this.text(this.text() == banana ? apple : banana);
        }
      });
      help();
      function help() {
        let timerId = setInterval(function () {
          $(".lib-help__js--text-toggle").toggleText("Ask a Librarian", "Need Help?");
          $(".lib-help__js--color-toggle").toggleClass("lib-help__btn-main--gold");
        }, 25000);
        setTimeout(function () { clearInterval(timerId); }, 25000);
      }

      $("#sliderVertical, #sliderHorizontal").on('click', function (event) {
        event.stopPropagation();
        $("#sliderContentHorizontal").slideToggle(500, 'swing');

        $("#sliderVertical").toggleClass("lib-help__content--vertical-open");
      });
      $(document, "#closeVerticalSlider, #closeHorizontalSlider").on("click", function () {
        $("#sliderVertical").removeClass("lib-help__content--vertical-open");
        $("#sliderContentHorizontal").slideUp(500);
      });

    }
  };
}(jQuery, Drupal, drupalSettings));
