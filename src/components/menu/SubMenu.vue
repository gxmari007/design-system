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
  computed: {
    classes() {
      const prefixClass = 'co-menu__submenu';

      return [prefixClass, `${prefixClass}--${this.mode}`];
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
