<template>
  <div class="btn-group" role="group" aria-label="List filters">
    <button
      v-for="facet in facets"
      type="button"
      class="btn btn-secondary text-uppercase"
      v-on:click="setFilter(facet)"
      v-bind:class="{ active: filter === facet }"
    >
      {{facet}}
    </button>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'facet-table-facets',
  props: ['facets'],
  computed: {
    ...mapState('vueFacetTable', ['filter']),
  },
  methods: {
    ...mapActions('vueFacetTable', ['setFilter']),
  },
};
</script>
