<template>
  <div class="row">
    <div
      v-for="card in cards"
      :key="card.phone"
      class="card-wrapper col-sm-12 col-md-6 col-lg-4 mb-3 card-hover"
      @click="[toggle(card), $emit('set-name', card.name)]"
    >
      <card
        :card="card"
      />
    </div>
  </div>

</template>

<script>
// Import existing PRINTING styles through JavaScript. This does NOT duplicate
// since JavaScript imports are handled by Webpack.
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
// 00-protons/variables is provided by Webpack, but it is possible to:
//   @import '00-protons/variables';
.card-hover:hover {
  background-color: $light;
}
.scoped-background {
  background-color: $white;
}
</style>
