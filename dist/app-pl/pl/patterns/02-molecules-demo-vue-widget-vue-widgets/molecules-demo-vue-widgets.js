/* eslint-disable no-new */
import Vue from 'vue';
import VueExample2 from './vue-html-example.vue';

new Vue({
  el: '#vue-html-example-2',
  components: { VueExample2 },
  template: '<VueExample2/>',
});
f (document.getElementById('vue-html-example-1')) {
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
      render: (h) => h(VueInputExample),
    }))();
}
