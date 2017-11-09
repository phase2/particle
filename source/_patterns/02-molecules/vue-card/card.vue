<template>
  <div class="vue-card">

    <h2>Testing!</h2>
    <h3>{{ title }}</h3>

  </div>
</template>

<script>
  import { mapGetters, mapActions, mapState } from 'vuex'
  export default {
    name: 'card',
    data() {
      return {
        title: this.$store.state.title
      }
    },
    methods: {
      ...mapActions([
      ]),
    },
    computed: {
      ...mapGetters([
      ]),
    },
  }
</script>
