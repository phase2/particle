<template>
  <div class="container">

    <div class="vue-clock">
      <div
        class="clock"
      >
        <div 
          class="secondsAxis"
          :style="[position]"
        >
          <div class="secondsHand" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueClock',
  data() {
    return {
      position: {
        transform: 'rotate(9deg)',
      },
    };
  },
  created() {
    this.updatePosition();
  },
  methods: {
    updatePosition() {
      this.updateClock = setInterval(() => {
        const seconds = new Date()
          .toString()
          .split(' ')[4]
          .split(':')[2];
        const degrees = 6 * parseInt(seconds, 10);
        this.position = {
          transform: `rotate(${degrees}deg)`,
        };
      }, 1000);
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
  background-color: white;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: solid 2px;
}
.vue-clock {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  width: 400px;
  /*background-color: green;*/
}
.secondsAxis {
  position: relative;
}
.secondsHand {
  position: relative;
  width: 5px;
  height: 100px;
  border-radius: 20%;
  background-color: black;
}
</style>
