/**
 * Vue-related components.
 */
import Vue from 'vue';
import App from './App.vue';
import store from './store';

const vueComponents = new Vue({
  el: '#app',
  store,
  render: h => h(App),
});

export default vueComponents;
