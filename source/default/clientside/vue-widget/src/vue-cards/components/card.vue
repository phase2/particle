<template>
  <div class="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-grey-light">
    <div data-testid="active-status" :class="{ active: isClicked }">
      <div class="flex-auto p-6">
        <h5 class="mb-3">
          <span class="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded text-grey-darker bg-grey-light">{{ id }}</span>
          {{ name }}
        </h5>
      </div>
      <ul class="flex flex-col pl-0 mb-0 border rounded border-grey-light ">
        <li class="relative block py-3 px-6 -mb-px border border-r-0 border-l-0 border-grey-light no-underline">{{ phone }}</li>
        <li class="relative block py-3 px-6 -mb-px border border-r-0 border-l-0 border-grey-light no-underline">{{ website }}</li>
        <li class="relative block py-3 px-6 -mb-px border border-r-0 border-l-0 border-grey-light no-underline">{{ email }}</li>
        <li class="relative block py-3 px-6 -mb-px border border-r-0 border-l-0 border-grey-light no-underline">clicked: {{ !!isClicked }}</li>
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
