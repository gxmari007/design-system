import { oneOf } from 'utils/help';
import CoIcon from 'components/icon';
import CoTagTransition from './tag-transition';

export default {
  name: 'co-tag',
  props: {
    type: {
      type: String,
      validator(value) {
        return oneOf(value, ['primary', 'success', 'warning', 'info']);
      },
    },
    size: {
      type: String,
      validator(value) {
        return oneOf(value, ['large']);
      },
    },
    closeable: {
      type: Boolean,
      default: false,
    },
    closeTransition: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      const prefixClass = 'co-tag';
      const { type, size } = this;

      return [prefixClass, {
        [`${prefixClass}--${type}`]: !!type,
        [`${prefixClass}--${size}`]: !!size,
      }];
    },
  },
  methods: {
    onClose() {
      this.$emit('on-close');
    },
    renderCloseIcon() {
      return (
        <co-icon
          class="co-tag__close"
          type="ios-close-empty"
          nativeOnClick={this.onClose}></co-icon>
      );
    },
  },
  render() {
    if (this.closeTransition) {
      return (
        <span class={this.classes}>
          {this.$slots.default}
          {this.closeable && this.renderCloseIcon()}
        </span>
      );
    }

    return (
      <co-tag-transition>
        <span class={this.classes}>
          {this.$slots.default}
          {this.closeable && this.renderCloseIcon()}
        </span>
      </co-tag-transition>
    );
  },
  components: {
    CoIcon,
    CoTagTransition,
  },
};
