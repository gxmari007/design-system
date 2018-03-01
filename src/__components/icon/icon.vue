<template>
  <i :class="classes" />
</template>

<script>
export default {
  name: 'CoIcon',
  props: {
    // 图标名称
    type: {
      type: String,
      required: true,
    },
    // 是否有旋转动画
    spin: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      const prefixClass = 'anticon';

      return [prefixClass, `${prefixClass}-${this.type}`, {
        [`${prefixClass}-spin`]: this.spin,
      }];
    },
  },
};
</script>
