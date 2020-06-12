<template>
  <form id="vue-html-example-2" onsubmit="return false" class="p-5">
    <label for="vue-html-example-2-input">Send some text to space!</label>
    <div class="flex items-center">
      <input
        id="vue-html-example-2-input"
        v-model="name"
        class="appearance-none py-2 px-2 text-base leading-normal bg-white text-grey-darker border border-grey rounded"
        type="text"
        placeholder="Send this text to outer space"
      />
      <div class="">
        <button
          class="border py-2 px-4 rounded text-blue-500 border-blue-500 bg-white hover:bg-blue-200 hover:text-blue-700"
          type="submit"
          @click="toSpace(name)"
        >
          🚀 Send to space
        </button>
      </div>
      <div class="ml-2">
        You typed: <strong>{{ name }}</strong>
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
