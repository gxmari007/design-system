import CoIcon from 'components/icon';
import { oneOf } from 'utils/help';

export default {
  name: 'co-tag',
  props: {
    type: {
      type: String,
      validator(value) {
        return oneOf(value, ['primary', 'success', 'warning', 'info']);
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
      const { type } = this;

      return [prefixClass, {
        [`${prefixClass}--${type}`]: !!type,
      }];
    },
  },
  methods: {
    onClose() {
      this.$emit('on-close');
    },
    renderIcon() {
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
          {this.closeable && this.renderIcon()}
        </span>
      );
    }

    return (
      <transition name="co-tag">
        <span class={this.classes}>
          {this.$slots.default}
          {this.closeable && this.renderIcon()}
        </span>
      </transition>
    );
  },
  components: {
    CoIcon,
  },
};
