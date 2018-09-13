<template>
  <div 
    class="vue-widget" 
    :style="styles"
    @click="randomColor()"
  >
    <h3><marquee>{{ message }}</marquee></h3>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Widget',
  data() {
    return {
      styles: {
        'background-color': 'white',
      },
    };
  },
  computed: {
    ...mapState('vueWidget', ['message']),
  },
  created() {
    this.randomColor();
    setInterval(() => {
      this.randomColor();
    }, 3000);
  },
  methods: {
    randomColor() {
      const o = Math.round;
      const r = Math.random;
      const s = 255;
      this.styles['background-color'] = `rgba(${o(r() * s)},${o(r() * s)},${o(
        r() * s
      )},${r().toFixed(1)})`;
    },
  },
};
</script>

<style lang="scss">
// importing NON PRINTING styles in sass
@import '00-protons/variables';

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
