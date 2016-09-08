(function secondaryThemeScript($, Drupal) {
  Drupal.behaviors.demo2 = {
    attach(context) {
      $('html', context).addClass('js2');
    },
  };
}(jQuery, Drupal));
