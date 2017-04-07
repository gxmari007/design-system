/*
 * popper.js 封装 mixin
 */

// libs
import Popper from 'popper.js';
// utils
import { oneOf } from 'utils/help';

const placementValues = [
  'top', 'top-start', 'top-end',
  'right', 'right-start', 'right-end',
  'bottom', 'bottom-start', 'bottom-end',
  'left', 'left-start', 'left-end'
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
    // 是否插入到 body 标签尾部
    appendBody: {
      type: Boolean,
      default: true,
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

    if (this.popperElm && this.popperElm.parentNode === document.body) {
      document.body.removeChild(this.popperElm);
    }
  },
  methods: {
    createPopper() {
      const { popper, reference } = this.$refs;
      const options = Object.assign({}, this.options, {
        placement: this.placement,
      });

      if (this.appendBody) {
        this.popperElm = popper;
        document.body.appendChild(popper);
      }

      this.popperJS = new Popper(reference, popper, options);
      this.popperJS.onCreate(() => {
        this.resetTransformOrigin();
        this.$nextTick(this.updatePopper);
      });
    },
    updatePopper() {
      this.popperJS ? this.popperJS.update() : this.createPopper();
    },
    destroyPopper() {
      if (this.popperJS) {
        this.resetTransformOrigin();
      }
    },
    resetTransformOrigin() {
      const placementMap = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
      };
      const placement = this.popperJS._popper.getAttribute('x-placement').split('-')[0];
      const origin = placementMap[placement];

      this.popperJS._popper.style.transformOrigin = ['top', 'bottom'].indexOf(origin) !== -1 ?
        `center ${origin}` :
        `${origin} center`;
    },
  },
};
