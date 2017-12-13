<script>
import CoIcon from '../icon';

export default {
  name: 'CoButton',
  props: {
    // 是否为幽灵按钮
    ghost: {
      type: Boolean,
      default: false,
    },
    // button 原生 html 属性
    htmlType: {
      type: String,
      default: 'button',
    },
    // 设置按钮的图标类型
    icon: String,
  },
  computed: {
    classes() {
      const prefixClass = 'co-button';

      return [prefixClass, {
        [`${prefixClass}--ghost`]: this.ghost,
      }];
    },
  },
  render() {
    return (
      <button
        class={this.classes}
        type={this.htmlType}>
        {this.icon && <co-icon type={this.icon} />}
        {this.$slots.default}
      </button>
    );
  },
  components: {
    CoIcon,
  },
};
</script>
