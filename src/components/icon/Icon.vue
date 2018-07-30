<template>
  <i :class="classes" />
</template>

<script>
export default {
  name: 'CoIcon',
  props: {
    // 是否有旋转动画
    spin: {
      type: Boolean,
      default: false,
    },
    // 图标名称
    type: {
      type: String,
      required: true,
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
