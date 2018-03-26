import { isServer, oneOf } from 'utils/help';
import { placements } from 'utils/style';

const Popper = isServer ? () => {} : require('popper.js');

export default {
  props: {
    // popper 出现的位置
    placement: {
      type: String,
      default: 'bottom',
      validator(value) {
        return oneOf(value, placements);
      },
    },
    // v-model
    value: {
      type: Boolean,
      default: false,
    },
    // 是否插入到 body 尾部
    appendToBody: {
      type: Boolean,
      default: true,
    },
    options: {
      type: Object,
      default: () => ({
        modifiers: {
          computedStyle: {
            gpuAcceleration: false,
          },
        },
      }),
    },
  },
  data() {
    return {
      visible: this.value,
      popperJS: null,
      referenceElm: null,
      popperElm: null,
    };
  },
  watch: {
    value(newVal) {
      this.visible = newVal;
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
  methods: {
    createPopper() {
      if (isServer) return;

      const options = Object.assign({}, this.options, {
        placement: this.placement,
      });

      this.referenceElm = this.$refs.reference;
      this.popperElm = this.$refs.popper;

      if (!this.referenceElm || !this.popperElm) return;

      if (this.appendToBody) {
        document.body.appendChild(this.popperElm);
      }

      this.popperJS = new Popper(this.referenceElm, this.popperElm, options);
    },
    updatePopper() {
      const { popperJS } = this;

      if (popperJS) {
        // popperJS.update();
      } else {
        this.createPopper();
      }
    },
  },
};
