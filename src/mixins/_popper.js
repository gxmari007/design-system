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
};
