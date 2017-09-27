<template>
  <div :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
import { oneOf } from 'utils/help';

const prefixClass = 'co-row';

export default {
  name: 'co-row',
  props: {
    // 布局类型
    // 浮动布局和 flex 布局
    type: {
      type: String,
      validate(value) {
        return oneOf(value, ['flex']);
      },
    },
    // 栅格间距
    gutter: {
      type: Number,
      default: 0,
    },
    // flex 水平布局
    justify: {
      type: String,
      validate(value) {
        return oneOf(value, ['start', 'end', 'center', 'space-round', 'space-between']);
      },
    },
    // flex 垂直布局
    align: {
      type: String,
      validate(value) {
        return oneOf(value, ['top', 'middle', 'bottom']);
      },
    },
  },
  computed: {
    classes() {
      const { type, justify, align } = this;

      return {
        [`${prefixClass}`]: true,
        [`${prefixClass}--flex`]: type === 'flex',
        [`${prefixClass}--flex-${justify}`]: type === 'flex' && justify !== undefined,
        [`${prefixClass}--flex-${align}`]: type === 'flex' && align !== undefined,
      };
    },
    styles() {
      const { gutter } = this;
      const style = {};

      if (gutter !== 0) {
        style.marginRight = `${-(gutter / 2)}px`;
        style.marginLeft = style.marginRight;
      }

      return style;
    },
  },
};
</script>
