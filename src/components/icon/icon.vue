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
    size: {
      type: [String, Number],
      default: '24',
    },
    // 图标颜色
    color: {
      type: String,
      default: '#333',
    },
  },
  computed: {
    classes() {
      return `co-icon-${this.type}`;
    },
    style() {
      const { size, color } = this;

      return {
        fontSize: `${size}px`,
        color,
      };
    },
  },
};
</script>
