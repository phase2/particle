/**
 * Example Vue widgets
 *
 * Mount all widgets via the root index.js file.
 */

import 'protons';
import 'molecules/card';

// Module template
import './_vuex-cryptos.twig';
import './_vue-cryptos.twig';
import './_vue-cards.twig';
import './_vue-clock.twig';

// Module styles
import './_vue-widget.scss';

import FacetTableVue from './src/vue-cryptos'; // load only if dom found
import FacetTableVueX from './src/vuex-cryptos'; // load only if dom found
import VueCards from './src/vue-cards'; // load only if dom found
import VueClock from './src/vue-clock'; // load only if dom found

// Render Vue elements as soon as possible
if (document.getElementById('vue-cryptos')) {
  FacetTableVue('#vue-cryptos');
}
if (document.getElementById('vuex-cryptos')) {
  FacetTableVueX('#vuex-cryptos');
}
if (document.getElementById('vue-cards')) {
  VueCards('#vue-cards');
}
if (document.getElementById('vue-clock')) {
  VueClock('#vue-clock');
}

export const name = 'vue-widgets';

export function disable() {}

export function enable() {
  // Send data from settings or post-docready() work here
  // FacetTableVue.$store.dispatch('exampleAction', settings.vueExampleData');
}

export default enable;
