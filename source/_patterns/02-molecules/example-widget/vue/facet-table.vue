<template>
  <div id="js-example-widget-vue" class="card">
    <div class="card-header">{{ title }}</div>
    <div class="card-body">
      <h5 class="card-title">Filter: <span class="text-uppercase">{{ filter }}</span> | Requesting: {{requesting}}<br/></h5>
      <div class="btn-group" role="group" aria-label="List filters">
        <button type="button" class="btn btn-secondary text-uppercase" v-on:click="setFilter('all')">All</button>
        <button type="button" class="btn btn-secondary text-uppercase" v-on:click="setFilter('winners')">Winners</button>
        <button type="button" class="btn btn-secondary text-uppercase" v-on:click="setFilter('losers')">Losers</button>
      </div>
        <facet-table-facets/>
    </div>
    <ul class="list-group list-group-flush">
      <li v-for="{id, rank, name, price_usd, symbol} in filteredCryptos" class="list-group-item">
        <facet-table-row v-bind:key="id"
          v-bind="{rank, name, price_usd, symbol}"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

import FacetTableFacets from './components/facet-table-facets.vue';
import FacetTableRow from './components/facet-table-row.vue';

export default {
  name: 'facet-table',
  components: {
    FacetTableFacets,
    FacetTableRow,
  },
  computed: {
    ...mapState('vueFacetTable', ['title', 'filter', 'cryptos', 'requesting']),
    ...mapGetters('vueFacetTable', ['filteredCryptos']),
  },
  methods: {
    ...mapActions('vueFacetTable', ['fetchCryptos', 'setFilter']),
  },
  created() {
    this.fetchCryptos();
  },
};
</script>
