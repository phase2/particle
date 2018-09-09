<template>
  <span>
    <span>
      <span>{{ rank }}.</span>
      <span>{{ name }} |</span>
      <span>${{ price_usd }} |</span>
      <span>{{ symbol }} |</span>
      <span v-bind:class="percentClass">{{ change }}</span>
    </span>
  </span>
</template>
<script>
export default {
  name: 'facet-table-row',
  props: ['rank', 'name', 'price_usd', 'symbol', 'change'],
  computed: {
    percentClass() {
      return Math.sign(parseFloat(this.change)) === -1
        ? 'text-danger'
        : 'text-success';
    },
  },
};
</script>
