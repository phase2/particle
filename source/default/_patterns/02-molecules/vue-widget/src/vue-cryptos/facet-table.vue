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
        :filter="filter"
        @updateFilter="filter = $event"
      />
    </div>
    <ul class="list-group list-group-flush">
      <li
        v-for="{id: key, rank, name, price_usd, symbol, percent_change_7d: change} in filteredCryptos"
        :key="key"
        class="list-group-item"
      >
        <facet-table-row
          v-bind="{key, rank, name, price_usd, symbol, change}"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import FacetTableFacets from './components/facet-table-facets.vue';
import FacetTableRow from './components/facet-table-row.vue';

const sortBy = require('lodash/sortBy');
const map = require('lodash/map');

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
          return sortBy(cryptos, 'percent_change_7d').reverse();
        // Sort by negative change
        case 'losers':
          return sortBy(cryptos, 'percent_change_7d');
        // Filter by "rank" by default
        default:
          return sortBy(cryptos, 'rank');
      }
    },
  },
  created() {
    this.fetchCryptos();
  },
  methods: {
    async fetchCryptos() {
      this.requesting = true;
      const cryptosData = await (await fetch(
        'https://api.coinmarketcap.com/v1/ticker/?limit=10'
      )).json();
      const fixedData = map(cryptosData, data => {
        const newData = data;
        newData.percent_change_7d = parseFloat(newData.percent_change_7d);
        newData.rank = parseInt(newData.rank, 10);
        return newData;
      });
      this.cryptos = fixedData;
      this.requesting = false;
    },
  },
};
</script>
