import Vue from 'vue';
import App from './App.vue';
import store from './store';

const VueWidget = new Vue({
  // el: '#vue-example-widget',
  store,
  render: h => h(App),
});

export default VueWidget;
