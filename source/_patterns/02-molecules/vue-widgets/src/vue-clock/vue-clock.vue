<template>
  <div class="container">
    <div class="vue-clock">
      <div
        class="clock"
        :class="[dynamicClasses]"
      >
        <div 
          class="secondsAxis"
          :style="[secondsPosition]"
        >
          <div class="secondsHand" />
        </div>
        <div
          class="minutesAxis"
          :style="[minutesPosition]"
        >
          <div class="minutesHand" />
        </div>
        <div
          class="hoursAxis"
          :style="[hoursPosition]"
        >
          <div class="hoursHand" />
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
      time: {
        seconds: 0,
        minutes: 0,
        hours: 0,
      },
      secondsPosition: {
        transform: 'rotate(0deg)',
      },
      minutesPosition: {
        transform: 'rotate(0deg)',
      },
      hoursPosition: {
        transform: 'rotate(0deg)',
      },
      initial: true,
    };
  },
  computed: {
    dynamicClasses() {
      const classObject = {
        success:
          (this.time.seconds < 5 && this.time.seconds >= 0) ||
          (this.time.seconds < 45 && this.time.seconds >= 40),
        primary:
          (this.time.seconds < 10 && this.time.seconds >= 5) ||
          (this.time.seconds < 50 && this.time.seconds >= 45),
        salmon: this.time.seconds < 15 && this.time.seconds >= 10,
        purple: this.time.seconds < 20 && this.time.seconds >= 15,
        orange: this.time.seconds < 25 && this.time.seconds >= 20,
        yellow: this.time.seconds < 30 && this.time.seconds >= 25,
        dark: this.time.seconds < 35 && this.time.seconds >= 30,
        cyan: this.time.seconds < 40 && this.time.seconds >= 35,
      };
      return classObject;
    },
  },
  created() {
    this.updatePosition();
  },
  methods: {
    /**
     * Updates the seconds position
     */
    updatePosition() {
      this.updateClock = setInterval(() => {
        const time = new Date()
          .toString()
          .split(' ')[4]
          .split(':');

        const seconds = time[2];
        const minutes = time[1];
        const hours = time[0];

        if (this.initial) {
          this.updateHand(minutes, 'minutes');
          this.updateHand(hours, 'hours');
          this.initial = false;
        }
        this.updateHand(seconds, 'seconds');
        if (this.secondsPosition === '00') this.updateHand(minutes, 'minutes');
        if (this.hoursPosition === '00') this.updateHand(hours, 'hours');
      }, 1000);
    },
    updateHand(time, type) {
      this.$set(this.time, type, time);
      switch (type) {
        case 'hours': {
          const degrees = 30 * parseInt(time, 10);
          this[`${type}Position`] = {
            transform: `rotate(${degrees}deg)`,
          };
          break;
        }
        default: {
          const degrees = 6 * parseInt(time, 10);
          this[`${type}Position`] = {
            transform: `rotate(${degrees}deg)`,
          };
          break;
        }
      }
    },
  },
};
</script>

<style lang="scss" scope>
@import '00-protons/variables';
.container {
  display: flex;
  flex-direction: column;
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
  z-index: 2;
}
.secondsHand {
  position: relative;
  width: 2px;
  height: 100px;
  border-radius: 20%;
  background-color: red;
}
.minutesAxis {
  position: relative;
  z-index: 1;
}
.minutesHand {
  position: absolute;
  width: 3px;
  height: 50%;
  border-radius: 20%;
  background-color: gray;
}
.hoursAxis {
  position: relative;
}
.hoursHand {
  position: absolute;
  width: 4px;
  height: 50%;
  background-color: black;
}
.salmon {
  background-color: salmon;
}
.success {
  background-color: $success;
}
.primary {
  background-color: $primary;
}
.dark {
  background-color: $dark;
}
.yellow {
  background-color: $yellow;
}
.purple {
  background-color: $purple;
}
.orange {
  background-color: $orange;
}
.cyan {
  background-color: $cyan;
}
</style>
