<template>
  <span>
    <span>{{ rank }}. {{ name }} | ${{ priceUsd }} | {{ symbol }}</span>
  </span>
</template>
<script>
export default {
  name: 'facet-table-row',
  props: ['rank', 'name', 'priceUsd', 'symbol'],
};
</script>
