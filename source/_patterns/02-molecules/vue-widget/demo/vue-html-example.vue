<template>
  <form 
    id="vue-html-example-2" 
    class="p-5"
  >
    <label for="vue-html-example-2-input">Send some text to space!</label>
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text">You typed: <strong>{{ name }}</strong></span>
      </div>
      <input
        id="vue-html-example-2-input"
        v-model="name"
        class="form-control"
        type="text"
        placeholder="Send this text to outer space"
      >
      <div class="input-group-append">
        <button
          class="btn btn-outline-primary"
          type="button"
          @click="toSpace(name)"
        >🚀 Send to space
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
