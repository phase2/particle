(function ($, Drupal, drupalSettings) {
  'use strict';
  Drupal.behaviors.academicprograms = {
    attach: function (context, settings) {
      //console.log("utc-academic-programs.js is loaded.")

      if (window.location.href.indexOf('degrees-and-programs') > -1) {
        $('body').addClass('utc-programs-page');
      }
      var programBlock = document.getElementsByClassName('utc-programs-block');
      if ($(programBlock).length > 0) {
        $('body').addClass('utc-programs-page');
      }
      $(window).scroll(function () {
        if ($(this).scrollTop() > 925) {
          $('.program-table thead').addClass('scrolled');
        } else {
          $('.program-table thead').removeClass('scrolled');
        }
      });
      var programHeadline = $(
        '.utc-programs-page .program-page-title-and-crumbs'
      );
      var programOverlay = $('.utc-programs-page .program-overlay');

      $(programOverlay).css({ 'z-index': '-1', opacity: '.75' });

      function ghostMainContent() {
        $(programHeadline).css('opacity', '.25');
        $(programOverlay).css('z-index', '2');
        $('.page-footer').css('z-index', '3');
        $('.utcpage-title').css('z-index', '1');
      }
      function unghostMainContent() {
        $(programHeadline).css('opacity', '1');
        $(programOverlay).css('z-index', '-1');
        $('.page-footer').css('z-index', 'unset');
        $('.utcpage-title').css('z-index', '5');
      }
      function togglediv(getProgramBtnDetailId) {
        $('.offscreen-program-details').each(function () {
          var detailId = $(this).attr('id');
          if (detailId == getProgramBtnDetailId) {
            $('.offscreen-program-details')
              .css('right', '-650px')
              .removeClass('detail-open');
            $(this).css('right', '0').addClass('detail-open');
          }
          ghostMainContent();
        });
      }
      $('.program-btn').each(function () {
        var getProgramBtnDetailId = $(this).attr('data-src');
        $(this).on('click', function () {
          togglediv(getProgramBtnDetailId);
        });
      });
      $('.close-btn').each(function () {
        var parentId = $(this).closest('.offscreen-program-details').attr('id');
        $(this).on('click', function () {
          $('#' + parentId).css('right', '-650px');
          unghostMainContent();
        });
      });
      $(document).mouseup(function (e) {
        if ($(e.target).closest('.offscreen-program-details').length === 0) {
          $('.offscreen-program-details').css('right', '-650px');
          unghostMainContent();
        }
      });
      $('.utc-programs-page').each(function () {
        $(this)
          .find('.offscreen-program-details')
          .wrapAll("<div class='program-window'></div>");
      });

      /***JS for the video modal window */
      // Get the modal
      var modal = document.getElementById('dp-modal');

      // Get the button that opens the modal
      var btn = document.getElementById('dp-modal-button');

      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName('close-modal')[0];

      // When the user clicks the button, open the modal
      btn.onclick = function () {
        modal.style.display = 'flex';
      };

      // When the user clicks on <span> (x), close the modal
      span.onclick = function () {
        modal.style.display = 'none';
      };

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = 'none';
        }
      };
    },
  };
})(jQuery, Drupal, drupalSettings);
