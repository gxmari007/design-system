<template>
  <i :class="classes" :style="style"></i>
</template>

<script>
export default {
  name: 'co-icon',
  props: {
    // 图标名称
    type: {
      type: String,
      required: true,
    },
    // 图标大小
    size: [String, Number],
    // 图标颜色
    color: String,
  },
  computed: {
    classes() {
      return `co-icon co-icon-${this.type}`;
    },
    style() {
      const { size, color } = this;
      const style = {};

      if (typeof size !== 'undefined') {
        style.fontSize = `${size}px`;
      }

      if (typeof color !== 'undefined') {
        style.color = color;
      }

      return style;
    },
  },
};
</script>
