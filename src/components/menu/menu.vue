<template>
  <ul :class="classes">
    <slot></slot>
  </ul>
</template>

<script>
import { oneOf } from 'utils/help';

export default {
  name: 'co-menu',
  props: {
    mode: {
      type: String,
      default: 'vertical',
      validator(value) {
        return oneOf(value, ['vertical', 'horizontal']);
      },
    },
    theme: {
      type: String,
      default: 'light',
      validator(value) {
        return oneOf(value, ['light', 'primary']);
      },
    },
  },
  computed: {
    classes() {
      const prefixClass = 'co-menu';

      return [
        prefixClass,
        `${prefixClass}--${this.mode}`,
        `${prefixClass}--${this.theme}`,
      ];
    },
  },
};
</script>
