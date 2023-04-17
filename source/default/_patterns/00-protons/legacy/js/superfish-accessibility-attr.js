
(function($, Drupal, drupalSettings) {
    "use strict";

    Drupal.behaviors.superfishaccessibilityattributes = {
        attach: function(context, settings) {
            //console.log("sf accessibility js loaded.");
            var getSfLink = document.querySelectorAll(".accessibility-link-attributes");
            var i;
            for (i = 0; i < getSfLink.length; i++) { 
                getSfLink[i].title = getSfLink[i].textContent;
                getSfLink[i].setAttribute("role", "link");
                getSfLink[i].setAttribute("aria-label", getSfLink[i].textContent);
            }
            var getSfLink2 = document.querySelectorAll(".twm-link");
            var i;
            for (i = 0; i < getSfLink2.length; i++) { 
                getSfLink2[i].title = getSfLink2[i].textContent;
                getSfLink2[i].setAttribute("role", "link");
                getSfLink2[i].setAttribute("aria-label", getSfLink2[i].textContent);
            }
        }
    };
}(jQuery, Drupal, drupalSettings));