<template>
  <div class="co-badge">
    <slot></slot>
    <transition :name="transitionName">
      <sup :class="countClasses" v-if="!dot" v-show="visible">{{ currentCount }}</sup>
    </transition>
    <transition :name="transitionName">
      <sup class="co-badge__dot" v-if="dot" v-show="visible"></sup>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'co-badge',
  props: {
    count: [Number, String],
    max: {
      type: [Number, String],
      default: 99,
    },
    dot: {
      type: Boolean,
      default: false,
    },
    showZero: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentCount: 0,
      timeoutID: null,
    };
  },
  computed: {
    _count() {
      let num = Number(this.count);
      const maxNum = Number(this.max);

      if (isNaN(num)) {
        return this.count;
      }

      if (!isNaN(maxNum) && num > maxNum) {
        num = `${maxNum}+`;
      }

      return num;
    },
    visible() {
      return this.showZero || this._count !== 0;
    },
    countClasses() {
      const prefixClass = 'co-badge__count';

      return {
        [prefixClass]: true,
        [`${prefixClass}--alone`]: !this.$slots.default,
      };
    },
    transitionName() {
      return this.$slots.default ? 'co-zoom' : 'co-zoom-alone';
    },
  },
  watch: {
    _count: {
      immediate: true,
      handler(newVal) {
        if (newVal === 0 && !this.showZero) {
          if (this.timeoutID) {
            clearTimeout(this.timeoutID);
          }

          this.timeoutID = setTimeout(() => {
            this.currentCount = newVal;
          }, 200);
        } else {
          this.currentCount = newVal;
        }
      },
    },
  },
  beforeDestroy() {
    if (this.timeoutID) {
      clearTimeout(this.timeoutID);
    }
  },
};
</script>
