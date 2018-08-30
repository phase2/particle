<template>
  <div id="vue-example-widget">
    <widget></widget>

    <card></card>
  </div>
</template>

<script>
import card from './components/card.vue';
import widget from './components/widget.vue';
export default {
  components: {
    card,
    widget,
  },
};
</script>
