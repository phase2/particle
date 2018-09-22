<template>
  <div
    class="card-body"
    :class="{ active: card.isClicked }"
  >
    <h4 class="card-title">{{ card.name }}</h4>
    <h6 class="card-subtitle mb-2 text-muted">{{ card.id }}</h6>
    <div class="card-text">
      <ul>
        <li>{{ card.phone }}</li>
        <li>{{ card.website }}</li>
        <li>{{ card.email }}</li>
        <li>{{ !!card.isClicked }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
// Import existing PRINTING styles through JavaScript. This does NOT duplicate
// since JavaScript imports are handled by Webpack.
import 'molecules/card';

export default {
  name: 'Card',
  props: {
    card: {
      type: Object,
      default() {
        return { isClicked: false };
      },
    },
  },
};
</script>

<style lang="scss" scoped>
// 00-protons/variables is provided by Webpack, but it is possible to:
//   @import '00-protons/variables';
.active {
  background-color: $success;
}
</style>
