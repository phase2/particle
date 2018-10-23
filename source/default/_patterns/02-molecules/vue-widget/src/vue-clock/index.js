import Vue from 'vue';

import Clock from './vue-clock.vue';

export default el =>
  new Vue({
    el,
    render: h => h(Clock),
  });
