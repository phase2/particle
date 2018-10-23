<template>
  <div class="card">
    <div class="card-header">{{ title }}</div>
    <div class="card-body">
      <h5 class="card-title">
        Filter:
        <span class="text-uppercase">{{ filter }}</span> |
        Requesting: {{ requesting }}
      </h5>
      <facet-table-facets 
        :facets="['all', 'winners', 'losers']"
        @updateFilter="filter = $event"
      />
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
import FacetTableFacets from './components/facet-table-facets.vue';
import FacetTableRow from './components/facet-table-row.vue';

export default {
  name: 'FacetTableVue',
  components: {
    FacetTableFacets,
    FacetTableRow,
  },
  data() {
    return {
      cryptos: [],
      requesting: false,
      filter: 'all',
      title: 'Cryptos',
    };
  },
  computed: {
    filteredCryptos() {
      const { cryptos, filter } = this;

      switch (filter) {
        // Sort by positive change
        case 'winners':
          return cryptos.sort(
            ({ percent_change_7d: changeA }, { percent_change_7d: changeB }) =>
              parseFloat(changeA) < parseFloat(changeB)
          );
        // Sort by negative change
        case 'losers':
          return cryptos.sort(
            ({ percent_change_7d: changeA }, { percent_change_7d: changeB }) =>
              parseFloat(changeA) > parseFloat(changeB)
          );
        // Filter by "rank" by default
        default:
          return cryptos.sort(
            ({ rank: rankA }, { rank: rankB }) =>
              parseInt(rankA, 10) > parseInt(rankB, 10)
          );
      }
    },
  },
  created() {
    this.fetchCryptos();
  },
  methods: {
    async fetchCryptos() {
      this.requesting = true;
      this.cryptos = await (await fetch(
        'https://api.coinmarketcap.com/v1/ticker/?limit=10'
      )).json();
      this.requesting = false;
    },
  },
};
</script>
