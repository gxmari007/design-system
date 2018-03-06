<template>
  <div :class="classes" :style="styles">
    <slot />
  </div>
</template>

<script>
// import Vue from 'vue';
import { oneOf } from 'utils/help';

export default {
  name: 'CoRow',
  props: {
    // flex 布局下的垂直对齐方式
    align: {
      type: String,
      validator(value) {
        return oneOf(value, ['top', 'middle', 'bottom']);
      },
    },
    // 栅格间隔
    gutter: {
      type: Number,
      default: 0,
    },
    // flex 布局下的水平排列方式
    justify: {
      type: String,
      validator(value) {
        return oneOf(value, ['start', 'end', 'center', 'space-round', 'space-between']);
      },
    },
    // 布局模式，可选值只有 flex
    type: {
      type: String,
      validator(value) {
        return oneOf(value, ['flex']);
      },
    },
  },
  computed: {
    classes() {
      const { type, align, justify } = this;
      const isFlex = type === 'flex';
      const prefixClass = isFlex ? 'co-row-flex' : 'co-row';

      return [prefixClass, {
        [`${prefixClass}--${align}`]: isFlex && align !== undefined,
        [`${prefixClass}--${justify}`]: isFlex && justify !== undefined,
      }];
    },
    styles() {
      const { gutter } = this;
      const styles = {};

      if (gutter !== 0) {
        styles.marginLeft = `-${gutter / 2}px`;
        styles.marginRight = `-${gutter / 2}px`;
      }

      return styles;
    },
  },
};
</script>
