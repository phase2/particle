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
      default: () => '',
    },
    name: {
      type: String,
      default: () => '',
    },
    // eslint-disable-next-line vue/prop-name-casing
    price_usd: {
      type: String,
      default: () => '',
    },
    symbol: {
      type: String,
      default: () => '',
    },
    change: {
      type: Number,
      default: () => '',
    },
  },

  computed: {
    percentClass() {
      return Math.sign(parseFloat(this.change)) === -1
        ? 'text-danger'
        : 'text-success';
    },
  },
};
</script>
