<template>
  <span>
    <span>
      <span>{{ rank }}.</span>
      <span>{{ name }} |</span>
      <span>${{ price_usd }} |</span>
      <span>{{ symbol }} |</span>
      <span :class="percentClass">{{ change }}</span>
    </span>
  </span>
</template>
<script>
export default {
  name: 'FacetTableRow',
  props: {
    rank: {
      type: Number,
      default: () => 0,
    },
    name: {
      type: String,
      default: () => '',
    },
    // eslint-disable-next-line vue/prop-name-casing
    price_usd: {
      type: Number,
      default: () => 0,
    },
    symbol: {
      type: String,
      default: () => '',
    },
    change: {
      type: Number,
      default: () => 0,
    },
  },

  computed: {
    percentClass() {
      return Math.sign(this.change) === -1 ? 'text-danger' : 'text-success';
    },
  },
};
</script>
