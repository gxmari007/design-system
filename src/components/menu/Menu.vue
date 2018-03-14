<template>
  <ul :class="classes" role="menu">
    <slot />
  </ul>
</template>

<script>
export default {
  name: 'CoMenu',
  provide() {
    return {
      rootMenu: this,
    };
  },
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
  data() {
    return {
      items: [],
    };
  },
  computed: {
    classes() {
      const { theme, mode } = this;
      const prefixClass = 'co-menu';

      return [prefixClass, `${prefixClass}--root`, `${prefixClass}--${theme}`, `${prefixClass}--${mode}`];
    },
  },
  methods: {
    // 添加 menu-item 组件实例对象
    addItem(item) {
      this.items.push(item);
    },
  },
};
</script>

