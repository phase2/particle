import designSystem from './design-system';
import $ from 'jquery';
import _ from 'lodash';

console.log('drupal-theme ran');
$('h1').html('hello from jquery');

_.forEach([1, 2, 3, 4], (num) => {
  console.log(num);
});


Drupal.behaviors.designSystem = {
  attach(context, settings) {

    designSystem.forEach((component) => {
      component.enable(context, settings);
    });
  },
};
