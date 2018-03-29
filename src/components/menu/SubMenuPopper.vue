<template>
  <transition name="zoom-big">
    <div v-show="visible" ref="popper">
      <slot />
    </div>
  </transition>
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
