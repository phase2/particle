<template>
  <div class="card">
    <div
      :class="{ active: card.isClicked }"
    >
      <div class="card-body">
        <h5 class="card-title">{{ card.name }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{ card.id }}</h6>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">{{ card.phone }}</li>
        <li class="list-group-item">{{ card.website }}</li>
        <li class="list-group-item">{{ card.email }}</li>
        <li class="list-group-item">{{ !!card.isClicked }}</li>
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
.list-group-item {
  background: none;
}
</style>
