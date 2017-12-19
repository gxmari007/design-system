<script>
import CoIcon from '../icon';
import { oneOf } from '../../utils/help';
import { sizeMap, SIZE } from '../../utils/style';

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
      validator(value) {
        return oneOf(value, ['button', 'submit', 'reset']);
      },
    },
    // 设置按钮的图标类型
    icon: String,
    // 设置按钮进入载入状态
    loading: {
      type: Boolean,
      default: false,
    },
    // 设置按钮形状
    shape: {
      type: String,
      validator(value) {
        return oneOf(value, ['circle']);
      },
    },
    // 设置按钮大小
    size: {
      type: String,
      validator(value) {
        return oneOf(value, SIZE);
      },
    },
    // 设置按钮类型
    type: {
      type: String,
      validator(value) {
        return oneOf(value, ['primary', 'dashed', 'danger']);
      },
    },
    // 点击跳转的地址，此时组件为 a 链接
    href: String,
    // a 链接的 target 属性，href 属性存在时生效
    target: String,
  },
  data() {
    return {
      clicked: false,
      timeoutID: null,
    };
  },
  computed: {
    classes() {
      const prefixClass = 'co-button';

      return [prefixClass, {
        [`${prefixClass}--ghost`]: this.ghost,
        [`${prefixClass}--circle`]: this.shape,
        [`${prefixClass}--${sizeMap[this.size]}`]: !!this.size,
        [`${prefixClass}--${this.type}`]: !!this.type,
        [`${prefixClass}--clicked`]: this.clicked,
      }];
    },
  },
  methods: {
    // 触发 clicked 效果
    onClick() {
      this.clicked = true;

      if (this.timeoutID) {
        clearTimeout(this.timeoutID);
      }

      this.timeoutID = setTimeout(() => {
        this.clicked = false;
      }, 400);
    },
    // 渲染 icon 或 loading icon
    renderIcon() {
      const { icon, loading } = this;

      if (icon || loading) {
        const iconType = loading ? 'loading' : icon;

        return <co-icon type={iconType} />;
      }

      return null;
    },
    renderLink() {
      return (
        <a href={this.href} target={this.target}>{this.$slots.default}</a>
      );
    },
    renderButton() {
      return (
        <button
          class={this.classes}
          type={this.htmlType}
          onClick={this.onClick}>
          {this.renderIcon()}
          {this.$slots.default}
        </button>
      );
    },
  },
  render() {
    if (this.href) {
      return this.renderLink();
    }

    return this.renderButton();
  },
  components: {
    CoIcon,
  },
};
</script>
