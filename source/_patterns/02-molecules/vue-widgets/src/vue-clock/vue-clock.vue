<template>
  <div class="container">
    <h1>Dynamic classes based on Time</h1>
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
        salmon: this.time.seconds > 30 && this.time.seconds < 50,
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
          this.updateMinutesPosition(minutes);
          this.updateHoursPosition(hours);
          this.initial = false;
        }

        this.updateSecondsPosition(seconds)
        if (this.secondsPosition === '00') this.updateMinutesPosition(minutes);
        if (this.hoursPosition === '00') this.updateHoursPosition(hours);
      }, 1000);
    },
    updateSecondsPosition(seconds) {
      this.$set(this.time, 'seconds', seconds);
      const degrees = 6 * parseInt(seconds, 10);
      this.secondsPosition = {
        transform: `rotate(${degrees}deg)`,
      };
    }
    updateMinutesPosition(minutes) {
      this.$set(this.time, 'minutes', minutes);
      const degrees = 6 * parseInt(minutes, 10);
      this.minutesPosition = {
        transform: `rotate(${degrees}deg)`,
      };
    },
    updateHoursPosition(hours) {
      this.$set(this.time, 'hours', hours);
      const degrees = 30 * parseInt(hours, 10);
      this.hoursPosition = {
        transform: `rotate(${degrees}deg)`,
      };
    },
  },
};
</script>

<style scoped>
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
</style>
