<script src="../../../demo/index.js">
</script>
<template>
  <div
    class="row scoped-row"
  >
    <div
      v-for="card in cards"
      :id="card.id"
      :key="card.phone"
      class="card-wrapper"
      @click="toggle(card.id)"
    >
      <Card
        :card="card"
      />
    </div>
  </div>

</template>

<script>
// import existing PRINTING styles through javascript
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
    toggle(id) {
      // Cards is an array of objects
      this.$emit('updateCards', id);
    },
  },
  // We *could* get data immediately for this widget, but look for the contrived
  // approach within enable()
  // created() {
  //   this.$store.dispatch('getCardItems');
  // },
};
</script>
<style lang="scss" scoped>
@import '00-protons/variables';
.resize {
}
.card-hover {
  /*padding: 10px;*/
  /*margin: 10px;*/
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
.active {
  background-color: $success;
}
.active:hover {
  background-color: green;
}
</style>
