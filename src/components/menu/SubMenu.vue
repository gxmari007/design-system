<template>
  <li :class="classes"></li>
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
    mode() {
      return this.rootMenu.mode;
    },
  },
};
</script>
