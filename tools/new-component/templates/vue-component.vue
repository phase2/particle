<template>
  <div class="container">
    <div class="row">
      <div
        v-for="(node, index) in nodes"
        :key="index"
        class="card border border-primary m-3 vue-card"
      >
        <div class="card-header d-flex justify-content-between">
          <p class="card-text">{{ node.tag }}</p>
          <p class="card-text">{{ node.date }}</p>
        </div>
        <div class="card-body">
          <h5 class="card-title">{{ node.title }}</h5>
          <hr />
          <p class="card-text">{{ node.message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: '<%= capitalizedName %>',
  computed: {
    // maps this.foo to this.$store.state['<%= name %>/foo']
    ...mapState('<%= name %>', ['nodes']),
    // maps this.foo to this.$store.getters['<%= name %>/foo']
    ...mapGetters('<%= name %>', ['nodes', 'findNodes']),
  },
  methods: {
    // maps this.foo to this.$store.actions['<%= name %>/foo']
    ...mapActions('<%= name %>', ['fetchData']),
  },
};
</script>

<style lang="scss"></style>
