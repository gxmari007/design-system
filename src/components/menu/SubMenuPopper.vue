<template>
  <ul class="co-menu__submenu-popper" v-show="visible" ref="popper">
    <slot />
  </ul>
</template>

<script>
import popper from 'mixins/popper';

export default {
  name: 'SubMenuPopper',
  mixins: [popper],
  mounted() {
    this.referenceElm = this.$parent.$el;
  },
};
</script>
