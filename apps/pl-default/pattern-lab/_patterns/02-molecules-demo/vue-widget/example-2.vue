<template>
  <form id="vue-html-example-1">
    <span>{{ name }}</span>
    <input v-model="name"/>
    <button v-on:click="toSpace(name)">🚀 Send to space</button>
  </form>
</template>
<script>
export default {
  data: () => ({
    name:''
  }),
  methods: {
    toSpace() {
      alert(this.name);
    },
  },
};
</script>
