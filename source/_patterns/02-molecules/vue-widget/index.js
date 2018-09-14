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

import FacetTableVue from './src/vue-example'; // load only if dom found
import FacetTableVueX from './src/vuex-example'; // load only if dom found
import VuexWidget from './src/vue-cards'; // load only if dom found

// Render Vue elements as soon as possible
if (document.getElementById('vue-facet-table-vue')) {
  FacetTableVue('#vue-facet-table-vue');
}
if (document.getElementById('vue-facet-table-vuex')) {
  FacetTableVueX('#vue-facet-table-vuex');
}
if (document.getElementById('vue-example-widget')) {
  VuexWidget('#vue-example-widget');
}

export const name = 'vue-widget';

export function disable() {}

export function enable() {
  // Send data from settings or post-docready() work here
  // FacetTableVue.$store.dispatch('exampleAction', settings.vueExampleData');
}

export default enable;
