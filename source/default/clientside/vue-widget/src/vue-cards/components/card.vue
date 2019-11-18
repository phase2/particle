<template>
  <div class="card">
    <div data-testid="active-status" :class="{ active: isClicked }">
      <div class="card-body">
        <h5 class="card-title">
          <span class="badge badge-secondary">{{ id }}</span>
          {{ name }}
        </h5>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">{{ phone }}</li>
        <li class="list-group-item">{{ website }}</li>
        <li class="list-group-item">{{ email }}</li>
        <li class="list-group-item">clicked: {{ !!isClicked }}</li>
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
    id: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    website: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    isClicked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@use '~tokens/sass/utils';
// Make .active green for just these demo cards
.active {
  // Provided by our tokens Sass vars
  background-color: utils.bs-theme-color('success');
}
// Hide list-group-item backgrounds for just these demo cards
.list-group-item {
  background: none;
}
</style>
