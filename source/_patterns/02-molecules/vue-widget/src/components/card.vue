<template>
  <div
    class="row"
    style="justify-content: center;"
  >
    <div
      v-for="item in getCard"
      :key="item.phone"
      class="card text-dark col-5"
      :style="styleObject"
      @click="toggleBackground()"
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

// We will unpack this using the spread operator.
const initialStyle = {
  margin: '5px',
  backgroundColor: 'white',
  transform: 'scale(1)',
};

export default {
  name: 'Card',
  data() {
    return {
      styleObject: { ...initialStyle },
      toggle: false,
    };
  },
  computed: {
    ...mapGetters('vueWidget', ['getCard']),
  },
  methods: {
    toggleBackground() {
      console.log('clicked');
      // The object needs to exist first before it changes state.
      if (this.toggle === false) {
        this.styleObject.backgroundColor = '#db9200';
        this.styleObject.transform = 'scale(.8)';
        this.toggle = true;
      } else {
        this.styleObject = { ...initialStyle };
        this.toggle = false;
      }
    },
  },
  // We *could* get data immediately for this widget, but look for the contrived
  // approach within enable()
  // created() {
  //   this.$store.dispatch('getCardItems');
  // },
};
</script>
