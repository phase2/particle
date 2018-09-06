<template>
  <div id="js-example-widget-vue" class="card">
    <div class="card-header">{{ title }}</div>
    <facet-table-facets/>
    <facet-table-row/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import FacetTableFacets from './components/facet-table-facets.vue';
import FacetTableRow from './components/facet-table-row.vue';

export default {
  name: 'facet-table',
  computed: {
    ...mapGetters(['title']),
  },
  components: {
    FacetTableFacets,
    FacetTableRow,
  },
};
</script>
