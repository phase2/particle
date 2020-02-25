<template>
  <div class="relative inline-flex align-middle" role="group" aria-label="List filters">
    <button
      v-for="facet in facets"
      :key="facet"
      type="button"
      class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap py-2 px-4 rounded text-base leading-normal no-underline text-grey-lightest bg-grey hover:bg-grey-light uppercase"
      :class="{ active: filter === facet }"
      @click="setFilter(facet)"
    >
      {{ facet }}
    </button>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'FacetTableFacets',
  props: {
    facets: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    ...mapState('vueFacetTable', ['filter']),
  },
  methods: {
    ...mapActions('vueFacetTable', ['setFilter']),
  },
};
</script>
