<template>
  <section :class="classes">
    <slot></slot>
  </section>
</template>

<script>
import { oneOf } from '../../utils/help';

export default {
  name: 'CoLayout',
  props: {
    // 子元素排列方向
    direction: {
      type: String,
      validator(value) {
        return oneOf(value, ['horizontal', 'vertical']);
      },
    },
  },
  computed: {
    classes() {
      const prefixClass = 'co-layout';

      return [prefixClass, {
        [`${prefixClass}--vertical`]: this.isVertical,
      }];
    },
    isVertical() {
      const { direction, $slots } = this;

      if (direction === 'vertical') {
        return true;
      } else if (direction === 'horizontal') {
        return false;
      }

      // console.log($slots.default[0]);

      return $slots && $slots.default ?
        $slots.default.some((vnode) => {
          const { tag } = vnode;

          return /CoHeader$/.test(tag) || /CoFooter$/.test(tag);
        }) :
        false;
    },
  },
};
</script>
