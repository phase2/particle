<template>
  <div class="row">
    <div
      v-for="card in cards"
      :key="card.phone"
      class="card-wrapper col-sm-12 col-md-6 col-lg-4 mb-3 card-hover"
      :data-testid="`card-wrapper-${card.id}`"
      @click="[toggle(card), $emit('set-name', card.name)]"
    >
      <card v-bind="card" />
    </div>
  </div>
</template>

<script>
/**
 * Cards here wraps individual Card with click behavior. Note the unique:
 *
 *   <card v-bind="card" />
 *
 * This "spreads" all the attributes of `card` individually as props to <card />.
 * Note also that @click fires 2 methods, one to call toggle() and the other to:
 *
 *   $emit('set-name', card.name)
 *
 * This provides data back up to the parent app.

 * Import existing PRINTING styles through JavaScript. This does NOT duplicate
 * since JavaScript imports are handled by Webpack.
 */

import 'atoms/grid';

// Import the card component
import card from './card.vue';

export default {
  name: 'Cards',
  components: {
    card,
  },
  props: {
    cards: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    // We have to use a full method here instead of just an inline:
    //   @click="card.isClicked = !card.isClicked"
    // because isClicked is not part of the reactive props initially. Therefore
    // we use a method (toggle()) that uses the $set utility to create the new
    // key and make it reactive.
    toggle(item) {
      this.$set(item, 'isClicked', !item.isClicked);
    },
  },
};
</script>

<style lang="scss" scoped>
@use '~tokens/sass/utils';

.card-hover:hover {
  background-color: utils.bs-theme-color('light');
}
.scoped-background {
  background-color: utils.bs-color('white');
}
</style>
