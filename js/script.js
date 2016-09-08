(function mainThemeScript($, Drupal) {
  Drupal.behaviors.plStarter = {
    attach(context) {
      $('html', context).addClass('js');
    },
  };
}(jQuery, Drupal));
