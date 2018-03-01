<template>
  <div class="co-carousel__item" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'co-carousel-item',
  data() {
    return {
      width: 0,
      height: 'auto',
    };
  },
  computed: {
    styles() {
      return {
        width: `${this.width}px`,
        height: this.height,
      };
    },
    parent() {
      let parent = this.$parent;

      while (parent && parent.$options.name !== 'co-carousel') {
        parent = parent.$parent;
      }

      return parent;
    },
  },
  mounted() {
    this.parent.slotChange();
  },
  beforeDestroy() {
    this.parent.slotChange();
  },
};
</script>
