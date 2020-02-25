<template>
  <div class="relative inline-flex align-middle" role="group" aria-label="List filters">
    <button
      v-for="facet in facets"
      :key="facet"
      :data-testid="`facet-button-${facet}`"
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
export default {
  name: 'FacetTableFacets',
  props: {
    facets: {
      type: Array,
      default() {
        return [];
      },
    },
    filter: {
      type: String,
      default() {
        return 'all';
      },
    },
  },
  methods: {
    setFilter(facet) {
      this.$emit('updateFilter', facet);
    },
  },
};
</script>
