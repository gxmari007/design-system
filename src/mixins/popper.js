import { isServer, isTest, oneOf } from 'utils/help';
import { placements } from 'utils/style';

const Popper = isServer || isTest ? () => {} : require('popper.js').default;

export default {
  props: {
    // 是否插入到 body 尾部
    appendToBody: {
      type: Boolean,
      default: true,
    },
    // popper 插件配置参数
    options: {
      type: Object,
      default: () => ({
        modifiers: {
          computeStyle: {
            gpuAcceleration: false, // 默认关闭 3d transformation 定位
          },
        },
      }),
    },
    // popper 出现的位置
    placement: {
      type: String,
      default: 'bottom',
      validator(value) {
        return oneOf(value, placements);
      },
    },
    // 设置 popper 元素的 transform-origin 属性
    transformOrigin: {
      type: [Boolean, String],
      default: true,
    },
    // v-model
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visible: false,
      popperJS: null,
      referenceElm: null,
      popperElm: null,
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(newVal) {
        // 当 value 初始值为 true 时必须等 dom 元素都插入到文档中才能创建 popper 元素
        this.$nextTick(() => {
          this.visible = newVal;
        });
      },
    },
    visible(newVal) {
      if (newVal) {
        this.updatePopper();
      } else {
        this.destroyPopper();
      }

      this.$emit('input', newVal);
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
      if (isServer || isTest) return;

      /* eslint-disable no-multi-assign */
      const reference = this.referenceElm = this.referenceElm || this.$refs.reference;
      const popper = this.popperElm = this.popperElm || this.$refs.popper;

      if (!reference || !popper) return;

      if (this.appendToBody) {
        document.body.appendChild(popper);
      }

      this.popperJS = new Popper(
        this.referenceElm,
        this.popperElm,
        Object.assign({}, this.options, {
          placement: this.placement,
          onCreate: () => {
            this.resetTransformOrigin();
            this.$nextTick(this.updatePopper);
          },
        }),
      );
    },
    // 设置 popper 元素的 transform-origin 属性
    resetTransformOrigin() {
      if (!this.transformOrigin) return;

      const placementMap = {
        top: 'bottom',
        bottom: 'top',
        right: 'left',
        left: 'right',
      };
      const placement = this.popperJS.popper.getAttribute('x-placement').split('-')[0];
      const origin = placementMap[placement];

      /* eslint-disable no-nested-ternary */
      this.popperJS.popper.style.transformOrigin = typeof this.transformOrigin === 'string'
        ? this.transformOrigin
        : ['top', 'bottom'].indexOf(placement) > -1 ? `center ${origin}` : `${origin} center`;
    },
    updatePopper() {
      const { popperJS } = this;

      if (popperJS) {
        popperJS.update();
      } else {
        this.createPopper();
      }
    },
    destroyPopper() {
      if (this.popperJS) {
        this.resetTransformOrigin();
      }
    },
  },
};
