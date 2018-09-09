import Vue from 'vue';

// Demo twig
import twig from './example-widgets.twig';

// Render Vue elements as soon as possible
if (document.getElementById('vue-html-example')) {
  // Use an IIFE for "new"
  (() =>
    new Vue({
      el: '#vue-html-example',
      data: {
        name: '',
      },
      methods: {
        toSpace() {
          alert(this.name); // eslint-disable-line no-alert
        },
      },
    }))();
}

export default {
  twig,
};
