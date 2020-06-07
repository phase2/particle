<template>
  <form id="vue-html-example-2" onsubmit="return false" class="p-5">
    <label for="vue-html-example-2-input">Send some text to space!</label>
    <div class="relative flex items-stretch w-full">
      <div class="input-group-prepend">
        <span class="input-group-text">
          You typed: <strong>{{ name }}</strong>
        </span>
      </div>
      <input
        id="vue-html-example-2-input"
        v-model="name"
        class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-grey-darker border border-grey rounded"
        type="text"
        placeholder="Send this text to outer space"
      />
      <div class="input-group-append">
        <button
          class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap py-2 px-4 rounded text-base leading-normal no-underline text-blue-dark border-blue bg-white hover:bg-blue-light hover:text-blue-darker"
          type="submit"
          @click="toSpace(name)"
        >
          🚀 Send to space
        </button>
      </div>
    </div>
  </form>
</template>
<script>
export default {
  data: () => ({
    name: '',
  }),
  methods: {
    toSpace() {
      alert(this.name); // eslint-disable-line no-alert
    },
  },
};
</script>
