(function ($, Drupal, drupalSettings) {
  'use strict';

  Drupal.behaviors.superfishaccessibilityattributes = {
    attach: function (context, settings) {
      const getSfLink = document.querySelectorAll(
        '.accessibility-link-attributes'
      );
      let i;
      const getSfLink2 = document.querySelectorAll('.twm-link');
      let j;
      const getMobileBtn = document.querySelector('#mobile-menu-icon');
      const getMobileMenu = document.querySelector('#mobile-menu');
      for (i = 0; i < getSfLink.length; i++) {
        getSfLink[i].title = getSfLink[i].textContent;
        getSfLink[i].setAttribute('role', 'link');
        getSfLink[i].setAttribute('aria-label', getSfLink[i].textContent);
      }
      for (j = 0; j < getSfLink2.length; j++) {
        getSfLink2[j].title = getSfLink2[j].textContent;
        getSfLink2[j].setAttribute('role', 'link');
        getSfLink2[j].setAttribute('aria-label', getSfLink2[j].textContent);
      }
      function mobileIconAccessibilityAttr() {
        if (window.matchMedia('(max-width: 768px)').matches) {
          getMobileBtn.setAttribute('aria-hidden', 'false');
          getMobileMenu.setAttribute('aria-hidden', 'false');
        }
      }
      mobileIconAccessibilityAttr();

      window.addEventListener('resize', function () {
        mobileIconAccessibilityAttr();
      });
    },
  };
})(jQuery, Drupal, drupalSettings);
