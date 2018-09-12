/* eslint-disable no-param-reassign, no-shadow */

/**
 * A simple table that fetches data and is then sortable on facets
 */
import Vue from 'vue';

import FacetTableComponent from './facet-table.vue';

export default () =>
  new Vue({
    el: '#vue-facet-table-vue',
    render: h => h(FacetTableComponent),
  });
