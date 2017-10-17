/**
 * Vue-related components.
 */
import Vue from 'vue';
import App from './App.vue';
import store from './store';
/**
 * Components from Pattern Lab
 */
import card from './_patterns/02-molecules/card/card';
import homepage from './_patterns/05-pages/homepage';

require('./scss/_config.scss');

const components = [];

components.push(card);
components.push(homepage);

const vueComponents = new Vue({
  el: '#app',
  store,
  render: h => h(App),
});

export { vueComponents };
export default components;

console.log('hello from design-system.js');
