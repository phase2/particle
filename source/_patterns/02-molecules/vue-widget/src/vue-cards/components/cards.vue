<template>
  <div
    class="row scoped-row"
  >
    <div
      v-for="card in cards"
      :key="card.phone"
      class="card-wrapper"
      @click="toggle(card)"
    >
      <Card
        :card="card"
      />
    </div>
  </div>

</template>

<script>
// Import existing PRINTING styles through JavaScript. This does NOT duplicate
// since JavaScript imports are handled by Webpack.
import 'molecules/card';

// Import the card component
import Card from './card.vue';

export default {
  name: 'Cards',
  components: {
    Card,
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
    // we use a method (toggle) that uses the $set utility to create the new
    // key and make it reactive.
    toggle(card) {
      this.$set(card, 'isClicked', !card.isClicked);
    },
  },
};
</script>

<style lang="scss" scoped>
// 00-protons/variables is provided by Webpack, but it is possible to:
//   @import '00-protons/variables';
.resize {
}
.card-hover {
}
.card-hover:hover {
  background-color: $light;
}
.card-hover:active {
  background-color: $light;
}
.scoped-background {
  background-color: $white;
}
.scoped-row {
  justify-content: center;
}
</style>
