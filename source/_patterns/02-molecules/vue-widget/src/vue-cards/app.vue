<template>
  <div id="vue-example-widget">
    <widget />
    <cards
      :cards="cardsArray"
    />
  </div>
</template>

<script>
import cards from './components/cards.vue';
import widget from './components/widget.vue';

export default {
  components: {
    cards,
    widget,
  },
  data() {
    return {
      cardsArray: [],
    };
  },
  created() {
    this.getCards();
  },
  methods: {
    async getCards() {
      this.cardsArray = await (await fetch(
        'https://jsonplaceholder.typicode.com/users'
      )).json();
      console.log(this.cardsArray);
    },
  },
};
</script>
