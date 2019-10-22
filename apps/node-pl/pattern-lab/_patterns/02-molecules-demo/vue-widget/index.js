import Vue from 'vue';

// Demo twig
import twig from './vue-widgets.twig';

import VueInputExample from './vue-html-example.vue';

// Render Vue element from pre-existing markup in HTML
if (document.getElementById('vue-html-example-1')) {
  // Use an IIFE for "new"
  (() =>
    new Vue({
      el: '#vue-html-example-1', // Template from HTML here
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

// Render Vue element with template provided in .vue file
if (document.getElementById('vue-input-text-component')) {
  (() =>
    new Vue({
      el: '#vue-input-text-component',
      render: h => h(VueInputExample),
    }))();
}

export default {
  twig,
};
