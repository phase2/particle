<template>
  <div>
    <banner />
    <cards
      :cards="cardsArray"
    />
  </div>
</template>

<script>
import cards from './components/cards.vue';
import banner from './components/banner.vue';

export default {
  components: {
    cards,
    banner,
  },
  data() {
    return {
      cardsArray: [],
    };
  },
  // Fetch data on creation of widget
  created() {
    this.getCards();
  },
  methods: {
    async getCards() {
      this.cardsArray = await (await fetch(
        'https://jsonplaceholder.typicode.com/users'
      )).json();
    },
  },
};
</script>
