jQuery(document).ready(function () {
  var $ = jQuery;

  // Creates Pattern Lab markdown description slide up/down toggle functionality
  $('.sg-pattern-desc').each(function () {
    $('a', this).attr('target', '_blank');
    var $desc = $(this);
    var $content = $desc.wrapInner('<div class="sg-pattern-desc-content"></div>').find('.sg-pattern-desc-content');
    var $toggle = $('<a class="sg-pattern-desc-toggle" href="#">Open Description</a>');
    $content.slideUp();
    $desc.addClass('is-closed js-ran');
    $desc.prepend($toggle);
    $toggle.click(function (event) {
      event.preventDefault();
      if ($desc.hasClass('is-closed')) {
        $content.slideDown();
        $desc.removeClass('is-closed');
        $desc.addClass('is-open');
        $toggle.text('Close Description');
      } else if ($desc.hasClass('is-open')) {
        $content.slideUp();
        $desc.removeClass('is-open');
        $desc.addClass('is-closed');
        $toggle.text('Open Description');
      }
    });
  });
  
});
