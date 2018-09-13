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
      :key="item.phone"
      :class="[classObject, activeHighlight(item.id)]"
      @click="[toggle(item)]"
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
      filter: new Set(),
      filterArray: [],
      error: null,
      state: {
        clicks: 0,
        'text-dark': true,
        'col-5': true,
        'card-hover': true,
        resize: true,
        'scoped-background': true,
        card: true,
      },
      target: -1,
    };
  },
  computed: {
    ...mapGetters('vueWidget', ['getCard']),
    classObject() {
      console.log('called comp');
      return {
        'text-dark': false,
        'col-5': this.state['text-dark'],
        'card-hover': this.state['card-hover'],
        resize: this.state.resize,
        'scoped-background': this.state['scoped-background'],
        card: true,
      };
    },
  },
  methods: {
    toggle(item) {
      if (this.filter.has(item.id)) {
        this.filter.delete(item.id);
      } else {
        this.filter.add(item.id);
      }
      // We use this to force the Vue component to update. This is pretty hacky
      this.state['card-hover'] = !this.state['card-hover'];
    },
    activeHighlight(id) {
      let isTrue = false;
      if (this.filter.has(id) === true) {
        isTrue = true;
        return {
          active: isTrue,
        };
      }
      console.log('failed to contain');
      return {
        active: false,
      };
    },
  },
  // We *could* get data immediately for this widget, but look for the contrived
  // approach within enable()
  // created() {
  //   this.$store.dispatch('getCardItems');
  // },
};
</script>
