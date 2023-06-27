(function($, Drupal, drupalSettings) {
  "use strict";
 //Adds slick arrows 
  Drupal.behaviors.backtotopbutton = {
      attach: function(context, settings) {
          // Get the button:
          let scrollButton = document.getElementById("scroll-to-top-btn");
          if (scrollButton){
            scrollButton.style.display = "none";
          
            // When the user scrolls down 1500px from the top of the document, show the button
            window.onscroll = function() {scrollFunction()};
            function scrollFunction() {
              if (document.body.scrollTop > 1500 || document.documentElement.scrollTop > 1500) {
                scrollButton.style.display = "flex";
              } else {
                scrollButton.style.display = "none";
              }
            }
            // When the user clicks on the button, scroll to the top of the document
            function topFunction() {
              document.body.scrollTop = 0; // For Safari
              document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            } 
            scrollButton.addEventListener("click", topFunction);
          } 
      }
  };
}(jQuery, Drupal, drupalSettings));
