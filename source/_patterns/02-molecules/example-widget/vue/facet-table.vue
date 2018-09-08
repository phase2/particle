<template>
  <div id="js-example-widget-vue" class="card">
    <div class="card-header">{{ title }}</div>
    <div class="card-body">
      <h5 class="card-title">
        Filter: <facet-table-facets/>
      </h5>
      <p></p>
    </div>
    <ul class="list-group list-group-flush">
      <li v-for="crypto in cryptos" class="list-group-item">
        <facet-table-row
          v-bind:key="crypto.id"
          v-bind:rank="crypto.rank"
          v-bind:name="crypto.name"
          v-bind:price-usd="crypto.price_usd"
          v-bind:symbol="crypto.symbol"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import FacetTableFacets from './components/facet-table-facets.vue';
import FacetTableRow from './components/facet-table-row.vue';

export default {
  name: 'facet-table',
  components: {
    FacetTableFacets,
    FacetTableRow,
  },
  computed: {
    ...mapState('vueFacetTable', ['title', 'cryptos']),
  },
  methods: {
    ...mapActions('vueFacetTable', ['fetchCryptos']),
  },
  created() {
    this.fetchCryptos();
  },
};
</script>
