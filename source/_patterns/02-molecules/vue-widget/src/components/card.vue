<style scoped>
.resize {
}
.card-hover {
  /*padding: 10px;*/
  /*margin: 10px;*/
}
.card-hover:hover {
  background-color: rgba(0, 0, 0, 0.46);
}
.card-hover:active {
  background-color: #db9200;
}
.scoped-background {
  background-color: white;
}
.scoped-row {
  justify-content: center;
}
.active {
  background-color: #ee9900;
}
</style>

<template>
  <div
    class="row scoped-row"
  >
    <div
      v-for="item in getCard"
      :id="item.id"
      :key="item.phone"
      :class="[classObject, classObject2]"
      @click="toggle(item)"
    >
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
  name: 'Card',
  data() {
    return {
      filter: 1,
      error: null,
    };
  },
  computed: {
    ...mapGetters('vueWidget', ['getCard']),
    classObject() {
      return {
        'text-dark': false,
        'col-5': true,
        'card-hover': true,
        resize: true,
        'scoped-background': false,
        card: true,
      };
    },
    classObject2() {
      return {
        'text-dark1': false,
        'col-51': true,
        'card-hover1': true,
        resiz1e: true,
        'scop1ed-background': false,
        card1: true,
      };
    },
  },
  methods: {
    toggle(val) {
      this.filter = val.id;
    },
  },
  // We *could* get data immediately for this widget, but look for the contrived
  // approach within enable()
  // created() {
  //   this.$store.dispatch('getCardItems');
  // },
};
</script>
