<template>
  <div 
    class="vue-banner"
    :style="styles"
    @click="randomColor()"
  >
    <h3><marquee>{{ message }}</marquee></h3>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  data() {
    return {
      styles: {
        'background-color': 'black',
      },
      message: "Good news everyone! Store's open for business.",
    };
  },
  created() {
    setInterval(() => {
      this.randomColor();
    }, 3000);
  },
  methods: {
    randomColor() {
      const rand255 = () => Math.round(Math.random() * 255);
      this.styles[
        'background-color'
      ] = `rgba(${rand255()},${rand255()},${rand255()},${1})`;
    },
  },
};
</script>

<style lang="scss">
// importing NON PRINTING styles in sass
@import '00-protons/variables';

.vue-banner {
  margin: map-get($spacing, l);
  padding: map-get($spacing, m);
  font-size: $font-size-lg;
  background-color: map-get($theme-colors, 'new');

  h3 {
    color: $white;
  }
}
</style>
