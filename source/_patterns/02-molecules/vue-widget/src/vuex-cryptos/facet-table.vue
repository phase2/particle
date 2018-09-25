<template>
  <div class="card">
    <div class="card-header">{{ title }}</div>
    <div class="card-body">
      <h5 class="card-title">
        Filter:
        <span class="text-uppercase">{{ filter }}</span> |
        Requesting: {{ requesting }}
      </h5>
      <facet-table-facets :facets="['all', 'winners', 'losers']" />
    </div>
    <ul class="list-group list-group-flush">
      <li 
        v-for="{id: key, rank, name, price_usd, symbol, percent_change_7d: change} in filteredCryptos"
        :key="key"
        class="list-group-item"
      >
        <facet-table-row v-bind="{key, rank, name, price_usd, symbol, change}" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

import FacetTableFacets from './components/facet-table-facets.vue';
import FacetTableRow from './components/facet-table-row.vue';

export default {
  name: 'FacetTableVueX',
  components: {
    FacetTableFacets,
    FacetTableRow,
  },
  computed: {
    ...mapState('vueFacetTable', ['title', 'filter', 'requesting']),
    ...mapGetters('vueFacetTable', ['filteredCryptos']),
  },
  created() {
    this.fetchCryptos();
  },
  methods: {
    ...mapActions('vueFacetTable', ['fetchCryptos']),
  },
};
</script>
