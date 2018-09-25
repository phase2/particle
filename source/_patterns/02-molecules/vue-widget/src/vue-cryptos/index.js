/**
 * A simple table that fetches data and is then sortable on facets
 */
import Vue from 'vue';

import FacetTableComponent from './facet-table.vue';

export default el =>
  new Vue({
    el,
    render: h => h(FacetTableComponent),
  });
