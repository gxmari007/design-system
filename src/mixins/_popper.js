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
  },
  data() {
    return {
      visible: false,
      popperJS: null,
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
  methods: {
    createPopper() {
      if (isServer) return;

      const reference = this.$refs.reference;
      const popper = this.$refs.popper;
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
