<template>
  <header class="co-header" :style="styles">
    <slot></slot>
  </header>
</template>

<script>
export default {
  name: 'CoHeader',
  props: {
    // 页头高度
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
