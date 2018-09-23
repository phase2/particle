<template>
  <div
    class="clock"
    :class="dynamicClasses"
  >
    <div
      class="secondsAxis"
      :style="handSeconds"
    >
      <div class="secondsHand" />
    </div>
    <div
      class="minutesAxis"
      :style="handMinutes"
    >
      <div class="minutesHand" />
    </div>
    <div
      class="hoursAxis"
      :style="handHours"
    >
      <div class="hoursHand" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueClock',
  data() {
    return {
      now: new Date(),
    };
  },
  computed: {
    seconds() {
      return this.now.getSeconds();
    },
    minutes() {
      return this.now.getMinutes();
    },
    hours() {
      return this.now.getHours();
    },
    handSeconds() {
      return {
        transform: `rotate(${6 * this.seconds}deg)`,
      };
    },
    handMinutes() {
      return {
        transform: `rotate(${6 * this.minutes}deg)`,
      };
    },
    handHours() {
      return {
        transform: `rotate(${30 * this.hours}deg)`,
      };
    },
    dynamicClasses() {
      return {
        success: this.seconds >= 0 && this.seconds < 8,
        primary: this.seconds >= 8 && this.seconds < 16,
        salmon: this.seconds >= 16 && this.seconds < 24,
        purple: this.seconds >= 24 && this.seconds < 32,
        orange: this.seconds >= 32 && this.seconds < 40,
        yellow: this.seconds >= 40 && this.seconds < 48,
        dark: this.seconds >= 48 && this.seconds < 56,
        cyan: this.seconds >= 56 && this.seconds <= 60,
      };
    },
  },
  created() {
    this.updatePosition();
  },
  methods: {
    updatePosition() {
      setInterval(() => {
        this.now = new Date();
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
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
.secondsAxis {
  position: relative;
}
.secondsHand {
  width: 2px;
  height: 100px;
  border-radius: 20%;
  background-color: red;
}
.minutesAxis {
  position: relative;
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
