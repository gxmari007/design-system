<template>
  <footer class="co-footer" :style="styles">
    <slot></slot>
  </footer>
</template>

<script>
export default {
  name: 'co-footer',
  props: {
    // 页脚高度
    height: {
      type: [String, Number],
      default: 60,
    },
  },
  computed: {
    styles() {
      return { height: `${this.height}px` };
    },
  },
};
</script>
