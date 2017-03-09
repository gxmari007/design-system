<template>
  <ul :class="classes">
    <slot></slot>
  </ul>
</template>

<script>
const prefixClass = 'co-timeline';

export default {
  name: 'co-timeline',
  props: {
    // 设置最后一个节点是否为幽灵节点
    pending: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        [prefixClass]: true,
        [`${prefixClass}--pending`]: this.pending,
      };
    },
  },
};
</script>
