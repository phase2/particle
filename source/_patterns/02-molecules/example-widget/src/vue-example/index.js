/* eslint-disable no-param-reassign, no-shadow */

/**
 * A simple table that fetches data and is then sortable on facets
 */
import Vue from 'vue';

import FacetTableComponent from './facet-table.vue';

const FacetTable = Vue.extend({
  render: h => h(FacetTableComponent),
});

export default FacetTable;
