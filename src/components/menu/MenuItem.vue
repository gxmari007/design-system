<template>
  <li :class="classes" :style="styles" role="menuitem" @click="onClick">
    <slot />
  </li>
</template>

<script>
export default {
  name: 'CoMenuItem',
  inject: ['rootMenu'],
  props: {
    // item 的唯一标志
    name: {
      type: String,
      required: true,
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      const { selected, disabled } = this;
      const prefixClass = 'co-menu__item';

      return [prefixClass, {
        [`${prefixClass}--selected`]: selected,
        [`${prefixClass}--disabled`]: disabled,
      }];
    },
    styles() {
      return {
        paddingLeft: `${this.parentVm.inlineIndent}px`,
      };
    },
    // 判断是否选中
    selected() {
      return this.rootMenu.selectedItems.indexOf(this.name) > -1;
    },
    // 获取父级组件实例
    // 父级组件包括 menu submenu 组件
    parentVm() {
      let parent = this.$parent;

      while (parent && !(parent.$options.name === 'CoMenu' || parent.$options.name === 'CoSubMenu')) {
        parent = parent.$parent;
      }

      return parent;
    },
  },
  created() {
    this.rootMenu.addItem(this);
  },
  beforeDestroy() {
    this.rootMenu.removeItem(this);
  },
  methods: {
    onClick() {
      const {
        name,
        disabled,
        selected,
        rootMenu: { multiple },
      } = this;

      // 需要判断是否可以调用根组件 updateSelectItems 方法
      // 多选可以多次触发，单选只能触发一次
      if (!disabled && (multiple || !selected)) {
        this.rootMenu.updateSelectItems(name);
      }
    },
  },
};
</script>
