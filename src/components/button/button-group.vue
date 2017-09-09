<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
import { oneOf } from 'utils/help';
import { SIZE } from 'utils/style';

export default {
  name: 'co-button-group',
  props: {
    // 按钮组中按钮尺寸
    size: {
      type: String,
      validator(val) {
        return oneOf(val, SIZE);
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
      const prefixClass = 'co-button-group';

      return [prefixClass, {
        [`${prefixClass}--vertical`]: this.vertical,
      }];
    },
  },
};
</script>
