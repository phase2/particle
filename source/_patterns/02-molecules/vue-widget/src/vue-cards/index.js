import Vue from 'vue';

import App from './app.vue';

export default el =>
  new Vue({
    el,
    render: h => h(App),
  });
