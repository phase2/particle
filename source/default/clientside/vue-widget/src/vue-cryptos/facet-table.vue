<template>
  <div
    class="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-grey-light"
  >
    <div
      class="py-3 px-6 mb-0 bg-grey-lighter border-b-1 border-grey-light text-grey-darkest"
    >
      {{ title }}
    </div>
    <div class="flex-auto p-6">
      <h5 class="mb-3">
        Filter:
        <span class="uppercase">{{ filter }}</span> | Requesting:
        {{ requesting }}
      </h5>
      <facet-table-facets
        :facets="['all', 'winners', 'losers']"
        :filter="filter"
        @updateFilter="filter = $event"
      />
    </div>
    <ul class="flex flex-col pl-0 mb-0 border rounded border-grey-light ">
      <li
        v-for="{
          id: key,
          rank,
          name,
          price_usd,
          symbol,
          percent_change_7d: change,
        } in filteredCryptos"
        :key="key"
        class="relative block py-3 px-6 -mb-px border border-r-0 border-l-0 border-grey-light no-underline"
      >
        <facet-table-row
          v-bind="{ key, rank, name, price_usd, symbol, change }"
        />
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
          return [...cryptos].sort(
            ({ percent_change_7d: changeA }, { percent_change_7d: changeB }) =>
              changeB - changeA
          );
        // Sort by negative change
        case 'losers':
          return [...cryptos].sort(
            ({ percent_change_7d: changeA }, { percent_change_7d: changeB }) =>
              changeA - changeB
          );
        // Filter by "rank" by default
        default:
          return [...cryptos].sort(
            ({ rank: rankA }, { rank: rankB }) => rankA - rankB
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
      const data = await (
        await fetch('https://api.coinmarketcap.com/v2/ticker/?limit=10')
      ).json();
      this.cryptos = Object.keys(data.data).map(key => ({
        ...data.data[key],
        percent_change_7d: data.data[key].quotes.USD.percent_change_7d,
        price_usd: data.data[key].quotes.USD.price,
      }));
      this.requesting = false;
    },
  },
};
</script>
