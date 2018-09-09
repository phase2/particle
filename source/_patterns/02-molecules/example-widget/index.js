/**
 * Example Vue widgets
 *
 * Mount all widgets via the root index.js file.
 */

import 'protons';
import 'molecules/card';

// Module template
import './_vue-facet-table-vuex.twig';

// Module styles
import './_example-widget.scss';

import FacetTable from './src'; // mount only if dom found

// Render Vue elements as soon as possible
if (document.getElementById('vue-facet-table')) {
  new FacetTable().$mount('#vue-facet-table');
}

export const name = 'example-widget';

export function disable() {}

export function enable() {
  // Send data from settings or post-docready() work here
  // FacetTable.$store.dispatch('exampleAction', settings.vueExampleData');
}

export default enable;
