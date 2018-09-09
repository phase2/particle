<template>
  <span>
    <span>{{ rank }}. {{ name }} | ${{ price_usd }} | {{ symbol }}</span>
  </span>
</template>
<script>
export default {
  name: 'facet-table-row',
  props: ['rank', 'name', 'price_usd', 'symbol'],
};
</script>
