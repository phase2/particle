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
    toggle(card) {
      this.$set(card, 'isClicked', !card.isClicked);
    },
  },
};
</script>
<style lang="scss" scoped>
// 00-protons/variables is provided by Webpack
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
