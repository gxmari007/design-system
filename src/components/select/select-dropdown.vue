<template>
  <transition :name="transition">
    <div
      v-show="show"
      class="co-select__dropdown"
      :style="styles">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
// libs
import Popper from 'popper.js';
import width from 'dom-helpers/query/width';

export default {
  name: 'co-select-dropdown',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    placement: {
      type: String,
      default: 'bottom-start',
    },
    transition: {
      type: String,
      default: 'co-select--slide',
    },
  },
  data() {
    return {
      popper: null,
      width: 0,
    };
  },
  computed: {
    styles() {
      const styles = {};

      if (this.width > 0) {
        styles.width = `${this.width}px`;
      }

      return styles;
    },
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.update();
      }
    },
  },
  beforeDestroy() {
    if (this.popper) {
      this.popper.destroy();
    }
  },
  methods: {
    update() {
      const { setTransformOrigin } = this;

      if (this.popper) {
        this.popper.update();
      } else {
        this.popper = new Popper(this.$parent.$refs.reference, this.$el, {
          placement: this.placement,
          forceAbsolute: true,
          modifiers: {
            applyStyle: {
              gpuAcceleration: false,
            },
            preventOverflow: {
              padding: 0,
            },
          },
          onCreate(popper) {
            setTransformOrigin(popper);
          },
        });
      }

      if (this.$parent.$options.componentName === 'co-select') {
        this.width = width(this.$parent.$el);
      }
    },
    setTransformOrigin(popper) {
      const popperDom = popper.instance.popper;
      const map = { top: 'bottom', bottom: 'top' };
      const placement = popper.placement.split('-')[0];
      const origin = map[placement];

      popperDom.style.transformOrigin = `center ${origin}`;
    },
  },
};
</script>
