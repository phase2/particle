<template>
  <div class="card max-w-sm rounded shadow-lg">
    <div data-testid="active-status" :class="{ active: isClicked }">
      <div class="card-body px-6 py-4">
        <h5 class="card-title font-bold text-xl mb-2">
          <span class="badge badge-secondary">{{ id }}</span>
          {{ name }}
        </h5>
      </div>
      <ul class="list-group px-6 py-4 text-gray-700 text-base">
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
