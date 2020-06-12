<template>
  <div
    class="clock relative rounded-full border-solid border-black border-2"
    :class="dynamicClasses"
  >
    <div class="clock-face absolute top-0 right-0 bottom-0 left-0">
      <div
        class="seconds-hand hand absolute left-0 w-1/2"
        data-testid="seconds-hand"
        :style="hands.seconds"
      ></div>
      <div
        class="minutes-hand hand absolute left-0 w-1/2"
        data-testid="minutes-hand"
        :style="hands.minutes"
      ></div>
      <div
        class="hours-hand hand absolute left-0 w-1/2"
        data-testid="hours-hand"
        :style="hands.hours"
      ></div>
    </div>
  </div>
</template>

<script>
/**
 * An example leveraging a few Vue features like:
 * - computed returning objects
 * - computed object keys being used within template (:style="hands.seconds")
 * - methods starting an interval * - created() calling an initialization method
 * - Deriving much state from a single data() value (data.now)
 * - Classes as dynamic computed values * - The power of transform() in CSS
 */
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
        'bg-gray-500': seconds >= 0 && seconds < 8,
        'bg-red-500': seconds >= 8 && seconds < 16,
        'bg-orange-500': seconds >= 16 && seconds < 24,
        'bg-yellow-500': seconds >= 24 && seconds < 32,
        'bg-green-500': seconds >= 32 && seconds < 40,
        'bg-teal-500': seconds >= 40 && seconds < 48,
        'bg-blue-500': seconds >= 48 && seconds < 56,
        'bg-purple-500': seconds >= 56 && seconds <= 60,
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

<style lang="css" scoped>
.clock {
  width: 200px;
  height: 200px;
}
.clock-face {
  transform: rotate(90deg) translateY(-3px);
}
.hand {
  top: 50%;
  height: 6px;
  transform-origin: 100%;
}
.hand::after {
  content: '';
  @apply block absolute top-0 right-0 bottom-0 left-0 bg-black;
}
</style>
