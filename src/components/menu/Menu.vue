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
      items: {}, // 所有 menu-item 组件实例
      selectedItems: [], // 选择的 menu-item name 数组
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
    // 向 items 添加 menu-item 组件实例
    addItem(item) {
      this.$set(this.items, item.name, item);
    },
    // 从 items 中移除 menu-item 组件实例
    removeItem(item) {
      this.$delete(this.items, item.name);
    },
    updateSelectItems(name) {
      this.selectedItems = [name];
    },
  },
};
</script>

