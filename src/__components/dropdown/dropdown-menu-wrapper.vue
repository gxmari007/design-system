<template>
  <transition name="co-slide">
    <div v-show="visible" class="co-dropdown__wrapper" ref="popper">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import popper from 'mixins/popper';

export default {
  name: 'DropdownMenuWrapper',
  mixins: [popper],
  created() {
    this.$on('visible-change', (value) => {
      this.visible = value;
    });
  },
  mounted() {
    const parent = this.$parent;

    this.referenceElm = parent.$el;
    parent.popperElm = this.$el;
  },
};
</script>
