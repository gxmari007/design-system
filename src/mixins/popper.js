import Vue from 'vue';
import width from 'dom-helpers/query/width';
import { oneOf } from '../utils/help';

const isServer = Vue.prototype.$isServer;
const Popper = isServer ? () => {} : require('popper.js');

const placementValues = [
  'top', 'top-start', 'top-end',
  'right', 'right-start', 'right-end',
  'bottom', 'bottom-start', 'bottom-end',
  'left', 'left-start', 'left-end',
];

export default {
  props: {
    // popper 出现的位置
    placement: {
      type: String,
      default: 'bottom',
      validator(value) {
        return oneOf(value, placementValues);
      },
    },
    // popper options
    options: {
      type: Object,
      default() {
        return {
          gpuAcceleration: false,
        };
      },
    },
  },
  data() {
    return {
      // 控制 popper 显示或隐藏
      visible: false,
      // popper 实例
      popperJS: null,
      popperElm: null,
    };
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.updatePopper();
      } else {
        this.destroyPopper();
      }
    },
  },
  beforeDestroy() {
    if (this.popperJS) {
      this.popperJS.destroy();
      this.popperJS = null;
    }
  },
  methods: {
    createPopper() {
      if (isServer) return;

      const popper = this.popper || this.$refs.popper;
      const reference = this.reference || this.$refs.reference;
      const options = Object.assign({}, this.options, {
        placement: this.placement,
      });

      this.popperElm = popper;
      this.popperJS = new Popper(reference, popper, options);
      this.popperJS.onCreate(() => {
        this.resetTransformOrigin();
        this.$nextTick(this.updatePopper);
      });

      if (this.$options.name === 'co-select') {
        this.width = width(this.$el);
      }
    },
    updatePopper() {
      if (this.popperJS) {
        this.popperJS.update();
      } else {
        this.createPopper();
      }
    },
    destroyPopper() {
      if (this.popperJS) {
        this.resetTransformOrigin();
      }
    },
    resetTransformOrigin() {
      /* eslint-disable no-underscore-dangle */
      const placementMap = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
      };
      const placement = this.popperJS._popper.getAttribute('x-placement').split('-');
      const origin = placementMap[placement[0]];
      const popperElm = this.popperJS._popper;
      const axis = placement[1];

      if (['top', 'bottom'].indexOf(origin) !== -1) {
        const map = {
          start: 'left',
          end: 'right',
        };

        popperElm.style.transformOrigin = `${axis ? map[axis] : 'center'} ${origin}`;
      } else {
        const map = {
          start: 'top',
          end: 'bottom',
        };

        popperElm.style.transformOrigin = `${origin} ${axis ? map[axis] : 'center'}`;
      }
    },
    findInput() {
      const reference = this.$refs.reference;
      const inputElm = reference.querySelector('input');
      const textareaElm = reference.querySelector('textarea');
      let elm = null;

      if (inputElm) {
        elm = inputElm;
      } else if (textareaElm) {
        elm = textareaElm;
      }

      return elm;
    },
  },
};
