<template>
  <div class="container">

    <div class="vue-clock">
      <div
        class="clock"
        :data="getCurrentTime"
      >
        <div className="secondsAxis">
          <div class="secondsHand" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueClock',
  methods: {
    getCurrentTime() {
      console.log(new Date());
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.clock {
  position: relative;
  display: flex;
  justify-content: center;
  background-color: blue;
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
.vue-clock {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  width: 400px;
  background-color: green;
}
.secondsAxis {
  position: relative;
  /*transform: rotate(90deg);*/
  background-color: red;
}
.secondsHand {
  /*position: relative;*/
  width: 10px;
  height: 100px;
  border-radius: 20%;
  background-color: orange;
}
</style>
