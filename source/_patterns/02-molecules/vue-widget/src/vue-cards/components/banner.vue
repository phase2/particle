/**
 * A super contrived example to show off a few things like:
 *   - Intervals
 *   - Computed derived from Data
 *   - Methods called within template affecting data, thus affecting computed
 *   - Props
 *   - Utility functions used within methods()
**/
<template>
  <div
    class="vue-banner"
    data-testid="banner"
    :style="styles"
    @click="bg = randomColor()"
  >
    <h3>
      <marquee>
        <span v-if="!username">{{ message }}</span>
        <span v-else>{{ username }} was clicked!</span>
      </marquee>
    </h3>
  </div>
</template>

<script>
import { randRGB } from 'protons/utilities';

export default {
  name: 'Banner',
  props: {
    username: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      bg: 'rgba(0,0,0,1)',
      message: 'Click me! I change color! Click cards!',
    };
  },
  computed: {
    styles() {
      return {
        background: this.bg,
      };
    },
  },
  created() {
    setInterval(() => {
      this.bg = this.randomColor();
    }, 3000);
  },
  methods: {
    randomColor() {
      return `rgba(${randRGB()},${randRGB()},${randRGB()},1)`;
    },
  },
};
</script>

<style lang="scss">
// 00-protons/variables is provided by Webpack, but it is possible to:
//   @import '00-protons/variables';

// This is mainly here to show that all variables and mixins are available to
// Sass here.
.vue-banner {
  margin: map-get($spacing, l);
  padding: map-get($spacing, m);
  font-size: $font-size-lg;
  background-color: map-get($theme-colors, 'new');

  h3 {
    color: map-get($theme-colors, 'light');
  }
}
</style>
