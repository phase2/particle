/**
 * Example Vue widgets
 *
 * Mount all widgets via the root index.js file.
 */

import 'protons';

// Module styles
import './_vue-widget.scss';

// All Vue widgets only execute on existence of DOM
import FacetTableVue from './src/vue-cryptos';
import FacetTableVueX from './src/vuex-cryptos';
import VueCards from './src/vue-cards';
import VueClock from './src/vue-clock';

// // Render Vue elements as soon as possible
// if (document.getElementById('vue-cryptos')) {
//   FacetTableVue('#vue-cryptos');
// }
// if (document.getElementById('vuex-cryptos')) {
//   FacetTableVueX('#vuex-cryptos');
// }
// if (document.getElementById('vue-cards')) {
//   VueCards('#vue-cards');
// }
// if (document.getElementById('vue-clock')) {
//   VueClock('#vue-clock');
// }
