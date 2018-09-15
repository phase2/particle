<template>
  <div
    class="row scoped-row"
  >
    <div
      v-for="item in cards"
      :key="item.phone"
      :class="[classObject, activeHighlight(item.id)]"
      @click="[toggle($event,item)]"
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
// import existing PRINTING styles through javascript
import 'molecules/card';

export default {
  name: 'Card',
  props: {
    cards: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      active_elements: [],
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
    classObject() {
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
    toggle(event, item) {
      // Check to see if the item clicked has already been assigned the active status.
      event.preventDefault();
      const check = this.active_elements.filter(id => id !== item.id);
      if (this.active_elements.length > check.length) {
        this.active_elements = check;
      } else if (check.length === this.active_elements.length) {
        this.active_elements.push(item.id);
      }
    },
    activeHighlight(id) {
      const check = this.active_elements.filter(_id => _id === id);
      if (check.length > 0) {
        return {
          active: true,
        };
      }

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
