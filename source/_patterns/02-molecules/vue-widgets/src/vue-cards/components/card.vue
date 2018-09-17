<template>
  <div
    class=""
  >
    <div class="card-body">
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
  </div>
</template>

<script>
// import existing PRINTING styles through javascript
import 'molecules/card';

export default {
  name: 'Card',
  props: {
    card: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="scss" scope>
@import '00-protons/variables';
.active {
  background-color: $success;
}
.active:hover {
  background-color: green;
}
</style>
