<template>
  <div class="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-grey-light">
    <div class="py-3 px-6 mb-0 bg-grey-lighter border-b-1 border-grey-light text-grey-darkest">
      {{ title }}
    </div>
    <div class="flex-auto p-6">
      <h5 class="mb-3">
        Filter:
        <span class="uppercase">{{ filter }}</span> | Requesting:
        {{ requesting }}
      </h5>
      <facet-table-facets :facets="['all', 'winners', 'losers']" />
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
