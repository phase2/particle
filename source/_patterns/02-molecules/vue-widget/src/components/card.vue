<template>
  <div class="row" style="justify-content: center;">
    <div v-for="item in getCard" class="card text-dark col-5" style="margin: 5px;">
      <div class="card-body">
        <h4 class="card-title">{{ item.name }}</h4>
        <h6 class="card-subtitle mb-2 text-muted">{{ item.id }}</h6>
        <div class="card-text">
          <ul>
            <li>{{ item.phone }}</li>
            <li>{{ item.website }}</li>
            <li>{{ item.email }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';

// import existing PRINTING styles through javascript
import '../../../card/_card.scss';

export default {
  name: 'card',
  data() {
    return {
      card: this.$store.state.card,
    };
  },
  methods: {
    ...mapActions([]),
  },
  computed: {
    ...mapGetters(['getCard']),
  },
  created() {
    this.$store.dispatch('getCardItems');
  },
};
</script>
