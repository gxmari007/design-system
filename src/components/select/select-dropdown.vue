<template>
  <transition name="co-select--slide">
    <ul
      v-show="show"
      class="co-select__dropdown"
      :style="style">
      <slot></slot>
    </ul>
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
      default: 'top-start',
    },
  },
  data() {
    return {
      popper: null,
      width: 0,
    };
  },
  computed: {
    style() {
      return {
        width: `${this.width}px`,
      };
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

      this.width = width(this.$parent.$el);
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
