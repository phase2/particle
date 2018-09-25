<template>
  <div 
    class="btn-group" 
    role="group" 
    aria-label="List filters"
  >
    <button
      v-for="facet in facets"
      :key="facet"
      type="button"
      class="btn btn-secondary text-uppercase"
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
