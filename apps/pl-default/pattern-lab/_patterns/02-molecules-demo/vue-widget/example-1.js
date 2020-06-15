/* eslint-disable no-new, no-alert */
import Vue from 'vue';

new Vue({
  el: '#vue-html-example-1',
  data: {
    name: '',
  },
  methods: {
    toSpace() {
      alert(this.name);
    },
  },
});
