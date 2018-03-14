<template>
  <ul :class="classes" role="menu">
    <slot />
  </ul>
</template>

<script>
export default {
  name: 'CoMenu',
  props: {
    // 菜单类型，现在支持垂直、水平、和内嵌模式三种
    mode: {
      type: String,
      default: 'vertical',
    },
    // 主题颜色
    theme: {
      type: String,
      default: 'light',
    },
  },
  computed: {
    classes() {
      const { theme, mode } = this;
      const prefixClass = 'co-menu';

      return [prefixClass, `${prefixClass}--root`, `${prefixClass}--${theme}`, `${prefixClass}--${mode}`];
    },
  },
};
</script>

