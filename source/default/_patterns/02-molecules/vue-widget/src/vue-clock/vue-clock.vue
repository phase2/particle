/**
 * An example leveraging a few Vue features like:
 *   - computed returning objects
 *   - computed object keys being used within template (:style="hands.seconds")
 *   - methods starting an interval
 *   - created() calling an initialization method
 *   - Deriving much state from a single data() value (data.now)
 *   - Classes as dynamic computed values
 *   - The power of transform() in CSS
 */

<template>
  <div
    class="clock"
    :class="dynamicClasses"
  >
    <div class="clock-face">
      <div
        class="seconds-hand hand"
        data-testid="seconds-hand"
        :style="hands.seconds"
      />
      <div
        class="minutes-hand hand"
        data-testid="minutes-hand"
        :style="hands.minutes"
      />
      <div
        class="hours-hand hand"
        data-testid="hours-hand"
        :style="hands.hours"
      />
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
    time() {
      return {
        seconds: this.now.getSeconds(),
        minutes: this.now.getMinutes(),
        hours: this.now.getHours(),
      };
    },
    degrees() {
      const { seconds, minutes, hours } = this.time;
      return {
        seconds: parseInt((seconds / 60) * 360, 10),
        minutes: parseInt((minutes / 60 + seconds / 60 / 60) * 360, 10),
        hours: parseInt((hours / 12 + minutes / 60 / 12) * 360, 10),
      };
    },
    hands() {
      const { seconds, minutes, hours } = this.degrees;
      return {
        seconds: {
          transform: `rotate(${seconds}deg)`,
        },
        minutes: {
          transform: `rotate(${minutes}deg)`,
        },
        hours: {
          transform: `rotate(${hours}deg)`,
        },
      };
    },
    dynamicClasses() {
      const { seconds } = this.time;
      return {
        success: seconds >= 0 && seconds < 8,
        primary: seconds >= 8 && seconds < 16,
        salmon: seconds >= 16 && seconds < 24,
        purple: seconds >= 24 && seconds < 32,
        orange: seconds >= 32 && seconds < 40,
        yellow: seconds >= 40 && seconds < 48,
        dark: seconds >= 48 && seconds < 56,
        cyan: seconds >= 56 && seconds <= 60,
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
$hand-thickness: 6px;

.clock {
  position: relative;
  background-color: white;
  width: $clock-radius * 2;
  height: $clock-radius * 2;
  border-radius: 50%;
  border: solid 2px;
}
.clock-face {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  // rotate(90deg) because divs sit horizontally by default
  // translateY(-3px) because hand height affects positioning
  transform: rotate(90deg) translateY(-$hand-thickness/2);
}
.hand {
  position: absolute;
  top: 50%;
  left: 0;
  height: $hand-thickness;
  width: 50%;
  transform-origin: 100%;
  // Pseudo elements are the visible hands
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: black;
  }
}
.seconds-hand::after {
  background: red;
}
.minutes-hand::after {
  left: 10px;
}
.hours-hand::after {
  left: 40px;
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
