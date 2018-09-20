<template>
  <div>
    <banner />
    <cards
      :cards="cardsArray"
      @updateCards="update($event)"
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
  created() {
    this.getCards();
  },
  methods: {
    async getCards() {
      this.cardsArray = await (await fetch(
        'https://jsonplaceholder.typicode.com/users'
      )).json();
    },
    update(eventId) {
      // eventId starts at 1 we need the index which starts at 0.
      const id = eventId - 1;
      const target = this.cardsArray[id];
      this.$set(target, 'isClicked', !target.isClicked);
    },
  },
};
</script>
