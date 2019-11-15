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
/**
 * A super contrived example to show off a few things like:
 * - Intervals
 * - Computed derived from Data
 * - Methods called within template affecting data,thus affecting computed
 * - Props
 * - Utility functions used within methods()
 */

import { randRGB } from 'tokens/js/utils';

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
// Just a demo
@use 'sass:map';
@use '~tokens/sass/utils';

.vue-banner {
  margin: map.get(utils.$bs-spacers, 5);
  padding: map.get(utils.$bs-spacers, 4);
  font-size: utils.$bs-font-size-lg;
  background-color: utils.bs-theme-color('primary');

  h3 {
    color: utils.bs-theme-color('light');
  }
}
</style>
