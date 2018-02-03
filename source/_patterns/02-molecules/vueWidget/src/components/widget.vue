<template>
  <div class="vue-widget">
    <h3><marquee>{{ message }}</marquee></h3>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapState } from 'vuex'
  export default {
    name: 'widget',
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
  // importing NON PRINTING styles in sass
  @import '../../../../00-protons/variables';

  .vue-widget {
    margin: map-get($spacing, l);
    padding: map-get($spacing, m);
    font-size: $font-size-lg;
    background-color: map-get($theme-colors, 'new');

    h3 {
      color: $white;
    }
  }
</style>