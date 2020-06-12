<template>
  <form id="vue-html-example-1">
    <span>{{ name }}</span>
    <input v-model="name" />
    <button @click="toSpace(name)">🚀 Send to space</button>
  </form>
</template>
<script>
/* eslint-disable no-alert */
export default {
  data: () => ({
    name: '',
  }),
  methods: {
    toSpace() {
      alert(this.name);
    },
  },
};
</script>
