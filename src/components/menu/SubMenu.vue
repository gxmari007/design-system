<template>
  <li :class="classes">
    <div class="co-menu__submenu-title" :style="titleStyles">
      <slot name="title" />
      <i class="co-menu__submenu-arrow"></i>
    </div>
    <slot />
  </li>
</template>

<script>
export default {
  name: 'CoSubMenu',
  inject: ['rootMenu'],
  props: {
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 唯一标志
    name: String,
  },
  computed: {
    classes() {
      const { disabled } = this;
      const prefixClass = 'co-menu__submenu';

      return [prefixClass, `${prefixClass}--${this.mode}`, {
        [`${prefixClass}--disabled`]: disabled,
      }];
    },
    titleStyles() {
      return {
        paddingLeft: `${this.inlineIndent}px`,
      };
    },
    mode() {
      return this.rootMenu.mode;
    },
    inlineIndent() {
      return this.rootMenu.inlineIndent;
    },
  },
};
</script>
