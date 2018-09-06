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
import { mapGetters } from 'vuex';

// import existing PRINTING styles through javascript
import 'molecules/card';

export default {
  name: 'card',
  computed: {
    ...mapGetters(['getCard']),
  },
  // We *could* get data immediately for this widget, but look for the contrived
  // approach within enable()
  // created() {
  //   this.$store.dispatch('getCardItems');
  // },
};
</script>
