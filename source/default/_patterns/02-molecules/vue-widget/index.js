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

// All Vue widgets only execute on existence of DOM
import FacetTableVue from 'clientside/vue-widget/src/vue-cryptos';
import FacetTableVueX from 'clientside/vue-widget/src/vuex-cryptos';
import VueCards from 'clientside/vue-widget/src/vue-cards';
import VueClock from 'clientside/vue-widget/src/vue-clock';

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

export const name = 'vue-widget';

export function disable() {}

export function enable() {
  // Send data from settings or post-docready() work here, e.g.
  // FacetTableVueX.$store.dispatch('exampleAction', settings.vueExampleData');
}

export default enable;
