/**
 * This is a pretty standard app > collection > items pattern.
 *   app
 *     banner
 *     cards
 *       card
 *       card
 *       ...
 * App fetches data and provides props to Cards which loops out each individual
 * Card. App uses the custom event @set-name to allow communication between
 * child components (Cards) and parent (App).
 *
 * In reality, we'd probably move the data fetching into Cards as well as adding
 * the isClicked property to each card at the time of fetching. We'd also
 * probably reach for VueX when we start communicating between components more.
**/

<template>
  <div class="banner-cards">
    <banner :username="cardName" />
    <p v-if="cardName">
      Clicked name: <strong>{{ cardName }}</strong>
    </p>
    <cards
      :cards="cardsArray"
      @set-name="cardName = $event"
    />
  </div>
</template>

<script>
import cards from './components/cards.vue';
import banner from './components/banner.vue';

export default {
  name: 'VueCardsApp',
  components: {
    cards,
    banner,
  },
  data() {
    return {
      cardsArray: [],
      cardName: '',
    };
  },
  // Fetch data on creation of widget
  created() {
    this.getCards();
  },
  methods: {
    // Fetch data, ensure the incoming data has all attributes we need
    async getCards() {
      this.cardsArray = await (await fetch(
        'https://jsonplaceholder.typicode.com/users'
      )).json();
    },
  },
};
</script>
