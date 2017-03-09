<template>
  <li class="co-timeline__item">
    <div class="co-timeline__tail"></div>
    <div class="co-timeline__outline"></div>
    <div :class="circleClasses" :style="circleStyles"></div>
    <div class="co-timeline__content">
      <slot></slot>
    </div>
  </li>
</template>

<script>
import { colorRegex } from 'utils/help';

export default {
  name: 'co-timeline-item',
  props: {
    // 节点圆圈的颜色
    // 可传入 blue、red 和 green 或者十六进制颜色值
    color: {
      type: String,
      default: 'blue',
    },
  },
  computed: {
    circleClasses() {
      return {
        'co-timeline__circle': true,
        [`co-timeline__circle--${this.color}`]: !colorRegex.test(this.color),
      };
    },
    circleStyles() {
      const styles = {};

      if (colorRegex.test(this.color)) {
        styles.borderColor = this.color;
      }

      return styles;
    },
  },
};
</script>
