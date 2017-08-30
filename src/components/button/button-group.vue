<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
import { oneOf } from 'utils/help';

const prefixClass = 'co-button-group';

export default {
  name: 'co-button-group',
  props: {
    // 按钮组中按钮尺寸
    size: {
      type: String,
      validator(val) {
        return oneOf(val, ['small', 'large']);
      },
    },
    // 是否垂直排列按钮，默认水平排列
    vertical: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        [prefixClass]: true,
        [`${prefixClass}--vertical`]: this.vertical,
      };
    },
  },
};
</script>
