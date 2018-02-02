<template>
  <div class="vue-card">
    <h3><marquee>{{ message }}</marquee></h3>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapState } from 'vuex'
  export default {
    name: 'card',
    data() {
      return {
        message: this.$store.state.message
      }
    },
    methods: {
      ...mapActions([
      ]),
    },
    computed: {
      ...mapGetters([
      ]),
    },
  }
</script>

<style lang="scss">
  @import '../../../../00-protons/variables';

  .vue-card {
    margin: map-get($spacing, l);
    padding: map-get($spacing, m);
    font-size: $font-size-lg;
    background-color: map-get($theme-colors, 'new');

    h3 {
      color: $white;
    }
  }
</style>