<template>
  <div
    class="clock"
    :class="dynamicClasses"
  >
    <div
      class="seconds-hand hand"
      :style="hands.seconds"
    />
    <div
      class="minutes-hand hand"
      :style="hands.minutes"
    />
    <div
      class="hours-hand hand"
      :style="hands.hours"
    />
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
    time() {
      return {
        seconds: this.now.getSeconds(),
        minutes: this.now.getMinutes(),
        hours: this.now.getHours(),
      };
    },
    hands() {
      return {
        seconds: {
          transform: `rotate(${(this.time.seconds / 60) * 360}deg)`,
        },
        minutes: {
          transform: `rotate(${(this.time.minutes / 60) * 360}deg)`,
        },
        hours: {
          transform: `rotate(${(this.time.hours / 12) * 360}deg)`,
        },
      };
    },
    dynamicClasses() {
      return {
        success: this.time.seconds >= 0 && this.time.seconds < 8,
        primary: this.time.seconds >= 8 && this.time.seconds < 16,
        salmon: this.time.seconds >= 16 && this.time.seconds < 24,
        purple: this.time.seconds >= 24 && this.time.seconds < 32,
        orange: this.time.seconds >= 32 && this.time.seconds < 40,
        yellow: this.time.seconds >= 40 && this.time.seconds < 48,
        dark: this.time.seconds >= 48 && this.time.seconds < 56,
        cyan: this.time.seconds >= 56 && this.time.seconds <= 60,
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
$clock-radius: 100px;

.clock {
  position: relative;
  background-color: white;
  width: $clock-radius * 2;
  height: $clock-radius * 2;
  border-radius: 50%;
  border: solid 2px;
}
.hand {
  position: absolute;
  left: 50%;
  top: 50%;
}
.seconds-hand {
  width: 2px;
  height: 100px;
  border-radius: 20%;
  background-color: red;
}
.minutes-hand {
  width: 3px;
  height: 50%;
  border-radius: 20%;
  background-color: gray;
}
.hours-hand {
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
