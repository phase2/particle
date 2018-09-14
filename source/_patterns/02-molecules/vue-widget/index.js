/**
 * Example Vue widgets
 *
 * Mount all widgets via the root index.js file.
 */

import 'protons';
import 'molecules/card';

// Module template
import './_vue-facet-table-vuex.twig';
import './_vue-facet-table-vue.twig';

// Module styles
import './_vue-widgets.scss';

import FacetTableVue from './src/vue-cryptos'; // load only if dom found
import FacetTableVueX from './src/vuex-cryptos'; // load only if dom found
import VueCards from './src/vue-cards'; // load only if dom found

// Render Vue elements as soon as possible
if (document.getElementById('vue-facet-table-vue')) {
  FacetTableVue('#vue-facet-table-vue');
}
if (document.getElementById('vue-facet-table-vuex')) {
  FacetTableVueX('#vue-facet-table-vuex');
}
if (document.getElementById('vue-cards')) {
  VueCards('#vue-cards');
}

export const name = 'vue-widget';

export function disable() {}

export function enable() {
  // Send data from settings or post-docready() work here
  // FacetTableVue.$store.dispatch('exampleAction', settings.vueExampleData');
}

export default enable;
