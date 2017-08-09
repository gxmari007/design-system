<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
import { oneOf } from 'utils/help';

export default {
  name: 'co-steps',
  props: {
    active: {
      type: Number,
      default: 0,
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator(value) {
        return oneOf(value, ['horizontal', 'vertical']);
      },
    },
    processStatus: {
      type: String,
      default: 'process',
      validator(value) {
        return oneOf(value, ['wait', 'process', 'finish', 'error']);
      },
    },
    finishStatus: {
      type: String,
      default: 'finish',
      validator(value) {
        return oneOf(value, ['wait', 'process', 'finish', 'error']);
      },
    },
  },
  data() {
    return {
      childs: [],
    };
  },
  computed: {
    classes() {
      const prefixClass = 'co-steps';

      return [prefixClass, `${prefixClass}--${this.direction}`];
    },
  },
  methods: {
    slotChange() {
      this.$nextTick(() => {
        this.childs = this.$children.filter(child => child.$options.name === 'co-step');
      });
    },
  },
};
</script>
