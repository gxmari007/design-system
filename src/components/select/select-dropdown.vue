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
import Vue from 'vue';
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
      default: 'top',
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
        this.updatePopper();
      } else {
        this.destroyPopper();
      }
    },
  },
  beforeDestroy() {
    if (this.popper) {
      this.popper.destroy();
    }
  },
  methods: {
    createPopper() {
      const { setTransformOrigin, updatePopper } = this;

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
          Vue.nextTick(() => {
            updatePopper();
          });
        },
      });

      if (this.$parent.$options.componentName === 'co-select') {
        this.width = width(this.$parent.$el);
      }
    },
    updatePopper() {
      this.popper ? this.popper.update() : this.createPopper();
    },
    destroyPopper() {
      if (this.popper) {
        this.setTransformOrigin(this.popper);
      }
    },
    setTransformOrigin(popper) {
      const popperDom = popper.instance.popper;
      const map = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };
      const placement = popper.placement.split('-')[0];
      const origin = map[placement];

      popperDom.style.transformOrigin = ['top', 'bottom'].indexOf(placement) !== -1 ? `center ${origin}` : `${origin} center`;
    },
  },
};
</script>
